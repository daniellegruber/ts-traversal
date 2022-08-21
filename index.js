"use strict";
exports.__esModule = true;
require('source-map-support').install();
var fs = require("fs");
var generateCode_1 = require("./generateCode");
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var parser = new Parser();
parser.setLanguage(Matlab);
var args = process.argv.slice(2);
if (args.length != 2) {
    process.exit(1);
}
// Load the file passed as an argument
var sourceCode = fs.readFileSync(args[0], "utf8");
var tree = parser.parse(sourceCode);
// Read filenames in given directory
var search_folder = args[1];
var files = fs.readdirSync(search_folder);
var out_folder = search_folder + "/generatedCode";
console.log("Source code:\n" + sourceCode);
console.log("---------------------\n");
(0, generateCode_1.generateCode)("main.c", tree, parser, files, search_folder, out_folder);
//# sourceMappingURL=index.js.map