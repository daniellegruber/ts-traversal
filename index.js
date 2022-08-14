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
function typeInference() {
    var cursor = tree.walk();
    var _loop_1 = function () {
        var c = cursor;
        switch (c.nodeType) {
            case "assignment" /* g.SyntaxType.Assignment */: {
                var node_1 = c.currentNode;
                if (node_1.leftNode.type == "identifier" /* g.SyntaxType.Identifier */) {
                    if (node_1.rightNode.type == "identifier" /* g.SyntaxType.Identifier */) {
                        var obj = var_types.find(function (x) { return x.name === node_1.rightNode.text; });
                        if (obj != null) {
                            var v1 = { name: node_1.leftNode.text, type: obj.type };
                            var_types.push(v1);
                        }
                        else {
                            var v1 = { name: node_1.leftNode.text, type: node_1.rightNode.type };
                            var_types.push(v1);
                        }
                    }
                    else {
                        var v1 = { name: node_1.leftNode.text, type: node_1.rightNode.type };
                        var_types.push(v1);
                    }
                }
                else if (node_1.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                    var v1 = { name: node_1.leftNode.text, type: 'array_or_struct' };
                    var_types.push(v1);
                }
                //var_types.push(v1);
                break;
            }
        }
    };
    do {
        _loop_1();
    } while (gotoPreorderSucc(cursor));
}
// Get member names
// -----------------------------------------------------------------------------
function getMemberNames(node) {
    var result = [];
    for (var _i = 0, _a = node.namedChildren; _i < _a.length; _i++) {
        var member = _a[_i];
        //if (member.type === g.SyntaxType.Expression) {
        result.push(member.text);
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
//# sourceMappingURL=index.js.map