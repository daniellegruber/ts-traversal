const fs = require("fs");
var path = require("path");
import * as ts from "typescript";
import * as g from "./generated";
import { parseFunctionDefNode, numel } from "./helperFunctions";
import { inferType, inferTypeByName, Type, findVarScope } from "./typeInference";
import { 
    gotoPreorderSucc,
    gotoPreorderSucc_OnlyMajorTypes, 
    fileIsFunction,
    findEntryFunction
} from "./treeTraversal";
import { writeToFile, filterByScope } from "./helperFunctions";
import { operatorMapping, builtin_functions } from "./builtinFunctions";
let builtin_funs = builtin_functions;
// Main
export function generateCode(filename, tree, out_folder, custom_functions, classes, var_types, block_idxs, file, debug) {
    if (debug == 1) {
        console.log("generateCode");
    }
    let tmp_var_types = var_types;
    let entry_fun_node = findEntryFunction(tree, debug);
    
    let loop_iterators = [];
    
    // might eventually replace this function with VarType tag for "internally" generated vars  
    function isTmpVar(var_name) {
        let match = var_name.match(/([a-zA-Z]+)(\d+)/);
        if (match != null) {
            let obj = tmp_tbl.find(x => x.name === match[1]);
            if (obj != null && obj != undefined) {
                if (Number(match[2]) <= obj.count) {
                    return true;
                }
            }
        }
        return false;
    }
    
    function transformNodeByName(var_name, node) {
        let obj = filterByScope(alias_tbl, var_name, node, 0);
        if (obj != null) {
            return obj.tmp_var;
        } 
        return var_name;
    }
    
    function initVar(var_name, var_val, var_type, node) {
        let expression = '';
        
        if (var_type.ismatrix && var_type.ispointer) {
            expression = `Matrix ** ${var_name}`;
        } else if (var_type.ismatrix) {
            expression = `Matrix * ${var_name}`;
        } else if (var_type.isvector) {
            expression = `${var_type.type} ${var_name}[${numel(var_type.dim)}]`;
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
        
        // if 1x1 matrix "flatten" to regular int, double, or complex
        /*if (current_code == "main" && !isTmpVar(var_name) && var_type.ismatrix && var_type.dim.every(x => x === 1)) {
            let tmp_var = generateTmpVar("tmp");
            expression = expression.concat(
                `\n${var_type.type} ${tmp_var} = ${var_type.type.charAt(0)}_to_${var_type.type.charAt(0)}(${var_name})`
            );
            
            tmp_var_types.push({
                name: tmp_var,
                type: var_type.type,
                ndim: 1,
                dim: [1],
                ismatrix: false,
                isvector: false,
                ispointer: false,
                isstruct: false,
                initialized: true,
                scope: findVarScope(node, block_idxs, debug)
            });
            alias_tbl = pushAliasTbl(alias_tbl, var_name, tmp_var, node);
        }*/
        
        return expression;
    }

    
    function findLastSubscript(node) {
        let matches = [];
        let re = new RegExp(`${node.text}\\(([\\s\\w+\\-\\*]*)\\)(=| =)`);
        let scope = findVarScope(node, block_idxs, current_code, debug);
        let obj = filterByScope(tmp_var_types, node.text, node, 0);
        if (obj !== null && obj !== undefined) {
            scope = obj.scope;
        }
        
        let cursor = tree.walk();
        do {
            const c = cursor as g.TypedTreeCursor;
            let m = c.currentNode.text.match(re);
            if (c.currentNode.type == g.SyntaxType.Assignment) {
                if ((m != null) && (c.currentNode.startIndex >= scope[0]) && (c.currentNode.endIndex <= scope[1])) {
                    matches.push(m[0]);
                    //matches.push(transformNode(c.currentNode.leftNode));
                } 
            }
        } while(gotoPreorderSucc(cursor, debug));
        return matches;
    }
    
    function pushAliasTbl(alias_tbl, lhs, rhs, node) {
        let scope = findVarScope(node, block_idxs, current_code, debug);
        let obj = filterByScope(tmp_var_types, lhs, node, 0);
        if (obj !== null && obj !== undefined) {
            scope = obj.scope;
        }
        alias_tbl = alias_tbl.filter(function(e) { 
            return (e.name !== lhs) ||
                ((e.name == lhs) && (e.scope[0] !== scope[0]) && (e.scope[1] !== scope[1]))
        });
        alias_tbl.push({
            name: lhs,
            tmp_var: rhs,
            scope: scope
        });
        return alias_tbl;
    }
    
    function rowMajorFlatIdx(count, dim, idx, lhs_flag) {
        let dimlen = dim.length;
        if (dim[1] == undefined) {
            dim.push(1);
        }
        if (dim[2] == undefined) {
            dim.push(1);
        }
        
        let tmp_d3 = `d3_${count}`;
        let tmp_d2 = `d2_${count}`;
        let tmp_d1 = `d1_${count}`;
        let tmp_d0 = `d0_${count}`;
        let tmp_var = `tmp_${count}`;
                
        let isnum = /^\d+$/.test(idx);
        let d3 = 1;
        let d2 = 1;
        let d1 = 1;
        let d0 = 1;
        
        if (isnum) {
            if (dimlen == 2) {
                d3 = 1;
                d2 = 1;
                d0 = Number(idx) % dim[0];
                if (d0 == 0) {
                    d0 = dim[0];
                }
                d1 = (Number(idx) - d0)/dim[0] + 1;
            } else if (dimlen == 3) {
                d3 = 1;
                d2 = Math.ceil(Number(idx) / (dim[0] * dim[1]));
                let tmp = Number(idx) % (dim[0] * dim[1]);
                if (tmp == 0) {
                    tmp = dim[0] * dim[1];
                }
                d0 = tmp % dim[0];
                if (d0 == 0) {
                    d0 = dim[0];
                }
                d1 = (tmp - d0)/dim[0] + 1;
            } else if (dimlen == 4) {
                d3 = Math.ceil(Number(idx) / (dim[0] * dim[1] * dim[2]));
                d2 = (Math.ceil(Number(idx) / (dim[0] * dim[1]))) % dim[2];
                if (d2 == 0) {
                    d2 = dim[2];
                }
                let tmp = Number(idx) % (dim[0] * dim[1]);
                if (tmp == 0) {
                    tmp = dim[0] * dim[1];
                }
                d0 = tmp % dim[0];
                if (d0 == 0) {
                    d0 = dim[0];
                }
                d1 = (tmp - d0)/dim[0] + 1;
            }
        
            return [`${(d1-1) + (d0-1) * dim[1] + (d2-1) * dim[0] * dim[1] + (d3-1) * dim[0] * dim[1] * dim[2]}`];
            /*if (lhs_flag) {
                return [`${(d1-1) + (d0-1) * dim[1] + (d2-1) * dim[0] * dim[1] + (d3-1) * dim[0] * dim[1] * dim[2]}`];
            } else {
                return [`${d1 + (d0-1) * dim[1] + (d2-1) * dim[0] * dim[1] + (d3-1) * dim[0] * dim[1] * dim[2]}`];
            }*/
            
        } else {
            let obj = tmp_var_types.find(x => x.name == tmp_d0);
            if (obj == null || obj == undefined) {
            if (dimlen == 2) {
            pushToMain(
`int ${tmp_d3} = 1;
int ${tmp_d2} = 1;
int ${tmp_d0} = ${idx} % ${dim[0]};
if (${tmp_d0} == 0) {
${tmp_d0} = ${dim[0]};
}
int ${tmp_d1} = (${idx} - ${tmp_d0})/${dim[0]} + 1;`) 
            } else if (dimlen == 3) {
            pushToMain(
`int ${tmp_d3} = 1;
int ${tmp_d2} = ceil((double) ${idx} / (${dim[0]} * ${dim[1]}));
int ${tmp_var} = ${idx} % (${dim[0]} * ${dim[1]});
if (${tmp_var} == 0) {
${tmp_var} = ${dim[0]} * ${dim[1]};
}
int ${tmp_d0} = ${tmp_var} % ${dim[0]};
if (${tmp_d0} == 0) {
${tmp_d0} = ${dim[0]};
}
int ${tmp_d1} = (${tmp_var} - ${tmp_d0})/${dim[0]} + 1;`) 
            } else if (dimlen == 4) {
            pushToMain(
`int ${tmp_d3} = ceil((double) ${idx} / (${dim[0]} * ${dim[1]} * ${dim[2]}));
int ${tmp_d2} = ((int) ceil((double) ${idx} / (${dim[0]} * ${dim[1]}))) % ${dim[2]};
if (${tmp_d2} == 0) {
${tmp_d2} = ${dim[2]};
}
int ${tmp_var} = ${idx} % (${dim[0]} * ${dim[1]});
if (${tmp_var} == 0) {
${tmp_var} = ${dim[0]} * ${dim[1]};
}
int ${tmp_d0} = ${tmp_var} % ${dim[0]};
if (${tmp_d0} == 0) {
${tmp_d0} = ${dim[0]};
}
int ${tmp_d1} = (${tmp_var} - ${tmp_d0})/${dim[0]} + 1;`) 

            }
               
            tmp_var_types.push({
                name: tmp_d0,
                type: "int",
                ndim: 1,
                dim: [1],
                ismatrix: false,
                isvector: false,
                ispointer: false,
                isstruct: false,
                initialized: true,
                scope: null
            });
            }
            /*if (lhs_flag) {
                return [`(${tmp_d1}-1) + (${tmp_d0}-1) * ${dim[1]} + (${tmp_d2}-1) * ${dim[0]} * ${dim[1]} + (${tmp_d3}-1) * ${dim[0]} * ${dim[1]} * ${dim[2]}`];
            } else {
                return [`${tmp_d1} + (${tmp_d0}-1) * ${dim[1]} + (${tmp_d2}-1) * ${dim[0]} * ${dim[1]} + (${tmp_d3}-1) * ${dim[0]} * ${dim[1]} * ${dim[2]}`];
            }*/
            return [`(${tmp_d1}-1) + (${tmp_d0}-1) * ${dim[1]} + (${tmp_d2}-1) * ${dim[0]} * ${dim[1]} + (${tmp_d3}-1) * ${dim[0]} * ${dim[1]} * ${dim[2]}`];
        }
    }
    
    function pushToMain(expression) {
        if (debug == 1) {
            console.log("pushToMain");
        }
        if (expression != null) {
            if (current_code == "main") {
                main_function.push(expression);
            } else if (entry_fun_node != null) {
                if (entry_fun_node.nameNode.text == current_code) {
                    main_function.push(expression);
                }
            } else {
                function_definitions.push(expression)
            }
        }
    }
    
    function insertMain(expression, search_exp, num_back, before_after) {
        if (debug == 1) {
            console.log("insertMain");
        }
    
        // num_back: if more than one instance of search_exp is found, which instance to choose as formatted as
        // matches[matches.length - num_back]
        let idx = main_function.reduce(function(a, e, i) {
            if (e.includes(search_exp))
                a.push(i);
            return a;
        }, []); 
        if (idx.length > 1) {
            idx = idx[idx.length - num_back];
        }
        if (expression != null) {
            if (current_code == "main") {
                if (before_after == 1) {
                    //main_function.splice(idx, 0, expression);
                    main_function.splice(idx+1, 0, expression);
                } else {
                    //main_function.splice(idx-1, 0, expression);
                    main_function.splice(idx, 0, expression);
                }
            } else if (entry_fun_node != null) {
                if (entry_fun_node.nameNode.text == current_code) {
                    main_function.splice(idx, 0, expression);
                    if (before_after == 1) {
                        main_function.splice(idx+1, 0, expression);
                    } else {
                        main_function.splice(idx, 0, expression);
                    }
                }
            } else {
                let idx = function_definitions.reduce(function(a, e, i) {
                    if (e.includes(search_exp))
                        a.push(i);
                    return a;
                }, []); 
                if (idx.length > 1) {
                    idx = idx[idx.length - num_back];
                }
                if (before_after == 1) {
                    function_definitions.splice(idx+1, 0, expression)
                } else {
                    function_definitions.splice(idx, 0, expression)
                }
            }
        }
    }
    
    function replaceMain(expression, search_exp, num_back) {
        if (debug == 1) {
            console.log("replaceMain");
        }
    
        // num_back: if more than one instance of search_exp is found, which instance to choose as formatted as
        // matches[matches.length - num_back]
        let idx = main_function.reduce(function(a, e, i) {
            if (e.includes(search_exp))
                a.push(i);
            return a;
        }, []); 
        if (idx.length > 1) {
            idx = idx[idx.length - num_back];
        }
        if (expression != null) {
            if (current_code == "main") {
                main_function[idx] = expression;
            } else if (entry_fun_node != null) {
                if (entry_fun_node.nameNode.text == current_code) {
                    //main_function.splice(idx, 0, expression);
                    main_function[idx] = expression;
                }
            } else {
                let idx = function_definitions.reduce(function(a, e, i) {
                    if (e.includes(search_exp))
                        a.push(i);
                    return a;
                }, []); 
                if (idx.length > 1) {
                    idx = idx[idx.length - num_back];
                }
                function_definitions[idx] = expression;
            }
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
#include <string.h>
#include <matrix.h>
#include <${filename}.h>`];
          
    var cursor_adjust = false;
    var current_code = "main";
    
    type TmpVar = {
      name: string;
      count: number;
    };
    
    let tmp_tbl: TmpVar[] = [];
    
    function generateTmpVar(name) {
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
    
    type Alias = {
      name: string;
      tmp_var: string;
      scope: number[];
    };
    
    let alias_tbl: Alias[] = [];
    
    // at each iteration, check each element of mainQueue, if condition true then push expression
    type MainQueue = {
    	expression: string;
    	condition: string; // pushes expression to main if condition is true
    };
    
    let main_queue: MainQueue[] = [];
    
    type typeToMatrixType = {
      type: string;
      matrix_type: number;
    };
    
    type typeToCellType = {
      type: string;
      cell_type: number;
      cell_val: string;
    };
    
    const type_to_matrix_type: typeToMatrixType[] = [
        {type: "integer", matrix_type: 0},
        {type: "int", matrix_type: 0},
        {type: "double", matrix_type: 1},
        {type: "complex", matrix_type: 2},
        {type: "char", matrix_type: 3}
    ];
    
    const type_to_cell_type: typeToCellType[] = [
        {type: "integer", cell_type: 0, cell_val: "ival"},
        {type: "int", cell_type: 0, cell_val: "ival"},
        {type: "double", cell_type: 1, cell_val: "dval"},
        {type: "complex", cell_type: 2, cell_val: "cval"},
        {type: "char", cell_type: 3, cell_val: "chval"}
    ];
    
    function main() {
        if (debug == 1) {
            console.log("main");
        }
    
        let cursor = tree.walk();
        do {
            const c = cursor as g.TypedTreeCursor;
            let node = c.currentNode;
            current_code = "main";
            tmp_var_types = var_types;
            
            switch (node.type) {
                case g.SyntaxType.FunctionDefinition: {
                    current_code = node.nameNode.text;
                    let obj = custom_functions.find(x => x.name === current_code);
                    if (obj != null && obj != undefined) {
                        tmp_var_types = obj.var_types;
                        if (tmp_var_types == null) {
                            tmp_var_types = [];
                        }
                    }
                    printFunctionDefDeclare(node);
                    break;
                }
                case g.SyntaxType.Comment:
                case g.SyntaxType.ExpressionStatement: {
                    let expression = transformNode(node);
                    if (expression != ";" && expression != null) {
                        pushToMain(expression);
                    }
                    break;
                }
                case g.SyntaxType.IfStatement:
                case g.SyntaxType.WhileStatement:
                case g.SyntaxType.ForStatement: {
                    //pushToMain("\n" + transformNode(node));
                    transformNode(node);
                    break;
                }
            }
        } while(gotoPreorderSucc_OnlyMajorTypes(cursor, debug));
        
        if (current_code == "main") {
            var_types = tmp_var_types;
        } else {
            let obj = custom_functions.find(x => x.name === current_code);
            if (obj != null && obj != undefined) {
                obj.var_types = tmp_var_types;
                custom_functions = custom_functions.filter(function(e) { return e.name !== obj.name });
                custom_functions.push(obj);
            }
        }
    }
    
    // Transform node
    function transformNode(node) {
        if (debug == 1) {
            console.log("transformNode");
        }
    
        //console.log("TRANSFORM");
        //console.log(node.text);
        //console.log(node);
        // at each iteration, check each element of mainQueue, if condition true then push expression
        let idx = 0;
        for (let i = 0; i < main_queue.length; i++) {
            let result = ts.transpile(main_queue[idx].condition);
            let runnalbe = eval(result);
            if (runnalbe) {
               pushToMain(main_queue[idx].expression); 
               main_queue.splice(idx,1);
               idx = idx - 1;
            }
            idx = idx + 1;
        }
        
        switch (node.type) {
            // Comments
            // TO DO: multiline comments
            case g.SyntaxType.Comment: {
                return node.text.replace("%","//");
                break;
            }
                
            case g.SyntaxType.IfStatement: {
                pushToMain("if (" + transformNode(node.conditionNode) + ") {");
                for (let i=1; i<node.namedChildCount; i++) {
                    pushToMain(transformNode(node.namedChildren[i]));
                }
                pushToMain("\n}");
                return null
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
                let tmp_iter = generateTmpVar("iter");
                if (node.rightNode.type == g.SyntaxType.Slice) {
                    let obj = tmp_var_types.find(x => x.name === node.leftNode.text);
                    
                    //expression2.push(`for (int ${node.leftNode.text} = `);
                    expression2.push(`for (int ${tmp_iter} = `);
                    expression2.push(`${node.rightNode.children[0].text};`);
                    //loop_iterators.push(node.leftNode.text);
                    loop_iterators.push(tmp_iter);

                    alias_tbl = pushAliasTbl(alias_tbl, node.leftNode.text, tmp_iter, node);
                    
                    tmp_var_types.push({
                        name: tmp_iter,
                        type: "int",
                        ndim: 1,
                        dim: [1],
                        ismatrix: false,
                        isvector: false,
                        ispointer: false,
                        isstruct: false,
                        initialized: true,
                        scope: findVarScope(node, block_idxs, current_code, debug)
                    });
                    
                    if (node.rightNode.childCount == 5) {
                        expression2.push(`${tmp_iter} <= ${node.rightNode.children[4].text};`);
                        expression2.push(`${tmp_iter} += ${node.rightNode.children[2].text}`);
                    } else {
                        expression2.push(`${tmp_iter} <= ${node.rightNode.children[2].text};`);
                        expression2.push(`++ ${tmp_iter}`);
                    }
                    expression1.push(expression2.join(" ") + ") {");
                    
                    
                } else if (node.rightNode.type == g.SyntaxType.Matrix) {
                    var tmp_var1 = generateTmpVar("tmp"); // the matrix
                    var tmp_var2 = generateTmpVar("tmp"); // the iterating variable
                    var [type, ndim, dim,,,, c] = inferType(node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                    custom_functions = c;
                    let obj = type_to_matrix_type.find(x => x.type === type);
                    if (obj != null) {
                        expression1.push(initializeMatrix(node.rightNode, tmp_var1, ndim, dim, type));
                    }
                    
                    expression1.push(`\n${type} ${tmp_iter};`);
                    expression1.push(`int ${tmp_var2};`);
                    expression2.push(`for (${tmp_var2} = 1;`);
                    expression2.push(`${tmp_var2} <= ${node.rightNode.namedChildCount};`);
                    // expression2.push(`++${tmp_var2}`);
                    expression2.push(`${tmp_var2}++`); 
                    expression1.push(expression2.join(" ") + ") {");
                    expression1.push(`indexM(${tmp_var1}, &${node.leftNode.text}, 1, ${tmp_var2});`);
                    // node.leftNode now equal to value of matrix tmp_var1 at index tmp_var2
                    
                    loop_iterators.push(tmp_var2);
                }
                    
                pushToMain("\n" + expression1.join("\n"));
                for (let child of node.bodyNode.namedChildren) {
                    //expression1.push(transformNode(child));
                    pushToMain(transformNode(child));
                }
                pushToMain("\n}")
                
                let idx = loop_iterators.indexOf(tmp_iter);
                if (node.rightNode.type == g.SyntaxType.Matrix) {
                    idx = loop_iterators.indexOf(tmp_var2);
                }
                loop_iterators.splice(idx, 1);

                return null;
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
                let [args1, outs, is_subscript] = parseNode(node, false);
                let arg_types = [];
                let args = [];
                var [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                custom_functions = c;
                var init_flag = false;
                var lhs = null;
                if (node.rightNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Cell) {
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                
                    for (let arg of args1) {
                        args.push(transformNode(arg));
                        let [child_type, child_ndim, child_dim, child_ismatrix, child_ispointer, child_isstruct, c] = inferType(arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                        custom_functions = c;
                        arg_types.push({
                            type: child_type, 
                            ndim: child_ndim, 
                            dim: child_dim, 
                            ismatrix: child_ismatrix, 
                            isvector: numel(child_dim) > 1 && !child_ismatrix,
                            ispointer: child_ispointer,
                            isstruct: child_isstruct
                        });
                    }
                    //unicorn
                    for (let i = 0; i < outs.length; i ++) {
                        outs[i] = transformNode(outs[i]);
                        /*if (outs[i].type == g.SyntaxType.CellSubscript) {
                            let obj = alias_tbl.find(x => x.name === outs[i].text);
                            if (obj != null && obj != undefined) {
                                outs[i] = obj.tmp_var;
                            }
                        }*/
                    }
                    

                    if (type == 'heterogeneous') {
                    // int:0, double:1, complex:2, char:3  
                    numCellStruct += 1;
                    if (numCellStruct == 1) {
insertMain(`// Structure for cell arrays
struct cell {
    int type;
    union {
        int ival;
        double dval;
        complex double cval;
        char chval[20];
    } data;
};`, `int ${filename}(void) {`, 1, 0);
                        }
                        let expression = [];
                        expression.push(`struct cell ${outs[0]}[${node.rightNode.namedChildCount}];`)
                        
                        let types = [];
                        for (let i=0; i<node.rightNode.namedChildCount; i++) {
                            let child = node.rightNode.namedChildren[i];
                            let [child_type, child_ndim, child_dim, child_ismatrix, child_ispointer, child_isstruct, c] = inferType(child, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                            custom_functions = c;
                            let numel = child_dim.reduce(function(a, b) {return a * b;});
                            if (child.type == g.SyntaxType.Matrix) {
                                
                                //expression1.push(`Matrix f${i}[${numel}];`);
                                //expression2.push(initializeMatrix(node.rightNode, `${outs[0]}.f${i}`, child_ndim, child_dim, type));
          
                            } else if (child_type == 'char') {
                                expression.push(`${outs[0]}[${i}].type = 3;`);
                                //expression.push(`${outs[0]}[${i}].data.chval = ${child.text.replace(/'/g, '"')};`);
                                expression.push(`strcpy(${outs[0]}[${i}].data.chval, ${child.text.replace(/'/g, '"')});`);
                            } else {
                                let obj = type_to_cell_type.find(x => x.type === child_type);
                                expression.push(`${outs[0]}[${i}].type = ${obj.cell_type};`);
                                expression.push(`${outs[0]}[${i}].data.${obj.cell_val} = ${child.text};`);
                            }
                            
                        }
                        pushToMain(expression.join("\n") + "\n");
                        let tmp_iter = generateTmpVar("iter");
pushToMain(`
for (int ${tmp_iter} = 0; ${tmp_iter} < ${node.rightNode.namedChildCount}; ${tmp_iter}++) {
    switch(${outs[0]}[${tmp_iter}].type) {
        case 0:
        printf("%d\\n", ${outs[0]}[${tmp_iter}].data.ival);
        break;
        
        case 1:
        printf("%f\\n", ${outs[0]}[${tmp_iter}].data.dval);
        break;
        
        case 2:
        printf("%f\\n", ${outs[0]}[${tmp_iter}].data.cval);
        break;
        
        case 3:
        printf("%s\\n", ${outs[0]}[${tmp_iter}].data.chval);
        break;
    }
}
`);
                    } else {
                        let obj = type_to_matrix_type.find(x => x.type === type);
                        if (obj != null) {
                            pushToMain(initializeMatrix(node.rightNode, outs[0], ndim, dim, type));
                        }
                        
                    }
                } else if (node.rightNode.type == g.SyntaxType.CallOrSubscript) {
                    for (let i = 0; i < outs.length; i ++) {
                        outs[i] = transformNode(outs[i]);
                    }
                    
                    let obj = classes.find(x => x.name === node.rightNode.valueNode.text);
                    // Is a class
                    if (obj != null) {
                        var rhs:string = obj.name;
                    } else {
                        let obj1 = custom_functions.find(x => x.name === node.rightNode.valueNode.text);
                        let obj2 = builtin_funs.find(x => x.fun_matlab === node.rightNode.valueNode.text);
                        if (obj1 != null && obj1 != undefined) {
                            lhs = obj1.outs_transform(outs);
                        } else if (obj2 != null && obj2 != undefined) {
                            lhs = obj2.outs_transform(outs);
                        }
                    }
                    var rhs:string = transformNode(node.rightNode);
                    init_flag = true;
                } else {
                    for (let i = 0; i < outs.length; i ++) {
                        outs[i] = transformNode(outs[i]);
                    }

                    var rhs:string = transformNode(node.rightNode);
                    init_flag = true;
                    lhs = outs[0];
                }
                
                //if (node.leftNode.type != g.SyntaxType.CallOrSubscript && node.leftNode.type != g.SyntaxType.CellSubscript) {
                    if (lhs == null && rhs != undefined && rhs != null) {
                        pushToMain(`${rhs};`);   
                    } else if (init_flag && rhs != undefined && rhs != null) {
                        if (lhs[0].indexOf("[") > -1 || lhs.indexOf("[") > -1) {
                            pushToMain(`${lhs} = ${rhs};`);
                        } else {
                            let var_type = filterByScope(tmp_var_types, lhs, node, 0);
                            if (var_type != null && var_type != undefined) { 
                                if (var_type.initialized && (var_type.ismatrix || var_type.type == type)) {
                                    pushToMain(`${lhs} = ${rhs};`);
                                } else if (var_type.initialized && (var_type.type != type)) {
                                    let tmp = generateTmpVar(var_type.name);
                                    tmp_var_types.push({
                                        name: tmp,
                                        type: type,
                                        ndim: ndim,
                                        dim: dim,
                                        ismatrix: ismatrix,
                                        isvector: numel(dim) > 1 && !ismatrix,
                                        ispointer: ispointer,
                                        isstruct: isstruct,
                                        initialized: true,
                                        scope: var_type.scope
                                    });
                                    
                                    alias_tbl = pushAliasTbl(alias_tbl, lhs, tmp, node);
                                    pushToMain(initVar(tmp, rhs, tmp_var_types[tmp_var_types.length - 1], node));
                                    
                                } else {
                                    pushToMain(initVar(lhs, rhs, var_type, node));
                                }
                                
                                //tmp_var_types = tmp_var_types.filter(function(e) { return e.name !== var_type.name });
                                tmp_var_types = tmp_var_types.filter(function(e) { return JSON.stringify(e) !== JSON.stringify(var_type) });
                                var_type.initialized = true;
                                if (var_type.type == "unknown") {
                                    var_type.type = type;
                                }
                                tmp_var_types.push(var_type);
                                let obj = tmp_tbl.find(x => `${x.name}${x.count}` === rhs);
                                if (obj != null && obj != undefined) {
                                    alias_tbl = pushAliasTbl(alias_tbl, lhs, rhs, node);
                                }
                                    
                            } else {
                                let scope = findVarScope(node, block_idxs, current_code, debug);
                                tmp_var_types.push({
                                    name: lhs,
                                    type: type,
                                    ndim: ndim,
                                    dim: dim,
                                    ismatrix: ismatrix,
                                    isvector: numel(dim) > 1 && !ismatrix,
                                    ispointer: ispointer,
                                    isstruct: isstruct,
                                    initialized: true,
                                    scope: scope
                                });
                                
                                pushToMain(initVar(lhs, rhs, tmp_var_types[tmp_var_types.length - 1], node));
                                
                                let obj = tmp_tbl.find(x => `${x.name}${x.count}` === rhs);
                                if (obj != null && obj != undefined) {
                                    alias_tbl = pushAliasTbl(alias_tbl, lhs, rhs, node);
                                }
                            }
                        }
                    }
                //}
               
                let [left_args, , ] = parseNode(node.leftNode, true);
                let processed_args = [];
                
                for (let i = 0; i < left_args.length; i ++) {
                    //left_args[i] = transformNode(left_args[i]);
                    if (left_args[i].namedChildCount > 0) {
                        for (let j = 0; j < left_args[i].namedChildCount; j++) {
                            processed_args.push(transformNode(left_args[i].namedChildren[j]));
                        }
                    } else {
                        processed_args.push(transformNode(left_args[i]));
                    }
                }
                
                if (node.leftNode.type == g.SyntaxType.Matrix) {
                    for (let j = 0; j < node.leftNode.namedChildCount; j++) {
                        let child = node.leftNode.namedChildren[j];
                        // If element j of LHS matrix is a subscript
                        if (is_subscript[j]) {
                            
                            // Convert to linear idx
                            let obj4 = tmp_tbl.find(x => x.name == "d0_");
                            let idx = getSubscriptIdx(child, obj4.count);
                            let tmp_data = generateTmpVar("data");
                            let tmp_lhs = generateTmpVar("lhs_data");
                            let tmp_rhs = generateTmpVar("rhs_data");
                            let [ltype,,,,,,] = inferType(node.leftNode.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                            pushToMain(`${type}* ${tmp_lhs} = ${type.charAt(0)}_to_${type.charAt(0)}(${transformNode(child.valueNode)});`);
                            let [,,, ismatrix,,, c] = inferType(outs[j], tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                            custom_functions = c;
                            
                            // If RHS is matrix
                            if (ismatrix) {
                                pushToMain(`${type}* ${tmp_rhs} = ${type.charAt(0)}_to_${type.charAt(0)}(${outs[j]});`);
                                for (let i = 0; i < idx.length; i++) {
                                    pushToMain(`${tmp_lhs}[${idx[i]}] = ${tmp_rhs}[${i}];`); 
                                }
                            
                            // If RHS not matrix
                            } else {
                                for (let i = 0; i < idx.length; i++) {
                                    pushToMain(`${outs[j]}[${i}] = ${tmp_rhs}[${idx[i]}];`); 
                                }
                            }
                            let tmp_size = generateTmpVar("size");
                            let tmp_iter = generateTmpVar("iter");
                            let tmp_mat = generateTmpVar("mat");
                            let obj1 = tmp_tbl.find(x => x.name === "ndim");
                            let tmp_ndim = `${obj1.name}${obj1.count}`;
                            let obj2 = tmp_tbl.find(x => x.name === "dim");
                            let tmp_dim = `${obj2.name}${obj2.count}`;
                            let obj3 = type_to_matrix_type.find(x => x.type === type);
                            
pushToMain(`int ${tmp_size} = 1;
for (int ${tmp_iter} = 0 ; ${tmp_iter} < ${tmp_ndim}; ${tmp_iter}++)
{
	${tmp_size} *= ${tmp_dim}[${tmp_iter}];
}
Matrix *${tmp_mat} = createM(${tmp_ndim}, ${tmp_dim}, ${obj3.matrix_type});
writeM(${tmp_mat}, ${tmp_size}, ${tmp_lhs});`);
//printM(${tmp_mat});`); 
                            alias_tbl = pushAliasTbl(alias_tbl, child.valueNode.text, tmp_mat, node);
                            let obj = filterByScope(tmp_var_types, child.valueNode.text, child, 0);
                            tmp_var_types.push({
                                name: tmp_mat,
                                type: type,
                                ndim: obj.ndim,
                                dim: obj.dim,
                                ismatrix: true,
                                isvector: false,
                                ispointer: false,
                                isstruct: false,
                                initialized: true,
                                scope: obj.scope
                            });
                        }
                    }
                } else {
                    // If LHS is a subscript
                    if (node.leftNode.type == g.SyntaxType.CellSubscript) {

                        let scope = findVarScope(node, block_idxs, current_code, debug);
                        if (loop_iterators.length > 0) {
                            scope = block_idxs.filter(function(e) { return e[2] == scope[2] - loop_iterators.length })
                            scope = scope[scope.length - 1];
                        }
                        
                        alias_tbl = pushAliasTbl(alias_tbl, node.leftNode.text, rhs, node);
                        let obj = filterByScope(tmp_var_types, node.leftNode.valueNode.text, node, 0);
                        tmp_var_types.push({
                            name: rhs,
                            type: type,
                            ndim: obj.ndim,
                            dim: obj.dim,
                            ismatrix: true,
                            isvector: false,
                            ispointer: false,
                            isstruct: false,
                            initialized: true,
                            scope: obj.scope
                        });
                        
                    } else if (is_subscript[0]) {
                        // Convert to linear idx
                        let obj4 = tmp_tbl.find(x => x.name == "d0_");
                        let idx = getSubscriptIdx(node.leftNode, obj4.count);
                        let num_back = 0;
                        for (let i = 0; i <= loop_iterators.length; i++) {
                            let re = new RegExp(`\\b${loop_iterators[i]}\\b`);
                            if (re.test(processed_args.join(", ")) || re.test(rhs)) {
                                num_back = num_back + 1;
                            }
                        }

                        let scope = findVarScope(node, block_idxs, current_code, debug);
                        if (loop_iterators.length > 0) {
                            scope = block_idxs.filter(function(e) { return e[2] == scope[2] - loop_iterators.length })
                            scope = scope[scope.length - 1];
                        }
                         
                        let obj6 = tmp_tbl.find(x => x.name == "lhs_data");
                        let new_flag = true;
                        let tmp_lhs = "lhs_data";
                        if (obj6 != null && obj6 != undefined) {
                            let obj5 = tmp_var_types.find(x => x.name == `lhs_data${obj6.count}`);
                            if (obj5 != null && obj5 != undefined) {
                                if (obj5.type == loop_iterators.join("")) {
                                    new_flag = false;
                                    tmp_lhs = obj5.name;
                                }
                            }
                        }
                        if (new_flag) {
                            let tmp_data = generateTmpVar("data");
                            tmp_lhs = generateTmpVar("lhs_data");
                            let tmp_rhs = generateTmpVar("rhs_data");
                            let [,,, ismatrix,,, c] = inferType(outs[0], tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                            custom_functions = c;
                            let [ltype,,,,,,] = inferType(node.leftNode.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                            if (num_back == 0) {
                                pushToMain(`${type}* ${tmp_lhs} = ${ltype.charAt(0)}_to_${type.charAt(0)}(${transformNode(node.leftNode.valueNode)});`);
                            } else {
                                insertMain(`${type}* ${tmp_lhs} = ${ltype.charAt(0)}_to_${type.charAt(0)}(${transformNode(node.leftNode.valueNode)});`, 'for', num_back, 0);
                            }
                            // If RHS is matrix
                            if (ismatrix) {
                                pushToMain(`${type}* ${tmp_rhs} = ${type.charAt(0)}_to_${type.charAt(0)}(${outs[0]});`);
                                for (let i = 0; i < idx.length; i++) {
                                    pushToMain(`${tmp_lhs}[${idx[i]}] = ${tmp_rhs}[${i}];`);
                                }
                            
                            // If RHS not matrix
                            } else {
                                if (idx.length == 1) {
                                    pushToMain(`${tmp_lhs}[${idx[0]}] = ${lhs};`);
                                } else {
                                    for (let i = 0; i < idx.length; i++) {
                                        pushToMain(`${tmp_lhs}[${idx[i]}] = ${lhs}[${i}];`);
                                    }
                                }
                            }
                            let tmp_size = generateTmpVar("size");
                            let tmp_iter = generateTmpVar("iter");
                            let tmp_mat = generateTmpVar("mat");
                            let obj1 = tmp_tbl.find(x => x.name === "ndim");
                            let tmp_ndim = `${obj1.name}${obj1.count}`;
                            let obj2 = tmp_tbl.find(x => x.name === "dim");
                            let tmp_dim = `${obj2.name}${obj2.count}`;
                            let obj3 = type_to_matrix_type.find(x => x.type === type);

                            let re = new RegExp(`${node.leftNode.valueNode.text}\\([\\s\\w+\\-\\*]*\\)(=| =)`);
                            let lastSubscript = findLastSubscript(node.leftNode.valueNode);
                            let condition = `(loop_iterators.length == ${loop_iterators.length - num_back});`;
                            if (lastSubscript.length > 0) {
                                //condition = `(loop_iterators.length == ${loop_iterators.length - num_back}) && node.previousNamedSibling.text.includes("${lastSubscript[lastSubscript.length - 1]}");`;
                                condition = `
function myfun(loop_iterators, node) {
    if ((loop_iterators.length == ${loop_iterators.length - num_back}) && node.previousNamedSibling !== null) {
        if (node.previousNamedSibling.text.includes("${lastSubscript[lastSubscript.length - 1]}")) {
            return true;
        }
    }
    return false;
}
myfun(loop_iterators, node);`;
                            }
                            
                            let mq: MainQueue = {
                                expression: `// Write matrix ${tmp_mat}
int ${tmp_size} = 1;
for (int ${tmp_iter} = 0 ; ${tmp_iter} < ${tmp_ndim}; ${tmp_iter}++)
{
	${tmp_size} *= ${tmp_dim}[${tmp_iter}];
}
Matrix *${tmp_mat} = createM(${tmp_ndim}, ${tmp_dim}, ${obj3.matrix_type});
writeM(${tmp_mat}, ${tmp_size}, ${tmp_lhs});`,
                                condition: condition
                            };
                            main_queue.push(mq);
                            
                            alias_tbl = pushAliasTbl(alias_tbl, node.leftNode.valueNode.text, tmp_mat, node);
                            let obj = filterByScope(tmp_var_types, node.leftNode.valueNode.text, node, 0);
                            tmp_var_types.push({
                                name: tmp_mat,
                                type: type,
                                ndim: obj.ndim,
                                dim: obj.dim,
                                ismatrix: true,
                                isvector: false,
                                ispointer: false,
                                isstruct: false,
                                initialized: true,
                                scope: obj.scope
                            });
                            tmp_var_types.push({
                                name: tmp_lhs,
                                type: loop_iterators.join(""),
                                ndim: 1,
                                dim: [obj.dim.reduce(function(a, b) {return a * b;})],
                                ismatrix: false,
                                isvector: true,
                                ispointer: false,
                                isstruct: false,
                                initialized: true,
                                scope: obj.scope
                            });
                        } else {
                            if (idx.length == 1) {
                                pushToMain(`${tmp_lhs}[${idx[0]}] = ${lhs};`);
                            } else {
                                for (let i = 0; i < idx.length; i++) {
                                    pushToMain(`${tmp_lhs}[${idx[i]}] = ${lhs}[${i}];`);
                                }
                            }
                        }
                        
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
                //return "{\n" + expression.join("\n") + "\n}";
                return expression.join("\n");
                break;
            }
            
            case g.SyntaxType.CellSubscript: {
                /*let tmp_d3 = generateTmpVar("d3_");
                let tmp_d2 = generateTmpVar("d2_");
                let tmp_d1 = generateTmpVar("d1_");
                let tmp_d0 = generateTmpVar("d0_");
                let tmp_var1 = generateTmpVar("tmp_");

                let obj3 = tmp_tbl.find(x => x.name == "d0_");
                let index = getSubscriptIdx(node, obj3.count);
                
                let lhs_flag = false;
                if (node.parent.type == g.SyntaxType.Assignment) {
                    if (node.parent.leftNode.text == node.text) {
                        lhs_flag = true;
                    }
                }*/
                /*if (!lhs_flag) { // subscript is on rhs
                    let obj = alias_tbl.find(x => x.name === node.text);
                    if (obj != null || obj != undefined) {
                        tmp_var = obj.tmp_var;
                        return tmp_var;
                    }
                }*/
                //var tmp_var = generateTmpVar("tmp");
                // only use indexM if subscript is on rhs
                let lhs_flag = false;
                if (node.parent.type == g.SyntaxType.Assignment) {
                    if (node.parent.leftNode.text == node.text) {
                        lhs_flag = true;
                    }
                }
                
                let tmp_d3 = generateTmpVar("d3_");
                let tmp_d2 = generateTmpVar("d2_");
                let tmp_d1 = generateTmpVar("d1_");
                let tmp_d0 = generateTmpVar("d0_");
                let tmp_var = generateTmpVar("tmp_");
                
                let obj3 = tmp_tbl.find(x => x.name == "d0_");
                let index = getSubscriptIdx(node, obj3.count);

                        
                if (!lhs_flag) { // subscript is on rhs
                    let obj = alias_tbl.find(x => x.name === node.text);
                    let [type, , , , , , ] = inferType(node.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                    if (obj == null || obj == undefined) {
                        /*if (index.length == 1) {
                            let isnum = /^\d+$/.test(index[0]);
                            if (isnum) {
                                index[0] = `${Number(index[0]) + 1}`;
                            } else {
                                index[0] = index[0].replace(/-1/, '');
                            }
                            //index = index[0].concat("+1");
                        }*/
        
                        return `${transformNode(node.valueNode)}[${index[0]}]`;
                    
                    // FORGOT REASON FOR ADDING ONE
                    } else if (node.startIndex < obj.scope[0] || node.startIndex > obj.scope[1]){
                        if (index.length == 1) {
                            let isnum = /^\d+$/.test(index[0]);
                            if (isnum) {
                                index[0] = `${Number(index[0]) + 1}`;
                            } else {
                                index[0] = index[0].replace(/-1/, '');
                            }
                            //index = index[0].concat("+1");
                        }
                        return `${transformNode(node.valueNode)}[${index[0]}]`;
                    } else {
                        tmp_var = obj.tmp_var;
                        return tmp_var;
                    }
                    
                }
                
                return `${node.valueNode.text}[${index[0]}]`;
                
                break;
            }
                
            case g.SyntaxType.CallOrSubscript: {
                // Is a custom function call
                let obj = custom_functions.find(x => x.name === node.valueNode.text);
                let [args1, outs, is_subscript] = parseNode(node, false);
                let arg_types = [];
                let args = [];
                //for (let arg of args1) {
                for (let i = 0; i < args1.length; i ++) {
                    let arg = args1[i];
                    args.push(transformNode(arg));
                    let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                    if (ismatrix) { // if a matrix, could actually be a vector so check var name to see if initialized as vector
                        [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferTypeByName(args[i], node, tmp_var_types, custom_functions, alias_tbl, debug);
                    }
                    custom_functions = c;
                    arg_types.push({
                        type: type, 
                        ndim: ndim, 
                        dim: dim, 
                        ismatrix: ismatrix, 
                        isvector: numel(dim) > 1 && !ismatrix,
                        ispointer: ispointer,
                        isstruct: isstruct
                    });
                }
                
                for (let i = 0; i < outs.length; i ++) {
                    //outs[i] = transformNode(outs[i]);
                    outs[i] = outs[i].text;
                }
                if (obj != null && obj != undefined) {
                    // Is a custom function
                    let ptr_args = obj.ptr_args(arg_types, outs);
                    if (ptr_args != null) {
                        let ptr_declaration = [];
                        for (let i = 0; i < ptr_args.length; i++) {
                            let tmp_ptr = generateTmpVar(ptr_args[i].name);
                            args.push(`&${tmp_ptr}`);
                            ptr_args[i].ispointer = false;
                            ptr_declaration.push(initVar(tmp_ptr, null, ptr_args[i], node));
                            alias_tbl = pushAliasTbl(alias_tbl, ptr_args[i].name, tmp_ptr, node);
                            tmp_var_types.push({
                                name: tmp_ptr,
                                type: ptr_args[i].type,
                                ndim: ptr_args[i].ndim,
                                dim: ptr_args[i].dim,
                                ismatrix: ptr_args[i].ismatrix,
                                isvector: numel(ptr_args[i].dim) > 1 && !ptr_args[i].ismatrix,
                                ispointer: false, //ptr_args[i].ispointer,
                                isstruct: ptr_args[i].isstruct,
                                initialized: true,
                                scope: findVarScope(node, block_idxs, current_code, debug)
                            });
                            
                        }
                        pushToMain(ptr_declaration.join("\n"));
                        
                    }
                    
                    if (path.parse(obj.file).name !== path.parse(file).name) {
                        link.push(`#include <${path.parse(obj.file).name}.h>`);
                    }
                    
                    return `${obj.name}(${args.join(", ")})`;
                    
                } else {
                    // Is a builtin function call
                    let obj = builtin_funs.find(x => x.fun_matlab === node.valueNode.text);
                    if (obj != null && obj != undefined) {
                        let init_before = obj.init_before(args, arg_types, outs);
                        let push_before = obj.push_main_before(args, arg_types, outs);
                        let push_after = obj.push_main_after(args, arg_types, outs);
                        let return_type = obj.return_type(args, arg_types, outs);
                        let fun_c = obj.fun_c(args, arg_types, outs);
                        let scope = findVarScope(node, block_idxs, current_code, debug);
                        args = obj.args_transform(args, arg_types, outs);
                        if (init_before != null && init_before != undefined) {
                            for (let i = 0; i < init_before.length; i++) {
                                if (init_before[i].name == "complex_one") {
                                    let obj2 = tmp_var_types.find(x => x.name === init_before[i].name);
                                    if (obj2 == null || obj2 == undefined) {
                                        pushToMain(initVar(init_before[i].name, init_before[i].val, init_before[i], node));
                                        
                                        tmp_var_types.push({
                                            name: init_before[i].name,
                                            type: init_before[i].type,
                                            ndim: init_before[i].ndim,
                                            dim: init_before[i].dim,
                                            ismatrix: init_before[i].ismatrix,
                                            isvector: numel(init_before[i].dim) > 1 && !init_before[i].ismatrix,
                                            ispointer: init_before[i].ispointer,
                                            isstruct: init_before[i].isstruct,
                                            initialized: true,
                                            scope: scope
                                        });
                                    }
                                } else {
                                    let tmp_var = generateTmpVar(init_before[i].name);
                                    
                                    alias_tbl = pushAliasTbl(alias_tbl, init_before[i].name, tmp_var, node);
                                    
                                    args[args.indexOf(init_before[i].name)] = tmp_var;
                                    args[args.indexOf("&" + init_before[i].name)] = "&" + tmp_var;
                                    let re = new RegExp(`\\b${init_before[i].name}\\b`, 'g');
                                    if (push_before != null) {
                                        push_before = push_before.replace(re, tmp_var);
                                    }
                                    if (push_after != null) {
                                        push_after = push_after.replace(re, tmp_var);
                                    }
                                    
                                    pushToMain(initVar(tmp_var, init_before[i].val, init_before[i], node));
                                    
                                    tmp_var_types.push({
                                        name: tmp_var,
                                        type: init_before[i].type,
                                        ndim: init_before[i].ndim,
                                        dim: init_before[i].dim,
                                        ismatrix: init_before[i].ismatrix,
                                        isvector: numel(init_before[i].dim) > 1 && !init_before[i].ismatrix,
                                        ispointer: init_before[i].ispointer,
                                        isstruct: init_before[i].isstruct,
                                        initialized: true,
                                        scope: scope
                                    });
                                }
                            }
                        }
                        pushToMain(push_before);
                        
                        let n_args = node.namedChildCount - 1;
                        if (n_args < obj.n_req_args) {
                            args = args.concat(obj.opt_arg_defaults.slice(0, obj.n_req_args - n_args));
                        }
                        
                        let ptr_args = obj.ptr_args(arg_types, outs);
                        if (ptr_args != null) {
                            let ptr_declaration = [];
                            let tmp_ptr = "tmp_ptr";
                            for (let i = 0; i < ptr_args.length; i++) {
                                tmp_ptr = generateTmpVar(ptr_args[i].name);
                                args.push(`&${tmp_ptr}`);
                                ptr_args[i].ispointer = false;
                                ptr_declaration.push(initVar(tmp_ptr, null, ptr_args[i], node));
                                
                                let re = new RegExp(`\\b${ptr_args[i].name}\\b`, 'g');
                                if (push_after != null) {
                                    push_after = push_after.replace(re, tmp_ptr);
                                }
                                tmp_var_types.push({
                                    name: tmp_ptr,
                                    type: ptr_args[i].type,
                                    ndim: ptr_args[i].ndim,
                                    dim: ptr_args[i].dim,
                                    ismatrix: ptr_args[i].ismatrix,
                                    isvector: numel(ptr_args[i].dim) > 1 && !ptr_args[i].ismatrix,
                                    ispointer: false, //ptr_args[i].ispointer,
                                    isstruct: ptr_args[i].isstruct,
                                    initialized: true,
                                    scope: scope
                                });
                                alias_tbl = pushAliasTbl(alias_tbl, ptr_args[i].name, tmp_ptr, node);
                                
                            }
                            pushToMain(ptr_declaration.join("\n"));
                            
                            // ptr args were originally outputs in MATLAB code
                            // in the case of 1 ptr arg:
                            // disp(det(A)) -> determinantM(A, &d); fprint("%i", d) 
                            if ((ptr_args.length == 1) && (return_type == null)) {
                                alias_tbl.push({
                                    name: node.text,//`${fun_c}(${args.join(", ")})`,
                                    tmp_var: tmp_ptr,
                                    scope: findVarScope(node, block_idxs, current_code, debug)
                                })
                                if (fun_c != null) {
                                    pushToMain(`${fun_c}(${args.join(", ")});`);
                                    pushToMain(push_after);
                                }
                                return tmp_ptr;
                            }
                        
                            
                        }
                        if (fun_c == null) {
                            return null;
                        } else {
                            if (return_type == null) {
                                
                                if (args == null) {
                                    pushToMain(fun_c);
                                } else {
                                    pushToMain(`${fun_c}(${args.join(", ")});`);
                                }
                                pushToMain(push_after);
                                return null;
                                
                            } else {
                                
                                let var_val = fun_c;
                                if (args != null) {
                                    var_val = `${fun_c}(${args.join(", ")})`;
                                }
                                
                                if (push_after != null || node.parent.type == g.SyntaxType.CallOrSubscript) {
                                    let tmp_var = generateTmpVar("tmp");
                                    pushToMain(initVar(tmp_var, var_val, return_type, node));
                                    
                                    pushToMain(push_after);
                                    
                                    tmp_var_types.push({
                                        name: tmp_var,
                                        type: return_type.type,
                                        ndim: return_type.ndim,
                                        dim: return_type.dim,
                                        ismatrix: return_type.ismatrix,
                                        isvector: numel(return_type.dim) > 1 && !return_type.ismatrix,
                                        ispointer: return_type.ispointer,
                                        isstruct: false,
                                        initialized: true,
                                        scope: findVarScope(node, block_idxs, current_code, debug)
                                    });
                                    return tmp_var;
                                } else {
                                    return var_val;
                                }
                            }
                        }
                        
                        
                        
                    // Is a subscript
                    } else {
                        var tmp_var = generateTmpVar("tmp");
                        // only use indexM if subscript is on rhs
                        let lhs_flag = false;
                        if (node.parent.type == g.SyntaxType.Assignment) {
                            if (node.parent.leftNode.text == node.text) {
                                lhs_flag = true;
                            }
                        }
                        
                        let index = [];
                        
                        let tmp_d3 = generateTmpVar("d3_");
                        let tmp_d2 = generateTmpVar("d2_");
                        let tmp_d1 = generateTmpVar("d1_");
                        let tmp_d0 = generateTmpVar("d0_");
                        let tmp_var1 = generateTmpVar("tmp_");
                        
                        let obj3 = tmp_tbl.find(x => x.name == "d0_");
                        let flat_idx = getSubscriptIdx(node, obj3.count);

                        if (node.namedChildCount == 2) {
                            //let obj2 = tmp_var_types.find(x => x.name === node.valueNode.text);
                            //let dim = obj2.dim;
                            //index = rowMajorFlatIdx(obj3.count, dim, node.namedChildren[1].text, lhs_flag);
                            index = flat_idx;
                            
                        } else {
                            for (let i=1; i<node.namedChildCount; i++) {
                                index.push(transformNode(node.namedChildren[i]));
                            }
                        }
                        
                        if (!lhs_flag) { // subscript is on rhs
                            let obj = alias_tbl.find(x => x.name === node.text);
                            let [type, , , , , , ] = inferType(node.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                            if (obj == null || obj == undefined) {
                                pushToMain(`${type} ${tmp_var};`);
                                if (index.length == 1) {
                                    let isnum = /^\d+$/.test(index[0]);
                                    if (isnum) {
                                        index[0] = `${Number(index[0]) + 1}`;
                                    } else {
                                        index[0] = index[0].replace(/-1/, '');
                                    }
                                    //index = index[0].concat("+1");
                                }
                
                                pushToMain(`indexM(${transformNode(node.valueNode)}, &${tmp_var}, ${index.length}, ${index.join(", ")});`);
                                //pushToMain(`indexM(${node.valueNode.text}, &${tmp_var}, ${index.length}, ${index.join(", ")});`);
                                let scope = findVarScope(node, block_idxs, current_code, debug);

                                alias_tbl = pushAliasTbl(alias_tbl, node.text, tmp_var, node);
                                
                                tmp_var_types.push({
                                    name: tmp_var,
                                    type: type,
                                    ndim: flat_idx.length,
                                    dim: [flat_idx.length],
                                    ismatrix: flat_idx.length > 1,
                                    isvector: false,
                                    ispointer: false,
                                    isstruct: false,
                                    initialized: true,
                                    scope: scope
                                });
                            } else if (node.startIndex < obj.scope[0] || node.startIndex > obj.scope[1]){
                                pushToMain(`${type} ${tmp_var};`);
                                if (index.length == 1) {
                                    let isnum = /^\d+$/.test(index[0]);
                                    if (isnum) {
                                        index[0] = `${Number(index[0]) + 1}`;
                                    } else {
                                        index[0] = index[0].replace(/-1/, '');
                                    }
                                    //index = index[0].concat("+1");
                                }
                                pushToMain(`indexM(${transformNode(node.valueNode)}, &${tmp_var}, ${index.length}, ${index.join(", ")});`);
                                let scope = findVarScope(node, block_idxs, current_code, debug);
                                alias_tbl.push({
                                    name: node.text,
                                    tmp_var: tmp_var,
                                    scope: scope
                                });
                                
                                tmp_var_types.push({
                                    name: tmp_var,
                                    type: type,
                                    ndim: flat_idx.length,
                                    dim: [flat_idx.length],
                                    ismatrix: flat_idx.length > 1,
                                    isvector: false,
                                    ispointer: false,
                                    isstruct: false,
                                    initialized: true,
                                    scope: scope
                                });
                            } else {
                                tmp_var = obj.tmp_var;
                            }
                        }
                        
                        return tmp_var;
                    }
                }    
                break;
            }
            
            case g.SyntaxType.ElseifClause: {
                let expression = [];
                pushToMain("} else if (" + transformNode(node.conditionNode) + ") {");
                // come back here
                pushToMain(transformNode(node.consequenceNode));
                //pushToMain("\n}")
                return null;
                break;
            } 
            case g.SyntaxType.ElseClause: {
                let expression = [];
                pushToMain("} else {");
                pushToMain(transformNode(node.bodyNode));
                /*for (let i = 0; i < node.bodyNode.namedChildCount; i ++) {
                    pushToMain(transformNode(node.bodyNode.namedChildren[i]));
                }*/
                //pushToMain("\n}")
                return null;
                break;
            }
            
            // TO DO: FIX STUFF WITH SCOPE IN ADDITION
            case g.SyntaxType.Identifier: {
                // if identifier is on lhs return itself
                if (node.parent.type == g.SyntaxType.Matrix) {
                    if (node.parent.parent.type == g.SyntaxType.Assignment) {
                        let re = new RegExp(`\\b${node.text}\\b`);
                        if (re.test(node.parent.text)) {
                            return node.text;
                        }
                    }
                }   
                if (node.parent.type == g.SyntaxType.Assignment) {
                    if (node.parent.leftNode.text == node.text) {
                        return node.text;
                    }
                }
                
                let obj = filterByScope(alias_tbl, node.text, node, 0);
                            
                if (obj != null && obj != undefined) {
                    let obj2 = filterByScope(tmp_var_types, obj.tmp_var, node, 0);
                    if (obj2 != null && obj2 != undefined) {
                        // if 1x1 matrix "flatten" to regular int, double, or complex
                        if (obj2.ismatrix && obj2.dim.every(x => x === 1) && node.parent.type == g.SyntaxType.CallOrSubscript) {
                            let obj3 = alias_tbl.find(x => x.name === obj.tmp_var && x.tmp_var.includes("[0]") &&
                                node.startIndex > x.scope[0] && node.endIndex < x.scope[1]);
                            if (obj3 == null || obj3 == undefined) {
                                let tmp_var = generateTmpVar("tmp");
                                tmp_var_types.push({
                                    name: tmp_var,
                                    type: obj2.type,
                                    ndim: 1,
                                    dim: [1],
                                    ismatrix: false,
                                    isvector: false,
                                    ispointer: true,
                                    isstruct: false,
                                    initialized: true,
                                    scope: findVarScope(node, block_idxs, current_code, debug)
                                });
                                alias_tbl = pushAliasTbl(alias_tbl, obj.tmp_var, `${tmp_var}[0]`, node);
                                pushToMain(`${obj2.type} * ${tmp_var} = ${obj2.type.charAt(0)}_to_${obj2.type.charAt(0)}(${obj.tmp_var});`);
                                return `${tmp_var}[0]`;
                            } else {
                                return obj3.tmp_var;
                            }
                        }
                    }
                    
                    return obj.tmp_var;
                } 
                
                let obj4 = filterByScope(tmp_var_types, node.text, node, 0);
                if (obj4 != null && obj4 != undefined) {
                    // if 1x1 matrix "flatten" to regular int, double, or complex
                    if (obj4.ismatrix && obj4.dim.every(x => x === 1) && node.parent.type == g.SyntaxType.CallOrSubscript) {
                        let obj5 = alias_tbl.find(x => x.name === node.text && x.tmp_var.includes("[0]") &&
                            node.startIndex > x.scope[0] && node.endIndex < x.scope[1]);
                        if (obj5 == null || obj5 == undefined) {
                            let tmp_var = generateTmpVar("tmp");
                            tmp_var_types.push({
                                name: tmp_var,
                                type: obj4.type,
                                ndim: 1,
                                dim: [1],
                                ismatrix: false,
                                isvector: false,
                                ispointer: true,
                                isstruct: false,
                                initialized: true,
                                scope: findVarScope(node, block_idxs, current_code, debug)
                            });
                            alias_tbl = pushAliasTbl(alias_tbl, node.text, `${tmp_var}[0]`, node);
                            pushToMain(`${obj4.type} * ${tmp_var} = ${obj4.type.charAt(0)}_to_${obj4.type.charAt(0)}(${node.text});`);
                            return `${tmp_var}[0]`;
                        } else {
                            return obj5.tmp_var;
                        }
                    }
                }
                
                return node.text;
                
                break;
            }
            
            // Basic types
            //case g.SyntaxType.Ellipsis:
            case g.SyntaxType.String:
            case g.SyntaxType.Attribute:
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
                //let expression = slice2list(node);
                //return `{${expression.join(", ")}}`;
                
                let children_vals = []
                
                for (let i=0; i<node.namedChildCount; i++) {
                    let child = node.namedChildren[i];
                    let [child_type,,,,,, c] = inferType(child, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                    custom_functions = c;
                    
                    if (child_type == "keyword") {
                        
                        let [,ndim,dim,,,, c] = inferType(node.parent.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                        custom_functions = c;
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
        
                let [type, ndim, dim, , , ,] = inferType(node, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                let numel = dim.reduce(function(a, b) {return a * b;});
                
                let expression = [];
                let tmp_vec = generateTmpVar("vec");
                expression.push(`${type} ${tmp_vec}[${numel}];`);
                expression.push(`
for (int i = ${start}; ${start} + ${step}*i < ${stop}; i++) {
    ${tmp_vec}[i] = ${start} + ${step}*i;
}
                `)
                pushToMain(expression.join("\n"));
                return tmp_vec;
            }
            
            case g.SyntaxType.Matrix: {
                let [type, ndim, dim, , , ,] = inferType(node, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                
                if (ndim == 2 && dim.some(x => x === 1)) { // vector
                    let tmp_vec = generateTmpVar("vec");
                    let expression = [];
                    for (let child of node.namedChildren) {
                        expression.push(child.text);
                    }
                    
                    pushToMain(`${type} ${tmp_vec}[${numel(dim)}] = {${expression.join(", ")}};`);
                    
                    tmp_var_types.push({
                        name: tmp_vec,
                        type: type,
                        ndim: 1,
                        dim: [numel(dim)],
                        ismatrix: false,
                        isvector: true,
                        ispointer: false,
                        isstruct: false,
                        initialized: true,
                        scope: findVarScope(node, block_idxs, current_code, debug)
                    });
                    
                    return tmp_vec;
                    
                } else { // matrix
                    let tmp_mat = generateTmpVar("mat");
                    pushToMain(initializeMatrix(node, tmp_mat, ndim, dim, type));
                    
                    tmp_var_types.push({
                        name: tmp_mat,
                        type: type,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: true,
                        isvector: false,
                        ispointer: false,
                        isstruct: false,
                        initialized: true,
                        scope: findVarScope(node, block_idxs, current_code, debug)
                    });
            
                    return tmp_mat;
                }
                
            }
        }
    }
    
    // Return args, arg_types, outs from function
    function parseNode(node, ignore_parent) {
        if (debug == 1) {
            console.log("parseNode");
        }
    
        if (node.parent.type == g.SyntaxType.Assignment && ignore_parent == false) {
            return parseNode(node.parent, false);
        } else {
            switch (node.type) {
                case g.SyntaxType.Assignment: {
                    var left_node = node.leftNode;
                    var right_node = node.rightNode;
                    break;
                }
                case g.SyntaxType.FunctionDefinition: {
                    node = parseFunctionDefNode(node);
                    if (node.return_variableNode != undefined) {
                        left_node = node.return_variableNode.firstNamedChild;
                    } else {
                        left_node = null;
                    }
                    var right_node = node.parametersNode;
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
                case g.SyntaxType.FunctionDefinition:
                case g.SyntaxType.CellSubscript:
                case g.SyntaxType.CallOrSubscript: {

                    for (let i = 1; i < right_node.namedChildCount; i++) {
                        
                        args.push(right_node.namedChildren[i])
                        
                        /*let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(right_node.namedChildren[i], tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                        custom_functions = c;
                        arg_types.push({
                            type: type, 
                            ndim: ndim, 
                            dim: dim, 
                            ismatrix: ismatrix, 
                            ispointer: ispointer,
                            isstruct: isstruct
                        });*/
                    }
                    break;
                }
                case g.SyntaxType.ComparisonOperator:
                case g.SyntaxType.BooleanOperator:
                case g.SyntaxType.BinaryOperator: {
                    let [l_type, l_ndim, l_dim, l_ismatrix, l_ispointer, l_isstruct, c1] = inferType(right_node.leftNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                    custom_functions = c1;
                    let [r_type, r_ndim, r_dim, r_ismatrix, r_ispointer, r_isstruct, c2] = inferType(right_node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                    custom_functions = c2;
                    /*arg_types.push({
                        type: l_type, 
                        ndim: l_ndim, 
                        dim: l_dim, 
                        ismatrix: l_ismatrix, 
                        ispointer: l_ispointer,
                        isstruct: l_isstruct
                    });
                    arg_types.push({
                        type: r_type, 
                        ndim: r_ndim, 
                        dim: r_dim, 
                        ismatrix: r_ismatrix, 
                        ispointer: r_ispointer,
                        isstruct: r_isstruct
                    });*/

                    args.push(right_node.leftNode);
                    args.push(right_node.rightNode);
                    
                    break;
                }
                case g.SyntaxType.UnaryOperator:
                case g.SyntaxType.TransposeOperator: {
                    let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(right_node.argumentNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                    custom_functions = c;
                    /*arg_types.push({
                        type: type, 
                        ndim: ndim, 
                        dim: dim, 
                        ismatrix: ismatrix, 
                        ispointer: ispointer,
                        isstruct: isstruct
                    });*/
                    
                    args.push(right_node.argumentNode);

                    break;
                }
            }

            let outs = [];
            let is_subscript = [];
            if (left_node == null) {
            } else if (left_node.type == g.SyntaxType.Matrix) {
                for (let child of left_node.namedChildren) {
                    
                    if (child.type == g.SyntaxType.CallOrSubscript || child.type == g.SyntaxType.CellSubscript) {
                        is_subscript.push(true);
                    }
                    outs.push(child);
                }
            } else {
                
                if (left_node.type == g.SyntaxType.CallOrSubscript || left_node.type == g.SyntaxType.CellSubscript) {
                    is_subscript.push(true);
                } 
                outs.push(left_node);
            }
            return [args, outs, is_subscript];
            
        }
    }
    // Initialize matrices
    // -----------------------------------------------------------------------------
    
    function initializeMatrix(node, name, ndim, dim, type) {
        let obj = type_to_matrix_type.find(x => x.type === type);
        
        let expression = [];
        let tmp_ndim = generateTmpVar("ndim");
        let tmp_dim = generateTmpVar("dim");
        let scope = findVarScope(node, block_idxs, current_code, debug);
        
        expression.push(`int ${tmp_ndim} = ${ndim};`);
        tmp_var_types.push({
            name: tmp_ndim,
            type: 'int',
            ndim: 1,
            dim: [1],
            ismatrix: false,
            isvector: false,
            ispointer: false,
            isstruct: false,
            initialized: true,
            scope: scope
        });
        expression.push(`int ${tmp_dim}[${ndim}] = {${dim}};`);
        tmp_var_types.push({
            name: tmp_dim,
            type: 'int',
            ndim: dim.length,
            dim: [dim.length],
            ismatrix: false,
            isvector: false,
            ispointer: false,
            isstruct: false,
            initialized: true,
            scope: scope
        });
        
        
        let obj2 = filterByScope(tmp_var_types, name, node, 0);
        if (obj2 != null && obj2 != undefined) {
            if (obj2.initialized || name.indexOf("[")>-1) {
                expression.push(`${name} = createM(${tmp_ndim}, ${tmp_dim}, ${obj.matrix_type});`)    
            } else {
                expression.push(`Matrix * ${name} = createM(${tmp_ndim}, ${tmp_dim}, ${obj.matrix_type});`)
                //tmp_var_types = tmp_var_types.filter(function(e) { return e.name !== name });
                tmp_var_types = tmp_var_types.filter(function(e) { return JSON.stringify(e) !== JSON.stringify(obj2) });
                obj2.initialized = true;
                tmp_var_types.push(obj2);
            }
        } else {
            if (name.indexOf("[")>-1) {
                expression.push(`${name} = createM(${tmp_ndim}, ${tmp_dim}, ${obj.matrix_type});`)
            } else {
                expression.push(`Matrix * ${name} = createM(${tmp_ndim}, ${tmp_dim}, ${obj.matrix_type});`)
            }
        }
        let tmp_input = generateTmpVar("input");
        expression.push(`${type} *${tmp_input} = NULL;`);
        
        let numel = dim.reduce(function(a, b) {return a * b;});
    	expression.push(`${tmp_input} = malloc( ${numel}*sizeof(*${tmp_input}));`);
    	
    	var j = 0;
    	for (let i=0; i<node.childCount; i++) {
            if (node.children[i].isNamed) {
                //let transform_child = node.children[i].text;
                let transform_child = transformNode(node.children[i]);
                if (obj.matrix_type == 3)
                    expression.push(`${tmp_input}[${j}][] = ${transform_child.replace(/'/g, '"')};`);
                else {
                    expression.push(`${tmp_input}[${j}] = ${transform_child};`);
                }
                j++;
            }
    	}
    	
    	expression.push(`writeM( ${name}, ${numel}, ${tmp_input});`)
    	expression.push(`free(${tmp_input});`)
    	return "\n" + expression.join("\n") + "\n";
    }
    
    // Print matrix functions
    // -----------------------------------------------------------------------------
    function printMatrixFunctions(node) {
        if (debug == 1) {
            console.log("printMatrixFunctions");
        }
    
        let [args1, outs, is_subscript] = parseNode(node, false);
        let arg_types = [];
        let args = [];
        
        for (let arg of args1) {
            args.push(transformNode(arg));
            let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
            custom_functions = c;
            arg_types.push({
                type: type, 
                ndim: ndim, 
                dim: dim, 
                ismatrix: ismatrix, 
                isvector: numel(dim) > 1 && !ismatrix,
                ispointer: ispointer,
                isstruct: isstruct
            });
        }
        for (let i = 0; i < outs.length; i ++) {
            outs[i] = outs[i].text;
        }
        
        let obj = operatorMapping.find(x => x.fun_matlab === node.operatorNode.type );
        let return_type = obj.return_type(args, arg_types, outs);
        let init_before = obj.init_before(args, arg_types, outs);
        let fun_c = obj.fun_c(args, arg_types, outs);
        if (obj.args_transform(args, arg_types, outs) != null) {
            args = obj.args_transform(args, arg_types, outs);
        }
        
        if (init_before != null && init_before != undefined) {
                            
            for (let i = 0; i < init_before.length; i++) {
                let tmp_var = generateTmpVar(init_before[i].name);
                args[args.indexOf(init_before[i].name)] = tmp_var;
                args[args.indexOf("&" + init_before[i].name)] = "&" + tmp_var;
                for (let j = 0; j < init_before.length; j++) {
                    //unicorn
                    let re = new RegExp(`\\b${init_before[i].name}\\b`);
                    init_before[j].val = init_before[j].val.replace(re, tmp_var);
                }
                if (init_before[i].ismatrix) {
                    pushToMain(`Matrix * ${tmp_var} = ${init_before[i].val};`)
                } else {
                    if (init_before[i].ndim > 1) {
                        pushToMain(`${init_before[i].type} ${tmp_var}[${init_before[i].ndim}] = ${init_before[i].val};`)  
                    } else {
                        pushToMain(`${init_before[i].type} ${tmp_var} = ${init_before[i].val};`)
                    }
                }
                tmp_var_types.push({
                    name: tmp_var,
                    type: init_before[i].type,
                    ndim: init_before[i].ndim,
                    dim: init_before[i].dim,
                    ismatrix: init_before[i].ismatrix,
                    isvector: numel(init_before[i].dim) > 1 && !init_before[i].ismatrix,
                    ispointer: init_before[i].ispointer,
                    isstruct: init_before[i].isstruct,
                    initialized: true,
                    scope: findVarScope(node, block_idxs, current_code, debug)
                });
            }
        }
        
        if (fun_c == null) {
            switch (node.type) {
                case g.SyntaxType.UnaryOperator: {
                    //return `${node.operatorNode.type}${transformNode(node.argumentNode)}`;
                    return `${node.operatorNode.type}${args[0]}`;
                    break;
                }
                case g.SyntaxType.TransposeOperator: {
                    //return `${transformNode(node.argumentNode)}${node.operatorNode.type}`;
                    return `${args[0]}${node.operatorNode.type}`;
                    break;
                }
                case g.SyntaxType.ComparisonOperator:
                case g.SyntaxType.BooleanOperator:
                case g.SyntaxType.BinaryOperator: {
                    //return `${transformNode(node.leftNode)} ${node.operatorNode.type} ${transformNode(node.rightNode)}`;
                    return `${args[0]} ${node.operatorNode.type} ${args[1]}`;
                    break;
                }
            }
        } else {
            
            /*if (return_type.ismatrix) {
                var init_type = `Matrix *`; //come back
            } else if (return_type.ispointer) {
                var init_type = `${return_type.type} *`;
            } else {
                var init_type = `${return_type.type}`;
            }
            let tmp_var = generateTmpVar("mat");
            if (args == null) {
                pushToMain(`${init_type} ${tmp_var} = ${fun_c};`);
            } else {
                pushToMain(`${init_type} ${tmp_var} = ${fun_c}(${args.join(", ")});`);
            }*/
            let tmp_var = generateTmpVar("tmp");
            tmp_var_types.push({
                name: tmp_var,
                type: return_type.type,
                ndim: return_type.ndim,
                dim: return_type.dim,
                ismatrix: return_type.ismatrix,
                isvector: numel(return_type.dim) > 1 && !return_type.ismatrix,
                ispointer: return_type.ispointer,
                isstruct: false,
                initialized: true,
                scope: findVarScope(node, block_idxs, current_code, debug)
            });
            
            let var_val = fun_c;
            if (args != null) {
                var_val = `${fun_c}(${args.join(", ")})`;
            }
            pushToMain(initVar(tmp_var, var_val, tmp_var_types[tmp_var_types.length - 1], node));
            
            return tmp_var;
            
        }
    }
    
    // Print function declarations and definitions
    function printFunctionDefDeclare(node) {
        if (debug == 1) {
            console.log("printFunctionDefDeclare");
        }
    
        let obj = custom_functions.find(x => x.name === node.nameNode.text);
        if (obj != null) {
            pushToMain(`${node.nameNode.text}_placeholder`);
            for (let child of node.bodyNode.namedChildren) {
                pushToMain(transformNode(child));
            }
            
            let [, outs, ] = parseNode(node, false);
            for (let i = 0; i < outs.length; i ++) {
                outs[i] = transformNode(outs[i]);
            }
            let ptr_args = obj.ptr_args(obj.arg_types, outs);
            var param_list = [];
            for (let i = 0; i < node.parametersNode.namedChildCount; i++) {
                let param = node.parametersNode.namedChildren[i];
                if (obj.arg_types[i].ismatrix) {
                    param_list.push(`Matrix * ${param.text}`);
                } else {
                    param_list.push(`${obj.arg_types[i].type} ${param.text}`);
                }
            }

            let return_node = node.children[1].firstChild;
            //if (obj.return_type.ismatrix) {
            if (ptr_args != null) {
                var ptr_declaration = [];
                for (let i = 0; i < return_node.namedChildCount; i++) {
                    let return_var = return_node.namedChildren[i];
                    //ptr_declaration.push(`*p_${return_var.text} = ${return_var.text};`);
                    //ptr_declaration.push(`*p_${return_var.text} = ${transformNodeByName(return_var.text, return_var)};`);
                    let tmp = transformNodeByName(return_var.text, return_var);
                    ptr_declaration.push(`*p_${return_var.text} = ${tmp};`);
                    
                    if (tmp !== return_var.text) {
                        let [type, ndim, dim, ismatrix, , , ] = inferTypeByName(tmp, node, tmp_var_types, custom_functions, alias_tbl, debug);
                        ptr_args[i].type = type;
                        ptr_args[i].ndim = ndim;
                        ptr_args[i].dim = dim;
                        ptr_args[i].ismatrix = ismatrix;
                    }
                    
                    // come back here
                    if (ptr_args[i].ismatrix) {
                        param_list.push(`Matrix ** p_${return_var.text}`);
                    } else {
                        param_list.push(`${ptr_args[i].type}* p_${return_var.text}`);
                    }
                }
                var ptr_declaration_joined = ptr_declaration.join("\n");
                
                if (param_list.length == 0) {
                    var param_list_joined = "void";
                } else {
                    var param_list_joined = param_list.join(", ");
                }

                function_declarations.push(`void ${node.nameNode.text}(${param_list_joined});`);
                //pushToMain(`\nvoid ${node.nameNode.text}(${param_list_joined}) {`);
                replaceMain(`\nvoid ${node.nameNode.text}(${param_list_joined}) {`, `${node.nameNode.text}_placeholder`, 1);
            } else {
                if (param_list.length == 0) {
                    var param_list_joined = "void";
                } else {
                    var param_list_joined = param_list.join(", ");
                }
                
                var return_statement = null
                if (obj.return_type == null) {
                    var return_type = "void";
                } else {
                    if (obj.return_type.ismatrix) {
                        var return_type = "Matrix *";
                    } else if (obj.return_type.ispointer) {
                        var return_type = `${obj.return_type.type} *`;
                    } else {
                        var return_type = `${obj.return_type.type}`;
                    }
                    return_statement = `return ${outs[0]};`;
                }

                function_declarations.push(`${return_type} ${node.nameNode.text}(${param_list_joined});`);
                //pushToMain(`\n${return_type} ${node.nameNode.text}(${param_list_joined}) {`);
                replaceMain(`\n${return_type} ${node.nameNode.text}(${param_list_joined}) {`, `${node.nameNode.text}_placeholder`, 1);
            }
            
            if (ptr_declaration != undefined) {
                pushToMain(ptr_declaration.join("\n"));
            }

            pushToMain(return_statement);
            pushToMain("}");
        }
    }
    
    
    // Generate header files
    function generateHeader() {
        if (debug == 1) {
            console.log("generateHeader");
        }
        
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
        if (debug == 1) {
            console.log("slice2list");
        }
        
        let children_vals = []
                
        for (let i=0; i<node.namedChildCount; i++) {
            let child = node.namedChildren[i];
            let [child_type,,,,,, c] = inferType(child, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
            custom_functions = c;
            
            if (child_type == "keyword") {
                
                let [,ndim,dim,,,, c] = inferType(node.parent.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                custom_functions = c;
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
        
        // UNICORN
        let list = [];
        for (let i = start; i <= stop; i += step) {
            list.push(i);
        }
        return list;
    }
    
    function matrix2list(node) {
        if (debug == 1) {
            console.log("matrix2list");
        }
        
        let list = []
                
        for (let child of node.namedChildren) {
            list.push(transformNode(child));
        }
        return list;
    }
    
    
    function sub2idx(dim0_node, dim1_node, dim2_node, dim3_node, d0, d1, d2) {
        if (debug == 1) {
            console.log("sub2idx");
        }
        
        //var dim0 = dim0_node.text;
        //var dim1 = dim1_node.text;
        var dim0 = transformNode(dim0_node);
        var dim1 = transformNode(dim1_node);
        var dim2 = dim2_node;
        var dim3 = dim3_node;
        if (dim0_node.type == g.SyntaxType.Slice) {
            dim0 = slice2list(dim0_node);
        } else if (dim0_node.type == g.SyntaxType.Matrix) {
            dim0 = matrix2list(dim0_node);
        } else {
            dim0 = [transformNode(dim0_node)];
        }
        if (dim1_node.type == g.SyntaxType.Slice) {
            dim1 = slice2list(dim1_node);
        } else if (dim1_node.type == g.SyntaxType.Matrix) {
            dim1 = matrix2list(dim1_node);
        } else {
            dim1 = [transformNode(dim1_node)];
        }
        if (dim2_node == null) {
            dim2 = [1];
        } else {
            if (dim2_node.type == g.SyntaxType.Slice) {
                dim2 = slice2list(dim1_node);
            } else if (dim2_node.type == g.SyntaxType.Matrix) {
                dim2 = matrix2list(dim1_node);
            } else {
                dim2 = [transformNode(dim2_node)];
            }
        }
        if (dim3_node == null) {
            dim3 = [1];
        } else {
            if (dim3_node.type == g.SyntaxType.Slice) {
                dim3 = slice2list(dim1_node);
            } else if (dim3_node.type == g.SyntaxType.Matrix) {
                dim3 = matrix2list(dim1_node);
            } else {
                dim3 = [transformNode(dim3_node)];
            }
        }

        let idx = [];
        for (let i = 0; i < dim0.length; i++) {
            for (let j = 0; j < dim1.length; j++) {
                for (let k = 0; k < dim2.length; k++) {
                    for (let l = 0; l < dim3.length; l++) {
                        
                    idx.push(`(${dim1[j]}-1) + (${dim0[i]}-1)*${d1} + (${dim2[k]}-1)*${d0}*${d1} + (${dim3[l]}-1)*${d0}*${d1}*${d2}`);
                
                    }
                }
            }
        }
        return idx;
        
    }
    
    function getSubscriptIdx(node, count) {
        if (debug == 1) {
            console.log("getSubscriptIdx");
        }

        let lhs_flag = false;
        if (node.parent.type == g.SyntaxType.Assignment) {
            if (node.parent.leftNode.text == node.text) {
                lhs_flag = true;
            }
        }
                        
        let obj = filterByScope(tmp_var_types, node.valueNode.text, node, 0);
        let dim = obj.dim;
        /*if (dim[1] == undefined) {
            dim.push(1);
        }
        if (dim[2] == undefined) {
            dim.push(1);
        }*/
        if (dim[3] == 1) {
            dim.pop();
        }
        if (dim[2] == 1) {
            dim.pop();
        }
        let idx = [node.namedChildren[1].text];
        // already a linear idx
        if (node.namedChildCount == 2) {
            if (node.namedChildren[1].type == g.SyntaxType.Slice) {
                //var list = slice2list(node.namedChildren[1])
                idx = slice2list(node.namedChildren[1])
            } else if (node.namedChildren[1].type == g.SyntaxType.Matrix) {
                //var list = matrix2list(node.namedChildren[1])
                idx = matrix2list(node.namedChildren[1])
            } else {
                //idx = rowMajorFlatIdx(count, dim, node.namedChildren[1].text, lhs_flag);
                idx = rowMajorFlatIdx(count, dim, transformNode(node.namedChildren[1]), lhs_flag);
            }
            
        }
        else {
            if (node.namedChildCount == 3) {
                idx = sub2idx(
                    node.namedChildren[1], 
                    node.namedChildren[2],
                    null,
                    null,
                    dim[0],
                    dim[1],
                    1
                );
            } else if (node.namedChildCount == 4) {
                idx = sub2idx(
                    node.namedChildren[1], 
                    node.namedChildren[2],
                    node.namedChildren[3],
                    null,
                    dim[0],
                    dim[1],
                    1
                );
            } else if (node.namedChildCount == 5) {
                idx = sub2idx(
                    node.namedChildren[1], 
                    node.namedChildren[2],
                    node.namedChildren[3],
                    node.namedChildren[4],
                    dim[0],
                    dim[1],
                    dim[2],
                );
            }
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
    if (!fileIsFunction(tree, debug)){
    generated_code.push(
`\n// Entry-point function
int ${filename}(void) {`);
    }
    
    generated_code.push("\n" + main_function.join("\n"));
    if (!fileIsFunction(tree, fileIsFunction)){
        generated_code.push("return 0;");
        generated_code.push("}\n");
    }

    if (function_definitions.length != 0) {
        generated_code.push("\n// Subprograms");
        generated_code.push(function_definitions.join("\n"));
    }
    
    generateHeader();
    
    writeToFile(out_folder, filename + ".c", generated_code.join("\n"));
    
    return [generated_code.join("\n"), header.join("\n"), var_types, custom_functions];
}