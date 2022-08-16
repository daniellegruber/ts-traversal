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

var generated_code = [];
var main_function = [];

      
var cursor_adjust = false;

// Main
function generateCode() {
    let cursor = tree.walk();
    do {
        if (cursor_adjust) {
            cursor.gotoParent();
        }
        const c = cursor as g.TypedTreeCursor;
        let node = c.currentNode;
        switch (node.type) {
            
            case g.SyntaxType.ExpressionStatement: {
                
                let expression = transformNode(node.firstChild);
                main_function.push(expression);
                cursor_adjust = false;
                break;
            }
        
            case g.SyntaxType.FunctionDefinition: {
                printFunctionDefDeclare(node);
                if (!cursor.gotoNextSibling()) {
                    return;
                }
                cursor_adjust = true;
                break;
            }
            
            
            case g.SyntaxType.BreakStatement: {}
            case g.SyntaxType.CallOrSubscript: {}
            case g.SyntaxType.Cell: {}
            
            case g.SyntaxType.ConditionalExpression: {}
            case g.SyntaxType.ContinueStatement: {}
            case g.SyntaxType.ElseClause: {}
            case g.SyntaxType.ElseifClause: {}
            
            case g.SyntaxType.ForStatement: {}
            case g.SyntaxType.IfStatement: {}
            case g.SyntaxType.Matrix: {}
            case g.SyntaxType.Module: {}
            case g.SyntaxType.Parameters: {}
            case g.SyntaxType.ReturnValue: {}
            case g.SyntaxType.Slice: {}
            
            case g.SyntaxType.WhileStatement: {}
            
        }
    } while(gotoPreorderSucc(cursor));
}


// Main
function transformNode(node) {
    
    switch (node.type) {
        
        case g.SyntaxType.ExpressionStatement: {
            return transformNode(node.firstChild);
            break;
        }
        
        // Assignment
        case g.SyntaxType.Assignment: {
            
            if (node.rightNode.type == g.SyntaxType.Matrix) {
                let children_types = [];
                for (let child of node.rightNode.children) {
                    children_types.push(child.type);
                }
                const [type, ndim, dim] = inferType(node.rightNode);
                if (!children_types.includes(g.SyntaxType.Identifier)) {
                    initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim);
                }
                return;
            } else {
                let expression = [];
                expression.push(transformNode(node.leftNode));
                expression.push("=");
                expression.push(transformNode(node.rightNode));
                return expression.join(" ");
            }
            break;
        }
        
        // Transform matrix operations
        case g.SyntaxType.BinaryOperator:
        case g.SyntaxType.BooleanOperator:
        case g.SyntaxType.ComparisonOperator:
        case g.SyntaxType.TransposeOperator:
        case g.SyntaxType.UnaryOperator: {
            return printMatrixFunctions(node);
            break;
        }
        
        case g.SyntaxType.Block: {
            let expression = [];
            for (let child of node.namedChildren) {
                expression.push(transformNode(child));
            }
            return expression.join("\n");
            break;
        }
        
        // Comments
        // case g.SyntaxType.Comment: {}
        
        // Basic types
        //case g.SyntaxType.Ellipsis: {}
        case g.SyntaxType.String:
        case g.SyntaxType.Identifier:
        case g.SyntaxType.Integer:
        case g.SyntaxType.Float:
        case g.SyntaxType.True: 
        case g.SyntaxType.False: {
            return node.text;
            break;
        }
    }
}

// Initialize variables
// -----------------------------------------------------------------------------
var var_initializations = [];
function initializeVariables() {
    for (let var_type of var_types) {
        if (var_type.type != 'matrix' && var_type.type != 'cell') {
            var_initializations.push(var_type.type + " " + var_type.name + ";");
        }
    }
}


// Initialize matrices
// -----------------------------------------------------------------------------

var matrix_initializations = [];
function initializeMatrix(node, name, ndim, dim) {
        matrix_initializations.push("int ndim = " + ndim + ";");
        matrix_initializations.push("int dim = {" + dim + "};");
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
function printMatrixFunctions(node) {
    switch (node.type) {
        case g.SyntaxType.UnaryOperator: {
            let [type, , ] = inferType(node.argumentNode);
            switch (node.operatorNode.type) {
                case "+": {
                    if (type == 'matrix') {
                        return `FILLIN(${node.argumentNode.text})`;
                    } else {
                        return `+${node.argumentNode.text}`;
                    }
                    break;
                }
                case "-": {
                    if (type == 'matrix') {
                        return `FILLIN(${node.argumentNode.text})`;
                    } else {
                        return `-${node.argumentNode.text}`;
                    }
                    break;
                }
                case "~": {
                    if (type == 'matrix') {
                        return `notM(${node.argumentNode.text})`;
                    } else {
                        return `~${node.argumentNode.text}`;
                    }
                    break;
                }
            }
            break;
        }
        case g.SyntaxType.TransposeOperator: {
            let [type, , ] = inferType(node.argumentNode);
            switch (node.operatorNode.type) {
                case "'": {
                    if (type == 'matrix') {
                        return `ctransposeM(${node.argumentNode.text})`;
                    } else {
                        return `${node.argumentNode.text}'`;
                    }
                    break;
                }
                case ".'": {
                    if (type == 'matrix') {
                        return `transposeM(${node.argumentNode.text})`;
                    } else {
                        return `${node.argumentNode.text}.'`;
                    }
                    break;
                }
            }
            break;
        }
        case g.SyntaxType.BinaryOperator: {
            let [left_type, , ] = inferType(node.leftNode);
            let [right_type, , ] = inferType(node.rightNode);
            switch (node.operatorNode.type) {
                case "+": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `addM(${node.leftNode.text},${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} + ${node.rightNode.text}`;
                    }
                    break;
                }
                case "-": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `minusM(${node.leftNode.text},${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} - ${node.rightNode.text}`;
                    }
                    break;
                }
                case "*": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `mtimesM(${node.leftNode.text},${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} * ${node.rightNode.text}`;
                    }
                    break;
                }
                case ".*": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `timesM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} .* ${node.rightNode.text}`;
                    }
                    break;
                }
                case "/": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `mrdivideM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} / ${node.rightNode.text}`;
                    }
                    break;
                }
                case "./": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `rdivideM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} ./ ${node.rightNode.text}`;
                    }
                    break;
                }
                case "\\": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `mldivideM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} \\ ${node.rightNode.text}`;
                    }
                    break;
                }
                case ".\\": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `ldivideM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} .\\ ${node.rightNode.text}`;
                    }
                    break;
                }
                case "^": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `mpowerM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} ^ ${node.rightNode.text}`;
                    }
                    break;
                }
                case ".^": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `powerM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} .^ ${node.rightNode.text}`;
                    }
                    break;
                }
            }
            break;
        }
        case g.SyntaxType.BooleanOperator: {
            let [left_type, , ] = inferType(node.leftNode);
            let [right_type, , ] = inferType(node.rightNode);
            switch (node.operatorNode.type) {
                case "&": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `andM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} & ${node.rightNode.text}`;
                    }
                    break;
                }
                case "|": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `orM(${node.leftNode.text},${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} | ${node.rightNode.text}`;
                    }
                    break;
                }
                case "&&": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `FILLIN(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} && ${node.rightNode.text}`;
                    }
                    break;
                }
                case "||": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `FILLIN(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} || ${node.rightNode.text}`;
                    }
                    break;
                }
            }
            break;
        }
        case g.SyntaxType.ComparisonOperator: {
            let [left_type, , ] = inferType(node.leftNode);
            let [right_type, , ] = inferType(node.rightNode);
            switch (node.operatorNode.type) {
                case "<": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `ltM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} < ${node.rightNode.text}`;
                    }
                    break;
                }
                case "<=": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `leM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} <= ${node.rightNode.text}`;
                    }
                    break;
                }
                case "==": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `eqM(${node.leftNode.text},${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} == ${node.rightNode.text}`;
                    }
                    break;
                }
                case ">": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `gtM(${node.leftNode.text}, ${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} > ${node.rightNode.text}`;
                    }
                    break;
                }
                case ">=": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `geM(${node.leftNode.text},${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} >= ${node.rightNode.text}`;
                    }
                    break;
                }
                case "~=": {
                    if (left_type == 'matrix' || right_type == 'matrix') {
                        return `neqM(${node.leftNode.text},${node.rightNode.text})`;
                    } else {
                        return `${node.leftNode.text} ~= ${node.rightNode.text}`;
                    }
                    break;
                }
            }
            break;
        }
    }
}

// Print function definitions and declarations
// -----------------------------------------------------------------------------
var custom_functions = [];
var default_functions = ['func1', 'func2'];

var function_definitions = [];
var function_declarations = [];

function printFunctionDefDeclare(node) {
    if (node.isNamed && node.nameNode != null) {
        custom_functions.push(node.nameNode.text);
        
        let param_list = [];
        for (let param of node.parametersNode.namedChildren) {
            let [param_type, ,] = inferType(param);
            param_list.push(param_type + " " + param.text);
        }
        
        if (node.children[1].type == g.SyntaxType.ReturnValue) {
            let return_node = node.children[1].firstChild;
            
            // If multiple return values, use pointers
            if (return_node.type == g.SyntaxType.Matrix) {
                let ptr_declaration = [];
                for (let return_var of return_node.namedChildren) {
                    ptr_declaration.push("*p_" + return_var.text + " = " + return_var.text)
                    var [return_type, ,] = inferType(return_var);
                    param_list.push(return_type + "* p_" + return_var.text)
                }
                var ptr_declaration_joined = ptr_declaration.join("\n");
                
                if (param_list.length == 0) {
                    var param_list_joined = "(void)";
                } else {
                    var param_list_joined = "(" + param_list.join(", ") + ")";
                }
                
                function_declarations.push("void " + node.nameNode.text + param_list_joined + ";");
                function_definitions.push("void " + node.nameNode.text + param_list_joined);
                function_definitions.push("{");
                function_definitions.push(ptr_declaration_joined);
                
            // If single return value, don't use pointers 
            } else {
                if (param_list.length == 0) {
                    var param_list_joined = "(void)";
                } else {
                    var param_list_joined = "(" + param_list.join(", ") + ")";
                }
                
                var [return_type, ,] = inferType(return_node);
                
                function_declarations.push(return_type + " " + node.nameNode.text + param_list_joined + ";");
                function_definitions.push(return_type + " " + node.nameNode.text + param_list_joined);
                function_definitions.push("{");
            }
        }
        
        function_definitions.push(transformNode(node.bodyNode));
        function_definitions.push("}");
    }
    
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
            return ['char',  2, [1, 1]];
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
initializeVariables();
generateCode();

console.log("---------------------\nGenerated code:\n");
generated_code.push(
`//Link
#include <stdio.h>
#include <stdbool.h>`)
generated_code.push("\n//Function declarations")
generated_code.push(function_declarations.join("\n"));
generated_code.push(
`\n//Main function
int main(void)
{
// Initialize variables`);
generated_code.push(var_initializations.join("\n"));
generated_code.push("\n//Initialize matrices")
generated_code.push(matrix_initializations.join("\n"));
generated_code.push("\n" + main_function.join("\n"));
generated_code.push("}\n\n//Subprograms");
generated_code.push(function_definitions.join("\n"));
console.log(generated_code.join("\n"));
