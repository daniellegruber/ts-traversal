"use strict";
exports.__esModule = true;
exports.getClasses = exports.getClassFolders = exports.getNonClassFilesInPath = exports.getFilesInPath = exports.writeToFile = void 0;
//const fs = require("graceful-fs");
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
var path = require("path");
var glob = require("glob");
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
    var files = glob.sync(src + '/!(@)**/*.m');
    return files;
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
        var files = getFilesInPath(folder);
        var methods = [];
        for (var _b = 0, files_1 = files; _b < files_1.length; _b++) {
            var file = files_1[_b];
            // Placeholder
            var m = {
                name: path.parse(file).name,
                return_type: null,
                ptr_param: null,
                ptr_declaration: null,
                external: true,
                file: file
            };
            methods.push(m);
        }
        var c = {
            name: folder.substr(folder.indexOf("@") + 1),
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
            var sourceCode = fs.readFileSync(file, "utf8");
            var tree = parser.parse(sourceCode);
            _a = (0, typeInference_1.typeInference)(tree, methods, classes), methods = _a[1];
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
//# sourceMappingURL=helperFunctions.js.map