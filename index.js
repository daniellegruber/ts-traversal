"use strict";
var _a;
exports.__esModule = true;
require('source-map-support').install();
//const fs = require("graceful-fs");
var fs = require('fs');
var path = require("path");
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
var generateCode_1 = require("./generateCode");
var helperFunctions_1 = require("./helperFunctions");
var identifyCustomFunctions_1 = require("./identifyCustomFunctions");
var typeInference_1 = require("./typeInference");
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var parser = new Parser();
parser.setLanguage(Matlab);
var args = process.argv.slice(2);
if (args.length != 4) {
    process.exit(1);
}
// Load the file passed as an argument
var sourceCode = fs.readFileSync(args[0], "utf8");
var tree = parser.parse(sourceCode);
// Read filenames in given directory
var search_folder = args[1];
var classes = (0, helperFunctions_1.getClasses)(search_folder);
// Output code to given directory
var out_folder = args[2] + "/generatedCode";
// Display generated code on console
var show_output = parseInt(args[3]);
if (show_output == 1) {
    console.log("Source code:\n" + sourceCode);
    console.log("---------------------\n");
}
var files = (0, helperFunctions_1.getNonClassFilesInPath)(search_folder);
var var_types = [];
var _b = (0, identifyCustomFunctions_1.identifyCustomFunctions)(tree, [], files, args[0], [args[0]]), custom_functions = _b[0], file_traversal_order = _b[1];
console.log("File traversal order");
console.log(file_traversal_order);
console.log("---------------------\n");
for (var _i = 0, file_traversal_order_1 = file_traversal_order; _i < file_traversal_order_1.length; _i++) {
    var file = file_traversal_order_1[_i];
    var sourceCode_1 = fs.readFileSync(file, "utf8");
    var tree_1 = parser.parse(sourceCode_1);
    _a = (0, typeInference_1.typeInference)(tree_1, custom_functions, classes), var_types = _a[0], custom_functions = _a[1];
    if (file == args[0]) {
        var filename = "main";
    }
    else {
        var filename = path.parse(file).name;
    }
    var _c = (0, generateCode_1.generateCode)(filename, tree_1, out_folder, custom_functions, classes, var_types), generated_code = _c[0], header = _c[1];
    /*console.log(`---------------------\nInferred types for ${filename}.c:\n`);
    console.log(var_types);
    console.log(`---------------------\nUpdated custom functions after ${filename}.c:\n`);
    console.log(custom_functions);*/
    if (show_output == 1) {
        console.log("---------------------\nInferred types for ".concat(filename, ".c:\n"));
        console.log(var_types);
        console.log("---------------------\nGenerated code for ".concat(filename, ".c:\n"));
        console.log(generated_code);
        console.log("---------------------\nGenerated code for ".concat(filename, ".h:\n"));
        console.log(header);
    }
}
//# sourceMappingURL=index.js.map