"use strict";
exports.__esModule = true;
exports.generateCode = void 0;
var fs = require("fs");
var path = require("path");
var typeInference_1 = require("./typeInference");
var treeTraversal_1 = require("./treeTraversal");
var helperFunctions_1 = require("./helperFunctions");
var builtinFunctions_1 = require("./builtinFunctions");
var builtin_funs = builtinFunctions_1.builtin_functions;
// Main
function generateCode(filename, tree, out_folder, custom_functions, classes, var_types) {
    function pushToMain(expression) {
        if (current_code == "main") {
            main_function.push(expression);
        }
        else if (current_code == "subprogram") {
            function_definitions.push(expression);
        }
    }
    var function_definitions = [];
    var function_declarations = [];
    var numCellStruct = 0;
    var generated_code = [];
    var main_function = [];
    var header = [];
    var link = ["//Link\n#include <stdio.h>\n#include <stdbool.h>\n#include <complex.h>\n#include <string.h>"];
    var cursor_adjust = false;
    var current_code = "main";
    var tmpVarCnt = 0;
    function generateTmpVar() {
        tmpVarCnt += 1;
        return "tmp" + tmpVarCnt;
    }
    var type_to_matrix_type = [
        { type: "integer", matrix_type: 0 },
        { type: "int", matrix_type: 0 },
        { type: "float", matrix_type: 1 },
        { type: "complex", matrix_type: 2 },
        { type: "char", matrix_type: 3 }
    ];
    var file_is_function = false;
    function main() {
        var cursor = tree.walk();
        do {
            var c = cursor;
            var node = c.currentNode;
            switch (node.type) {
                case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                    if (node.previousSibling == null && node.nextSibling == null) {
                        file_is_function = true;
                    }
                    else {
                        file_is_function = false;
                    }
                    printFunctionDefDeclare(node, file_is_function);
                    current_code = "subprogram";
                    break;
                }
                case "comment" /* g.SyntaxType.Comment */:
                case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                    var expression = transformNode(node);
                    if (expression != ";") {
                        main_function.push(expression);
                    }
                    current_code = "main";
                    break;
                }
                case "if_statement" /* g.SyntaxType.IfStatement */:
                case "while_statement" /* g.SyntaxType.WhileStatement */:
                case "for_statement" /* g.SyntaxType.ForStatement */: {
                    main_function.push("\n" + transformNode(node));
                    current_code = "main";
                    break;
                }
            }
        } while ((0, treeTraversal_1.gotoPreorderSucc_OnlyMajorTypes)(cursor));
    }
    // Transform node
    function transformNode(node) {
        switch (node.type) {
            // Comments
            // TO DO: multiline comments
            case "comment" /* g.SyntaxType.Comment */: {
                return node.text.replace("%", "//");
                break;
            }
            case "if_statement" /* g.SyntaxType.IfStatement */: {
                var expression = [];
                expression.push("if (" + transformNode(node.conditionNode) + ")");
                for (var i = 2; i < node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        expression.push(transformNode(node.children[i]));
                    }
                }
                return "\n" + expression.join("\n");
                break;
            }
            case "while_statement" /* g.SyntaxType.WhileStatement */: {
                var expression = [];
                expression.push("while (" + transformNode(node.conditionNode) + ")");
                for (var i = 2; i < node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        expression.push(transformNode(node.children[i]));
                    }
                }
                return "\n" + expression.join("\n");
                break;
            }
            case "for_statement" /* g.SyntaxType.ForStatement */: {
                var expression1 = [];
                var expression2 = [];
                if (node.rightNode.type == "slice" /* g.SyntaxType.Slice */) {
                    expression1.push("int " + node.leftNode.text + ";");
                    expression2.push("for (" + node.leftNode.text + " = ");
                    expression2.push(node.rightNode.children[0].text + ";");
                    if (node.rightNode.childCount == 5) {
                        expression2.push(node.leftNode.text + " <= " + node.rightNode.children[4].text + ";");
                        expression2.push(node.leftNode.text + " += " + node.rightNode.children[2].text);
                    }
                    else {
                        expression2.push(node.leftNode.text + " <= " + node.rightNode.children[2].text + ";");
                        expression2.push("++ " + node.leftNode.text);
                    }
                    expression1.push(expression2.join(" ") + ") {");
                }
                else if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    var tmp_var1 = generateTmpVar();
                    var tmp_var2 = generateTmpVar();
                    var _a = (0, typeInference_1.inferType)(node.rightNode, var_types, custom_functions, classes), type = _a[0], ndim = _a[1], dim = _a[2];
                    var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
                    if (obj != null) {
                        expression1.push(initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim, type));
                    }
                    expression1.push("\nint ".concat(tmp_var2, ";"));
                    expression2.push("for (".concat(tmp_var2, " = 1;"));
                    expression2.push("".concat(tmp_var2, " <= ").concat(node.rightNode.namedChildCount, ";"));
                    expression2.push("++".concat(tmp_var2));
                    expression1.push(expression2.join(" ") + ") {");
                    expression1.push("indexM(".concat(tmp_var1, ", &").concat(node.leftNode.text, ", ").concat(tmp_var1, " -> ndim=1, ").concat(tmp_var2, ");"));
                }
                for (var _i = 0, _b = node.bodyNode.namedChildren; _i < _b.length; _i++) {
                    var child = _b[_i];
                    expression1.push(transformNode(child));
                }
                return "\n" + expression1.join("\n") + "\n}";
                break;
            }
            case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                var expression = transformNode(node.firstChild);
                if (expression != null) {
                    if (![";", "\n"].includes(expression.slice(-1))) {
                        return expression + ";";
                    }
                    else {
                        return expression;
                    }
                }
                else {
                    return null;
                }
                break;
            }
            case "parenthesized_expression" /* g.SyntaxType.ParenthesizedExpression */: {
                return "(" + transformNode(node.firstNamedChild) + ")";
                break;
            }
            // Assignment
            case "assignment" /* g.SyntaxType.Assignment */: {
                var _c = parseFunctionCallNode(node), args = _c[0], arg_types = _c[1], outs = _c[2], is_subscript = _c[3];
                var _d = (0, typeInference_1.inferType)(node.rightNode, var_types, custom_functions, classes), type = _d[0], ndim = _d[1], dim = _d[2], ismatrix = _d[3], ispointer = _d[4];
                var init_flag = false;
                if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "cell" /* g.SyntaxType.Cell */) {
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                    if (type == 'heterogeneous') {
                        var expression1 = [];
                        var expression2 = [];
                        expression1.push("\nstruct cell".concat(numCellStruct, " {"));
                        expression2.push("cell".concat(numCellStruct, " ").concat(outs[0], ";"));
                        for (var i = 0; i < node.rightNode.namedChildCount; i++) {
                            var child = node.rightNode.namedChildren[i];
                            var _e = (0, typeInference_1.inferType)(child, var_types, custom_functions, classes), child_type = _e[0], child_ndim = _e[1], child_dim = _e[2], child_ismatrix = _e[3];
                            var numel = dim.reduce(function (a, b) { return a * b; });
                            if (child.type == "matrix" /* g.SyntaxType.Matrix */) {
                                expression1.push("Matrix f".concat(i, "[").concat(numel, "];"));
                                expression2.push(initializeMatrix(node.rightNode, "".concat(outs[0], ".f").concat(i), child_ndim, child_dim, type));
                            }
                            else if (child_type == 'char') {
                                expression1.push("".concat(child_type, " f").concat(i, "[").concat(numel, "];"));
                                expression2.push("strcpy(".concat(outs[0], ".f").concat(i, ", ").concat(child.text.replace(/'/g, '"'), ");"));
                            }
                            else {
                                expression1.push("".concat(child_type, " f").concat(i, ";"));
                                expression2.push("".concat(outs[0], ".f").concat(i, " = ").concat(child.text, ";"));
                            }
                        }
                        expression1.push("}\n");
                        numCellStruct += 1;
                        expression1.push(expression2.join("\n"));
                        pushToMain(expression1.join("\n") + "\n");
                    }
                    else {
                        var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
                        if (obj != null) {
                            pushToMain(initializeMatrix(node.rightNode, outs[0], ndim, dim, type));
                        }
                    }
                    // TO DO: what do when RHS is class or function call
                    var lhs = null;
                }
                else if (node.rightNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                    var obj = classes.find(function (x) { return x.name === node.rightNode.valueNode.text; });
                    // Is a class
                    if (obj != null) {
                        var rhs = obj.name;
                    }
                    else {
                        var obj1 = custom_functions.find(function (x) { return x.name === node.rightNode.valueNode.text; });
                        var obj2 = builtin_funs.find(function (x) { return x.fun_matlab === node.rightNode.valueNode.text; });
                        if (obj1 != null && obj1 != undefined) {
                            if (obj1.return_type != null) {
                                lhs = node.leftNode.namedChildren[0].text;
                            }
                        }
                        else if (obj2 != null && obj2 != undefined) {
                            //let [args, arg_types, outs, is_subscript] = parseFunctionCallNode(node);
                            var return_type = obj2.return_type(args, arg_types, outs);
                            var fun_c = obj2.fun_c(arg_types, outs);
                            if (obj2.args_transform(args, arg_types, outs) != null) {
                                args = obj2.args_transform(args, arg_types, outs);
                            }
                            lhs = obj2.outs_transform(outs);
                        }
                    }
                    var rhs = transformNode(node.rightNode);
                    init_flag = true;
                }
                else {
                    var rhs = transformNode(node.rightNode);
                    init_flag = true;
                }
                if (lhs == null) {
                    pushToMain("".concat(rhs, ";"));
                }
                else if (init_flag) {
                    var var_type_1 = var_types.find(function (x) { return x.name === lhs; });
                    if (var_type_1 != null && var_type_1 != undefined) {
                        if (var_type_1.initialized || (var_type_1.type != type)) {
                            pushToMain("".concat(lhs, " = ").concat(rhs));
                        }
                        else {
                            if (ismatrix) {
                                pushToMain("Matrix * ".concat(lhs, " = ").concat(rhs, ";"));
                            }
                            else if (ispointer) {
                                pushToMain("".concat(type, " * ").concat(lhs, " = ").concat(rhs, ";"));
                            }
                            else {
                                pushToMain("".concat(type, " ").concat(lhs, " = ").concat(rhs, ";"));
                            }
                            var_types = var_types.filter(function (e) { return e.name !== var_type_1.name; });
                            var_type_1.initialized = true;
                            var_types.push(var_type_1);
                        }
                    }
                    else {
                        if (ismatrix) {
                            pushToMain("Matrix * ".concat(lhs, " = ").concat(rhs, ";"));
                        }
                        else if (ispointer) {
                            pushToMain("".concat(type, " * ").concat(lhs, " = ").concat(rhs, ";"));
                        }
                        else {
                            pushToMain("".concat(type, " ").concat(lhs, " = ").concat(rhs, ";"));
                        }
                        var_types.push({
                            name: lhs,
                            type: type,
                            ndim: ndim,
                            dim: dim,
                            ismatrix: ismatrix,
                            initialized: true
                        });
                    }
                }
                if (node.leftNode.Type == "matrix" /* g.SyntaxType.Matrix */) {
                    for (var j = 0; j < node.leftNode.namedChildCount; j++) {
                        var child = node.leftNode.namedChildren[j];
                        if (is_subscript[j]) {
                            var idx = getSubscriptIdx(child);
                            pushToMain("void *data = getdataM(".concat(child.valueNode.text, ");"));
                            var _f = (0, typeInference_1.inferType)(outs[j], var_types, custom_functions, classes), ismatrix_1 = _f[3];
                            if (ismatrix_1) {
                                pushToMain("void *data2 = getdataM(".concat(outs[j], ");"));
                                for (var i = 0; i < idx.length; i++) {
                                    pushToMain("memcpy(&data[".concat(idx[i], "], data2[").concat(i, "]);"));
                                }
                            }
                            else {
                                for (var i = 0; i < idx.length; i++) {
                                    pushToMain("memcpy(&data[".concat(idx[i], "], ").concat(outs[j], "[").concat(i, "]);"));
                                }
                            }
                            pushToMain("".concat(child.valueNode.text, ".data = data;"));
                        }
                    }
                }
                else {
                    if (is_subscript[0]) {
                        var idx = getSubscriptIdx(node.leftNode);
                        pushToMain("void *data = getdataM(".concat(node.leftNode.valueNode.text, ");"));
                        var _g = (0, typeInference_1.inferType)(outs[0], var_types, custom_functions, classes), ismatrix_2 = _g[3];
                        if (ismatrix_2) {
                            pushToMain("void *data2 = getdataM(".concat(outs[0], ");"));
                            for (var i = 0; i < idx.length; i++) {
                                pushToMain("memcpy(&data[".concat(idx[i], "], data2[").concat(i, "]);"));
                            }
                        }
                        else {
                            for (var i = 0; i < idx.length; i++) {
                                pushToMain("memcpy(&data[".concat(idx[i], "], ").concat(outs[0], "[").concat(i, "]);"));
                            }
                        }
                        pushToMain("".concat(node.leftNode.valueNode.text, ".data = data;"));
                    }
                }
                return null;
                break;
            }
            // Transform matrix operations
            case "binary_operator" /* g.SyntaxType.BinaryOperator */:
            case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
            case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
            case "transpose_operator" /* g.SyntaxType.TransposeOperator */:
            case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
                return printMatrixFunctions(node);
                break;
            }
            case "block" /* g.SyntaxType.Block */: {
                var expression = [];
                for (var _h = 0, _j = node.namedChildren; _h < _j.length; _h++) {
                    var child = _j[_h];
                    expression.push(transformNode(child));
                }
                return "{\n" + expression.join("\n") + "\n}";
                break;
            }
            // TO DO: FIX THIS
            case "cell_subscript" /* g.SyntaxType.CellSubscript */: {
                var index = [];
                for (var i = 1; i < node.namedChildCount; i++) {
                    index.push(transformNode(node.namedChildren[i]));
                }
                var tmp_var = generateTmpVar();
                pushToMain("double " + tmp_var + ";");
                pushToMain("indexM(" + node.valueNode.text + ", &" + tmp_var + ", " + index.join(", ") + ");");
                return tmp_var;
                break;
            }
            case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                // Is a custom function call
                var obj = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
                if (obj != null) {
                    var arg_list = [];
                    for (var i = 2; i < node.childCount; i++) {
                        if (node.children[i].isNamed) {
                            arg_list.push(transformNode(node.children[i]));
                        }
                    }
                    pushToMain(obj.ptr_declaration);
                    if (obj.ptr_param !== null) {
                        arg_list.push(obj.ptr_param);
                    }
                    if (path.parse(obj.file).name !== filename) {
                        link.push("#include <".concat(path.parse(obj.file).name, ".h>"));
                    }
                    return obj.name + "(" + arg_list.join(", ") + ")";
                }
                else {
                    // Is a builtin function call
                    var obj_1 = builtin_funs.find(function (x) { return x.fun_matlab === node.valueNode.text; });
                    if (obj_1 != null) {
                        var _k = parseFunctionCallNode(node), args = _k[0], arg_types = _k[1], outs = _k[2], is_subscript = _k[3];
                        var return_type = obj_1.return_type(args, arg_types, outs);
                        var fun_c = obj_1.fun_c(arg_types, outs);
                        var tmp_var = generateTmpVar();
                        args = obj_1.args_transform(args, arg_types, outs);
                        var n_args = node.namedChildCount - 1;
                        if (n_args < obj_1.n_req_args) {
                            args = args.concat(obj_1.opt_arg_defaults.slice(0, obj_1.n_req_args - n_args));
                        }
                        var ptr_args = obj_1.ptr_args(arg_types, outs);
                        if (ptr_args != null) {
                            var ptr_declaration = [];
                            for (var i = 0; i < ptr_args.length; i++) {
                                args.push(ptr_args[i].name);
                                ptr_declaration.push("".concat(ptr_args[i].type, " * restrict ").concat(ptr_args[i].name, ";"));
                                var_types.push(ptr_args[i]);
                            }
                            pushToMain(ptr_declaration.join("\n"));
                        }
                        return "".concat(fun_c, "(").concat(args.join(", "), ")");
                        // Is a subscript
                    }
                    else {
                        var index = [];
                        for (var i = 1; i < node.namedChildCount; i++) {
                            index.push(transformNode(node.namedChildren[i]));
                        }
                        var tmp_var = generateTmpVar();
                        if (current_code == "main") {
                            main_function.push("double " + tmp_var + ";");
                            main_function.push("indexM(" + node.valueNode.text + ", &" + tmp_var + ", " + index.join(", ") + ");");
                        }
                        else if (current_code == "subprogram") {
                            function_definitions.push("double " + tmp_var + ";");
                            function_definitions.push("indexM(" + node.valueNode.text + ", &" + tmp_var + ", " + index.join(", ") + ");");
                        }
                        return tmp_var;
                    }
                }
                break;
            }
            case "elseif_clause" /* g.SyntaxType.ElseifClause */: {
                var expression = [];
                expression.push("else if (" + transformNode(node.conditionNode) + ")");
                expression.push(transformNode(node.consequenceNode));
                return expression.join("\n");
                break;
            }
            case "else_clause" /* g.SyntaxType.ElseClause */: {
                var expression = [];
                expression.push("else");
                expression.push(transformNode(node.bodyNode));
                return expression.join("\n");
                break;
            }
            // Basic types
            //case g.SyntaxType.Ellipsis:
            case "string" /* g.SyntaxType.String */:
            case "attribute" /* g.SyntaxType.Attribute */:
            case "identifier" /* g.SyntaxType.Identifier */:
            case "integer" /* g.SyntaxType.Integer */:
            case "float" /* g.SyntaxType.Float */:
            case "true" /* g.SyntaxType.True */:
            case "false" /* g.SyntaxType.False */: {
                return node.text;
                break;
            }
            case "complex" /* g.SyntaxType.Complex */: {
                return node.firstChild.text + "*I";
            }
            case "slice" /* g.SyntaxType.Slice */: {
                var expression = slice2list(node);
                return "{".concat(expression.join(", "), "}");
            }
        }
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
                        if (transformNode(right_node.namedChildren[i]) != undefined) {
                            args.push(transformNode(right_node.namedChildren[i]));
                        }
                        else {
                            args.push(right_node.namedChildren[i].text);
                        }
                        var _a = (0, typeInference_1.inferType)(right_node.namedChildren[i], var_types, custom_functions, classes), type = _a[0], ndim = _a[1], dim = _a[2], ismatrix = _a[3], ispointer = _a[4];
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
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    var _b = (0, typeInference_1.inferType)(right_node.leftNode, var_types, custom_functions, classes), l_type = _b[0], l_ndim = _b[1], l_dim = _b[2], l_ismatrix = _b[3], l_ispointer = _b[4];
                    var _c = (0, typeInference_1.inferType)(right_node.rightNode, var_types, custom_functions, classes), r_type = _c[0], r_ndim = _c[1], r_dim = _c[2], r_ismatrix = _c[3], r_ispointer = _c[4];
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
                    if (transformNode(right_node.leftNode) != undefined) {
                        args.push(transformNode(right_node.leftNode));
                    }
                    else {
                        args.push(right_node.leftNode.text);
                    }
                    if (transformNode(right_node.rightNode) != undefined) {
                        args.push(transformNode(right_node.rightNode));
                    }
                    else {
                        args.push(right_node.rightNode.text);
                    }
                    break;
                }
                case "unary_operator" /* g.SyntaxType.UnaryOperator */:
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    var _d = (0, typeInference_1.inferType)(right_node.argumentNode, var_types, custom_functions, classes), type = _d[0], ndim = _d[1], dim = _d[2], ismatrix = _d[3], ispointer = _d[4];
                    arg_types.push({
                        type: type,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: ismatrix,
                        ispointer: ispointer
                    });
                    if (transformNode(right_node.argumentNode) != undefined) {
                        args.push(transformNode(right_node.argumentNode));
                    }
                    else {
                        args.push(right_node.argumentNode.text);
                    }
                    break;
                }
            }
            var outs = [];
            var is_subscript = [];
            if (left_node == null) {
            }
            else if (left_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                for (var _i = 0, _e = left_node.namedChildren; _i < _e.length; _i++) {
                    var child = _e[_i];
                    if (child.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || child.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                        outs.push(generateTmpVar());
                        is_subscript.push(true);
                    }
                    else if (transformNode(child) != undefined) {
                        outs.push(transformNode(child));
                    }
                    else {
                        outs.push(child.text);
                    }
                }
            }
            else {
                if (left_node.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || left_node.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                    outs.push(generateTmpVar());
                    is_subscript.push(true);
                }
                else if (transformNode(left_node) != undefined) {
                    outs.push(transformNode(left_node));
                }
                else {
                    outs.push(left_node.text);
                }
            }
            return [args, arg_types, outs, is_subscript];
        }
    }
    // Initialize matrices
    // -----------------------------------------------------------------------------
    function initializeMatrix(node, name, ndim, dim, type) {
        var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
        var expression = [];
        expression.push("int ndim = ".concat(ndim, ";"));
        expression.push("int dim = {".concat(dim, "};"));
        expression.push("Matrix * ".concat(name, " = createM(ndim, dim, ").concat(obj.matrix_type, ");"));
        expression.push("double ".concat(type, " *input = NULL;"));
        var numel = dim.reduce(function (a, b) { return a * b; });
        expression.push("input = malloc( ".concat(numel, "*sizeof(*input));"));
        var j = 0;
        for (var i = 0; i < node.childCount; i++) {
            if (node.children[i].isNamed) {
                if (obj.matrix_type == 3)
                    expression.push("input[".concat(j, "][] = ").concat(node.children[i].text.replace(/'/g, '"'), ";"));
                else {
                    expression.push("input[".concat(j, "] = ").concat(node.children[i].text, ";"));
                }
                j++;
            }
        }
        expression.push("writeM( ".concat(name, ", ").concat(numel, ", input);"));
        expression.push("free(input);");
        return "\n" + expression.join("\n") + "\n";
    }
    // Print matrix functions
    // -----------------------------------------------------------------------------
    function printMatrixFunctions(node) {
        var tmp_var = generateTmpVar();
        var _a = parseFunctionCallNode(node), args = _a[0], arg_types = _a[1], outs = _a[2], is_subscript = _a[3];
        var obj = builtinFunctions_1.operatorMapping.find(function (x) { return x.fun_matlab === node.operatorNode.type; });
        var return_type = obj.return_type(args, arg_types, outs);
        var fun_c = obj.fun_c(arg_types, outs);
        if (obj.args_transform(args, arg_types, outs) != null) {
            args = obj.args_transform(args, arg_types, outs);
        }
        if (fun_c == null) {
            switch (node.type) {
                case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
                    return "".concat(node.operatorNode.type).concat(transformNode(node.argumentNode));
                    break;
                }
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    return "".concat(transformNode(node.argumentNode)).concat(node.operatorNode.type);
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    return "".concat(transformNode(node.leftNode), " ").concat(node.operatorNode.type, " ").concat(transformNode(node.rightNode));
                    break;
                }
            }
        }
        else {
            if (return_type.ismatrix) {
                var init_type = "Matrix *";
            }
            else if (return_type.ispointer) {
                var init_type = "".concat(return_type.type, " *");
            }
            else {
                var init_type = "".concat(return_type.type);
            }
            switch (node.type) {
                case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
                    pushToMain("".concat(return_type, " ").concat(tmp_var, " = ").concat(fun_c, "(").concat(args.join(", "), ")"));
                    break;
                }
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    pushToMain("".concat(init_type, " ").concat(tmp_var, " = ").concat(fun_c, "(").concat(args.join(", "), ")"));
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    pushToMain("".concat(init_type, " ").concat(tmp_var, " = ").concat(fun_c, "(").concat(args.join(", "), ")"));
                    break;
                }
            }
            return tmp_var;
        }
    }
    // Print function declarations and definitions
    function printFunctionDefDeclare(node, file_is_function) {
        if (node.isNamed && node.nameNode != null) {
            var param_list = [];
            for (var _i = 0, _a = node.parametersNode.namedChildren; _i < _a.length; _i++) {
                var param = _a[_i];
                var _b = (0, typeInference_1.inferType)(param, var_types, custom_functions, classes), param_type = _b[0];
                param_list.push("".concat(param_type, " ").concat(param.text));
            }
            if (node.children[1].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                var return_node = node.children[1].firstChild;
                // If multiple return values, use pointers
                if (return_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                    var ptr_declaration = [];
                    for (var _c = 0, _d = return_node.namedChildren; _c < _d.length; _c++) {
                        var return_var = _d[_c];
                        ptr_declaration.push("*p_".concat(return_var.text, " = ").concat(return_var.text, ";"));
                        var _e = (0, typeInference_1.inferType)(return_var, var_types, custom_functions, classes), return_type = _e[0];
                        param_list.push("".concat(return_type, "* p_").concat(return_var.text));
                    }
                    var ptr_declaration_joined = ptr_declaration.join("\n");
                    if (param_list.length == 0) {
                        var param_list_joined = "(void)";
                    }
                    else {
                        var param_list_joined = "(" + param_list.join(", ") + ")";
                    }
                    function_declarations.push("void " + node.nameNode.text + param_list_joined + ";");
                    if (file_is_function) {
                        main_function.push("\nvoid " + node.nameNode.text + param_list_joined);
                        main_function.push("{");
                        main_function.push(ptr_declaration_joined);
                    }
                    else {
                        function_definitions.push("\nvoid " + node.nameNode.text + param_list_joined);
                        function_definitions.push("{");
                        function_definitions.push(ptr_declaration_joined);
                    }
                    // If single return value, don't use pointers 
                }
                else {
                    if (param_list.length == 0) {
                        var param_list_joined = "(void)";
                    }
                    else {
                        var param_list_joined = "(" + param_list.join(", ") + ")";
                    }
                    var _f = (0, typeInference_1.inferType)(return_node, var_types, custom_functions, classes), return_type = _f[0], ispointer = _f[4];
                    if (ispointer) {
                        return_type = "".concat(return_type, " *");
                    }
                    function_declarations.push("".concat(return_type, " ").concat(node.nameNode.text).concat(param_list_joined, ";"));
                    if (file_is_function) {
                        main_function.push("\n".concat(return_type, " ").concat(node.nameNode.text).concat(param_list_joined, ";"));
                        main_function.push("{");
                    }
                    else {
                        function_definitions.push("\n".concat(return_type, " ").concat(node.nameNode.text).concat(param_list_joined, ";"));
                        function_definitions.push("{");
                    }
                }
            }
            for (var _g = 0, _h = node.bodyNode.children; _g < _h.length; _g++) {
                var child = _h[_g];
                if (file_is_function) {
                    main_function.push(transformNode(child));
                }
                else {
                    function_definitions.push(transformNode(child));
                }
            }
            if (file_is_function) {
                main_function.push("}");
            }
            else {
                function_definitions.push("}");
            }
        }
    }
    // Generate header files
    function generateHeader() {
        var macro_fun = filename.toUpperCase() + "_H";
        header.push("#ifndef ".concat(macro_fun));
        header.push("#define ".concat(macro_fun));
        if (function_definitions.length == 0) {
            header.push("\n// Function declarations");
            header.push(function_declarations.join("\n"));
        }
        else {
            header.push("int " + filename + "(void);");
        }
        header.push("#endif");
        (0, helperFunctions_1.writeToFile)(out_folder, filename + ".h", header.join("\n"));
    }
    function slice2list(node) {
        var children_vals = [];
        for (var i = 0; i < node.namedChildCount; i++) {
            var child = node.namedChildren[i];
            var _a = (0, typeInference_1.inferType)(child, var_types, custom_functions, classes), child_type = _a[0];
            if (child_type == "keyword") {
                var _b = (0, typeInference_1.inferType)(node.parent.valueNode, var_types, custom_functions, classes), ndim = _b[1], dim = _b[2];
                var firstNode = node.parent.namedChildren[1];
                var current_dim = 0;
                var dummyNode = node;
                while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                    dummyNode = dummyNode.previousNamedSibling;
                    current_dim += 1;
                }
                children_vals.push(dim[current_dim]);
            }
            else {
                children_vals.push(Number(child.text));
            }
        }
        var start = children_vals[0];
        var stop = children_vals[1];
        var step = 1;
        if (children_vals.length == 3) {
            stop = children_vals[2];
            step = children_vals[1];
        }
        var list = [];
        for (var i = start; i <= stop; i += step) {
            list.push(i);
        }
        return list;
    }
    function matrix2list(node) {
        var list = [];
        for (var _i = 0, _a = node.namedChildren; _i < _a.length; _i++) {
            var child = _a[_i];
            list.push(transformNode(child));
        }
        return list;
    }
    function sub2idx(row_node, col_node, d0) {
        var row = row_node.text;
        var col = col_node.text;
        if (row_node.type == "slice" /* g.SyntaxType.Slice */) {
            row = slice2list(row_node);
        }
        else if (row_node.type == "matrix" /* g.SyntaxType.Matrix */) {
            row = matrix2list(row_node);
        }
        else {
            row = [Number(row_node.text)];
        }
        if (col_node.type == "slice" /* g.SyntaxType.Slice */) {
            col = slice2list(row_node);
        }
        else if (col_node.type == "matrix" /* g.SyntaxType.Matrix */) {
            col = matrix2list(row_node);
        }
        else {
            col = [Number(col_node.text)];
        }
        var idx = [];
        for (var i = 0; i < row.length; i++) {
            for (var j = 0; j < col.length; j++) {
                idx.push((Number(col[j]) - 1) * d0 + Number(row[i]));
            }
        }
        return idx;
    }
    function getSubscriptIdx(node) {
        var _a = (0, typeInference_1.inferType)(node, var_types, custom_functions, classes), dim = _a[2];
        // already a linear idx
        if (node.namedChildCount == 2) {
            if (node.namedChildren[1].type == "slice" /* g.SyntaxType.Slice */) {
                var list = slice2list(node.namedChildren[1]);
            }
            else if (node.namedChildren[1].type == "matrix" /* g.SyntaxType.Matrix */) {
                var list = matrix2list(node.namedChildren[1]);
            }
            else {
                var list = [node.namedChildren[1].text];
            }
            var idx = [];
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var l = list_1[_i];
                idx.push(Number(l));
            }
        }
        else {
            var idx = sub2idx(node.namedChildren[1], node.namedChildren[2], dim[0]);
        }
        return idx;
    }
    // Put together generated code
    // -----------------------------------------------------------------------------
    main();
    generated_code.push(link.join("\n"));
    if (function_definitions.length != 0) {
        generated_code.push("\n// Function declarations");
        generated_code.push(function_declarations.join("\n"));
    }
    if (!file_is_function) {
        generated_code.push("\n// Entry-point function\nint ".concat(filename, "(void)\n{"));
    }
    //generated_code.push("\n// Initialize variables");
    //generated_code.push(var_initializations.join("\n"));
    generated_code.push("\n" + main_function.join("\n"));
    if (!file_is_function) {
        generated_code.push("return 0;");
        generated_code.push("}\n");
    }
    if (function_definitions.length != 0) {
        generated_code.push("\n// Subprograms");
        generated_code.push(function_definitions.join("\n"));
    }
    generateHeader();
    (0, helperFunctions_1.writeToFile)(out_folder, filename + ".c", generated_code.join("\n"));
    return [generated_code.join("\n"), header.join("\n")];
}
exports.generateCode = generateCode;
//# sourceMappingURL=generateCode.js.map