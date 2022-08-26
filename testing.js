"use strict";
exports.__esModule = true;
require('source-map-support').install();
//const fs = require("graceful-fs");
var fs = require('fs');
var path = require("path");
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
var helperFunctions_1 = require("./helperFunctions");
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
//const files = fs.readdirSync(search_folder);
// Output code to given directory
var out_folder = args[2] + "/generatedCode";
// Display generated code on console
var show_output = parseInt(args[3]);
if (show_output == 1) {
    console.log("Source code:\n" + sourceCode);
    console.log("---------------------\n");
}
/*
console.log("Cursor 1");
let cursor = tree.walk();
do {
    const c = cursor as g.TypedTreeCursor;
    console.log(c.currentNode.text);
} while(gotoPreorderSucc(cursor));

console.log("\nCursor 2");
cursor = tree.walk();
do {
    const c = cursor as g.TypedTreeCursor;
    console.log(c.currentNode.text);
} while(gotoPreorderSucc_OnlyMajorTypes(cursor));*/
var tree1 = parser.parse("\n% this is a comment\nfunction myfun()\nend\n");
var tree2 = parser.parse("\n% this is a comment\nfunction myfun1()\nend\nfunction myfun2()\nend\n");
var tree3 = parser.parse("\nA = [1,2];\nfunction myfun()\nend\n");
var tree4 = parser.parse("\nA = [1,2];\nB = [1,2];\n");
var tree5 = parser.parse("\n% this is a comment 1\nfunction myfun1()\nend\n% this is a comment 2\n");
/*
console.log(fileIsFunction(tree1));
console.log(fileIsFunction(tree2));
console.log(fileIsFunction(tree3));
console.log(fileIsFunction(tree4));
console.log(fileIsFunction(tree5));*/
/*console.log(findEntryFunction(tree1));
console.log(findEntryFunction(tree2));
console.log(findEntryFunction(tree3));
console.log(findEntryFunction(tree4));
console.log(findEntryFunction(tree5));*/
//console.log("class folders");
//console.log(getClassFolders(search_folder));
console.log("classes");
var classes = (0, helperFunctions_1.getClasses)(search_folder);
console.log(classes);
for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
    var c = classes_1[_i];
    console.log(c.methods);
}
//console.log("non-class files");
//console.log(getNonClassFilesInPath(search_folder));
//# sourceMappingURL=testing.js.map