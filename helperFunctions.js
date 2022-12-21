"use strict";
exports.__esModule = true;
exports.parseFunctionDefNode = exports.getClasses = exports.getClassFolders = exports.getNonClassFilesInPath = exports.getFilesInPath = exports.writeToFile = void 0;
//const fs = require("graceful-fs");
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
var path = require("path");
var glob = require("glob");
var identifyCustomFunctions_1 = require("./identifyCustomFunctions");
var typeInference_1 = require("./typeInference");
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var parser = new Parser();
parser.setLanguage(Matlab);
function writeToFile(out_folder, filename, generated_code) {
    if (!fs.existsSync(out_folder)) {
        fs.mkdirSync(out_folder);
    }
    fs.writeFile(path.join(out_folder, filename), generated_code, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}
exports.writeToFile = writeToFile;
function getFilesInPath(src) {
    var files = glob.sync(src + '/**/*.m');
    return files;
}
exports.getFilesInPath = getFilesInPath;
;
function getNonClassFilesInPath(src) {
    var files1 = glob.sync(src + '/!(@)**/*.m');
    var files2 = glob.sync(src + '/*.m');
    return files1.concat(files2);
}
exports.getNonClassFilesInPath = getNonClassFilesInPath;
;
// https://www.mathworks.com/help/matlab/matlab_oop/organizing-classes-in-folders.html
function getClassFolders(src) {
    var folders = glob.sync(src + '/@**');
    return folders;
}
exports.getClassFolders = getClassFolders;
;
function getClasses(src, debug) {
    var _a;
    var folders = getClassFolders(src);
    var classes = [];
    // Loop 1
    for (var _i = 0, folders_1 = folders; _i < folders_1.length; _i++) {
        var folder = folders_1[_i];
        var class_name = folder.substr(folder.indexOf("@") + 1);
        var files = getFilesInPath(folder);
        var methods = [];
        for (var _b = 0, files_1 = files; _b < files_1.length; _b++) {
            var file = files_1[_b];
            var sourceCode = fs.readFileSync(file, "utf8");
            var tree = parser.parse(sourceCode);
            methods = (0, identifyCustomFunctions_1.identifyCustomFunctions)(tree, methods, [], file, [], debug)[0];
        }
        // Placeholder
        var c = {
            name: class_name,
            methods: methods,
            folder: folder
        };
        classes.push(c);
    }
    // Loop 2
    var classes2 = [];
    for (var _c = 0, classes_1 = classes; _c < classes_1.length; _c++) {
        var c1 = classes_1[_c];
        var files = getFilesInPath(c1.folder);
        var methods = c1.methods;
        for (var _d = 0, files_2 = files; _d < files_2.length; _d++) {
            var file = files_2[_d];
            // Update placeholders
            _a = (0, typeInference_1.typeInference)(file, methods, classes, debug), methods = _a[1];
        }
        var c = {
            name: c1.name,
            methods: methods,
            folder: c1.folder
        };
        classes2.push(c);
    }
    return classes2;
}
exports.getClasses = getClasses;
;
function parseFunctionDefNode(node) {
    switch (node.type) {
        case "ERROR" /* g.SyntaxType.ERROR */: {
            var types = [];
            for (var _i = 0, _a = node.namedChildren; _i < _a.length; _i++) {
                var child = _a[_i];
                types.push(child.type);
            }
            if (types.includes("parameters" /* g.SyntaxType.Parameters */)) {
                var param_idx = types.indexOf("parameters" /* g.SyntaxType.Parameters */);
                var parametersNode = node.namedChildren[param_idx];
                var nameNode = node.namedChildren[param_idx - 1];
                var bodyNode = node.namedChildren[param_idx + 1];
                var return_variableNode = undefined;
                var return_idx = types.indexOf("return_value" /* g.SyntaxType.ReturnValue */);
                if (return_idx != null && return_idx != undefined) {
                    return_variableNode = node.namedChildren[return_idx];
                }
                //return [return_variableNode, nameNode, parametersNode, bodyNode];
                return {
                    type: "function_definition" /* g.SyntaxType.FunctionDefinition */,
                    return_variableNode: return_variableNode,
                    nameNode: nameNode,
                    parametersNode: parametersNode,
                    bodyNode: bodyNode
                };
            }
            else {
                return null;
            }
            break;
        }
        case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
            //return [node.return_variableNode, node.nameNode, node.parametersNode, node.bodyNode];
            if (node.return_variableNode == undefined && node.namedChildren[0].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                node.return_variableNode = node.namedChildren[0];
            }
            return node;
            break;
        }
        default: {
            return null;
            break;
        }
    }
}
exports.parseFunctionDefNode = parseFunctionDefNode;
//# sourceMappingURL=helperFunctions.js.map