require('source-map-support').install()
//const fs = require("graceful-fs");
var fs = require('fs');
var path = require("path");
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

import { generateCode } from "./generateCode";
import { getNonClassFilesInPath, getClasses } from "./helperFunctions";
import * as g from "./generated";
import { identifyCustomFunctions, CustomFunction } from "./identifyCustomFunctions";
import { typeInference, inferType, VarType, Type } from "./typeInference";

import Parser = require("tree-sitter");
import Matlab = require("tree-sitter-matlab");

let parser = new Parser() as g.Parser;
parser.setLanguage(Matlab);

const args = process.argv.slice(2);

if (args.length != 5) {
    process.exit(1);
}

// Display generated code on console
let show_output = parseInt(args[3]);

// Debug mode
let debug = parseInt(args[4]);

// Load the file passed as an argument
const sourceCode = fs.readFileSync(args[0], "utf8");
let tree = parser.parse(sourceCode);

// Read filenames in given directory
const search_folder = args[1];
let classes = getClasses(search_folder, debug);

// Output code to given directory
//let out_folder = args[2] + "/generatedCode";
let out_folder = args[2] + "/generatedCode/" + path.parse(args[0]).name;
if (!fs.existsSync(out_folder)){
fs.mkdirSync(out_folder);
}
if (!fs.existsSync(`${out_folder}/Makefile`)){
fs.copyFile('Makefile_template', `${out_folder}/Makefile`, (err) => {
if (err) throw err;
});
}

if (show_output==1) {
    console.log("Source code:\n" + sourceCode);
    console.log("---------------------\n");
}

var files = getNonClassFilesInPath(search_folder);
files = files.filter(function(e) { return path.parse(e).name !== path.parse(args[0]).name });

var var_types: VarType[] = [];
var [custom_functions, file_traversal_order] = identifyCustomFunctions(tree, [], files, args[0], [args[0]], debug);
console.log("File traversal order");
console.log(file_traversal_order);
console.log("---------------------\n");

for (let file of file_traversal_order) {
    const sourceCode = fs.readFileSync(file, "utf8");
    let tree = parser.parse(sourceCode);
    let block_idxs = [];
    [var_types, custom_functions, block_idxs] = typeInference(file, custom_functions, classes, debug);
    console.log("VARTYPES");
    console.log(var_types);
    if (file == args[0]) {
        var filename = "main";
    } else {
        var filename:string = path.parse(file).name;
    }

    let [generated_code, header, vt] = generateCode(filename, tree, out_folder, custom_functions, classes, var_types, block_idxs, file, debug);
    var_types = vt;
    
    if (show_output==1) {
        console.log(`---------------------\nCustom functions for ${filename}.c:\n`);
        console.log(custom_functions);
        console.log(`---------------------\nInferred types for ${filename}.c:\n`);
        console.log(var_types);
        console.log(`---------------------\nGenerated code for ${filename}.c:\n`);
        console.log(generated_code);
        console.log(`---------------------\nGenerated code for ${filename}.h:\n`);
        console.log(header);
    }
}