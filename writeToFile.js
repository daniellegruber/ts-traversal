"use strict";
exports.__esModule = true;
exports.writeToFile = void 0;
var fs = require("fs");
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
//# sourceMappingURL=writeToFile.js.map