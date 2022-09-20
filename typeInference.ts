var fs = require('fs');
import * as g from "./generated";
import { 
    gotoPreorderSucc_SkipFunctionDef, 
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
  isstruct: boolean;
};
    
type VarType = {
  name: string;
  type: string;
  ndim: number;
  dim: Array<number>;
  ismatrix: boolean;
  ispointer: boolean;
  isstruct: boolean;
  initialized: boolean;
};


function typeInference(file, custom_functions, classes) {
    var var_types: VarType[] = [];
    const sourceCode = fs.readFileSync(file, "utf8");
    let tree = parser.parse(sourceCode);
    let entry_fun_node = findEntryFunction(tree);
    if (entry_fun_node != null) {
        tree = parser.parse(entry_fun_node.bodyNode.text);
        let class_name = file.match(/(?<=@)(.*?)(?=\/)/);
        if (class_name != null) {
            var_types.push({
                name: entry_fun_node.parametersNode.namedChildren[0].text,
                type: class_name[0],
                ndim: 2,
                dim: [1,1],
                ismatrix: false,
                ispointer: false,
                isstruct: true,
                initialized: false
            });    
        }
    }

    [var_types, custom_functions] = inferTypeFromAssignment(tree, var_types, custom_functions, classes, file);
    return [var_types, custom_functions];
}

function inferTypeFromAssignment(tree, var_types, custom_functions, classes, file) {
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {
            case g.SyntaxType.Assignment: {
                let node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                if (node.leftNode.type == g.SyntaxType.Identifier || node.leftNode.type == g.SyntaxType.Attribute) {
                    let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(node.rightNode, var_types, custom_functions, classes, file);
                    custom_functions = c;
                    let v1: VarType = { 
                        name: node.leftNode.text, 
                        type: type, 
                        ndim: ndim, 
                        dim: dim, 
                        ismatrix: ismatrix,
                        ispointer: type == 'char' || ismatrix,
                        isstruct: isstruct,
                        initialized: false
                        };
                    
                    var_types = var_types.filter(function(e) { return e.name !== v1.name }); // replace if already in var_types
                    var_types.push(v1);
                    
                // If LHS is subscript, type is matrix
                } else if (node.leftNode.type == g.SyntaxType.CallOrSubscript || node.leftNode.type == g.SyntaxType.CellSubscript ) {
                    let v1: VarType = { 
                        name: node.leftNode.valueNode.text, 
                        type: 'unknown', 
                        ndim: 2, 
                        dim: [1,1], 
                        ismatrix: true,
                        ispointer: true,
                        isstruct: false,
                        initialized: false
                    };
                    var_types = var_types.filter(function(e) { return e.name !== v1.name }); // replace if already in var_types
                    var_types.push(v1);
                    
                }

                break;
            }
        }
    } while(gotoPreorderSucc_SkipFunctionDef(cursor));
    return [var_types, custom_functions];
}

function getFunctionReturnType(fun_name, arg_types, fun_dictionary, custom_functions, classes, file) {
    // Update custom_functions with info on function return type
    let obj = fun_dictionary.find(x => x.name === fun_name);
    if (obj != null) {
        let tree2 = parser.parse(obj.def_node.bodyNode.text);
        let [var_types2, c] = inferTypeFromAssignment(tree2, arg_types, custom_functions, classes, file);
        custom_functions = c;
        fun_dictionary = fun_dictionary.filter(function(e) { return e.name !== fun_name });
        let return_node = obj.def_node.return_variableNode;
        if (obj.def_node.namedChildren[0].type == g.SyntaxType.ReturnValue) {
            return_node = obj.def_node.namedChildren[0];
        }
        
        if (return_node != undefined) {
            return_node = return_node.firstChild;
            // If multiple return values, use pointers
            
            if (return_node.type == g.SyntaxType.Matrix) {
                
                const v1: CustomFunction = { 
                    name: obj.name,
                    arg_types: arg_types,
                    return_type: null,
                    outs_transform: (outs) => null,
                    external: obj.external,
                    file: obj.file,
                    def_node: obj.def_node,
                    ptr_args: (arg_types, outs) => {
                        let ptr_args = [];
                        for (let i = 0; i < return_node.namedChildCount; i++) {
                            let return_var = return_node.namedChildren[i];
                            let [return_type, return_ndim, return_dim, return_ismatrix, return_ispointer, return_isstruct, c] = inferType(return_var, var_types2, custom_functions, classes, file);
                            custom_functions = c;
                            let return_name = `*p_${return_var.text}`;
                            if (outs.length > i) {
                                return_name = outs[i];
                            }
                            ptr_args.push({
            			        name: outs[i],
            			        type: return_type,
            			        ndim: return_ndim,
            			        dim: return_dim,
            			        ismatrix: return_ismatrix,
            			        ispointer: true,
                                isstruct: return_isstruct
            			    });
                        }
            			return ptr_args;
            		}
                };
                fun_dictionary.push(v1);
                return [v1.return_type, fun_dictionary];

            // If single return value, don't use pointers 
            } else {
                let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(return_node, var_types2, custom_functions, classes, file);
                custom_functions = c;
                const v1: CustomFunction = { 
                    name: obj.name, 
                    arg_types: arg_types,
                    outs_transform: (outs) => outs,
                    return_type: {
                        type: type,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: ismatrix,
                        ispointer: ispointer,
                        isstruct: isstruct
                    },
                    ptr_args: (arg_types, outs) => null,
                    external: obj.external,
                    file: obj.file,
                    def_node: obj.def_node
                };
                fun_dictionary.push(v1);
                return [v1.return_type, fun_dictionary];
                
            }
        } else {
            const v1: CustomFunction = { 
                name: obj.name,
                arg_types: arg_types,
                outs_transform: (outs) => outs,
                return_type: null,
                //ptr_param: null, 
                //ptr_declaration: null,
                ptr_args: (arg_types, outs) => null,
                external: obj.external,
                file: obj.file,
                def_node: obj.def_node
            };
            fun_dictionary.push(v1);
            return [v1.return_type, fun_dictionary];
            
        }
    }
}

function inferType(node, var_types, custom_functions, classes, file) {
    // var unknown_type = ['unknown', null, null, null, null, null, custom_functions];
    // var unknown_type = ['unknown', 2, [1, 1], false, false, false, custom_functions];
    
    switch (node.type) {
        case g.SyntaxType.ParenthesizedExpression: {
            return inferType(node.firstChild, var_types, custom_functions, classes, file);
            break;
        }
        
        // Named types
        case g.SyntaxType.Ellipsis: {
            //return ['ellipsis', 2, [1, 1], false, false, false, custom_functions];
            return ['ellipsis', 1, [1], false, false, false, custom_functions];
            break
        }
        case (g.SyntaxType.True || g.SyntaxType.False): {
            //return ['bool',  2, [1, 1], false, false, false, custom_functions];
            return ['bool',  1, [1], false, false, false, custom_functions];
            break
        }
        case g.SyntaxType.Float: {
            //return ['float',  2, [1, 1], false, false, false, custom_functions];
            return ['float',  1, [1], false, false, false, custom_functions];
            break
        }
        case g.SyntaxType.Integer: {
            //return ['int',  2, [1, 1], false, false, false, custom_functions];
            return ['int',  1, [1], false, false, false, custom_functions];
            break
        }
        case g.SyntaxType.Complex: {
            //return ['complex',  2, [1, 1], false, false, false, custom_functions];
            return ['complex',  1, [1], false, false, false, custom_functions];
            break
        }
        case g.SyntaxType.String: {
            //return ['char',  2, [1, 1], false, true, false, custom_functions];
            return ['char',  2, [1, node.text.length], false, true, false, custom_functions];
            //return ['char',  1, [node.text.length], false, true, false, custom_functions];
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
                        const [type, ndim, dim,,,, c] = inferType(node.children[i], var_types, custom_functions, classes, file);
                        custom_functions = c;
                        if (ndim > 1) {
                            ncols += dim[1];
                        } else {
                            ncols += dim[0];
                        }
                    }
                    if (col == 0) {
                        const [type, ndim, dim,,,, c] = inferType(node.children[i], var_types, custom_functions, classes, file);
                        custom_functions = c;
                        nrows += dim[0];
                    }
                    col += 1;
                }
            }
            
            let children_types = [];
            
            for (let child of node.namedChildren) {
                let [child_type,,,,,, c] = inferType(child, var_types, custom_functions, classes, file);
                custom_functions = c;
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
            
            return [type, 2, [nrows, ncols], true, true, false, custom_functions];
            break;
        }
            
        // Recursive calls to inferTypes
        case g.SyntaxType.ComparisonOperator:
        case g.SyntaxType.BooleanOperator: {
            return ['bool', 2, [1, 1], false, false, false, custom_functions];
            break;
        }
        case g.SyntaxType.TransposeOperator: {
            const [type, ndim, dim, ismatrix,,, c] = inferType(node.firstChild, var_types, custom_functions, classes, file);
            custom_functions = c;
            return [type, 2, [dim[1], dim[0]], ismatrix, false, false, custom_functions];
            break;
        }
        case g.SyntaxType.UnaryOperator: {
            if (node.operatorNode.type == "~") {
                return ['bool', 2, [1, 1], false, false, false, custom_functions];
            }
            else {
                return inferType(node.firstChild, var_types, custom_functions, classes, file);
            }
            
            break;
        }
        case g.SyntaxType.BinaryOperator: {
            
            let [left_type, left_ndim, left_dim, left_ismatrix,,, c1] = inferType(node.leftNode, var_types, custom_functions, classes, file);
            custom_functions = c1;
            let [right_type, right_ndim, right_dim, right_ismatrix,,, c2] = inferType(node.rightNode, var_types, custom_functions, classes, file);
            custom_functions = c2;
            let ndim = left_ndim;
            let dim = left_dim;
            switch (node.operatorNode.type) {
                /*case "+": 
                case "-": 
                case ".*": 
                case "./": 
                case ".\\":
                case "^":
                case ".^": {
                    break;
                }*/
                case "*": 
                case "/":
                case "\\": {
                    if (left_ndim == 1) {
                        ndim = right_ndim;
                        dim = right_dim; 
                    } else if (right_ndim == 1) {
                        ndim = left_ndim;
                        dim = left_dim;
                    } else {
                        dim = [left_dim[0], right_dim[1]];
                    }
                    break;
                }
            }
                
            if (left_ismatrix || right_ismatrix) {
                var ismatrix = true;
            } else {
                var ismatrix = false;
            }
                    
            if (left_type == right_type) {
                return [left_type, ndim, dim, ismatrix, false, false, custom_functions];
            } else if (left_type == 'complex' || right_type == 'complex') {
                return ['complex', ndim, dim, ismatrix, false, false, custom_functions];
            } else if (left_type == 'float' || right_type == 'float') {
                return ['float', ndim, dim, ismatrix, false, false, custom_functions];
            } else if (left_type == 'bool') {
                return [right_type, ndim, dim, ismatrix, false, false, custom_functions];
            } else if (right_type == 'bool') {
                return [left_type, ndim, dim, ismatrix, false, false, custom_functions];
            } else {
                return ['unknown', 2, [1, 1], false, false, false, custom_functions];
            }
            break;
        }
        
        // Attribute
        case g.SyntaxType.Attribute: {
            // First check if class method
            let [type,,,,,, c] = inferType(node.objectNode, var_types, custom_functions, classes, file);
            custom_functions = c;
            let obj = classes.find(x => x.name === type);
            if (obj !== null && obj !== undefined) {
                let obj2 = obj.methods.find(x => x.name === node.attributeNode.text);
                if (obj2 != null) {
                    if (obj2.return_type == null) {
                        return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                    } else {
                        return [
                            obj2.return_type.type, 
                            obj2.return_type.ndim, 
                            obj2.return_type.dim, 
                            obj2.return_type.ismatrix,
                            obj2.return_type.ispointer,
                            obj2.return_type.isstruct,
                            custom_functions
                        ];
                    }
                } else {
                    return ['unknown', 2, [1, 1], false, false, false, custom_functions]; 
                }
            
            
            // If not class method, treat like an identifier (field of a struct)
            } else {
                let obj = var_types.find(x => x.name === node.text);
                if (obj != null) {
                    return [obj.type, obj.ndim, obj.dim, obj.ismatrix, obj.ispointer, obj.isstruct, custom_functions];
                } else {
                    return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                }
                break;
            }
        }
        // Identifier
        case g.SyntaxType.Identifier: {
            let obj = var_types.find(x => x.name === node.text);
            if (obj != null) {
                return [obj.type, obj.ndim, obj.dim, obj.ismatrix, obj.ispointer, obj.isstruct, custom_functions];
            } else {
                return ['unknown', 2, [1, 1], false, false, false, custom_functions];
            }
            break;
        }
        // TO DO: FIX THIS
        case g.SyntaxType.CellSubscript: {
            let dim = [];
            for (let i=1; i<node.namedChildCount; i++) {
                var [child_type,,child_dim,,,, c] = inferType(node.namedChildren[i], var_types, custom_functions, classes, file);
                custom_functions = c;
                dim.push(child_dim[1]);
            }
            
            if (dim.length==1 && dim[0] == 1) {
                dim = [1,1];
            }
            
            if (dim.every(val => val === 1)) {
                return [child_type, 2, dim, false, false, false, custom_functions];
            } else {
                return [child_type, 2, dim, true, true, false, custom_functions];
            }
            break;
        }
        
        case g.SyntaxType.CallOrSubscript: {
   
            let [parent_type,,,parent_ismatrix,,parent_isstruct, c] = inferType(node.valueNode, var_types, custom_functions, classes, file);
            custom_functions = c;
            
            // Is a subscript
            if (parent_ismatrix || parent_isstruct) {
                
                let dim = [];
                for (let i=1; i<node.namedChildCount; i++) {
                    let [,,child_dim,,,, c] = inferType(node.namedChildren[i], var_types, custom_functions, classes, file);
                    custom_functions = c;
                    dim.push(child_dim[1]);
                }
                
                if (dim.length==1 && dim[0] == 1) {
                    dim = [1,1];
                }
                
                if (dim.every(val => val === 1)) {
                    return [parent_type, 2, dim, false, false, parent_isstruct, custom_functions];
                } else {
                    return [parent_type, 2, dim, true, true, parent_isstruct, custom_functions];
                }
                
            // Is a class or function call    
            } else {
                let obj = classes.find(x => x.name === node.valueNode.text);
                // Is a class (treat as structure)
                if (obj != null) {
                    return [obj.name, 2, [1,1], false, false, true, custom_functions];
                }
                else {
                    // Is a function call
                    // recursive function call
                    let filename = file.match(/((?<=\/)([^\/]*?)(?=\.m))|(^([^\/]*?)(?=\.m))/);
                    if (filename[0] != node.valueNode.text) {
                        let [args, arg_types, outs] = parseFunctionCallNode(node);
                        let obj1 = classes.find(x => x.name === arg_types[0].type);
                        let obj2 = custom_functions.find(x => x.name === node.valueNode.text);
                        let obj3 = builtin_functions.find(x => x.fun_matlab === node.valueNode.text);
                        if (obj1 != null && obj1 != undefined) {
                            let obj = obj1.methods.find(x => x.name === node.valueNode.text);
                            if (obj != null && obj != undefined) {
                                for (let i=0; i < arg_types.length; i++) {
                                    obj.arg_types[i].type = arg_types[i].type;
                                    obj.arg_types[i].ndim = arg_types[i].ndim;
                                    obj.arg_types[i].dim = arg_types[i].dim;
                                    obj.arg_types[i].ismatrix = arg_types[i].ismatrix;
                                    obj.arg_types[i].ispointer = arg_types[i].ispointer;
                                }
                                let return_type = null;
                                [return_type, obj1.methods] = getFunctionReturnType(node.valueNode.text, obj.arg_types, obj1.methods, custom_functions, classes, file); 
                                if (return_type == null) {
                                    return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                                } else {
                                    return [
                                        return_type.type, 
                                        return_type.ndim, 
                                        return_type.dim, 
                                        return_type.ismatrix,
                                        return_type.ispointer,
                                        return_type.isstruct,
                                        custom_functions
                                    ];
                                }
                            } 
                        } 
                        if (obj2 != null && obj2 != undefined) {
                            // make sure class method receives arg of class type
                            let class_name = obj2.file.match(/(?<=@)(.*?)(?=\/)/);
                            let flag = true;
                            if (class_name != null) {
                                if (arg_types[0].type != class_name) {
                                    flag = false;
                                }
                            }
                            if (flag == true) {
                                for (let i=0; i < arg_types.length; i++) {
                                    obj2.arg_types[i].type = arg_types[i].type;
                                    obj2.arg_types[i].ndim = arg_types[i].ndim;
                                    obj2.arg_types[i].dim = arg_types[i].dim;
                                    obj2.arg_types[i].ismatrix = arg_types[i].ismatrix;
                                    obj2.arg_types[i].ispointer = arg_types[i].ispointer;
                                }
                                let return_type = null;
                                [return_type, custom_functions] = getFunctionReturnType(node.valueNode.text, obj2.arg_types, custom_functions, custom_functions, classes, file);
                                if (return_type == null) {
                                    return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                                } else {
                                    return [
                                        return_type.type, 
                                        return_type.ndim, 
                                        return_type.dim, 
                                        return_type.ismatrix,
                                        return_type.ispointer,
                                        return_type.isstruct,
                                        custom_functions
                                    ];
                                }
                            }
                        }
                        if (obj3 != null && obj3 != undefined) {
                            let return_type = obj3.return_type(args, arg_types, outs);
                            if (return_type == null) {
                                return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                            } else {
                                return [
                                    return_type.type, 
                                    return_type.ndim, 
                                    return_type.dim, 
                                    return_type.ismatrix,
                                    return_type.ispointer,
                                    return_type.isstruct,
                                    custom_functions
                                ];
                            }
                        } else {
                            return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                        }
                    } else {
                        return ['unknown', 2, [1, 1], false, false, false, custom_functions];
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
                let [child_type,,,,,, c] = inferType(child, var_types, custom_functions, classes, file);
                custom_functions = c;
                
                if (child_type == "keyword") {
                    
                    let [,ndim,dim,,,, c] = inferType(node.parent.valueNode, var_types, custom_functions, classes, file);
                    custom_functions = c;
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
            return [type, 2, [1, len], true, true, false, custom_functions];
        }
        
        case g.SyntaxType.Keyword: {
            return ['keyword', 2, [1, 1], false, false, false, custom_functions]
        }
        
        // Default
        default: return ['unknown', 2, [1, 1], false, false, false, custom_functions];
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
                        let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(right_node.namedChildren[i], var_types, custom_functions, classes, file);
                        custom_functions = c;
                        arg_types.push({
                            type: type, 
                            ndim: ndim, 
                            dim: dim, 
                            ismatrix: ismatrix, 
                            ispointer: ispointer,
                            isstruct: isstruct
                        });
                    }
                    break;
                }
                case g.SyntaxType.ComparisonOperator:
                case g.SyntaxType.BooleanOperator:
                case g.SyntaxType.BinaryOperator: {
                    let [l_type, l_ndim, l_dim, l_ismatrix, l_ispointer, l_isstruct, c1] = inferType(right_node.leftNode, var_types, custom_functions, classes, file);
                    custom_functions = c1;
                    let [r_type, r_ndim, r_dim, r_ismatrix, r_ispointer, r_isstruct, c2] = inferType(right_node.rightNode, var_types, custom_functions, classes, file);
                    custom_functions = c2;
                    arg_types.push({
                        type: l_type, 
                        ndim: l_ndim, 
                        dim: l_dim, 
                        ismatrix: l_ismatrix, 
                        ispointer: l_ispointer,
                        isstruct: l_isstruct
                    });
                    arg_types.push({
                        type: r_type, 
                        ndim: r_ndim, 
                        dim: r_dim, 
                        ismatrix: r_ismatrix, 
                        ispointer: r_ispointer,
                        isstruct: r_isstruct
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
                    let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(right_node.argumentNode, var_types, custom_functions, classes, file);
                    custom_functions = c;
                    arg_types.push({
                        type: type, 
                        ndim: ndim, 
                        dim: dim, 
                        ismatrix: ismatrix, 
                        ispointer: ispointer,
                        isstruct: isstruct
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
            if (left_node == null) {
            } else if (left_node.type == g.SyntaxType.Matrix) {
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