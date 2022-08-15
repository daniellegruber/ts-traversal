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
/*let tree = parser.parse(`
    A = [1, 2;
        3, 4];
    B = [A;A];
    C = B*A;
`);*/
// Initialize matrices
// -----------------------------------------------------------------------------
function initializeMatrix(node, name, ndim, dim) {
    console.log("int ndim = " + ndim);
    console.log("int dim = " + dim);
    console.log("Matrix *" + name + " = createM(ndim, dim, COMPLEX);");
    console.log("double complex *input = NULL;");
    var numel = dim.reduce(function (a, b) { return a * b; });
    console.log("input = malloc(" + numel + "*sizeof(*input));");
    var j = 0;
    for (var i = 0; i < node.childCount; i++) {
        if (node.children[i].isNamed) {
            console.log("input[" + j + "] = " + node.children[i].text + ";");
        }
    }
    console.log("writeM(" + name + ", " + numel + ", input);");
    console.log("free(input);");
}
// Print matrix functions
// -----------------------------------------------------------------------------
function printMatrixFunctions() {
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
                var node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "+": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log("FILLIN(".concat(node.argumentNode.text, ")"));
                        }
                        else {
                            console.log("+".concat(node.argumentNode.text));
                        }
                        break;
                    }
                    case "-": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log("FILLIN(".concat(node.argumentNode.text, ")"));
                        }
                        else {
                            console.log("-".concat(node.argumentNode.text));
                        }
                        break;
                    }
                    case "~": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log("notM(".concat(node.argumentNode.text, ")"));
                        }
                        else {
                            console.log("~".concat(node.argumentNode.text));
                        }
                        break;
                    }
                }
                break;
            }
            case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                var node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "'": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log("ctransposeM(".concat(node.argumentNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.argumentNode.text, "'"));
                        }
                        break;
                    }
                    case ".'": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log("transposeM(".concat(node.argumentNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.argumentNode.text, ".'"));
                        }
                        break;
                    }
                }
                break;
            }
            case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                var node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "+": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("addM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " + ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "-": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("minusM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " - ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "*": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("mtimesM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " * ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case ".*": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("timesM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " .* ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "/": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("mrdivideM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " / ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "./": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("rdivideM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " ./ ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "\\": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("mldivideM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " \\ ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case ".\\": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("ldivideM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " .\\ ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "^": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("mpowerM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " ^ ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case ".^": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("powerM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " .^ ").concat(node.rightNode.text));
                        }
                        break;
                    }
                }
                break;
            }
            case "boolean_operator" /* g.SyntaxType.BooleanOperator */: {
                var node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "&": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("andM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " & ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "|": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("orM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " | ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "&&": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("FILLIN(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " && ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "||": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log("FILLIN(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " || ").concat(node.rightNode.text));
                        }
                        break;
                    }
                }
                break;
            }
            case "comparison_operator" /* g.SyntaxType.ComparisonOperator */: {
                var node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "<": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("ltM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " < ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "<=": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("leM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " <= ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "==": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("eqM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " == ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case ">": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("gtM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " > ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case ">=": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("geM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " >= ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "~=": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("neqM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " ~= ").concat(node.rightNode.text));
                        }
                        break;
                    }
                }
                break;
            }
        }
    } while (gotoPreorderSucc(cursor));
}
// Print function definitions and declarations
// -----------------------------------------------------------------------------
var custom_functions = [];
var default_functions = ['func1', 'func2'];
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
                        var param_type = inferType(param);
                        param_list.push(param_type + " " + param.text);
                    }
                    if (node.children[1].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                        var return_node = node.children[1].firstChild;
                        // If multiple return values, use pointers
                        if (return_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                            var ptr_declaration = [];
                            for (var _b = 0, _c = return_node.namedChildren; _b < _c.length; _b++) {
                                var return_var = _c[_b];
                                ptr_declaration.push("*p_" + return_var.text + " = " + return_var.text);
                                param_list.push(inferType(return_var) + "* p_" + return_var.text);
                            }
                            var ptr_declaration_joined = ptr_declaration.join("\n");
                            var return_type = "void";
                            // If single return value, don't use pointers 
                        }
                        else {
                            var return_type = inferType(return_node);
                        }
                    }
                    var param_list_joined = "(" + param_list.join(", ") + ")";
                    var function_declaration = "static " + return_type + node.nameNode.text + param_list_joined;
                    console.log(function_declaration);
                    console.log(return_type + node.nameNode.text + param_list_joined);
                    console.log(ptr_declaration_joined);
                    console.log(node.bodyNode.text);
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
        case "transpose_operator" /* g.SyntaxType.TransposeOperator */:
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
            var _e = inferType(node.leftNode), left_type = _e[0], left_ndim = _e[1], left_dim = _e[2];
            var _f = inferType(node.rightNode), right_type = _f[0], right_ndim = _f[1], right_dim = _f[2];
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
                        initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim);
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
//console.log("---------------------\nInitialize matrices:\n")
//initializeMatrices();
console.log("---------------------\nMatrix functions:\n");
printMatrixFunctions();
console.log("---------------------\nFunction definitions:\n");
printFunctionDefDeclare();
//# sourceMappingURL=index.js.map