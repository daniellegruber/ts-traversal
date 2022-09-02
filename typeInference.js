"use strict";
exports.__esModule = true;
exports.inferType = exports.typeInference = void 0;
var treeTraversal_1 = require("./treeTraversal");
var builtinFunctions_1 = require("./builtinFunctions");
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var parser = new Parser();
parser.setLanguage(Matlab);
function typeInference(tree, custom_functions, classes) {
    // First perform type inference for function definitions
    var cursor = tree.walk();
    var _loop_1 = function () {
        var _a;
        var c = cursor;
        switch (c.nodeType) {
            case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                var node_1 = c.currentNode;
                var tree2 = parser.parse(node_1.bodyNode.text);
                var var_types2 = inferTypeFromAssignment(tree2, custom_functions, classes);
                // Update custom_functions with info on function return type
                var obj_1 = custom_functions.find(function (x) { return x.name === node_1.nameNode.text; });
                if (obj_1 != null) {
                    custom_functions = custom_functions.filter(function (e) { return e.name !== obj_1.name; });
                    if (node_1.children[1].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                        var return_node = node_1.children[1].firstChild;
                        // If multiple return values, use pointers
                        if (return_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                            var ptr_declaration = [];
                            var ptr_param = [];
                            for (var _i = 0, _b = return_node.namedChildren; _i < _b.length; _i++) {
                                var return_var = _b[_i];
                                _a = inferType(return_var, var_types2, custom_functions, classes), return_type = _a[0];
                                ptr_declaration.push(return_type + "* p_" + return_var.text);
                                ptr_param.push("*p_" + return_var.text);
                            }
                            var v1 = {
                                name: obj_1.name,
                                return_type: null,
                                ptr_param: ptr_param.join(", "),
                                ptr_declaration: ptr_declaration.join("\n"),
                                external: obj_1.external,
                                file: obj_1.file
                            };
                            custom_functions.push(v1);
                            // If single return value, don't use pointers 
                        }
                        else {
                            var _c = inferType(return_node, var_types2, custom_functions, classes), type = _c[0], ndim = _c[1], dim = _c[2], ismatrix = _c[3], ispointer = _c[4];
                            var v1 = {
                                name: obj_1.name,
                                return_type: {
                                    type: type,
                                    ndim: ndim,
                                    dim: dim,
                                    ismatrix: ismatrix,
                                    ispointer: ispointer
                                },
                                ptr_param: null,
                                ptr_declaration: null,
                                external: obj_1.external,
                                file: obj_1.file
                            };
                            custom_functions.push(v1);
                        }
                    }
                    else {
                        var v1 = {
                            name: obj_1.name,
                            return_type: null,
                            ptr_param: null,
                            ptr_declaration: null,
                            external: obj_1.external,
                            file: obj_1.file
                        };
                        custom_functions.push(v1);
                    }
                }
                break;
            }
        }
    };
    var return_type;
    do {
        _loop_1();
    } while ((0, treeTraversal_1.gotoPreorderSucc)(cursor));
    // Then perform type inference for main tree
    var entry_fun_node = (0, treeTraversal_1.findEntryFunction)(tree);
    if (entry_fun_node !== null) {
        tree = parser.parse(entry_fun_node.bodyNode.text);
    }
    var var_types = inferTypeFromAssignment(tree, custom_functions, classes);
    return [var_types, custom_functions];
}
exports.typeInference = typeInference;
function inferTypeFromAssignment(tree, custom_functions, classes) {
    var var_types = [];
    var cursor = tree.walk();
    var _loop_2 = function () {
        var c = cursor;
        switch (c.nodeType) {
            case "assignment" /* g.SyntaxType.Assignment */: {
                var node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                if (node.leftNode.type == "identifier" /* g.SyntaxType.Identifier */ || node.leftNode.type == "attribute" /* g.SyntaxType.Attribute */) {
                    var _a = inferType(node.rightNode, var_types, custom_functions, classes), type = _a[0], ndim = _a[1], dim = _a[2], ismatrix = _a[3], ispointer = _a[4];
                    var v1_1 = {
                        name: node.leftNode.text,
                        type: type,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: ismatrix,
                        ispointer: type == 'char' || ismatrix,
                        initialized: false
                    };
                    var_types = var_types.filter(function (e) { return e.name !== v1_1.name; }); // replace if already in var_types
                    var_types.push(v1_1);
                    // If LHS is subscript, type is matrix
                }
                else if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || node.leftNode.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                    var v1_2 = {
                        name: node.leftNode.valueNode.text,
                        type: 'unknown',
                        ndim: 2,
                        dim: [1, 1],
                        ismatrix: true,
                        ispointer: true,
                        initialized: false
                    };
                    var_types = var_types.filter(function (e) { return e.name !== v1_2.name; }); // replace if already in var_types
                    var_types.push(v1_2);
                }
                break;
            }
        }
    };
    do {
        _loop_2();
    } while ((0, treeTraversal_1.gotoPreorderSucc_SkipFunctionDef)(cursor));
    return var_types;
}
// var unknown_type = ['unknown', null, null, null, null];
var unknown_type = ['unknown', 2, [1, 1], false, false];
function inferType(node, var_types, custom_functions, classes) {
    var _a;
    switch (node.type) {
        case "parenthesized_expression" /* g.SyntaxType.ParenthesizedExpression */: {
            return inferType(node.firstChild, var_types, custom_functions, classes);
            break;
        }
        // Named types
        case "ellipsis" /* g.SyntaxType.Ellipsis */: {
            return ['ellipsis', 2, [1, 1], false, false];
            break;
        }
        case ("true" /* g.SyntaxType.True */ || "false" /* g.SyntaxType.False */): {
            return ['bool', 2, [1, 1], false, false];
            break;
        }
        case "float" /* g.SyntaxType.Float */: {
            return ['float', 2, [1, 1], false, false];
            break;
        }
        case "integer" /* g.SyntaxType.Integer */: {
            return ['int', 2, [1, 1], false, false];
            break;
        }
        case "complex" /* g.SyntaxType.Complex */: {
            return ['complex', 2, [1, 1], false, false];
            break;
        }
        case "string" /* g.SyntaxType.String */: {
            return ['char', 2, [1, 1], false, true];
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
                        var _b = inferType(node.children[i], var_types, custom_functions, classes), type_1 = _b[0], ndim_1 = _b[1], dim_1 = _b[2];
                        ncols += dim_1[1];
                    }
                    if (col == 0) {
                        var _c = inferType(node.children[i], var_types, custom_functions, classes), type_2 = _c[0], ndim_2 = _c[1], dim_2 = _c[2];
                        nrows += dim_2[0];
                    }
                    col += 1;
                }
            }
            var children_types_1 = [];
            for (var _i = 0, _d = node.namedChildren; _i < _d.length; _i++) {
                var child = _d[_i];
                var _e = inferType(child, var_types, custom_functions, classes), child_type_1 = _e[0];
                children_types_1.push(child_type_1);
            }
            var type = 'unknown';
            if (children_types_1.every(function (val) { return val === children_types_1[0]; })) {
                type = children_types_1[0];
            }
            else if (children_types_1.every(function (val) { return ['int', 'float', 'complex'].includes(val); })) {
                if (children_types_1.includes('complex')) {
                    type = 'complex';
                }
                else if (children_types_1.includes('float')) {
                    type = 'float';
                }
                else if (children_types_1.includes('int')) {
                    type = 'int';
                }
            }
            else {
                type = 'heterogeneous';
            }
            return [type, 2, [nrows, ncols], true, true];
            break;
        }
        // Recursive calls to inferTypes
        case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
        case "boolean_operator" /* g.SyntaxType.BooleanOperator */: {
            return ['bool', 2, [1, 1], false, false];
            break;
        }
        case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
            var _f = inferType(node.firstChild, var_types, custom_functions, classes), type_3 = _f[0], ndim_3 = _f[1], dim_3 = _f[2], ismatrix_1 = _f[3];
            return [type_3, 2, [dim_3[1], dim_3[0]], ismatrix_1, false];
            break;
        }
        case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
            if (node.operatorNode.type == "~") {
                return ['bool', 2, [1, 1], false, false];
            }
            else {
                return inferType(node.firstChild, var_types, custom_functions, classes);
            }
            break;
        }
        case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
            var _g = inferType(node.leftNode, var_types, custom_functions, classes), left_type = _g[0], left_ndim = _g[1], left_dim = _g[2], left_ismatrix = _g[3];
            var _h = inferType(node.rightNode, var_types, custom_functions, classes), right_type = _h[0], right_ndim = _h[1], right_dim = _h[2], right_ismatrix = _h[3];
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
            }
            else {
                var ismatrix = false;
            }
            if (left_type == right_type) {
                return [left_type, ndim, dim, ismatrix];
            }
            else if (left_type == 'complex' || right_type == 'complex') {
                return ['complex', ndim, dim, ismatrix];
            }
            else if (left_type == 'float' || right_type == 'float') {
                return ['float', ndim, dim, ismatrix];
            }
            else if (left_type == 'bool') {
                return [right_type, ndim, dim, ismatrix];
            }
            else if (right_type == 'bool') {
                return [left_type, ndim, dim, ismatrix];
            }
            else {
                return unknown_type;
            }
            break;
        }
        // Attribute
        case "attribute" /* g.SyntaxType.Attribute */: {
            // First check if class method
            var _j = inferType(node.objectNode, var_types, custom_functions, classes), type_4 = _j[0];
            var obj = classes.find(function (x) { return x.name === type_4; });
            if (obj !== null && obj !== undefined) {
                if (obj.methods.includes(node.attributeNode.text)) {
                    // Is a method
                    // TO DO: do something like custom_functions for classes
                    // OH maybe make methods be of type CustomFunction so you can have a function dictionary
                    var obj_2 = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
                    if (obj_2 != null) {
                        if (obj_2.return_type == null) {
                            return unknown_type;
                        }
                        else {
                            return [
                                obj_2.return_type.type,
                                obj_2.return_type.ndim,
                                obj_2.return_type.dim,
                                obj_2.return_type.ismatrix,
                                obj_2.return_type.ispointer
                            ];
                        }
                    }
                    else {
                        return unknown_type;
                    }
                }
                // If not class method, treat like an identifier (field of a struct)
            }
            else {
                var obj_3 = var_types.find(function (x) { return x.name === node.text; });
                if (obj_3 != null) {
                    return [obj_3.type, obj_3.ndim, obj_3.dim, obj_3.ismatrix];
                }
                else {
                    return unknown_type;
                }
                break;
            }
        }
        // Identifier
        case "identifier" /* g.SyntaxType.Identifier */: {
            var obj = var_types.find(function (x) { return x.name === node.text; });
            if (obj != null) {
                return [obj.type, obj.ndim, obj.dim, obj.ismatrix, obj.ispointer];
            }
            else {
                return unknown_type;
            }
            break;
        }
        // TO DO: FIX THIS
        case "cell_subscript" /* g.SyntaxType.CellSubscript */: {
            var dim_4 = [];
            for (var i = 1; i < node.namedChildCount; i++) {
                var _k = inferType(node.namedChildren[i], var_types, custom_functions, classes), child_type = _k[0], child_dim = _k[2];
                dim_4.push(child_dim[1]);
            }
            if (dim_4.length == 1 && dim_4[0] == 1) {
                dim_4 = [1, 1];
            }
            if (dim_4.every(function (val) { return val === 1; })) {
                return [child_type, 2, dim_4, false, false];
            }
            else {
                return [child_type, 2, dim_4, true, true];
            }
            break;
        }
        case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
            var _l = inferType(node.valueNode, var_types, custom_functions, classes), parent_type = _l[0], parent_ismatrix = _l[3];
            // Is a subscript
            if (parent_ismatrix) {
                var dim_5 = [];
                for (var i = 1; i < node.namedChildCount; i++) {
                    var _m = inferType(node.namedChildren[i], var_types, custom_functions, classes), child_dim_1 = _m[2];
                    dim_5.push(child_dim_1[1]);
                }
                if (dim_5.length == 1 && dim_5[0] == 1) {
                    dim_5 = [1, 1];
                }
                if (dim_5.every(function (val) { return val === 1; })) {
                    return [parent_type, 2, dim_5, false, false];
                }
                else {
                    return [parent_type, 2, dim_5, true, true];
                }
                // Is a class or function call    
            }
            else {
                var obj = classes.find(function (x) { return x.name === node.valueNode.text; });
                // Is a class
                if (obj != null) {
                    return [obj.name, 1, [1], false, false];
                }
                else {
                    // Is a function call
                    var obj1 = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
                    var obj2 = builtinFunctions_1.builtin_functions.find(function (x) { return x.fun_matlab === node.valueNode.text; });
                    if (obj1 != null && obj1 != undefined) {
                        if (obj1.return_type == null) {
                            return unknown_type;
                        }
                        else {
                            return [
                                obj1.return_type.type,
                                obj1.return_type.ndim,
                                obj1.return_type.dim,
                                obj1.return_type.ismatrix,
                                obj1.return_type.ispointer
                            ];
                        }
                    }
                    else if (obj2 != null && obj2 != undefined) {
                        var _o = parseFunctionCallNode(node), args = _o[0], arg_types = _o[1], outs = _o[2];
                        var return_type = obj2.return_type(args, arg_types, outs);
                        if (return_type == null) {
                            return unknown_type;
                        }
                        else {
                            return [
                                return_type.type,
                                return_type.ndim,
                                return_type.dim,
                                return_type.ismatrix,
                                return_type.ispointer
                            ];
                        }
                    }
                    else {
                        return unknown_type;
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
                var _p = inferType(child, var_types, custom_functions, classes), child_type_2 = _p[0];
                if (child_type_2 == "keyword") {
                    _a = inferType(node.parent.valueNode, var_types, custom_functions, classes), ndim = _a[1], dim = _a[2];
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
            if (children_types.every(function (val) { return ['int', 'float', 'complex'].includes(val); })) {
                if (children_types.includes('complex')) {
                    type = 'complex';
                }
                else if (children_types.includes('float')) {
                    type = 'float';
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
            return [type, 2, [1, len], true, true];
        }
        case "keyword" /* g.SyntaxType.Keyword */: {
            return ['keyword', 2, [1, 1], false, false];
        }
        // Default
        default: return unknown_type;
    }
    // Return args, arg_types, outs from function
    function parseFunctionCallNode(node) {
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
                        var _a = inferType(right_node.namedChildren[i], var_types, custom_functions, classes), type_5 = _a[0], ndim_4 = _a[1], dim_6 = _a[2], ismatrix_2 = _a[3], ispointer = _a[4];
                        arg_types.push({
                            type: type_5,
                            ndim: ndim_4,
                            dim: dim_6,
                            ismatrix: ismatrix_2,
                            ispointer: ispointer
                        });
                    }
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    var _b = inferType(right_node.leftNode, var_types, custom_functions, classes), l_type = _b[0], l_ndim = _b[1], l_dim = _b[2], l_ismatrix = _b[3], l_ispointer = _b[4];
                    var _c = inferType(right_node.rightNode, var_types, custom_functions, classes), r_type = _c[0], r_ndim = _c[1], r_dim = _c[2], r_ismatrix = _c[3], r_ispointer = _c[4];
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
                case "unary_operator" /* g.SyntaxType.UnaryOperator */:
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    var _d = inferType(right_node.argumentNode, var_types, custom_functions, classes), type_6 = _d[0], ndim_5 = _d[1], dim_7 = _d[2], ismatrix_3 = _d[3], ispointer = _d[4];
                    arg_types.push({
                        type: type_6,
                        ndim: ndim_5,
                        dim: dim_7,
                        ismatrix: ismatrix_3,
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
            var outs = [];
            if (left_node.type == "matrix" /* g.SyntaxType.Matrix */) {
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