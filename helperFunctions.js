"use strict";
exports.__esModule = true;
exports.getFilesInPath = exports.writeToFile = void 0;
var fs = require("fs");
var path = require("path");
function writeToFile(out_folder, filename, generated_code) {
    if (!fs.existsSync(out_folder)) {
        fs.mkdirSync(out_folder);
    }
    fs.writeFile(out_folder + "/" + filename, generated_code, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}
exports.writeToFile = writeToFile;
var getFilesInPath = function (fullPath) {
    var files = [];
    fs.readdirSync(fullPath).forEach(function (file) {
        var absolutePath = path.join(fullPath, file);
        if (fs.statSync(absolutePath).isDirectory()) {
            var filesFromNestedFolder = (0, exports.getFilesInPath)(absolutePath);
            filesFromNestedFolder.forEach(function (file) { files.push(file); });
        }
        else
            return files.push(absolutePath);
    });
    return files;
};
exports.getFilesInPath = getFilesInPath;
//# sourceMappingURL=helperFunctions.js.map