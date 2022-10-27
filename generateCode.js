"use strict";
exports.__esModule = true;
exports.generateCode = void 0;
var fs = require("fs");
var path = require("path");
var ts = require("typescript");
var helperFunctions_1 = require("./helperFunctions");
var typeInference_1 = require("./typeInference");
var treeTraversal_1 = require("./treeTraversal");
var helperFunctions_2 = require("./helperFunctions");
var builtinFunctions_1 = require("./builtinFunctions");
var builtin_funs = builtinFunctions_1.builtin_functions;
// Main
function generateCode(filename, tree, out_folder, custom_functions, classes, var_types, file) {
    var entry_fun_node = (0, treeTraversal_1.findEntryFunction)(tree);
    var loop_iterators = [];
    function pushToMain(expression) {
        if (expression != null) {
            if (current_code == "main") {
                main_function.push(expression);
            }
            else if (entry_fun_node != null) {
                if (entry_fun_node.nameNode.text == current_code) {
                    main_function.push(expression);
                }
            }
            else {
                function_definitions.push(expression);
            }
        }
    }
    function insertMain(expression, search_exp, num_back) {
        // num_back: if more than one instance of search_exp is found, which instance to choose as formatted as
        // matches[matches.length - num_back]
        var idx = main_function.reduce(function (a, e, i) {
            if (e.includes(search_exp))
                a.push(i);
            return a;
        }, []);
        if (idx.length > 1) {
            idx = idx[idx.length - num_back];
        }
        if (expression != null) {
            if (current_code == "main") {
                main_function.splice(idx, 0, expression);
            }
            else if (entry_fun_node != null) {
                if (entry_fun_node.nameNode.text == current_code) {
                    main_function.splice(idx, 0, expression);
                }
            }
            else {
                var idx_1 = function_definitions.reduce(function (a, e, i) {
                    if (e.includes(search_exp))
                        a.push(i);
                    return a;
                }, []);
                if (idx_1.length > 1) {
                    idx_1 = idx_1[idx_1.length - num_back];
                }
                function_definitions.splice(idx_1, 0, expression);
            }
        }
    }
    var function_definitions = [];
    var function_declarations = [];
    var numCellStruct = 0;
    var generated_code = [];
    var main_function = [];
    var header = [];
    var link = ["//Link\n#include <stdio.h>\n#include <stdbool.h>\n#include <complex.h>\n#include <string.h>\n#include <matrix.h>\n#include <".concat(filename, ".h>")];
    var cursor_adjust = false;
    var current_code = "main";
    var tmpVarCnt = 0;
    function generateTmpVar() {
        tmpVarCnt += 1;
        return "tmp" + tmpVarCnt;
    }
    var alias_tbl = [];
    var main_queue = [];
    var type_to_matrix_type = [
        { type: "integer", matrix_type: 0 },
        { type: "int", matrix_type: 0 },
        { type: "float", matrix_type: 1 },
        { type: "complex", matrix_type: 2 },
        { type: "char", matrix_type: 3 }
    ];
    function main() {
        var cursor = tree.walk();
        do {
            var c = cursor;
            var node = c.currentNode;
            current_code = "main";
            switch (node.type) {
                case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                    current_code = node.nameNode.text;
                    printFunctionDefDeclare(node);
                    break;
                }
                case "comment" /* g.SyntaxType.Comment */:
                case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                    var expression = transformNode(node);
                    if (expression != ";" && expression != null) {
                        pushToMain(expression);
                    }
                    break;
                }
                case "if_statement" /* g.SyntaxType.IfStatement */:
                case "while_statement" /* g.SyntaxType.WhileStatement */:
                case "for_statement" /* g.SyntaxType.ForStatement */: {
                    //pushToMain("\n" + transformNode(node));
                    transformNode(node);
                    break;
                }
            }
        } while ((0, treeTraversal_1.gotoPreorderSucc_OnlyMajorTypes)(cursor));
    }
    // Transform node
    function transformNode(node) {
        // at each iteration, check each element of mainQueue, if condition true then push expression
        var idx = 0;
        for (var i = 0; i < main_queue.length; i++) {
            var result = ts.transpile(main_queue[idx].condition);
            var runnalbe = eval(result);
            if (runnalbe) {
                pushToMain(main_queue[idx].expression);
                main_queue.splice(idx, 1);
                idx = idx - 1;
            }
            idx = idx + 1;
        }
        switch (node.type) {
            // Comments
            // TO DO: multiline comments
            case "comment" /* g.SyntaxType.Comment */: {
                return node.text.replace("%", "//");
                break;
            }
            case "if_statement" /* g.SyntaxType.IfStatement */: {
                var expression = [];
                expression.push("if (" + transformNode(node.conditionNode) + ")");
                for (var i = 2; i < node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        expression.push(transformNode(node.children[i]));
                    }
                }
                return "\n" + expression.join("\n");
                break;
            }
            case "while_statement" /* g.SyntaxType.WhileStatement */: {
                var expression = [];
                expression.push("while (" + transformNode(node.conditionNode) + ")");
                for (var i = 2; i < node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        expression.push(transformNode(node.children[i]));
                    }
                }
                return "\n" + expression.join("\n");
                break;
            }
            case "for_statement" /* g.SyntaxType.ForStatement */: {
                var expression1 = [];
                var expression2 = [];
                if (node.rightNode.type == "slice" /* g.SyntaxType.Slice */) {
                    expression1.push("int ".concat(node.leftNode.text, ";"));
                    expression2.push("for (".concat(node.leftNode.text, " = "));
                    expression2.push("".concat(node.rightNode.children[0].text, ";"));
                    loop_iterators.push(node.leftNode.text);
                    if (node.rightNode.childCount == 5) {
                        expression2.push("".concat(node.leftNode.text, " <= ").concat(node.rightNode.children[4].text, ";"));
                        expression2.push("".concat(node.leftNode.text, " += ").concat(node.rightNode.children[2].text));
                    }
                    else {
                        expression2.push("".concat(node.leftNode.text, " <= ").concat(node.rightNode.children[2].text, ";"));
                        expression2.push("++ ".concat(node.leftNode.text));
                    }
                    expression1.push(expression2.join(" ") + ") {");
                }
                else if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    //      Example: 
                    // 		double foo;
                    // 		indexM(m, &foo, m->ndim, row, column[, index3[, index4]])
                    // 		foo is now equal to the value of the specified index.
                    var tmp_var1 = generateTmpVar(); // the matrix
                    var tmp_var2 = generateTmpVar(); // the iterating variable
                    var _a = (0, typeInference_1.inferType)(node.rightNode, var_types, custom_functions, classes, file), type = _a[0], ndim = _a[1], dim = _a[2], c = _a[6];
                    custom_functions = c;
                    var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
                    if (obj != null) {
                        expression1.push(initializeMatrix(node.rightNode, tmp_var1, ndim, dim, type));
                    }
                    expression1.push("\n".concat(type, " ").concat(node.leftNode.text, ";"));
                    expression1.push("int ".concat(tmp_var2, ";"));
                    expression2.push("for (".concat(tmp_var2, " = 1;"));
                    expression2.push("".concat(tmp_var2, " <= ").concat(node.rightNode.namedChildCount, ";"));
                    // expression2.push(`++${tmp_var2}`);
                    expression2.push("".concat(tmp_var2, "++"));
                    expression1.push(expression2.join(" ") + ") {");
                    expression1.push("indexM(".concat(tmp_var1, ", &").concat(node.leftNode.text, ", 1, ").concat(tmp_var2, ");"));
                    // node.leftNode now equal to value of matrix tmp_var1 at index tmp_var2
                    loop_iterators.push(tmp_var2);
                }
                pushToMain("\n" + expression1.join("\n"));
                for (var _i = 0, _b = node.bodyNode.namedChildren; _i < _b.length; _i++) {
                    var child = _b[_i];
                    //expression1.push(transformNode(child));
                    pushToMain(transformNode(child));
                }
                pushToMain("\n}");
                var idx_2 = loop_iterators.indexOf(node.leftNode.text);
                if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    idx_2 = loop_iterators.indexOf(tmp_var2);
                }
                loop_iterators.splice(idx_2, 1);
                //return "\n" + expression1.join("\n") + "\n}";
                return null;
                break;
            }
            case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                var expression = transformNode(node.firstChild);
                if (expression != null) {
                    if (![";", "\n"].includes(expression.slice(-1))) {
                        return expression + ";";
                    }
                    else {
                        return expression;
                    }
                }
                else {
                    return null;
                }
                break;
            }
            case "parenthesized_expression" /* g.SyntaxType.ParenthesizedExpression */: {
                return "(" + transformNode(node.firstNamedChild) + ")";
                break;
            }
            // Assignment
            case "assignment" /* g.SyntaxType.Assignment */: {
                var _c = parseFunctionCallNode(node, false), args = _c[0], arg_types = _c[1], outs = _c[2], is_subscript = _c[3];
                var _d = (0, typeInference_1.inferType)(node.rightNode, var_types, custom_functions, classes, file), type = _d[0], ndim = _d[1], dim = _d[2], ismatrix = _d[3], ispointer = _d[4], isstruct = _d[5], c = _d[6];
                custom_functions = c;
                var init_flag = false;
                var lhs = null;
                if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "cell" /* g.SyntaxType.Cell */) {
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                    if (type == 'heterogeneous') {
                        var expression1 = [];
                        var expression2 = [];
                        expression1.push("\nstruct cell".concat(numCellStruct, " {"));
                        expression2.push("cell".concat(numCellStruct, " ").concat(outs[0], ";"));
                        for (var i = 0; i < node.rightNode.namedChildCount; i++) {
                            var child = node.rightNode.namedChildren[i];
                            var _e = (0, typeInference_1.inferType)(child, var_types, custom_functions, classes, file), child_type = _e[0], child_ndim = _e[1], child_dim = _e[2], child_ismatrix = _e[3], child_ispointer = _e[4], child_isstruct = _e[5], c_1 = _e[6];
                            custom_functions = c_1;
                            var numel = child_dim.reduce(function (a, b) { return a * b; });
                            if (child.type == "matrix" /* g.SyntaxType.Matrix */) {
                                expression1.push("Matrix f".concat(i, "[").concat(numel, "];"));
                                expression2.push(initializeMatrix(node.rightNode, "".concat(outs[0], ".f").concat(i), child_ndim, child_dim, type));
                            }
                            else if (child_type == 'char') {
                                expression1.push("".concat(child_type, " f").concat(i, "[").concat(numel, "];"));
                                expression2.push("strcpy(".concat(outs[0], ".f").concat(i, ", ").concat(child.text.replace(/'/g, '"'), ");"));
                            }
                            else {
                                expression1.push("".concat(child_type, " f").concat(i, ";"));
                                expression2.push("".concat(outs[0], ".f").concat(i, " = ").concat(child.text, ";"));
                            }
                        }
                        expression1.push("}\n");
                        numCellStruct += 1;
                        expression1.push(expression2.join("\n"));
                        pushToMain(expression1.join("\n") + "\n");
                    }
                    else {
                        var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
                        if (obj != null) {
                            pushToMain(initializeMatrix(node.rightNode, outs[0], ndim, dim, type));
                        }
                    }
                    lhs = null;
                }
                else if (node.rightNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                    var obj = classes.find(function (x) { return x.name === node.rightNode.valueNode.text; });
                    // Is a class
                    if (obj != null) {
                        var rhs = obj.name;
                    }
                    else {
                        var obj1 = custom_functions.find(function (x) { return x.name === node.rightNode.valueNode.text; });
                        var obj2 = builtin_funs.find(function (x) { return x.fun_matlab === node.rightNode.valueNode.text; });
                        if (obj1 != null && obj1 != undefined) {
                            lhs = obj1.outs_transform(outs);
                        }
                        else if (obj2 != null && obj2 != undefined) {
                            lhs = obj2.outs_transform(outs);
                        }
                    }
                    var rhs = transformNode(node.rightNode);
                    init_flag = true;
                }
                else {
                    var rhs = transformNode(node.rightNode);
                    init_flag = true;
                    //lhs = transformNode(node.leftNode);
                    // If LHS is subscript, use the tmp var generated by parseFunctionCallNode as out
                    if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                        lhs = outs[0];
                    }
                    else {
                        lhs = transformNode(node.leftNode);
                    }
                }
                if (lhs == null && rhs != undefined) {
                    pushToMain("".concat(rhs, ";"));
                }
                else if (init_flag) {
                    var var_type_1 = var_types.find(function (x) { return x.name === lhs; });
                    if (var_type_1 != null && var_type_1 != undefined) {
                        if (var_type_1.initialized && (var_type_1.type == type)) {
                            pushToMain("".concat(lhs, " = ").concat(rhs, ";"));
                        }
                        else {
                            if (ismatrix) {
                                pushToMain("Matrix * ".concat(lhs, " = ").concat(rhs, ";"));
                            }
                            else if (ispointer) {
                                pushToMain("".concat(type, " * ").concat(lhs, " = ").concat(rhs, ";"));
                            }
                            else {
                                pushToMain("".concat(type, " ").concat(lhs, " = ").concat(rhs, ";"));
                            }
                            var_types = var_types.filter(function (e) { return e.name !== var_type_1.name; });
                            var_type_1.initialized = true;
                            var_types.push(var_type_1);
                        }
                    }
                    else {
                        if (ismatrix) {
                            pushToMain("Matrix * ".concat(lhs, " = ").concat(rhs, ";"));
                        }
                        else if (ispointer) {
                            pushToMain("".concat(type, " * ").concat(lhs, " = ").concat(rhs, ";"));
                        }
                        else {
                            pushToMain("".concat(type, " ").concat(lhs, " = ").concat(rhs, ";"));
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
                // TO DO: if this is inside of a for loop then the getdataM function call should be outside of for body
                // When LHS is/contains subscript
                // void *memcpy(void *dest, const void * src, size_t n)
                var _f = parseFunctionCallNode(node.leftNode, true), left_args = _f[0];
                if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    for (var j = 0; j < node.leftNode.namedChildCount; j++) {
                        var child = node.leftNode.namedChildren[j];
                        // If element j of LHS matrix is a subscript
                        if (is_subscript[j]) {
                            // Convert to linear idx
                            var idx_3 = getSubscriptIdx(child);
                            pushToMain("void *data = getdataM(".concat(child.valueNode.text, ");"));
                            pushToMain("double* lhs_data = (double *)data;");
                            var _g = (0, typeInference_1.inferType)(outs[j], var_types, custom_functions, classes, file), ismatrix_1 = _g[3], c_2 = _g[6];
                            custom_functions = c_2;
                            // If RHS is matrix
                            if (ismatrix_1) {
                                pushToMain("void *rhs_data = getdataM(".concat(outs[j], ");"));
                                for (var i = 0; i < idx_3.length; i++) {
                                    // Copy data[i] to data2[i] 
                                    // pushToMain(`memcpy(&data[${idx[i]}], data2[${i}]);`); 
                                    pushToMain("lhs_data[".concat(idx_3[i], "] = rhs_data[").concat(i, "];"));
                                }
                                // If RHS not matrix
                            }
                            else {
                                for (var i = 0; i < idx_3.length; i++) {
                                    // Copy data[i] to outs[j][i]
                                    // pushToMain(`memcpy(&data2[${idx[i]}], ${outs[j]}[${i}]);`); 
                                    pushToMain("".concat(outs[j], "[").concat(i, "] = rhs_data[").concat(idx_3[i], "];"));
                                }
                            }
                            var tmp_var_1 = generateTmpVar();
                            pushToMain("int size = 1;\nfor (int i = 0 ; i < ndim ; i++)\n{\n\tsize *= dim[i];\n}\nMatrix *".concat(tmp_var_1, " = createM(ndim, dim, DOUBLE);\nwriteM(").concat(tmp_var_1, ", size, lhs_data);\nprintM(").concat(tmp_var_1, ");"));
                            alias_tbl.push({
                                name: child.valueNode.text,
                                tmp_var: tmp_var_1
                            });
                        }
                    }
                }
                else {
                    // If LHS is a subscript
                    if (is_subscript[0]) {
                        var num_back = 0;
                        for (var i = 0; i <= loop_iterators.length; i++) {
                            if (left_args.includes(loop_iterators[i])) {
                                num_back = num_back + 1;
                            }
                        }
                        // Convert to linear idx
                        var idx_4 = getSubscriptIdx(node.leftNode);
                        console.log(node.text);
                        console.log("IDX");
                        console.log(idx_4);
                        if (num_back == 0) {
                            pushToMain("void *data = getdataM(".concat(node.leftNode.valueNode.text, ");"));
                            pushToMain("double* lhs_data = (double *)data;");
                        }
                        else {
                            insertMain("void *data = getdataM(".concat(node.leftNode.valueNode.text, ");"), 'for', num_back);
                            insertMain("double* lhs_data = (double *)data;", 'for', num_back);
                        }
                        var _h = (0, typeInference_1.inferType)(outs[0], var_types, custom_functions, classes, file), ismatrix_2 = _h[3], c_3 = _h[6];
                        custom_functions = c_3;
                        // If RHS is matrix
                        if (ismatrix_2) {
                            pushToMain("void *rhs_data = getdataM(".concat(outs[0], ");"));
                            for (var i = 0; i < idx_4.length; i++) {
                                // Copy data[i] to data2[i]
                                // pushToMain(`memcpy(&data2[${idx[i]}], data3[${i}]);`); 
                                pushToMain("lhs_data[".concat(idx_4[i], "] = rhs_data[").concat(i, "];"));
                            }
                            // If RHS not matrix
                        }
                        else {
                            if (idx_4.length == 1) {
                                // pushToMain(`memcpy(&data2[${idx[0]}], &${outs[0]}, 1);`); 
                                pushToMain("lhs_data[".concat(idx_4[0], "] = ").concat(outs[0], ";"));
                            }
                            else {
                                for (var i = 0; i < idx_4.length; i++) {
                                    // Copy data[i] to outs[i]
                                    // pushToMain(`memcpy(&data2[${idx[i]}], &${outs[0]}[${i}], 1);`);
                                    pushToMain("lhs_data[".concat(idx_4[i], "] = ").concat(outs[0], "[").concat(i, "];"));
                                }
                            }
                        }
                        var tmp_var_2 = generateTmpVar();
                        var mq = {
                            expression: "int size = 1;\nfor (int i = 0 ; i < ndim ; i++)\n{\n\tsize *= dim[i];\n}\nMatrix *".concat(tmp_var_2, " = createM(ndim, dim, DOUBLE);\nwriteM(").concat(tmp_var_2, ", size, lhs_data);\nprintM(").concat(tmp_var_2, ");"),
                            condition: "loop_iterators.length == ".concat(loop_iterators.length - num_back, ";")
                        };
                        main_queue.push(mq);
                        alias_tbl.push({
                            name: node.leftNode.valueNode.text,
                            tmp_var: tmp_var_2
                        });
                    }
                }
                return null;
                break;
            }
            // Transform matrix operations
            case "binary_operator" /* g.SyntaxType.BinaryOperator */:
            case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
            case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
            case "transpose_operator" /* g.SyntaxType.TransposeOperator */:
            case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
                return printMatrixFunctions(node);
                break;
            }
            case "block" /* g.SyntaxType.Block */: {
                var expression = [];
                for (var _j = 0, _k = node.namedChildren; _j < _k.length; _j++) {
                    var child = _k[_j];
                    expression.push(transformNode(child));
                }
                return "{\n" + expression.join("\n") + "\n}";
                break;
            }
            case "cell_subscript" /* g.SyntaxType.CellSubscript */: {
                var index = [];
                for (var i = 1; i < node.namedChildCount; i++) {
                    index.push(transformNode(node.namedChildren[i]));
                }
                var obj = alias_tbl.find(function (x) { return x.name === node.text; });
                var tmp_var_3 = generateTmpVar();
                if (obj == null) {
                    pushToMain("double ".concat(tmp_var_3, ";"));
                    //pushToMain(`indexM(${node.valueNode.text}, &${tmp_var}, ${index.length}, ${index.join(", ")});`);
                    pushToMain("indexM(".concat(transformNode(node.valueNode), ", &").concat(tmp_var_3, ", ").concat(index.length, ", ").concat(index.join(", "), ");"));
                    alias_tbl.push({
                        name: node.text,
                        tmp_var: tmp_var_3
                    });
                }
                else {
                    tmp_var_3 = obj.tmp_var;
                }
                return tmp_var_3;
                break;
            }
            case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                // Is a custom function call
                var obj = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
                var _l = parseFunctionCallNode(node, false), args = _l[0], arg_types = _l[1], outs = _l[2], is_subscript = _l[3];
                if (obj != null) {
                    var ptr_args = obj.ptr_args(arg_types, outs);
                    if (ptr_args != null) {
                        var ptr_declaration = [];
                        for (var i = 0; i < ptr_args.length; i++) {
                            args.push("&".concat(ptr_args[i].name));
                            ptr_declaration.push("".concat(ptr_args[i].type, " ").concat(ptr_args[i].name, ";"));
                            var_types.push(ptr_args[i]);
                        }
                        pushToMain(ptr_declaration.join("\n"));
                    }
                    if (path.parse(obj.file).name !== path.parse(file).name) {
                        link.push("#include <".concat(path.parse(obj.file).name, ".h>"));
                    }
                    return "".concat(obj.name, "(").concat(args.join(", "), ")");
                }
                else {
                    // Is a builtin function call
                    var obj_1 = builtin_funs.find(function (x) { return x.fun_matlab === node.valueNode.text; });
                    if (obj_1 != null) {
                        //let return_type = obj.return_type(args, arg_types, outs);
                        pushToMain(obj_1.push_main_before(args, arg_types, outs));
                        var fun_c = obj_1.fun_c(arg_types, outs);
                        var tmp_var = generateTmpVar();
                        args = obj_1.args_transform(args, arg_types, outs);
                        var n_args = node.namedChildCount - 1;
                        if (n_args < obj_1.n_req_args) {
                            args = args.concat(obj_1.opt_arg_defaults.slice(0, obj_1.n_req_args - n_args));
                        }
                        var ptr_args = obj_1.ptr_args(arg_types, outs);
                        if (ptr_args != null) {
                            var ptr_declaration = [];
                            for (var i = 0; i < ptr_args.length; i++) {
                                args.push("&".concat(ptr_args[i].name));
                                ptr_declaration.push("".concat(ptr_args[i].type, " ").concat(ptr_args[i].name, ";"));
                                var_types.push(ptr_args[i]);
                            }
                            pushToMain(ptr_declaration.join("\n"));
                        }
                        //pushToMain(obj.push_main_after(args, arg_types, outs));
                        return "".concat(fun_c, "(").concat(args.join(", "), ")");
                        // Is a subscript
                    }
                    else {
                        var index = [];
                        for (var i = 1; i < node.namedChildCount; i++) {
                            index.push(transformNode(node.namedChildren[i]));
                        }
                        var obj_2 = alias_tbl.find(function (x) { return x.name === node.text; });
                        var tmp_var = generateTmpVar();
                        if (obj_2 == null) {
                            pushToMain("double ".concat(tmp_var, ";"));
                            pushToMain("indexM(".concat(transformNode(node.valueNode), ", &").concat(tmp_var, ", ").concat(index.length, ", ").concat(index.join(", "), ");"));
                            //pushToMain(`indexM(${node.valueNode.text}, &${tmp_var}, ${index.length}, ${index.join(", ")});`);
                            alias_tbl.push({
                                name: node.text,
                                tmp_var: tmp_var
                            });
                        }
                        else {
                            tmp_var = obj_2.tmp_var;
                        }
                        return tmp_var;
                    }
                }
                break;
            }
            case "elseif_clause" /* g.SyntaxType.ElseifClause */: {
                var expression = [];
                expression.push("else if (" + transformNode(node.conditionNode) + ")");
                expression.push(transformNode(node.consequenceNode));
                return expression.join("\n");
                break;
            }
            case "else_clause" /* g.SyntaxType.ElseClause */: {
                var expression = [];
                expression.push("else");
                expression.push(transformNode(node.bodyNode));
                return expression.join("\n");
                break;
            }
            case "identifier" /* g.SyntaxType.Identifier */: {
                var obj = alias_tbl.find(function (x) { return x.name === node.text; });
                if (obj != null) {
                    return obj.tmp_var;
                }
                else {
                    return node.text;
                }
                break;
            }
            // Basic types
            //case g.SyntaxType.Ellipsis:
            case "string" /* g.SyntaxType.String */:
            case "attribute" /* g.SyntaxType.Attribute */:
            //case g.SyntaxType.Identifier:
            case "integer" /* g.SyntaxType.Integer */:
            case "float" /* g.SyntaxType.Float */:
            case "true" /* g.SyntaxType.True */:
            case "false" /* g.SyntaxType.False */: {
                return node.text;
                break;
            }
            case "complex" /* g.SyntaxType.Complex */: {
                return node.firstChild.text + "*I";
            }
            case "slice" /* g.SyntaxType.Slice */: {
                var expression = slice2list(node);
                return "{".concat(expression.join(", "), "}");
            }
        }
    }
    // Return args, arg_types, outs from function
    function parseFunctionCallNode(node, ignore_parent) {
        if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */ && ignore_parent == false) {
            return parseFunctionCallNode(node.parent, false);
        }
        else {
            switch (node.type) {
                case "assignment" /* g.SyntaxType.Assignment */: {
                    var left_node = node.leftNode;
                    var right_node = node.rightNode;
                    break;
                }
                case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                    node = (0, helperFunctions_1.parseFunctionDefNode)(node);
                    if (node.return_variableNode != undefined) {
                        left_node = node.return_variableNode;
                    }
                    else if (node.namedChildren[0].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                        left_node = node.namedChildren[0];
                    }
                    else {
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
            var args = [];
            var arg_types = [];
            switch (right_node.type) {
                case "function_definition" /* g.SyntaxType.FunctionDefinition */:
                case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                    for (var i = 1; i < right_node.namedChildCount; i++) {
                        if (transformNode(right_node.namedChildren[i]) != undefined) {
                            args.push(transformNode(right_node.namedChildren[i]));
                        }
                        else {
                            args.push(right_node.namedChildren[i].text);
                        }
                        var _a = (0, typeInference_1.inferType)(right_node.namedChildren[i], var_types, custom_functions, classes, file), type = _a[0], ndim = _a[1], dim = _a[2], ismatrix = _a[3], ispointer = _a[4], isstruct = _a[5], c = _a[6];
                        custom_functions = c;
                        arg_types.push({
                            type: type,
                            ndim: ndim,
                            dim: dim,
                            ismatrix: ismatrix,
                            ispointer: ispointer,
                            isstruct: isstruct
                        });
                    }
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    var _b = (0, typeInference_1.inferType)(right_node.leftNode, var_types, custom_functions, classes, file), l_type = _b[0], l_ndim = _b[1], l_dim = _b[2], l_ismatrix = _b[3], l_ispointer = _b[4], l_isstruct = _b[5], c1 = _b[6];
                    custom_functions = c1;
                    var _c = (0, typeInference_1.inferType)(right_node.rightNode, var_types, custom_functions, classes, file), r_type = _c[0], r_ndim = _c[1], r_dim = _c[2], r_ismatrix = _c[3], r_ispointer = _c[4], r_isstruct = _c[5], c2 = _c[6];
                    custom_functions = c2;
                    arg_types.push({
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
                    });
                    if (transformNode(right_node.leftNode) != undefined) {
                        args.push(transformNode(right_node.leftNode));
                    }
                    else {
                        args.push(right_node.leftNode.text);
                    }
                    if (transformNode(right_node.rightNode) != undefined) {
                        args.push(transformNode(right_node.rightNode));
                    }
                    else {
                        args.push(right_node.rightNode.text);
                    }
                    break;
                }
                case "unary_operator" /* g.SyntaxType.UnaryOperator */:
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    var _d = (0, typeInference_1.inferType)(right_node.argumentNode, var_types, custom_functions, classes, file), type = _d[0], ndim = _d[1], dim = _d[2], ismatrix = _d[3], ispointer = _d[4], isstruct = _d[5], c = _d[6];
                    custom_functions = c;
                    arg_types.push({
                        type: type,
                        ndim: ndim,
                        dim: dim,
                        ismatrix: ismatrix,
                        ispointer: ispointer,
                        isstruct: isstruct
                    });
                    if (transformNode(right_node.argumentNode) != undefined) {
                        args.push(transformNode(right_node.argumentNode));
                    }
                    else {
                        args.push(right_node.argumentNode.text);
                    }
                    break;
                }
            }
            var outs = [];
            var is_subscript = [];
            if (left_node == null) {
            }
            else if (left_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                for (var _i = 0, _e = left_node.namedChildren; _i < _e.length; _i++) {
                    var child = _e[_i];
                    if (child.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || child.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                        outs.push(generateTmpVar());
                        is_subscript.push(true);
                    }
                    else if (transformNode(child) != undefined) {
                        outs.push(transformNode(child));
                    }
                    else {
                        outs.push(child.text);
                    }
                }
            }
            else {
                if (left_node.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || left_node.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                    outs.push(generateTmpVar());
                    is_subscript.push(true);
                }
                else if (transformNode(left_node) != undefined) {
                    outs.push(transformNode(left_node));
                }
                else {
                    outs.push(left_node.text);
                }
            }
            return [args, arg_types, outs, is_subscript];
        }
    }
    // Initialize matrices
    // -----------------------------------------------------------------------------
    function initializeMatrix(node, name, ndim, dim, type) {
        var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
        var expression = [];
        expression.push("int ndim = ".concat(ndim, ";"));
        expression.push("int dim[".concat(ndim, "] = {").concat(dim, "};"));
        expression.push("Matrix * ".concat(name, " = createM(ndim, dim, ").concat(obj.matrix_type, ");"));
        expression.push("double ".concat(type, " *input = NULL;"));
        var numel = dim.reduce(function (a, b) { return a * b; });
        expression.push("input = malloc( ".concat(numel, "*sizeof(*input));"));
        var j = 0;
        for (var i = 0; i < node.childCount; i++) {
            if (node.children[i].isNamed) {
                if (obj.matrix_type == 3)
                    expression.push("input[".concat(j, "][] = ").concat(node.children[i].text.replace(/'/g, '"'), ";"));
                else {
                    expression.push("input[".concat(j, "] = ").concat(node.children[i].text, ";"));
                }
                j++;
            }
        }
        expression.push("writeM( ".concat(name, ", ").concat(numel, ", input);"));
        expression.push("free(input);");
        return "\n" + expression.join("\n") + "\n";
    }
    // Print matrix functions
    // -----------------------------------------------------------------------------
    function printMatrixFunctions(node) {
        var tmp_var = generateTmpVar();
        var _a = parseFunctionCallNode(node, false), args = _a[0], arg_types = _a[1], outs = _a[2], is_subscript = _a[3];
        var obj = builtinFunctions_1.operatorMapping.find(function (x) { return x.fun_matlab === node.operatorNode.type; });
        var return_type = obj.return_type(args, arg_types, outs);
        var fun_c = obj.fun_c(arg_types, outs);
        if (obj.args_transform(args, arg_types, outs) != null) {
            args = obj.args_transform(args, arg_types, outs);
        }
        if (fun_c == null) {
            switch (node.type) {
                case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
                    return "".concat(node.operatorNode.type).concat(transformNode(node.argumentNode));
                    break;
                }
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    return "".concat(transformNode(node.argumentNode)).concat(node.operatorNode.type);
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    return "".concat(transformNode(node.leftNode), " ").concat(node.operatorNode.type, " ").concat(transformNode(node.rightNode));
                    break;
                }
            }
        }
        else {
            if (return_type.ismatrix) {
                var init_type = "Matrix *";
            }
            else if (return_type.ispointer) {
                var init_type = "".concat(return_type.type, " *");
            }
            else {
                var init_type = "".concat(return_type.type);
            }
            switch (node.type) {
                case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
                    pushToMain("".concat(return_type, " ").concat(tmp_var, " = ").concat(fun_c, "(").concat(args.join(", "), ")"));
                    break;
                }
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    pushToMain("".concat(init_type, " ").concat(tmp_var, " = ").concat(fun_c, "(").concat(args.join(", "), ")"));
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    pushToMain("".concat(init_type, " ").concat(tmp_var, " = ").concat(fun_c, "(").concat(args.join(", "), ")"));
                    break;
                }
            }
            return tmp_var;
        }
    }
    // Print function declarations and definitions
    function printFunctionDefDeclare(node) {
        var obj = custom_functions.find(function (x) { return x.name === node.nameNode.text; });
        if (obj != null) {
            var _a = parseFunctionCallNode(node, false), outs = _a[2];
            var ptr_args = obj.ptr_args(obj.arg_types, outs);
            var param_list = [];
            for (var i = 0; i < node.parametersNode.namedChildCount; i++) {
                var param = node.parametersNode.namedChildren[i];
                param_list.push("".concat(obj.arg_types[i].type, " ").concat(param.text));
            }
            if (node.children[1].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                var return_node = node.children[1].firstChild;
                // If multiple return values, use pointers
                if (return_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                    var ptr_declaration = [];
                    for (var i = 0; i < return_node.namedChildCount; i++) {
                        var return_var = return_node.namedChildren[i];
                        ptr_declaration.push("*p_".concat(return_var.text, " = ").concat(return_var.text, ";"));
                        param_list.push("".concat(ptr_args[i].type, "* p_").concat(return_var.text));
                    }
                    var ptr_declaration_joined = ptr_declaration.join("\n");
                    if (param_list.length == 0) {
                        var param_list_joined = "(void)";
                    }
                    else {
                        var param_list_joined = "(" + param_list.join(", ") + ")";
                    }
                    function_declarations.push("void " + node.nameNode.text + param_list_joined + ";");
                    pushToMain("\nvoid " + node.nameNode.text + param_list_joined);
                    pushToMain("{");
                    // If single return value, don't use pointers 
                }
                else if (obj.return_type != null) {
                    if (param_list.length == 0) {
                        var param_list_joined = "(void)";
                    }
                    else {
                        var param_list_joined = "(" + param_list.join(", ") + ")";
                    }
                    if (obj.return_type.ispointer) {
                        var return_type = "".concat(obj.return_type.type, " *");
                    }
                    else {
                        var return_type = "".concat(obj.return_type.type);
                    }
                    function_declarations.push("".concat(return_type, " ").concat(node.nameNode.text).concat(param_list_joined, ";"));
                    pushToMain("\n".concat(return_type, " ").concat(node.nameNode.text).concat(param_list_joined, ";"));
                    pushToMain("{");
                }
                else {
                    function_declarations.push("void ".concat(node.nameNode.text).concat(param_list_joined, ";"));
                    pushToMain("\nvoid ".concat(node.nameNode.text).concat(param_list_joined, ";"));
                    pushToMain("{");
                }
            }
            for (var _i = 0, _b = node.bodyNode.namedChildren; _i < _b.length; _i++) {
                var child = _b[_i];
                pushToMain(transformNode(child));
            }
            if (ptr_declaration != undefined) {
                pushToMain(ptr_declaration.join("\n"));
            }
            pushToMain("}");
        }
    }
    // Generate header files
    function generateHeader() {
        var macro_fun = filename.toUpperCase() + "_H";
        header.push("#ifndef ".concat(macro_fun));
        header.push("#define ".concat(macro_fun));
        if (function_definitions.length == 0) {
            header.push("\n// Function declarations");
            header.push(function_declarations.join("\n"));
        }
        else {
            header.push("int " + filename + "(void);");
        }
        header.push("#endif");
        (0, helperFunctions_2.writeToFile)(out_folder, filename + ".h", header.join("\n"));
    }
    function slice2list(node) {
        var children_vals = [];
        for (var i = 0; i < node.namedChildCount; i++) {
            var child = node.namedChildren[i];
            var _a = (0, typeInference_1.inferType)(child, var_types, custom_functions, classes, file), child_type = _a[0], c = _a[6];
            custom_functions = c;
            if (child_type == "keyword") {
                var _b = (0, typeInference_1.inferType)(node.parent.valueNode, var_types, custom_functions, classes, file), ndim = _b[1], dim = _b[2], c_4 = _b[6];
                custom_functions = c_4;
                var firstNode = node.parent.namedChildren[1];
                var current_dim = 0;
                var dummyNode = node;
                while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                    dummyNode = dummyNode.previousNamedSibling;
                    current_dim += 1;
                }
                children_vals.push(dim[current_dim]);
            }
            else {
                children_vals.push(Number(child.text));
            }
        }
        var start = children_vals[0];
        var stop = children_vals[1];
        var step = 1;
        if (children_vals.length == 3) {
            stop = children_vals[2];
            step = children_vals[1];
        }
        var list = [];
        for (var i = start; i <= stop; i += step) {
            list.push(i);
        }
        return list;
    }
    function matrix2list(node) {
        var list = [];
        for (var _i = 0, _a = node.namedChildren; _i < _a.length; _i++) {
            var child = _a[_i];
            list.push(transformNode(child));
        }
        return list;
    }
    /*function sub2idx(row_node, col_node, d0) {
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
        
    }*/
    function sub2idx(dim0_node, dim1_node, dim2_node, d0, d1) {
        var dim0 = dim0_node.text;
        var dim1 = dim1_node.text;
        var dim2 = dim2_node;
        if (dim0_node.type == "slice" /* g.SyntaxType.Slice */) {
            dim0 = slice2list(dim0_node);
        }
        else if (dim0_node.type == "matrix" /* g.SyntaxType.Matrix */) {
            dim0 = matrix2list(dim0_node);
        }
        else {
            dim0 = [dim0_node.text];
        }
        if (dim1_node.type == "slice" /* g.SyntaxType.Slice */) {
            dim1 = slice2list(dim1_node);
        }
        else if (dim1_node.type == "matrix" /* g.SyntaxType.Matrix */) {
            dim1 = matrix2list(dim1_node);
        }
        else {
            dim1 = [dim1_node.text];
        }
        if (dim2_node == null) {
            dim2 = [1];
        }
        else {
            if (dim2_node.type == "slice" /* g.SyntaxType.Slice */) {
                dim2 = slice2list(dim1_node);
            }
            else if (dim2_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                dim2 = matrix2list(dim1_node);
            }
            else {
                dim2 = [dim2_node.text];
            }
        }
        var idx = [];
        for (var i = 0; i < dim0.length; i++) {
            for (var j = 0; j < dim1.length; j++) {
                for (var k = 0; j < dim2.length; j++) {
                    //idx.push( (Number(dim2[j])-1) * d0 * d1 + (Number(dim1[j])-1) * d0 + Number(dim0[i]) );
                    idx.push("(".concat(dim2[k], "-1) * ").concat(d0, " * ").concat(d1, " + (").concat(dim1[j], "-1) * ").concat(d0, " + (").concat(dim0[i], " - 1)"));
                }
            }
        }
        return idx;
    }
    function getSubscriptIdx(node) {
        var obj = var_types.find(function (x) { return x.name === node.valueNode.text; });
        var dim = obj.dim;
        // already a linear idx
        if (node.namedChildCount == 2) {
            if (node.namedChildren[1].type == "slice" /* g.SyntaxType.Slice */) {
                //var list = slice2list(node.namedChildren[1])
                var idx = slice2list(node.namedChildren[1]);
            }
            else if (node.namedChildren[1].type == "matrix" /* g.SyntaxType.Matrix */) {
                //var list = matrix2list(node.namedChildren[1])
                var idx = matrix2list(node.namedChildren[1]);
            }
            else {
                //var list = [node.namedChildren[1].text];
                var idx = [node.namedChildren[1].text];
            }
            /*var idx = [];
            for (let l of list) {
                idx.push(Number(l));
                idx.push(l);
            }*/
        }
        else {
            if (node.namedChildCount == 3) {
                var idx = sub2idx(node.namedChildren[1], node.namedChildren[2], null, dim[0], 1);
            }
            else if (node.namedChildCount == 4) {
                var idx = sub2idx(node.namedChildren[1], node.namedChildren[2], node.namedChildren[3], dim[0], dim[1]);
            }
        }
        return idx;
    }
    // Put together generated code
    // -----------------------------------------------------------------------------
    main();
    generated_code.push(link.join("\n"));
    if (function_definitions.length != 0) {
        generated_code.push("\n// Function declarations");
        generated_code.push(function_declarations.join("\n"));
    }
    if (!(0, treeTraversal_1.fileIsFunction)(tree)) {
        generated_code.push("\n// Entry-point function\nint ".concat(filename, "(void)\n{"));
    }
    generated_code.push("\n" + main_function.join("\n"));
    if (!(0, treeTraversal_1.fileIsFunction)(tree)) {
        generated_code.push("return 0;");
        generated_code.push("}\n");
    }
    if (function_definitions.length != 0) {
        generated_code.push("\n// Subprograms");
        generated_code.push(function_definitions.join("\n"));
    }
    generateHeader();
    (0, helperFunctions_2.writeToFile)(out_folder, filename + ".c", generated_code.join("\n"));
    return [generated_code.join("\n"), header.join("\n")];
}
exports.generateCode = generateCode;
//# sourceMappingURL=generateCode.js.map