"use strict";
exports.__esModule = true;
exports.identifyCustomFunctions = void 0;
var fs = require("fs");
var treeTraversal_1 = require("./treeTraversal");
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var parser = new Parser();
parser.setLanguage(Matlab);
function identifyCustomFunctions(tree, custom_functions, files, filename, file_traversal_order) {
    // Internal functions
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                var node = c.currentNode;
                var v1 = {
                    name: node.nameNode.text,
                    return_type: null,
                    ptr_param: null,
                    ptr_declaration: null,
                    external: filename !== file_traversal_order.slice(-1),
                    file: filename
                };
                custom_functions.push(v1);
                break;
            }
        }
    } while ((0, treeTraversal_1.gotoPreorderSucc)(cursor));
    // External functions
    cursor = tree.walk();
    var _loop_1 = function () {
        var _a;
        var c = cursor;
        switch (c.nodeType) {
            case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                var node_1 = c.currentNode;
                //let obj1 = findFunction(node, builtin_functions);
                //let obj2 = custom_functions.find(x => x.name === node.valueNode.text);
                var obj_1 = custom_functions.find(function (x) { return x.name === node_1.valueNode.text; });
                if (obj_1 == null) {
                    var match = files.find(function (element) {
                        if (element.includes("/" + node_1.valueNode.text + ".m")) {
                            return true;
                        }
                    });
                    if (match !== undefined) {
                        // To perform type inference on files from most to least deeply nested
                        file_traversal_order.unshift(match);
                        var functionCode = fs.readFileSync(match, "utf8");
                        var tree2 = parser.parse(functionCode);
                        _a = identifyCustomFunctions(tree2, custom_functions, files, match, file_traversal_order), custom_functions = _a[0], file_traversal_order = _a[1];
                    }
                }
                else {
                    if (obj_1.external) {
                        file_traversal_order = file_traversal_order.filter(function (e) { return e !== obj_1.file; });
                        file_traversal_order.unshift(obj_1.file);
                    }
                }
                break;
            }
        }
    };
    do {
        _loop_1();
    } while ((0, treeTraversal_1.gotoPreorderSucc)(cursor));
    return [custom_functions, file_traversal_order];
}
exports.identifyCustomFunctions = identifyCustomFunctions;
//# sourceMappingURL=identifyCustomFunctions.js.map