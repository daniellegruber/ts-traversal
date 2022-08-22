"use strict";
exports.__esModule = true;
exports.generateCode = void 0;
var fs = require("fs");
var typeInference_1 = require("./typeInference");
var gotoPreorderSucc_1 = require("./gotoPreorderSucc");
var helperFunctions_1 = require("./helperFunctions");
// Main
function generateCode(filename, tree, parser, search_folder, out_folder, show_output) {
    var files = (0, helperFunctions_1.getFilesInPath)(search_folder);
    var function_definitions = [];
    var function_declarations = [];
    var numCellStruct = 0;
    var generated_code = [];
    var main_function = [];
    var header = [];
    var link = ["//Link\n#include <stdio.h>\n#include <stdbool.h>\n#include <complex.h>\n#include <string.h>"];
    var builtin_functions = ['zeros', 'ones'];
    var cursor_adjust = false;
    var current_code = "main";
    var tmpVarCnt = 0;
    function generateTmpVar() {
        tmpVarCnt += 1;
        return "tmp" + tmpVarCnt;
    }
    var type_to_matrix_type = [
        { type: "integer", matrix_type: 0 },
        { type: "float", matrix_type: 1 },
        { type: "complex", matrix_type: 2 },
        { type: "char", matrix_type: 3 }
    ];
    var binaryMapping = [
        { operator: '+', "function": "addM" },
        { operator: '-', "function": "minusM" },
        { operator: '*', "function": "mtimesM" },
        { operator: '/', "function": "mrdivideM" },
        { operator: '\\', "function": "mldivideM" },
        { operator: '^', "function": "mpowerM" },
        { operator: '.*', "function": "timesM" },
        { operator: './', "function": "rdivideM" },
        { operator: '.\\', "function": "ldivideM" },
        { operator: '.^', "function": "powerM" },
        { operator: '<', "function": "ltM" },
        { operator: '<=', "function": "leM" },
        { operator: '==', "function": "eqM" },
        { operator: '>', "function": "gtM" },
        { operator: '>=', "function": "geM" },
        { operator: '~=', "function": "neqM" },
    ];
    var unaryMapping = [
        { operator: "+", "function": "FILLIN" },
        { operator: "-", "function": "FILLIN" },
        { operator: "~", "function": "notM" }
    ];
    var transposeMapping = [
        { operator: "'", "function": "ctransposeM" },
        { operator: ".'", "function": "tranposeM" }
    ];
    var file_is_function = false;
    function main() {
        var cursor = tree.walk();
        do {
            if (cursor_adjust) {
                cursor.gotoParent();
            }
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
                    if (!cursor.gotoNextSibling()) {
                        return;
                    }
                    cursor_adjust = true;
                    current_code = "subprogram";
                    break;
                }
                case "comment" /* g.SyntaxType.Comment */:
                case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                    var expression = transformNode(node);
                    if (expression != ";") {
                        main_function.push(expression);
                    }
                    cursor_adjust = false;
                    current_code = "main";
                    break;
                }
                case "if_statement" /* g.SyntaxType.IfStatement */:
                case "while_statement" /* g.SyntaxType.WhileStatement */:
                case "for_statement" /* g.SyntaxType.ForStatement */: {
                    main_function.push("\n" + transformNode(node));
                    if (!cursor.gotoNextSibling()) {
                        return;
                    }
                    cursor_adjust = true;
                    current_code = "main";
                    break;
                }
            }
        } while ((0, gotoPreorderSucc_1.gotoPreorderSucc)(cursor));
    }
    // Transform node
    function transformNode(node) {
        var _a;
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
                    var _b = (0, typeInference_1.inferType)(node.rightNode, var_types), type = _b[0], ndim = _b[1], dim = _b[2];
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
                for (var _i = 0, _c = node.bodyNode.namedChildren; _i < _c.length; _i++) {
                    var child = _c[_i];
                    expression1.push(transformNode(child));
                }
                return "\n" + expression1.join("\n") + "\n}";
                break;
            }
            case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                var expression = transformNode(node.firstChild);
                if (![";", "\n"].includes(expression.slice(-1))) {
                    return expression + ";";
                }
                else {
                    return expression;
                }
                break;
            }
            // Assignment
            case "assignment" /* g.SyntaxType.Assignment */: {
                if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "cell" /* g.SyntaxType.Cell */) {
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                    var _d = (0, typeInference_1.inferType)(node.rightNode, var_types), type = _d[0], ndim = _d[1], dim = _d[2];
                    if (type == 'heterogeneous') {
                        var expression1 = [];
                        var expression2 = [];
                        expression1.push("\nstruct cell".concat(numCellStruct, " {"));
                        expression2.push("cell".concat(numCellStruct, " ").concat(node.leftNode.text, ";"));
                        for (var i = 0; i < node.rightNode.namedChildCount; i++) {
                            var child = node.rightNode.namedChildren[i];
                            var _e = (0, typeInference_1.inferType)(child, var_types), child_type = _e[0], child_ndim = _e[1], child_dim = _e[2], child_ismatrix = _e[3];
                            var numel = dim.reduce(function (a, b) { return a * b; });
                            if (child.type == "matrix" /* g.SyntaxType.Matrix */) {
                                expression1.push("Matrix f".concat(i, "[").concat(numel, "];"));
                                expression2.push(initializeMatrix(node.rightNode, "".concat(node.leftNode.text, ".f").concat(i), child_ndim, child_dim, type));
                            }
                            else if (child_type == 'char') {
                                expression1.push("".concat(child_type, " f").concat(i, "[").concat(numel, "];"));
                                expression2.push("strcpy(".concat(node.leftNode.text, ".f").concat(i, ", ").concat(child.text.replace(/'/g, '"'), ");"));
                            }
                            else {
                                expression1.push("".concat(child_type, " f").concat(i, ";"));
                                expression2.push("".concat(node.leftNode.text, ".f").concat(i, " = ").concat(child.text));
                            }
                        }
                        expression1.push("}\n");
                        numCellStruct += 1;
                        expression1.push(expression2.join("\n"));
                        return expression1.join("\n") + "\n";
                    }
                    else {
                        var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
                        if (obj != null) {
                            return initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim, type);
                        }
                        else {
                            return "";
                        }
                    }
                }
                else {
                    var expression = [];
                    expression.push(transformNode(node.leftNode));
                    expression.push("=");
                    expression.push(transformNode(node.rightNode));
                    return expression.join(" ");
                }
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
                for (var _f = 0, _g = node.namedChildren; _f < _g.length; _f++) {
                    var child = _g[_f];
                    expression.push(transformNode(child));
                }
                return "{\n" + expression.join("\n") + "\n}";
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
                    arg_list.push(obj.ptr_param);
                    var expression = [];
                    expression.push(obj.ptr_declaration);
                    expression.push(obj.name + "(" + arg_list.join(", ") + ")");
                    return expression.join("\n");
                    // Is a builtin function call
                }
                else if (builtin_functions.includes(node.valueNode.text)) {
                    switch (node.valueNode.text) {
                        case "zeros":
                        case "ones":
                        case "rand":
                        case "randn": {
                            var args = [];
                            for (var i = 2; i < node.childCount; i++) {
                                if (node.children[i].isNamed) {
                                    args.push(transformNode(node.children[i]));
                                }
                            }
                            var dim_1 = "{" + args.join(", ") + "}";
                            var ndim_1 = args.length;
                            var tmp_var = generateTmpVar();
                            if (current_code == "main") {
                                main_function.push("Matrix * ".concat(tmp_var, " = ").concat(node.valueNode.text, "M(").concat(ndim_1, ", ").concat(dim_1, ");"));
                            }
                            else if (current_code == "subprogram") {
                                function_definitions.push("Matrix * ".concat(tmp_var, " = onesM(").concat(ndim_1, ", ").concat(dim_1, ");"));
                            }
                            return tmp_var;
                            break;
                        }
                    }
                    // Is a subscript
                }
                else {
                    var v1 = { name: node.valueNode.text, type: 'unknown', ndim: 1, dim: [1], ismatrix: true };
                    var_types.push(v1);
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
                var children_vals = [];
                for (var i = 0; i < node.namedChildCount; i++) {
                    var child = node.namedChildren[i];
                    var _h = (0, typeInference_1.inferType)(child, var_types), child_type = _h[0];
                    if (child_type == "keyword") {
                        _a = (0, typeInference_1.inferType)(node.parent.valueNode, var_types), ndim = _a[1], dim = _a[2];
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
                var expression = [];
                for (var i = start; i <= stop; i += step) {
                    expression.push(i);
                }
                return "{".concat(expression.join(", "), "}");
            }
        }
    }
    // Initialize variables
    // -----------------------------------------------------------------------------
    var var_initializations = [];
    function initializeVariables() {
        for (var _i = 0, var_types_1 = var_types; _i < var_types_1.length; _i++) {
            var var_type = var_types_1[_i];
            if (var_type.type == 'char' && !var_type.ismatrix) {
                var_initializations.push("char * " + var_type.name + ";");
            }
            else if (!var_type.ismatrix) {
                var_initializations.push(var_type.type + " " + var_type.name + ";");
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
                var obj = unaryMapping.find(function (x) { return x.operator === node.operatorNode.type; });
                var _a = (0, typeInference_1.inferType)(node.argumentNode, var_types), type = _a[0], ismatrix = _a[3];
                if (ismatrix) {
                    if (current_code == "main") {
                        main_function.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.argumentNode.text, ")"));
                    }
                    else if (current_code == "subprogram") {
                        function_definitions.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.argumentNode.text, ")"));
                    }
                    return tmp_var;
                }
                else {
                    return "".concat(obj.operator).concat(transformNode(node.argumentNode));
                }
                break;
            }
            case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                var obj = transposeMapping.find(function (x) { return x.operator === node.operatorNode.type; });
                var _b = (0, typeInference_1.inferType)(node.argumentNode, var_types), type = _b[0], ismatrix = _b[3];
                if (ismatrix) {
                    if (current_code == "main") {
                        main_function.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.argumentNode.text, ")"));
                    }
                    else if (current_code == "subprogram") {
                        function_definitions.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.argumentNode.text, ")"));
                    }
                    return tmp_var;
                }
                else {
                    return "".concat(transformNode(node.argumentNode)).concat(obj.operator);
                }
                break;
            }
            case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
            case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
            case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                var obj = binaryMapping.find(function (x) { return x.operator === node.operatorNode.type; });
                var _c = (0, typeInference_1.inferType)(node.leftNode, var_types), left_type = _c[0], left_ismatrix = _c[3];
                var _d = (0, typeInference_1.inferType)(node.rightNode, var_types), right_type = _d[0], right_ismatrix = _d[3];
                if (left_ismatrix || right_ismatrix) {
                    if (current_code == "main") {
                        main_function.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                    }
                    else if (current_code == "subprogram") {
                        function_definitions.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                    }
                    return tmp_var;
                }
                else {
                    return "".concat(transformNode(node.leftNode), " ").concat(obj.operator, " ").concat(transformNode(node.rightNode));
                }
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
                var _b = (0, typeInference_1.inferType)(param, var_types), param_type = _b[0];
                param_list.push(param_type + " " + param.text);
            }
            if (node.children[1].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                var return_node = node.children[1].firstChild;
                // If multiple return values, use pointers
                if (return_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                    var ptr_declaration = [];
                    for (var _c = 0, _d = return_node.namedChildren; _c < _d.length; _c++) {
                        var return_var = _d[_c];
                        ptr_declaration.push("*p_" + return_var.text + " = " + return_var.text + ";");
                        var _e = (0, typeInference_1.inferType)(return_var, var_types), return_type = _e[0];
                        param_list.push(return_type + "* p_" + return_var.text);
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
                    var _f = (0, typeInference_1.inferType)(return_node, var_types), return_type = _f[0];
                    if (return_type == "char") {
                        return_type = "char *";
                    }
                    function_declarations.push(return_type + " " + node.nameNode.text + param_list_joined + ";");
                    if (file_is_function) {
                        main_function.push("\n" + return_type + " " + node.nameNode.text + param_list_joined);
                        main_function.push("{");
                    }
                    else {
                        function_definitions.push("\n" + return_type + " " + node.nameNode.text + param_list_joined);
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
    // Identify function definitions
    // -----------------------------------------------------------------------------
    function identifyCustomFunctions() {
        var custom_functions = [];
        var cursor = tree.walk();
        var _loop_1 = function () {
            var _a;
            var c = cursor;
            switch (c.nodeType) {
                case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                    var node = c.currentNode;
                    if (node.isNamed && node.nameNode != null) {
                        if (node.children[1].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                            var return_node = node.children[1].firstChild;
                            // If multiple return values, use pointers
                            if (return_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                                var ptr_declaration = [];
                                var ptr_param = [];
                                for (var _i = 0, _b = return_node.namedChildren; _i < _b.length; _i++) {
                                    var return_var = _b[_i];
                                    _a = (0, typeInference_1.inferType)(return_var, var_types), return_type = _a[0];
                                    ptr_declaration.push(return_type + "* p_" + return_var.text);
                                    ptr_param.push("*p_" + return_var.text);
                                }
                                var v1 = { name: node.nameNode.text, ptr_param: ptr_param.join(", "), ptr_declaration: ptr_declaration.join("\n"), external: false };
                                custom_functions.push(v1);
                                // If single return value, don't use pointers 
                            }
                            else {
                                var v1 = { name: node.nameNode.text, ptr_param: "", ptr_declaration: "", external: false };
                                custom_functions.push(v1);
                            }
                        }
                        else {
                            var v1 = { name: node.nameNode.text, ptr_param: "", ptr_declaration: "", external: false };
                            custom_functions.push(v1);
                        }
                    }
                    break;
                }
                case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                    var node_1 = c.currentNode;
                    var match = files.find(function (element) {
                        if (element.includes("/" + node_1.valueNode.text + ".m")) {
                            return true;
                        }
                    });
                    if (match !== undefined) {
                        link.push("#include <".concat(node_1.valueNode.text, ".h>"));
                        var functionCode = fs.readFileSync(match, "utf8");
                        var tree2 = parser.parse(functionCode);
                        generateCode(node_1.valueNode.text, tree2, parser, search_folder, out_folder, show_output);
                    }
                }
            }
        };
        var return_type;
        do {
            _loop_1();
        } while ((0, gotoPreorderSucc_1.gotoPreorderSucc)(cursor));
        return custom_functions;
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
        if (show_output == 1) {
            console.log("---------------------\nGenerated code for ".concat(filename, ".h:\n"));
            console.log(header.join("\n"));
        }
    }
    // Call functions
    // -----------------------------------------------------------------------------
    var var_types = (0, typeInference_1.typeInference)(tree);
    if (show_output == 1) {
        console.log("---------------------\nInferred types for ".concat(filename, ".c:\n"));
        console.log(var_types);
    }
    var custom_functions = identifyCustomFunctions();
    initializeVariables();
    main();
    if (show_output == 1) {
        console.log("---------------------\nGenerated code for ".concat(filename, ".c:\n"));
    }
    generated_code.push(link.join("\n"));
    if (function_definitions.length != 0) {
        generated_code.push("\n// Function declarations");
        generated_code.push(function_declarations.join("\n"));
    }
    if (!file_is_function) {
        generated_code.push("\n// Entry-point function\nint ".concat(filename, "(void)\n{"));
    }
    generated_code.push("\n// Initialize variables");
    generated_code.push(var_initializations.join("\n"));
    generated_code.push("\n" + main_function.join("\n"));
    if (!file_is_function) {
        generated_code.push("return 0;");
        generated_code.push("}\n");
    }
    if (function_definitions.length != 0) {
        generated_code.push("\n// Subprograms");
        generated_code.push(function_definitions.join("\n"));
    }
    if (show_output == 1) {
        console.log(generated_code.join("\n"));
    }
    generateHeader();
    (0, helperFunctions_1.writeToFile)(out_folder, filename + ".c", generated_code.join("\n"));
}
exports.generateCode = generateCode;
//# sourceMappingURL=generateCode.js.map