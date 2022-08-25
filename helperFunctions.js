"use strict";
exports.__esModule = true;
exports.getClasses = exports.getClassFolders = exports.getNonClassFilesInPath = exports.getFilesInPath = exports.writeToFile = void 0;
//const fs = require("graceful-fs");
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
var path = require("path");
var glob = require("glob");
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
    var folders = getClassFolders(src);
    var classes = [];
    for (var _i = 0, folders_1 = folders; _i < folders_1.length; _i++) {
        var folder = folders_1[_i];
        var files = getFilesInPath(folder);
        var methods = [];
        for (var _a = 0, files_1 = files; _a < files_1.length; _a++) {
            var file = files_1[_a];
            methods.push(path.parse(file).name);
        }
        var c = {
            name: folder.substr(folder.indexOf("@") + 1),
            methods: methods,
            folder: folder
        };
        classes.push(c);
    }
    return classes;
}
exports.getClasses = getClasses;
;
//# sourceMappingURL=helperFunctions.js.map