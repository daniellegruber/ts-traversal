//const fs = require("graceful-fs");
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
const path = require("path");
const glob = require("glob");
import { VarType, CustomFunction, Class } from "./customTypes";
import { identifyCustomFunctions } from "./identifyCustomFunctions";
import { typeInference, inferType, findVarScope } from "./typeInference";
import { gotoPreorderSucc } from "./treeTraversal";
import * as g from "./generated";
import Parser = require("tree-sitter");
import Matlab = require("tree-sitter-matlab");

let parser = new Parser() as g.Parser;
parser.setLanguage(Matlab);

export function generateTmpVar(name, tmp_tbl) {
    let obj = tmp_tbl.find(x => x.name === name);
    if (obj != null && obj!= undefined) {
        obj.count = obj.count + 1;
        tmp_tbl = tmp_tbl.filter(function(e) { return e.name !== obj.name });
        tmp_tbl.push(obj);
    } else {
        tmp_tbl.push({
            name: name,
            count: 1
        });
    }
    
    return `${tmp_tbl[tmp_tbl.length - 1].name}${tmp_tbl[tmp_tbl.length - 1].count}`;
}

export function filterByScope(obj, name, node, find_or_filter) {
    if (find_or_filter == 0) {
        return obj.find(x => x.name === name && node.startIndex >= x.scope[0] && node.endIndex <= x.scope[1]);
    } else if (find_or_filter == 1) {
        return obj.filter(x => x.name === name && node.startIndex >= x.scope[0] && node.endIndex <= x.scope[1]);
    }
}

export function pushAliasTbl(lhs, rhs, node, fun_params) {
    let scope = findVarScope(node, fun_params.block_idxs, fun_params.current_code, fun_params.debug);
    let obj = filterByScope(fun_params.var_types, lhs, node, 0);
    if (obj !== null && obj !== undefined) {
        scope = obj.scope;
    }
    fun_params.alias_tbl = fun_params.alias_tbl.filter(function(e) { 
        return (e.name !== lhs) ||
            ((e.name == lhs) && (e.scope[0] !== scope[0]) && (e.scope[1] !== scope[1]))
    });
    fun_params.alias_tbl.push({
        name: lhs,
        tmp_var: rhs,
        scope: scope
    });
    return fun_params.alias_tbl;
}

export function findLastSubscript(node, fun_params) {
    // for a valueNode with text "m" finds all nodes of form m(...) = ...
    // helps with figuring out when to insert writeM(m) code since we want to do that
    // after all values have been assigned to the matrix m
    let matches = [];
    let re = new RegExp(`${node.text}\\(([\\s\\w+\\-\\*]*)\\)(=| =)`);
    let scope = findVarScope(node, fun_params.block_idxs, fun_params.current_code, fun_params.debug);
    let obj = filterByScope(fun_params.var_types, node.text, node, 0);
    if (obj !== null && obj !== undefined) {
        scope = obj.scope;
    }
    
    let cursor = fun_params.tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        let m = c.currentNode.text.match(re);
        if (c.currentNode.type == g.SyntaxType.Assignment) {
            if ((m != null) && (c.currentNode.startIndex >= scope[0]) && (c.currentNode.endIndex <= scope[1])) {
                matches.push(m[0]);
            } 
        }
    } while(gotoPreorderSucc(cursor, fun_params.debug));
    return matches;
}

export function transformNodeByName(var_name, node, alias_tbl) {
    let obj = filterByScope(alias_tbl, var_name, node, 0);
    if (obj != null) {
        return obj.tmp_var;
    } 
    return var_name;
}

export function numel(x) {
    return x.reduce(function(a, b) {return a * b;});
}

export function initVar(var_name, var_val, var_type, node) {
    let expression = '';
    
    if (var_type.ismatrix && var_type.ispointer) {
        expression = `Matrix ** ${var_name}`;
    } else if (var_type.ismatrix) {
        expression = `Matrix * ${var_name}`;
    } else if (var_type.isvector) {
        if (var_type.dim.includes(NaN)) {
            expression = `${var_type.type} ${var_name}[]`;
        } else {
            expression = `${var_type.type} ${var_name}[${numel(var_type.dim)}]`;
        }
    } else if (var_type.ispointer) {
        expression = `${var_type.type} * ${var_name}`;
    } else {
        expression = `${var_type.type} ${var_name}`;
    } 
    if (var_val !== null) {
        expression = expression.concat(`= ${var_val};`);
    } else {
        if (var_type.ismatrix) {
            expression = expression.concat(`= NULL;`);
        } else {
            expression = expression.concat(`;`);
        }
    }
    
    return expression;
}

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
        
export function getClasses(src, debug) {
    let folders = getClassFolders(src);
    let classes: Class[] = [];
    // Loop 1
    for (let folder of folders) {
        let class_name = folder.substr(folder.indexOf("@") + 1);
        let files = getFilesInPath(folder);
        let methods: CustomFunction[] = [];

        for (let file of files) {
            let sourceCode = fs.readFileSync(file, "utf8");
            let tree = parser.parse(sourceCode);
            [methods,] = identifyCustomFunctions(tree, methods, [], file, [], debug);
            
        }
        // Placeholder
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
        let files = getFilesInPath(c1.folder);
        let methods = c1.methods;
        for (let file of files) {
            // Update placeholders
            [, methods] = typeInference(file, methods, classes, debug);
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
            if (node.return_variableNode == undefined && node.namedChildren[0].type == g.SyntaxType.ReturnValue) {
                node.return_variableNode = node.namedChildren[0];
            }
                        
            return node;
            break;
        }
        
        default: {
            return null;
            break;
        }
    }
}