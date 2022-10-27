"use strict";
exports.__esModule = true;
exports.inferType = exports.typeInference = void 0;
var fs = require('fs');
var treeTraversal_1 = require("./treeTraversal");
var builtinFunctions_1 = require("./builtinFunctions");
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var parser = new Parser();
parser.setLanguage(Matlab);
function typeInference(file, custom_functions, classes) {
    var _a;
    var var_types = [];
    var sourceCode = fs.readFileSync(file, "utf8");
    var tree = parser.parse(sourceCode);
    var entry_fun_node = (0, treeTraversal_1.findEntryFunction)(tree);
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
                ispointer: false,
                isstruct: true,
                initialized: false
            });
        }
    }
    _a = inferTypeFromAssignment(tree, var_types, custom_functions, classes, file), var_types = _a[0], custom_functions = _a[1];
    return [var_types, custom_functions];
}
exports.typeInference = typeInference;
function inferTypeFromAssignment(tree, var_types, custom_functions, classes, file) {
    var cursor = tree.walk();
    var _loop_1 = function () {
        var c = cursor;
        switch (c.nodeType) {
            case "assignment" /* g.SyntaxType.Assignment */: {
                var node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                var _a = inferType(node.rightNode, var_types, custom_functions, classes, file), type = _a[0], ndim = _a[1], dim = _a[2], ismatrix = _a[3], ispointer = _a[4], isstruct = _a[5], cf = _a[6];
                custom_functions = cf;
                if (node.leftNode.type == "identifier" /* g.SyntaxType.Identifier */ || node.leftNode.type == "attribute" /* g.SyntaxType.Attribute */) {
                    var v1_1 = {
                        name: node.leftNode.text,
                        type: type,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: ismatrix,
                        ispointer: type == 'char' || ismatrix,
                        isstruct: isstruct,
                        initialized: false
                    };
                    var_types = var_types.filter(function (e) { return e.name != v1_1.name; }); // replace if already in var_types
                    var_types.push(v1_1);
                    // If LHS is subscript, type is matrix
                }
                else if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || node.leftNode.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                    var name_1 = node.leftNode.valueNode.text;
                    var v1 = var_types.find(function (x) { return x.name === name_1; });
                    if (v1 != null) {
                        v1.type = type;
                    }
                    else {
                        v1 = {
                            name: name_1,
                            type: type,
                            ndim: 2,
                            dim: [1, 1],
                            ismatrix: true,
                            ispointer: true,
                            isstruct: false,
                            initialized: false
                        };
                    }
                    var_types = var_types.filter(function (e) { return e.name != name_1; }); // replace if already in var_types
                    var_types.push(v1);
                }
                break;
            }
            case "for_statement" /* g.SyntaxType.ForStatement */: {
                var node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                var _b = inferType(node.rightNode, var_types, custom_functions, classes, file), type = _b[0], ndim = _b[1], dim = _b[2], ismatrix = _b[3], ispointer = _b[4], isstruct = _b[5], cf = _b[6];
                custom_functions = cf;
                if (node.leftNode.type == "identifier" /* g.SyntaxType.Identifier */) {
                    var v1_2 = {
                        name: node.leftNode.text,
                        type: type,
                        ndim: 1,
                        dim: [1],
                        ismatrix: false,
                        ispointer: false,
                        isstruct: false,
                        initialized: false
                    };
                    var_types = var_types.filter(function (e) { return e.name != v1_2.name; }); // replace if already in var_types
                    var_types.push(v1_2);
                }
                break;
            }
        }
    };
    do {
        _loop_1();
    } while ((0, treeTraversal_1.gotoPreorderSucc_SkipFunctionDef)(cursor));
    return [var_types, custom_functions];
}
function getFunctionReturnType(fun_name, arg_types, fun_dictionary, custom_functions, classes, file) {
    // Update custom_functions with info on function return type
    var obj = fun_dictionary.find(function (x) { return x.name === fun_name; });
    if (obj != null) {
        var tree2 = parser.parse(obj.def_node.bodyNode.text);
        var _a = inferTypeFromAssignment(tree2, arg_types, custom_functions, classes, file), var_types2_1 = _a[0], c = _a[1];
        custom_functions = c;
        fun_dictionary = fun_dictionary.filter(function (e) { return e.name !== fun_name; });
        var return_node_1 = obj.def_node.return_variableNode;
        if (return_node_1 == undefined) {
            if (obj.def_node.namedChildren[0].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                return_node_1 = obj.def_node.namedChildren[0];
            }
        }
        if (return_node_1 != undefined) {
            return_node_1 = return_node_1.firstChild;
            // If multiple return values, use pointers
            if (return_node_1.type == "matrix" /* g.SyntaxType.Matrix */) {
                var v1 = {
                    name: obj.name,
                    arg_types: arg_types,
                    return_type: null,
                    outs_transform: function (outs) { return null; },
                    external: obj.external,
                    file: obj.file,
                    def_node: obj.def_node,
                    ptr_args: function (arg_types, outs) {
                        var ptr_args = [];
                        for (var i = 0; i < return_node_1.namedChildCount; i++) {
                            var return_var = return_node_1.namedChildren[i];
                            var _a = inferType(return_var, var_types2_1, custom_functions, classes, file), return_type = _a[0], return_ndim = _a[1], return_dim = _a[2], return_ismatrix = _a[3], return_ispointer = _a[4], return_isstruct = _a[5], c_1 = _a[6];
                            custom_functions = c_1;
                            var return_name = "*p_".concat(return_var.text);
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
            }
            else {
                var _b = inferType(return_node_1, var_types2_1, custom_functions, classes, file), type = _b[0], ndim = _b[1], dim = _b[2], ismatrix = _b[3], ispointer = _b[4], isstruct = _b[5], c_2 = _b[6];
                custom_functions = c_2;
                var v1 = {
                    name: obj.name,
                    arg_types: arg_types,
                    outs_transform: function (outs) { return outs; },
                    return_type: {
                        type: type,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: ismatrix,
                        ispointer: ispointer,
                        isstruct: isstruct
                    },
                    ptr_args: function (arg_types, outs) { return null; },
                    external: obj.external,
                    file: obj.file,
                    def_node: obj.def_node
                };
                fun_dictionary.push(v1);
                return [v1.return_type, fun_dictionary];
            }
        }
        else {
            var v1 = {
                name: obj.name,
                arg_types: arg_types,
                outs_transform: function (outs) { return outs; },
                return_type: null,
                //ptr_param: null, 
                //ptr_declaration: null,
                ptr_args: function (arg_types, outs) { return null; },
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
    var _a, _b, _c;
    // var unknown_type = ['unknown', null, null, null, null, null, custom_functions];
    // var unknown_type = ['unknown', 2, [1, 1], false, false, false, custom_functions];
    switch (node.type) {
        case "parenthesized_expression" /* g.SyntaxType.ParenthesizedExpression */: {
            return inferType(node.firstChild, var_types, custom_functions, classes, file);
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
            return ['float', 1, [1], false, false, false, custom_functions];
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
                        var _d = inferType(node.children[i], var_types, custom_functions, classes, file), type_1 = _d[0], ndim = _d[1], dim = _d[2], c_3 = _d[6];
                        custom_functions = c_3;
                        if (ndim > 1) {
                            ncols += dim[1];
                        }
                        else {
                            ncols += dim[0];
                        }
                    }
                    if (col == 0) {
                        var _e = inferType(node.children[i], var_types, custom_functions, classes, file), type_2 = _e[0], ndim = _e[1], dim = _e[2], c_4 = _e[6];
                        custom_functions = c_4;
                        nrows += dim[0];
                    }
                    col += 1;
                }
            }
            var children_types_1 = [];
            for (var _i = 0, _f = node.namedChildren; _i < _f.length; _i++) {
                var child = _f[_i];
                var _g = inferType(child, var_types, custom_functions, classes, file), child_type_1 = _g[0], c_5 = _g[6];
                custom_functions = c_5;
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
            return [type, 2, [nrows, ncols], true, true, false, custom_functions];
            break;
        }
        // Recursive calls to inferTypes
        case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
        case "boolean_operator" /* g.SyntaxType.BooleanOperator */: {
            return ['bool', 2, [1, 1], false, false, false, custom_functions];
            break;
        }
        case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
            var _h = inferType(node.firstChild, var_types, custom_functions, classes, file), type_3 = _h[0], ndim = _h[1], dim = _h[2], ismatrix_1 = _h[3], c_6 = _h[6];
            custom_functions = c_6;
            return [type_3, 2, [dim[1], dim[0]], ismatrix_1, false, false, custom_functions];
            break;
        }
        case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
            if (node.operatorNode.type == "~") {
                return ['bool', 2, [1, 1], false, false, false, custom_functions];
            }
            else {
                return inferType(node.argumentNode, var_types, custom_functions, classes, file);
            }
            break;
        }
        case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
            var _j = inferType(node.leftNode, var_types, custom_functions, classes, file), left_type = _j[0], left_ndim = _j[1], left_dim = _j[2], left_ismatrix = _j[3], c1 = _j[6];
            custom_functions = c1;
            if (node.leftNode.type == "unary_operator" /* g.SyntaxType.UnaryOperator */) {
                _a = inferType(node.leftNode.argumentNode, var_types, custom_functions, classes, file), left_type = _a[0], left_ndim = _a[1], left_dim = _a[2], left_ismatrix = _a[3], c1 = _a[6];
                custom_functions = c1;
            }
            var _k = inferType(node.rightNode, var_types, custom_functions, classes, file), right_type = _k[0], right_ndim = _k[1], right_dim = _k[2], right_ismatrix = _k[3], c2 = _k[6];
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
            if (left_type == right_type) {
                return [left_type, ndim, dim, ismatrix, false, false, custom_functions];
            }
            else if (left_type == 'complex' || right_type == 'complex') {
                return ['complex', ndim, dim, ismatrix, false, false, custom_functions];
            }
            else if (left_type == 'float' || right_type == 'float') {
                return ['float', ndim, dim, ismatrix, false, false, custom_functions];
            }
            else if (left_type == 'bool') {
                return [right_type, ndim, dim, ismatrix, false, false, custom_functions];
            }
            else if (right_type == 'bool') {
                return [left_type, ndim, dim, ismatrix, false, false, custom_functions];
            }
            else {
                return ['unknown', 2, [1, 1], false, false, false, custom_functions];
            }
            break;
        }
        // Attribute
        case "attribute" /* g.SyntaxType.Attribute */: {
            // First check if class method
            var _l = inferType(node.objectNode, var_types, custom_functions, classes, file), type_4 = _l[0], c_7 = _l[6];
            custom_functions = c_7;
            var obj = classes.find(function (x) { return x.name === type_4; });
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
                var obj_1 = var_types.find(function (x) { return x.name === node.text; });
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
            var obj = var_types.find(function (x) { return x.name === node.text; });
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
                var _m = inferType(node.namedChildren[i], var_types, custom_functions, classes, file), child_type = _m[0], child_dim = _m[2], c = _m[6];
                custom_functions = c;
                dim.push(child_dim[1]);
            }
            if (dim.length == 1 && dim[0] == 1) {
                dim = [1, 1];
            }
            if (dim.every(function (val) { return val === 1; })) {
                return [child_type, 2, dim, false, false, false, custom_functions];
            }
            else {
                return [child_type, 2, dim, true, true, false, custom_functions];
            }
            break;
        }
        case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
            var _o = inferType(node.valueNode, var_types, custom_functions, classes, file), parent_type = _o[0], parent_ismatrix = _o[3], parent_isstruct = _o[5], c_8 = _o[6];
            custom_functions = c_8;
            // Is a subscript
            if (parent_ismatrix || parent_isstruct) {
                var dim = [];
                for (var i = 1; i < node.namedChildCount; i++) {
                    var _p = inferType(node.namedChildren[i], var_types, custom_functions, classes, file), child_dim_1 = _p[2], c_9 = _p[6];
                    custom_functions = c_9;
                    dim.push(child_dim_1[1]);
                }
                if (dim.length == 1 && dim[0] == 1) {
                    dim = [1, 1];
                }
                if (dim.every(function (val) { return val === 1; })) {
                    return [parent_type, 2, dim, false, false, parent_isstruct, custom_functions];
                }
                else {
                    return [parent_type, 2, dim, true, true, parent_isstruct, custom_functions];
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
                        var _q = parseFunctionCallNode(node), args = _q[0], arg_types_1 = _q[1], outs = _q[2];
                        var obj1 = classes.find(function (x) { return x.name === arg_types_1[0].type; });
                        var obj2 = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
                        var obj3 = builtinFunctions_1.builtin_functions.find(function (x) { return x.fun_matlab === node.valueNode.text; });
                        if (obj1 != null && obj1 != undefined) {
                            var obj_2 = obj1.methods.find(function (x) { return x.name === node.valueNode.text; });
                            if (obj_2 != null && obj_2 != undefined) {
                                for (var i = 0; i < arg_types_1.length; i++) {
                                    obj_2.arg_types[i].type = arg_types_1[i].type;
                                    obj_2.arg_types[i].ndim = arg_types_1[i].ndim;
                                    obj_2.arg_types[i].dim = arg_types_1[i].dim;
                                    obj_2.arg_types[i].ismatrix = arg_types_1[i].ismatrix;
                                    obj_2.arg_types[i].ispointer = arg_types_1[i].ispointer;
                                }
                                var return_type = null;
                                _b = getFunctionReturnType(node.valueNode.text, obj_2.arg_types, obj1.methods, custom_functions, classes, file), return_type = _b[0], obj1.methods = _b[1];
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
                                    obj2.arg_types[i].type = arg_types_1[i].type;
                                    obj2.arg_types[i].ndim = arg_types_1[i].ndim;
                                    obj2.arg_types[i].dim = arg_types_1[i].dim;
                                    obj2.arg_types[i].ismatrix = arg_types_1[i].ismatrix;
                                    obj2.arg_types[i].ispointer = arg_types_1[i].ispointer;
                                }
                                var return_type = null;
                                _c = getFunctionReturnType(node.valueNode.text, obj2.arg_types, custom_functions, custom_functions, classes, file), return_type = _c[0], custom_functions = _c[1];
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
                var _r = inferType(child, var_types, custom_functions, classes, file), child_type_2 = _r[0], c_10 = _r[6];
                custom_functions = c_10;
                if (child_type_2 == "keyword") {
                    var _s = inferType(node.parent.valueNode, var_types, custom_functions, classes, file), ndim = _s[1], dim = _s[2], c_11 = _s[6];
                    custom_functions = c_11;
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
            return [type, 2, [1, len], true, true, false, custom_functions];
        }
        case "keyword" /* g.SyntaxType.Keyword */: {
            return ['keyword', 2, [1, 1], false, false, false, custom_functions];
        }
        // Default
        default: return ['unknown', 2, [1, 1], false, false, false, custom_functions];
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
                        var _a = inferType(right_node.namedChildren[i], var_types, custom_functions, classes, file), type_5 = _a[0], ndim = _a[1], dim = _a[2], ismatrix_2 = _a[3], ispointer = _a[4], isstruct = _a[5], c_12 = _a[6];
                        custom_functions = c_12;
                        arg_types.push({
                            type: type_5,
                            ndim: ndim,
                            dim: dim,
                            ismatrix: ismatrix_2,
                            ispointer: ispointer,
                            isstruct: isstruct
                        });
                    }
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    var _b = inferType(right_node.leftNode, var_types, custom_functions, classes, file), l_type = _b[0], l_ndim = _b[1], l_dim = _b[2], l_ismatrix = _b[3], l_ispointer = _b[4], l_isstruct = _b[5], c1 = _b[6];
                    custom_functions = c1;
                    var _c = inferType(right_node.rightNode, var_types, custom_functions, classes, file), r_type = _c[0], r_ndim = _c[1], r_dim = _c[2], r_ismatrix = _c[3], r_ispointer = _c[4], r_isstruct = _c[5], c2 = _c[6];
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
                case "unary_operator" /* g.SyntaxType.UnaryOperator */:
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    var _d = inferType(node.argumentNode, var_types, custom_functions, classes, file), type_6 = _d[0], ndim = _d[1], dim = _d[2], ismatrix_3 = _d[3], ispointer = _d[4], isstruct = _d[5], c_13 = _d[6];
                    custom_functions = c_13;
                    arg_types.push({
                        type: type_6,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: ismatrix_3,
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