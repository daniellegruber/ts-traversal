"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.parseFunctionDefNode = exports.getClasses = exports.getClassFolders = exports.getNonClassFilesInPath = exports.getFilesInPath = exports.waitForFileExists = exports.writeToFile = void 0;
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
function waitForFileExists(filePath, currentTime, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (fs.existsSync(filePath))
                        return [2 /*return*/, true];
                    if (currentTime === timeout)
                        return [2 /*return*/, false];
                    // wait for 1 second
                    return [4 /*yield*/, new Promise(function (resolve, reject) { return setTimeout(function () { return resolve(true); }, 1000); })];
                case 1:
                    // wait for 1 second
                    _a.sent();
                    // waited for 1 second
                    return [2 /*return*/, waitForFileExists(filePath, currentTime + 1000, timeout)];
            }
        });
    });
}
exports.waitForFileExists = waitForFileExists;
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
function getClasses(src) {
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
            methods = (0, identifyCustomFunctions_1.identifyCustomFunctions)(tree, methods, [], file, [])[0];
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
            _a = (0, typeInference_1.typeInference)(file, methods, classes), methods = _a[1];
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