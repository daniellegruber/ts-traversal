const fs = require("fs");
import * as g from "./generated";
import { VarType, Type } from "./typeInference";
import { parseFunctionDefNode } from "./helperFunctions";
import { gotoPreorderSucc } from "./treeTraversal";
import { generateCode } from "./generateCode";

import Parser = require("tree-sitter");
import Matlab = require("tree-sitter-matlab");

let parser = new Parser() as g.Parser;
parser.setLanguage(Matlab);

// Identify function definitions
// -----------------------------------------------------------------------------

export type CustomFunction = {
    name: string;
    arg_types: Array<VarType>;
    return_type:Type;
    //return_type: { (args: Array<string>, arg_types: Array<Type>, outs: Array<string>): Type; };
    outs_transform: { (outs: Array<string>): Array<string>; }; 
    ptr_args: { (arg_types: Array<Type>, outs: Array<string>): Array<VarType>; };
    external: boolean;
    file: string;
    def_node: g.SyntaxNode;
    var_types: Array<VarType>;
};
    
export function identifyCustomFunctions(tree, custom_functions, files, filename, file_traversal_order, debug) {

    // Internal functions
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        let node = parseFunctionDefNode(c.currentNode);
        if (node != null) {
            let arg_types = [];
            for (let arg of node.parametersNode.namedChildren) {
                // Placeholder
                arg_types.push({
                    name: arg.text,
                    type: null,
                    ndim: null,
                    dim: null,
                    ismatrix: null,
                    ispointer: null,
                    original_out: false
                });
            }
            const v1: CustomFunction = { 
                name: node.nameNode.text, 
                arg_types: arg_types,
                return_type: null,
                outs_transform: (outs) => outs,
                ptr_args: (arg_types, outs) => null,
                external: filename !== file_traversal_order.slice(-1),
                file: filename,
                def_node: node,
                var_types: null
            };
            custom_functions.push(v1);
        }
    } while(gotoPreorderSucc(cursor, debug));
    
    // External functions
    cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {            
            case g.SyntaxType.CallOrSubscript: {
                let node = c.currentNode;
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
                        [custom_functions, file_traversal_order] = identifyCustomFunctions(tree2, custom_functions, files, match, file_traversal_order, debug);
                        
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
    } while(gotoPreorderSucc(cursor, debug));
    
    return [custom_functions, file_traversal_order];
}