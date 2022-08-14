require('source-map-support').install()

import Parser = require("tree-sitter");
import Matlab = require("tree-sitter-matlab");


import { readFileSync, promises as fsPromises } from 'fs';

import * as g from "./generated";

let parser = new Parser() as g.Parser;
parser.setLanguage(Matlab);


const args = process.argv.slice(2);

if (args.length != 1) {
  process.exit(1);
}

// Load the file passed as an argument
const sourceCode = readFileSync(args[0], "utf8");

let tree = parser.parse(sourceCode);



/*let tree = parser.parse(`
    A = [1, 2;
        3, 4];
    B = [A;A];
    C = B*A;
`);*/


// Print matrix functions
// -----------------------------------------------------------------------------
function printMatrixFunctions() {
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {
            case g.SyntaxType.UnaryOperator: {
                let node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "+": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log(`FILLIN(${node.argumentNode.text})`);
                        } else {
                            console.log(`+${node.argumentNode.text}`);
                        }
                        break;
                    }
                    case "-": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log(`FILLIN(${node.argumentNode.text})`);
                        } else {
                            console.log(`-${node.argumentNode.text}`);
                        }
                        break;
                    }
                    case "~": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log(`notM(${node.argumentNode.text})`);
                        } else {
                            console.log(`~${node.argumentNode.text}`);
                        }
                        break;
                    }
                }
                break;
            }
            case g.SyntaxType.TransposeOperator: {
                let node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "'": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log(`ctransposeM(${node.argumentNode.text})`);
                        } else {
                            console.log(`${node.argumentNode.text}'`);
                        }
                        break;
                    }
                    case ".'": {
                        if (inferType(node.argumentNode) == 'matrix') {
                            console.log(`transposeM(${node.argumentNode.text})`);
                        } else {
                            console.log(`${node.argumentNode.text}.'`);
                        }
                        break;
                    }
                }
                break;
            }
            case g.SyntaxType.BinaryOperator: {
                let node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "+": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`addM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} + ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "-": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`minusM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} - ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "*": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`mtimesM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} * ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ".*": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`timesM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} .* ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "/": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`mrdivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} / ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "./": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`rdivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} ./ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "\\": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`mldivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} \\ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ".\\": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`ldivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} .\\ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "^": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`mpowerM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} ^ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ".^": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`powerM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} .^ ${node.rightNode.text}`);
                        }
                        break;
                    }
                }
                break;
            }
            case g.SyntaxType.BooleanOperator: {
                let node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "&": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`andM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} & ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "|": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`orM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} | ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "&&": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`FILLIN(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} && ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "||": {
                        if (inferType(node.leftNode) == 'matrix' || inferType(node.rightNode) == 'matrix') {
                            console.log(`FILLIN(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} || ${node.rightNode.text}`);
                        }
                        break;
                    }
                }
                break;
            }
            case g.SyntaxType.ComparisonOperator: {
                let node = c.currentNode;
                switch (node.operatorNode.type) {
                    case "<": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`ltM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} < ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "<=": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`leM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} <= ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "==": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`eqM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} == ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ">": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`gtM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} > ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ">=": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`geM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} >= ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "~=": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`neqM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} ~= ${node.rightNode.text}`);
                        }
                        break;
                    }
                }
                break;
            }
        }
    } while(gotoPreorderSucc(cursor));
}

// Print function definitions
// -----------------------------------------------------------------------------
let custom_functions = [];
let default_functions = ['func1', 'func2'];

function printFunctionDefinitions() {
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {
            case g.SyntaxType.FunctionDefinition: {
                let node = c.currentNode;
                if (node.isNamed && node.nameNode != null) {
                    custom_functions.push(node.nameNode.text);
                    
                    
                    let param_list = [];
                    for (let param of node.parametersNode.namedChildren) {
                        let param_type = inferType(param);
                        param_list.push(param_type + " " + param.text);
                    }
                    
                    
                    if (node.children[1].type == g.SyntaxType.ReturnValue) {
                        let return_node = node.children[1].firstChild;
                        
                        // If multiple return values, use pointers
                        if (return_node.type == g.SyntaxType.Matrix) {
                            let ptr_declaration = [];
                            for (let return_var of return_node.namedChildren) {
                                ptr_declaration.push("*p_" + return_var.text + " = " + return_var.text)
                                param_list.push(inferType(return_var) + "* p_" + return_var.text)
                            }
                            var ptr_declaration_joined = ptr_declaration.join("\n");
                            
                            var return_type:string = "void";
                            
                        // If single return value, don't use pointers 
                        } else {
                            var return_type:string = inferType(return_node);
                        }
                    }
                    
                    let param_list_joined = "(" + param_list.join(", ") + ")";
                    console.log(return_type + " static " + node.nameNode.text + param_list_joined);
                    console.log(ptr_declaration_joined);
                    console.log(node.bodyNode.text);
                }
                break;
            }
        }
    } while(gotoPreorderSucc(cursor));
}

// Type inference
// -----------------------------------------------------------------------------
type VarType = {
  name: string;
  type: string;
};

const var_types: VarType[] = [];
    
function inferType(node) {
    switch (node.type) {
        
        // Named types
        case g.SyntaxType.Ellipsis: {
            return 'ellipsis';
            break
        }
        case (g.SyntaxType.True || g.SyntaxType.False): {
            return 'bool';
            break
        }
        case g.SyntaxType.Float: {
            return 'float';
            break
        }
        case g.SyntaxType.Integer: {
            return 'int';
            break
        }
        case g.SyntaxType.String: {
            return 'str';
            break
        }
        case g.SyntaxType.Matrix: {
            return 'matrix';
            break
        }
        case g.SyntaxType.Cell: {
            return 'cell';
            break
        }
            
        // Recursive calls to inferTypes
        case g.SyntaxType.ComparisonOperator:
        case g.SyntaxType.BooleanOperator: {
            return 'bool';
            break;
        }
        case g.SyntaxType.TransposeOperator:
        case g.SyntaxType.UnaryOperator: {
            if (node.operatorNode.type == "~") {
                return 'bool';
            }
            else {
                return inferType(node.firstChild);
            }
            
            break;
        }
        case g.SyntaxType.BinaryOperator: {
            
            let left_type = inferType(node.leftNode);
            let right_type = inferType(node.rightNode);
            
            if (left_type == right_type) {
                return left_type;
            } else if (left_type == 'matrix' || right_type == 'matrix') {
                return 'matrix';
            } else if (left_type == 'bool') {
                return right_type;
            } else if (right_type == 'bool') {
                return left_type;
            } else {
                return 'unknown';
            }
            break;
        }
        
        // Identifiers
        case g.SyntaxType.Identifier: {
            let obj = var_types.find(x => x.name === node.text);
            if (obj != null) {
                return obj.type;
            } else {
                return 'unknown'
            }
            break;
        }
        
        // Default
        default: return 'unknown';
    }
}

function typeInference() {
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {
            case g.SyntaxType.Assignment: {
                let node = c.currentNode;

                // If LHS is an identifier, type is same as RHS
                if (node.leftNode.type == g.SyntaxType.Identifier) {
                    const v1: VarType = { name: node.leftNode.text, type: inferType(node.rightNode) };
                    var_types.push(v1);
                    
                // If LHS is subscript, type is array or struct
                } else if (node.leftNode.type == g.SyntaxType.CallOrSubscript) {
                    const v1: VarType = { name: node.leftNode.text, type: 'array_or_struct' };
                    var_types.push(v1);
                }
                
                break;
            }
        }
    } while(gotoPreorderSucc(cursor));
    console.log("Inferred types:");
    console.log(var_types);
}


// Get children names
// -----------------------------------------------------------------------------

function getChildrenNames(node) {
    let result = [];
    //for (let child of node.namedChildren) {
    for (let child of node.children) {
        //if (member.type === g.SyntaxType.Expression) {
            result.push(child.text);
        //}
    }
    return result;
}

// Tree traversal function
// -----------------------------------------------------------------------------

function gotoPreorderSucc(cursor: g.TreeCursor): boolean {
    if (cursor.gotoFirstChild())
        return true;
    while (!cursor.gotoNextSibling()) {
        if (!cursor.gotoParent()) {
            return false;
        }
    }
    return true;
}

// Call functions
// -----------------------------------------------------------------------------

console.log("Source code:\n" + sourceCode);
console.log("---------------------\n")
typeInference();
console.log("---------------------\nMatrix functions:\n")
printMatrixFunctions();
console.log("---------------------\nFunction definitions:\n")
printFunctionDefinitions(); 

