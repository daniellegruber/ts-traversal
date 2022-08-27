"use strict";
exports.__esModule = true;
require('source-map-support').install();
//const fs = require("graceful-fs");
var fs = require('fs');
var path = require("path");
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
var treeTraversal_1 = require("./treeTraversal");
var builtinFunctions_1 = require("./builtinFunctions");
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
var tree1 = parser.parse("\n% this is a comment 1\nxcorr(x,y)\nA = zeros(2,2)\n");
var code = [];
var cursor = tree1.walk();
do {
    var c = cursor;
    if (c.currentNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
        var _a = (0, builtinFunctions_1.parseMatlabFun)(c.currentNode, code), expression = _a[0], code2 = _a[1];
        code2.push(expression);
        console.log(code2);
    }
} while ((0, treeTraversal_1.gotoPreorderSucc)(cursor));
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
/*console.log("classes");
let classes = getClasses(search_folder);
console.log(classes);
for (let c of classes) {
    console.log(c.methods);
}*/
//console.log("non-class files");
//console.log(getNonClassFilesInPath(search_folder));
//# sourceMappingURL=testing.js.map