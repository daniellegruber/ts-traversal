"use strict";
exports.__esModule = true;
exports.generateCode = void 0;
var fs = require("fs");
var path = require("path");
var ts = require("typescript");
var customTypes_1 = require("./customTypes");
var modifyCode_1 = require("./modifyCode");
var helperFunctions_1 = require("./helperFunctions");
var typeInference_1 = require("./typeInference");
//import { sub2idx, rowMajorFlatIdx, slice2list, matrix2list } from "./convertSubscript";
var convertSubscript_1 = require("./convertSubscript");
var treeTraversal_1 = require("./treeTraversal");
var builtinFunctions_1 = require("./builtinFunctions");
var builtin_funs = builtinFunctions_1.builtin_functions;
// Main
function generateCode(filename, tree, out_folder, custom_functions, classes, var_types, block_idxs, file, debug) {
    if (debug == 1) {
        console.log("generateCode");
    }
    var tmp_var_types = var_types;
    var entry_fun_node = (0, treeTraversal_1.findEntryFunction)(tree, debug);
    var loop_iterators = [];
    var function_definitions = [];
    var function_declarations = [];
    var numCellStruct = 0;
    var generated_code = [];
    var main_function = [];
    var header = [];
    var lhs_flag = false;
    var link = ["//Link\n#include <stdio.h>\n#include <stdbool.h>\n#include <complex.h>\n#include <string.h>\n#include <matrix.h>\n#include \"../convertSubscript.h\"\n#include \"./".concat(filename, ".h\"")];
    //#include <${filename}.h>
    var cursor_adjust = false;
    var current_code = "main";
    var extract_singular_mat = false;
    var tmp_tbl = [];
    var alias_tbl = [];
    var main_queue = [];
    var block_level = 1;
    var MAXCHAR = 20;
    var fun_params = {
        filename: filename,
        file: file,
        tree: tree,
        entry_fun_node: entry_fun_node,
        out_folder: out_folder,
        custom_functions: custom_functions,
        classes: classes,
        var_types: var_types,
        alias_tbl: alias_tbl,
        block_idxs: block_idxs,
        debug: debug,
        main_function: [],
        function_definitions: [],
        function_declarations: [],
        current_code: "main",
        block_level: block_level,
        tmp_tbl: tmp_tbl
    };
    // Update function parameters
    // -----------------------------------------------------------------------------
    function updateFunParams(update_or_extract) {
        if (update_or_extract == 0) {
            fun_params = {
                filename: filename,
                file: file,
                tree: tree,
                entry_fun_node: entry_fun_node,
                out_folder: out_folder,
                custom_functions: custom_functions,
                classes: classes,
                var_types: tmp_var_types,
                alias_tbl: alias_tbl,
                block_idxs: block_idxs,
                debug: debug,
                main_function: main_function,
                function_definitions: function_definitions,
                function_declarations: function_declarations,
                current_code: current_code,
                block_level: block_level,
                tmp_tbl: tmp_tbl
            };
        }
        else {
            custom_functions = fun_params.custom_functions;
            classes = fun_params.classes;
            tmp_var_types = fun_params.var_types;
            alias_tbl = fun_params.alias_tbl;
            main_function = fun_params.main_function;
            function_definitions = fun_params.function_definitions;
            function_declarations = fun_params.function_declarations;
            tmp_tbl = fun_params.tmp_tbl;
        }
    }
    // Main
    // -----------------------------------------------------------------------------
    function main() {
        if (debug == 1) {
            console.log("main");
        }
        var cursor = tree.walk();
        var _loop_1 = function () {
            var _a;
            var c = cursor;
            var node = c.currentNode;
            current_code = "main";
            tmp_var_types = var_types;
            switch (node.type) {
                case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                    current_code = node.nameNode.text;
                    var obj = custom_functions.find(function (x) { return x.name === current_code; });
                    if (obj != null && obj != undefined) {
                        tmp_var_types = obj.var_types;
                        if (tmp_var_types == null) {
                            tmp_var_types = [];
                        }
                    }
                    printFunctionDefDeclare(node);
                    break;
                }
                case "comment" /* g.SyntaxType.Comment */:
                case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                    var expression = transformNode(node);
                    if (expression != ";" && expression != null) {
                        updateFunParams(0);
                        _a = (0, modifyCode_1.pushToMain)(expression, fun_params), main_function = _a[0], function_definitions = _a[1];
                    }
                    break;
                }
                case "if_statement" /* g.SyntaxType.IfStatement */:
                case "while_statement" /* g.SyntaxType.WhileStatement */:
                case "for_statement" /* g.SyntaxType.ForStatement */: {
                    transformNode(node);
                    break;
                }
            }
            if (current_code == "main") {
                var_types = tmp_var_types;
            }
            else {
                var obj_1 = custom_functions.find(function (x) { return x.name === current_code; });
                if (obj_1 != null && obj_1 != undefined) {
                    obj_1.var_types = tmp_var_types;
                    custom_functions = custom_functions.filter(function (e) { return e.name !== obj_1.name; });
                    custom_functions.push(obj_1);
                }
            }
        };
        do {
            _loop_1();
        } while ((0, treeTraversal_1.gotoPreorderSucc_OnlyMajorTypes)(cursor, debug));
        /*if (current_code == "main") {
            var_types = tmp_var_types;
        } else {
            let obj = custom_functions.find(x => x.name === current_code);
            if (obj != null && obj != undefined) {
                obj.var_types = tmp_var_types;
                custom_functions = custom_functions.filter(function(e) { return e.name !== obj.name });
                custom_functions.push(obj);
            }
        }*/
    }
    function transformNode(node) {
        var _a;
        var transformed_node = transformNodeInternal(node);
        var expression = transformed_node;
        if (extract_singular_mat == true) {
            var flag = transformed_node != null;
            if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
                if (node.parent.leftNode.text == node.text || node.parent.rightNode.text == node.text) {
                    flag = false;
                }
            }
            /*if (node.parent.type == g.SyntaxType.CallOrSubscript) {
                flag = false;
            }*/
            // if 1x1 matrix "flatten" to regular int, double, or complex
            if (flag) {
                var var_type = (0, helperFunctions_1.filterByScope)(tmp_var_types, transformed_node, node, 0);
                if (var_type != null && var_type != undefined) {
                    if (var_type.ismatrix && var_type.dim.every(function (x) { return x === 1; })) {
                        updateFunParams(0);
                        _a = (0, helperFunctions_1.extractSingularMat)(transformed_node, var_type, node, fun_params), expression = _a[0], fun_params = _a[1];
                        updateFunParams(1);
                    }
                }
            }
        }
        return expression;
    }
    // Transform node
    // -----------------------------------------------------------------------------
    function transformNodeInternal(node) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41;
        if (debug == 1) {
            console.log("transformNode");
        }
        //if (node.startIndex < 150) {
        //console.log("TRANSFORM");
        //console.log(node.text);
        //console.log(node.type);
        //console.log("----------------------------");
        //}
        // at each iteration, check each element of mainQueue, if condition true then push expression
        var idx = 0;
        var mq_len = main_queue.length;
        for (var i = 0; i < mq_len; i++) {
            var result = ts.transpile(main_queue[idx].condition);
            var runnalbe = eval(result);
            if (runnalbe) {
                updateFunParams(0);
                _a = (0, modifyCode_1.pushToMain)(main_queue[idx].expression, fun_params), main_function = _a[0], function_definitions = _a[1];
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
                updateFunParams(0);
                _b = (0, modifyCode_1.pushToMain)("if (" + transformNode(node.conditionNode) + ") {", fun_params), main_function = _b[0], function_definitions = _b[1];
                block_level += 1;
                for (var i = 1; i < node.namedChildCount; i++) {
                    updateFunParams(0);
                    _c = (0, modifyCode_1.pushToMain)(transformNode(node.namedChildren[i]), fun_params), main_function = _c[0], function_definitions = _c[1];
                }
                block_level -= 1;
                updateFunParams(0);
                _d = (0, modifyCode_1.pushToMain)("\n}", fun_params), main_function = _d[0], function_definitions = _d[1];
                return null;
                break;
            }
            case "while_statement" /* g.SyntaxType.WhileStatement */: {
                updateFunParams(0);
                _e = (0, modifyCode_1.pushToMain)("while (" + transformNode(node.conditionNode) + ") {", fun_params), main_function = _e[0], function_definitions = _e[1];
                block_level += 1;
                for (var i = 1; i < node.namedChildCount; i++) {
                    updateFunParams(0);
                    _f = (0, modifyCode_1.pushToMain)(transformNode(node.namedChildren[i]), fun_params), main_function = _f[0], function_definitions = _f[1];
                }
                block_level -= 1;
                updateFunParams(0);
                _g = (0, modifyCode_1.pushToMain)("\n}", fun_params), main_function = _g[0], function_definitions = _g[1];
                return null;
                break;
            }
            case "for_statement" /* g.SyntaxType.ForStatement */: {
                var expression = [];
                var tmp_iter = (0, helperFunctions_1.generateTmpVar)("iter", tmp_tbl);
                //let tmp_iter = node.leftNode.text;
                if (node.rightNode.type == "slice" /* g.SyntaxType.Slice */) {
                    var children = [];
                    for (var i = 0; i < node.rightNode.namedChildCount; i++) {
                        extract_singular_mat = true;
                        children.push(transformNode(node.rightNode.namedChildren[i]));
                        extract_singular_mat = false;
                    }
                    var obj = tmp_var_types.find(function (x) { return x.name === node.leftNode.text; });
                    var type_1 = 'int';
                    if (node.rightNode.namedChildCount == 3) {
                        _h = (0, typeInference_1.inferType)(filename, node.rightNode.namedChildren[1], tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_1 = _h[0];
                    }
                    expression.push("for (".concat(type_1, " ").concat(tmp_iter, " = ").concat(children[0], ";"));
                    loop_iterators.push(tmp_iter);
                    updateFunParams(0);
                    alias_tbl = (0, helperFunctions_1.pushAliasTbl)(node.leftNode.text, tmp_iter, node.bodyNode, fun_params);
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
                        scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug)
                    });
                    if (children.length == 3) {
                        expression.push("".concat(tmp_iter, " <= ").concat(children[2], ";"));
                        expression.push("".concat(tmp_iter, " += ").concat(children[1]));
                    }
                    else {
                        expression.push("".concat(tmp_iter, " <= ").concat(children[1], ";"));
                        expression.push("++ ".concat(tmp_iter));
                    }
                    updateFunParams(0);
                    _j = (0, modifyCode_1.pushToMain)(expression.join(" ") + ") {", fun_params), main_function = _j[0], function_definitions = _j[1];
                }
                else if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    var tmp_var1 = (0, helperFunctions_1.generateTmpVar)("mat", tmp_tbl); // the matrix
                    //var tmp_var2 = generateTmpVar("tmp", tmp_tbl); // the iterating variable
                    var _42 = (0, typeInference_1.inferType)(filename, node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_2 = _42[0], ndim_1 = _42[1], dim_1 = _42[2], c_1 = _42[6];
                    custom_functions = c_1;
                    var obj = customTypes_1.type_to_matrix_type.find(function (x) { return x.type === type_2; });
                    if (obj != null) {
                        updateFunParams(0);
                        _k = (0, modifyCode_1.pushToMain)(initializeMatrix(node.rightNode, tmp_var1), fun_params), main_function = _k[0], function_definitions = _k[1];
                    }
                    // node.leftNode now equal to value of matrix tmp_var1 at index tmp_var2
                    updateFunParams(0);
                    _l = (0, modifyCode_1.pushToMain)("\n".concat(type_2, " ").concat(node.leftNode.text, ";"), fun_params), main_function = _l[0], function_definitions = _l[1];
                    updateFunParams(0);
                    _m = (0, modifyCode_1.pushToMain)("for (int ".concat(tmp_iter, " = 1; ").concat(tmp_iter, " <= ").concat((0, helperFunctions_1.numel)(dim_1), "; ").concat(tmp_iter, "++ ) {"), fun_params), main_function = _m[0], function_definitions = _m[1];
                    updateFunParams(0);
                    _o = (0, modifyCode_1.pushToMain)("indexM(".concat(tmp_var1, ", &").concat(node.leftNode.text, ", 1, ").concat(tmp_iter, ");"), fun_params), main_function = _o[0], function_definitions = _o[1];
                    loop_iterators.push(tmp_iter);
                }
                else if (node.rightNode.type == "identifier" /* g.SyntaxType.Identifier */) {
                    var tmp_var1 = transformNode(node.rightNode);
                    var _43 = (0, typeInference_1.inferType)(filename, node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_3 = _43[0], ndim_2 = _43[1], dim_2 = _43[2], c_2 = _43[6];
                    custom_functions = c_2;
                    updateFunParams(0);
                    _p = (0, modifyCode_1.pushToMain)("\n".concat(type_3, " ").concat(node.leftNode.text, ";"), fun_params), main_function = _p[0], function_definitions = _p[1];
                    updateFunParams(0);
                    _q = (0, modifyCode_1.pushToMain)("for (int ".concat(tmp_iter, " = 1; ").concat(tmp_iter, " <= ").concat((0, helperFunctions_1.numel)(dim_2), "; ").concat(tmp_iter, "++ ) {"), fun_params), main_function = _q[0], function_definitions = _q[1];
                    updateFunParams(0);
                    _r = (0, modifyCode_1.pushToMain)("indexM(".concat(tmp_var1, ", &").concat(node.leftNode.text, ", 1, ").concat(tmp_iter, ");"), fun_params), main_function = _r[0], function_definitions = _r[1];
                    loop_iterators.push(tmp_iter);
                }
                block_level += 1;
                for (var _i = 0, _44 = node.bodyNode.namedChildren; _i < _44.length; _i++) {
                    var child = _44[_i];
                    updateFunParams(0);
                    _s = (0, modifyCode_1.pushToMain)(transformNode(child), fun_params), main_function = _s[0], function_definitions = _s[1];
                }
                block_level -= 1;
                updateFunParams(0);
                _t = (0, modifyCode_1.pushToMain)("\n}", fun_params), main_function = _t[0], function_definitions = _t[1];
                var idx_1 = loop_iterators.indexOf(tmp_iter);
                /*if (node.rightNode.type == g.SyntaxType.Matrix || node.rightNode.type == g.SyntaxType.Identifier) {
                    idx = loop_iterators.indexOf(tmp_var2);
                }*/
                loop_iterators.splice(idx_1, 1);
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
                var _45 = parseNode(node, false), args1 = _45[0], outs = _45[1], is_subscript = _45[2];
                var arg_types = [];
                var args = [];
                var _46 = (0, typeInference_1.inferType)(filename, node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type = _46[0], ndim = _46[1], dim = _46[2], ismatrix = _46[3], ispointer = _46[4], isstruct = _46[5], c = _46[6];
                custom_functions = c;
                var init_flag = false;
                var lhs = null;
                if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "cell" /* g.SyntaxType.Cell */) {
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                    for (var _47 = 0, args1_1 = args1; _47 < args1_1.length; _47++) {
                        var arg = args1_1[_47];
                        lhs_flag = false;
                        args.push(transformNode(arg));
                        var _48 = (0, typeInference_1.inferType)(filename, arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _48[0], child_ndim = _48[1], child_dim = _48[2], child_ismatrix = _48[3], child_ispointer = _48[4], child_isstruct = _48[5], c_3 = _48[6];
                        custom_functions = c_3;
                        arg_types.push({
                            type: child_type,
                            ndim: child_ndim,
                            dim: child_dim,
                            ismatrix: child_ismatrix,
                            isvector: (0, helperFunctions_1.numel)(child_dim) > 1 && !child_ismatrix,
                            ispointer: child_ispointer,
                            isstruct: child_isstruct
                        });
                    }
                    for (var i = 0; i < outs.length; i++) {
                        lhs_flag = true;
                        outs[i] = transformNode(outs[i]);
                        lhs_flag = false;
                    }
                    if (type == 'heterogeneous') {
                        numCellStruct += 1;
                        if (numCellStruct == 1) {
                            main_function.unshift("\t// Structure for cell arrays\n\tstruct cell {\n\t\tint type;\n\t\tunion {\n\t\t\tint ival;\n\t\t\tdouble dval;\n\t\t\tcomplex double cval;\n\t\t\tchar chval[".concat(MAXCHAR, "];\n\t\t} data;\n\t};"));
                        }
                        var expression = [];
                        expression.push("struct cell ".concat(outs[0], "[").concat(node.rightNode.namedChildCount, "];"));
                        var types = [];
                        var _loop_2 = function (i) {
                            var child = node.rightNode.namedChildren[i];
                            var _65 = (0, typeInference_1.inferType)(filename, child, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _65[0], child_ndim = _65[1], child_dim = _65[2], child_ismatrix = _65[3], child_ispointer = _65[4], child_isstruct = _65[5], c_4 = _65[6];
                            custom_functions = c_4;
                            if (child.type == "matrix" /* g.SyntaxType.Matrix */) {
                                //expression1.push(`Matrix f${i}[${numel}];`);
                                //expression2.push(initializeMatrix(node.rightNode, `${outs[0]}.f${i}`, child_ndim, child_dim, type));
                            }
                            else if (child_type == 'char') {
                                expression.push("".concat(outs[0], "[").concat(i, "].type = 3;"));
                                //expression.push(`${outs[0]}[${i}].data.chval = ${child.text.replace(/'/g, '"')};`);
                                expression.push("strcpy(".concat(outs[0], "[").concat(i, "].data.chval, ").concat(child.text.replace(/'/g, '"'), ");"));
                            }
                            else {
                                var obj = customTypes_1.type_to_cell_type.find(function (x) { return x.type === child_type; });
                                expression.push("".concat(outs[0], "[").concat(i, "].type = ").concat(obj.cell_type, ";"));
                                expression.push("".concat(outs[0], "[").concat(i, "].data.").concat(obj.cell_val, " = ").concat(child.text, ";"));
                            }
                        };
                        for (var i = 0; i < node.rightNode.namedChildCount; i++) {
                            _loop_2(i);
                        }
                        updateFunParams(0);
                        _u = (0, modifyCode_1.pushToMain)(expression.join("\n") + "\n", fun_params), main_function = _u[0], function_definitions = _u[1];
                        /*let tmp_iter = generateTmpVar("iter", tmp_tbl);
                        updateFunParams(0);
[main_function, function_definitions] = pushToMain(`
for (int ${tmp_iter} = 0; ${tmp_iter} < ${node.rightNode.namedChildCount}; ${tmp_iter}++) {
\tswitch(${outs[0]}[${tmp_iter}].type) {
\t\tcase 0:
\t\tprintf("%d\\n", ${outs[0]}[${tmp_iter}].data.ival);
\t\tbreak;
        
\t\tcase 1:
\t\tprintf("%f\\n", ${outs[0]}[${tmp_iter}].data.dval);
\t\tbreak;
        
\t\tcase 2:
\t\tprintf("%f\\n", ${outs[0]}[${tmp_iter}].data.cval);
\t\tbreak;
        
\t\tcase 3:
\t\tprintf("%s\\n", ${outs[0]}[${tmp_iter}].data.chval);
\t\tbreak;
\t}
}
`, fun_params);*/
                    }
                    else {
                        var obj = customTypes_1.type_to_matrix_type.find(function (x) { return x.type === type; });
                        if (obj != null) {
                            updateFunParams(0);
                            _v = (0, modifyCode_1.pushToMain)(initializeMatrix(node.rightNode, outs[0]), fun_params), main_function = _v[0], function_definitions = _v[1];
                        }
                    }
                }
                else if (node.rightNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                    for (var i = 0; i < outs.length; i++) {
                        lhs_flag = true;
                        outs[i] = transformNode(outs[i]);
                        lhs_flag = false;
                    }
                    var obj = classes.find(function (x) { return x.name === node.rightNode.valueNode.text; });
                    // Is a class
                    if (obj != null) {
                        var rhs = obj.name;
                    }
                    else {
                        var obj1 = custom_functions.find(function (x) { return x.name === node.rightNode.valueNode.text; });
                        //let obj2 = builtin_funs.find(x => x.fun_matlab === node.rightNode.valueNode.text);
                        var obj2 = (0, helperFunctions_1.findBuiltin)(builtin_funs, node.rightNode.valueNode.text);
                        if (obj1 != null && obj1 != undefined) {
                            //lhs = obj1.outs_transform(args, arg_types, outs);
                            lhs = obj1.outs_transform(outs);
                        }
                        else if (obj2 != null && obj2 != undefined) {
                            lhs = obj2.outs_transform(args, arg_types, outs);
                        }
                    }
                    //lhs_flag = false;
                    var rhs = transformNode(node.rightNode);
                    init_flag = true;
                }
                else {
                    for (var i = 0; i < outs.length; i++) {
                        lhs_flag = true;
                        outs[i] = transformNode(outs[i]);
                        lhs_flag = false;
                    }
                    var rhs = transformNode(node.rightNode);
                    init_flag = true;
                    lhs = outs[0];
                }
                //if (node.leftNode.type != g.SyntaxType.CallOrSubscript && node.leftNode.type != g.SyntaxType.CellSubscript) {
                if (lhs == null && rhs != undefined && rhs != null) {
                    updateFunParams(0);
                    _w = (0, modifyCode_1.pushToMain)("".concat(rhs, ";"), fun_params), main_function = _w[0], function_definitions = _w[1];
                }
                else if (init_flag && rhs != undefined && rhs != null) {
                    if (lhs[0].indexOf("[") > -1 || lhs.indexOf("[") > -1) {
                        updateFunParams(0);
                        _x = (0, modifyCode_1.pushToMain)("".concat(lhs, " = ").concat(rhs, ";"), fun_params), main_function = _x[0], function_definitions = _x[1];
                    }
                    else {
                        updateFunParams(0);
                        var _49 = (0, helperFunctions_1.isInitialized)(lhs, node, type, fun_params), lhs2 = _49[0], var_type_1 = _49[1], flag1 = _49[2], flag2 = _49[3], fp = _49[4];
                        lhs = lhs2;
                        fun_params = fp;
                        updateFunParams(1);
                        if (var_type_1 != null && var_type_1 != undefined) {
                            if (flag1) {
                                updateFunParams(0);
                                if (lhs.includes("lhs_data")) {
                                    var alias_obj = alias_tbl.find(function (x) { return x.tmp_var == lhs; });
                                    _y = (0, modifyCode_1.pushToMain)("".concat(alias_obj.name, " = ").concat(rhs, ";"), fun_params), main_function = _y[0], function_definitions = _y[1];
                                }
                                else {
                                    _z = (0, modifyCode_1.pushToMain)("".concat(lhs, " = ").concat(rhs, ";"), fun_params), main_function = _z[0], function_definitions = _z[1];
                                }
                            }
                            else if (flag2) {
                                var tmp = (0, helperFunctions_1.generateTmpVar)(var_type_1.name, tmp_tbl);
                                tmp_var_types.push({
                                    name: tmp,
                                    type: type,
                                    ndim: ndim,
                                    dim: dim,
                                    ismatrix: ismatrix,
                                    isvector: (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix,
                                    ispointer: ispointer,
                                    isstruct: isstruct,
                                    initialized: true,
                                    scope: var_type_1.scope
                                });
                                updateFunParams(0);
                                //alias_tbl = pushAliasTbl(lhs, tmp, node, fun_params);
                                alias_tbl.push({
                                    name: lhs,
                                    tmp_var: tmp,
                                    scope: var_type_1.scope
                                });
                                updateFunParams(0);
                                _0 = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(tmp, rhs, tmp_var_types[tmp_var_types.length - 1], node), fun_params), main_function = _0[0], function_definitions = _0[1];
                            }
                            else {
                                updateFunParams(0);
                                _1 = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(lhs, rhs, var_type_1, node), fun_params), main_function = _1[0], function_definitions = _1[1];
                            }
                            //tmp_var_types = tmp_var_types.filter(function(e) { return e.name !== var_type.name });
                            tmp_var_types = tmp_var_types.filter(function (e) { return JSON.stringify(e) !== JSON.stringify(var_type_1); });
                            var_type_1.initialized = true;
                            if (var_type_1.type == "unknown") {
                                var_type_1.type = type;
                            }
                            tmp_var_types.push(var_type_1);
                        }
                        else {
                            var scope = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                            tmp_var_types.push({
                                name: lhs,
                                type: type,
                                ndim: ndim,
                                dim: dim,
                                ismatrix: ismatrix,
                                isvector: (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix,
                                ispointer: ispointer,
                                isstruct: isstruct,
                                initialized: true,
                                scope: scope
                            });
                            updateFunParams(0);
                            _2 = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(lhs, rhs, tmp_var_types[tmp_var_types.length - 1], node), fun_params), main_function = _2[0], function_definitions = _2[1];
                            var obj = tmp_tbl.find(function (x) { return "".concat(x.name).concat(x.count) === rhs; });
                            if (obj != null && obj != undefined) {
                                updateFunParams(0);
                                alias_tbl = (0, helperFunctions_1.pushAliasTbl)(lhs, rhs, node, fun_params);
                            }
                        }
                    }
                }
                //}
                if (node.leftNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    for (var j = 0; j < node.leftNode.namedChildCount; j++) {
                        var child = node.leftNode.namedChildren[j];
                        // If element j of LHS matrix is a subscript
                        if (is_subscript[j]) {
                            // Convert to linear idx
                            var obj4 = tmp_tbl.find(function (x) { return x.name == "d0_"; });
                            var idx_2 = getSubscriptIdx(child, obj4.count);
                            var tmp_data = (0, helperFunctions_1.generateTmpVar)("data", tmp_tbl);
                            var tmp_lhs = (0, helperFunctions_1.generateTmpVar)("lhs_data", tmp_tbl);
                            var tmp_rhs = (0, helperFunctions_1.generateTmpVar)("rhs_data", tmp_tbl);
                            var _50 = (0, typeInference_1.inferType)(filename, node.leftNode.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ltype = _50[0];
                            updateFunParams(0);
                            _3 = (0, modifyCode_1.pushToMain)("".concat(type, "* ").concat(tmp_lhs, " = ").concat(type.charAt(0), "_to_").concat(type.charAt(0), "(").concat(transformNode(child.valueNode), ");"), fun_params), main_function = _3[0], function_definitions = _3[1];
                            var _51 = (0, typeInference_1.inferType)(filename, outs[j], tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ismatrix_1 = _51[3], c_5 = _51[6];
                            custom_functions = c_5;
                            // If RHS is matrix
                            if (ismatrix_1) {
                                updateFunParams(0);
                                _4 = (0, modifyCode_1.pushToMain)("".concat(type, "* ").concat(tmp_rhs, " = ").concat(type.charAt(0), "_to_").concat(type.charAt(0), "(").concat(outs[j], ");"), fun_params), main_function = _4[0], function_definitions = _4[1];
                                for (var i = 0; i < idx_2.length; i++) {
                                    updateFunParams(0);
                                    _5 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_2[i], "] = ").concat(tmp_rhs, "[").concat(i, "];"), fun_params), main_function = _5[0], function_definitions = _5[1];
                                }
                                // If RHS not matrix
                            }
                            else {
                                for (var i = 0; i < idx_2.length; i++) {
                                    updateFunParams(0);
                                    _6 = (0, modifyCode_1.pushToMain)("".concat(outs[j], "[").concat(i, "] = ").concat(tmp_rhs, "[").concat(idx_2[i], "];"), fun_params), main_function = _6[0], function_definitions = _6[1];
                                }
                            }
                            var tmp_size = (0, helperFunctions_1.generateTmpVar)("size", tmp_tbl);
                            var tmp_iter = (0, helperFunctions_1.generateTmpVar)("iter", tmp_tbl);
                            var tmp_mat = (0, helperFunctions_1.generateTmpVar)("mat", tmp_tbl);
                            var obj1 = tmp_tbl.find(function (x) { return x.name === "ndim"; });
                            var tmp_ndim = "".concat(obj1.name).concat(obj1.count);
                            var obj2 = tmp_tbl.find(function (x) { return x.name === "dim"; });
                            var tmp_dim = "".concat(obj2.name).concat(obj2.count);
                            var obj3 = customTypes_1.type_to_matrix_type.find(function (x) { return x.type === type; });
                            updateFunParams(0);
                            _7 = (0, modifyCode_1.pushToMain)("int ".concat(tmp_size, " = 1;\nfor (int ").concat(tmp_iter, " = 0 ; ").concat(tmp_iter, " < ").concat(tmp_ndim, "; ").concat(tmp_iter, "++)\n{\n\t").concat(tmp_size, " *= ").concat(tmp_dim, "[").concat(tmp_iter, "];\n}\nMatrix *").concat(tmp_mat, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj3.matrix_type, ");\nwriteM(").concat(tmp_mat, ", ").concat(tmp_size, ", ").concat(tmp_lhs, ");"), fun_params), main_function = _7[0], function_definitions = _7[1];
                            //printM(${tmp_mat});`); 
                            updateFunParams(0);
                            alias_tbl = (0, helperFunctions_1.pushAliasTbl)(child.valueNode.text, tmp_mat, node, fun_params);
                            var obj = (0, helperFunctions_1.filterByScope)(tmp_var_types, child.valueNode.text, child, 0);
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
                }
                else {
                    // If LHS is a subscript
                    if (node.leftNode.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                        /*let scope = findVarScope(filename, node, block_idxs, current_code, debug);
                        if (loop_iterators.length > 0) {
                            scope = block_idxs.filter(function(e) { return e[2] == scope[2] - loop_iterators.length })
                            scope = scope[scope.length - 1];
                        }
                        updateFunParams(0);
                        alias_tbl = pushAliasTbl(node.leftNode.text, rhs, node, fun_params);
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
                        });*/
                    }
                    else if (is_subscript[0]) {
                        // Convert to linear idx
                        var obj4 = tmp_var_types.filter(function (x) { return /ndim/.test(x.name) && x.propertyOf == node.leftNode.valueNode.text && node.startIndex >= x.scope[0] && node.endIndex <= x.scope[1]; });
                        var idx_3 = getSubscriptIdx(node.leftNode, obj4[obj4.length - 1].name.match(/\d+/)[0]);
                        var scope_1 = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                        if (loop_iterators.length > 0) {
                            scope_1 = block_idxs.filter(function (e) { return e[2] == scope_1[2] - loop_iterators.length; });
                            scope_1 = scope_1[scope_1.length - 1];
                        }
                        var obj6 = tmp_tbl.find(function (x) { return x.name == "lhs_data"; });
                        var new_flag = true;
                        var tmp_lhs = "lhs_data";
                        if (obj6 != null && obj6 != undefined) {
                            //let obj5 = tmp_var_types.find(x => x.name == `lhs_data${obj6.count}`);
                            var obj5 = (0, helperFunctions_1.filterByScope)(tmp_var_types, "lhs_data".concat(obj6.count), node, 0);
                            if (obj5 != null && obj5 != undefined) {
                                if (obj5.loop == loop_iterators.join("")) {
                                    new_flag = false;
                                    tmp_lhs = obj5.name;
                                }
                            }
                        }
                        var obj7 = (0, helperFunctions_1.filterByScope)(alias_tbl, node.leftNode.valueNode.text, node, 0);
                        if (obj7 != null && obj7 != undefined) {
                            if (obj7.tmp_var.includes("lhs_data")) {
                                new_flag = false;
                                tmp_lhs = obj7.tmp_var;
                            }
                        }
                        if (new_flag) {
                            var tmp_data = (0, helperFunctions_1.generateTmpVar)("data", tmp_tbl);
                            tmp_lhs = (0, helperFunctions_1.generateTmpVar)("lhs_data", tmp_tbl);
                            var tmp_rhs = (0, helperFunctions_1.generateTmpVar)("rhs_data", tmp_tbl);
                            var _52 = (0, typeInference_1.inferType)(filename, outs[0], tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ismatrix_2 = _52[3], c_6 = _52[6];
                            custom_functions = c_6;
                            var obj8 = (0, helperFunctions_1.filterByScope)(tmp_var_types, "".concat(node.leftNode.valueNode.text, "_init"), node, 0);
                            var _53 = (0, typeInference_1.inferType)(filename, node.leftNode.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ltype = _53[0];
                            if (obj8 != null && obj8 != undefined) {
                                _8 = (0, typeInference_1.inferTypeByName)("".concat(node.leftNode.valueNode.text, "_init"), node, tmp_var_types, custom_functions, alias_tbl, debug), ltype = _8[0];
                            }
                            var tmp_block_level = block_level;
                            var transformed_lhs_valueNode = transformNode(node.leftNode.valueNode);
                            updateFunParams(0);
                            _9 = (0, modifyCode_1.insertMain)("".concat(type, "* ").concat(tmp_lhs, " = ").concat(ltype.charAt(0), "_to_").concat(type.charAt(0), "(").concat(transformed_lhs_valueNode, ");"), "".concat(transformed_lhs_valueNode, " ="), 1, fun_params), main_function = _9[0], function_definitions = _9[1], tmp_block_level = _9[2];
                            // If RHS is matrix
                            if (ismatrix_2) {
                                updateFunParams(0);
                                _10 = (0, modifyCode_1.pushToMain)("".concat(type, "* ").concat(tmp_rhs, " = ").concat(type.charAt(0), "_to_").concat(type.charAt(0), "(").concat(outs[0], ");"), fun_params), main_function = _10[0], function_definitions = _10[1];
                                for (var i = 0; i < idx_3.length; i++) {
                                    updateFunParams(0);
                                    _11 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[i], "] = ").concat(tmp_rhs, "[").concat(i, "];"), fun_params), main_function = _11[0], function_definitions = _11[1];
                                }
                                // If RHS not matrix
                            }
                            else {
                                if (idx_3.length == 1) {
                                    updateFunParams(0);
                                    _12 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[0], "] = ").concat(lhs, ";"), fun_params), main_function = _12[0], function_definitions = _12[1];
                                }
                                else {
                                    for (var i = 0; i < idx_3.length; i++) {
                                        updateFunParams(0);
                                        _13 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[i], "] = ").concat(lhs, "[").concat(i, "];"), fun_params), main_function = _13[0], function_definitions = _13[1];
                                    }
                                }
                            }
                            var tmp_size = (0, helperFunctions_1.generateTmpVar)("size", tmp_tbl);
                            var tmp_iter = (0, helperFunctions_1.generateTmpVar)("iter", tmp_tbl);
                            var tmp_mat = (0, helperFunctions_1.generateTmpVar)("mat", tmp_tbl);
                            var obj1 = tmp_tbl.find(function (x) { return x.name === "ndim"; });
                            var tmp_ndim = "".concat(obj1.name).concat(obj1.count);
                            var obj2 = tmp_tbl.find(function (x) { return x.name === "dim"; });
                            var tmp_dim = "".concat(obj2.name).concat(obj2.count);
                            var obj3 = customTypes_1.type_to_matrix_type.find(function (x) { return x.type === type; });
                            var re = new RegExp("".concat(node.leftNode.valueNode.text, "\\([\\s\\w+\\-\\*]*\\)(=| =)"));
                            updateFunParams(0);
                            var lastSubscript = (0, helperFunctions_1.findLastSubscript)(node.leftNode.valueNode, fun_params);
                            var condition = "(block_level == ".concat(tmp_block_level, ");");
                            var lhs_scope = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                            var lhs_scope2 = JSON.parse(JSON.stringify(lhs_scope));
                            if (lastSubscript[0] != null) {
                                lhs_scope2[1] = lastSubscript[1];
                                alias_tbl.push({
                                    name: node.leftNode.valueNode.text,
                                    tmp_var: tmp_lhs,
                                    scope: lhs_scope2
                                });
                                condition = "\nfunction myfun(block_level, node) {\n    if ((block_level == ".concat(tmp_block_level, ") && node.previousNamedSibling !== null) {\n        if (node.previousNamedSibling.text.includes(\"").concat(lastSubscript[0], "\")) {\n            return true;\n        }\n    }\n    return false;\n}\nmyfun(block_level, node);");
                            }
                            var mq = {
                                expression: "// Write matrix ".concat(tmp_mat, "\nint ").concat(tmp_size, " = 1;\nfor (int ").concat(tmp_iter, " = 0 ; ").concat(tmp_iter, " < ").concat(tmp_ndim, "; ").concat(tmp_iter, "++)\n{\n\t").concat(tmp_size, " *= ").concat(tmp_dim, "[").concat(tmp_iter, "];\n}\nMatrix *").concat(tmp_mat, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj3.matrix_type, ");\nwriteM(").concat(tmp_mat, ", ").concat(tmp_size, ", ").concat(tmp_lhs, ");"),
                                condition: condition
                            };
                            main_queue.push(mq);
                            updateFunParams(0);
                            //alias_tbl = pushAliasTbl(node.leftNode.valueNode.text, tmp_mat, node, fun_params);
                            var obj = (0, helperFunctions_1.filterByScope)(tmp_var_types, node.leftNode.valueNode.text, node, 0);
                            alias_tbl.push({
                                name: node.leftNode.valueNode.text,
                                tmp_var: tmp_mat,
                                scope: [lhs_scope2[1] + 1, obj.scope[1], obj.scope[2]] //scope
                            });
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
                                scope: [lhs_scope2[1] + 1, obj.scope[1], obj.scope[2]] //scope
                            });
                            tmp_var_types.push({
                                name: tmp_lhs,
                                //type: loop_iterators.join(""),
                                type: ltype,
                                ndim: 1,
                                dim: [(0, helperFunctions_1.numel)(obj.dim)],
                                ismatrix: false,
                                isvector: true,
                                ispointer: false,
                                isstruct: false,
                                initialized: true,
                                scope: lhs_scope2,
                                loop: loop_iterators.join("")
                            });
                            // SPONGEBOB
                            if (node.leftNode.valueNode.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                                main_queue.push({
                                    expression: "".concat(transformed_lhs_valueNode, " = ").concat(tmp_mat, ";"),
                                    condition: condition
                                });
                            }
                        }
                        else {
                            if (idx_3.length == 1) {
                                updateFunParams(0);
                                _14 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[0], "] = ").concat(lhs, ";"), fun_params), main_function = _14[0], function_definitions = _14[1];
                            }
                            else {
                                for (var i = 0; i < idx_3.length; i++) {
                                    updateFunParams(0);
                                    _15 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[i], "] = ").concat(lhs, "[").concat(i, "];"), fun_params), main_function = _15[0], function_definitions = _15[1];
                                }
                            }
                        }
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
                for (var _54 = 0, _55 = node.namedChildren; _54 < _55.length; _54++) {
                    var child = _55[_54];
                    expression.push(transformNode(child));
                }
                return expression.join("\n");
                break;
            }
            case "cell_subscript" /* g.SyntaxType.CellSubscript */: {
                var _56 = (0, typeInference_1.inferType)(filename, node.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_4 = _56[0], ndim_3 = _56[1], dim_3 = _56[2], ismatrix_3 = _56[3], ispointer_1 = _56[4], isstruct_1 = _56[5], c_7 = _56[6];
                // only use indexM if subscript is on rhs
                var count = '';
                var obj = tmp_var_types.find(function (x) { return /ndim/.test(x.name) && x.propertyOf == node.valueNode.text && node.startIndex >= x.scope[0] && node.endIndex <= x.scope[1]; });
                if (obj == null || obj == undefined) {
                    //let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(filename, node.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
                    var tmp_ndim = (0, helperFunctions_1.generateTmpVar)("ndim", tmp_tbl);
                    var tmp_dim = (0, helperFunctions_1.generateTmpVar)("dim", tmp_tbl);
                    count = tmp_ndim.match(/\d+/)[0];
                    var scope = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                    var expression = [];
                    //expression.push(`int ${tmp_ndim} = getnDimM(*${transformNode(node.valueNode)});`);
                    expression.push("int ".concat(tmp_ndim, " = ").concat(ndim_3, ";"));
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
                        scope: scope,
                        propertyOf: node.valueNode.text
                    });
                    //expression.push(`int *${tmp_dim} = getDimsM(*${transformNode(node.valueNode)});`);
                    expression.push("int ".concat(tmp_dim, "[").concat(ndim_3, "] = {").concat(dim_3, "};"));
                    tmp_var_types.push({
                        name: tmp_dim,
                        type: 'int',
                        ndim: dim_3.length,
                        dim: [dim_3.length],
                        ismatrix: false,
                        isvector: true,
                        ispointer: false,
                        isstruct: false,
                        initialized: true,
                        scope: scope,
                        propertyOf: node.valueNode.text
                    });
                    updateFunParams(0);
                    _16 = (0, modifyCode_1.pushToMain)(expression.join("\n"), fun_params), main_function = _16[0], function_definitions = _16[1];
                }
                else {
                    count = obj.name.match(/\d+/)[0];
                }
                //let index = getSubscriptIdx(node, count);
                if (type_4 == "heterogeneous") {
                    var index = getSubscriptIdx(node, count);
                    var tmp_var_1 = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl);
                    updateFunParams(0);
                    _17 = (0, modifyCode_1.pushToMain)("struct cell ".concat(tmp_var_1, " = ").concat(node.valueNode.text, "[").concat(index[0], "];"), fun_params), main_function = _17[0], function_definitions = _17[1];
                    tmp_var_types.push({
                        name: tmp_var_1,
                        type: 'dynamic',
                        ndim: 1,
                        dim: [1],
                        ismatrix: false,
                        isvector: false,
                        ispointer: false,
                        isstruct: false,
                        initialized: true,
                        scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug)
                    });
                    alias_tbl = (0, helperFunctions_1.pushAliasTbl)(node.text, tmp_var_1, node, fun_params);
                    return tmp_var_1;
                }
                //if (!lhs_flag) {
                var obj2 = (0, helperFunctions_1.filterByScope)(alias_tbl, node.text, node, 0);
                if (obj2 == null || obj2 == undefined) {
                    var index = getSubscriptIdx(node, count);
                    alias_tbl = (0, helperFunctions_1.pushAliasTbl)(node.text, "".concat(transformNode(node.valueNode), "[").concat(index[0], "]"), node, fun_params);
                    return "".concat(transformNode(node.valueNode), "[").concat(index[0], "]");
                }
                else {
                    tmp_var = obj2.tmp_var;
                    return tmp_var;
                }
                //}
                //return `${node.valueNode.text}[${index[0]}]`;
                break;
            }
            case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                // Is a custom function call
                var obj = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
                var _57 = parseNode(node, false), args1 = _57[0], outs = _57[1], is_subscript = _57[2];
                var arg_types = [];
                var args = [];
                var _loop_3 = function (i) {
                    var _66;
                    var arg = args1[i];
                    if (lhs_flag) {
                        args.push(arg.text);
                    }
                    else if ((arg.text.includes("hamming") || arg.text.includes("hanning")) && node.valueNode.text == "stft") {
                        args.push("".concat(arg.namedChildren[0].text, "(").concat(transformNode(arg.namedChildren[1]), ")"));
                    }
                    else {
                        args.push(transformNode(arg));
                    }
                    var _67 = (0, typeInference_1.inferType)(filename, arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_5 = _67[0], ndim_4 = _67[1], dim_4 = _67[2], ismatrix_4 = _67[3], ispointer_2 = _67[4], isstruct_2 = _67[5], c_8 = _67[6];
                    if (/tmp.*\[0\]/.test(args[i])) {
                        _66 = (0, typeInference_1.inferTypeByName)(args[i], node, tmp_var_types, custom_functions, alias_tbl, debug), type_5 = _66[0], ndim_4 = _66[1], dim_4 = _66[2], ismatrix_4 = _66[3], ispointer_2 = _66[5], isstruct_2 = _66[6], c_8 = _66[7];
                    }
                    var isvector = (0, helperFunctions_1.numel)(dim_4) > 1 && !ismatrix_4;
                    // If a tmp var, infer type by name
                    if (args[i] != null) {
                        var match_1 = args[i].match(/^([a-zA-Z_]+)(\d+)$/);
                        if (match_1 != null) {
                            var tmpvar_obj = tmp_tbl.find(function (x) { return x.name == match_1[1] && Number(x.count) >= Number(match_1[2]); });
                            if (tmpvar_obj != null && tmpvar_obj != undefined) {
                                var _68 = (0, typeInference_1.inferTypeByName)(args[i], node, tmp_var_types, custom_functions, alias_tbl, debug), type2 = _68[0], ndim2 = _68[1], dim2 = _68[2], ismatrix2 = _68[3], isvector2 = _68[4], ispointer2 = _68[5], isstruct2 = _68[6], c2 = _68[7];
                                if (type2 != null) {
                                    type_5 = type2;
                                    ndim_4 = ndim2;
                                    dim_4 = dim2;
                                    ismatrix_4 = ismatrix2;
                                    isvector = isvector2;
                                    ispointer_2 = ispointer2;
                                    isstruct_2 = isstruct2;
                                    c_8 = c2;
                                }
                                //[type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferTypeByName(args[i], node, tmp_var_types, custom_functions, alias_tbl, debug);
                            }
                        }
                    }
                    /*if (arg.type != g.SyntaxType.CellSubscript && ismatrix) { // if a matrix, could actually be a vector so check var name to see if initialized as vector
                        [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferTypeByName(args[i], node, tmp_var_types, custom_functions, alias_tbl, debug);
                    }*/
                    custom_functions = c_8;
                    arg_types.push({
                        type: type_5,
                        ndim: ndim_4,
                        dim: dim_4,
                        ismatrix: ismatrix_4,
                        isvector: isvector,
                        ispointer: ispointer_2,
                        isstruct: isstruct_2
                    });
                };
                //for (let arg of args1) {
                for (var i = 0; i < args1.length; i++) {
                    _loop_3(i);
                }
                if (node.valueNode.text == "sprintf") {
                    if (node.parent.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                        if (node.parent.valueNode.text == "disp") {
                            args.unshift('disp');
                        }
                    }
                }
                for (var i = 0; i < outs.length; i++) {
                    //outs[i] = transformNode(outs[i]);
                    outs[i] = outs[i].text;
                }
                if (obj != null && obj != undefined) {
                    // Is a custom function
                    var ptr_args = obj.ptr_args(arg_types, outs);
                    if (ptr_args != null) {
                        var ptr_declaration = [];
                        for (var i = 0; i < ptr_args.length; i++) {
                            var tmp_ptr = (0, helperFunctions_1.generateTmpVar)(ptr_args[i].name, tmp_tbl);
                            args.push("&".concat(tmp_ptr));
                            ptr_args[i].ispointer = false;
                            ptr_declaration.push((0, helperFunctions_1.initVar)(tmp_ptr, null, ptr_args[i], node));
                            updateFunParams(0);
                            alias_tbl = (0, helperFunctions_1.pushAliasTbl)(ptr_args[i].name, tmp_ptr, node, fun_params);
                            tmp_var_types.push({
                                name: tmp_ptr,
                                type: ptr_args[i].type,
                                ndim: ptr_args[i].ndim,
                                dim: ptr_args[i].dim,
                                ismatrix: ptr_args[i].ismatrix,
                                isvector: (0, helperFunctions_1.numel)(ptr_args[i].dim) > 1 && !ptr_args[i].ismatrix,
                                ispointer: false,
                                isstruct: ptr_args[i].isstruct,
                                initialized: true,
                                scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug)
                            });
                        }
                        updateFunParams(0);
                        _18 = (0, modifyCode_1.pushToMain)(ptr_declaration.join("\n"), fun_params), main_function = _18[0], function_definitions = _18[1];
                    }
                    if (path.parse(obj.file).name !== path.parse(file).name) {
                        //link.push(`#include <${path.parse(obj.file).name}.h>`);
                        link.push("#include \"./".concat(path.parse(obj.file).name, ".h\""));
                    }
                    if (obj.arg_type_dic.length == 1) {
                        return "".concat(obj.name, "(").concat(args.join(", "), ")");
                    }
                    else {
                        var typestr = '';
                        for (var i = 0; i < arg_types.length; i++) {
                            typestr = typestr.concat(arg_types[i].type);
                        }
                        return "".concat(obj.name, "_").concat(typestr, "(").concat(args.join(", "), ")");
                    }
                }
                else {
                    // Is a builtin function call
                    var obj_2 = (0, helperFunctions_1.findBuiltin)(builtin_funs, node.valueNode.text);
                    if (obj_2 != null && obj_2 != undefined) {
                        var req_arg_types = obj_2.req_arg_types(args, arg_types, outs);
                        var init_before_1 = obj_2.init_before(args, arg_types, outs);
                        var push_before = obj_2.push_main_before(args, arg_types, outs);
                        var push_after = obj_2.push_main_after(args, arg_types, outs);
                        var return_type = obj_2.return_type(args, arg_types, outs);
                        var fun_c = obj_2.fun_c(args, arg_types, outs, node.valueNode.text);
                        var scope = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                        var tmp_out_transform = obj_2.tmp_out_transform(args, arg_types, outs);
                        var push_alias_tbl = obj_2.push_alias_tbl(args, arg_types, outs);
                        args = obj_2.args_transform(args, arg_types, outs);
                        if (req_arg_types != null) {
                            for (var i = 0; i < Math.min(req_arg_types.length, arg_types.length); i++) {
                                if (!req_arg_types[i].ismatrix && arg_types[i].ismatrix) {
                                    if (arg_types[i].dim.every(function (x) { return x === 1; })) {
                                        var expression = "";
                                        updateFunParams(0);
                                        _19 = (0, helperFunctions_1.extractSingularMat)(args[i], arg_types[i], node, fun_params), expression = _19[0], fun_params = _19[1];
                                        updateFunParams(1);
                                        args[i] = expression;
                                    }
                                }
                            }
                        }
                        if (fun_c !== null) {
                            fun_c = fun_c.replace('fun_matlab', node.valueNode.text);
                        }
                        if (init_before_1 != null && init_before_1 != undefined) {
                            var _loop_4 = function (i) {
                                var _69, _70;
                                if (init_before_1[i].name == "complex_one") {
                                    var obj2 = tmp_var_types.find(function (x) { return x.name === init_before_1[i].name; });
                                    if (obj2 == null || obj2 == undefined) {
                                        updateFunParams(0);
                                        _69 = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(init_before_1[i].name, init_before_1[i].val, init_before_1[i], node), fun_params), main_function = _69[0], function_definitions = _69[1];
                                        tmp_var_types.push({
                                            name: init_before_1[i].name,
                                            type: init_before_1[i].type,
                                            ndim: init_before_1[i].ndim,
                                            dim: init_before_1[i].dim,
                                            ismatrix: init_before_1[i].ismatrix,
                                            isvector: (0, helperFunctions_1.numel)(init_before_1[i].dim) > 1 && !init_before_1[i].ismatrix,
                                            ispointer: init_before_1[i].ispointer,
                                            isstruct: init_before_1[i].isstruct,
                                            initialized: true,
                                            scope: scope
                                        });
                                    }
                                }
                                else {
                                    var tmp_var_2 = (0, helperFunctions_1.generateTmpVar)(init_before_1[i].name, tmp_tbl);
                                    updateFunParams(0);
                                    alias_tbl = (0, helperFunctions_1.pushAliasTbl)(init_before_1[i].name, tmp_var_2, node, fun_params);
                                    args[args.indexOf(init_before_1[i].name)] = tmp_var_2;
                                    args[args.indexOf("&" + init_before_1[i].name)] = "&" + tmp_var_2;
                                    var re = new RegExp("\\b".concat(init_before_1[i].name, "\\b"), 'g');
                                    if (push_before != null) {
                                        push_before = push_before.replace(re, tmp_var_2);
                                    }
                                    if (push_after != null) {
                                        push_after = push_after.replace(re, tmp_var_2);
                                    }
                                    for (var j = i + 1; j < init_before_1.length; j++) {
                                        init_before_1[j].val = "".concat(init_before_1[j].val).replace(re, tmp_var_2);
                                    }
                                    updateFunParams(0);
                                    _70 = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(tmp_var_2, init_before_1[i].val, init_before_1[i], node), fun_params), main_function = _70[0], function_definitions = _70[1];
                                    if (outs.length > 0 && (init_before_1[i].name == "ndim" || init_before_1[i].name == "dim")) {
                                        tmp_var_types.push({
                                            name: tmp_var_2,
                                            type: init_before_1[i].type,
                                            ndim: init_before_1[i].ndim,
                                            dim: init_before_1[i].dim,
                                            ismatrix: init_before_1[i].ismatrix,
                                            isvector: (0, helperFunctions_1.numel)(init_before_1[i].dim) > 1 && !init_before_1[i].ismatrix,
                                            ispointer: init_before_1[i].ispointer,
                                            isstruct: init_before_1[i].isstruct,
                                            initialized: true,
                                            scope: scope,
                                            propertyOf: outs[0]
                                        });
                                    }
                                    else {
                                        tmp_var_types.push({
                                            name: tmp_var_2,
                                            type: init_before_1[i].type,
                                            ndim: init_before_1[i].ndim,
                                            dim: init_before_1[i].dim,
                                            ismatrix: init_before_1[i].ismatrix,
                                            isvector: (0, helperFunctions_1.numel)(init_before_1[i].dim) > 1 && !init_before_1[i].ismatrix,
                                            ispointer: init_before_1[i].ispointer,
                                            isstruct: init_before_1[i].isstruct,
                                            initialized: true,
                                            scope: scope
                                        });
                                    }
                                }
                            };
                            for (var i = 0; i < init_before_1.length; i++) {
                                _loop_4(i);
                            }
                        }
                        updateFunParams(0);
                        _20 = (0, modifyCode_1.pushToMain)(push_before, fun_params), main_function = _20[0], function_definitions = _20[1];
                        var n_args = node.namedChildCount - 1;
                        if (n_args < obj_2.n_req_args && obj_2.opt_arg_defaults != null) {
                            args = args.concat(obj_2.opt_arg_defaults.slice(0, obj_2.n_req_args - n_args));
                        }
                        var ptr_args = obj_2.ptr_args(arg_types, outs);
                        if (ptr_args != null) {
                            var ptr_declaration = [];
                            var tmp_ptr = "tmp_ptr";
                            var _loop_5 = function (i) {
                                tmp_ptr = (0, helperFunctions_1.generateTmpVar)(ptr_args[i].name, tmp_tbl);
                                if (push_alias_tbl != null) {
                                    var idx_4 = push_alias_tbl.map(function (e) { return e.tmp_var; }).indexOf(ptr_args[i].name);
                                    if (idx_4 > -1) {
                                        push_alias_tbl[idx_4].tmp_var = tmp_ptr;
                                        var re_1 = new RegExp("".concat(ptr_args[i].name, "\\d+"));
                                        alias_tbl = alias_tbl.filter(function (x) { return !re_1.test(x.tmp_var); });
                                    }
                                }
                                args.push("&".concat(tmp_ptr));
                                ptr_args[i].ispointer = false;
                                ptr_declaration.push((0, helperFunctions_1.initVar)(tmp_ptr, null, ptr_args[i], node));
                                var re = new RegExp("\\b".concat(ptr_args[i].name, "\\b"), 'g');
                                if (push_after != null) {
                                    push_after = push_after.replace(re, tmp_ptr);
                                }
                                tmp_var_types.push({
                                    name: tmp_ptr,
                                    type: ptr_args[i].type,
                                    ndim: ptr_args[i].ndim,
                                    dim: ptr_args[i].dim,
                                    ismatrix: ptr_args[i].ismatrix,
                                    isvector: ptr_args[i].isvector,
                                    ispointer: false,
                                    isstruct: ptr_args[i].isstruct,
                                    initialized: true,
                                    scope: scope
                                });
                                updateFunParams(0);
                                alias_tbl = (0, helperFunctions_1.pushAliasTbl)(ptr_args[i].name, tmp_ptr, node, fun_params);
                            };
                            for (var i = 0; i < ptr_args.length; i++) {
                                _loop_5(i);
                            }
                            updateFunParams(0);
                            _21 = (0, modifyCode_1.pushToMain)(ptr_declaration.join("\n"), fun_params), main_function = _21[0], function_definitions = _21[1];
                            if (push_alias_tbl != null) {
                                for (var i = 0; i < push_alias_tbl.length; i++) {
                                    if (push_alias_tbl[i].scope == null) {
                                        push_alias_tbl[i].scope = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                                    }
                                    alias_tbl.push(push_alias_tbl[i]);
                                }
                            }
                            // ptr args were originally outputs in MATLAB code
                            // in the case of 1 ptr arg:
                            // disp(det(A)) -> determinantM(A, &d); fprint("%i", d) 
                            if ((ptr_args.length == 1) && (return_type == null)) {
                                alias_tbl.push({
                                    name: node.text,
                                    tmp_var: tmp_ptr,
                                    scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug)
                                });
                                if (fun_c != null) {
                                    updateFunParams(0);
                                    _22 = (0, modifyCode_1.pushToMain)("".concat(fun_c, "(").concat(args.join(", "), ");"), fun_params), main_function = _22[0], function_definitions = _22[1];
                                    updateFunParams(0);
                                    _23 = (0, modifyCode_1.pushToMain)(push_after, fun_params), main_function = _23[0], function_definitions = _23[1];
                                }
                                return tmp_ptr;
                            }
                        }
                        if (fun_c == null) {
                            return null;
                        }
                        else {
                            if (return_type == null) {
                                if (args == null) {
                                    updateFunParams(0);
                                    _24 = (0, modifyCode_1.pushToMain)("".concat(fun_c, ";"), fun_params), main_function = _24[0], function_definitions = _24[1];
                                }
                                else if (args[0] == 'void') {
                                    updateFunParams(0);
                                    _25 = (0, modifyCode_1.pushToMain)("".concat(fun_c, "();"), fun_params), main_function = _25[0], function_definitions = _25[1];
                                }
                                else {
                                    updateFunParams(0);
                                    _26 = (0, modifyCode_1.pushToMain)("".concat(fun_c, "(").concat(args.join(", "), ");"), fun_params), main_function = _26[0], function_definitions = _26[1];
                                }
                                updateFunParams(0);
                                _27 = (0, modifyCode_1.pushToMain)(push_after, fun_params), main_function = _27[0], function_definitions = _27[1];
                                return null;
                            }
                            else {
                                var var_val = "".concat(fun_c);
                                if (args != null) {
                                    var_val = "".concat(fun_c, "(").concat(args.join(", "), ")");
                                }
                                //if (push_after != null || node.parent.type == g.SyntaxType.CallOrSubscript || tmp_out_transform != null) {
                                var tmp_var_3 = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl);
                                if (init_before_1 != null) {
                                    var tmp_out_obj = init_before_1.find(function (x) { return x.name == 'tmp_out'; });
                                }
                                if (tmp_out_obj != null && tmp_out_obj != undefined) {
                                    var tmp_out_obj2 = tmp_tbl.find(function (x) { return x.name == 'tmp_out'; });
                                    updateFunParams(0);
                                    _28 = (0, modifyCode_1.replaceMain)(tmp_var_3, "".concat(tmp_out_obj2.name).concat(tmp_out_obj2.count), 1, fun_params), main_function = _28[0], function_definitions = _28[1];
                                    updateFunParams(0);
                                    _29 = (0, modifyCode_1.pushToMain)("".concat(tmp_var_3, " = ").concat(var_val, ";"), fun_params), main_function = _29[0], function_definitions = _29[1];
                                    tmp_var_types.push({
                                        name: tmp_var_3,
                                        type: tmp_out_obj.type,
                                        ndim: tmp_out_obj.ndim,
                                        dim: tmp_out_obj.dim,
                                        ismatrix: tmp_out_obj.ismatrix,
                                        isvector: tmp_out_obj.isvector,
                                        ispointer: tmp_out_obj.ispointer,
                                        isstruct: false,
                                        initialized: true,
                                        scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug)
                                    });
                                }
                                if (fun_c == "getDimsM") {
                                    tmp_var_3 = (0, helperFunctions_1.generateTmpVar)("dim", tmp_tbl);
                                }
                                if (tmp_out_obj == null || tmp_out_obj == undefined) {
                                    updateFunParams(0);
                                    _30 = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(tmp_var_3, var_val, return_type, node), fun_params), main_function = _30[0], function_definitions = _30[1];
                                }
                                updateFunParams(0);
                                _31 = (0, modifyCode_1.pushToMain)(push_after, fun_params), main_function = _31[0], function_definitions = _31[1];
                                //alias_tbl = pushAliasTbl(node.text, tmp_var, node, fun_params);
                                if (fun_c == "getDimsM") {
                                    tmp_var_types.push({
                                        name: tmp_var_3,
                                        type: return_type.type,
                                        ndim: return_type.ndim,
                                        dim: return_type.dim,
                                        ismatrix: return_type.ismatrix,
                                        isvector: return_type.isvector,
                                        ispointer: return_type.ispointer,
                                        isstruct: false,
                                        initialized: true,
                                        scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug),
                                        propertyOf: args[0]
                                    });
                                }
                                else if (tmp_out_obj == null || tmp_out_obj == undefined) {
                                    tmp_var_types.push({
                                        name: tmp_var_3,
                                        type: return_type.type,
                                        ndim: return_type.ndim,
                                        dim: return_type.dim,
                                        ismatrix: return_type.ismatrix,
                                        isvector: return_type.isvector,
                                        ispointer: return_type.ispointer,
                                        isstruct: false,
                                        initialized: true,
                                        scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug)
                                    });
                                }
                                if (tmp_out_transform != null) {
                                    tmp_out_transform = tmp_out_transform.replace('tmp_out', tmp_var_3);
                                    return tmp_out_transform;
                                }
                                var scope_2 = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                                alias_tbl.push({
                                    name: node.text,
                                    tmp_var: tmp_var_3,
                                    scope: [node.endIndex + 1, scope_2[1]]
                                });
                                return tmp_var_3;
                                /*} else {
                                    return var_val;
                                }*/
                            }
                        }
                        // Is a subscript
                    }
                    else {
                        var _58 = (0, typeInference_1.inferTypeByName)(node.valueNode.text, node, tmp_var_types, custom_functions, alias_tbl, debug), type_6 = _58[0], ndim_5 = _58[1], dim_5 = _58[2], ismatrix_5 = _58[3], isvector = _58[4], ispointer_3 = _58[5], isstruct_3 = _58[6], c_9 = _58[7];
                        if (isvector) {
                            return "".concat(transformNode(node.valueNode), "[").concat(transformNode(node.namedChildren[1]), " - 1]");
                        }
                        var tmp_var = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl);
                        // only use indexM if subscript is on rhs
                        var index = [];
                        var tmp_var1 = (0, helperFunctions_1.generateTmpVar)("tmp_", tmp_tbl);
                        var count = '';
                        var obj_3 = tmp_var_types.find(function (x) { return /ndim/.test(x.name) && x.propertyOf == node.valueNode.text && node.startIndex >= x.scope[0] && node.endIndex <= x.scope[1]; });
                        if (obj_3 == null || obj_3 == undefined) {
                            var _59 = (0, typeInference_1.inferType)(filename, node.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_7 = _59[0], ndim_6 = _59[1], dim_6 = _59[2], ismatrix_6 = _59[3], ispointer_4 = _59[4], isstruct_4 = _59[5], c_10 = _59[6];
                            var tmp_ndim = (0, helperFunctions_1.generateTmpVar)("ndim", tmp_tbl);
                            var tmp_dim = (0, helperFunctions_1.generateTmpVar)("dim", tmp_tbl);
                            count = tmp_ndim.match(/\d+/)[0];
                            var scope = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                            var expression = [];
                            expression.push("int ".concat(tmp_ndim, " = getnDimM(").concat(transformNode(node.valueNode), ");"));
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
                                scope: scope,
                                propertyOf: node.valueNode.text
                            });
                            expression.push("int *".concat(tmp_dim, " = getDimsM(").concat(transformNode(node.valueNode), ");"));
                            tmp_var_types.push({
                                name: tmp_dim,
                                type: 'int',
                                ndim: dim_6.length,
                                dim: [dim_6.length],
                                ismatrix: false,
                                isvector: true,
                                ispointer: false,
                                isstruct: false,
                                initialized: true,
                                scope: scope,
                                propertyOf: node.valueNode.text
                            });
                            updateFunParams(0);
                            _32 = (0, modifyCode_1.pushToMain)(expression.join("\n"), fun_params), main_function = _32[0], function_definitions = _32[1];
                        }
                        else {
                            count = obj_3.name.match(/\d+/)[0];
                        }
                        var flat_idx = getSubscriptIdx(node, count);
                        if (node.namedChildCount == 2) {
                            //let obj2 = tmp_var_types.find(x => x.name === node.valueNode.text);
                            //let dim = obj2.dim;
                            //index = rowMajorFlatIdx(obj3.count, dim, node.namedChildren[1].text, lhs_flag);
                            index = flat_idx;
                        }
                        else {
                            for (var i = 1; i < node.namedChildCount; i++) {
                                index.push(transformNode(node.namedChildren[i]));
                            }
                        }
                        if (!lhs_flag) { // subscript is on rhs
                            //let obj = alias_tbl.find(x => x.name === node.text);
                            var obj_4 = (0, helperFunctions_1.filterByScope)(alias_tbl, node.text, node, 0);
                            var _60 = (0, typeInference_1.inferType)(filename, node.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_8 = _60[0];
                            if (obj_4 == null || obj_4 == undefined) {
                                updateFunParams(0);
                                _33 = (0, modifyCode_1.pushToMain)("".concat(type_8, " ").concat(tmp_var, ";"), fun_params), main_function = _33[0], function_definitions = _33[1];
                                if (index.length == 1) {
                                    var isnum = /^\d+$/.test(index[0]);
                                    if (isnum) {
                                        index[0] = "".concat(Number(index[0]) + 1);
                                    }
                                    else {
                                        //index[0] = index[0].replace(/-1/, '');
                                        index[0] = index[0].concat("+1");
                                    }
                                    //index = index[0].concat("+1");
                                }
                                updateFunParams(0);
                                var tmp_1 = transformNode(node.valueNode);
                                if (tmp_1.includes("lhs_data")) {
                                    var obj4 = alias_tbl.find(function (x) { return x.tmp_var == tmp_1; });
                                    _34 = (0, modifyCode_1.pushToMain)("indexM(".concat(obj4.name, ", &").concat(tmp_var, ", ").concat(index.length, ", ").concat(index.join(", "), ");"), fun_params), main_function = _34[0], function_definitions = _34[1];
                                }
                                else {
                                    _35 = (0, modifyCode_1.pushToMain)("indexM(".concat(tmp_1, ", &").concat(tmp_var, ", ").concat(index.length, ", ").concat(index.join(", "), ");"), fun_params), main_function = _35[0], function_definitions = _35[1];
                                }
                                //[main_function, function_definitions] = pushToMain(`indexM(${transformNode(node.valueNode)}, &${tmp_var}, ${index.length}, ${index.join(", ")});`, fun_params);
                                //pushToMain(`indexM(${node.valueNode.text}, &${tmp_var}, ${index.length}, ${index.join(", ")});`);
                                var scope = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                                updateFunParams(0);
                                alias_tbl = (0, helperFunctions_1.pushAliasTbl)(node.text, tmp_var, node, fun_params);
                                tmp_var_types.push({
                                    name: tmp_var,
                                    type: type_8,
                                    ndim: flat_idx.length,
                                    dim: [flat_idx.length],
                                    ismatrix: flat_idx.length > 1,
                                    isvector: false,
                                    ispointer: false,
                                    isstruct: false,
                                    initialized: true,
                                    scope: scope
                                });
                            }
                            else {
                                tmp_var = obj_4.tmp_var;
                            }
                        }
                        return tmp_var;
                    }
                }
                break;
            }
            case "elseif_clause" /* g.SyntaxType.ElseifClause */: {
                var expression = [];
                updateFunParams(0);
                _36 = (0, modifyCode_1.pushToMain)("} else if (" + transformNode(node.conditionNode) + ") {", fun_params), main_function = _36[0], function_definitions = _36[1];
                // come back here
                updateFunParams(0);
                _37 = (0, modifyCode_1.pushToMain)(transformNode(node.consequenceNode), fun_params), main_function = _37[0], function_definitions = _37[1];
                //pushToMain("\n}")
                return null;
                break;
            }
            case "else_clause" /* g.SyntaxType.ElseClause */: {
                var expression = [];
                updateFunParams(0);
                _38 = (0, modifyCode_1.pushToMain)("} else {", fun_params), main_function = _38[0], function_definitions = _38[1];
                updateFunParams(0);
                _39 = (0, modifyCode_1.pushToMain)(transformNode(node.bodyNode), fun_params), main_function = _39[0], function_definitions = _39[1];
                /*for (let i = 0; i < node.bodyNode.namedChildCount; i ++) {
                    pushToMain(transformNode(node.bodyNode.namedChildren[i]));
                }*/
                //pushToMain("\n}")
                return null;
                break;
            }
            // TO DO: FIX STUFF WITH SCOPE IN ADDITION
            case "attribute" /* g.SyntaxType.Attribute */:
            case "identifier" /* g.SyntaxType.Identifier */: {
                // if identifier is on lhs return itself
                if (node.parent.type == "matrix" /* g.SyntaxType.Matrix */) {
                    if (node.parent.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
                        var re = new RegExp("\\b".concat(node.text, "\\b"));
                        if (re.test(node.parent.text)) {
                            return node.text;
                        }
                    }
                }
                if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
                    if (node.parent.leftNode.text == node.text) {
                        return node.text;
                    }
                }
                var obj = (0, helperFunctions_1.filterByScope)(alias_tbl, node.text, node, 0);
                if (obj != null && obj != undefined) {
                    return obj.tmp_var;
                }
                return node.text;
                break;
            }
            // Basic types
            //case g.SyntaxType.Ellipsis:
            case "string" /* g.SyntaxType.String */:
            //case g.SyntaxType.Attribute:
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
                var children_vals = [];
                for (var i = 0; i < node.namedChildCount; i++) {
                    var child = node.namedChildren[i];
                    var _61 = (0, typeInference_1.inferType)(filename, child, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _61[0], c_11 = _61[6];
                    custom_functions = c_11;
                    if (child_type == "keyword") {
                        var _62 = (0, typeInference_1.inferType)(filename, node.parent.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ndim_7 = _62[1], dim_7 = _62[2], c_12 = _62[6];
                        custom_functions = c_12;
                        var firstNode = node.parent.namedChildren[1];
                        var current_dim = 0;
                        var dummyNode = node;
                        while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                            dummyNode = dummyNode.previousNamedSibling;
                            current_dim += 1;
                        }
                        children_vals.push(dim_7[current_dim]);
                    }
                    else {
                        extract_singular_mat = true;
                        children_vals.push(transformNode(child));
                        extract_singular_mat = false;
                    }
                }
                var start = children_vals[0];
                var stop_1 = children_vals[1];
                var step = 1;
                if (children_vals.length == 3) {
                    stop_1 = children_vals[2];
                    step = children_vals[1];
                }
                var _63 = (0, typeInference_1.inferType)(filename, node, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_9 = _63[0], ndim_8 = _63[1], dim_8 = _63[2];
                var expression = [];
                var tmp_vec = (0, helperFunctions_1.generateTmpVar)("vec", tmp_tbl);
                var tmp_iter = (0, helperFunctions_1.generateTmpVar)("iter", tmp_tbl);
                if (dim_8.some(function (x) { return isNaN(x); })) {
                    dim_8 = [1, "(int) floor((".concat(stop_1, "-").concat(start, ")/").concat(step, ") + 1")];
                    //expression.push(`${type} *${tmp_vec};`);
                }
                else {
                    //expression.push(`${type} ${tmp_vec}[${numel(dim)}];`);
                }
                expression.push("".concat(type_9, " ").concat(tmp_vec, "[").concat((0, helperFunctions_1.numel)(dim_8), "];"));
                expression.push("\nfor (int ".concat(tmp_iter, " = 0; ").concat(start, " + (").concat(step, ")*").concat(tmp_iter, " <= ").concat(stop_1, "; ").concat(tmp_iter, "++) {\n\t").concat(tmp_vec, "[").concat(tmp_iter, "] = ").concat(start, " + (").concat(step, ")*").concat(tmp_iter, ";\n}"));
                updateFunParams(0);
                _40 = (0, modifyCode_1.pushToMain)(expression.join("\n"), fun_params), main_function = _40[0], function_definitions = _40[1];
                var scope = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
                tmp_var_types.push({
                    name: tmp_vec,
                    type: type_9,
                    ndim: ndim_8,
                    dim: dim_8,
                    ismatrix: false,
                    isvector: true,
                    ispointer: false,
                    isstruct: false,
                    initialized: true,
                    scope: scope
                });
                alias_tbl.push({
                    name: node.text,
                    tmp_var: tmp_vec,
                    //scope: [node.endIndex+1, scope[1], scope[2]]
                    scope: scope
                });
                return tmp_vec;
            }
            case "matrix" /* g.SyntaxType.Matrix */: {
                var _64 = (0, typeInference_1.inferType)(filename, node, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_10 = _64[0], ndim_9 = _64[1], dim_9 = _64[2];
                /*if (ndim == 2 && dim.some(x => x === 1)) { // vector
                    let tmp_vec = generateTmpVar("vec", tmp_tbl);
                    let expression = [];
                    for (let child of node.namedChildren) {
                        expression.push(transformNode(child));
                    }
                    updateFunParams(0);
                    [main_function, function_definitions] = pushToMain(`${type} ${tmp_vec}[${numel(dim)}] = {${expression.join(", ")}};`, fun_params);
                    
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
                        scope: findVarScope(filename, node, block_idxs, current_code, debug)
                    });
                    
                    return tmp_vec;
                    
                } else { // matrix */
                var tmp_mat = (0, helperFunctions_1.generateTmpVar)("mat", tmp_tbl);
                updateFunParams(0);
                _41 = (0, modifyCode_1.pushToMain)(initializeMatrix(node, tmp_mat), fun_params), main_function = _41[0], function_definitions = _41[1];
                tmp_var_types.push({
                    name: tmp_mat,
                    type: type_10,
                    ndim: ndim_9,
                    dim: dim_9,
                    ismatrix: true,
                    isvector: false,
                    ispointer: false,
                    isstruct: false,
                    initialized: true,
                    scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug)
                });
                return tmp_mat;
                //}
            }
        }
    }
    // Parse node
    // -----------------------------------------------------------------------------
    // Return args, outs from function
    function parseNode(node, ignore_parent) {
        if (debug == 1) {
            console.log("parseNode");
        }
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
                        left_node = node.return_variableNode.firstNamedChild;
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
                case "cell_subscript" /* g.SyntaxType.CellSubscript */:
                case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                    for (var i = 1; i < right_node.namedChildCount; i++) {
                        args.push(right_node.namedChildren[i]);
                    }
                    break;
                }
                case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
                case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
                case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
                    var _a = (0, typeInference_1.inferType)(filename, right_node.leftNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), l_type = _a[0], l_ndim = _a[1], l_dim = _a[2], l_ismatrix = _a[3], l_ispointer = _a[4], l_isstruct = _a[5], c1 = _a[6];
                    custom_functions = c1;
                    var _b = (0, typeInference_1.inferType)(filename, right_node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), r_type = _b[0], r_ndim = _b[1], r_dim = _b[2], r_ismatrix = _b[3], r_ispointer = _b[4], r_isstruct = _b[5], c2 = _b[6];
                    custom_functions = c2;
                    args.push(right_node.leftNode);
                    args.push(right_node.rightNode);
                    break;
                }
                case "unary_operator" /* g.SyntaxType.UnaryOperator */:
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    var _c = (0, typeInference_1.inferType)(filename, right_node.argumentNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type = _c[0], ndim = _c[1], dim = _c[2], ismatrix = _c[3], ispointer = _c[4], isstruct = _c[5], c = _c[6];
                    custom_functions = c;
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
    function initializeMatrix(node, name) {
        var _a;
        var _b = (0, typeInference_1.inferType)(filename, node, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type = _b[0], ndim = _b[1], dim = _b[2];
        var obj = customTypes_1.type_to_matrix_type.find(function (x) { return x.type === type; });
        var expression = [];
        var tmp_ndim = (0, helperFunctions_1.generateTmpVar)("ndim", tmp_tbl);
        var tmp_dim = (0, helperFunctions_1.generateTmpVar)("dim", tmp_tbl);
        var scope = (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug);
        //papaya
        var tmp_input = (0, helperFunctions_1.generateTmpVar)("input", tmp_tbl);
        var j = 0;
        for (var i = 0; i < node.childCount; i++) {
            if (node.children[i].isNamed) {
                //let transform_child = node.children[i].text;
                var transform_child = transformNode(node.children[i]);
                var _c = (0, typeInference_1.inferType)(filename, node.children[i], tmp_var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _c[0], child_ndim = _c[1], child_dim = _c[2], child_ismatrix = _c[3], child_ispointer = _c[4], child_isstruct = _c[5], c = _c[6];
                if (obj.matrix_type == 3) {
                    expression.push("".concat(tmp_input, "[").concat(j, "][] = ").concat(transform_child.replace(/'/g, '"'), ";"));
                    j++;
                }
                else if ((0, helperFunctions_1.numel)(child_dim) != 1 && !child_ismatrix) {
                    var tmp_iter = (0, helperFunctions_1.generateTmpVar)("iter", tmp_tbl);
                    expression.push("for (int ".concat(tmp_iter, " = 0; ").concat(tmp_iter, " < ").concat((0, helperFunctions_1.numel)(child_dim), "; ").concat(tmp_iter, "++) {"));
                    expression.push("   ".concat(tmp_input, "[").concat(j, " + ").concat(tmp_iter, "] = ").concat(transform_child, "[").concat(tmp_iter, "];"));
                    expression.push("}");
                    j += (0, helperFunctions_1.numel)(child_dim);
                }
                else {
                    expression.push("".concat(tmp_input, "[").concat(j, "] = ").concat(transform_child, ";"));
                    j++;
                }
            }
        }
        _a = (0, typeInference_1.inferType)(filename, node, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type = _a[0], ndim = _a[1], dim = _a[2];
        expression.unshift("".concat(tmp_input, " = malloc( ").concat((0, helperFunctions_1.numel)(dim), "*sizeof(*").concat(tmp_input, "));"));
        expression.unshift("".concat(type, " *").concat(tmp_input, " = NULL;"));
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
            scope: scope,
            propertyOf: name
        });
        tmp_var_types.push({
            name: tmp_dim,
            type: 'int',
            ndim: dim.length,
            dim: [dim.length],
            ismatrix: false,
            isvector: true,
            ispointer: false,
            isstruct: false,
            initialized: true,
            scope: scope,
            propertyOf: name
        });
        updateFunParams(0);
        var _d = (0, helperFunctions_1.isInitialized)(name, node, type, fun_params), name2 = _d[0], flag1 = _d[2], flag2 = _d[3], fp = _d[4];
        fun_params = fp;
        updateFunParams(1);
        var obj2 = (0, helperFunctions_1.filterByScope)(tmp_var_types, name, node, 0);
        if (obj2 != null && obj2 != undefined) {
            //if (obj2.initialized || name.indexOf("[")>-1) {
            if (flag1 || name.indexOf("[") > -1) {
                expression.unshift("".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
            }
            else {
                expression.unshift("Matrix * ".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
                //tmp_var_types = tmp_var_types.filter(function(e) { return e.name !== name });
            }
            //tmp_var_types = tmp_var_types.filter(function(e) { return JSON.stringify(e) !== JSON.stringify(obj2) });
            //obj2.initialized = true;
            //tmp_var_types.push(obj2);
            //console.log("OBJ2");
            //console.log(obj2);
            tmp_var_types = tmp_var_types.filter(function (x) { return JSON.stringify(x) != JSON.stringify(obj2); });
            tmp_var_types.push({
                name: name,
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                isvector: false,
                ispointer: false,
                isstruct: false,
                initialized: true,
                scope: obj2.scope
            });
            //console.log(tmp_var_types.filter(x=>x.name=="a"));
        }
        else {
            if (name.indexOf("[") > -1) {
                expression.unshift("".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
            }
            else {
                expression.unshift("Matrix * ".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
            }
        }
        expression.unshift("int ".concat(tmp_dim, "[").concat(ndim, "] = {").concat(dim, "};"));
        expression.unshift("int ".concat(tmp_ndim, " = ").concat(ndim, ";"));
        expression.push("writeM( ".concat(name, ", ").concat((0, helperFunctions_1.numel)(dim), ", ").concat(tmp_input, ");"));
        expression.push("free(".concat(tmp_input, ");"));
        return "\n" + expression.join("\n") + "\n";
    }
    // Print matrix functions
    // -----------------------------------------------------------------------------
    function printMatrixFunctions(node) {
        var _a, _b, _c;
        if (debug == 1) {
            console.log("printMatrixFunctions");
        }
        var _d = parseNode(node, false), args1 = _d[0], outs = _d[1], is_subscript = _d[2];
        var arg_types = [];
        var args = [];
        var _loop_6 = function (i) {
            var _e;
            var arg = args1[i];
            if (lhs_flag) {
                args.push(arg.text);
            }
            else if ((arg.text.includes("hamming") || arg.text.includes("hanning")) && node.valueNode.text == "stft") {
                args.push("".concat(arg.namedChildren[0].text, "(").concat(transformNode(arg.namedChildren[1]), ")"));
            }
            else {
                args.push(transformNode(arg));
            }
            var _f = (0, typeInference_1.inferType)(filename, arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type = _f[0], ndim = _f[1], dim = _f[2], ismatrix = _f[3], ispointer = _f[4], isstruct = _f[5], c = _f[6];
            if (/tmp.*\[0\]/.test(args[i])) {
                _e = (0, typeInference_1.inferTypeByName)(args[i], node, tmp_var_types, custom_functions, alias_tbl, debug), type = _e[0], ndim = _e[1], dim = _e[2], ismatrix = _e[3], ispointer = _e[5], isstruct = _e[6], c = _e[7];
            }
            var isvector = (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix;
            // If a tmp var, infer type by name
            if (args[i] != null) {
                var match_2 = args[i].match(/^([a-zA-Z_]+)(\d+)$/);
                if (match_2 != null) {
                    var tmpvar_obj = tmp_tbl.find(function (x) { return x.name == match_2[1] && Number(x.count) >= Number(match_2[2]); });
                    if (tmpvar_obj != null && tmpvar_obj != undefined) {
                        var _g = (0, typeInference_1.inferTypeByName)(args[i], node, tmp_var_types, custom_functions, alias_tbl, debug), type2 = _g[0], ndim2 = _g[1], dim2 = _g[2], ismatrix2 = _g[3], isvector2 = _g[4], ispointer2 = _g[5], isstruct2 = _g[6], c2 = _g[7];
                        if (type2 != null) {
                            type = type2;
                            ndim = ndim2;
                            dim = dim2;
                            ismatrix = ismatrix2;
                            isvector = isvector2;
                            ispointer = ispointer2;
                            isstruct = isstruct2;
                            c = c2;
                        }
                        //[type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferTypeByName(args[i], node, tmp_var_types, custom_functions, alias_tbl, debug);
                    }
                }
            }
            custom_functions = c;
            arg_types.push({
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: ismatrix,
                isvector: isvector,
                ispointer: ispointer,
                isstruct: isstruct
            });
        };
        for (var i = 0; i < args1.length; i++) {
            _loop_6(i);
        }
        /*for (let arg of args1) {
            args.push(transformNode(arg));
            let [type, ndim, dim, ismatrix, ispointer, isstruct, c] = inferType(filename, arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug);
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
        }*/
        for (var i = 0; i < outs.length; i++) {
            outs[i] = outs[i].text;
        }
        var obj = (0, helperFunctions_1.findBuiltin)(builtinFunctions_1.operatorMapping, node.operatorNode.type);
        var req_arg_types = obj.req_arg_types(args, arg_types, outs);
        var return_type = obj.return_type(args, arg_types, outs);
        var init_before = obj.init_before(args, arg_types, outs);
        var fun_c = obj.fun_c(args, arg_types, outs, node.operatorNode.type);
        if (obj.args_transform(args, arg_types, outs) != null) {
            args = obj.args_transform(args, arg_types, outs);
        }
        if (req_arg_types != null) {
            for (var i = 0; i < Math.min(req_arg_types.length, arg_types.length); i++) {
                if (!req_arg_types[i].ismatrix && arg_types[i].ismatrix) {
                    if (arg_types[i].dim.every(function (x) { return x === 1; })) {
                        var expression = "";
                        updateFunParams(0);
                        _a = (0, helperFunctions_1.extractSingularMat)(args[i], arg_types[i], node, fun_params), expression = _a[0], fun_params = _a[1];
                        updateFunParams(1);
                        args[i] = expression;
                    }
                }
            }
        }
        if (init_before != null && init_before != undefined) {
            for (var i = 0; i < init_before.length; i++) {
                var tmp_var = (0, helperFunctions_1.generateTmpVar)(init_before[i].name, tmp_tbl);
                args[args.indexOf(init_before[i].name)] = tmp_var;
                args[args.indexOf("&" + init_before[i].name)] = "&" + tmp_var;
                for (var j = 0; j < init_before.length; j++) {
                    //unicorn
                    var re = new RegExp("\\b".concat(init_before[i].name, "\\b"));
                    init_before[j].val = init_before[j].val.replace(re, tmp_var);
                }
                updateFunParams(0);
                _b = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(tmp_var, init_before[i].val, init_before[i], node), fun_params), main_function = _b[0], function_definitions = _b[1];
                tmp_var_types.push({
                    name: tmp_var,
                    type: init_before[i].type,
                    ndim: init_before[i].ndim,
                    dim: init_before[i].dim,
                    ismatrix: init_before[i].ismatrix,
                    isvector: (0, helperFunctions_1.numel)(init_before[i].dim) > 1 && !init_before[i].ismatrix,
                    ispointer: init_before[i].ispointer,
                    isstruct: init_before[i].isstruct,
                    initialized: true,
                    scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug)
                });
            }
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
            var tmp_var = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl);
            tmp_var_types.push({
                name: tmp_var,
                type: return_type.type,
                ndim: return_type.ndim,
                dim: return_type.dim,
                ismatrix: return_type.ismatrix,
                isvector: (0, helperFunctions_1.numel)(return_type.dim) > 1 && !return_type.ismatrix,
                ispointer: return_type.ispointer,
                isstruct: false,
                initialized: true,
                scope: (0, typeInference_1.findVarScope)(filename, node, block_idxs, current_code, debug)
            });
            var var_val = "".concat(fun_c, "()");
            if (args[0] == "void") {
                var_val = "".concat(fun_c);
            }
            else if (args != null) {
                var_val = "".concat(fun_c, "(").concat(args.join(", "), ")");
            }
            updateFunParams(0);
            _c = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(tmp_var, var_val, tmp_var_types[tmp_var_types.length - 1], node), fun_params), main_function = _c[0], function_definitions = _c[1];
            return tmp_var;
        }
    }
    // Print function declarations and definitions
    // -----------------------------------------------------------------------------
    function printFunctionDefDeclare(node) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (debug == 1) {
            console.log("printFunctionDefDeclare");
        }
        var obj = custom_functions.find(function (x) { return x.name === node.nameNode.text; });
        if (obj != null) {
            for (var i = 0; i < obj.arg_type_dic.length; i++) {
                var fun_name = "".concat(node.nameNode.text, "_").concat(obj.arg_type_dic[i].arg_type_id);
                if (obj.arg_type_dic.length == 1) {
                    fun_name = node.nameNode.text;
                }
                updateFunParams(0);
                _a = (0, modifyCode_1.pushToMain)("".concat(fun_name, "_placeholder"), fun_params), main_function = _a[0], function_definitions = _a[1];
                tmp_var_types = obj.arg_type_dic[i].var_types;
                if (tmp_var_types == null) {
                    tmp_var_types = [];
                }
                for (var _i = 0, _h = node.bodyNode.namedChildren; _i < _h.length; _i++) {
                    var child = _h[_i];
                    updateFunParams(0);
                    _b = (0, modifyCode_1.pushToMain)(transformNode(child), fun_params), main_function = _b[0], function_definitions = _b[1];
                }
                var _j = parseNode(node, false), outs = _j[1];
                for (var j = 0; j < outs.length; j++) {
                    outs[j] = transformNode(outs[j]);
                }
                var ptr_args = obj.ptr_args(obj.arg_type_dic[i].arg_types, outs);
                var param_list = [];
                for (var j = 0; j < node.parametersNode.namedChildCount; j++) {
                    var param = node.parametersNode.namedChildren[j];
                    if (obj.arg_type_dic[i].arg_types[j].ismatrix) {
                        param_list.push("Matrix * ".concat(param.text));
                    }
                    else {
                        param_list.push("".concat(obj.arg_type_dic[i].arg_types[j].type, " ").concat(param.text));
                    }
                }
                var return_node = node.children[1].firstChild;
                //if (obj.return_type.ismatrix) {
                if (ptr_args != null) {
                    var ptr_declaration = [];
                    for (var i_1 = 0; i_1 < return_node.namedChildCount; i_1++) {
                        var return_var = return_node.namedChildren[i_1];
                        var tmp = (0, helperFunctions_1.transformNodeByName)(return_var.text, return_var, alias_tbl);
                        ptr_declaration.push("*p_".concat(return_var.text, " = ").concat(tmp, ";"));
                        if (tmp !== return_var.text) {
                            var _k = (0, typeInference_1.inferTypeByName)(tmp, node, tmp_var_types, custom_functions, alias_tbl, debug), type = _k[0], ndim = _k[1], dim = _k[2], ismatrix = _k[3];
                            ptr_args[i_1].type = type;
                            ptr_args[i_1].ndim = ndim;
                            ptr_args[i_1].dim = dim;
                            ptr_args[i_1].ismatrix = ismatrix;
                        }
                        // come back here
                        if (ptr_args[i_1].ismatrix) {
                            param_list.push("Matrix ** p_".concat(return_var.text));
                        }
                        else {
                            param_list.push("".concat(ptr_args[i_1].type, "* p_").concat(return_var.text));
                        }
                    }
                    var ptr_declaration_joined = ptr_declaration.join("\n");
                    //grapes
                    if (param_list.length == 0) {
                        var param_list_joined = "void";
                    }
                    else {
                        var param_list_joined = param_list.join(", ");
                    }
                    function_declarations.push("void ".concat(fun_name, "(").concat(param_list_joined, ");"));
                    //pushToMain(`\nvoid ${node.nameNode.text}(${param_list_joined}) {`);
                    block_level -= 1;
                    updateFunParams(0);
                    _c = (0, modifyCode_1.replaceMain)("\nvoid ".concat(fun_name, "(").concat(param_list_joined, ") {"), "".concat(fun_name, "_placeholder"), 0, fun_params), main_function = _c[0], function_definitions = _c[1];
                    block_level += 1;
                }
                else {
                    if (param_list.length == 0) {
                        var param_list_joined = "void";
                    }
                    else {
                        var param_list_joined = param_list.join(", ");
                    }
                    var return_statement = null;
                    if (obj.arg_type_dic[i].return_type == null) {
                        var return_type = "void";
                    }
                    else {
                        if (obj.arg_type_dic[i].return_type.ismatrix) {
                            var return_type = "Matrix *";
                        }
                        else if (obj.arg_type_dic[i].return_type.ispointer) {
                            var return_type = "".concat(obj.arg_type_dic[i].return_type.type, " *");
                        }
                        else {
                            var return_type = "".concat(obj.arg_type_dic[i].return_type.type);
                        }
                        return_statement = "return ".concat(outs[0], ";");
                    }
                    function_declarations.push("".concat(return_type, " ").concat(fun_name, "(").concat(param_list_joined, ");"));
                    //pushToMain(`\n${return_type} ${node.nameNode.text}(${param_list_joined}) {`);
                    block_level -= 1;
                    updateFunParams(0);
                    _d = (0, modifyCode_1.replaceMain)("\n".concat(return_type, " ").concat(fun_name, "(").concat(param_list_joined, ") {"), "".concat(fun_name, "_placeholder"), 0, fun_params), main_function = _d[0], function_definitions = _d[1];
                    block_level += 1;
                }
                if (ptr_declaration != undefined) {
                    updateFunParams(0);
                    _e = (0, modifyCode_1.pushToMain)(ptr_declaration.join("\n"), fun_params), main_function = _e[0], function_definitions = _e[1];
                }
                updateFunParams(0);
                _f = (0, modifyCode_1.pushToMain)(return_statement, fun_params), main_function = _f[0], function_definitions = _f[1];
                block_level -= 1;
                updateFunParams(0);
                _g = (0, modifyCode_1.pushToMain)("}", fun_params), main_function = _g[0], function_definitions = _g[1];
                block_level += 1;
            }
        }
    }
    // Generate header files
    // -----------------------------------------------------------------------------
    function generateHeader() {
        if (debug == 1) {
            console.log("generateHeader");
        }
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
        (0, helperFunctions_1.writeToFile)(out_folder, filename + ".h", header.join("\n"));
    }
    // Get subscript index
    // -----------------------------------------------------------------------------
    function getSubscriptIdx(node, count) {
        var _a;
        if (debug == 1) {
            console.log("getSubscriptIdx");
        }
        /*let lhs_flag = false;
        if (node.parent.type == g.SyntaxType.Assignment) {
            if (node.parent.leftNode.text == node.text) {
                lhs_flag = true;
            }
        }*/
        var obj = (0, helperFunctions_1.filterByScope)(tmp_var_types, node.valueNode.text, node, 0);
        if (obj == null || obj == undefined) {
            var obj1 = (0, helperFunctions_1.filterByScope)(alias_tbl, node.valueNode.text, node, 0);
            obj = (0, helperFunctions_1.filterByScope)(tmp_var_types, obj1.tmp_var, node, 0);
        }
        var dim = obj.dim;
        if (dim[3] == 1) {
            dim.pop();
        }
        if (dim[2] == 1) {
            dim.pop();
        }
        var idx = [node.namedChildren[1].text];
        updateFunParams(0);
        // already a linear idx
        if (node.namedChildCount == 2) {
            if (node.namedChildren[1].type == "slice" /* g.SyntaxType.Slice */) {
                idx = (0, convertSubscript_1.slice2list)(node.namedChildren[1], fun_params);
            }
            else if (node.namedChildren[1].type == "matrix" /* g.SyntaxType.Matrix */) {
                idx = (0, convertSubscript_1.matrix2list)(node.namedChildren[1], fun_params);
            }
            else {
                //[fun_params, idx] = rowMajorFlatIdx(count, dim, transformNode(node.namedChildren[1]), fun_params);
                //updateFunParams(1);
                var good_flag = !lhs_flag || node.type == "cell_subscript" /* g.SyntaxType.CellSubscript */;
                if (node.type == "cell_subscript" /* g.SyntaxType.CellSubscript */) {
                    if (node.nextSibling != null) {
                        if (node.nextSibling.type == "(") {
                            good_flag = false;
                        }
                    }
                }
                if (good_flag) {
                    updateFunParams(0);
                    var tmp_idx = (0, helperFunctions_1.generateTmpVar)("idx", tmp_tbl);
                    _a = (0, modifyCode_1.pushToMain)("int ".concat(tmp_idx, " = convertSubscript(ndim").concat(count, ", dim").concat(count, ", ").concat(transformNode(node.namedChildren[1]), ");"), fun_params), main_function = _a[0], function_definitions = _a[1];
                    idx = [tmp_idx];
                }
            }
        }
        else {
            if (node.namedChildCount == 3) {
                idx = (0, convertSubscript_1.sub2idx)(node.namedChildren[1], transformNode(node.namedChildren[1]), node.namedChildren[2], transformNode(node.namedChildren[2]), null, null, null, null, dim[0], dim[1], 1, fun_params);
            }
            else if (node.namedChildCount == 4) {
                idx = (0, convertSubscript_1.sub2idx)(node.namedChildren[1], transformNode(node.namedChildren[1]), node.namedChildren[2], transformNode(node.namedChildren[2]), node.namedChildren[3], transformNode(node.namedChildren[3]), null, null, dim[0], dim[1], 1, fun_params);
            }
            else if (node.namedChildCount == 5) {
                idx = (0, convertSubscript_1.sub2idx)(node.namedChildren[1], transformNode(node.namedChildren[1]), node.namedChildren[2], transformNode(node.namedChildren[2]), node.namedChildren[3], transformNode(node.namedChildren[3]), node.namedChildren[4], transformNode(node.namedChildren[4]), dim[0], dim[1], dim[2], fun_params);
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
        generated_code.push("\n// Entry-point function\nint ".concat(filename, "(void) {"));
    }
    generated_code.push("\n" + main_function.join("\n"));
    if (!(0, treeTraversal_1.fileIsFunction)(tree, treeTraversal_1.fileIsFunction)) {
        generated_code.push("\treturn 0;");
        generated_code.push("}\n");
    }
    if (function_definitions.length != 0) {
        generated_code.push("\n// Subprograms");
        generated_code.push(function_definitions.join("\n"));
    }
    generateHeader();
    (0, helperFunctions_1.writeToFile)(out_folder, filename + ".c", generated_code.join("\n"));
    return [generated_code.join("\n"), header.join("\n"), var_types, custom_functions];
}
exports.generateCode = generateCode;
//# sourceMappingURL=generateCode.js.map