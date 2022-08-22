require('source-map-support').install()
const fs = require("fs");

import { generateCode } from "./generateCode";
import * as g from "./generated";

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
    
generateCode("main", tree, parser, search_folder, out_folder, show_output);