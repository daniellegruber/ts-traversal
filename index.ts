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
console.log("Source code:\n" + sourceCode);

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
                        if (node.argumentNode.type == g.SyntaxType.Matrix) {
                            console.log(`FILLIN(${node.argumentNode.text})`);
                        } else {
                            console.log(`+${node.argumentNode.text}`);
                        }
                        break;
                    }
                    case "-": {
                        if (node.argumentNode.type == g.SyntaxType.Matrix) {
                            console.log(`FILLIN(${node.argumentNode.text})`);
                        } else {
                            console.log(`-${node.argumentNode.text}`);
                        }
                        break;
                    }
                    case "~": {
                        if (node.argumentNode.type == g.SyntaxType.Matrix) {
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
                        if (node.argumentNode.type == g.SyntaxType.Matrix) {
                            console.log(`ctransposeM(${node.argumentNode.text})`);
                        } else {
                            console.log(`${node.argumentNode.text}'`);
                        }
                        break;
                    }
                    case ".'": {
                        if (node.argumentNode.type == g.SyntaxType.Matrix) {
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
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`addM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} + ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "-": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`minusM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} - ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "*": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`mtimesM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} * ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ".*": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`timesM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} .* ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "/": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`mrdivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} / ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "./": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`rdivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} ./ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "\\": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`mldivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} \\ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ".\\": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`ldivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} .\\ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "^": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`mpowerM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} ^ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ".^": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
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
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`andM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} & ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "|": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`orM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} | ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "&&": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
                            console.log(`FILLIN(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} && ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "||": {
                        if (node.leftNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Matrix) {
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
                    node.bodyNode
                    node.parametersNode
                    if (node.return_variableNode.firstChild != null) {
                        let return_node = node.return_variableNode.firstChild;
                        
                        // If multiple return values, use pointers
                        if (return_node.type == g.SyntaxType.Matrix) {
                            for (let member of return_node.namedChildren) {
                                console.log("*p_" + member.text + " = " + member.text);
                            }
                            
                        // If single return value, don't use pointers 
                        } else {}
                    }
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

function typeInference() {
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {
            case g.SyntaxType.Assignment: {
                let node = c.currentNode;
                if (node.leftNode.type == g.SyntaxType.Identifier) {
                    if (node.rightNode.type == g.SyntaxType.Identifier) {
                        let obj = var_types.find(x => x.name === node.rightNode.text);
                        if (obj != null) {
                            const v1: VarType = { name: node.leftNode.text, type: obj.type };
                            var_types.push(v1);
                        } else {
                            const v1: VarType = { name: node.leftNode.text, type: node.rightNode.type };
                            var_types.push(v1);
                        }
                    } else {
                        const v1: VarType = { name: node.leftNode.text, type: node.rightNode.type };
                        var_types.push(v1);
                    }
                } else if (node.leftNode.type == g.SyntaxType.CallOrSubscript) {
                    const v1: VarType = { name: node.leftNode.text, type: 'array_or_struct' };
                    var_types.push(v1);
                }
                //var_types.push(v1);
                break;
            }
        }
    } while(gotoPreorderSucc(cursor));
}


// Get member names
// -----------------------------------------------------------------------------

function getMemberNames(node: g.MatrixNode) {
    let result = [];
    for (let member of node.namedChildren) {
        //if (member.type === g.SyntaxType.Expression) {
            result.push(member.text);
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

// Print matrix functions
// -----------------------------------------------------------------------------

printMatrixFunctions();
printFunctionDefinitions(); 
