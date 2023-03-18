"use strict";
exports.__esModule = true;
var fs = require('fs');
var path = require("path");
var OCTAVEC = "/home/dlg59/project/Halo-Algorithm/OctaveC";
var helperFunctions_1 = require("./helperFunctions");
var args = process.argv.slice(2);
if (args.length != 2) {
    process.exit(1);
}
var mfile = args[0];
var name = path.parse(mfile).name;
var out_folder = "".concat(args[1], "/generatedCode/").concat(name);
if (!fs.existsSync("".concat(out_folder, "/matlabToRun"))) {
    fs.mkdirSync("".concat(out_folder, "/matlabToRun"));
}
if (!fs.existsSync("".concat(out_folder, "/matlabToRun/").concat(name, "_torun.m"))) {
    //fs.copyFile(`${OCTAVEC}/tests/${mfile}`, `${out_folder}/${mfile}`, (err) => {
    fs.copyFile("".concat(out_folder, "/").concat(mfile), "".concat(out_folder, "/matlabToRun/").concat(name, "_torun.m"), function (err) {
        if (err)
            throw err;
    });
    setTimeout(function () {
        var code = fs.readFileSync("".concat(out_folder, "/matlabToRun/").concat(name, "_torun.m"), "utf8");
        var expression = [];
        expression.push("addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');");
        expression.push("addpath('".concat(out_folder, "/matlabToRun');"));
        expression.push("fileID = fopen('".concat(out_folder, "/output.txt','w');\n"));
        code = expression.join("\n") + code;
        // Replace disp with dispArr
        code = code.replace(/disp\(/g, 'dispArr(fileID, ');
        var fun_defs = code.match(/function(?:(?!function|end[\r\n])[\s\S])*end/gm);
        //console.log(fun_defs);
        if (fun_defs != null) {
            for (var i = 0; i < fun_defs.length; i++) {
                var match = fun_defs[i].match(/function.* ([A-Za-z0-9_]+)\(/);
                var name_1 = match[1];
                var re = new RegExp("".concat(name_1, "\\("), 'g');
                code = code.replace(re, "".concat(name_1, "(fileID, "));
            }
        }
        fun_defs = code.match(/function(?:(?!function|end[\r\n])[\s\S])*end/gm);
        if (fun_defs != null) {
            for (var i = 0; i < fun_defs.length; i++) {
                var match = fun_defs[i].match(/function.* ([A-Za-z0-9_]+)\(/);
                var name_2 = match[1];
                var re = new RegExp("".concat(name_2, "\\("), 'g');
                code = code.replace(fun_defs[i], '');
                (0, helperFunctions_1.writeToFile)("".concat(out_folder, "/matlabToRun"), "".concat(name_2, ".m"), fun_defs[i]);
            }
        }
        (0, helperFunctions_1.writeToFile)("".concat(out_folder, "/matlabToRun"), "".concat(name, "_torun.m"), code);
    }, 8000);
}
//# sourceMappingURL=matlabToRun.js.map