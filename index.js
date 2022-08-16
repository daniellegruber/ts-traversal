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
// Main
function main() {
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                var node = c.currentNode;
                var expression = mainOperation(node.firstChild);
                generated_code.push(expression);
                break;
            }
            case "block" /* g.SyntaxType.Block */: { }
            case "break_statement" /* g.SyntaxType.BreakStatement */: { }
            case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: { }
            case "cell" /* g.SyntaxType.Cell */: { }
            case "conditional_expression" /* g.SyntaxType.ConditionalExpression */: { }
            case "continue_statement" /* g.SyntaxType.ContinueStatement */: { }
            case "else_clause" /* g.SyntaxType.ElseClause */: { }
            case "elseif_clause" /* g.SyntaxType.ElseifClause */: { }
            case "for_statement" /* g.SyntaxType.ForStatement */: { }
            case "if_statement" /* g.SyntaxType.IfStatement */: { }
            case "matrix" /* g.SyntaxType.Matrix */: { }
            case "module" /* g.SyntaxType.Module */: { }
            case "parameters" /* g.SyntaxType.Parameters */: { }
            case "return_value" /* g.SyntaxType.ReturnValue */: { }
            case "slice" /* g.SyntaxType.Slice */: { }
            case "while_statement" /* g.SyntaxType.WhileStatement */: { }
        }
    } while (gotoPreorderSucc(cursor));
}
// Main
function mainOperation(node) {
    switch (node.type) {
        // Assignment
        case "assignment" /* g.SyntaxType.Assignment */: {
            var expression = [];
            expression.push(mainOperation(node.leftNode));
            expression.push("=");
            expression.push(mainOperation(node.rightNode));
            return expression.join(" ");
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
        // Comments
        // case g.SyntaxType.Comment: {}
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
// Print function definitions and declarations
// -----------------------------------------------------------------------------
var custom_functions = [];
var default_functions = ['func1', 'func2'];
var function_definitions = [];
var function_declarations = [];
function printFunctionDefDeclare() {
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                var node = c.currentNode;
                if (node.isNamed && node.nameNode != null) {
                    custom_functions.push(node.nameNode.text);
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
                                ptr_declaration.push("*p_" + return_var.text + " = " + return_var.text);
                                var _e = inferType(return_var), return_type = _e[0];
                                param_list.push(return_type + "* p_" + return_var.text);
                            }
                            var ptr_declaration_joined = ptr_declaration.join("\n");
                            var param_list_joined = "(" + param_list.join(", ") + ")";
                            function_declarations.push("void " + node.nameNode.text + param_list_joined + ";");
                            function_definitions.push("void " + node.nameNode.text + param_list_joined);
                            function_definitions.push("{");
                            function_definitions.push(ptr_declaration_joined);
                            // If single return value, don't use pointers 
                        }
                        else {
                            var param_list_joined = "(" + param_list.join(", ") + ")";
                            var _f = inferType(return_node), return_type = _f[0];
                            function_declarations.push(return_type + node.nameNode.text + param_list_joined + ";");
                            function_definitions.push(return_type + node.nameNode.text + param_list_joined);
                            function_definitions.push("{");
                        }
                    }
                    function_definitions.push(node.bodyNode.text);
                    function_definitions.push("}");
                }
                break;
            }
        }
    } while (gotoPreorderSucc(cursor));
}
// Identify calls to custom functions
// -----------------------------------------------------------------------------
function printFunctionCalls() {
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                var node = c.currentNode;
                // Is a function call
                if (custom_functions.includes(node.valueNode.text)) {
                    // Is a subscript
                }
                else {
                    var v1 = { name: node.valueNode.text, type: 'array_or_struct', ndim: 1, dim: [1] };
                    var_types.push(v1);
                    console.log;
                }
                break;
            }
        }
    } while (gotoPreorderSucc(cursor));
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
            return ['str', 2, [1, 1]];
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
                    if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                        var children_types = [];
                        for (var _i = 0, _b = node.rightNode.children; _i < _b.length; _i++) {
                            var child = _b[_i];
                            children_types.push(child.type);
                        }
                        if (!children_types.includes("identifier" /* g.SyntaxType.Identifier */)) {
                            initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim);
                        }
                    }
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
typeInference();
console.log("---------------------\nInitialize matrices:\n");
console.log(matrix_initializations.join("\n"));
console.log("---------------------\nMatrix functions:\n");
main();
printFunctionDefDeclare();
console.log("---------------------\nFunction declarations:\n");
console.log(function_declarations.join("\n"));
console.log("---------------------\nFunction definitions:\n");
console.log(function_definitions.join("\n"));
//# sourceMappingURL=index.js.map