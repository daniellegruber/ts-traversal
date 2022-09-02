import * as g from "./generated";
import { 
    gotoPreorderSucc, 
    gotoPreorderSucc_OnlyMajorTypes, 
    gotoPreorderSucc_SkipFunctionDef, 
    fileIsFunction,
    findEntryFunction
} from "./treeTraversal";
import { CustomFunction } from "./identifyCustomFunctions";
import { builtin_functions } from "./builtinFunctions";

import Parser = require("tree-sitter");
import Matlab = require("tree-sitter-matlab");

let parser = new Parser() as g.Parser;
parser.setLanguage(Matlab);

// Type inference
// -----------------------------------------------------------------------------

type Type = {
  type: string;
  ndim: number;
  dim: Array<number>;
  ismatrix: boolean;
  ispointer: boolean;
};
    
type VarType = {
  name: string;
  type: string;
  ndim: number;
  dim: Array<number>;
  ismatrix: boolean;
  ispointer: boolean;
  initialized: boolean;
};


function typeInference(tree, custom_functions, classes) {
    // First perform type inference for function definitions
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;

        switch (c.nodeType) {
            case g.SyntaxType.FunctionDefinition: {
                let node = c.currentNode;
                let tree2 = parser.parse(node.bodyNode.text);
                let var_types2 = inferTypeFromAssignment(tree2, custom_functions, classes);
                
                // Update custom_functions with info on function return type
                let obj = custom_functions.find(x => x.name === node.nameNode.text);
                if (obj != null) {
                    
                    custom_functions = custom_functions.filter(function(e) { return e.name !== obj.name });
                    if (node.children[1].type == g.SyntaxType.ReturnValue) {
                        let return_node = node.children[1].firstChild;
                        
                        // If multiple return values, use pointers
                        if (return_node.type == g.SyntaxType.Matrix) {
                            let ptr_declaration = [];
                            let ptr_param = [];
                            for (let return_var of return_node.namedChildren) {
                                var [return_type,,,,] = inferType(return_var, var_types2, custom_functions, classes);
                                ptr_declaration.push(return_type + "* p_" + return_var.text)
                                ptr_param.push("*p_" + return_var.text);
    
                            }
                            
                            const v1: CustomFunction = { 
                                name: obj.name,
                                return_type: null,
                                ptr_param: ptr_param.join(", "), 
                                ptr_declaration: ptr_declaration.join("\n"),
                                external: obj.external,
                                file: obj.file
                            };
                            custom_functions.push(v1);
    
                        // If single return value, don't use pointers 
                        } else {
                            let [type, ndim, dim, ismatrix, ispointer] = inferType(return_node, var_types2, custom_functions, classes);
                            
                            const v1: CustomFunction = { 
                                name: obj.name, 
                                return_type: {
                                    type: type,
                                    ndim: ndim,
                                    dim: dim,
                                    ismatrix: ismatrix,
                                    ispointer: ispointer
                                },
                                ptr_param: null, 
                                ptr_declaration: null,
                                external: obj.external,
                                file: obj.file
                            };
                            custom_functions.push(v1);
                            
                        }
                    } else {
                        const v1: CustomFunction = { 
                            name: obj.name,
                            return_type: null,
                            ptr_param: null, 
                            ptr_declaration: null,
                            external: obj.external,
                            file: obj.file
                        };
                        custom_functions.push(v1);
                        
                    }
                }
                break;
            }
        }
    } while(gotoPreorderSucc(cursor));
    
    // Then perform type inference for main tree
    let entry_fun_node = findEntryFunction(tree);
    if (entry_fun_node !== null) {
        tree = parser.parse(entry_fun_node.bodyNode.text);
    }
    let var_types = inferTypeFromAssignment(tree, custom_functions, classes);
    
    return [var_types, custom_functions];
}

function inferTypeFromAssignment(tree, custom_functions, classes) {
    var var_types: VarType[] = [];
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {
            case g.SyntaxType.Assignment: {
                let node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                if (node.leftNode.type == g.SyntaxType.Identifier || node.leftNode.type == g.SyntaxType.Attribute) {
                    const [type, ndim, dim, ismatrix, ispointer] = inferType(node.rightNode, var_types, custom_functions, classes);
                    const v1: VarType = { 
                        name: node.leftNode.text, 
                        type: type, 
                        ndim: ndim, 
                        dim: dim, 
                        ismatrix: ismatrix,
                        ispointer: type == 'char' || ismatrix,
                        initialized:false
                        };
                    var_types = var_types.filter(function(e) { return e.name !== v1.name }); // replace if already in var_types
                    var_types.push(v1);
                    
        
                    
                // If LHS is subscript, type is matrix
                } else if (node.leftNode.type == g.SyntaxType.CallOrSubscript || node.leftNode.type == g.SyntaxType.CellSubscript ) {
                    const v1: VarType = { 
                        name: node.leftNode.valueNode.text, 
                        type: 'unknown', 
                        ndim: 2, 
                        dim: [1,1], 
                        ismatrix: true,
                        ispointer: true,
                        initialized: false
                    };
                    var_types = var_types.filter(function(e) { return e.name !== v1.name }); // replace if already in var_types
                    var_types.push(v1);
                    
                }

                break;
            }
        }
    } while(gotoPreorderSucc_SkipFunctionDef(cursor));
    return var_types;
}

// var unknown_type = ['unknown', null, null, null, null];
var unknown_type = ['unknown', 2, [1, 1], false, false];

function inferType(node, var_types, custom_functions, classes) {
    switch (node.type) {
        case g.SyntaxType.ParenthesizedExpression: {
            return inferType(node.firstChild, var_types, custom_functions, classes);
            break;
        }
        
        // Named types
        case g.SyntaxType.Ellipsis: {
            return ['ellipsis', 2, [1, 1], false, false];
            break
        }
        case (g.SyntaxType.True || g.SyntaxType.False): {
            return ['bool',  2, [1, 1], false, false];
            break
        }
        case g.SyntaxType.Float: {
            return ['float',  2, [1, 1], false, false];
            break
        }
        case g.SyntaxType.Integer: {
            return ['int',  2, [1, 1], false, false];
            break
        }
        case g.SyntaxType.Complex: {
            return ['complex',  2, [1, 1], false, false];
            break
        }
        case g.SyntaxType.String: {
            return ['char',  2, [1, 1], false, true];
            break
        }
        case g.SyntaxType.Cell:
        case g.SyntaxType.Matrix: {
            
            let row = 0;
            let col = 0;
            let nrows = 0;
            let ncols = 0;
            
            for (let i=0; i<node.childCount; i++) {
                if (node.children[i].type === ";") {
                    row += 1;
                    col = 0;
                }
                else if (node.children[i].isNamed) {
                    
                    if (row == 0) {
                        const [type, ndim, dim, ,] = inferType(node.children[i], var_types, custom_functions, classes);
                        ncols += dim[1];
                    }
                    if (col == 0) {
                        const [type, ndim, dim, ,] = inferType(node.children[i], var_types, custom_functions, classes);
                        nrows += dim[0];
                    }
                    col += 1;
                }
            }
            
            let children_types = [];
            
            for (let child of node.namedChildren) {
                let [child_type,,,,] = inferType(child, var_types, custom_functions, classes);
                children_types.push(child_type);
            }
            
            var type = 'unknown';
            if (children_types.every(val => val === children_types[0])) {
                type = children_types[0];
                
            } else if (children_types.every(val => ['int','float','complex'].includes(val))) {
                
                if (children_types.includes('complex')) {
                    type = 'complex';
                } else if (children_types.includes('float')) {
                    type = 'float';
                } else if (children_types.includes('int')) {
                    type = 'int'; 
                }
            } else {
                type = 'heterogeneous';
            }
            
            return [type, 2, [nrows, ncols], true, true];
            break;
        }
            
        // Recursive calls to inferTypes
        case g.SyntaxType.ComparisonOperator:
        case g.SyntaxType.BooleanOperator: {
            return ['bool', 2, [1, 1], false, false];
            break;
        }
        case g.SyntaxType.TransposeOperator: {
            const [type, ndim, dim, ismatrix, ] = inferType(node.firstChild, var_types, custom_functions, classes);
            return [type, 2, [dim[1], dim[0]], ismatrix, false];
            break;
        }
        case g.SyntaxType.UnaryOperator: {
            if (node.operatorNode.type == "~") {
                return ['bool', 2, [1, 1], false, false];
            }
            else {
                return inferType(node.firstChild, var_types, custom_functions, classes);
            }
            
            break;
        }
        case g.SyntaxType.BinaryOperator: {
            
            let [left_type, left_ndim, left_dim, left_ismatrix,] = inferType(node.leftNode, var_types, custom_functions, classes);
            let [right_type, right_ndim, right_dim, right_ismatrix,] = inferType(node.rightNode, var_types, custom_functions, classes);
            switch (node.operatorNode.type) {
                case "+": 
                case "-": 
                case ".*": 
                case "./": 
                case ".\\":
                case "^":
                case ".^": {
                    var ndim = left_ndim;
                    var dim = left_dim;
                    break;
                }
                case "*": 
                case "/":
                case "\\": {
                    var ndim = left_ndim;
                    var dim = left_dim;
                    dim[1] = right_dim[1];
                    break;
                }
            }
            
            if (left_ismatrix || right_ismatrix) {
                var ismatrix = true;
            } else {
                var ismatrix = false;
            }
                
            if (left_type == right_type) {
                return [left_type, ndim, dim, ismatrix];
            } else if (left_type == 'complex' || right_type == 'complex') {
                return ['complex', ndim, dim, ismatrix];
            } else if (left_type == 'float' || right_type == 'float') {
                return ['float', ndim, dim, ismatrix];
            } else if (left_type == 'bool') {
                return [right_type, ndim, dim, ismatrix];
            } else if (right_type == 'bool') {
                return [left_type, ndim, dim, ismatrix];
            } else {
                return unknown_type;
            }
            break;
        }
        
        // Attribute
        case g.SyntaxType.Attribute: {
            // First check if class method
            let [type,,,,] = inferType(node.objectNode, var_types, custom_functions, classes);
            let obj = classes.find(x => x.name === type);
            if (obj !== null && obj !== undefined) {
                if (obj.methods.includes(node.attributeNode.text)) {
                    // Is a method
                    // TO DO: do something like custom_functions for classes
                    // OH maybe make methods be of type CustomFunction so you can have a function dictionary
                    let obj = custom_functions.find(x => x.name === node.valueNode.text);
                    if (obj != null) {
                        if (obj.return_type == null) {
                            return unknown_type;
                        } else {
                            return [
                                obj.return_type.type, 
                                obj.return_type.ndim, 
                                obj.return_type.dim, 
                                obj.return_type.ismatrix,
                                obj.return_type.ispointer
                            ];
                        }
                    } else {
                        return unknown_type;
                    }
                }
            
            
            // If not class method, treat like an identifier (field of a struct)
            } else {
                let obj = var_types.find(x => x.name === node.text);
                if (obj != null) {
                    return [obj.type, obj.ndim, obj.dim, obj.ismatrix];
                } else {
                    return unknown_type;
                }
                break;
            }
        }
        // Identifier
        case g.SyntaxType.Identifier: {
            let obj = var_types.find(x => x.name === node.text);
            if (obj != null) {
                return [obj.type, obj.ndim, obj.dim, obj.ismatrix, obj.ispointer];
            } else {
                return unknown_type;
            }
            break;
        }
        // TO DO: FIX THIS
        case g.SyntaxType.CellSubscript: {
            let dim = [];
            for (let i=1; i<node.namedChildCount; i++) {
                var [child_type,,child_dim,,] = inferType(node.namedChildren[i], var_types, custom_functions, classes);
                dim.push(child_dim[1]);
            }
            
            if (dim.length==1 && dim[0] == 1) {
                dim = [1,1];
            }
            
            if (dim.every(val => val === 1)) {
                return [child_type, 2, dim, false, false];
            } else {
                return [child_type, 2, dim, true, true];
            }
            break;
        }
        
        case g.SyntaxType.CallOrSubscript: {
   
            let [parent_type,,,parent_ismatrix,] = inferType(node.valueNode, var_types, custom_functions, classes);

            // Is a subscript
            if (parent_ismatrix) {
                
                let dim = [];
                for (let i=1; i<node.namedChildCount; i++) {
                    let [,,child_dim,,] = inferType(node.namedChildren[i], var_types, custom_functions, classes);
                    dim.push(child_dim[1]);
                }
                
                if (dim.length==1 && dim[0] == 1) {
                    dim = [1,1];
                }
                
                if (dim.every(val => val === 1)) {
                    return [parent_type, 2, dim, false, false];
                } else {
                    return [parent_type, 2, dim, true, true];
                }
                
            // Is a class or function call    
            } else {
                let obj = classes.find(x => x.name === node.valueNode.text);
                // Is a class
                if (obj != null) {
                    return [obj.name, 1, [1], false, false];
                }
                else {
                    // Is a function call
                    let obj1 = custom_functions.find(x => x.name === node.valueNode.text);
                    let obj2 = builtin_functions.find(x => x.fun_matlab === node.valueNode.text);
                    if (obj1 != null && obj1 != undefined) {
                        if (obj1.return_type == null) {
                            return unknown_type;
                        } else {
                            return [
                                obj1.return_type.type, 
                                obj1.return_type.ndim, 
                                obj1.return_type.dim, 
                                obj1.return_type.ismatrix,
                                obj1.return_type.ispointer
                            ];
                        }
                    } else if (obj2 != null && obj2 != undefined) {
                        let [args, arg_types, outs] = parseFunctionCallNode(node);
                        let return_type = obj2.return_type(args, arg_types, outs);
                        if (return_type == null) {
                            return unknown_type;
                        } else {
                            return [
                                return_type.type, 
                                return_type.ndim, 
                                return_type.dim, 
                                return_type.ismatrix,
                                return_type.ispointer
                            ];
                        }
                    } else {
                        return unknown_type;
                    }
                }
            }
            break;
        }
        
        case g.SyntaxType.Slice: {

            let children_types = [];
            let children_vals = []
            
            for (let i=0; i<node.namedChildCount; i++) {
                let child = node.namedChildren[i];
                let [child_type,,,,] = inferType(child, var_types, custom_functions, classes);
                
                if (child_type == "keyword") {
                    
                    [,ndim,dim,,] = inferType(node.parent.valueNode, var_types, custom_functions, classes);
                    let firstNode = node.parent.namedChildren[1];
                    let current_dim = 0;
                    let dummyNode = node;
                    while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                        dummyNode = dummyNode.previousNamedSibling;
                        current_dim += 1;
                    }
                    
                    children_vals.push(dim[current_dim]);
                    children_types.push('int');
                } else {
                    children_vals.push(Number(child.text));
                    children_types.push(child_type);
                }
                
            }
            
            
            var type = 'unknown';
            if (children_types.every(val => ['int','float','complex'].includes(val))) {
                
                if (children_types.includes('complex')) {
                    type = 'complex';
                } else if (children_types.includes('float')) {
                    type = 'float';
                } else if (children_types.includes('int')) {
                    type = 'int'; 
                }
            }
            
            
            let start = children_vals[0];
            var stop = children_vals[1];
            var step = 1;
                
            if (children_vals.length == 3) {
                stop = children_vals[2];
                step = children_vals[1];
            }
            
            let len = Math.floor((stop-start)/step) + 1;
            // TO DO: Maybe change so that it's only pointer, not a matrix and
            // represented in generateCode by creating an array, not a matrix
            return [type, 2, [1, len], true, true];
        }
        
        case g.SyntaxType.Keyword: {
            return ['keyword', 2, [1, 1], false, false]
        }
        
        // Default
        default: return unknown_type;
    }
    
    // Return args, arg_types, outs from function
    function parseFunctionCallNode(node) {
        if (node.parent.type == g.SyntaxType.Assignment) {
            return parseFunctionCallNode(node.parent);
        } else {
            switch (node.type) {
                case g.SyntaxType.Assignment: {
                    var left_node = node.leftNode;
                    var right_node = node.rightNode;
                    break;
                }
                default: {
                    var left_node = null;
                    var right_node = node;
                    break;
                }
            }
            let args = [];
            let arg_types: Type[] = [];
            switch (right_node.type) {
                case g.SyntaxType.CallOrSubscript: {
                    for (let i = 1; i < right_node.namedChildCount; i++) {
                        //if (transformNode(right_node.namedChildren[i]) != undefined) {
                        //    args.push(transformNode(right_node.namedChildren[i]));   
                        //} else {
                            args.push(right_node.namedChildren[i].text);
                        //}
                        let [type, ndim, dim, ismatrix, ispointer] = inferType(right_node.namedChildren[i], var_types, custom_functions, classes);
                        arg_types.push({
                            type: type, 
                            ndim: ndim, 
                            dim: dim, 
                            ismatrix: ismatrix, 
                            ispointer: ispointer
                        });
                    }
                    break;
                }
                case g.SyntaxType.ComparisonOperator:
                case g.SyntaxType.BooleanOperator:
                case g.SyntaxType.BinaryOperator: {
                    let [l_type, l_ndim, l_dim, l_ismatrix, l_ispointer] = inferType(right_node.leftNode, var_types, custom_functions, classes);
                    let [r_type, r_ndim, r_dim, r_ismatrix, r_ispointer] = inferType(right_node.rightNode, var_types, custom_functions, classes);
                    arg_types.push({
                        type: l_type, 
                        ndim: l_ndim, 
                        dim: l_dim, 
                        ismatrix: l_ismatrix, 
                        ispointer: l_ispointer
                    });
                    arg_types.push({
                        type: r_type, 
                        ndim: r_ndim, 
                        dim: r_dim, 
                        ismatrix: r_ismatrix, 
                        ispointer: r_ispointer
                    });
                    //if (transformNode(right_node.leftNode) != undefined) {
                    //    args.push(transformNode(right_node.leftNode));   
                    //} else {
                        args.push(right_node.leftNode.text);
                    //}
                    //if (transformNode(right_node.rightNode) != undefined) {
                    //    args.push(transformNode(right_node.rightNode));   
                    //} else {
                        args.push(right_node.rightNode.text);
                    //}
                    break;
                }
                case g.SyntaxType.UnaryOperator:
                case g.SyntaxType.TransposeOperator: {
                    let [type, ndim, dim, ismatrix, ispointer] = inferType(right_node.argumentNode, var_types, custom_functions, classes);
                    arg_types.push({
                        type: type, 
                        ndim: ndim, 
                        dim: dim, 
                        ismatrix: ismatrix, 
                        ispointer: ispointer
                    });
                    //if (transformNode(right_node.argumentNode) != undefined) {
                    //    args.push(transformNode(right_node.argumentNode));   
                    //} else {
                        args.push(right_node.argumentNode.text);
                    //}
                    break;
                }
            }
            
            let outs = [];
            if (left_node.type == g.SyntaxType.Matrix) {
                for (let child of left_node.namedChildren) {
                    //if (transformNode(child) != undefined) {
                    //    outs.push(transformNode(child));   
                    //} else {
                        outs.push(child.text);
                    //}
                }
            } else {
                //if (transformNode(left_node) != undefined) {
                //    outs.push(transformNode(left_node));   
                //} else {
                    outs.push(left_node.text);
                //}
            }
                    
            return [args, arg_types, outs];
        }
    }
}
    
export {Type, VarType, typeInference, inferType};