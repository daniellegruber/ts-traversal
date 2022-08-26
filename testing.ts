require('source-map-support').install()
//const fs = require("graceful-fs");
var fs = require('fs');
var path = require("path");
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);


import { getFilesInPath } from "./helperFunctions";
import * as g from "./generated";
import { 
    gotoPreorderSucc, 
    gotoPreorderSucc_OnlyMajorTypes, 
    gotoPreorderSucc_SkipFunctionDef, 
    fileIsFunction,
    findEntryFunction
} from "./treeTraversal";

import { 
    getClassFolders,
    getClasses,
    getNonClassFilesInPath
} from "./helperFunctions";

import Parser = require("tree-sitter");
import Matlab = require("tree-sitter-matlab");

let parser = new Parser() as g.Parser;
parser.setLanguage(Matlab);

const args = process.argv.slice(2);

if (args.length != 4) {
    process.exit(1);
}

// Load the file passed as an argument
const sourceCode = fs.readFileSync(args[0], "utf8");
let tree = parser.parse(sourceCode);

// Read filenames in given directory
const search_folder = args[1];
//const files = fs.readdirSync(search_folder);

// Output code to given directory
let out_folder = args[2] + "/generatedCode";

// Display generated code on console
let show_output = parseInt(args[3]);

if (show_output==1) {
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

let tree1 = parser.parse(`
% this is a comment
function myfun()
end
`);

let tree2 = parser.parse(`
% this is a comment
function myfun1()
end
function myfun2()
end
`);

let tree3 = parser.parse(`
A = [1,2];
function myfun()
end
`);

let tree4 = parser.parse(`
A = [1,2];
B = [1,2];
`);

let tree5 = parser.parse(`
% this is a comment 1
function myfun1()
end
% this is a comment 2
`);
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
let classes = getClasses(search_folder);
console.log(classes);
for (let c of classes) {
    console.log(c.methods);
}
//console.log("non-class files");
//console.log(getNonClassFilesInPath(search_folder));