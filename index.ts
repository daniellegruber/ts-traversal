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

// Initialize matrices
// -----------------------------------------------------------------------------

var matrix_initializations = [];
function initializeMatrix(node, name, ndim, dim) {
            matrix_initializations.push("int ndim = " + ndim);
            matrix_initializations.push("int dim = " + dim);
            matrix_initializations.push("Matrix *" + name + " = createM(ndim, dim, COMPLEX);")
            matrix_initializations.push("double complex *input = NULL;");
            
            let numel = dim.reduce(function(a, b) {return a * b;});
        	matrix_initializations.push("input = malloc(" + numel + "*sizeof(*input));");
        	
        	var j = 0;
        	for (let i=0; i<node.childCount; i++) {
                if (node.children[i].isNamed) {
                    matrix_initializations.push("input[" + j + "] = " + node.children[i].text + ";");
                    j++;
                }
        	}
        	
        	matrix_initializations.push("writeM(" + name + ", " + numel + ", input);")
        	matrix_initializations.push("free(input);")
    }



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
                let [type, ndim, dim] = inferType(node.argumentNode);
                switch (node.operatorNode.type) {
                    case "'": {
                        if (type == 'matrix') {
                            console.log(`ctransposeM(${node.argumentNode.text})`);
                        } else {
                            console.log(`${node.argumentNode.text}'`);
                        }
                        break;
                    }
                    case ".'": {
                        if (type == 'matrix') {
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
                let [left_type, left_ndim, left_dim] = inferType(node.leftNode);
                let [right_type, right_ndim, right_dim] = inferType(node.rightNode);
                switch (node.operatorNode.type) {
                    case "+": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`addM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} + ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "-": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`minusM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} - ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "*": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`mtimesM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} * ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ".*": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`timesM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} .* ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "/": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`mrdivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} / ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "./": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`rdivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} ./ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "\\": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`mldivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} \\ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ".\\": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`ldivideM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} .\\ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "^": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`mpowerM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} ^ ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ".^": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
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
                let [left_type, left_ndim, left_dim] = inferType(node.leftNode);
                let [right_type, right_ndim, right_dim] = inferType(node.rightNode);
                switch (node.operatorNode.type) {
                    case "&": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`andM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} & ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "|": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`orM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} | ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "&&": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`FILLIN(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} && ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "||": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
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
                let [left_type, left_ndim, left_dim] = inferType(node.leftNode);
                let [right_type, right_ndim, right_dim] = inferType(node.rightNode);
                switch (node.operatorNode.type) {
                    case "<": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`ltM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} < ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "<=": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`leM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} <= ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "==": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`eqM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} == ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ">": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`gtM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} > ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case ">=": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
                            console.log(`geM(${node.leftNode.text},${node.rightNode.text})`);
                        } else {
                            console.log(`${node.leftNode.text} >= ${node.rightNode.text}`);
                        }
                        break;
                    }
                    case "~=": {
                        if (left_type == 'matrix' || right_type == 'matrix') {
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

// Print function definitions and declarations
// -----------------------------------------------------------------------------
var custom_functions = [];
var default_functions = ['func1', 'func2'];

function printFunctionDefDeclare() {
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
                    let function_declaration = "static " + return_type + node.nameNode.text + param_list_joined;
                    console.log(function_declaration);
                    console.log(return_type + node.nameNode.text + param_list_joined);
                    console.log(ptr_declaration_joined);
                    console.log(node.bodyNode.text);
                }
                break;
            }
        }
    } while(gotoPreorderSucc(cursor));
}

// Identify calls to custom functions
// -----------------------------------------------------------------------------
function printFunctionCalls() {
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        switch (c.nodeType) {
            case g.SyntaxType.CallOrSubscript: {
                let node = c.currentNode;
                // Is a function call
                if (custom_functions.includes(node.valueNode.text)) {
                
                // Is a subscript
                } else {
                    const v1: VarType = { name: node.valueNode.text, type: 'array_or_struct', ndim: 1, dim: [1] };
                    var_types.push(v1);
                    console.log
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
  ndim: number;
  dim: Array<number>;
};

var var_types: VarType[] = [];
    
function inferType(node) {
    switch (node.type) {
        
        // Named types
        case g.SyntaxType.Ellipsis: {
            return ['ellipsis', 2, [1, 1]];
            break
        }
        case (g.SyntaxType.True || g.SyntaxType.False): {
            return ['bool',  2, [1, 1]];
            break
        }
        case g.SyntaxType.Float: {
            return ['float',  2, [1, 1]];
            break
        }
        case g.SyntaxType.Integer: {
            return ['int',  2, [1, 1]];
            break
        }
        case g.SyntaxType.String: {
            return ['str',  2, [1, 1]];
            break
        }
        case g.SyntaxType.Matrix: {
            
            let row = 0;
            let col = 0;
            let nrows = 0;
            let ncols = 0;
            
            for (let i=0; i<node.childCount; i++) {
                if (node.children[i].type === ";") {
                    row += 1;
                    col = 0;
                }
                else if (node.children[i].isNamed) {
                    
                    if (row == 0) {
                        const [type, ndim, dim] = inferType(node.children[i]);
                        ncols += dim[1];
                    }
                    if (col == 0) {
                        const [type, ndim, dim] = inferType(node.children[i]);
                        nrows += dim[0];
                    }
                    col += 1;
                }
            }

            return ['matrix', 2, [nrows, ncols]];
            break
        }
        case g.SyntaxType.Cell: {
            
            let row = 0;
            let col = 0;
            let nrows = 0;
            let ncols = 0;
            
            for (let i=0; i<node.childCount; i++) {
                if (node.children[i].type === ";") {
                    row += 1;
                    col = 0;
                }
                else if (node.children[i].isNamed) {
                    
                    if (row == 0) {
                        const [type, ndim, dim] = inferType(node.children[i]);
                        ncols += dim[1];
                    }
                    if (col == 0) {
                        const [type, ndim, dim] = inferType(node.children[i]);
                        nrows += dim[0];
                    }
                    col += 1;
                }
            }
            
            return ['cell', 2, [nrows, ncols]];
            break
        }
            
        // Recursive calls to inferTypes
        case g.SyntaxType.ComparisonOperator:
        case g.SyntaxType.BooleanOperator: {
            return ['bool', 2, [1, 1]];
            break;
        }
        case g.SyntaxType.TransposeOperator: {
            const [type, ndim, dim] = inferType(node.firstChild);
            return [type, 2, [dim[1], dim[0]]];
            break;
        }
        case g.SyntaxType.UnaryOperator: {
            if (node.operatorNode.type == "~") {
                return ['bool', 2, [1, 1]];
            }
            else {
                return inferType(node.firstChild);
            }
            
            break;
        }
        case g.SyntaxType.BinaryOperator: {
            
            let [left_type, left_ndim, left_dim] = inferType(node.leftNode);
            let [right_type, right_ndim, right_dim] = inferType(node.rightNode);
            
            switch (node.operatorNode.type) {
                case "+": 
                case "-": 
                case ".*": 
                case "./": 
                case ".\\":
                case "^":
                case ".^": {
                    var ndim = left_ndim;
                    var dim = left_dim;
                    break;
                }
                case "*": 
                case "/":
                case "\\": {
                    var ndim = left_ndim;
                    var dim = left_dim;
                    dim[1] = right_dim[1];
                    break;
                }
            }
            
            if (left_type == right_type) {
                return [left_type, ndim, dim];
            } else if (left_type == 'matrix' || right_type == 'matrix') {
                return ['matrix', ndim, dim];
            } else if (left_type == 'bool') {
                return [right_type, ndim, dim];
            } else if (right_type == 'bool') {
                return [left_type, ndim, dim];
            } else {
                return ['unknown', 2, [1, 1]];
            }
            break;
        }
        
        // Identifiers
        case g.SyntaxType.Identifier: {
            let obj = var_types.find(x => x.name === node.text);
            if (obj != null) {
                return [obj.type, obj.ndim, obj.dim];
            } else {
                return ['unknown', 2, [1, 1]];
            }
            break;
        }
        
        // Default
        default: return ['unknown', 2, [1, 1]];
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
                    const [type, ndim, dim] = inferType(node.rightNode);
                    const v1: VarType = { name: node.leftNode.text, type: type, ndim: ndim, dim: dim };
                    var_types.push(v1);
                    
                    if (node.rightNode.type == g.SyntaxType.Matrix) {
                        let children_types = [];
                        for (let child of node.rightNode.children) {
                            children_types.push(child.type);
                        }
                        if (!children_types.includes(g.SyntaxType.Identifier)) {
                            initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim);
                        }
                    }
                    
                // If LHS is subscript, type is array or struct
                } else if (node.leftNode.type == g.SyntaxType.CallOrSubscript) {
                    const v1: VarType = { name: node.leftNode.text, type: 'unknown', ndim: 2, dim: [1,1] };
                    var_types.push(v1);
                }
                
                
                break;
            }
        }
    } while(gotoPreorderSucc(cursor));
    console.log("Inferred types:");
    console.log(var_types);
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
console.log("---------------------\n");
typeInference();
console.log("---------------------\nInitialize matrices:\n");
console.log(matrix_initializations.join("\n"));
console.log("---------------------\nMatrix functions:\n");
printMatrixFunctions();
console.log("---------------------\nFunction definitions:\n");
printFunctionDefDeclare(); 

