"use strict";
exports.__esModule = true;
require('source-map-support').install();
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var fs_1 = require("fs");
var parser = new Parser();
parser.setLanguage(Matlab);
var args = process.argv.slice(2);
if (args.length != 1) {
    process.exit(1);
}
// Load the file passed as an argument
var sourceCode = (0, fs_1.readFileSync)(args[0], "utf8");
var tree = parser.parse(sourceCode);
var generated_code = [];
var main_function = [];
var cursor_adjust = false;
var current_code = "main";
// Main
function generateCode() {
    var cursor = tree.walk();
    do {
        if (cursor_adjust) {
            cursor.gotoParent();
        }
        var c = cursor;
        var node = c.currentNode;
        switch (node.type) {
            case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                var expression = transformNode(node.firstChild);
                if (expression != "") {
                    main_function.push(expression + ";");
                }
                cursor_adjust = false;
                current_code = "main";
                break;
            }
            case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                printFunctionDefDeclare(node);
                if (!cursor.gotoNextSibling()) {
                    return;
                }
                cursor_adjust = true;
                current_code = "subprogram";
                break;
            }
            case "if_statement" /* g.SyntaxType.IfStatement */: {
                main_function.push("if (" + transformNode(node.conditionNode) + ")");
                for (var i = 2; i < node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        main_function.push(transformNode(node.children[i]));
                    }
                }
                if (!cursor.gotoNextSibling()) {
                    return;
                }
                cursor_adjust = true;
                current_code = "main";
                break;
            }
            case "while_statement" /* g.SyntaxType.WhileStatement */: {
                main_function.push("while (" + transformNode(node.conditionNode) + ")");
                for (var i = 2; i < node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        main_function.push(transformNode(node.children[i]));
                    }
                }
                if (!cursor.gotoNextSibling()) {
                    return;
                }
                cursor_adjust = true;
                current_code = "main";
                break;
            }
            // Comments
            // TO DO: multiline comments
            case "comment" /* g.SyntaxType.Comment */: {
                main_function.push(node.text.replace("%", "//"));
                cursor_adjust = false;
                current_code = "main";
                break;
            }
            // TO DO
            case "for_statement" /* g.SyntaxType.ForStatement */: {
                console.log(node.children);
                var expression = [];
                expression.push("for (" + node.leftNode + " = ");
                if (node.rightNode.type == "slice" /* g.SyntaxType.Slice */) {
                    expression.push(node.rightNode.children[1].text + ";");
                    expression.push(node.leftNode.text + " < ", node.rightNode.children[3].text + ";");
                    if (node.rightNode.childCount == 5) {
                        expression.push(node.leftNode.text + " += " + node.rightNode.children[5].text);
                    }
                    else {
                        expression.push("++ " + node.leftNode.text);
                    }
                }
                main_function.push(expression.join(" ") + ")");
                main_function.push(transformNode(node.bodyNode));
                if (!cursor.gotoNextSibling()) {
                    return;
                }
                cursor_adjust = true;
                current_code = "main";
                break;
            }
        }
    } while (gotoPreorderSucc(cursor));
}
// Main
function transformNode(node) {
    switch (node.type) {
        case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
            return transformNode(node.firstChild) + ";";
            break;
        }
        // Assignment
        case "assignment" /* g.SyntaxType.Assignment */: {
            if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                var children_types = [];
                for (var _i = 0, _a = node.rightNode.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    children_types.push(child.type);
                }
                var _b = inferType(node.rightNode), type = _b[0], ndim = _b[1], dim = _b[2];
                if (!children_types.includes("identifier" /* g.SyntaxType.Identifier */)) {
                    initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim);
                }
                return "";
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
            for (var _c = 0, _d = node.namedChildren; _c < _d.length; _c++) {
                var child = _d[_c];
                expression.push(transformNode(child));
            }
            return "{\n" + expression.join("\n") + "\n}";
            break;
        }
        case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
            // Is a function call
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
                // Is a subscript
            }
            else {
                var v1 = { name: node.valueNode.text, type: 'array_or_struct', ndim: 1, dim: [1] };
                var_types.push(v1);
                var index = [];
                for (var i = 2; i < node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        index.push(transformNode(node.children[i]));
                    }
                }
                if (current_code == "main") {
                    main_function.push("double tmp;");
                    main_function.push("indexM(" + node.valueNode.text + ", &tmp, " + index.join(", ") + ");");
                }
                else if (current_code == "subprogram") {
                    function_definitions.push("double tmp;");
                    function_definitions.push("indexM(" + node.valueNode.text + ", &tmp, " + index.join(", ") + ");");
                }
                return "tmp";
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
        //case g.SyntaxType.Ellipsis: {}
        case "string" /* g.SyntaxType.String */:
        case "identifier" /* g.SyntaxType.Identifier */:
        case "integer" /* g.SyntaxType.Integer */:
        case "float" /* g.SyntaxType.Float */:
        case "true" /* g.SyntaxType.True */:
        case "false" /* g.SyntaxType.False */: {
            return node.text;
            break;
        }
    }
}
// Initialize variables
// -----------------------------------------------------------------------------
var var_initializations = [];
function initializeVariables() {
    for (var _i = 0, var_types_1 = var_types; _i < var_types_1.length; _i++) {
        var var_type = var_types_1[_i];
        if (var_type.type != 'matrix' && var_type.type != 'cell') {
            var_initializations.push(var_type.type + " " + var_type.name + ";");
        }
    }
}
// Initialize matrices
// -----------------------------------------------------------------------------
var matrix_initializations = [];
function initializeMatrix(node, name, ndim, dim) {
    matrix_initializations.push("int ndim = " + ndim + ";");
    matrix_initializations.push("int dim = {" + dim + "};");
    matrix_initializations.push("Matrix *" + name + " = createM(ndim, dim, COMPLEX);");
    matrix_initializations.push("double complex *input = NULL;");
    var numel = dim.reduce(function (a, b) { return a * b; });
    matrix_initializations.push("input = malloc(" + numel + "*sizeof(*input));");
    var j = 0;
    for (var i = 0; i < node.childCount; i++) {
        if (node.children[i].isNamed) {
            matrix_initializations.push("input[" + j + "] = " + node.children[i].text + ";");
            j++;
        }
    }
    matrix_initializations.push("writeM(" + name + ", " + numel + ", input);");
    matrix_initializations.push("free(input);");
}
// Print matrix functions
// -----------------------------------------------------------------------------
function printMatrixFunctions(node) {
    switch (node.type) {
        case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
            var _a = inferType(node.argumentNode), type = _a[0];
            switch (node.operatorNode.type) {
                case "+": {
                    if (type == 'matrix') {
                        return "FILLIN(".concat(node.argumentNode.text, ")");
                    }
                    else {
                        return "+".concat(node.argumentNode.text);
                    }
                    break;
                }
                case "-": {
                    if (type == 'matrix') {
                        return "FILLIN(".concat(node.argumentNode.text, ")");
                    }
                    else {
                        return "-".concat(node.argumentNode.text);
                    }
                    break;
                }
                case "~": {
                    if (type == 'matrix') {
                        return "notM(".concat(node.argumentNode.text, ")");
                    }
                    else {
                        return "~".concat(node.argumentNode.text);
                    }
                    break;
                }
            }
            break;
        }
        case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
            var _b = inferType(node.argumentNode), type = _b[0];
            switch (node.operatorNode.type) {
                case "'": {
                    if (type == 'matrix') {
                        return "ctransposeM(".concat(node.argumentNode.text, ")");
                    }
                    else {
                        return "".concat(node.argumentNode.text, "'");
                    }
                    break;
                }
                case ".'": {
                    if (type == 'matrix') {
                        return "transposeM(".concat(node.argumentNode.text, ")");
                    }
                    else {
                        return "".concat(node.argumentNode.text, ".'");
                    }
                    break;
                }
            }
            break;
        }
        case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
            var _c = inferType(node.leftNode), left_type = _c[0];
            var _d = inferType(node.rightNode), right_type = _d[0];
            switch (node.operatorNode.type) {
                case "+": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "addM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " + ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "-": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "minusM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " - ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "*": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "mtimesM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " * ").concat(node.rightNode.text);
                    }
                    break;
                }
                case ".*": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "timesM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " .* ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "/": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "mrdivideM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " / ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "./": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "rdivideM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " ./ ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "\\": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "mldivideM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " \\ ").concat(node.rightNode.text);
                    }
                    break;
                }
                case ".\\": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "ldivideM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " .\\ ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "^": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "mpowerM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " ^ ").concat(node.rightNode.text);
                    }
                    break;
                }
                case ".^": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "powerM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " .^ ").concat(node.rightNode.text);
                    }
                    break;
                }
            }
            break;
        }
        case "boolean_operator" /* g.SyntaxType.BooleanOperator */: {
            var _e = inferType(node.leftNode), left_type = _e[0];
            var _f = inferType(node.rightNode), right_type = _f[0];
            switch (node.operatorNode.type) {
                case "&": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "andM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " & ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "|": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "orM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " | ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "&&": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "FILLIN(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " && ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "||": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "FILLIN(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " || ").concat(node.rightNode.text);
                    }
                    break;
                }
            }
            break;
        }
        case "comparison_operator" /* g.SyntaxType.ComparisonOperator */: {
            var _g = inferType(node.leftNode), left_type = _g[0];
            var _h = inferType(node.rightNode), right_type = _h[0];
            switch (node.operatorNode.type) {
                case "<": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "ltM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " < ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "<=": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "leM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " <= ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "==": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "eqM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " == ").concat(node.rightNode.text);
                    }
                    break;
                }
                case ">": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "gtM(".concat(node.leftNode.text, ", ").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " > ").concat(node.rightNode.text);
                    }
                    break;
                }
                case ">=": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "geM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " >= ").concat(node.rightNode.text);
                    }
                    break;
                }
                case "~=": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return "neqM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")");
                    }
                    else {
                        return "".concat(node.leftNode.text, " ~= ").concat(node.rightNode.text);
                    }
                    break;
                }
            }
            break;
        }
    }
}
var custom_functions = [];
var default_functions = ['func1', 'func2'];
function identifyCustomFunctions() {
    var cursor = tree.walk();
    do {
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
                            for (var _i = 0, _a = return_node.namedChildren; _i < _a.length; _i++) {
                                var return_var = _a[_i];
                                var _b = inferType(return_var), return_type = _b[0];
                                ptr_declaration.push(return_type + "* p_" + return_var.text);
                                ptr_param.push("*p_" + return_var.text);
                            }
                            var v1 = { name: node.nameNode.text, ptr_param: ptr_param.join(", "), ptr_declaration: ptr_declaration.join("\n") };
                            custom_functions.push(v1);
                            // If single return value, don't use pointers 
                        }
                        else {
                            var v1 = { name: node.nameNode.text, ptr_param: "", ptr_declaration: "" };
                            custom_functions.push(v1);
                        }
                    }
                    else {
                        var v1 = { name: node.nameNode.text, ptr_param: "", ptr_declaration: "" };
                        custom_functions.push(v1);
                    }
                }
                break;
            }
        }
    } while (gotoPreorderSucc(cursor));
}
// Print function definitions and declarations
// -----------------------------------------------------------------------------
var function_definitions = [];
var function_declarations = [];
function printFunctionDefDeclare(node) {
    if (node.isNamed && node.nameNode != null) {
        var param_list = [];
        for (var _i = 0, _a = node.parametersNode.namedChildren; _i < _a.length; _i++) {
            var param = _a[_i];
            var _b = inferType(param), param_type = _b[0];
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
                    var _e = inferType(return_var), return_type = _e[0];
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
                function_definitions.push("void " + node.nameNode.text + param_list_joined);
                function_definitions.push("{");
                function_definitions.push(ptr_declaration_joined);
                // If single return value, don't use pointers 
            }
            else {
                if (param_list.length == 0) {
                    var param_list_joined = "(void)";
                }
                else {
                    var param_list_joined = "(" + param_list.join(", ") + ")";
                }
                var _f = inferType(return_node), return_type = _f[0];
                if (return_type == "char") {
                    return_type = "char *";
                }
                function_declarations.push(return_type + " " + node.nameNode.text + param_list_joined + ";");
                function_definitions.push(return_type + " " + node.nameNode.text + param_list_joined);
                function_definitions.push("{");
            }
        }
        for (var _g = 0, _h = node.bodyNode.children; _g < _h.length; _g++) {
            var child = _h[_g];
            function_definitions.push(transformNode(child));
        }
        function_definitions.push("}");
    }
}
var var_types = [];
function inferType(node) {
    switch (node.type) {
        // Named types
        case "ellipsis" /* g.SyntaxType.Ellipsis */: {
            return ['ellipsis', 2, [1, 1]];
            break;
        }
        case ("true" /* g.SyntaxType.True */ || "false" /* g.SyntaxType.False */): {
            return ['bool', 2, [1, 1]];
            break;
        }
        case "float" /* g.SyntaxType.Float */: {
            return ['float', 2, [1, 1]];
            break;
        }
        case "integer" /* g.SyntaxType.Integer */: {
            return ['int', 2, [1, 1]];
            break;
        }
        case "string" /* g.SyntaxType.String */: {
            return ['char', 2, [1, 1]];
            break;
        }
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
                        var _a = inferType(node.children[i]), type = _a[0], ndim_1 = _a[1], dim_1 = _a[2];
                        ncols += dim_1[1];
                    }
                    if (col == 0) {
                        var _b = inferType(node.children[i]), type = _b[0], ndim_2 = _b[1], dim_2 = _b[2];
                        nrows += dim_2[0];
                    }
                    col += 1;
                }
            }
            return ['matrix', 2, [nrows, ncols]];
            break;
        }
        case "cell" /* g.SyntaxType.Cell */: {
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
                        var _c = inferType(node.children[i]), type = _c[0], ndim_3 = _c[1], dim_3 = _c[2];
                        ncols += dim_3[1];
                    }
                    if (col == 0) {
                        var _d = inferType(node.children[i]), type = _d[0], ndim_4 = _d[1], dim_4 = _d[2];
                        nrows += dim_4[0];
                    }
                    col += 1;
                }
            }
            return ['cell', 2, [nrows, ncols]];
            break;
        }
        // Recursive calls to inferTypes
        case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
        case "boolean_operator" /* g.SyntaxType.BooleanOperator */: {
            return ['bool', 2, [1, 1]];
            break;
        }
        case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
            var _e = inferType(node.firstChild), type = _e[0], ndim_5 = _e[1], dim_5 = _e[2];
            return [type, 2, [dim_5[1], dim_5[0]]];
            break;
        }
        case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
            if (node.operatorNode.type == "~") {
                return ['bool', 2, [1, 1]];
            }
            else {
                return inferType(node.firstChild);
            }
            break;
        }
        case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
            var _f = inferType(node.leftNode), left_type = _f[0], left_ndim = _f[1], left_dim = _f[2];
            var _g = inferType(node.rightNode), right_type = _g[0], right_ndim = _g[1], right_dim = _g[2];
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
            if (left_type == right_type) {
                return [left_type, ndim, dim];
            }
            else if (left_type == 'matrix' || right_type == 'matrix') {
                return ['matrix', ndim, dim];
            }
            else if (left_type == 'bool') {
                return [right_type, ndim, dim];
            }
            else if (right_type == 'bool') {
                return [left_type, ndim, dim];
            }
            else {
                return ['unknown', 2, [1, 1]];
            }
            break;
        }
        // Identifiers
        case "identifier" /* g.SyntaxType.Identifier */: {
            var obj = var_types.find(function (x) { return x.name === node.text; });
            if (obj != null) {
                return [obj.type, obj.ndim, obj.dim];
            }
            else {
                return ['unknown', 2, [1, 1]];
            }
            break;
        }
        // Default
        default: return ['unknown', 2, [1, 1]];
    }
}
function typeInference() {
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "assignment" /* g.SyntaxType.Assignment */: {
                var node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                if (node.leftNode.type == "identifier" /* g.SyntaxType.Identifier */) {
                    var _a = inferType(node.rightNode), type = _a[0], ndim = _a[1], dim = _a[2];
                    var v1 = { name: node.leftNode.text, type: type, ndim: ndim, dim: dim };
                    var_types.push(v1);
                    // If LHS is subscript, type is array or struct
                }
                else if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                    var v1 = { name: node.leftNode.text, type: 'unknown', ndim: 2, dim: [1, 1] };
                    var_types.push(v1);
                }
                break;
            }
        }
    } while (gotoPreorderSucc(cursor));
    console.log("Inferred types:");
    console.log(var_types);
}
// Tree traversal function
// -----------------------------------------------------------------------------
function gotoPreorderSucc(cursor) {
    if (cursor.gotoFirstChild())
        return true;
    while (!cursor.gotoNextSibling()) {
        if (!cursor.gotoParent()) {
            return false;
        }
    }
    return true;
}
// Call functions
// -----------------------------------------------------------------------------
console.log("Source code:\n" + sourceCode);
console.log("---------------------\n");
identifyCustomFunctions();
typeInference();
initializeVariables();
generateCode();
console.log("---------------------\nGenerated code:\n");
generated_code.push("//Link\n#include <stdio.h>\n#include <stdbool.h>");
generated_code.push("\n//Function declarations");
generated_code.push(function_declarations.join("\n"));
generated_code.push("\n//Main function\nint main(void)\n{\n// Initialize variables");
generated_code.push(var_initializations.join("\n"));
generated_code.push("\n//Initialize matrices");
generated_code.push(matrix_initializations.join("\n"));
generated_code.push("\n" + main_function.join("\n"));
generated_code.push("}\n\n//Subprograms");
generated_code.push(function_definitions.join("\n"));
console.log(generated_code.join("\n"));
//# sourceMappingURL=index.js.map