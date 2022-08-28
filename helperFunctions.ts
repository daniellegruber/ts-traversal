//const fs = require("graceful-fs");
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
const path = require("path");
const glob = require("glob");
import { CustomFunction } from "./identifyCustomFunctions";
import { typeInference, inferType, VarType } from "./typeInference";
import * as g from "./generated";
import Parser = require("tree-sitter");
import Matlab = require("tree-sitter-matlab");

let parser = new Parser() as g.Parser;
parser.setLanguage(Matlab);

export function writeToFile(out_folder, filename, generated_code) {
    if (!fs.existsSync(out_folder)){
        fs.mkdirSync(out_folder);
    }
    fs.writeFile(path.join(out_folder, filename), generated_code, err => {
      if (err) {
        console.error(err);
        return
      }
    })
}

export function getFilesInPath(src) {
    const files = glob.sync(src + '/**/*.m');
    return files;
};

export function getNonClassFilesInPath(src) {
    const files = glob.sync(src + '/!(@)**/*.m');
    return files;
};

// https://www.mathworks.com/help/matlab/matlab_oop/organizing-classes-in-folders.html
export function getClassFolders(src) {
    const folders = glob.sync(src + '/@**');
    return folders;
};

type Class = {
    name: string;
    //methods: Array<string>;
    methods: Array<CustomFunction>;
    folder: string;
};

        
export function getClasses(src) {
    let folders = getClassFolders(src);
    let classes: Class[] = [];
    // Loop 1
    for (let folder of folders) {
        let files = getFilesInPath(folder);
        let methods: CustomFunction[] = [];
        for (let file of files) {
            // Placeholder
            const m: CustomFunction = { 
                name: path.parse(file).name, 
                return_type: null,
                ptr_param: null, 
                ptr_declaration: null,
                external: true,
                file: file
            };
            methods.push(m);
        }
        const c: Class = {
            name: folder.substr(folder.indexOf("@") + 1),
            methods: methods,
            folder: folder
        }
        classes.push(c);
    }
    
    // Loop 2
    let classes2: Class[] = [];
    for (let c1 of classes) {
        let files = getFilesInPath(c1.folder);
        let methods = c1.methods;
        for (let file of files) {
            // Update placeholders
            const sourceCode = fs.readFileSync(file, "utf8");
            let tree = parser.parse(sourceCode);
            [, methods] = typeInference(tree, methods, classes);
        }
        const c: Class = {
            name: c1.name,
            methods: methods,
            folder: c1.folder
        }
        classes2.push(c);
    }
    return classes2;
};



