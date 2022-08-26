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

if (args.length != 4) {
    process.exit(1);
}

// Load the file passed as an argument
const sourceCode = fs.readFileSync(args[0], "utf8");
let tree = parser.parse(sourceCode);

// Read filenames in given directory
const search_folder = args[1];
let classes = getClasses(search_folder);

// Output code to given directory
let out_folder = args[2] + "/generatedCode";

// Display generated code on console
let show_output = parseInt(args[3]);

if (show_output==1) {
    console.log("Source code:\n" + sourceCode);
    console.log("---------------------\n");
}

var files = getNonClassFilesInPath(search_folder);

var var_types: VarType[] = [];
var [custom_functions, file_traversal_order] = identifyCustomFunctions(tree, [], files, args[0], [args[0]]);
console.log("File traversal order");
console.log(file_traversal_order);
console.log("---------------------\n");

for (let file of file_traversal_order) {
    const sourceCode = fs.readFileSync(file, "utf8");
    let tree = parser.parse(sourceCode);
    [var_types, custom_functions] = typeInference(tree, custom_functions, classes);
    
    
    if (file == args[0]) {
        var filename = "main";
    } else {
        var filename:string = path.parse(file).name;
    }
    
    let [generated_code, header] = generateCode(filename, tree, out_folder, custom_functions, classes, var_types);
        
    if (show_output==1) {
        console.log(`---------------------\nInferred types for ${filename}.c:\n`);
        console.log(var_types);
        console.log(`---------------------\nGenerated code for ${filename}.c:\n`);
        console.log(generated_code);
        console.log(`---------------------\nGenerated code for ${filename}.h:\n`);
        console.log(header);
    }
}