"use strict";
exports.__esModule = true;
exports.inferTypeByName = exports.inferType = exports.typeInference = exports.findVarScope = void 0;
var fs = require('fs');
var treeTraversal_1 = require("./treeTraversal");
var helperFunctions_1 = require("./helperFunctions");
var customTypes_1 = require("./customTypes");
var builtinFunctions_1 = require("./builtinFunctions");
var helperFunctions_2 = require("./helperFunctions");
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var parser = new Parser();
parser.setLanguage(Matlab);
// Type inference
// -----------------------------------------------------------------------------
function findVarScope(node, block_idxs, current_code, debug) {
    if (debug == 1) {
        console.log("findVarScope");
    }
    var entire_scope = block_idxs.find(function (x) { return x[2] == 0; });
    var good_blocks = [];
    if (current_code == "main") {
        good_blocks = block_idxs.filter(function (e) { return e[2] >= 1; });
    }
    else {
        good_blocks = block_idxs.filter(function (e) { return e[2] == -1; });
    }
    var scope = good_blocks.filter(function (e) { return e[0] <= node.startIndex && e[1] >= node.endIndex; });
    scope = scope[scope.length - 1];
    if (scope != null && scope != undefined) {
        return scope;
    }
    if (current_code == "main") {
        var fundef_blocks = block_idxs.filter(function (e) { return e[2] == -1; });
        if (fundef_blocks.length != 0) {
            if (node.startIndex >= entire_scope[0] && node.endIndex < fundef_blocks[0][0]) {
                return [entire_scope[0], fundef_blocks[0][0], 0];
            }
        }
        return [entire_scope[0], entire_scope[1], 0];
    }
}
exports.findVarScope = findVarScope;
function typeInference(file, custom_functions, classes, debug) {
    var _a;
    if (debug == 1) {
        console.log("typeInference");
    }
    var var_types = [];
    var block_idxs = [];
    var sourceCode = fs.readFileSync(file, "utf8");
    var tree = parser.parse(sourceCode);
    var entry_fun_node = (0, treeTraversal_1.findEntryFunction)(tree, debug);
    if (entry_fun_node != null) {
        tree = parser.parse(entry_fun_node.bodyNode.text);
        var class_name = file.match(/(?<=@)(.*?)(?=\/)/);
        if (class_name != null) {
            var_types.push({
                name: entry_fun_node.parametersNode.namedChildren[0].text,
                type: class_name[0],
                ndim: 2,
                dim: [1, 1],
                ismatrix: false,
                isvector: false,
                ispointer: false,
                isstruct: true,
                initialized: false,
                scope: findVarScope(entry_fun_node, block_idxs, "main", debug) // come back here
            });
        }
    }
    var alias_tbl = [];
    _a = inferTypeFromAssignment(tree, var_types, custom_functions, classes, file, alias_tbl, debug, []), var_types = _a[0], custom_functions = _a[1], block_idxs = _a[2];
    return [var_types, custom_functions, block_idxs];
}
exports.typeInference = typeInference;
// to do: add tree_idx = [node.startIndex, node.endIndex]
// then after traversing tree make sure each variable's scope is updated to scope + tree_idx[0] 
function inferTypeFromAssignment(tree, var_types, custom_functions, classes, file, alias_tbl, debug, block_idxs) {
    if (debug == 1) {
        console.log("inferTypeFromAssignment");
    }
    //let block_idxs = [];
    var fun_flag = false;
    var scaler = 0;
    if (block_idxs.length > 0) {
        // examining a function definition
        fun_flag = true;
        scaler = block_idxs[0][0];
    }
    var block_level = 0;
    var cursor = tree.walk();
    var _loop_1 = function () {
        var c = cursor;
        switch (c.nodeType) {
            case "module" /* g.SyntaxType.Module */: {
                var node = c.currentNode;
                block_idxs.push([node.startIndex, node.endIndex, 0]); // 0 indicates entire program
                break;
            }
            case "block" /* g.SyntaxType.Block */: {
                var node_1 = c.currentNode;
                if (block_idxs[block_idxs.length - 1][0] < node_1.startIndex && node_1.endIndex < block_idxs[block_idxs.length - 1][1]) {
                    block_level = block_level + 1;
                }
                else {
                    var prev_blocks = block_idxs.filter(function (e) { return e[1] < node_1.startIndex; });
                    if (prev_blocks.length != 0) {
                        var prev_block = prev_blocks.reduce(function (max, block) { return max[1] > block[1] ? max : block; });
                        block_level = prev_block[2];
                    }
                }
                block_idxs.push([node_1.startIndex, node_1.endIndex, block_level]); // 1 for regular blocks
                break;
            }
            case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                var node = c.currentNode;
                block_idxs.push([node.startIndex, node.endIndex, -1]); // 2 for function def blocks 
                break;
            }
        }
    };
    do {
        _loop_1();
    } while ((0, treeTraversal_1.gotoPreorderSucc_SkipFunctionDef)(cursor, debug));
    var count = 0;
    cursor = tree.walk();
    var _loop_2 = function () {
        var c = cursor;
        switch (c.nodeType) {
            case "assignment" /* g.SyntaxType.Assignment */: {
                var node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                var _a = inferType(node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug), type = _a[0], ndim = _a[1], dim = _a[2], ismatrix = _a[3], ispointer = _a[4], isstruct = _a[5], cf = _a[6];
                custom_functions = cf;
                var scope = findVarScope(node, block_idxs, "main", debug);
                if (node.leftNode.type == "identifier" /* g.SyntaxType.Identifier */ || node.leftNode.type == "attribute" /* g.SyntaxType.Attribute */) {
                    var name_1 = node.leftNode.text;
                    var v1_1 = (0, helperFunctions_2.filterByScope)(var_types, name_1, node, 1);
                    if (v1_1.length > 0) {
                        count = count + 1;
                        v1_1 = v1_1[v1_1.length - 1];
                        if (scope[2] == v1_1.scope[2]) { // same block level
                            var_types = var_types.filter(function (e) { return JSON.stringify(e) !== JSON.stringify(v1_1); }); // replace if already in var_types
                            var re = new RegExp("\\b".concat(v1_1.name, "\\b"));
                            if (re.test(node.rightNode.text)) {
                                v1_1.scope = [v1_1.scope[0], node.parent.nextNamedSibling.startIndex - 1, v1_1.scope[2]];
                                var_types.push(v1_1);
                                var v2 = {
                                    name: v1_1.name,
                                    type: type,
                                    ndim: ndim,
                                    dim: dim,
                                    ismatrix: ismatrix,
                                    isvector: (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix,
                                    ispointer: ispointer,
                                    isstruct: isstruct,
                                    scope: [node.parent.nextNamedSibling.startIndex, scope[1], scope[2]],
                                    initialized: true
                                };
                                var_types.push(v2);
                            }
                            else {
                                v1_1.scope = [v1_1.scope[0], node.startIndex - 1, v1_1.scope[2]];
                                var_types.push(v1_1);
                                var v2 = {
                                    name: v1_1.name,
                                    type: type,
                                    ndim: ndim,
                                    dim: dim,
                                    ismatrix: ismatrix,
                                    isvector: (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix,
                                    ispointer: ispointer,
                                    isstruct: isstruct,
                                    scope: [node.startIndex, scope[1], scope[2]],
                                    initialized: true
                                };
                                var_types.push(v2);
                            }
                        }
                    }
                    else {
                        v1_1 = {
                            name: node.leftNode.text,
                            type: type,
                            ndim: ndim,
                            dim: dim,
                            ismatrix: ismatrix,
                            isvector: (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix,
                            ispointer: ispointer,
                            isstruct: isstruct,
                            initialized: false,
                            scope: scope
                        };
                        var_types.push(v1_1);
                    }
                    // If LHS is subscript, type is matrix
                }
                else if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || node.leftNode.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                    //} else if (node.leftNode.type == g.SyntaxType.CallOrSubscript) {
                    var name_2 = node.leftNode.valueNode.text;
                    var v3_1 = (0, helperFunctions_2.filterByScope)(var_types, name_2, node, 0);
                    if (v3_1 != null && v3_1 != undefined) {
                        var_types = var_types.filter(function (e) { return JSON.stringify(e) !== JSON.stringify(v3_1); }); // replace if already in var_types
                        v3_1.type = type;
                        var obj = var_types.find(function (x) { return x.name === "".concat(name_2, "_childtype"); });
                        if (obj != null && obj != undefined) {
                            var child_ndim = obj.ndim;
                            var child_dim = obj.dim;
                            var child_ismatrix = obj.ismatrix;
                            if (dim.toString() != obj.dim.toString()) {
                                child_ndim = "unknown";
                                child_dim = "unknown";
                            }
                            if (ismatrix != obj.ismatrix) {
                                child_ismatrix = "unknown";
                            }
                            var_types = var_types.filter(function (e) { return e.name !== "".concat(name_2, "_childtype"); }); // replace if al
                            var_types.push({
                                name: "".concat(name_2, "_childtype"),
                                type: (0, customTypes_1.binaryOpType)(type, obj.type),
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
                        else {
                            var_types.push({
                                name: "".concat(name_2, "_childtype"),
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
                    }
                    else {
                        v3_1 = {
                            name: name_2,
                            type: type,
                            ndim: 2,
                            dim: [1, 1],
                            ismatrix: true,
                            isvector: false,
                            ispointer: false,
                            isstruct: false,
                            initialized: false,
                            scope: scope
                        };
                    }
                    var_types.push(v3_1);
                }
                break;
            }
            case "for_statement" /* g.SyntaxType.ForStatement */: {
                var node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                var _b = inferType(node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug), type = _b[0], ndim = _b[1], dim = _b[2], ismatrix = _b[3], ispointer = _b[4], isstruct = _b[5], cf = _b[6];
                custom_functions = cf;
                if (node.leftNode.type == "identifier" /* g.SyntaxType.Identifier */) {
                    var v1_2 = {
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
                    var_types = var_types.filter(function (e) { return JSON.stringify(e) !== JSON.stringify(v1_2); }); // replace if already in var_types
                    var_types.push(v1_2);
                }
                break;
            }
            case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: { // This helps update the argument types of function definitions
                var node = c.currentNode;
                var _c = inferType(node, var_types, custom_functions, classes, file, alias_tbl, debug), cf = _c[6];
                custom_functions = cf;
                break;
            }
        }
    };
    do {
        _loop_2();
    } while ((0, treeTraversal_1.gotoPreorderSucc_SkipFunctionDef)(cursor, debug));
    return [var_types, custom_functions, block_idxs];
}
function getFunctionReturnType(fun_name, arg_types, var_types, fun_dictionary, custom_functions, classes, file, alias_tbl, debug, isclass) {
    // Update custom_functions with info on function return type
    if (debug == 1) {
        console.log("getFunctionReturnType");
    }
    var obj = fun_dictionary.find(function (x) { return x.name === fun_name; });
    if (obj != null) {
        var tree2 = parser.parse(obj.def_node.bodyNode.text);
        for (var i = 0; i < arg_types.length; i++) {
            arg_types[i].scope = [0, obj.def_node.endIndex - obj.def_node.startIndex, -1]; // "transpose" since passing adjusted tree
            arg_types[i].initialized = true;
        }
        // for some reason calling inferTypeFromAssignment modifies the value of arg_types
        var tmp_arg_types = JSON.parse(JSON.stringify(arg_types));
        var block_idxs = [[0, obj.def_node.endIndex - obj.def_node.startIndex, 0]];
        var _a = inferTypeFromAssignment(tree2, arg_types, custom_functions, classes, file, alias_tbl, debug, block_idxs), var_types2 = _a[0], c_1 = _a[1];
        for (var i = 0; i < var_types2.length; i++) {
            if (var_types2[i].scope[0] == 0) {
                var_types2[i].scope[0] += obj.def_node.startIndex;
            }
            else {
                var_types2[i].scope[0] += obj.def_node.bodyNode.startIndex;
            }
            if (var_types2[i].scope[1] == obj.def_node.endIndex - obj.def_node.startIndex) {
                var_types2[i].scope[1] += obj.def_node.startIndex;
            }
            else {
                var_types2[i].scope[1] += obj.def_node.bodyNode.startIndex;
            }
            if (var_types2[i].scope[2] == -1) {
                var_types2[i].scope[2] = 0;
            }
        }
        if (!isclass) {
            fun_dictionary = c_1; // may need to change for classes
        }
        custom_functions = c_1;
        var return_node_1 = obj.def_node.return_variableNode;
        if (return_node_1 != undefined) {
            return_node_1 = return_node_1.firstChild;
            // If multiple return values, use pointers
            if (return_node_1.type == "matrix" /* g.SyntaxType.Matrix */) {
                var all_types_1 = [];
                var ptr_arg_types_1 = [];
                for (var i = 0; i < return_node_1.namedChildCount; i++) {
                    var return_var = return_node_1.namedChildren[i];
                    var _b = inferType(return_var, var_types2, custom_functions, classes, file, alias_tbl, debug), return_type = _b[0], return_ndim = _b[1], return_dim = _b[2], return_ismatrix = _b[3], return_ispointer = _b[4], return_isstruct = _b[5], c_2 = _b[6];
                    custom_functions = c_2;
                    if (return_ismatrix && (0, helperFunctions_1.numel)(return_dim) == 1) {
                        return_ismatrix = false;
                        return_ndim = 1;
                        return_dim = [1];
                    }
                    if (obj.ptr_arg_types != null) {
                        return_type = (0, customTypes_1.binaryOpType)(return_type, obj.ptr_arg_types[i].type);
                    }
                    ptr_arg_types_1.push({
                        type: return_type,
                        ndim: return_ndim,
                        dim: return_dim,
                        ismatrix: return_ismatrix,
                        isvector: (0, helperFunctions_1.numel)(return_dim) > 1 && !return_ismatrix,
                        ispointer: true,
                        isstruct: return_isstruct
                    });
                }
                var v1 = {
                    name: obj.name,
                    arg_types: tmp_arg_types,
                    return_type: null,
                    outs_transform: function (outs) { return null; },
                    external: obj.external,
                    file: obj.file,
                    def_node: obj.def_node,
                    ptr_arg_types: ptr_arg_types_1,
                    ptr_args: function (arg_types, outs) {
                        var ptr_args = [];
                        for (var i = 0; i < return_node_1.namedChildCount; i++) {
                            var return_var = return_node_1.namedChildren[i];
                            //let [return_type, return_ndim, return_dim, return_ismatrix, return_ispointer, return_isstruct, c] = inferType(return_var, var_types2, custom_functions, classes, file, alias_tbl, debug);
                            //all_types.push(return_type);
                            all_types_1.push(ptr_arg_types_1[i].type);
                            custom_functions = c_1;
                            var return_name = return_var.text;
                            if (outs.length > i) {
                                return_name = outs[i];
                            }
                            ptr_args.push({
                                name: return_name,
                                type: ptr_arg_types_1[i].type,
                                ndim: ptr_arg_types_1[i].ndim,
                                dim: ptr_arg_types_1[i].dim,
                                ismatrix: ptr_arg_types_1[i].ismatrix,
                                isvector: ptr_arg_types_1[i].isvector,
                                ispointer: true,
                                isstruct: ptr_arg_types_1[i].isstruct
                            });
                        }
                        return ptr_args;
                    },
                    var_types: var_types2
                };
                if (!all_types_1.includes("unknown")) {
                    fun_dictionary = fun_dictionary.filter(function (e) { return e.name !== fun_name; });
                    fun_dictionary.push(v1);
                }
                return [v1.return_type, fun_dictionary];
                // If single return value, don't use pointers 
            }
            else {
                var _c = inferType(return_node_1, var_types2, custom_functions, classes, file, alias_tbl, debug), type = _c[0], ndim = _c[1], dim = _c[2], ismatrix = _c[3], ispointer = _c[4], isstruct = _c[5], c_3 = _c[6];
                custom_functions = c_3;
                var v1 = {
                    name: obj.name,
                    arg_types: tmp_arg_types,
                    outs_transform: function (outs) { return outs; },
                    return_type: {
                        type: type,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: ismatrix,
                        isvector: (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix,
                        ispointer: ispointer,
                        isstruct: isstruct
                    },
                    ptr_args: function (arg_types, outs) { return null; },
                    ptr_arg_types: null,
                    external: obj.external,
                    file: obj.file,
                    def_node: obj.def_node,
                    var_types: var_types2
                };
                if (type !== "unknown") {
                    fun_dictionary = fun_dictionary.filter(function (e) { return e.name !== fun_name; });
                    fun_dictionary.push(v1);
                }
                return [v1.return_type, fun_dictionary];
            }
        }
        else {
            var v1 = {
                name: obj.name,
                arg_types: tmp_arg_types,
                outs_transform: function (outs) { return outs; },
                return_type: null,
                //ptr_param: null, 
                //ptr_declaration: null,
                ptr_args: function (arg_types, outs) { return null; },
                ptr_arg_types: null,
                external: obj.external,
                file: obj.file,
                def_node: obj.def_node,
                var_types: var_types2
            };
            if (arg_types[0].type !== "unknown") {
                fun_dictionary = fun_dictionary.filter(function (e) { return e.name !== fun_name; });
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
    var obj1 = alias_tbl.find(function (x) { return x.name === name; });
    if (obj1 != null && obj1 != undefined) {
        var obj2 = var_types.find(function (x) { return x.name === obj1.tmp_var; });
        if (obj2 != null && obj2 != undefined) {
            return [obj2.type, obj2.ndim, obj2.dim, obj2.ismatrix, obj2.ispointer, obj2.isstruct, custom_functions];
        }
    }
    if (name == "INT_MAX" || name == "INT_MIN") {
        return ['int', 1, [1], false, false, false, custom_functions];
    }
    var obj3 = var_types.find(function (x) { return (x.name == name) && (node.startIndex >= x.scope[0]) && (node.endIndex <= x.scope[1]); });
    if (obj3 != null) {
        return [obj3.type, obj3.ndim, obj3.dim, obj3.ismatrix, obj3.ispointer, obj3.isstruct, custom_functions];
    }
    else {
        return ['unknown', 2, [1, 1], false, false, false, custom_functions];
    }
}
exports.inferTypeByName = inferTypeByName;
function inferType(node, var_types, custom_functions, classes, file, alias_tbl, debug) {
    //console.log("INFERTYPE");
    //console.log(node.text);
    //console.log(node);
    var _a, _b, _c;
    if (debug == 1) {
        console.log("inferType");
    }
    // var unknown_type = ['unknown', null, null, null, null, null, custom_functions];
    // var unknown_type = ['unknown', 2, [1, 1], false, false, false, custom_functions];
    //let obj1 = alias_tbl.find(x => x.name === node.text);
    var obj1 = (0, helperFunctions_2.filterByScope)(alias_tbl, node.text, node, 0);
    if (obj1 != null && obj1 != undefined) {
        var obj2 = var_types.find(function (x) { return x.name === obj1.tmp_var; });
        if (obj2 != null && obj2 != undefined) {
            return [obj2.type, obj2.ndim, obj2.dim, obj2.ismatrix, obj2.ispointer, obj2.isstruct, custom_functions];
        }
    }
    switch (node.type) {
        case "parenthesized_expression" /* g.SyntaxType.ParenthesizedExpression */: {
            return inferType(node.firstNamedChild, var_types, custom_functions, classes, file, alias_tbl, debug);
            break;
        }
        // Named types
        case "ellipsis" /* g.SyntaxType.Ellipsis */: {
            //return ['ellipsis', 2, [1, 1], false, false, false, custom_functions];
            return ['ellipsis', 1, [1], false, false, false, custom_functions];
            break;
        }
        case ("true" /* g.SyntaxType.True */ || "false" /* g.SyntaxType.False */): {
            //return ['bool',  2, [1, 1], false, false, false, custom_functions];
            return ['bool', 1, [1], false, false, false, custom_functions];
            break;
        }
        case "float" /* g.SyntaxType.Float */: {
            //return ['float',  2, [1, 1], false, false, false, custom_functions];
            return ['double', 1, [1], false, false, false, custom_functions];
            break;
        }
        case "integer" /* g.SyntaxType.Integer */: {
            //return ['int',  2, [1, 1], false, false, false, custom_functions];
            return ['int', 1, [1], false, false, false, custom_functions];
            break;
        }
        case "complex" /* g.SyntaxType.Complex */: {
            //return ['complex',  2, [1, 1], false, false, false, custom_functions];
            return ['complex', 1, [1], false, false, false, custom_functions];
            break;
        }
        case "string" /* g.SyntaxType.String */: {
            //return ['char',  2, [1, 1], false, true, false, custom_functions];
            return ['char', 2, [1, node.text.length], false, true, false, custom_functions];
            //return ['char',  1, [node.text.length], false, true, false, custom_functions];
            break;
        }
        case "cell" /* g.SyntaxType.Cell */:
        case "matrix" /* g.SyntaxType.Matrix */: {
            var row = 0;
            var col = 0;
            var nrows = 0;
            var ncols = 0;
            for (var i = 0; i < node.childCount; i++) {
                if (node.children[i].type === ";") {
                    row += 1;
                    col = 0;
                }
                else if (node.children[i].isNamed) {
                    if (row == 0) {
                        var _d = inferType(node.children[i], var_types, custom_functions, classes, file, alias_tbl, debug), type_1 = _d[0], ndim = _d[1], dim = _d[2], c_4 = _d[6];
                        custom_functions = c_4;
                        if (ndim > 1) {
                            ncols += dim[1];
                        }
                        else {
                            ncols += dim[0];
                        }
                    }
                    if (col == 0) {
                        var _e = inferType(node.children[i], var_types, custom_functions, classes, file, alias_tbl, debug), type_2 = _e[0], ndim = _e[1], dim = _e[2], c_5 = _e[6];
                        custom_functions = c_5;
                        nrows += dim[0];
                    }
                    col += 1;
                }
            }
            var children_types_1 = [];
            var children_ndim_1 = [];
            var children_dim_1 = [];
            var children_ismatrix_1 = [];
            for (var _i = 0, _f = node.namedChildren; _i < _f.length; _i++) {
                var child = _f[_i];
                var _g = inferType(child, var_types, custom_functions, classes, file, alias_tbl, debug), child_type_1 = _g[0], child_ndim_1 = _g[1], child_dim_1 = _g[2], child_ismatrix_1 = _g[3], c_6 = _g[6];
                custom_functions = c_6;
                children_types_1.push(child_type_1);
                children_ndim_1.push(child_ndim_1);
                children_dim_1.push(child_dim_1);
                children_ismatrix_1.push(child_ismatrix_1);
            }
            var type_3 = 'unknown';
            var child_ndim = 1;
            var child_dim_2 = [1];
            var child_ismatrix_2 = false;
            if (children_types_1.every(function (val) { return val === children_types_1[0]; })) {
                type_3 = children_types_1[0];
            }
            else if (children_types_1.every(function (val) { return ['int', 'double', 'complex'].includes(val); })) {
                if (children_types_1.includes('complex')) {
                    type_3 = 'complex';
                }
                else if (children_types_1.includes('double')) {
                    type_3 = 'double';
                }
                else if (children_types_1.includes('int')) {
                    type_3 = 'int';
                }
            }
            else {
                type_3 = 'heterogeneous';
            }
            if (children_ndim_1.every(function (x) { return x === children_ndim_1[0]; })) {
                child_ndim = children_ndim_1[0];
            }
            if (children_dim_1.every(function (x) { return x.toString() === children_dim_1[0].toString(); })) {
                child_dim_2 = children_dim_1[0];
            }
            if (children_ismatrix_1.every(function (x) { return x === children_ismatrix_1[0]; })) {
                child_ismatrix_2 = children_ismatrix_1[0];
            }
            if (node.type == "cell" /* g.SyntaxType.Cell */ && node.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
                var_types.push({
                    name: "".concat(node.parent.leftNode.text, "_childtype"),
                    type: type_3,
                    ndim: child_ndim,
                    dim: child_dim_2,
                    ismatrix: child_ismatrix_2,
                    isvector: false,
                    ispointer: false,
                    isstruct: false,
                    initialized: false,
                    scope: null
                });
            }
            //return [type, 2, [nrows, ncols], true, true, false, custom_functions];
            return [type_3, 2, [nrows, ncols], true, false, false, custom_functions];
            break;
        }
        // Recursive calls to inferTypes
        case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
        case "boolean_operator" /* g.SyntaxType.BooleanOperator */: {
            //return ['bool', 2, [1, 1], false, false, false, custom_functions];
            var _h = inferType(node.leftNode, var_types, custom_functions, classes, file, alias_tbl, debug), left_ndim = _h[1], left_dim = _h[2], left_ismatrix = _h[3], c1 = _h[6];
            custom_functions = c1;
            return ['bool', left_ndim, left_dim, left_ismatrix, false, false, custom_functions];
            break;
        }
        case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
            var _j = inferType(node.firstChild, var_types, custom_functions, classes, file, alias_tbl, debug), type_4 = _j[0], ndim = _j[1], dim = _j[2], ismatrix_1 = _j[3], c_7 = _j[6];
            custom_functions = c_7;
            return [type_4, 2, [dim[1], dim[0]], ismatrix_1, false, false, custom_functions];
            break;
        }
        case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
            if (node.operatorNode.type == "~") {
                var _k = inferType(node.argumentNode, var_types, custom_functions, classes, file, alias_tbl, debug), ndim = _k[1], dim = _k[2], ismatrix_2 = _k[3], c1 = _k[6];
                custom_functions = c1;
                return ['bool', ndim, dim, ismatrix_2, false, false, custom_functions];
                //return ['bool', 2, [1, 1], false, false, false, custom_functions];
            }
            else {
                return inferType(node.argumentNode, var_types, custom_functions, classes, file, alias_tbl, debug);
            }
            break;
        }
        case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
            var _l = inferType(node.leftNode, var_types, custom_functions, classes, file, alias_tbl, debug), left_type = _l[0], left_ndim = _l[1], left_dim = _l[2], left_ismatrix = _l[3], c1 = _l[6];
            custom_functions = c1;
            if (node.leftNode.type == "unary_operator" /* g.SyntaxType.UnaryOperator */) {
                _a = inferType(node.leftNode.argumentNode, var_types, custom_functions, classes, file, alias_tbl, debug), left_type = _a[0], left_ndim = _a[1], left_dim = _a[2], left_ismatrix = _a[3], c1 = _a[6];
                custom_functions = c1;
            }
            var _m = inferType(node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug), right_type = _m[0], right_ndim = _m[1], right_dim = _m[2], right_ismatrix = _m[3], c2 = _m[6];
            custom_functions = c2;
            var ndim = left_ndim;
            var dim = left_dim;
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
                    }
                    else if (right_ndim == 1) {
                        ndim = left_ndim;
                        dim = left_dim;
                    }
                    else {
                        dim = [left_dim[0], right_dim[1]];
                    }
                    break;
                }
            }
            if (left_ismatrix || right_ismatrix) {
                var ismatrix = true;
            }
            else {
                var ismatrix = false;
            }
            var type_5 = left_type;
            if (left_type == right_type) {
                type_5 = left_type;
            }
            else if (left_type == 'complex' || right_type == 'complex') {
                type_5 = 'complex';
            }
            else if (left_type == 'double' || right_type == 'double') {
                type_5 = 'double';
            }
            else if (left_type == 'bool') {
                type_5 = right_type;
            }
            else if (right_type == 'bool') {
                type_5 = left_type;
            }
            else {
                return ['unknown', 2, [1, 1], false, false, false, custom_functions];
            }
            if (node.operatorNode.type == "^") {
                if (left_type == 'complex' || right_type != 'int') {
                    type_5 = 'complex';
                }
            }
            //return [type, ndim, dim, ismatrix, ismatrix, false, custom_functions];
            return [type_5, ndim, dim, ismatrix, false, false, custom_functions];
            break;
        }
        // Attribute
        case "attribute" /* g.SyntaxType.Attribute */: {
            // First check if class method
            var _o = inferType(node.objectNode, var_types, custom_functions, classes, file, alias_tbl, debug), type_6 = _o[0], c_8 = _o[6];
            custom_functions = c_8;
            var obj = classes.find(function (x) { return x.name === type_6; });
            if (obj !== null && obj !== undefined) {
                var obj2 = obj.methods.find(function (x) { return x.name === node.attributeNode.text; });
                if (obj2 != null) {
                    if (obj2.return_type == null) {
                        return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                    }
                    else {
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
                }
                else {
                    return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                }
                // If not class method, treat like an identifier (field of a struct)
            }
            else {
                //let obj = var_types.find(x => x.name === node.text);
                var obj_1 = (0, helperFunctions_2.filterByScope)(var_types, node.text, node, 0);
                if (obj_1 != null) {
                    return [obj_1.type, obj_1.ndim, obj_1.dim, obj_1.ismatrix, obj_1.ispointer, obj_1.isstruct, custom_functions];
                }
                else {
                    return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                }
                break;
            }
        }
        // Identifier
        case "identifier" /* g.SyntaxType.Identifier */: {
            if (node.text == "INT_MAX" || node.text == "INT_MIN") {
                return ['int', 1, [1], false, false, false, custom_functions];
            }
            var obj = (0, helperFunctions_2.filterByScope)(var_types, node.text, node, 0);
            //let obj = var_types.find(x => (x.name == node.text) && (node.startIndex >= x.scope[0]) && (node.endIndex <= x.scope[1]));
            //let obj = var_types.filter(function(e) { return e.name == node.text });
            if (obj != null) {
                return [obj.type, obj.ndim, obj.dim, obj.ismatrix, obj.ispointer, obj.isstruct, custom_functions];
            }
            else {
                return ['unknown', 2, [1, 1], false, false, false, custom_functions];
            }
            break;
        }
        // TO DO: FIX THIS
        case "cell_subscript" /* g.SyntaxType.CellSubscript */: {
            var dim = [];
            for (var i = 1; i < node.namedChildCount; i++) {
                var _p = inferType(node.namedChildren[i], var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _p[0], child_dim = _p[2], child_ismatrix = _p[3], c = _p[6];
                custom_functions = c;
                //dim.push(child_dim[1]);
                if (child_dim.length > 1) {
                    dim.push(child_dim[1]);
                }
                else {
                    dim.push(child_dim[0]);
                }
            }
            if (dim.length == 1 && dim[0] == 1) {
                dim = [1, 1];
            }
            var ismatrix_3 = !dim.every(function (val) { return val === 1; });
            var obj = var_types.find(function (x) { return x.name === "".concat(node.valueNode.text, "_childtype"); });
            if (obj != null && obj != undefined) {
                if (obj.dim != "unknown") {
                    dim = obj.dim;
                }
                if (obj.ismatrix != "unknown") {
                    ismatrix_3 = obj.ismatrix;
                }
            }
            return [child_type, dim.length, dim, ismatrix_3, false, false, custom_functions];
            break;
        }
        case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
            var _q = inferType(node.valueNode, var_types, custom_functions, classes, file, alias_tbl, debug), parent_type = _q[0], parent_ismatrix = _q[3], parent_isstruct = _q[5], c_9 = _q[6];
            custom_functions = c_9;
            // Is a subscript
            if (parent_ismatrix || parent_isstruct) {
                var dim = [];
                for (var i = 1; i < node.namedChildCount; i++) {
                    var _r = inferType(node.namedChildren[i], var_types, custom_functions, classes, file, alias_tbl, debug), child_dim_3 = _r[2], c_10 = _r[6];
                    custom_functions = c_10;
                    if (child_dim_3.length > 1) {
                        dim.push(child_dim_3[1]);
                    }
                    else {
                        dim.push(child_dim_3[0]);
                    }
                }
                if (dim.length == 1 && dim[0] == 1) {
                    dim = [1, 1];
                }
                if (dim.every(function (val) { return val === 1; })) {
                    return [parent_type, dim.length, dim, false, false, parent_isstruct, custom_functions];
                }
                else {
                    //return [parent_type, dim.length, dim, true, true, parent_isstruct, custom_functions];
                    return [parent_type, dim.length, dim, true, false, parent_isstruct, custom_functions];
                }
                // Is a class or function call    
            }
            else {
                var obj = classes.find(function (x) { return x.name === node.valueNode.text; });
                // Is a class (treat as structure)
                if (obj != null) {
                    return [obj.name, 2, [1, 1], false, false, true, custom_functions];
                }
                else {
                    // Is a function call
                    // recursive function call
                    var filename = file.match(/((?<=\/)([^\/]*?)(?=\.m))|(^([^\/]*?)(?=\.m))/);
                    if (filename[0] != node.valueNode.text) {
                        var _s = parseFunctionCallNode(node), args = _s[0], arg_types_1 = _s[1], outs = _s[2];
                        var obj1_1 = classes.find(function (x) { return x.name === arg_types_1[0].type; });
                        var obj2 = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
                        //let obj3 = builtin_functions.find(x => x.fun_matlab === node.valueNode.text);
                        var obj3 = (0, helperFunctions_2.findBuiltin)(builtinFunctions_1.builtin_functions, node.valueNode.text);
                        if (obj1_1 != null && obj1_1 != undefined) {
                            var obj_2 = obj1_1.methods.find(function (x) { return x.name === node.valueNode.text; });
                            if (obj_2 != null && obj_2 != undefined) {
                                for (var i = 0; i < arg_types_1.length; i++) {
                                    obj_2.arg_types[i].type = arg_types_1[i].type;
                                    obj_2.arg_types[i].ndim = arg_types_1[i].ndim;
                                    obj_2.arg_types[i].dim = arg_types_1[i].dim;
                                    obj_2.arg_types[i].ismatrix = arg_types_1[i].ismatrix;
                                    obj_2.arg_types[i].ispointer = arg_types_1[i].ispointer;
                                }
                                var return_type = null;
                                //[return_type, obj1.methods] = getFunctionReturnType(node.valueNode.text, obj.arg_types, obj1.methods, custom_functions, classes, file, alias_tbl, debug); 
                                _b = getFunctionReturnType(node.valueNode.text, obj_2.arg_types, var_types, obj1_1.methods, custom_functions, classes, file, alias_tbl, debug, 1), return_type = _b[0], obj1_1.methods = _b[1];
                                if (return_type == null) {
                                    return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                                }
                                else {
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
                            var class_name = obj2.file.match(/(?<=@)(.*?)(?=\/)/);
                            var flag = true;
                            if (class_name != null) {
                                if (arg_types_1[0].type != class_name) {
                                    flag = false;
                                }
                            }
                            if (flag == true) {
                                for (var i = 0; i < arg_types_1.length; i++) {
                                    if (arg_types_1[i].type !== "unknown") {
                                        obj2.arg_types[i].type = arg_types_1[i].type;
                                        obj2.arg_types[i].ndim = arg_types_1[i].ndim;
                                        obj2.arg_types[i].dim = arg_types_1[i].dim;
                                        obj2.arg_types[i].ismatrix = arg_types_1[i].ismatrix;
                                        obj2.arg_types[i].ispointer = arg_types_1[i].ispointer;
                                    }
                                }
                                var return_type = null;
                                _c = getFunctionReturnType(node.valueNode.text, obj2.arg_types, var_types, custom_functions, custom_functions, classes, file, alias_tbl, debug, 0), return_type = _c[0], custom_functions = _c[1];
                                if (return_type == null) {
                                    return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                                }
                                else {
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
                            var return_type = obj3.return_type(args, arg_types_1, outs);
                            if (return_type == null) {
                                return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                            }
                            else {
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
                        else {
                            return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                        }
                    }
                    else {
                        return ['unknown', 2, [1, 1], false, false, false, custom_functions];
                    }
                }
            }
            break;
        }
        case "slice" /* g.SyntaxType.Slice */: {
            var children_types = [];
            var children_vals = [];
            for (var i = 0; i < node.namedChildCount; i++) {
                var child = node.namedChildren[i];
                var _t = inferType(child, var_types, custom_functions, classes, file, alias_tbl, debug), child_type_2 = _t[0], c_11 = _t[6];
                custom_functions = c_11;
                if (child_type_2 == "keyword") {
                    var _u = inferType(node.parent.valueNode, var_types, custom_functions, classes, file, alias_tbl, debug), ndim = _u[1], dim = _u[2], c_12 = _u[6];
                    custom_functions = c_12;
                    var firstNode = node.parent.namedChildren[1];
                    var current_dim = 0;
                    var dummyNode = node;
                    while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                        dummyNode = dummyNode.previousNamedSibling;
                        current_dim += 1;
                    }
                    children_vals.push(dim[current_dim]);
                    children_types.push('int');
                }
                else {
                    children_vals.push(Number(child.text));
                    children_types.push(child_type_2);
                }
            }
            var type = 'unknown';
            if (children_types.every(function (val) { return ['int', 'double', 'complex'].includes(val); })) {
                if (children_types.includes('complex')) {
                    type = 'complex';
                }
                else if (children_types.includes('double')) {
                    type = 'double';
                }
                else if (children_types.includes('int')) {
                    type = 'int';
                }
            }
            var start = children_vals[0];
            var stop = children_vals[1];
            var step = 1;
            if (children_vals.length == 3) {
                stop = children_vals[2];
                step = children_vals[1];
            }
            var len = Math.floor((stop - start) / step) + 1;
            // TO DO: Maybe change so that it's only pointer, not a matrix and
            // represented in generateCode by creating an array, not a matrix
            //return [type, 2, [1, len], true, true, false, custom_functions];
            return [type, 2, [1, len], false, false, false, custom_functions];
        }
        case "keyword" /* g.SyntaxType.Keyword */: {
            return ['keyword', 1, [1], false, false, false, custom_functions];
        }
        // Default
        default: return ['unknown', 1, [1], false, false, false, custom_functions];
    }
    // Return args, arg_types, outs from function
    function parseFunctionCallNode(node) {
        if (debug == 1) {
            console.log("parseFunctionCallNode");
        }
        if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
            return parseFunctionCallNode(node.parent);
        }
        else {
            switch (node.type) {
                case "assignment" /* g.SyntaxType.Assignment */: {
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
            var args = [];
            var arg_types = [];
            switch (right_node.type) {
                case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                    for (var i = 1; i < right_node.namedChildCount; i++) {
                        //if (transformNode(right_node.namedChildren[i]) != undefined) {
                        //    args.push(transformNode(right_node.namedChildren[i]));   
                        //} else {
                        args.push(right_node.namedChildren[i].text);
                        //}
                        var _a = inferType(right_node.namedChildren[i], var_types, custom_functions, classes, file, alias_tbl, debug), type_7 = _a[0], ndim = _a[1], dim = _a[2], ismatrix_4 = _a[3], ispointer = _a[4], isstruct = _a[5], c_13 = _a[6];
                        custom_functions = c_13;
                        arg_types.push({
                            type: type_7,
                            ndim: ndim,
                            dim: dim,
                            ismatrix: ismatrix_4,
                            isvector: (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix_4,
                            ispointer: ispointer,
                            isstruct: isstruct
                        });
                    }
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    var _b = inferType(right_node.leftNode, var_types, custom_functions, classes, file, alias_tbl, debug), l_type = _b[0], l_ndim = _b[1], l_dim = _b[2], l_ismatrix = _b[3], l_ispointer = _b[4], l_isstruct = _b[5], c1 = _b[6];
                    custom_functions = c1;
                    var _c = inferType(right_node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug), r_type = _c[0], r_ndim = _c[1], r_dim = _c[2], r_ismatrix = _c[3], r_ispointer = _c[4], r_isstruct = _c[5], c2 = _c[6];
                    custom_functions = c2;
                    arg_types.push({
                        type: l_type,
                        ndim: l_ndim,
                        dim: l_dim,
                        ismatrix: l_ismatrix,
                        isvector: (0, helperFunctions_1.numel)(l_dim) > 1 && !l_ismatrix,
                        ispointer: l_ispointer,
                        isstruct: l_isstruct
                    });
                    arg_types.push({
                        type: r_type,
                        ndim: r_ndim,
                        dim: r_dim,
                        ismatrix: r_ismatrix,
                        isvector: (0, helperFunctions_1.numel)(r_dim) > 1 && !r_ismatrix,
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
                case "unary_operator" /* g.SyntaxType.UnaryOperator */:
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    var _d = inferType(node.argumentNode, var_types, custom_functions, classes, file, alias_tbl, debug), type_8 = _d[0], ndim = _d[1], dim = _d[2], ismatrix_5 = _d[3], ispointer = _d[4], isstruct = _d[5], c_14 = _d[6];
                    custom_functions = c_14;
                    arg_types.push({
                        type: type_8,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: ismatrix_5,
                        isvector: (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix_5,
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
            var outs = [];
            if (left_node == null) {
            }
            else if (left_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                for (var _i = 0, _e = left_node.namedChildren; _i < _e.length; _i++) {
                    var child = _e[_i];
                    //if (transformNode(child) != undefined) {
                    //    outs.push(transformNode(child));   
                    //} else {
                    outs.push(child.text);
                    //}
                }
            }
            else {
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
exports.inferType = inferType;
//# sourceMappingURL=typeInference.js.map