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
function generateCode(filename, tree, out_folder, custom_functions, classes, var_types, block_idxs, file, debug) {
    var entry_fun_node = (0, treeTraversal_1.findEntryFunction)(tree, debug);
    var loop_iterators = [];
    function pushToMain(expression) {
        //console.log(expression);
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
    var tmp_tbl = [];
    function generateTmpVar(name) {
        var obj = tmp_tbl.find(function (x) { return x.name === name; });
        if (obj != null && obj != undefined) {
            obj.count = obj.count + 1;
            tmp_tbl = tmp_tbl.filter(function (e) { return e.name !== obj.name; });
            tmp_tbl.push(obj);
        }
        else {
            tmp_tbl.push({
                name: name,
                count: 1
            });
        }
        return "".concat(tmp_tbl[tmp_tbl.length - 1].name).concat(tmp_tbl[tmp_tbl.length - 1].count);
    }
    var alias_tbl = [];
    var main_queue = [];
    var type_to_matrix_type = [
        { type: "integer", matrix_type: 0 },
        { type: "int", matrix_type: 0 },
        { type: "double", matrix_type: 1 },
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
        } while ((0, treeTraversal_1.gotoPreorderSucc_OnlyMajorTypes)(cursor, debug));
    }
    // Transform node
    function transformNode(node) {
        //console.log("TRANSFORM");
        //console.log(node.text);
        //console.log(node);
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
                    var obj = var_types.find(function (x) { return x.name === node.leftNode.text; });
                    expression2.push("for (int ".concat(node.leftNode.text, " = "));
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
                    var tmp_var1 = generateTmpVar("tmp"); // the matrix
                    var tmp_var2 = generateTmpVar("tmp"); // the iterating variable
                    var _a = (0, typeInference_1.inferType)(node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug), type = _a[0], ndim = _a[1], dim = _a[2], c = _a[6];
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
                var _c = parseNode(node, false), args1 = _c[0], outs = _c[1], is_subscript = _c[2];
                var arg_types = [];
                var args = [];
                var _d = (0, typeInference_1.inferType)(node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug), type = _d[0], ndim = _d[1], dim = _d[2], ismatrix = _d[3], ispointer = _d[4], isstruct = _d[5], c = _d[6];
                custom_functions = c;
                var init_flag = false;
                var lhs = null;
                if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "cell" /* g.SyntaxType.Cell */) {
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                    for (var _e = 0, args1_1 = args1; _e < args1_1.length; _e++) {
                        var arg = args1_1[_e];
                        args.push(transformNode(arg));
                        var _f = (0, typeInference_1.inferType)(arg, var_types, custom_functions, classes, file, alias_tbl, debug), type_1 = _f[0], ndim_1 = _f[1], dim_1 = _f[2], ismatrix_1 = _f[3], ispointer_1 = _f[4], isstruct_1 = _f[5], c_1 = _f[6];
                        custom_functions = c_1;
                        arg_types.push({
                            type: type_1,
                            ndim: ndim_1,
                            dim: dim_1,
                            ismatrix: ismatrix_1,
                            ispointer: ispointer_1,
                            isstruct: isstruct_1
                        });
                    }
                    for (var i = 0; i < outs.length; i++) {
                        outs[i] = transformNode(outs[i]);
                    }
                    if (type == 'heterogeneous') {
                        var expression1 = [];
                        var expression2 = [];
                        expression1.push("\nstruct cell".concat(numCellStruct, " {"));
                        expression2.push("cell".concat(numCellStruct, " ").concat(outs[0], ";"));
                        for (var i = 0; i < node.rightNode.namedChildCount; i++) {
                            var child = node.rightNode.namedChildren[i];
                            var _g = (0, typeInference_1.inferType)(child, var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _g[0], child_ndim = _g[1], child_dim = _g[2], child_ismatrix = _g[3], child_ispointer = _g[4], child_isstruct = _g[5], c_2 = _g[6];
                            custom_functions = c_2;
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
                    for (var i = 0; i < outs.length; i++) {
                        outs[i] = transformNode(outs[i]);
                    }
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
                    for (var i = 0; i < outs.length; i++) {
                        outs[i] = transformNode(outs[i]);
                    }
                    var rhs = transformNode(node.rightNode);
                    init_flag = true;
                    //lhs = transformNode(node.leftNode);
                    // If LHS is subscript, use the tmp var generated by parseFunctionCallNode as out
                    if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                        lhs = outs[0];
                    }
                    else {
                        //lhs = transformNode(node.leftNode);
                        lhs = outs[0];
                    }
                }
                if (lhs == null && rhs != undefined) {
                    pushToMain("".concat(rhs, ";"));
                }
                else if (init_flag) {
                    var var_type_1 = var_types.find(function (x) { return x.name === lhs; });
                    if (var_type_1 != null && var_type_1 != undefined) {
                        if (var_type_1.initialized && (var_type_1.type == type) && (node.leftNode.startIndex > var_type_1.scope[0]) && (node.leftNode.endIndex < var_type_1.scope[1])) {
                            pushToMain("".concat(lhs, " = ").concat(rhs, ";"));
                        }
                        else {
                            if (ismatrix) {
                                if (var_type_1.initialized) {
                                    pushToMain("".concat(lhs, " = ").concat(rhs, ";"));
                                }
                                else {
                                    pushToMain("Matrix * ".concat(lhs, " = ").concat(rhs, ";"));
                                }
                            }
                            else if (ispointer) {
                                pushToMain("".concat(type, " * ").concat(lhs, " = ").concat(rhs, ";"));
                            }
                            else {
                                pushToMain("".concat(type, " ").concat(lhs, " = ").concat(rhs, ";"));
                            }
                        }
                        var_types = var_types.filter(function (e) { return e.name !== var_type_1.name; });
                        var_type_1.initialized = true;
                        var_type_1.type = type;
                        var_types.push(var_type_1);
                        var obj = tmp_tbl.find(function (x) { return "".concat(x.name).concat(x.count) === rhs; });
                        if (obj != null && obj != undefined) {
                            var scope = (0, typeInference_1.findVarScope)(node, block_idxs);
                            alias_tbl = alias_tbl.filter(function (e) { return e.name !== lhs; });
                            alias_tbl.push({
                                name: lhs,
                                tmp_var: rhs,
                                scope: scope
                            });
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
                        var scope = (0, typeInference_1.findVarScope)(node, block_idxs);
                        var_types.push({
                            name: lhs,
                            type: type,
                            ndim: ndim,
                            dim: dim,
                            ismatrix: ismatrix,
                            initialized: true,
                            scope: scope
                        });
                        var obj = tmp_tbl.find(function (x) { return "".concat(x.name).concat(x.count) === rhs; });
                        if (obj != null && obj != undefined) {
                            alias_tbl = alias_tbl.filter(function (e) { return e.name !== lhs; });
                            alias_tbl.push({
                                name: lhs,
                                tmp_var: rhs,
                                scope: scope
                            });
                        }
                    }
                }
                // TO DO: if this is inside of a for loop then the getdataM function call should be outside of for body
                // When LHS is/contains subscript
                // void *memcpy(void *dest, const void * src, size_t n)
                var _h = parseNode(node.leftNode, true), left_args = _h[0];
                for (var i = 0; i < left_args.length; i++) {
                    left_args[i] = transformNode(left_args[i]);
                }
                if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    var _loop_1 = function (j) {
                        var child = node.leftNode.namedChildren[j];
                        // If element j of LHS matrix is a subscript
                        if (is_subscript[j]) {
                            // Convert to linear idx
                            var idx_3 = getSubscriptIdx(child);
                            var tmp_data = generateTmpVar("data");
                            var tmp_lhs = generateTmpVar("lhs_data");
                            var tmp_rhs = generateTmpVar("rhs_data");
                            pushToMain("void *".concat(tmp_data, " = getdataM(").concat(child.valueNode.text, ");"));
                            pushToMain("double* ".concat(tmp_lhs, " = (double *)").concat(tmp_data, ";"));
                            var _s = (0, typeInference_1.inferType)(outs[j], var_types, custom_functions, classes, file, alias_tbl, debug), type_2 = _s[0], ismatrix_2 = _s[3], c_3 = _s[6];
                            custom_functions = c_3;
                            // If RHS is matrix
                            if (ismatrix_2) {
                                pushToMain("void *".concat(tmp_rhs, " = getdataM(").concat(outs[j], ");"));
                                for (var i = 0; i < idx_3.length; i++) {
                                    pushToMain("".concat(tmp_lhs, "[").concat(idx_3[i], "] = ").concat(tmp_rhs, "[").concat(i, "];"));
                                }
                                // If RHS not matrix
                            }
                            else {
                                for (var i = 0; i < idx_3.length; i++) {
                                    pushToMain("".concat(outs[j], "[").concat(i, "] = ").concat(tmp_rhs, "[").concat(idx_3[i], "];"));
                                }
                            }
                            var tmp_size = generateTmpVar("size");
                            var tmp_iter = generateTmpVar("iter");
                            var tmp_mat = generateTmpVar("mat");
                            var obj1 = tmp_tbl.find(function (x) { return x.name === "ndim"; });
                            var tmp_ndim = "".concat(obj1.name).concat(obj1.count);
                            var obj2 = tmp_tbl.find(function (x) { return x.name === "dim"; });
                            var tmp_dim = "".concat(obj2.name).concat(obj2.count);
                            pushToMain("int ".concat(tmp_size, " = 1;\nfor (int ").concat(tmp_iter, " = 0 ; ").concat(tmp_iter, " < ").concat(tmp_ndim, "; ").concat(tmp_iter, "++)\n{\n\t").concat(tmp_size, " *= ").concat(tmp_dim, "[").concat(tmp_iter, "];\n}\nMatrix *").concat(tmp_mat, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", DOUBLE);\nwriteM(").concat(tmp_mat, ", ").concat(tmp_size, ", ").concat(tmp_lhs, ");"));
                            //printM(${tmp_mat});`);
                            var scope = (0, typeInference_1.findVarScope)(node, block_idxs);
                            alias_tbl = alias_tbl.filter(function (e) { return e.name !== node.leftNode.valueNode.text; });
                            alias_tbl.push({
                                name: child.valueNode.text,
                                tmp_var: tmp_mat,
                                scope: scope
                            });
                            var obj = var_types.find(function (x) { return x.name === child.valueNode.text; });
                            var_types.push({
                                name: tmp_mat,
                                type: obj.type,
                                ndim: obj.ndim,
                                dim: obj.dim,
                                ismatrix: true,
                                ispointer: true,
                                isstruct: false,
                                initialized: true,
                                scope: scope
                            });
                        }
                    };
                    for (var j = 0; j < node.leftNode.namedChildCount; j++) {
                        _loop_1(j);
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
                        var tmp_data = generateTmpVar("data");
                        var tmp_lhs = generateTmpVar("lhs_data");
                        var tmp_rhs = generateTmpVar("rhs_data");
                        if (num_back == 0) {
                            pushToMain("void *".concat(tmp_data, " = getdataM(").concat(node.leftNode.valueNode.text, ");"));
                            pushToMain("double* ".concat(tmp_lhs, " = (double *)").concat(tmp_data, ";"));
                        }
                        else {
                            insertMain("void *".concat(tmp_data, " = getdataM(").concat(node.leftNode.valueNode.text, ");"), 'for', num_back);
                            insertMain("double* ".concat(tmp_lhs, " = (double *)").concat(tmp_data, ";"), 'for', num_back);
                        }
                        var _j = (0, typeInference_1.inferType)(outs[0], var_types, custom_functions, classes, file, alias_tbl, debug), type_3 = _j[0], ismatrix_3 = _j[3], c_4 = _j[6];
                        custom_functions = c_4;
                        // If RHS is matrix
                        if (ismatrix_3) {
                            pushToMain("void *".concat(tmp_rhs, " = getdataM(").concat(outs[0], ");"));
                            for (var i = 0; i < idx_4.length; i++) {
                                // Copy data[i] to data2[i]
                                // pushToMain(`memcpy(&data2[${idx[i]}], data3[${i}]);`); 
                                pushToMain("".concat(tmp_lhs, "[").concat(idx_4[i], "] = ").concat(tmp_rhs, "[").concat(i, "];"));
                            }
                            // If RHS not matrix
                        }
                        else {
                            if (idx_4.length == 1) {
                                // pushToMain(`memcpy(&data2[${idx[0]}], &${outs[0]}, 1);`); 
                                pushToMain("".concat(tmp_lhs, "[").concat(idx_4[0], "] = ").concat(outs[0], ";"));
                            }
                            else {
                                for (var i = 0; i < idx_4.length; i++) {
                                    // Copy data[i] to outs[i]
                                    // pushToMain(`memcpy(&data2[${idx[i]}], &${outs[0]}[${i}], 1);`);
                                    pushToMain("".concat(tmp_lhs, "[").concat(idx_4[i], "] = ").concat(outs[0], "[").concat(i, "];"));
                                }
                            }
                        }
                        var tmp_size = generateTmpVar("size");
                        var tmp_iter = generateTmpVar("iter");
                        var tmp_mat = generateTmpVar("mat");
                        var obj1 = tmp_tbl.find(function (x) { return x.name === "ndim"; });
                        var tmp_ndim = "".concat(obj1.name).concat(obj1.count);
                        var obj2 = tmp_tbl.find(function (x) { return x.name === "dim"; });
                        var tmp_dim = "".concat(obj2.name).concat(obj2.count);
                        var mq = {
                            expression: "int ".concat(tmp_size, " = 1;\nfor (int ").concat(tmp_iter, " = 0 ; ").concat(tmp_iter, " < ").concat(tmp_ndim, "; ").concat(tmp_iter, "++)\n{\n\t").concat(tmp_size, " *= ").concat(tmp_dim, "[").concat(tmp_iter, "];\n}\nMatrix *").concat(tmp_mat, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", DOUBLE);\nwriteM(").concat(tmp_mat, ", ").concat(tmp_size, ", ").concat(tmp_lhs, ");"),
                            //printM(${tmp_mat});`,
                            condition: "loop_iterators.length == ".concat(loop_iterators.length - num_back, ";")
                        };
                        main_queue.push(mq);
                        var scope = (0, typeInference_1.findVarScope)(node, block_idxs);
                        alias_tbl = alias_tbl.filter(function (e) { return e.name !== node.leftNode.valueNode.text; });
                        alias_tbl.push({
                            name: node.leftNode.valueNode.text,
                            tmp_var: tmp_mat,
                            scope: scope
                        });
                        var obj = var_types.find(function (x) { return x.name === node.leftNode.valueNode.text; });
                        var_types.push({
                            name: tmp_mat,
                            type: obj.type,
                            ndim: obj.ndim,
                            dim: obj.dim,
                            ismatrix: true,
                            ispointer: true,
                            isstruct: false,
                            initialized: true,
                            scope: scope
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
                for (var _k = 0, _l = node.namedChildren; _k < _l.length; _k++) {
                    var child = _l[_k];
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
                var tmp_var_1 = generateTmpVar("tmp");
                if (obj == null || obj == undefined) {
                    pushToMain("double ".concat(tmp_var_1, ";"));
                    pushToMain("indexM(".concat(transformNode(node.valueNode), ", &").concat(tmp_var_1, ", ").concat(index.length, ", ").concat(index.join(", "), ");"));
                    var scope = (0, typeInference_1.findVarScope)(node, block_idxs);
                    alias_tbl.push({
                        name: node.text,
                        tmp_var: tmp_var_1,
                        scope: scope
                    });
                }
                else if (node.startIndex < obj.scope[0] || node.startIndex > obj.scope[1]) {
                    pushToMain("double ".concat(tmp_var_1, ";"));
                    pushToMain("indexM(".concat(transformNode(node.valueNode), ", &").concat(tmp_var_1, ", ").concat(index.length, ", ").concat(index.join(", "), ");"));
                    var scope = (0, typeInference_1.findVarScope)(node, block_idxs);
                    alias_tbl.push({
                        name: node.text,
                        tmp_var: tmp_var_1,
                        scope: scope
                    });
                }
                else {
                    tmp_var_1 = obj.tmp_var;
                }
                return tmp_var_1;
                break;
            }
            case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                // Is a custom function call
                var obj = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
                var _m = parseNode(node, false), args1 = _m[0], outs = _m[1], is_subscript = _m[2];
                var arg_types = [];
                var args = [];
                for (var _o = 0, args1_2 = args1; _o < args1_2.length; _o++) {
                    var arg = args1_2[_o];
                    args.push(transformNode(arg));
                    var _p = (0, typeInference_1.inferType)(arg, var_types, custom_functions, classes, file, alias_tbl, debug), type_4 = _p[0], ndim_2 = _p[1], dim_2 = _p[2], ismatrix_4 = _p[3], ispointer_2 = _p[4], isstruct_2 = _p[5], c_5 = _p[6];
                    custom_functions = c_5;
                    arg_types.push({
                        type: type_4,
                        ndim: ndim_2,
                        dim: dim_2,
                        ismatrix: ismatrix_4,
                        ispointer: ispointer_2,
                        isstruct: isstruct_2
                    });
                }
                for (var i = 0; i < outs.length; i++) {
                    //outs[i] = transformNode(outs[i]);
                    outs[i] = outs[i].text;
                }
                if (obj != null && obj != undefined) {
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
                    if (obj_1 != null && obj_1 != undefined) {
                        pushToMain(obj_1.push_main_before(args, arg_types, outs));
                        var init_before = obj_1.init_before(args, arg_types, outs);
                        var fun_c = obj_1.fun_c(arg_types, outs);
                        var tmp_var = generateTmpVar("tmp");
                        args = obj_1.args_transform(args, arg_types, outs);
                        if (init_before != null && init_before != undefined) {
                            for (var i = 0; i < init_before.length; i++) {
                                var tmp_var_2 = generateTmpVar(init_before[i].name);
                                args[args.indexOf(init_before[i].name)] = tmp_var_2;
                                if (init_before[i].ndim > 1) {
                                    pushToMain("".concat(init_before[i].type, " ").concat(tmp_var_2, "[").concat(init_before[i].ndim, "] = ").concat(init_before[i].val, ";"));
                                }
                                else {
                                    pushToMain("".concat(init_before[i].type, " ").concat(tmp_var_2, " = ").concat(init_before[i].val, ";"));
                                }
                                var_types.push({
                                    name: tmp_var_2,
                                    type: init_before[i].type,
                                    ndim: init_before[i].ndim,
                                    dim: init_before[i].dim,
                                    ismatrix: init_before[i].ismatrix,
                                    ispointer: init_before[i].ispointer,
                                    isstruct: init_before[i].isstruct,
                                    initialized: true,
                                    scope: (0, typeInference_1.findVarScope)(node, block_idxs)
                                });
                            }
                        }
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
                        return "".concat(fun_c, "(").concat(args.join(", "), ")");
                        // Is a subscript
                    }
                    else {
                        var index = [];
                        for (var i = 1; i < node.namedChildCount; i++) {
                            index.push(transformNode(node.namedChildren[i]));
                        }
                        var tmp_var = generateTmpVar("tmp");
                        // only use indexM if subscript is on rhs
                        var lhs_flag = false;
                        if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
                            if (node.parent.leftNode.text == node.text) {
                                lhs_flag = true;
                            }
                        }
                        if (!lhs_flag) { // subscript is on rhs
                            var obj_2 = alias_tbl.find(function (x) { return x.name === node.text; });
                            if (obj_2 == null || obj_2 == undefined) {
                                pushToMain("double ".concat(tmp_var, ";"));
                                pushToMain("indexM(".concat(transformNode(node.valueNode), ", &").concat(tmp_var, ", ").concat(index.length, ", ").concat(index.join(", "), ");"));
                                //pushToMain(`indexM(${node.valueNode.text}, &${tmp_var}, ${index.length}, ${index.join(", ")});`);
                                var scope = (0, typeInference_1.findVarScope)(node, block_idxs);
                                alias_tbl.push({
                                    name: node.text,
                                    tmp_var: tmp_var,
                                    scope: scope
                                });
                                var _q = (0, typeInference_1.inferType)(node.valueNode, var_types, custom_functions, classes, file, alias_tbl, debug), type_5 = _q[0];
                                var idx_5 = getSubscriptIdx(node);
                                var_types.push({
                                    name: tmp_var,
                                    type: type_5,
                                    ndim: idx_5.length,
                                    dim: [idx_5.length],
                                    ismatrix: idx_5.length > 1,
                                    ispointer: false,
                                    isstruct: false,
                                    initialized: true,
                                    scope: scope
                                });
                                //} else if (obj.scope == null) { // scope is "outermost" level
                                //    tmp_var = obj.tmp_var;
                            }
                            else if (node.startIndex < obj_2.scope[0] || node.startIndex > obj_2.scope[1]) {
                                pushToMain("double ".concat(tmp_var, ";"));
                                pushToMain("indexM(".concat(transformNode(node.valueNode), ", &").concat(tmp_var, ", ").concat(index.length, ", ").concat(index.join(", "), ");"));
                                var scope = (0, typeInference_1.findVarScope)(node, block_idxs);
                                alias_tbl.push({
                                    name: node.text,
                                    tmp_var: tmp_var,
                                    scope: scope
                                });
                                var _r = (0, typeInference_1.inferType)(node.valueNode, var_types, custom_functions, classes, file, alias_tbl, debug), type_6 = _r[0];
                                var idx_6 = getSubscriptIdx(node);
                                var_types.push({
                                    name: tmp_var,
                                    type: type_6,
                                    ndim: idx_6.length,
                                    dim: [idx_6.length],
                                    ismatrix: idx_6.length > 1,
                                    ispointer: false,
                                    isstruct: false,
                                    initialized: true,
                                    scope: scope
                                });
                            }
                            else {
                                tmp_var = obj_2.tmp_var;
                            }
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
                if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
                    if (node.parent.leftNode.text == node.text) {
                        return node.text;
                    }
                }
                var obj = alias_tbl.find(function (x) { return x.name === node.text; });
                if (obj != null) {
                    if (node.startIndex > obj.scope[0] && node.endIndex < obj.scope[1]) {
                        return obj.tmp_var;
                    }
                }
                return node.text;
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
    function parseNode(node, ignore_parent) {
        if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */ && ignore_parent == false) {
            return parseNode(node.parent, false);
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
                        args.push(right_node.namedChildren[i]);
                        /*let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(right_node.namedChildren[i], var_types, custom_functions, classes, file, alias_tbl, debug);
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
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    var _a = (0, typeInference_1.inferType)(right_node.leftNode, var_types, custom_functions, classes, file, alias_tbl, debug), l_type = _a[0], l_ndim = _a[1], l_dim = _a[2], l_ismatrix = _a[3], l_ispointer = _a[4], l_isstruct = _a[5], c1 = _a[6];
                    custom_functions = c1;
                    var _b = (0, typeInference_1.inferType)(right_node.rightNode, var_types, custom_functions, classes, file, alias_tbl, debug), r_type = _b[0], r_ndim = _b[1], r_dim = _b[2], r_ismatrix = _b[3], r_ispointer = _b[4], r_isstruct = _b[5], c2 = _b[6];
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
                case "unary_operator" /* g.SyntaxType.UnaryOperator */:
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    var _c = (0, typeInference_1.inferType)(right_node.argumentNode, var_types, custom_functions, classes, file, alias_tbl, debug), type = _c[0], ndim = _c[1], dim = _c[2], ismatrix = _c[3], ispointer = _c[4], isstruct = _c[5], c = _c[6];
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
            var outs = [];
            var is_subscript = [];
            if (left_node == null) {
            }
            else if (left_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                for (var _i = 0, _d = left_node.namedChildren; _i < _d.length; _i++) {
                    var child = _d[_i];
                    if (child.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || child.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                        is_subscript.push(true);
                    }
                    outs.push(child);
                }
            }
            else {
                if (left_node.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */ || left_node.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
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
        var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
        var expression = [];
        var tmp_ndim = generateTmpVar("ndim");
        var tmp_dim = generateTmpVar("dim");
        var scope = (0, typeInference_1.findVarScope)(node, block_idxs);
        expression.push("int ".concat(tmp_ndim, " = ").concat(ndim, ";"));
        var_types.push({
            name: tmp_ndim,
            type: 'int',
            ndim: 1,
            dim: [1],
            ismatrix: false,
            initialized: true,
            scope: scope
        });
        expression.push("int ".concat(tmp_dim, "[").concat(ndim, "] = {").concat(dim, "};"));
        var_types.push({
            name: tmp_dim,
            type: 'int',
            ndim: dim.length,
            dim: [dim.length],
            ismatrix: false,
            initialized: true,
            scope: scope
        });
        var obj2 = var_types.find(function (x) { return x.name === name; });
        if (obj2 != null && obj2 != undefined) {
            if (obj2.initialized && (node.startIndex > obj2.scope[0]) && (node.endIndex < obj2.scope[1])) {
                expression.push("".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
            }
            else {
                expression.push("Matrix * ".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
                obj2.initialized = true;
                var_types = var_types.filter(function (e) { return e.name !== name; });
                var_types.push(obj2);
            }
        }
        else {
            expression.push("Matrix * ".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
        }
        var tmp_input = generateTmpVar("input");
        expression.push("".concat(type, " *").concat(tmp_input, " = NULL;"));
        var numel = dim.reduce(function (a, b) { return a * b; });
        expression.push("".concat(tmp_input, " = malloc( ").concat(numel, "*sizeof(*").concat(tmp_input, "));"));
        var j = 0;
        for (var i = 0; i < node.childCount; i++) {
            if (node.children[i].isNamed) {
                if (obj.matrix_type == 3)
                    expression.push("".concat(tmp_input, "[").concat(j, "][] = ").concat(node.children[i].text.replace(/'/g, '"'), ";"));
                else {
                    expression.push("".concat(tmp_input, "[").concat(j, "] = ").concat(node.children[i].text, ";"));
                }
                j++;
            }
        }
        expression.push("writeM( ".concat(name, ", ").concat(numel, ", ").concat(tmp_input, ");"));
        expression.push("free(".concat(tmp_input, ");"));
        return "\n" + expression.join("\n") + "\n";
    }
    // Print matrix functions
    // -----------------------------------------------------------------------------
    function printMatrixFunctions(node) {
        var _a = parseNode(node, false), args1 = _a[0], outs = _a[1], is_subscript = _a[2];
        var arg_types = [];
        var args = [];
        for (var _i = 0, args1_3 = args1; _i < args1_3.length; _i++) {
            var arg = args1_3[_i];
            args.push(transformNode(arg));
            var _b = (0, typeInference_1.inferType)(arg, var_types, custom_functions, classes, file, alias_tbl, debug), type = _b[0], ndim = _b[1], dim = _b[2], ismatrix = _b[3], ispointer = _b[4], isstruct = _b[5], c = _b[6];
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
        for (var i = 0; i < outs.length; i++) {
            outs[i] = outs[i].text;
        }
        var obj = builtinFunctions_1.operatorMapping.find(function (x) { return x.fun_matlab === node.operatorNode.type; });
        var return_type = obj.return_type(args, arg_types, outs);
        var fun_c = obj.fun_c(arg_types, outs);
        if (obj.args_transform(args, arg_types, outs) != null) {
            args = obj.args_transform(args, arg_types, outs);
        }
        if (fun_c == null) {
            switch (node.type) {
                case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
                    //return `${node.operatorNode.type}${transformNode(node.argumentNode)}`;
                    return "".concat(node.operatorNode.type).concat(args[0]);
                    break;
                }
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    //return `${transformNode(node.argumentNode)}${node.operatorNode.type}`;
                    return "".concat(args[0]).concat(node.operatorNode.type);
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    //return `${transformNode(node.leftNode)} ${node.operatorNode.type} ${transformNode(node.rightNode)}`;
                    return "".concat(args[0], " ").concat(node.operatorNode.type, " ").concat(args[1]);
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
            var tmp_var = generateTmpVar("mat");
            pushToMain("".concat(init_type, " ").concat(tmp_var, " = ").concat(fun_c, "(").concat(args.join(", "), ");"));
            var_types.push({
                name: tmp_var,
                type: return_type.type,
                ndim: return_type.ndim,
                dim: return_type.dim,
                ismatrix: return_type.ismatrix,
                ispointer: return_type.ispointer,
                isstruct: false,
                initialized: true
            });
            return tmp_var;
        }
    }
    // Print function declarations and definitions
    function printFunctionDefDeclare(node) {
        var obj = custom_functions.find(function (x) { return x.name === node.nameNode.text; });
        if (obj != null) {
            var _a = parseNode(node, false), outs = _a[1];
            for (var i = 0; i < outs.length; i++) {
                outs[i] = transformNode(outs[i]);
            }
            var ptr_args = obj.ptr_args(obj.arg_types, outs);
            var param_list = [];
            for (var i = 0; i < node.parametersNode.namedChildCount; i++) {
                var param = node.parametersNode.namedChildren[i];
                if (obj.arg_types[i].ismatrix) {
                    param_list.push("Matrix * ".concat(param.text));
                }
                else {
                    param_list.push("".concat(obj.arg_types[i].type, " ").concat(param.text));
                }
            }
            if (obj.return_type != null) {
                var return_node = node.children[1].firstChild;
                if (obj.return_type.ismatrix) {
                    var ptr_declaration = [];
                    for (var i = 0; i < return_node.namedChildCount; i++) {
                        var return_var = return_node.namedChildren[i];
                        ptr_declaration.push("*p_".concat(return_var.text, " = ").concat(return_var.text, ";"));
                        if (ptr_args[i].ismatrix) {
                            param_list.push("Matrix* p_".concat(return_var.text));
                        }
                        else {
                            param_list.push("".concat(ptr_args[i].type, "* p_").concat(return_var.text));
                        }
                    }
                    var ptr_declaration_joined = ptr_declaration.join("\n");
                    if (param_list.length == 0) {
                        var param_list_joined = "void";
                    }
                    else {
                        var param_list_joined = param_list.join(", ");
                    }
                    function_declarations.push("void ".concat(node.nameNode.text, "(").concat(param_list_joined, ");"));
                    pushToMain("\nvoid ".concat(node.nameNode.text, "(param_list_joined) {"));
                }
                else {
                    if (param_list.length == 0) {
                        var param_list_joined = "void";
                    }
                    else {
                        var param_list_joined = param_list.join(", ");
                    }
                    if (obj.return_type.ispointer) {
                        var return_type = "".concat(obj.return_type.type, " *");
                    }
                    else {
                        var return_type = "".concat(obj.return_type.type);
                    }
                    function_declarations.push("".concat(return_type, " ").concat(node.nameNode.text, "(").concat(param_list_joined, ");"));
                    pushToMain("\n".concat(return_type, " ").concat(node.nameNode.text, "(").concat(param_list_joined, ") {"));
                }
            }
            else {
                function_declarations.push("void ".concat(node.nameNode.text, "(").concat(param_list.join(", "), ");"));
                pushToMain("\nvoid ".concat(node.nameNode.text, "(").concat(param_list.join(", "), ") {"));
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
            var _a = (0, typeInference_1.inferType)(child, var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _a[0], c = _a[6];
            custom_functions = c;
            if (child_type == "keyword") {
                var _b = (0, typeInference_1.inferType)(node.parent.valueNode, var_types, custom_functions, classes, file, alias_tbl, debug), ndim = _b[1], dim = _b[2], c_6 = _b[6];
                custom_functions = c_6;
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
    if (!(0, treeTraversal_1.fileIsFunction)(tree, debug)) {
        generated_code.push("\n// Entry-point function\nint ".concat(filename, "(void)\n{"));
    }
    generated_code.push("\n" + main_function.join("\n"));
    if (!(0, treeTraversal_1.fileIsFunction)(tree, treeTraversal_1.fileIsFunction)) {
        generated_code.push("return 0;");
        generated_code.push("}\n");
    }
    if (function_definitions.length != 0) {
        generated_code.push("\n// Subprograms");
        generated_code.push(function_definitions.join("\n"));
    }
    generateHeader();
    (0, helperFunctions_2.writeToFile)(out_folder, filename + ".c", generated_code.join("\n"));
    return [generated_code.join("\n"), header.join("\n"), var_types];
}
exports.generateCode = generateCode;
//# sourceMappingURL=generateCode.js.map