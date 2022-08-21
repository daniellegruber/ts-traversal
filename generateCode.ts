const fs = require("fs");
import * as g from "./generated";
import { typeInference, inferType, VarType } from "./typeInference";
import { gotoPreorderSucc } from "./gotoPreorderSucc";
import { writeToFile } from "./writeToFile";

// Main
export function generateCode(filename, tree, parser, files, search_folder, out_folder) {
    var function_definitions = [];
    var function_declarations = [];

    var numCellStruct = 0;
    
    var generated_code = [];
    var main_function = [];
    
    var header = [];
    
    var builtin_functions = ['zeros', 'ones'];
          
    var cursor_adjust = false;
    var current_code = "main";
    
    var tmpVarCnt = 0;
    function generateTmpVar() {
        tmpVarCnt += 1;
        return "tmp" + tmpVarCnt;
    }
    
    type typeToMatrixType = {
      type: string;
      matrix_type: number;
    };
    
    const type_to_matrix_type: typeToMatrixType[] = [
        {type: "integer", matrix_type: 0},
        {type: "float", matrix_type: 1},
        {type: "complex", matrix_type: 2},
        {type: "char", matrix_type: 3}
    ];

    
    type operatorMapping = {
      operator: string;
      function: string;
    };
    
    
    const binaryMapping: operatorMapping[] = [
            {operator: '+', function: "addM"},
            {operator: '-', function: "minusM"},
            {operator: '*', function: "mtimesM"},
            {operator: '/', function: "mrdivideM"},
            {operator: '\\', function: "mldivideM"},
            {operator: '^', function: "mpowerM"},
            {operator: '.*', function: "timesM"},
            {operator: './', function: "rdivideM"},
            {operator: '.\\', function: "ldivideM"},
            {operator: '.^', function: "powerM"},
            {operator: '<', function: "ltM"},
            {operator: '<=', function: "leM"},
            {operator: '==', function: "eqM"},
            {operator: '>', function: "gtM"},
            {operator: '>=', function: "geM"},
            {operator: '~=', function: "neqM"},
        ];    
    const unaryMapping: operatorMapping[] = [
            {operator: "+", function: "FILLIN"},
            {operator: "-", function: "FILLIN"},
            {operator: "~", function: "notM"}
        ];
    
    const transposeMapping: operatorMapping[] = [
            {operator: "'", function: "ctransposeM"},
            {operator: ".'", function: "tranposeM"}
        ];
    
    var file_is_function = false;
    
    function main() {
        let cursor = tree.walk();
        do {
            if (cursor_adjust) {
                cursor.gotoParent();
            }
            const c = cursor as g.TypedTreeCursor;
            let node = c.currentNode;
            
            switch (node.type) {
                
            
                case g.SyntaxType.FunctionDefinition: {
                    
                    if (node.previousSibling == null && node.nextSibling == null) {
                        file_is_function = true;
                        
                    } else {
                        file_is_function = false;
                    }
                    
                    printFunctionDefDeclare(node, file_is_function);
                    
                    if (!cursor.gotoNextSibling()) {
                        return;
                    }
                    
                    cursor_adjust = true;
                    current_code = "subprogram";
                    
                    break;
                }
                
    
                case g.SyntaxType.Comment:
                case g.SyntaxType.ExpressionStatement: {
                    let expression = transformNode(node);
                    if (expression != ";") {
                        main_function.push(expression);
                    }
                    cursor_adjust = false;
                    current_code = "main";
                    
                    break;
                }
                case g.SyntaxType.IfStatement:
                case g.SyntaxType.WhileStatement:
                case g.SyntaxType.ForStatement: {
                    
                    main_function.push("\n" + transformNode(node));
                    
                    if (!cursor.gotoNextSibling()) {
                        return;
                    }
                    cursor_adjust = true;
                    current_code = "main";
                    
                    break;
                }
    
            }
        } while(gotoPreorderSucc(cursor));
    }
    
    // Transform node
    function transformNode(node) {
        switch (node.type) {
            
            // Comments
            // TO DO: multiline comments
            case g.SyntaxType.Comment: {
                return node.text.replace("%","//");
                break;
            }
                
            case g.SyntaxType.IfStatement: {
                let expression = [];
                expression.push("if (" + transformNode(node.conditionNode) + ")");
                for (let i=2; i<node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        expression.push(transformNode(node.children[i]));
                    }
                }
                return "\n" + expression.join("\n");
                break;
                } 
            
            case g.SyntaxType.WhileStatement: {
                let expression = [];
                expression.push("while (" + transformNode(node.conditionNode) + ")");
                for (let i=2; i<node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        expression.push(transformNode(node.children[i]));
                    }
                }
                return "\n" + expression.join("\n");
                break;
            }
                
            case g.SyntaxType.ForStatement: {
                let expression1 = [];
                let expression2 = [];
                
                if (node.rightNode.type == g.SyntaxType.Slice) {
                    expression1.push("int " + node.leftNode.text + ";");
                    expression2.push("for (" + node.leftNode.text + " = ");
                    expression2.push(node.rightNode.children[0].text + ";");
                    
                    if (node.rightNode.childCount == 5) {
                        expression2.push(node.leftNode.text + " <= " + node.rightNode.children[4].text + ";");
                        expression2.push(node.leftNode.text + " += " + node.rightNode.children[2].text);
                    } else {
                        expression2.push(node.leftNode.text + " <= " + node.rightNode.children[2].text + ";");
                        expression2.push("++ " + node.leftNode.text);
                    }
                    expression1.push(expression2.join(" ") + ") {");
                    
                    
                } else if (node.rightNode.type == g.SyntaxType.Matrix) {
                    var tmp_var1 = generateTmpVar();
                    var tmp_var2 = generateTmpVar();
                    var [type, ndim, dim, ] = inferType(node.rightNode, var_types);
                    let obj = type_to_matrix_type.find(x => x.type === type);
                    if (obj != null) {
                        expression1.push(initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim, type));
                    }
                    
                
                    expression1.push(`\nint ${tmp_var2};`);
                    expression2.push(`for (${tmp_var2} = 1;`);
                    expression2.push(`${tmp_var2} <= ${node.rightNode.namedChildCount};`);
                    expression2.push(`++${tmp_var2}`);
                    expression1.push(expression2.join(" ") + ") {");
                    expression1.push(`indexM(${tmp_var1}, &${node.leftNode.text}, ${tmp_var1} -> ndim=1, ${tmp_var2});`);
                    
                }
               
                for (let child of node.bodyNode.namedChildren) {
                    expression1.push(transformNode(child));
                }
                
                return "\n" + expression1.join("\n") + "\n}";
                break;
            }
    
            
            case g.SyntaxType.ExpressionStatement: {
                let expression = transformNode(node.firstChild);
                if (![";","\n"].includes(expression.slice(-1))) {
                    return expression + ";";
                } else {
                    return expression;
                }
                break;
            }
            
            // Assignment
            case g.SyntaxType.Assignment: {
                if (node.rightNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Cell) {
    
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                    var [type, ndim, dim, ] = inferType(node.rightNode, var_types);
                    if (type == 'heterogeneous') {
                        let expression1 = [];
                        let expression2 = [];
                        expression1.push(`\nstruct cell${numCellStruct} {`);
                        expression2.push(`cell${numCellStruct} ${node.leftNode.text};`)
                        
                        for (let i=0; i<node.rightNode.namedChildCount; i++) {
                            let child = node.rightNode.namedChildren[i];
                            let [child_type, child_ndim, child_dim, child_ismatrix] = inferType(child, var_types);
                            let numel = dim.reduce(function(a, b) {return a * b;});
                            if (child.type == g.SyntaxType.Matrix) {
                                
                                expression1.push(`Matrix f${i}[${numel}];`);
                                expression2.push(initializeMatrix(node.rightNode, `${node.leftNode.text}.f${i}`, child_ndim, child_dim, type));
          
                            } else if (child_type == 'char') {
                                    expression1.push(`${child_type} f${i}[${numel}];`);
                                    expression2.push(`strcpy(${node.leftNode.text}.f${i}, ${child.text.replace(/'/g, '"')});`);
                            } else {
                                expression1.push(`${child_type} f${i};`);
                                expression2.push(`${node.leftNode.text}.f${i} = ${child.text}`)
                            }
                            
                        }
                        expression1.push("}\n");
                        
                        numCellStruct += 1;
                        expression1.push(expression2.join("\n"));
                        return expression1.join("\n") + "\n";
                    } else {
                        let obj = type_to_matrix_type.find(x => x.type === type);
                        if (obj != null) {
                            return initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim, type);
                        } else {
                            return "";
                        }
                    }
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
                return "{\n" + expression.join("\n") + "\n}";
                break;
            }
            
            case g.SyntaxType.CallOrSubscript: {
                // Is a custom function call
                let obj = custom_functions.find(x => x.name === node.valueNode.text);
                if (obj != null) {
                    let arg_list = [];
                    for (let i=2; i<node.childCount; i++) {
                        if (node.children[i].isNamed) {
                            arg_list.push(transformNode(node.children[i]));
                        }
                    }
                    arg_list.push(obj.ptr_param);
                    let expression = [];
                    expression.push(obj.ptr_declaration);
                    expression.push(obj.name + "(" + arg_list.join(", ") + ")");
                    return expression.join("\n"); 
                
                // Is a builtin function call
                } else if (builtin_functions.includes(node.valueNode.text)) {
                    switch (node.valueNode.text) {
                        case "zeros":
                        case "ones": 
                        case "rand":
                        case "randn": {
                            let args = [];
                            for (let i=2; i<node.childCount; i++) {
                                if (node.children[i].isNamed) {
                                    args.push(transformNode(node.children[i]));
                                }
                            }
                            let dim = "{" + args.join(", ") + "}";
                            let ndim = args.length;
                            var tmp_var = generateTmpVar();
                            if (current_code == "main") {
                                main_function.push(`Matrix * ${tmp_var} = ${node.valueNode.text}M(${ndim}, ${dim});`)
                            } else if (current_code == "subprogram") { 
                                function_definitions.push(`Matrix * ${tmp_var} = onesM(${ndim}, ${dim});`)
                            }
                            return tmp_var;
                            break;
                        }
                    }
                    
                // Is a subscript
                } else {
                    const v1: VarType = { name: node.valueNode.text, type: 'unknown', ndim: 1, dim: [1], ismatrix: true };
                    var_types.push(v1);
                    
                    let index = [];
                    for (let i=1; i<node.namedChildCount; i++) {
                        index.push(transformNode(node.namedChildren[i]));
                    }
                    
                    var tmp_var = generateTmpVar();
                    if (current_code == "main") {
                        main_function.push("double " + tmp_var + ";");
                        main_function.push("indexM(" + node.valueNode.text + ", &" + tmp_var + ", " + index.join(", ") + ");");    
                    } else if (current_code == "subprogram") {
                        function_definitions.push("double " + tmp_var + ";");
                        function_definitions.push("indexM(" + node.valueNode.text + ", &" + tmp_var + ", " + index.join(", ") + ");");    
                    }
                    
                    return tmp_var;
                }
                        
                    break;
                }
            
            case g.SyntaxType.ElseifClause: {
                let expression = [];
                expression.push("else if (" + transformNode(node.conditionNode) + ")");
                expression.push(transformNode(node.consequenceNode));
                return expression.join("\n");
                break;
            } 
            case g.SyntaxType.ElseClause: {
                let expression = [];
                expression.push("else");
                expression.push(transformNode(node.bodyNode));
                return expression.join("\n");
                break;
            }
            
            
            // Basic types
            //case g.SyntaxType.Ellipsis:
            case g.SyntaxType.String:
            case g.SyntaxType.Identifier:
            case g.SyntaxType.Integer:
            case g.SyntaxType.Float:
            case g.SyntaxType.True: 
            case g.SyntaxType.False: {
                return node.text;
                break;
            }
            
            case g.SyntaxType.Complex: {
                
                return node.firstChild.text + "*I";
            }
            
            case g.SyntaxType.Slice: {
                let children_vals = []
                
                for (let i=0; i<node.namedChildCount; i++) {
                    let child = node.namedChildren[i];
                    let [child_type,,,] = inferType(child, var_types);
                    
                    if (child_type == "keyword") {
                        
                        [,ndim,dim,] = inferType(node.parent.valueNode, var_types);
                        let firstNode = node.parent.namedChildren[1];
                        let current_dim = 0;
                        let dummyNode = node;
                        while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                            dummyNode = dummyNode.previousNamedSibling;
                            current_dim += 1;
                        }
                        
                        children_vals.push(dim[current_dim]);
                        
                    } else {
                        children_vals.push(Number(child.text));
                        
                    }
                }
                
                let start = children_vals[0];
                var stop = children_vals[1];
                var step = 1;
                    
                if (children_vals.length == 3) {
                    stop = children_vals[2];
                    step = children_vals[1];
                }
                
                let expression = [];
                for (let i = start; i <= stop; i += step) {
                    expression.push(i);
                }
                return `{${expression.join(", ")}}`;
            }
        }
    }
    
    // Initialize variables
    // -----------------------------------------------------------------------------
    var var_initializations = [];
    function initializeVariables() {
        for (let var_type of var_types) {
            if (var_type.type == 'char' && !var_type.ismatrix) {
                var_initializations.push("char * " + var_type.name + ";");
            }
            else if (!var_type.ismatrix) {
                var_initializations.push(var_type.type + " " + var_type.name + ";");
            }
        }
    }
    
    
    // Initialize matrices
    // -----------------------------------------------------------------------------
    
    function initializeMatrix(node, name, ndim, dim, type) {
        let obj = type_to_matrix_type.find(x => x.type === type);
        
        let expression = [];
        expression.push(`int ndim = ${ndim};`);
        expression.push(`int dim = {${dim}};`);
        expression.push(`Matrix * ${name} = createM(ndim, dim, ${obj.matrix_type});`)
        expression.push(`double ${type} *input = NULL;`);
        
        let numel = dim.reduce(function(a, b) {return a * b;});
    	expression.push(`input = malloc( ${numel}*sizeof(*input));`);
    	
    	var j = 0;
    	for (let i=0; i<node.childCount; i++) {
            if (node.children[i].isNamed) {
                if (obj.matrix_type == 3)
                    expression.push(`input[${j}][] = ${node.children[i].text.replace(/'/g, '"')};`);
                else {
                    expression.push(`input[${j}] = ${node.children[i].text};`);
                }
                j++;
            }
    	}
    	
    	expression.push(`writeM( ${name}, ${numel}, input);`)
    	expression.push("free(input);")
    	return "\n" + expression.join("\n") + "\n";
    }
    
    // Print matrix functions
    // -----------------------------------------------------------------------------
    function printMatrixFunctions(node) {
        var tmp_var = generateTmpVar();
        
        switch (node.type) {
            case g.SyntaxType.UnaryOperator: {
                let obj = unaryMapping.find(x => x.operator === node.operatorNode.type);
                let [type, , , ismatrix] = inferType(node.argumentNode, var_types);
                
                if (ismatrix) {
                    if (current_code == "main") {
                        main_function.push(`Matrix * ${tmp_var} = ${obj.function}(${node.argumentNode.text})`);
                    } else if (current_code == "subprogram") {
                        function_definitions.push(`Matrix * ${tmp_var} = ${obj.function}(${node.argumentNode.text})`);
                    }
                    return tmp_var;
                } else {
                    return `${obj.operator}${transformNode(node.argumentNode)}`;
                }
                
                break;
                        
            }
            case g.SyntaxType.TransposeOperator: {
                let obj = transposeMapping.find(x => x.operator === node.operatorNode.type);
                let [type, , , ismatrix] = inferType(node.argumentNode, var_types);
                
                if (ismatrix) {
                    if (current_code == "main") {
                        main_function.push(`Matrix * ${tmp_var} = ${obj.function}(${node.argumentNode.text})`);
                    } else if (current_code == "subprogram") {
                        function_definitions.push(`Matrix * ${tmp_var} = ${obj.function}(${node.argumentNode.text})`);
                    }
                    return tmp_var;
                } else {
                    return `${transformNode(node.argumentNode)}${obj.operator}`;
                }
                break;
            }
            case g.SyntaxType.ComparisonOperator:
            case g.SyntaxType.BooleanOperator:
            case g.SyntaxType.BinaryOperator: {
                let obj = binaryMapping.find(x => x.operator === node.operatorNode.type);
                let [left_type, , , left_ismatrix] = inferType(node.leftNode, var_types);
                let [right_type, , , right_ismatrix] = inferType(node.rightNode, var_types);
                
                if (left_ismatrix || right_ismatrix) {
                    if (current_code == "main") {
                        main_function.push(`Matrix * ${tmp_var} = ${obj.function}(${node.leftNode.text},${node.rightNode.text})`);
                    } else if (current_code == "subprogram") {
                        function_definitions.push(`Matrix * ${tmp_var} = ${obj.function}(${node.leftNode.text},${node.rightNode.text})`);
                    }
                    return tmp_var;
                } else {
                    return `${transformNode(node.leftNode)} ${obj.operator} ${transformNode(node.rightNode)}`;
                }
                
                break;
            }
        }
    }
    
    // Print function declarations and definitions
    function printFunctionDefDeclare(node, file_is_function) {
        if (node.isNamed && node.nameNode != null) {
            
            var param_list = [];
            for (let param of node.parametersNode.namedChildren) {
                let [param_type, , ,] = inferType(param, var_types);
                param_list.push(param_type + " " + param.text);
            }
            
            if (node.children[1].type == g.SyntaxType.ReturnValue) {
                let return_node = node.children[1].firstChild;
                
                // If multiple return values, use pointers
                if (return_node.type == g.SyntaxType.Matrix) {
                    let ptr_declaration = [];
                    for (let return_var of return_node.namedChildren) {
                        ptr_declaration.push("*p_" + return_var.text + " = " + return_var.text + ";");
                        var [return_type, , ,] = inferType(return_var, var_types);
                        param_list.push(return_type + "* p_" + return_var.text)
                    }
                    var ptr_declaration_joined = ptr_declaration.join("\n");
                    
                    if (param_list.length == 0) {
                        var param_list_joined = "(void)";
                    } else {
                        var param_list_joined = "(" + param_list.join(", ") + ")";
                    }
                    
                    function_declarations.push("void " + node.nameNode.text + param_list_joined + ";");
                    if (file_is_function) {
                        main_function.push("\nvoid " + node.nameNode.text + param_list_joined);
                        main_function.push("{");
                        main_function.push(ptr_declaration_joined);
                    } else {
                        function_definitions.push("\nvoid " + node.nameNode.text + param_list_joined);
                        function_definitions.push("{");
                        function_definitions.push(ptr_declaration_joined);
                    }
                    
                // If single return value, don't use pointers 
                } else {
                    if (param_list.length == 0) {
                        var param_list_joined = "(void)";
                    } else {
                        var param_list_joined = "(" + param_list.join(", ") + ")";
                    }
                    
                    var [return_type, , ,] = inferType(return_node, var_types);
                    if (return_type == "char") {
                        return_type = "char *";
                    }
                    
                    function_declarations.push(return_type + " " + node.nameNode.text + param_list_joined + ";");
                    if (file_is_function) {
                        main_function.push("\n" + return_type + " " + node.nameNode.text + param_list_joined);
                        main_function.push("{");
                    } else {
                        function_definitions.push("\n" + return_type + " " + node.nameNode.text + param_list_joined);
                        function_definitions.push("{");
                    }
                }
            }
            
            for (let child of node.bodyNode.children) {
                if (file_is_function) {
                    main_function.push(transformNode(child));
                } else {
                    function_definitions.push(transformNode(child));
                }
                
            }
            
            if (file_is_function) {
                main_function.push("}");
            } else {
                function_definitions.push("}");
            }
            
        }
        
    }
    
    // Identify function definitions
    // -----------------------------------------------------------------------------
    
    function identifyCustomFunctions() {
        type CustomFunction = {
          name: string;
          ptr_param: string;
          ptr_declaration:string;
          external: boolean;
        };
        var custom_functions: CustomFunction[] = [];
        
        let cursor = tree.walk();
        do {
            const c = cursor as g.TypedTreeCursor;
            switch (c.nodeType) {
                case g.SyntaxType.FunctionDefinition: {
                    let node = c.currentNode;
                    
                    if (node.isNamed && node.nameNode != null) {
                        
                        if (node.children[1].type == g.SyntaxType.ReturnValue) {
                            let return_node = node.children[1].firstChild;
                            
                            // If multiple return values, use pointers
                            if (return_node.type == g.SyntaxType.Matrix) {
                                let ptr_declaration = [];
                                let ptr_param = [];
                                for (let return_var of return_node.namedChildren) {
                                    var [return_type, , ,] = inferType(return_var, var_types);
                                    ptr_declaration.push(return_type + "* p_" + return_var.text)
                                    ptr_param.push("*p_" + return_var.text);
    
                                }
                                
                                const v1: CustomFunction = { name: node.nameNode.text, ptr_param:ptr_param.join(", "), ptr_declaration:ptr_declaration.join("\n"), external: false };
                                custom_functions.push(v1);
      
                            // If single return value, don't use pointers 
                            } else {
                                const v1: CustomFunction = { name: node.nameNode.text, ptr_param:"", ptr_declaration:"", external: false};
                                custom_functions.push(v1);
                                
                            }
                        } else {
                            const v1: CustomFunction = { name: node.nameNode.text, ptr_param:"", ptr_declaration:"", external: false};
                            custom_functions.push(v1);
                            
                        }
     
                    }
                    break;
                }
                case g.SyntaxType.CallOrSubscript: {
                    let node = c.currentNode;
                    if (files.includes(node.valueNode.text + ".m")) {
                        const functionCode = fs.readFileSync(search_folder + "/" + node.valueNode.text + ".m", "utf8");
                        let tree2 = parser.parse(functionCode);
                        generateCode(node.valueNode.text, tree2, parser, files, search_folder, out_folder);
                        
                    }
                }
            }
        } while(gotoPreorderSucc(cursor));
        return custom_functions;
    }
    
    // Generate header files
    function generateHeader() {
        let macro_fun = filename.toUpperCase() + "_H";
        header.push(`#ifndef ${macro_fun}   /* Include guard */`);
        header.push(`#define ${macro_fun}`);
        if (function_definitions.length == 0) {
            header.push("\n//Function declarations")
            header.push(function_declarations.join("\n"));
        }
        header.push("#endif");
        writeToFile(out_folder, filename + ".h", header.join("\n"));
        
        console.log(`---------------------\nGenerated code for ${filename}.h:\n`);
        console.log(header.join("\n"));
    }
    
    // Call functions
    // -----------------------------------------------------------------------------
    console.log(`---------------------\nInferred types for ${filename}.c:\n`);
    
    var var_types = typeInference(tree);
    var custom_functions = identifyCustomFunctions();
    initializeVariables();
    
    main();
    
    console.log(`---------------------\nGenerated code for ${filename}.c:\n`);
    generated_code.push(
`//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>`)
    if (function_definitions.length != 0) {
        generated_code.push("\n//Function declarations")
        generated_code.push(function_declarations.join("\n"));
    }
    if (!file_is_function){
    generated_code.push(
`\n//Main function
int main(void)
{
// Initialize variables`);
    }
    generated_code.push(var_initializations.join("\n"));
    generated_code.push("\n" + main_function.join("\n"));
    if (!file_is_function){
        generated_code.push("}\n");
    }

    if (function_definitions.length != 0) {
        generated_code.push("\n//Subprograms");
        generated_code.push(function_definitions.join("\n"));
    }
    
    console.log(generated_code.join("\n"));
    
    generateHeader();
    
    writeToFile(out_folder, filename + ".c", generated_code.join("\n"));
    
}