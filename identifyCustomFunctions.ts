const fs = require("fs");
import * as g from "./generated";
import { Type } from "./typeInference";
import { 
    gotoPreorderSucc, 
    gotoPreorderSucc_OnlyMajorTypes, 
    gotoPreorderSucc_SkipFunctionDef, 
    fileIsFunction,
    findEntryFunction
} from "./treeTraversal";
import { generateCode } from "./generateCode";

import Parser = require("tree-sitter");
import Matlab = require("tree-sitter-matlab");

let parser = new Parser() as g.Parser;
parser.setLanguage(Matlab);

// Identify function definitions
// -----------------------------------------------------------------------------

export type CustomFunction = {
    name: string;
    return_type:Type;
    ptr_param: string;
    ptr_declaration:string;
    external: boolean;
    file: string;
};


    
export function identifyCustomFunctions(tree, custom_functions, files, filename, file_traversal_order) {

    // Internal functions
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {
            case g.SyntaxType.FunctionDefinition: {
                let node = c.currentNode;
            
                const v1: CustomFunction = { 
                    name: node.nameNode.text, 
                    return_type: null,
                    ptr_param: null, 
                    ptr_declaration: null,
                    external: filename !== file_traversal_order.slice(-1),
                    file: filename
                };
                
                custom_functions.push(v1);
                break;
            }
        }
    } while(gotoPreorderSucc(cursor));
    
    // External functions
    cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {            
            case g.SyntaxType.CallOrSubscript: {
                let node = c.currentNode;
                //let obj1 = findFunction(node, builtin_functions);
                //let obj2 = custom_functions.find(x => x.name === node.valueNode.text);
                let obj = custom_functions.find(x => x.name === node.valueNode.text);
                if (obj == null) {
                    const match = files.find(element => {
                        if (element.includes("/" + node.valueNode.text + ".m")) {
                            return true;
                        }
                    });
                    if (match !== undefined) {
                        // To perform type inference on files from most to least deeply nested
                        file_traversal_order.unshift(match);
                        const functionCode = fs.readFileSync(match, "utf8");
                        let tree2 = parser.parse(functionCode);
                        [custom_functions, file_traversal_order] = identifyCustomFunctions(tree2, custom_functions, files, match, file_traversal_order);
                        
                    }
                } else {
                    if (obj.external) {
                        file_traversal_order = file_traversal_order.filter(function(e) { return e !== obj.file })
                        file_traversal_order.unshift(obj.file);
                    }
                }
                break; 
            }
        }
    } while(gotoPreorderSucc(cursor));
    
    return [custom_functions, file_traversal_order];
}