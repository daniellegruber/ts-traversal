"use strict";
exports.__esModule = true;
exports.getFilesInPath = exports.writeToFile = void 0;
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
/*export const getFilesInPath = (fullPath) => {
    let files = [];
    fs.readdirSync(fullPath).forEach(file => {
        const absolutePath = path.join(fullPath, file);
        if (fs.statSync(absolutePath).isDirectory()) {
            const filesFromNestedFolder = getFilesInPath(absolutePath);
            filesFromNestedFolder.forEach(file => { files.push(file); })
        } else return files.push(absolutePath);
    });
    return files;
}*/
function getFilesInPath(src) {
    var files = glob.sync(src + '/**/*.m');
    return files;
}
exports.getFilesInPath = getFilesInPath;
;
//# sourceMappingURL=helperFunctions.js.map