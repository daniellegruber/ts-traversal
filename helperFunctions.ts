//const fs = require("graceful-fs");
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
const path = require("path");
const glob = require("glob");
import { identifyCustomFunctions, CustomFunction } from "./identifyCustomFunctions";
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
    const files1 = glob.sync(src + '/!(@)**/*.m');
    const files2 = glob.sync(src + '/*.m');
    return files1.concat(files2);
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
        let class_name = folder.substr(folder.indexOf("@") + 1);
        let files = getFilesInPath(folder);
        //let class_file = files.find(x => x.includes(`${class_name}.m`));
        //const sourceCode = fs.readFileSync(class_file, "utf8");
        //let tree = parser.parse(sourceCode);
        //let [methods, file_traversal_order] = identifyCustomFunctions(tree, [], [], class_file, [class_file]);
        let methods: CustomFunction[] = [];
        //console.log("ALOHA");
        for (let file of files) {
            let sourceCode = fs.readFileSync(file, "utf8");
            let tree = parser.parse(sourceCode);
            [methods,] = identifyCustomFunctions(tree, methods, [], file, []);
            // Placeholder
            /*const m: CustomFunction = { 
                name: path.parse(file).name, 
                arg_types: null,
                return_type: null,
                ptr_param: null, 
                ptr_declaration: null,
                external: true,
                file: file,
                def_node: null
            };*/
            //console.log(file);
            //console.log(m);
            //methods = methods.concat(m);
        }
        //console.log(methods);
        const c: Class = {
            name: class_name,
            methods: methods,
            folder: folder
        }
        classes.push(c);
    }
    
    // Loop 2
    let classes2: Class[] = [];
    for (let c1 of classes) {
        console.log(c1.name);
        let files = getFilesInPath(c1.folder);
        let methods = c1.methods;
        for (let file of files) {
            // Update placeholders
            [, methods] = typeInference(file, methods, classes);
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


export function parseFunctionDefNode(node) {
    switch (node.type) {
        case g.SyntaxType.ERROR: {
            let types = [];
            for (let child of node.namedChildren) {
                types.push(child.type);
            }
            if (types.includes(g.SyntaxType.Parameters)) {
                let param_idx = types.indexOf(g.SyntaxType.Parameters);
                var parametersNode = node.namedChildren[param_idx];
                var nameNode = node.namedChildren[param_idx - 1];
                var bodyNode = node.namedChildren[param_idx + 1];
                var return_variableNode = undefined;
                let return_idx = types.indexOf(g.SyntaxType.ReturnValue);
                if (return_idx != null && return_idx != undefined) {
                    return_variableNode = node.namedChildren[return_idx];
                }
                //return [return_variableNode, nameNode, parametersNode, bodyNode];
                return {
                    type: g.SyntaxType.FunctionDefinition,
                    return_variableNode: return_variableNode,
                    nameNode: nameNode,
                    parametersNode: parametersNode,
                    bodyNode: bodyNode
                };
            } else {
                return null;
            }
            break;
        }
        case g.SyntaxType.FunctionDefinition: {
            //return [node.return_variableNode, node.nameNode, node.parametersNode, node.bodyNode];
            return node;
            break;
        }
        
        default: {
            return null;
            break;
        }
    }
}