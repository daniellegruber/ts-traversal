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
                var matrix_out = false;
                // If LHS is a subscript
                if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || node.leftNode.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                    var lhs = generateTmpVar();
                    var _c = (0, typeInference_1.inferType)(node.leftNode, var_types, custom_functions, classes), dim_1 = _c[2];
                    // already a linear idx
                    if (node.leftNode.namedChildCount == 2) {
                        if (node.leftNode.namedChildren[1].type == "slice" /* g.SyntaxType.Slice */) {
                            var list = slice2list(node.leftNode.namedChildren[1]);
                        }
                        else if (node.leftNode.namedChildren[1].type == "matrix" /* g.SyntaxType.Matrix */) {
                            var list = matrix2list(node.leftNode.namedChildren[1]);
                        }
                        else {
                            var list = [node.leftNode.namedChildren[1].text];
                        }
                        var idx = [];
                        for (var _d = 0, list_1 = list; _d < list_1.length; _d++) {
                            var l = list_1[_d];
                            idx.push(Number(l));
                        }
                    }
                    else {
                        var idx = sub2idx(node.leftNode.namedChildren[1], node.leftNode.namedChildren[2], dim_1[0]);
                    }
                    pushToMain("void *data = getdataM(".concat(node.leftNode.valueNode.text, ");"));
                }
                else if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    //var lhs:string = transformNode(node.leftNode);
                    matrix_out = true;
                }
                else {
                    var lhs = transformNode(node.leftNode);
                }
                var _e = (0, typeInference_1.inferType)(node.rightNode, var_types, custom_functions, classes), type = _e[0], ndim = _e[1], dim = _e[2], ismatrix = _e[3], ispointer = _e[4];
                var init_flag = false;
                if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "cell" /* g.SyntaxType.Cell */) {
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                    if (type == 'heterogeneous') {
                        var expression1 = [];
                        var expression2 = [];
                        expression1.push("\nstruct cell".concat(numCellStruct, " {"));
                        expression2.push("cell".concat(numCellStruct, " ").concat(lhs, ";"));
                        for (var i = 0; i < node.rightNode.namedChildCount; i++) {
                            var child = node.rightNode.namedChildren[i];
                            var _f = (0, typeInference_1.inferType)(child, var_types, custom_functions, classes), child_type = _f[0], child_ndim = _f[1], child_dim = _f[2], child_ismatrix = _f[3];
                            var numel = dim.reduce(function (a, b) { return a * b; });
                            if (child.type == "matrix" /* g.SyntaxType.Matrix */) {
                                expression1.push("Matrix f".concat(i, "[").concat(numel, "];"));
                                expression2.push(initializeMatrix(node.rightNode, "".concat(lhs, ".f").concat(i), child_ndim, child_dim, type));
                            }
                            else if (child_type == 'char') {
                                expression1.push("".concat(child_type, " f").concat(i, "[").concat(numel, "];"));
                                expression2.push("strcpy(".concat(lhs, ".f").concat(i, ", ").concat(child.text.replace(/'/g, '"'), ");"));
                            }
                            else {
                                expression1.push("".concat(child_type, " f").concat(i, ";"));
                                expression2.push("".concat(lhs, ".f").concat(i, " = ").concat(child.text, ";"));
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
                            pushToMain(initializeMatrix(node.rightNode, lhs, ndim, dim, type));
                        }
                    }
                    // TO DO: what do when RHS is class or function call
                }
                else if (node.rightNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                    var obj = classes.find(function (x) { return x.name === node.rightNode.valueNode.text; });
                    // Is a class
                    if (obj != null) {
                        var rhs = obj.name;
                    }
                    else {
                        // Is a function call
                        if (matrix_out) {
                            var obj1 = custom_functions.find(function (x) { return x.name === node.rightNode.valueNode.text; });
                            var matches = builtin_funs.filter(function (e) { return e.fun_matlab === node.rightNode.valueNode.text; });
                            var obj2 = matches.find(function (x) { return x.fun_matlab === node.rightNode.valueNode.text; });
                            if (matches != null && matches != undefined) {
                                if (matches.length > 1) {
                                    var n_out_1 = 1;
                                    if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                                        n_out_1 = node.leftNode.namedChildCount;
                                    }
                                    obj2 = matches.find(function (x) { return x.n_out === n_out_1; });
                                }
                            }
                            if (obj1 != null && obj1 != undefined) {
                                if (obj1.return_type != null) {
                                    lhs = node.leftNode.namedChildren[0].text;
                                    if (obj1.ptr_args != null) {
                                        for (var i = 0; i < node.namedChildCount; i++) {
                                            obj1.ptr_args[i] = node.leftNode.namedChildren[i + 1].text;
                                        }
                                    }
                                }
                                else {
                                    lhs = null;
                                    if (obj1.ptr_args != null) {
                                        for (var i = 0; i < node.namedChildCount; i++) {
                                            obj1.ptr_args[i] = node.leftNode.namedChildren[i].text;
                                        }
                                    }
                                }
                                custom_functions = custom_functions.filter(function (e) { return e.name !== node.rightNode.valueNode.text; });
                                custom_functions.push(obj1);
                            }
                            else if (obj2 != null && obj2 != undefined) {
                                if (obj2.return_type != null) {
                                    lhs = node.leftNode.namedChildren[0].text;
                                    if (obj2.ptr_args != null) {
                                        for (var i = 0; i < node.namedChildCount - 1; i++) {
                                            obj2.ptr_args[i] = node.leftNode.namedChildren[i + 1].text;
                                        }
                                    }
                                }
                                else {
                                    lhs = null;
                                    if (obj2.ptr_args != null) {
                                        for (var i = 0; i < node.namedChildCount; i++) {
                                            obj2.ptr_args[i] = node.leftNode.namedChildren[i].text;
                                        }
                                    }
                                }
                                builtin_funs = builtin_funs.filter(function (e) { return e.fun_matlab !== node.rightNode.valueNode.text; });
                                builtin_funs.push(obj2);
                            }
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
                // If LHS is a subscript
                if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || node.leftNode.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                    if (ismatrix) {
                        pushToMain("void *data2 = getdataM(".concat(lhs, ");"));
                        for (var i = 0; i < idx.length; i++) {
                            pushToMain("memcpy(&data[".concat(idx[i], "], data2[").concat(i, "]);"));
                        }
                    }
                    else {
                        for (var i = 0; i < idx.length; i++) {
                            pushToMain("memcpy(&data[".concat(idx[i], "], ").concat(lhs, "[").concat(i, "]);"));
                        }
                    }
                    pushToMain("".concat(node.leftNode.valueNode.text, ".data = data;"));
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
                for (var _g = 0, _h = node.namedChildren; _g < _h.length; _g++) {
                    var child = _h[_g];
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
                    var matches = builtin_funs.filter(function (e) { return e.fun_matlab === node.valueNode.text; });
                    if (matches != null && matches != undefined) {
                        if (matches.length > 1 && node.parent.leftNode != null && node.parent.leftNode != undefined) {
                            var n_out_2 = 1;
                            if (node.parent.leftNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                                n_out_2 = node.parent.leftNode.namedChildCount;
                            }
                            obj = matches.find(function (x) { return x.n_out === n_out_2; });
                        }
                        else {
                            obj = matches.find(function (x) { return x.fun_matlab === node.valueNode.text; });
                        }
                        var args = [];
                        for (var i = 1; i < node.namedChildCount; i++) {
                            if (transformNode(node.namedChildren[i]) != undefined) {
                                args.push(transformNode(node.namedChildren[i]));
                            }
                            else {
                                args.push(node.namedChildren[i].text);
                            }
                        }
                        var tmp_var = generateTmpVar();
                        if (obj.args_transform != null) {
                            args = obj.args_transform(args);
                        }
                        var n_args = node.namedChildCount - 1;
                        if (n_args < obj.n_req_args) {
                            args = args.concat(obj.opt_arg_defaults.slice(0, obj.n_req_args - n_args));
                        }
                        if (obj.ptr_args != null) {
                            args = args.concat(obj.ptr_args);
                            var ptr_declaration = [];
                            for (var i = 0; i < obj.ptr_args.length; i++) {
                                ptr_declaration.push("".concat(obj.ptr_arg_types[i], " ").concat(obj.ptr_args[i], ";"));
                            }
                            pushToMain(ptr_declaration.join("\n"));
                        }
                        return "".concat(obj.fun_c, "(").concat(args, ")");
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
        switch (node.type) {
            case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
                var _a = (0, typeInference_1.inferType)(node.argumentNode, var_types, custom_functions, classes), type = _a[0], ismatrix = _a[3];
                var arg_types_1 = [];
                if (ismatrix) {
                    arg_types_1.push('matrix');
                }
                else {
                    arg_types_1.push('scalar');
                }
                var matches = builtinFunctions_1.unaryMapping.filter(function (e) { return e.fun_matlab === node.operatorNode.type; });
                var obj = matches.find(function (x) { return JSON.stringify(x.arg_types) === JSON.stringify(arg_types_1); });
                if (obj == null || obj == undefined) {
                    obj = matches.find(function (x) { return JSON.stringify(x.arg_types) === JSON.stringify(arg_types_1.reverse()); });
                    if (obj == null || obj == undefined) {
                        return "".concat(node.operatorNode.type).concat(transformNode(node.argumentNode));
                    }
                }
                if (obj.return_type.ismatrix) {
                    var return_type = "Matrix *";
                }
                else if (obj.return_type.ispointer) {
                    var return_type = "".concat(obj.return_type.type, " *");
                }
                else {
                    var return_type = "".concat(obj.return_type.type);
                }
                pushToMain("".concat(return_type, " ").concat(tmp_var, " = ").concat(obj.fun_c, "(").concat(node.argumentNode.text, ")"));
                return tmp_var;
                break;
            }
            case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                var _b = (0, typeInference_1.inferType)(node.argumentNode, var_types, custom_functions, classes), type = _b[0], ismatrix = _b[3];
                var arg_types_2 = [];
                if (ismatrix) {
                    arg_types_2.push('matrix');
                }
                else {
                    arg_types_2.push('scalar');
                }
                var matches = builtinFunctions_1.transposeMapping.filter(function (e) { return e.fun_matlab === node.operatorNode.type; });
                var obj = matches.find(function (x) { return JSON.stringify(x.arg_types) === JSON.stringify(arg_types_2); });
                if (obj == null || obj == undefined) {
                    obj = matches.find(function (x) { return JSON.stringify(x.arg_types) === JSON.stringify(arg_types_2.reverse()); });
                    if (obj == null || obj == undefined) {
                        return "".concat(transformNode(node.argumentNode)).concat(node.operatorNode.type);
                    }
                }
                if (obj.return_type.ismatrix) {
                    var return_type = "Matrix *";
                }
                else if (obj.return_type.ispointer) {
                    var return_type = "".concat(obj.return_type.type, " *");
                }
                else {
                    var return_type = "".concat(obj.return_type.type);
                }
                pushToMain("".concat(return_type, " ").concat(tmp_var, " = ").concat(obj.fun_c, "(").concat(node.argumentNode.text, ")"));
                return tmp_var;
                break;
            }
            case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
            case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
            case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                var _c = (0, typeInference_1.inferType)(node.leftNode, var_types, custom_functions, classes), left_type = _c[0], left_ismatrix = _c[3];
                var _d = (0, typeInference_1.inferType)(node.rightNode, var_types, custom_functions, classes), right_type = _d[0], right_ismatrix = _d[3];
                var arg_types_3 = [];
                if (left_ismatrix) {
                    arg_types_3.push('matrix');
                }
                else {
                    arg_types_3.push('scalar');
                }
                if (right_ismatrix) {
                    arg_types_3.push('matrix');
                }
                else {
                    arg_types_3.push('scalar');
                }
                var matches = builtinFunctions_1.binaryMapping.filter(function (e) { return e.fun_matlab === node.operatorNode.type; });
                var obj = matches.find(function (x) { return JSON.stringify(x.arg_types) === JSON.stringify(arg_types_3); });
                if (obj == null || obj == undefined) {
                    obj = matches.find(function (x) { return JSON.stringify(x.arg_types) === JSON.stringify(arg_types_3.reverse()); });
                    if (obj == null || obj == undefined) {
                        return "".concat(transformNode(node.leftNode), " ").concat(node.operatorNode.type, " ").concat(transformNode(node.rightNode));
                    }
                }
                if (obj.return_type.ismatrix) {
                    var return_type = "Matrix *";
                }
                else if (obj.return_type.ispointer) {
                    var return_type = "".concat(obj.return_type.type, " *");
                }
                else {
                    var return_type = "".concat(obj.return_type.type);
                }
                pushToMain("".concat(return_type, " ").concat(tmp_var, " = ").concat(obj.fun_c, "(").concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")"));
                return tmp_var;
                break;
            }
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