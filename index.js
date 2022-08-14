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
console.log("Source code:\n" + sourceCode);
var tree = parser.parse(sourceCode);
/*let tree = parser.parse(`
    A = [1, 2;
        3, 4];
    B = [A;A];
    C = B*A;
`);*/
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
                        if (node.argumentNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("FILLIN(".concat(node.argumentNode.text, ")"));
                        }
                        else {
                            console.log("+".concat(node.argumentNode.text));
                        }
                        break;
                    }
                    case "-": {
                        if (node.argumentNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("FILLIN(".concat(node.argumentNode.text, ")"));
                        }
                        else {
                            console.log("-".concat(node.argumentNode.text));
                        }
                        break;
                    }
                    case "~": {
                        if (node.argumentNode.type == "matrix" /* g.SyntaxType.Matrix */) {
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
                        if (node.argumentNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("ctransposeM(".concat(node.argumentNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.argumentNode.text, "'"));
                        }
                        break;
                    }
                    case ".'": {
                        if (node.argumentNode.type == "matrix" /* g.SyntaxType.Matrix */) {
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
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("addM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " + ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "-": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("minusM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " - ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "*": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("mtimesM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " * ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case ".*": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("timesM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " .* ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "/": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("mrdivideM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " / ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "./": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("rdivideM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " ./ ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "\\": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("mldivideM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " \\ ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case ".\\": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("ldivideM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " .\\ ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "^": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("mpowerM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " ^ ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case ".^": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
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
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("andM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " & ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "|": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("orM(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " | ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "&&": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                            console.log("FILLIN(".concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                        }
                        else {
                            console.log("".concat(node.leftNode.text, " && ").concat(node.rightNode.text));
                        }
                        break;
                    }
                    case "||": {
                        if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
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
// Print function definitions
// -----------------------------------------------------------------------------
var custom_functions = [];
var default_functions = ['func1', 'func2'];
function printFunctionDefinitions() {
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                var node = c.currentNode;
                if (node.isNamed && node.nameNode != null) {
                    custom_functions.push(node.nameNode.text);
                    node.bodyNode;
                    node.parametersNode;
                    if (node.return_variableNode.firstChild != null) {
                        var return_node = node.return_variableNode.firstChild;
                        // If multiple return values, use pointers
                        if (return_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                            for (var _i = 0, _a = return_node.namedChildren; _i < _a.length; _i++) {
                                var member = _a[_i];
                                console.log("*p_" + member.text + " = " + member.text);
                            }
                            // If single return value, don't use pointers 
                        }
                        else { }
                    }
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
            return 'ellipsis';
            break;
        }
        case ("true" /* g.SyntaxType.True */ || "false" /* g.SyntaxType.False */): {
            return 'bool';
            break;
        }
        case "float" /* g.SyntaxType.Float */: {
            return 'float';
            break;
        }
        case "integer" /* g.SyntaxType.Integer */: {
            return 'int';
            break;
        }
        case "string" /* g.SyntaxType.String */: {
            return 'str';
            break;
        }
        case "matrix" /* g.SyntaxType.Matrix */: {
            return 'matrix';
            break;
        }
        case "cell" /* g.SyntaxType.Cell */: {
            return 'cell';
            break;
        }
        // Recursive calls to inferTypes
        case ("comparison_operator" /* g.SyntaxType.ComparisonOperator */ || "boolean_operator" /* g.SyntaxType.BooleanOperator */): {
            return 'bool';
            break;
        }
        case ("unary_operator" /* g.SyntaxType.UnaryOperator */ || "transpose_operator" /* g.SyntaxType.TransposeOperator */): {
            if (node.operatorNode.type == "~") {
                return 'bool';
            }
            else {
                return inferType(node.firstChild);
            }
            break;
        }
        case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
            var left_type = inferType(node.leftNode);
            var right_type = inferType(node.rightNode);
            if (left_type == right_type) {
                return left_type;
            }
            else if (left_type == 'matrix' || right_type == 'matrix') {
                return 'matrix';
            }
            else if (left_type == 'bool') {
                return right_type;
            }
            else if (right_type == 'bool') {
                return left_type;
            }
            else {
                return 'unknown';
            }
            break;
        }
        // Identifiers
        case "identifier" /* g.SyntaxType.Identifier */: {
            var obj = var_types.find(function (x) { return x.name === node.text; });
            if (obj != null) {
                return obj.type;
            }
            else {
                return 'unknown';
            }
            break;
        }
        // Default
        default: return 'unknown';
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
                    var v1 = { name: node.leftNode.text, type: inferType(node.rightNode) };
                    var_types.push(v1);
                    // If LHS is subscript, type is array or struct
                }
                else if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                    var v1 = { name: node.leftNode.text, type: 'array_or_struct' };
                    var_types.push(v1);
                }
                break;
            }
        }
    } while (gotoPreorderSucc(cursor));
    console.log(var_types);
}
// Get children names
// -----------------------------------------------------------------------------
function getChildrenNames(node) {
    var result = [];
    //for (let child of node.namedChildren) {
    for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
        var child = _a[_i];
        //if (member.type === g.SyntaxType.Expression) {
        result.push(child.text);
        //}
    }
    return result;
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
// Print matrix functions
// -----------------------------------------------------------------------------
printMatrixFunctions();
printFunctionDefinitions();
typeInference();
//# sourceMappingURL=index.js.map