var fs = require('fs');
import * as g from "./generated";
import { 
    gotoPreorderSucc_SkipFunctionDef, 
    findEntryFunction
} from "./treeTraversal";
import { numel } from "./helperFunctions";
import { binaryOpType, CustomFunction, VarType, Type, Alias } from "./customTypes";
import { builtin_functions } from "./builtinFunctions";
import { filterByScope } from "./helperFunctions";
import Parser = require("tree-sitter");
import Matlab = require("tree-sitter-matlab");

let parser = new Parser() as g.Parser;
parser.setLanguage(Matlab);

// Type inference
// -----------------------------------------------------------------------------

export function findVarScope(node, block_idxs, current_code, debug) {
    if (debug == 1) {
        console.log("findVarScope");
    }
    
    let entire_scope = block_idxs.find(x => x[2] == 0);
    let good_blocks = [];
    if (current_code == "main") {
        good_blocks = block_idxs.filter(function(e) { return e[2] >= 1 });
    } else {
        good_blocks = block_idxs.filter(function(e) { return e[2] == -1 });
    }
    
    let scope = good_blocks.filter(function(e) { return e[0] <= node.startIndex && e[1] >= node.endIndex } );
    scope = scope[scope.length - 1];
    if (scope != null && scope != undefined) {
        return scope;
    } 
    
    if (current_code == "main") {
        let fundef_blocks = block_idxs.filter(function(e) { return e[2] == -1 });
        if (fundef_blocks.length != 0) {
            if (node.startIndex >= entire_scope[0] && node.endIndex < fundef_blocks[0][0]) {
                return [entire_scope[0], fundef_blocks[0][0], 0];
            }
        } 
        return [entire_scope[0], entire_scope[1], 0];
    }
}


function typeInference(file, custom_functions, classes, debug) {
    if (debug == 1) {
        console.log("typeInference");
    }
    
    var var_types: VarType[] = [];
    let block_idxs = [];
    const sourceCode = fs.readFileSync(file, "utf8");
    let tree = parser.parse(sourceCode);
    let entry_fun_node = findEntryFunction(tree, debug);
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
                isvector: false,
                ispointer: false,
                isstruct: true,
                initialized: false,
                scope: findVarScope(entry_fun_node, block_idxs, "main", debug) // come back here
            });    
        }
    }

    let alias_tbl: Alias[] = [];
    [var_types, custom_functions, block_idxs] = inferTypeFromAssignment(tree, var_types, custom_functions, classes, file, alias_tbl, debug, []);
    return [var_types, custom_functions, block_idxs];
}
// to do: add tree_idx = [node.startIndex, node.endIndex]
// then after traversing tree make sure each variable's scope is updated to scope + tree_idx[0] 
function inferTypeFromAssignment(tree, var_types, custom_functions, classes, file, alias_tbl, debug, block_idxs) {
    if (debug == 1) {
        console.log("inferTypeFromAssignment");
    }
    
    //let block_idxs = [];
    let fun_flag = false;
    let scaler = 0;
    if (block_idxs.length > 0) {
        // examining a function definition
        fun_flag = true;
        scaler = block_idxs[0][0];
    }
    let block_level = 0;
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
       
        switch (c.nodeType) {
            case g.SyntaxType.Module: {
                let node = c.currentNode;
                block_idxs.push([node.startIndex, node.endIndex, 0]); // 0 indicates entire program
                break;
            }
            case g.SyntaxType.Block: {
                let node = c.currentNode;
                if (block_idxs[block_idxs.length - 1][0] < node.startIndex && node.endIndex < block_idxs[block_idxs.length - 1][1]) {
                    block_level = block_level + 1;
                } else {
                    let prev_blocks = block_idxs.filter(function(e) { return e[1] < node.startIndex });
                    if (prev_blocks.length != 0) {
                        let prev_block = prev_blocks.reduce((max, block) => max[1] > block[1] ? max : block);
                        block_level = prev_block[2];
                    } 
                }
                block_idxs.push([node.startIndex, node.endIndex, block_level]); // 1 for regular blocks
                break;
            }
            case g.SyntaxType.FunctionDefinition: {
                let node = c.currentNode;
                block_idxs.push([node.startIndex, node.endIndex, -1]); // 2 for function def blocks 
                break;
            }
        }
    } while(gotoPreorderSucc_SkipFunctionDef(cursor, debug));
    let count = 0;
    cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {
            case g.SyntaxType.Assignment: {
                let node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                let [type, ndim, dim, ismatrix, ispointer, isstruct, cf] = inferType(node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug);
                custom_functions = cf;
                let scope = findVarScope(node, block_idxs, "main", debug);
                if (node.leftNode.type == g.SyntaxType.Identifier || node.leftNode.type == g.SyntaxType.Attribute) {
                    let name = node.leftNode.text;
                    let v1 = filterByScope(var_types, name, node, 1);
                    if (v1.length > 0) {
                        count = count + 1;
                        v1 = v1[v1.length - 1];
                        
                        if (scope[2] == v1.scope[2]) { // same block level
                            var_types = var_types.filter(function(e) { return JSON.stringify(e) !== JSON.stringify(v1)}); // replace if already in var_types
                            
                            let re = new RegExp(`\\b${v1.name}\\b`);
                            if (re.test(node.rightNode.text)) {
                                v1.scope = [v1.scope[0], node.parent.nextNamedSibling.startIndex - 1, v1.scope[2]];
                                var_types.push(v1);
                                
                                let v2 = {
                                    name: v1.name,
                                    type: type,
                                    ndim: ndim,
                                    dim: dim,
                                    ismatrix: ismatrix,
                                    isvector: numel(dim) > 1 && !ismatrix,
                                    ispointer: ispointer, //type == 'char' || ismatrix,
                                    isstruct: isstruct,
                                    scope: [node.parent.nextNamedSibling.startIndex, scope[1], scope[2]],
                                    initialized: true
                                }
                                var_types.push(v2);
                            } else {
                                v1.scope = [v1.scope[0], node.startIndex - 1, v1.scope[2]];
                                var_types.push(v1);
                                
                                let v2 = {
                                    name: v1.name,
                                    type: type,
                                    ndim: ndim,
                                    dim: dim,
                                    ismatrix: ismatrix,
                                    isvector: numel(dim) > 1 && !ismatrix,
                                    ispointer: ispointer, //type == 'char' || ismatrix,
                                    isstruct: isstruct,
                                    scope: [node.startIndex, scope[1], scope[2]],
                                    initialized: true
                                }
                                var_types.push(v2);
                            }
                        }
                    } else {
                        v1 = { 
                            name: node.leftNode.text, 
                            type: type, 
                            ndim: ndim, 
                            dim: dim, 
                            ismatrix: ismatrix,
                            isvector: numel(dim) > 1 && !ismatrix,
                            ispointer: ispointer, //type == 'char' || ismatrix,
                            isstruct: isstruct,
                            initialized: false,
                            scope: scope
                        };
                        var_types.push(v1);
                    }
                        
                // If LHS is subscript, type is matrix
                } else if (node.leftNode.type == g.SyntaxType.CallOrSubscript || node.leftNode.type == g.SyntaxType.CellSubscript ) {
                //} else if (node.leftNode.type == g.SyntaxType.CallOrSubscript) {
                    let name = node.leftNode.valueNode.text;
                    let v3 = filterByScope(var_types, name, node, 0);
                    if (v3 != null && v3 != undefined) {
                        var_types = var_types.filter(function(e) { return JSON.stringify(e) !== JSON.stringify(v3)}); // replace if already in var_types
                        v3.type = type;
                        
                        let obj = var_types.find(x => x.name === `${name}_childtype`);
                        if (obj != null && obj != undefined) {
                            let child_ndim = obj.ndim;
                            let child_dim = obj.dim;
                            let child_ismatrix = obj.ismatrix;
                            
                            if (dim.toString() != obj.dim.toString()) {
                                child_ndim = "unknown";
                                child_dim = "unknown";
                            }
                            if (ismatrix != obj.ismatrix) {
                                child_ismatrix = "unknown";
                            }
                            
                            var_types = var_types.filter(function(e) { return e.name !== `${name}_childtype`}); // replace if al
                            var_types.push({
                                name: `${name}_childtype`,
                                type: binaryOpType(type, obj.type),
                                ndim: child_ndim,
                                dim: child_dim,
                                ismatrix: child_ismatrix,
                                isvector: false,
                                ispointer: false,
                                isstruct: false,
                                initialized: false,
                                scope: null
                            });
                            
                        } else {
                            var_types.push({
                                name: `${name}_childtype`,
                                type: type,
                                ndim: ndim,
                                dim: dim,
                                ismatrix: ismatrix,
                                isvector: false,
                                ispointer: false,
                                isstruct: false,
                                initialized: false,
                                scope: null
                            });
                        }
                    } else {
                            v3 = { 
                            name: name, 
                            type: type, 
                            ndim: 2,
                            dim: [1,1],
                            ismatrix: true,
                            isvector: false,
                            ispointer: false,
                            isstruct: false,
                            initialized: false,
                            scope: scope
                        };
                    }
                    
                    var_types.push(v3);
                }

                break;
            }
            case g.SyntaxType.ForStatement: {
                let node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                let [type, ndim, dim, ismatrix, ispointer, isstruct, cf] = inferType(node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug);
                custom_functions = cf;
                if (node.leftNode.type == g.SyntaxType.Identifier) {
                    let v1: VarType = { 
                        name: node.leftNode.text, 
                        type: type, 
                        ndim: 1, 
                        dim: [1], 
                        ismatrix: false,
                        isvector: false,
                        ispointer: false,
                        isstruct: false,
                        initialized: false,
                        scope: findVarScope(node, block_idxs, "main", debug)
                    };
                        
                    var_types = var_types.filter(function(e) { return e.name != v1.name }); // replace if already in var_types
                    var_types.push(v1);
                }
                break;
            }
            case g.SyntaxType.CallOrSubscript: { // This helps update the argument types of function definitions
                let node = c.currentNode;
                let [, , , , , , cf] = inferType(node, var_types, custom_functions, classes, file, alias_tbl, debug);
                custom_functions = cf;
                break;
            }
        }
    } while(gotoPreorderSucc_SkipFunctionDef(cursor, debug));

    return [var_types, custom_functions, block_idxs];
}

function getFunctionReturnType(fun_name, arg_types, fun_dictionary, custom_functions, classes, file, alias_tbl, debug, isclass) {
    // Update custom_functions with info on function return type
    if (debug == 1) {
        console.log("getFunctionReturnType");
    }
    
    let obj = fun_dictionary.find(x => x.name === fun_name);
    if (obj != null) {
        let tree2 = parser.parse(obj.def_node.bodyNode.text);
        
        for (let i = 0; i < arg_types.length; i++) {
            arg_types[i].scope = [0, obj.def_node.endIndex - obj.def_node.startIndex, -1]; // "transpose" since passing adjusted tree
            arg_types[i].initialized = true;
        }
        
        let block_idxs = [[0, obj.def_node.endIndex - obj.def_node.startIndex, 0]];
        let [var_types2, c] = inferTypeFromAssignment(tree2, arg_types, custom_functions, classes, file, alias_tbl, debug, block_idxs);
        
        for (let i = 0; i < var_types2.length; i++) {
            if (var_types2[i].scope[0] == 0) {
                var_types2[i].scope[0] += obj.def_node.startIndex;
            } else {
                var_types2[i].scope[0] += obj.def_node.bodyNode.startIndex;
            }
            if (var_types2[i].scope[1] == obj.def_node.endIndex - obj.def_node.startIndex) {
                var_types2[i].scope[1] += obj.def_node.startIndex;
            } else {
                var_types2[i].scope[1] += obj.def_node.bodyNode.startIndex;
            }
            if (var_types2[i].scope[2] == -1) {
                var_types2[i].scope[2] = 0;
            }
        }
        
        if (!isclass) {
            fun_dictionary = c; // may need to change for classes
        }
        custom_functions = c;

        let return_node = obj.def_node.return_variableNode;
        
        if (return_node != undefined) {
            return_node = return_node.firstChild;
            // If multiple return values, use pointers
            if (return_node.type == g.SyntaxType.Matrix) {
                let all_types = [];
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
                            let [return_type, return_ndim, return_dim, return_ismatrix, return_ispointer, return_isstruct, c] = inferType(return_var, var_types2, custom_functions, classes, file, alias_tbl, debug);
                            all_types.push(return_type);
                            custom_functions = c;
                            let return_name = return_var.text;
                            if (outs.length > i) {
                                return_name = outs[i];
                            }
                            
                            ptr_args.push({
            			        name: return_name,
            			        type: return_type,
            			        ndim: return_ndim,
            			        dim: return_dim,
            			        ismatrix: return_ismatrix,
            			        isvector: numel(return_dim) > 1 && !return_ismatrix,
            			        ispointer: true,
                                isstruct: return_isstruct
            			    });
                        }
            			return ptr_args;
            		},
            		var_types: var_types2
                };
                if (!all_types.includes("unknown")) {
                    fun_dictionary = fun_dictionary.filter(function(e) { return e.name !== fun_name });
                    fun_dictionary.push(v1);
                }
                return [v1.return_type, fun_dictionary];

            // If single return value, don't use pointers 
            } else {
                let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(return_node, var_types2, custom_functions, classes, file, alias_tbl, debug);
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
                        isvector: numel(dim) > 1 && !ismatrix,
                        ispointer: ispointer,
                        isstruct: isstruct
                    },
                    ptr_args: (arg_types, outs) => null,
                    external: obj.external,
                    file: obj.file,
                    def_node: obj.def_node,
                    var_types: var_types2
                };
                if (type !== "unknown") {
                    fun_dictionary = fun_dictionary.filter(function(e) { return e.name !== fun_name });
                    fun_dictionary.push(v1);
                }
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
                def_node: obj.def_node,
                var_types: var_types2
            };
            if (arg_types[0].type !== "unknown") {
                fun_dictionary = fun_dictionary.filter(function(e) { return e.name !== fun_name });
                fun_dictionary.push(v1);
            }
            return [v1.return_type, fun_dictionary];
            
        }
    }
}

function inferTypeByName(name, node, var_types, custom_functions, alias_tbl, debug) {
    if (debug == 1) {
        console.log("inferTypeByName");
    }
    
    let obj1 = alias_tbl.find(x => x.name === name);
    if (obj1 != null && obj1 != undefined) {
        let obj2 = var_types.find(x => x.name === obj1.tmp_var);
        if (obj2 != null && obj2 != undefined) {
            return [obj2.type, obj2.ndim, obj2.dim, obj2.ismatrix, obj2.ispointer, obj2.isstruct, custom_functions];
        }
    }
    
    if (name == "INT_MAX" || name == "INT_MIN") {
        return ['int', 1, [1], false, false, false, custom_functions];
    }
    
    let obj3 = var_types.find(x => (x.name == name) && (node.startIndex >= x.scope[0]) && (node.endIndex <= x.scope[1]));
    if (obj3 != null) {
        return [obj3.type, obj3.ndim, obj3.dim, obj3.ismatrix, obj3.ispointer, obj3.isstruct, custom_functions];
    } else {
        return ['unknown', 2, [1, 1], false, false, false, custom_functions];
    }
}

function inferType(node, var_types, custom_functions, classes, file, alias_tbl, debug) {
    //console.log("INFERTYPE");
    //console.log(node.text);
    //console.log(node);
    if (debug == 1) {
        console.log("inferType");
    }
    // var unknown_type = ['unknown', null, null, null, null, null, custom_functions];
    // var unknown_type = ['unknown', 2, [1, 1], false, false, false, custom_functions];
    
    let obj1 = alias_tbl.find(x => x.name === node.text);
    if (obj1 != null && obj1 != undefined) {
        let obj2 = var_types.find(x => x.name === obj1.tmp_var);
        if (obj2 != null && obj2 != undefined) {
            return [obj2.type, obj2.ndim, obj2.dim, obj2.ismatrix, obj2.ispointer, obj2.isstruct, custom_functions];
        }
    }
        
        
    switch (node.type) {
        case g.SyntaxType.ParenthesizedExpression: {
            return inferType(node.firstNamedChild, var_types, custom_functions, classes, file, alias_tbl, debug);
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
            return ['double',  1, [1], false, false, false, custom_functions];
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
                        let [type, ndim, dim,,,, c] = inferType(node.children[i], var_types, custom_functions, classes, file, alias_tbl, debug);
                        custom_functions = c;
                        if (ndim > 1) {
                            ncols += dim[1];
                        } else {
                            ncols += dim[0];
                        }
                    }
                    if (col == 0) {
                        let [type, ndim, dim,,,, c] = inferType(node.children[i], var_types, custom_functions, classes, file, alias_tbl, debug);
                        custom_functions = c;
                        nrows += dim[0];
                    }
                    
                    col += 1;
                }
            }
            
            let children_types = [];
            let children_ndim = [];
            let children_dim = [];
            let children_ismatrix = [];
            
            for (let child of node.namedChildren) {
                let [child_type, child_ndim, child_dim, child_ismatrix,,, c] = inferType(child, var_types, custom_functions, classes, file, alias_tbl, debug);
                custom_functions = c;
                children_types.push(child_type);
                children_ndim.push(child_ndim);
                children_dim.push(child_dim);
                children_ismatrix.push(child_ismatrix);
            }
            
            let type = 'unknown';
            let child_ndim = 1;
            let child_dim = [1];
            let child_ismatrix = false;
            
            if (children_types.every(val => val === children_types[0])) {
                type = children_types[0];
                
            } else if (children_types.every(val => ['int','double','complex'].includes(val))) {
                
                if (children_types.includes('complex')) {
                    type = 'complex';
                } else if (children_types.includes('double')) {
                    type = 'double';
                } else if (children_types.includes('int')) {
                    type = 'int'; 
                }
            } else {
                type = 'heterogeneous';
            }
            
            if (children_ndim.every(x => x === children_ndim[0])) {
                child_ndim = children_ndim[0];
            }
            if (children_dim.every(x => x.toString() === children_dim[0].toString())) {
                child_dim = children_dim[0];
            }
            if (children_ismatrix.every(x => x === children_ismatrix[0])) {
                child_ismatrix = children_ismatrix[0];
            }
            
            if (node.type == g.SyntaxType.Cell && node.parent.type == g.SyntaxType.Assignment) {
                var_types.push({
                    name: `${node.parent.leftNode.text}_childtype`,
                    type: type,
                    ndim: child_ndim,
                    dim: child_dim,
                    ismatrix: child_ismatrix,
                    isvector: false,
                    ispointer: false,
                    isstruct: false,
                    initialized: false,
                    scope: null
                });
            }
            
            //return [type, 2, [nrows, ncols], true, true, false, custom_functions];
            return [type, 2, [nrows, ncols], true, false, false, custom_functions];
            break;
        }
            
        // Recursive calls to inferTypes
        case g.SyntaxType.ComparisonOperator:
        case g.SyntaxType.BooleanOperator: {
            //return ['bool', 2, [1, 1], false, false, false, custom_functions];
            let [, left_ndim, left_dim, left_ismatrix,,, c1] = inferType(node.leftNode, var_types, custom_functions, classes, file, alias_tbl, debug);
            custom_functions = c1;
            return ['bool', left_ndim, left_dim, left_ismatrix, false, false, custom_functions];
            break;
        }
        case g.SyntaxType.TransposeOperator: {
            const [type, ndim, dim, ismatrix,,, c] = inferType(node.firstChild, var_types, custom_functions, classes, file, alias_tbl, debug);
            custom_functions = c;
            return [type, 2, [dim[1], dim[0]], ismatrix, false, false, custom_functions];
            break;
        }
        case g.SyntaxType.UnaryOperator: {
            if (node.operatorNode.type == "~") {
                let [, ndim, dim, ismatrix,,, c1] = inferType(node.argumentNode, var_types, custom_functions, classes, file, alias_tbl, debug);
                custom_functions = c1;
                return ['bool', ndim, dim, ismatrix, false, false, custom_functions];
                //return ['bool', 2, [1, 1], false, false, false, custom_functions];
            }
            else {
                return inferType(node.argumentNode, var_types, custom_functions, classes, file, alias_tbl, debug);
            }
            
            break;
        }
        case g.SyntaxType.BinaryOperator: {
            
            let [left_type, left_ndim, left_dim, left_ismatrix,,, c1] = inferType(node.leftNode, var_types, custom_functions, classes, file, alias_tbl, debug);
            custom_functions = c1;
            if (node.leftNode.type == g.SyntaxType.UnaryOperator) {
                [left_type, left_ndim, left_dim, left_ismatrix,,, c1] = inferType(node.leftNode.argumentNode, var_types, custom_functions, classes, file, alias_tbl, debug);
                custom_functions = c1;
            }
            let [right_type, right_ndim, right_dim, right_ismatrix,,, c2] = inferType(node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug);
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
            
            let type = left_type;
            if (left_type == right_type) {
                type = left_type;
            } else if (left_type == 'complex' || right_type == 'complex') {
                type = 'complex';
            } else if (left_type == 'double' || right_type == 'double') {
                type = 'double';
            } else if (left_type == 'bool') {
                type = right_type;
            } else if (right_type == 'bool') {
                type = left_type;
            } else {
                return ['unknown', 2, [1, 1], false, false, false, custom_functions];
            }
                
            if (node.operatorNode.type == "^") {
                if (left_type == 'complex' || right_type != 'int') {
                    type = 'complex';
                }
            }

            //return [type, ndim, dim, ismatrix, ismatrix, false, custom_functions];
            return [type, ndim, dim, ismatrix, false, false, custom_functions];
            break;
        }
        
        // Attribute
        case g.SyntaxType.Attribute: {
            // First check if class method
            let [type,,,,,, c] = inferType(node.objectNode, var_types, custom_functions, classes, file, alias_tbl, debug);
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
            if (node.text == "INT_MAX" || node.text == "INT_MIN") {
                return ['int', 1, [1], false, false, false, custom_functions];
            }
            let obj = var_types.find(x => (x.name == node.text) && (node.startIndex >= x.scope[0]) && (node.endIndex <= x.scope[1]));
            //let obj = var_types.filter(function(e) { return e.name == node.text });
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
                var [child_type,,child_dim,child_ismatrix,,, c] = inferType(node.namedChildren[i], var_types, custom_functions, classes, file, alias_tbl, debug);
                
                custom_functions = c;
                //dim.push(child_dim[1]);
                if (child_dim.length > 1) {
                    dim.push(child_dim[1]);
                } else {
                    dim.push(child_dim[0]);
                }
            }
            
            if (dim.length==1 && dim[0] == 1) {
                dim = [1,1];
            }
            
            let ismatrix = !dim.every(val => val === 1);
            let obj = var_types.find(x => x.name === `${node.valueNode.text}_childtype`);
            
            if (obj != null && obj!= undefined) {
                if (obj.dim != "unknown") {
                    dim = obj.dim;
                }
                if (obj.ismatrix != "unknown") {
                    ismatrix = obj.ismatrix;
                }
            }
            
            return [child_type, dim.length, dim, ismatrix, false, false, custom_functions];
            
            break;
        }
        
        case g.SyntaxType.CallOrSubscript: {
            let [parent_type,,,parent_ismatrix,,parent_isstruct, c] = inferType(node.valueNode, var_types, custom_functions, classes, file, alias_tbl, debug);
            custom_functions = c;
            // Is a subscript
            if (parent_ismatrix || parent_isstruct) {
                let dim = [];
                for (let i=1; i<node.namedChildCount; i++) {
                    let [,,child_dim,,,, c] = inferType(node.namedChildren[i], var_types, custom_functions, classes, file, alias_tbl, debug);
                    custom_functions = c;
                    if (child_dim.length > 1) {
                        dim.push(child_dim[1]);
                    } else {
                        dim.push(child_dim[0]);
                    }
                }
                
                if (dim.length==1 && dim[0] == 1) {
                    dim = [1,1];
                }
                
                if (dim.every(val => val === 1)) {
                    return [parent_type, dim.length, dim, false, false, parent_isstruct, custom_functions];
                } else {
                    //return [parent_type, dim.length, dim, true, true, parent_isstruct, custom_functions];
                    return [parent_type, dim.length, dim, true, false, parent_isstruct, custom_functions];
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
                                //[return_type, obj1.methods] = getFunctionReturnType(node.valueNode.text, obj.arg_types, obj1.methods, custom_functions, classes, file, alias_tbl, debug); 
                                
                                [return_type, obj1.methods] = getFunctionReturnType(node.valueNode.text, obj.arg_types, obj1.methods, custom_functions, classes, file, alias_tbl, debug, 1); 
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
                                    if (arg_types[i].type !== "unknown") {
                                        obj2.arg_types[i].type = arg_types[i].type;
                                        obj2.arg_types[i].ndim = arg_types[i].ndim;
                                        obj2.arg_types[i].dim = arg_types[i].dim;
                                        obj2.arg_types[i].ismatrix = arg_types[i].ismatrix;
                                        obj2.arg_types[i].ispointer = arg_types[i].ispointer;
                                    }
                                }
                                let return_type = null;
                                [return_type, custom_functions] = getFunctionReturnType(node.valueNode.text, obj2.arg_types, custom_functions, custom_functions, classes, file, alias_tbl, debug, 0);
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
                let [child_type,,,,,, c] = inferType(child, var_types, custom_functions, classes, file, alias_tbl, debug);
                custom_functions = c;
                
                if (child_type == "keyword") {
                    
                    let [,ndim,dim,,,, c] = inferType(node.parent.valueNode, var_types, custom_functions, classes, file, alias_tbl, debug);
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
            if (children_types.every(val => ['int','double','complex'].includes(val))) {
                
                if (children_types.includes('complex')) {
                    type = 'complex';
                } else if (children_types.includes('double')) {
                    type = 'double';
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
            //return [type, 2, [1, len], true, true, false, custom_functions];
            return [type, 2, [1, len], false, false, false, custom_functions];
        }
        
        case g.SyntaxType.Keyword: {
            return ['keyword', 1, [1], false, false, false, custom_functions]
        }
        
        // Default
        default: return ['unknown', 1, [1], false, false, false, custom_functions];
    }
    
    // Return args, arg_types, outs from function
    function parseFunctionCallNode(node) {
        if (debug == 1) {
            console.log("parseFunctionCallNode");
        }
    
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
                        let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(right_node.namedChildren[i], var_types, custom_functions, classes, file, alias_tbl, debug);
                        custom_functions = c;
                        arg_types.push({
                            type: type, 
                            ndim: ndim, 
                            dim: dim, 
                            ismatrix: ismatrix, 
                            isvector: numel(dim) > 1 && !ismatrix,
                            ispointer: ispointer,
                            isstruct: isstruct
                        });
                    }
                    break;
                }
                case g.SyntaxType.ComparisonOperator:
                case g.SyntaxType.BooleanOperator:
                case g.SyntaxType.BinaryOperator: {
                    let [l_type, l_ndim, l_dim, l_ismatrix, l_ispointer, l_isstruct, c1] = inferType(right_node.leftNode, var_types, custom_functions, classes, file, alias_tbl, debug);
                    custom_functions = c1;
                    let [r_type, r_ndim, r_dim, r_ismatrix, r_ispointer, r_isstruct, c2] = inferType(right_node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug);
                    custom_functions = c2;
                    arg_types.push({
                        type: l_type, 
                        ndim: l_ndim, 
                        dim: l_dim, 
                        ismatrix: l_ismatrix, 
                        isvector: numel(l_dim) > 1 && !l_ismatrix,
                        ispointer: l_ispointer,
                        isstruct: l_isstruct
                    });
                    arg_types.push({
                        type: r_type, 
                        ndim: r_ndim, 
                        dim: r_dim, 
                        ismatrix: r_ismatrix, 
                        isvector: numel(r_dim) > 1 && !r_ismatrix,
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
                    let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(node.argumentNode, var_types, custom_functions, classes, file, alias_tbl, debug);
                    custom_functions = c;
                    arg_types.push({
                        type: type, 
                        ndim: ndim, 
                        dim: dim, 
                        ismatrix: ismatrix, 
                        isvector: numel(dim) > 1 && !ismatrix,
                        ispointer: ispointer,
                        isstruct: isstruct
                    });
                    
                    //if (transformNode(right_node.argumentNode) != undefined) {
                    //    args.push(transformNode(right_node.argumentNode));   
                    //} else {
                        args.push(node.argumentNode.text);
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
    
export {Type, VarType, typeInference, inferType, inferTypeByName};