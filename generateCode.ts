const fs = require("fs");
var path = require("path");
import * as g from "./generated";
import { typeInference, inferType, VarType, Type } from "./typeInference";
import { 
    gotoPreorderSucc, 
    gotoPreorderSucc_OnlyMajorTypes, 
    gotoPreorderSucc_SkipFunctionDef, 
    fileIsFunction,
    findEntryFunction
} from "./treeTraversal";
import { writeToFile } from "./helperFunctions";
import { operatorMapping, builtin_functions } from "./builtinFunctions";
let builtin_funs = builtin_functions;
// Main
export function generateCode(filename, tree, out_folder, custom_functions, classes, var_types) {
    
    function pushToMain(expression) {
        if (current_code == "main") {
            main_function.push(expression);
        } else if (current_code == "subprogram") {
            function_definitions.push(expression)
        }
    }
        
    var function_definitions = [];
    var function_declarations = [];

    var numCellStruct = 0;
    
    var generated_code = [];
    var main_function = [];
    
    var header = [];
    
    var link = [`//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>`];
          
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
        {type: "int", matrix_type: 0},
        {type: "float", matrix_type: 1},
        {type: "complex", matrix_type: 2},
        {type: "char", matrix_type: 3}
    ];
    
    var file_is_function = false;
    
    function main() {
        let cursor = tree.walk();
        do {
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
                    
                    current_code = "subprogram";
                    
                    break;
                }
                
    
                case g.SyntaxType.Comment:
                case g.SyntaxType.ExpressionStatement: {
                    let expression = transformNode(node);
                    if (expression != ";") {
                        main_function.push(expression);
                    }

                    current_code = "main";
                    
                    break;
                }
                case g.SyntaxType.IfStatement:
                case g.SyntaxType.WhileStatement:
                case g.SyntaxType.ForStatement: {
                    
                    main_function.push("\n" + transformNode(node));

                    current_code = "main";
                    
                    break;
                }
    
            }
        } while(gotoPreorderSucc_OnlyMajorTypes(cursor));
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
                    var [type, ndim, dim, ] = inferType(node.rightNode, var_types, custom_functions, classes);
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
                if (expression != null) {
                    if (![";","\n"].includes(expression.slice(-1))) {
                        return expression + ";";
                    } else {
                        return expression;
                    }
                } else {
                    return null;
                }
                break;
            }
            
            case g.SyntaxType.ParenthesizedExpression: {
                return "(" + transformNode(node.firstNamedChild) + ")";
                break;
            }
            
            // Assignment
            case g.SyntaxType.Assignment: {
                let [args, arg_types, outs, is_subscript] = parseFunctionCallNode(node);
                var [type, ndim, dim, ismatrix, ispointer] = inferType(node.rightNode, var_types, custom_functions, classes);
                var init_flag = false;
                if (node.rightNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Cell) {
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                
                    if (type == 'heterogeneous') {
                        let expression1 = [];
                        let expression2 = [];
                        expression1.push(`\nstruct cell${numCellStruct} {`);
                        expression2.push(`cell${numCellStruct} ${outs[0]};`)
                        
                        for (let i=0; i<node.rightNode.namedChildCount; i++) {
                            let child = node.rightNode.namedChildren[i];
                            let [child_type, child_ndim, child_dim, child_ismatrix] = inferType(child, var_types, custom_functions, classes);
                            let numel = dim.reduce(function(a, b) {return a * b;});
                            if (child.type == g.SyntaxType.Matrix) {
                                
                                expression1.push(`Matrix f${i}[${numel}];`);
                                expression2.push(initializeMatrix(node.rightNode, `${outs[0]}.f${i}`, child_ndim, child_dim, type));
          
                            } else if (child_type == 'char') {
                                    expression1.push(`${child_type} f${i}[${numel}];`);
                                    expression2.push(`strcpy(${outs[0]}.f${i}, ${child.text.replace(/'/g, '"')});`);
                            } else {
                                expression1.push(`${child_type} f${i};`);
                                expression2.push(`${outs[0]}.f${i} = ${child.text};`)
                            }
                            
                        }
                        expression1.push("}\n");
                        
                        numCellStruct += 1;
                        expression1.push(expression2.join("\n"));
                        pushToMain(expression1.join("\n") + "\n");
                       
                    } else {
                        let obj = type_to_matrix_type.find(x => x.type === type);
                        if (obj != null) {
                            pushToMain(initializeMatrix(node.rightNode, outs[0], ndim, dim, type));
                        }
                        
                    }
                // TO DO: what do when RHS is class or function call
                var lhs = null;
                } else if (node.rightNode.type == g.SyntaxType.CallOrSubscript) {
                    let obj = classes.find(x => x.name === node.rightNode.valueNode.text);
                    // Is a class
                    if (obj != null) {
                        var rhs:string = obj.name;
                    } else {
                        let obj1 = custom_functions.find(x => x.name === node.rightNode.valueNode.text);
                        let obj2 = builtin_funs.find(x => x.fun_matlab === node.rightNode.valueNode.text);
                        if (obj1 != null && obj1 != undefined) {
                            if (obj1.return_type != null) {
                                lhs = node.leftNode.namedChildren[0].text;
                            }
                        } else if (obj2 != null && obj2 != undefined) {
                            //let [args, arg_types, outs, is_subscript] = parseFunctionCallNode(node);
                            let return_type = obj2.return_type(args, arg_types, outs);
                            let fun_c = obj2.fun_c(arg_types, outs);
                            if (obj2.args_transform(args, arg_types, outs) != null) {
                                args = obj2.args_transform(args, arg_types, outs);
                            }
                            lhs = obj2.outs_transform(outs);
                        }
                    }
                    var rhs:string = transformNode(node.rightNode);
                    init_flag = true;
                } else {
                    var rhs:string = transformNode(node.rightNode);
                    init_flag = true;
                }

                if (lhs == null) {
                    pushToMain(`${rhs};`);    
                } else if (init_flag) {
                    let var_type = var_types.find(x => x.name === lhs);
                    if (var_type != null && var_type != undefined) {
                        
                        if (var_type.initialized || (var_type.type != type)) {
                            pushToMain(`${lhs} = ${rhs}`);
                        } else {
                            if (ismatrix) {
                                pushToMain(`Matrix * ${lhs} = ${rhs};`);
                            } else if (ispointer) {
                                pushToMain(`${type} * ${lhs} = ${rhs};`);
                            } else {
                                pushToMain(`${type} ${lhs} = ${rhs};`);
                            }
                            var_types = var_types.filter(function(e) { return e.name !== var_type.name });
                            var_type.initialized = true;
                            var_types.push(var_type);
                        }
                    } else {
                        if (ismatrix) {
                            pushToMain(`Matrix * ${lhs} = ${rhs};`);
                        } else if (ispointer) {
                            pushToMain(`${type} * ${lhs} = ${rhs};`);
                        } else {
                            pushToMain(`${type} ${lhs} = ${rhs};`);
                        }
                        var_types.push({
                            name: lhs,
                            type: type,
                            ndim: ndim,
                            dim: dim,
                            ismatrix: ismatrix,
                            initialized: true
                        });
                    }
                }

                if (node.leftNode.Type == g.SyntaxType.Matrix) {
                    for (let j = 0; j < node.leftNode.namedChildCount; j++) {
                        let child = node.leftNode.namedChildren[j];
                        if (is_subscript[j]) {
                            let idx = getSubscriptIdx(child);
                            pushToMain(`void *data = getdataM(${child.valueNode.text});`)
                            let [,,,ismatrix,] = inferType(outs[j], var_types, custom_functions, classes);
                            if (ismatrix) {
                                pushToMain(`void *data2 = getdataM(${outs[j]});`)
                                for (let i = 0; i < idx.length; i++) {
                                    pushToMain(`memcpy(&data[${idx[i]}], data2[${i}]);`); 
                                }
                            } else {
                                for (let i = 0; i < idx.length; i++) {
                                    pushToMain(`memcpy(&data[${idx[i]}], ${outs[j]}[${i}]);`); 
                                }
                            }
                            pushToMain(`${child.valueNode.text}.data = data;`);
                        }
                    }
                } else {
                    if (is_subscript[0]) {
                        let idx = getSubscriptIdx(node.leftNode);
                        pushToMain(`void *data = getdataM(${node.leftNode.valueNode.text});`)
                        let [,,,ismatrix,] = inferType(outs[0], var_types, custom_functions, classes);
                        if (ismatrix) {
                            pushToMain(`void *data2 = getdataM(${outs[0]});`)
                            for (let i = 0; i < idx.length; i++) {
                                pushToMain(`memcpy(&data[${idx[i]}], data2[${i}]);`); 
                            }
                        } else {
                            for (let i = 0; i < idx.length; i++) {
                                pushToMain(`memcpy(&data[${idx[i]}], ${outs[0]}[${i}]);`); 
                            }
                        }
                        pushToMain(`${node.leftNode.valueNode.text}.data = data;`);
                    }
                }
                return null; 
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
            
            // TO DO: FIX THIS
            case g.SyntaxType.CellSubscript: {
                let index = [];
                for (let i=1; i<node.namedChildCount; i++) {
                    index.push(transformNode(node.namedChildren[i]));
                }
                
                var tmp_var = generateTmpVar();
                pushToMain("double " + tmp_var + ";");
                pushToMain("indexM(" + node.valueNode.text + ", &" + tmp_var + ", " + index.join(", ") + ");");
                
                return tmp_var;
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
                    
                    pushToMain(obj.ptr_declaration);
                    
                    if (obj.ptr_param !== null) {
                        arg_list.push(obj.ptr_param);
                    }
                    
                    
                    if (path.parse(obj.file).name !== filename) {
                        link.push(`#include <${path.parse(obj.file).name}.h>`);
                    }
                    
                    return obj.name + "(" + arg_list.join(", ") + ")";
                    
                } else {
                    // Is a builtin function call
                    let obj = builtin_funs.find(x => x.fun_matlab === node.valueNode.text);
                    
                    if (obj != null) {
                        let [args, arg_types, outs, is_subscript] = parseFunctionCallNode(node);
                        let return_type = obj.return_type(args, arg_types, outs);
                        let fun_c = obj.fun_c(arg_types, outs);
                        var tmp_var = generateTmpVar();
                        args = obj.args_transform(args, arg_types, outs);
                        
                        
                        let n_args = node.namedChildCount - 1;
                        if (n_args < obj.n_req_args) {
                            args = args.concat(obj.opt_arg_defaults.slice(0, obj.n_req_args - n_args));
                        }
                        
                        let ptr_args = obj.ptr_args(arg_types, outs);
                        if (ptr_args != null) {
                            let ptr_declaration = [];
                            for (let i = 0; i < ptr_args.length; i++) {
                                args.push(ptr_args[i].name);
                                ptr_declaration.push(`${ptr_args[i].type} * restrict ${ptr_args[i].name};`)
                                var_types.push(ptr_args[i]);
                            }
                            pushToMain(ptr_declaration.join("\n"));
                            
                        }
                        
                        return `${fun_c}(${args.join(", ")})`;
                        
                    // Is a subscript
                    } else {
                        
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
            case g.SyntaxType.Attribute:
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
                let expression = slice2list(node);
                return `{${expression.join(", ")}}`;
            }
        }
    }
    
    // Return args, arg_types, outs from function
    function parseFunctionCallNode(node) {
        if (node.parent.type == g.SyntaxType.Assignment) {
            return parseFunctionCallNode(node.parent);
        } else {
            switch (node.type) {
                case g.SyntaxType.Assignment: {
                    var left_node = node.leftNode;
                    var right_node = node.rightNode;
                    break;
                }
                default: {
                    var left_node = null;
                    var right_node = node;
                    break;
                }
            }
            let args = [];
            let arg_types: Type[] = [];
            switch (right_node.type) {
                case g.SyntaxType.CallOrSubscript: {
                    for (let i = 1; i < right_node.namedChildCount; i++) {
                        if (transformNode(right_node.namedChildren[i]) != undefined) {
                            args.push(transformNode(right_node.namedChildren[i]));   
                        } else {
                            args.push(right_node.namedChildren[i].text);
                        }
                        let [type, ndim, dim, ismatrix, ispointer] = inferType(right_node.namedChildren[i], var_types, custom_functions, classes);
                        arg_types.push({
                            type: type, 
                            ndim: ndim, 
                            dim: dim, 
                            ismatrix: ismatrix, 
                            ispointer: ispointer
                        });
                    }
                    break;
                }
                case g.SyntaxType.ComparisonOperator:
                case g.SyntaxType.BooleanOperator:
                case g.SyntaxType.BinaryOperator: {
                    let [l_type, l_ndim, l_dim, l_ismatrix, l_ispointer] = inferType(right_node.leftNode, var_types, custom_functions, classes);
                    let [r_type, r_ndim, r_dim, r_ismatrix, r_ispointer] = inferType(right_node.rightNode, var_types, custom_functions, classes);
                    arg_types.push({
                        type: l_type, 
                        ndim: l_ndim, 
                        dim: l_dim, 
                        ismatrix: l_ismatrix, 
                        ispointer: l_ispointer
                    });
                    arg_types.push({
                        type: r_type, 
                        ndim: r_ndim, 
                        dim: r_dim, 
                        ismatrix: r_ismatrix, 
                        ispointer: r_ispointer
                    });
                    if (transformNode(right_node.leftNode) != undefined) {
                        args.push(transformNode(right_node.leftNode));   
                    } else {
                        args.push(right_node.leftNode.text);
                    }
                    if (transformNode(right_node.rightNode) != undefined) {
                        args.push(transformNode(right_node.rightNode));   
                    } else {
                        args.push(right_node.rightNode.text);
                    }
                    break;
                }
                case g.SyntaxType.UnaryOperator:
                case g.SyntaxType.TransposeOperator: {
                    let [type, ndim, dim, ismatrix, ispointer] = inferType(right_node.argumentNode, var_types, custom_functions, classes);
                    arg_types.push({
                        type: type, 
                        ndim: ndim, 
                        dim: dim, 
                        ismatrix: ismatrix, 
                        ispointer: ispointer
                    });
                    if (transformNode(right_node.argumentNode) != undefined) {
                        args.push(transformNode(right_node.argumentNode));   
                    } else {
                        args.push(right_node.argumentNode.text);
                    }
                    break;
                }
            }
            
            let outs = [];
            let is_subscript = [];
            if (left_node == null) {
            } else if (left_node.type == g.SyntaxType.Matrix) {
                for (let child of left_node.namedChildren) {
                    if (child.type == g.SyntaxType.CallOrSubscript || child.type == g.SyntaxType.CellSubscript) {
                        outs.push(generateTmpVar());
                        is_subscript.push(true);
                    } else if (transformNode(child) != undefined) {
                        outs.push(transformNode(child));   
                    } else {
                        outs.push(child.text);
                    }
                }
            } else {
                if (left_node.type == g.SyntaxType.CallOrSubscript || left_node.type == g.SyntaxType.CellSubscript) {
                    outs.push(generateTmpVar());
                    is_subscript.push(true);
                } else if (transformNode(left_node) != undefined) {
                    outs.push(transformNode(left_node));   
                } else {
                    outs.push(left_node.text);
                }
            }
                    
            return [args, arg_types, outs, is_subscript];
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
        let [args, arg_types, outs, is_subscript] = parseFunctionCallNode(node);
        let obj = operatorMapping.find(x => x.fun_matlab === node.operatorNode.type );
        let return_type = obj.return_type(args, arg_types, outs);
        let fun_c = obj.fun_c(arg_types, outs);
        if (obj.args_transform(args, arg_types, outs) != null) {
            args = obj.args_transform(args, arg_types, outs);
        }
        if (fun_c == null) {
            switch (node.type) {
                case g.SyntaxType.UnaryOperator: {
                    return `${node.operatorNode.type}${transformNode(node.argumentNode)}`;
                    break;
                }
                case g.SyntaxType.TransposeOperator: {
                    return `${transformNode(node.argumentNode)}${node.operatorNode.type}`;
                    break;
                }
                case g.SyntaxType.ComparisonOperator:
                case g.SyntaxType.BooleanOperator:
                case g.SyntaxType.BinaryOperator: {
                    return `${transformNode(node.leftNode)} ${node.operatorNode.type} ${transformNode(node.rightNode)}`;
                    break;
                }
            }
        } else {
            if (return_type.ismatrix) {
                var init_type = `Matrix *`;
            } else if (return_type.ispointer) {
                var init_type = `${return_type.type} *`;
            } else {
                var init_type = `${return_type.type}`;
            }
            switch (node.type) {
                case g.SyntaxType.UnaryOperator: {
                    pushToMain(`${return_type} ${tmp_var} = ${fun_c}(${args.join(", ")})`);
                    break;
                }
                case g.SyntaxType.TransposeOperator: {
                    pushToMain(`${init_type} ${tmp_var} = ${fun_c}(${args.join(", ")})`);
                    break;
                }
                case g.SyntaxType.ComparisonOperator:
                case g.SyntaxType.BooleanOperator:
                case g.SyntaxType.BinaryOperator: {
                    pushToMain(`${init_type} ${tmp_var} = ${fun_c}(${args.join(", ")})`);
                    break;
                }
            }
            return tmp_var;
        }
    }
    
    // Print function declarations and definitions
    function printFunctionDefDeclare(node, file_is_function) {
        if (node.isNamed && node.nameNode != null) {
            var param_list = [];
            for (let param of node.parametersNode.namedChildren) {
                let [param_type,,,,] = inferType(param, var_types, custom_functions, classes);
                param_list.push(`${param_type} ${param.text}`);
            }
            
            if (node.children[1].type == g.SyntaxType.ReturnValue) {
                let return_node = node.children[1].firstChild;
                
                // If multiple return values, use pointers
                if (return_node.type == g.SyntaxType.Matrix) {
                    let ptr_declaration = [];
                    for (let return_var of return_node.namedChildren) {
                        ptr_declaration.push(`*p_${return_var.text} = ${return_var.text};`);
                        var [return_type,,,,] = inferType(return_var, var_types, custom_functions, classes);
                        param_list.push(`${return_type}* p_${return_var.text}`)
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
                    
                    var [return_type,,,,ispointer] = inferType(return_node, var_types, custom_functions, classes);
                    if (ispointer) {
                        return_type = `${return_type} *`;
                    }
                    
                    function_declarations.push(`${return_type} ${node.nameNode.text}${param_list_joined};`);
                    if (file_is_function) {
                        main_function.push(`\n${return_type} ${node.nameNode.text}${param_list_joined};`);
                        main_function.push("{");
                    } else {
                        function_definitions.push(`\n${return_type} ${node.nameNode.text}${param_list_joined};`);
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
    
    
    // Generate header files
    function generateHeader() {
        let macro_fun = filename.toUpperCase() + "_H";
        header.push(`#ifndef ${macro_fun}`);
        header.push(`#define ${macro_fun}`);
        if (function_definitions.length == 0) {
            header.push("\n// Function declarations")
            header.push(function_declarations.join("\n"));
        } else {
            header.push("int " + filename + "(void);");
        }
        header.push("#endif");
        writeToFile(out_folder, filename + ".h", header.join("\n"));
        
    }
    
    function slice2list(node) {
        let children_vals = []
                
        for (let i=0; i<node.namedChildCount; i++) {
            let child = node.namedChildren[i];
            let [child_type,,,,] = inferType(child, var_types, custom_functions, classes);
            
            if (child_type == "keyword") {
                
                let [,ndim,dim,,] = inferType(node.parent.valueNode, var_types, custom_functions, classes);
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
        
        let list = [];
        for (let i = start; i <= stop; i += step) {
            list.push(i);
        }
        return list;
    }
    
    function matrix2list(node) {
        let list = []
                
        for (let child of node.namedChildren) {
            list.push(transformNode(child));
        }
        return list;
    }
    
    function sub2idx(row_node, col_node, d0) {
        var row = row_node.text;
        var col = col_node.text;
        if (row_node.type == g.SyntaxType.Slice) {
            row = slice2list(row_node);
        } else if (row_node.type == g.SyntaxType.Matrix) {
            row = matrix2list(row_node);
        } else {
            row = [Number(row_node.text)];
        }
        if (col_node.type == g.SyntaxType.Slice) {
            col = slice2list(row_node);
        } else if (col_node.type == g.SyntaxType.Matrix) {
            col = matrix2list(row_node);
        } else {
            col = [Number(col_node.text)];
        }

        let idx = [];
        for (let i = 0; i < row.length; i++) {
            for (let j = 0; j < col.length; j++) {
                idx.push((Number(col[j])-1) * d0 + Number(row[i]));
            }
        }
        return idx;
        
    }
    
    function getSubscriptIdx(node) {
        let [,,dim,,] = inferType(node, var_types, custom_functions, classes);
        // already a linear idx
        if (node.namedChildCount == 2) {
            if (node.namedChildren[1].type == g.SyntaxType.Slice) {
                var list = slice2list(node.namedChildren[1])
            } else if (node.namedChildren[1].type == g.SyntaxType.Matrix) {
                var list = matrix2list(node.namedChildren[1])
            } else {
                var list = [node.namedChildren[1].text];
            }
            var idx = [];
            for (let l of list) {
                idx.push(Number(l));
            }
        }
        else {
            var idx = sub2idx(
                node.namedChildren[1], 
                node.namedChildren[2], 
                dim[0]
            );
        }
        return idx;
    }
    // Put together generated code
    // -----------------------------------------------------------------------------
    
    main();
    
    generated_code.push(link.join("\n"));
    if (function_definitions.length != 0) {
        generated_code.push("\n// Function declarations")
        generated_code.push(function_declarations.join("\n"));
    }
    if (!file_is_function){
    generated_code.push(
`\n// Entry-point function
int ${filename}(void)
{`);
    }
    //generated_code.push("\n// Initialize variables");
    //generated_code.push(var_initializations.join("\n"));
    generated_code.push("\n" + main_function.join("\n"));
    if (!file_is_function){
        generated_code.push("return 0;");
        generated_code.push("}\n");
    }

    if (function_definitions.length != 0) {
        generated_code.push("\n// Subprograms");
        generated_code.push(function_definitions.join("\n"));
    }
    
    
    generateHeader();
    
    writeToFile(out_folder, filename + ".c", generated_code.join("\n"));
    
    return [generated_code.join("\n"), header.join("\n")];
}