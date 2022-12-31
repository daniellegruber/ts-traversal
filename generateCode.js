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
    var link = ["//Link\n#include <stdio.h>\n#include <stdbool.h>\n#include <complex.h>\n#include <string.h>\n#include <matrix.h>\n#include <".concat(filename, ".h>")];
    var cursor_adjust = false;
    var current_code = "main";
    var tmp_tbl = [];
    var alias_tbl = [];
    var main_queue = [];
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
        current_code: "main"
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
                current_code: current_code
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
        }
    }
    // Main
    // -----------------------------------------------------------------------------
    function main() {
        var _a;
        if (debug == 1) {
            console.log("main");
        }
        var cursor = tree.walk();
        do {
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
                    //pushToMain("\n" + transformNode(node));
                    transformNode(node);
                    break;
                }
            }
        } while ((0, treeTraversal_1.gotoPreorderSucc_OnlyMajorTypes)(cursor, debug));
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
    }
    // Transform node
    // -----------------------------------------------------------------------------
    function transformNode(node) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27;
        if (debug == 1) {
            console.log("transformNode");
        }
        //console.log("TRANSFORM");
        //console.log(node.text);
        //console.log(node);
        // at each iteration, check each element of mainQueue, if condition true then push expression
        var idx = 0;
        for (var i = 0; i < main_queue.length; i++) {
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
                for (var i = 1; i < node.namedChildCount; i++) {
                    updateFunParams(0);
                    _c = (0, modifyCode_1.pushToMain)(transformNode(node.namedChildren[i]), fun_params), main_function = _c[0], function_definitions = _c[1];
                }
                updateFunParams(0);
                _d = (0, modifyCode_1.pushToMain)("\n}", fun_params), main_function = _d[0], function_definitions = _d[1];
                return null;
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
                var tmp_iter = (0, helperFunctions_1.generateTmpVar)("iter", tmp_tbl);
                if (node.rightNode.type == "slice" /* g.SyntaxType.Slice */) {
                    var obj = tmp_var_types.find(function (x) { return x.name === node.leftNode.text; });
                    //expression2.push(`for (int ${node.leftNode.text} = `);
                    expression2.push("for (int ".concat(tmp_iter, " = "));
                    expression2.push("".concat(node.rightNode.children[0].text, ";"));
                    //loop_iterators.push(node.leftNode.text);
                    loop_iterators.push(tmp_iter);
                    updateFunParams(0);
                    alias_tbl = (0, helperFunctions_1.pushAliasTbl)(node.leftNode.text, tmp_iter, node, fun_params);
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
                        scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
                    });
                    if (node.rightNode.childCount == 5) {
                        expression2.push("".concat(tmp_iter, " <= ").concat(node.rightNode.children[4].text, ";"));
                        expression2.push("".concat(tmp_iter, " += ").concat(node.rightNode.children[2].text));
                    }
                    else {
                        expression2.push("".concat(tmp_iter, " <= ").concat(node.rightNode.children[2].text, ";"));
                        expression2.push("++ ".concat(tmp_iter));
                    }
                    expression1.push(expression2.join(" ") + ") {");
                }
                else if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    var tmp_var1 = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl); // the matrix
                    var tmp_var2 = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl); // the iterating variable
                    var _28 = (0, typeInference_1.inferType)(node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type = _28[0], ndim = _28[1], dim = _28[2], c = _28[6];
                    custom_functions = c;
                    var obj = customTypes_1.type_to_matrix_type.find(function (x) { return x.type === type; });
                    if (obj != null) {
                        expression1.push(initializeMatrix(node.rightNode, tmp_var1, ndim, dim, type));
                    }
                    expression1.push("\n".concat(type, " ").concat(tmp_iter, ";"));
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
                updateFunParams(0);
                _e = (0, modifyCode_1.pushToMain)("\n" + expression1.join("\n"), fun_params), main_function = _e[0], function_definitions = _e[1];
                for (var _i = 0, _29 = node.bodyNode.namedChildren; _i < _29.length; _i++) {
                    var child = _29[_i];
                    //expression1.push(transformNode(child));
                    updateFunParams(0);
                    _f = (0, modifyCode_1.pushToMain)(transformNode(child), fun_params), main_function = _f[0], function_definitions = _f[1];
                }
                updateFunParams(0);
                _g = (0, modifyCode_1.pushToMain)("\n}", fun_params), main_function = _g[0], function_definitions = _g[1];
                var idx_1 = loop_iterators.indexOf(tmp_iter);
                if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                    idx_1 = loop_iterators.indexOf(tmp_var2);
                }
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
                var _30 = parseNode(node, false), args1 = _30[0], outs = _30[1], is_subscript = _30[2];
                var arg_types = [];
                var args = [];
                var _31 = (0, typeInference_1.inferType)(node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type = _31[0], ndim = _31[1], dim = _31[2], ismatrix = _31[3], ispointer = _31[4], isstruct = _31[5], c = _31[6];
                custom_functions = c;
                var init_flag = false;
                var lhs = null;
                if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "cell" /* g.SyntaxType.Cell */) {
                    // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                    for (var _32 = 0, args1_1 = args1; _32 < args1_1.length; _32++) {
                        var arg = args1_1[_32];
                        args.push(transformNode(arg));
                        var _33 = (0, typeInference_1.inferType)(arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _33[0], child_ndim = _33[1], child_dim = _33[2], child_ismatrix = _33[3], child_ispointer = _33[4], child_isstruct = _33[5], c_1 = _33[6];
                        custom_functions = c_1;
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
                        outs[i] = transformNode(outs[i]);
                    }
                    if (type == 'heterogeneous') {
                        numCellStruct += 1;
                        if (numCellStruct == 1) {
                            updateFunParams(0);
                            _h = (0, modifyCode_1.insertMain)("// Structure for cell arrays\nstruct cell {\n    int type;\n    union {\n        int ival;\n        double dval;\n        complex double cval;\n        char chval[20];\n    } data;\n};", "int ".concat(filename, "(void) {"), 1, 0, fun_params), main_function = _h[0], function_definitions = _h[1];
                        }
                        var expression = [];
                        expression.push("struct cell ".concat(outs[0], "[").concat(node.rightNode.namedChildCount, "];"));
                        var types = [];
                        var _loop_1 = function (i) {
                            var child = node.rightNode.namedChildren[i];
                            var _51 = (0, typeInference_1.inferType)(child, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _51[0], child_ndim = _51[1], child_dim = _51[2], child_ismatrix = _51[3], child_ispointer = _51[4], child_isstruct = _51[5], c_2 = _51[6];
                            custom_functions = c_2;
                            var numel_1 = child_dim.reduce(function (a, b) { return a * b; });
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
                            _loop_1(i);
                        }
                        updateFunParams(0);
                        _j = (0, modifyCode_1.pushToMain)(expression.join("\n") + "\n", fun_params), main_function = _j[0], function_definitions = _j[1];
                        var tmp_iter = (0, helperFunctions_1.generateTmpVar)("iter", tmp_tbl);
                        updateFunParams(0);
                        _k = (0, modifyCode_1.pushToMain)("\nfor (int ".concat(tmp_iter, " = 0; ").concat(tmp_iter, " < ").concat(node.rightNode.namedChildCount, "; ").concat(tmp_iter, "++) {\n    switch(").concat(outs[0], "[").concat(tmp_iter, "].type) {\n        case 0:\n        printf(\"%d\\n\", ").concat(outs[0], "[").concat(tmp_iter, "].data.ival);\n        break;\n        \n        case 1:\n        printf(\"%f\\n\", ").concat(outs[0], "[").concat(tmp_iter, "].data.dval);\n        break;\n        \n        case 2:\n        printf(\"%f\\n\", ").concat(outs[0], "[").concat(tmp_iter, "].data.cval);\n        break;\n        \n        case 3:\n        printf(\"%s\\n\", ").concat(outs[0], "[").concat(tmp_iter, "].data.chval);\n        break;\n    }\n}\n"), fun_params), main_function = _k[0], function_definitions = _k[1];
                    }
                    else {
                        var obj = customTypes_1.type_to_matrix_type.find(function (x) { return x.type === type; });
                        if (obj != null) {
                            updateFunParams(0);
                            _l = (0, modifyCode_1.pushToMain)(initializeMatrix(node.rightNode, outs[0], ndim, dim, type), fun_params), main_function = _l[0], function_definitions = _l[1];
                        }
                    }
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
                    lhs = outs[0];
                }
                //if (node.leftNode.type != g.SyntaxType.CallOrSubscript && node.leftNode.type != g.SyntaxType.CellSubscript) {
                if (lhs == null && rhs != undefined && rhs != null) {
                    updateFunParams(0);
                    _m = (0, modifyCode_1.pushToMain)("".concat(rhs, ";"), fun_params), main_function = _m[0], function_definitions = _m[1];
                }
                else if (init_flag && rhs != undefined && rhs != null) {
                    if (lhs[0].indexOf("[") > -1 || lhs.indexOf("[") > -1) {
                        updateFunParams(0);
                        _o = (0, modifyCode_1.pushToMain)("".concat(lhs, " = ").concat(rhs, ";"), fun_params), main_function = _o[0], function_definitions = _o[1];
                    }
                    else {
                        var var_type_1 = (0, helperFunctions_1.filterByScope)(tmp_var_types, lhs, node, 0);
                        if (var_type_1 != null && var_type_1 != undefined) {
                            if (var_type_1.initialized && (var_type_1.ismatrix || var_type_1.type == type)) {
                                updateFunParams(0);
                                _p = (0, modifyCode_1.pushToMain)("".concat(lhs, " = ").concat(rhs, ";"), fun_params), main_function = _p[0], function_definitions = _p[1];
                            }
                            else if (var_type_1.initialized && (var_type_1.type != type)) {
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
                                alias_tbl = (0, helperFunctions_1.pushAliasTbl)(lhs, tmp, node, fun_params);
                                updateFunParams(0);
                                _q = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(tmp, rhs, tmp_var_types[tmp_var_types.length - 1], node), fun_params), main_function = _q[0], function_definitions = _q[1];
                            }
                            else {
                                updateFunParams(0);
                                _r = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(lhs, rhs, var_type_1, node), fun_params), main_function = _r[0], function_definitions = _r[1];
                            }
                            //tmp_var_types = tmp_var_types.filter(function(e) { return e.name !== var_type.name });
                            tmp_var_types = tmp_var_types.filter(function (e) { return JSON.stringify(e) !== JSON.stringify(var_type_1); });
                            var_type_1.initialized = true;
                            if (var_type_1.type == "unknown") {
                                var_type_1.type = type;
                            }
                            tmp_var_types.push(var_type_1);
                            var obj = tmp_tbl.find(function (x) { return "".concat(x.name).concat(x.count) === rhs; });
                            if (obj != null && obj != undefined) {
                                updateFunParams(0);
                                alias_tbl = (0, helperFunctions_1.pushAliasTbl)(lhs, rhs, node, fun_params);
                            }
                        }
                        else {
                            var scope = (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug);
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
                            _s = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(lhs, rhs, tmp_var_types[tmp_var_types.length - 1], node), fun_params), main_function = _s[0], function_definitions = _s[1];
                            var obj = tmp_tbl.find(function (x) { return "".concat(x.name).concat(x.count) === rhs; });
                            if (obj != null && obj != undefined) {
                                updateFunParams(0);
                                alias_tbl = (0, helperFunctions_1.pushAliasTbl)(lhs, rhs, node, fun_params);
                            }
                        }
                    }
                }
                //}
                var _34 = parseNode(node.leftNode, true), left_args = _34[0];
                var processed_args = [];
                for (var i = 0; i < left_args.length; i++) {
                    //left_args[i] = transformNode(left_args[i]);
                    if (left_args[i].namedChildCount > 0) {
                        for (var j = 0; j < left_args[i].namedChildCount; j++) {
                            processed_args.push(transformNode(left_args[i].namedChildren[j]));
                        }
                    }
                    else {
                        processed_args.push(transformNode(left_args[i]));
                    }
                }
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
                            var _35 = (0, typeInference_1.inferType)(node.leftNode.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ltype = _35[0];
                            updateFunParams(0);
                            _t = (0, modifyCode_1.pushToMain)("".concat(type, "* ").concat(tmp_lhs, " = ").concat(type.charAt(0), "_to_").concat(type.charAt(0), "(").concat(transformNode(child.valueNode), ");"), fun_params), main_function = _t[0], function_definitions = _t[1];
                            var _36 = (0, typeInference_1.inferType)(outs[j], tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ismatrix_1 = _36[3], c_3 = _36[6];
                            custom_functions = c_3;
                            // If RHS is matrix
                            if (ismatrix_1) {
                                updateFunParams(0);
                                _u = (0, modifyCode_1.pushToMain)("".concat(type, "* ").concat(tmp_rhs, " = ").concat(type.charAt(0), "_to_").concat(type.charAt(0), "(").concat(outs[j], ");"), fun_params), main_function = _u[0], function_definitions = _u[1];
                                for (var i = 0; i < idx_2.length; i++) {
                                    updateFunParams(0);
                                    _v = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_2[i], "] = ").concat(tmp_rhs, "[").concat(i, "];"), fun_params), main_function = _v[0], function_definitions = _v[1];
                                }
                                // If RHS not matrix
                            }
                            else {
                                for (var i = 0; i < idx_2.length; i++) {
                                    updateFunParams(0);
                                    _w = (0, modifyCode_1.pushToMain)("".concat(outs[j], "[").concat(i, "] = ").concat(tmp_rhs, "[").concat(idx_2[i], "];"), fun_params), main_function = _w[0], function_definitions = _w[1];
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
                            _x = (0, modifyCode_1.pushToMain)("int ".concat(tmp_size, " = 1;\nfor (int ").concat(tmp_iter, " = 0 ; ").concat(tmp_iter, " < ").concat(tmp_ndim, "; ").concat(tmp_iter, "++)\n{\n\t").concat(tmp_size, " *= ").concat(tmp_dim, "[").concat(tmp_iter, "];\n}\nMatrix *").concat(tmp_mat, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj3.matrix_type, ");\nwriteM(").concat(tmp_mat, ", ").concat(tmp_size, ", ").concat(tmp_lhs, ");"), fun_params), main_function = _x[0], function_definitions = _x[1];
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
                        var scope_1 = (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug);
                        if (loop_iterators.length > 0) {
                            scope_1 = block_idxs.filter(function (e) { return e[2] == scope_1[2] - loop_iterators.length; });
                            scope_1 = scope_1[scope_1.length - 1];
                        }
                        updateFunParams(0);
                        alias_tbl = (0, helperFunctions_1.pushAliasTbl)(node.leftNode.text, rhs, node, fun_params);
                        var obj = (0, helperFunctions_1.filterByScope)(tmp_var_types, node.leftNode.valueNode.text, node, 0);
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
                    }
                    else if (is_subscript[0]) {
                        // Convert to linear idx
                        var obj4 = tmp_tbl.find(function (x) { return x.name == "d0_"; });
                        var idx_3 = getSubscriptIdx(node.leftNode, obj4.count);
                        var num_back = 0;
                        for (var i = 0; i <= loop_iterators.length; i++) {
                            var re = new RegExp("\\b".concat(loop_iterators[i], "\\b"));
                            if (re.test(processed_args.join(", ")) || re.test(rhs)) {
                                num_back = num_back + 1;
                            }
                        }
                        var scope_2 = (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug);
                        if (loop_iterators.length > 0) {
                            scope_2 = block_idxs.filter(function (e) { return e[2] == scope_2[2] - loop_iterators.length; });
                            scope_2 = scope_2[scope_2.length - 1];
                        }
                        var obj6_1 = tmp_tbl.find(function (x) { return x.name == "lhs_data"; });
                        var new_flag = true;
                        var tmp_lhs = "lhs_data";
                        if (obj6_1 != null && obj6_1 != undefined) {
                            var obj5 = tmp_var_types.find(function (x) { return x.name == "lhs_data".concat(obj6_1.count); });
                            if (obj5 != null && obj5 != undefined) {
                                if (obj5.type == loop_iterators.join("")) {
                                    new_flag = false;
                                    tmp_lhs = obj5.name;
                                }
                            }
                        }
                        if (new_flag) {
                            var tmp_data = (0, helperFunctions_1.generateTmpVar)("data", tmp_tbl);
                            tmp_lhs = (0, helperFunctions_1.generateTmpVar)("lhs_data", tmp_tbl);
                            var tmp_rhs = (0, helperFunctions_1.generateTmpVar)("rhs_data", tmp_tbl);
                            var _37 = (0, typeInference_1.inferType)(outs[0], tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ismatrix_2 = _37[3], c_4 = _37[6];
                            custom_functions = c_4;
                            var _38 = (0, typeInference_1.inferType)(node.leftNode.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ltype = _38[0];
                            if (num_back == 0) {
                                updateFunParams(0);
                                _y = (0, modifyCode_1.pushToMain)("".concat(type, "* ").concat(tmp_lhs, " = ").concat(ltype.charAt(0), "_to_").concat(type.charAt(0), "(").concat(transformNode(node.leftNode.valueNode), ");"), fun_params), main_function = _y[0], function_definitions = _y[1];
                            }
                            else {
                                updateFunParams(0);
                                _z = (0, modifyCode_1.insertMain)("".concat(type, "* ").concat(tmp_lhs, " = ").concat(ltype.charAt(0), "_to_").concat(type.charAt(0), "(").concat(transformNode(node.leftNode.valueNode), ");"), 'for', num_back, 0, fun_params), main_function = _z[0], function_definitions = _z[1];
                            }
                            // If RHS is matrix
                            if (ismatrix_2) {
                                updateFunParams(0);
                                _0 = (0, modifyCode_1.pushToMain)("".concat(type, "* ").concat(tmp_rhs, " = ").concat(type.charAt(0), "_to_").concat(type.charAt(0), "(").concat(outs[0], ");"), fun_params), main_function = _0[0], function_definitions = _0[1];
                                for (var i = 0; i < idx_3.length; i++) {
                                    updateFunParams(0);
                                    _1 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[i], "] = ").concat(tmp_rhs, "[").concat(i, "];"), fun_params), main_function = _1[0], function_definitions = _1[1];
                                }
                                // If RHS not matrix
                            }
                            else {
                                if (idx_3.length == 1) {
                                    updateFunParams(0);
                                    _2 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[0], "] = ").concat(lhs, ";"), fun_params), main_function = _2[0], function_definitions = _2[1];
                                }
                                else {
                                    for (var i = 0; i < idx_3.length; i++) {
                                        updateFunParams(0);
                                        _3 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[i], "] = ").concat(lhs, "[").concat(i, "];"), fun_params), main_function = _3[0], function_definitions = _3[1];
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
                            var condition = "(loop_iterators.length == ".concat(loop_iterators.length - num_back, ");");
                            if (lastSubscript.length > 0) {
                                //condition = `(loop_iterators.length == ${loop_iterators.length - num_back}) && node.previousNamedSibling.text.includes("${lastSubscript[lastSubscript.length - 1]}");`;
                                condition = "\nfunction myfun(loop_iterators, node) {\n    if ((loop_iterators.length == ".concat(loop_iterators.length - num_back, ") && node.previousNamedSibling !== null) {\n        if (node.previousNamedSibling.text.includes(\"").concat(lastSubscript[lastSubscript.length - 1], "\")) {\n            return true;\n        }\n    }\n    return false;\n}\nmyfun(loop_iterators, node);");
                            }
                            var mq = {
                                expression: "// Write matrix ".concat(tmp_mat, "\nint ").concat(tmp_size, " = 1;\nfor (int ").concat(tmp_iter, " = 0 ; ").concat(tmp_iter, " < ").concat(tmp_ndim, "; ").concat(tmp_iter, "++)\n{\n\t").concat(tmp_size, " *= ").concat(tmp_dim, "[").concat(tmp_iter, "];\n}\nMatrix *").concat(tmp_mat, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj3.matrix_type, ");\nwriteM(").concat(tmp_mat, ", ").concat(tmp_size, ", ").concat(tmp_lhs, ");"),
                                condition: condition
                            };
                            main_queue.push(mq);
                            updateFunParams(0);
                            alias_tbl = (0, helperFunctions_1.pushAliasTbl)(node.leftNode.valueNode.text, tmp_mat, node, fun_params);
                            var obj = (0, helperFunctions_1.filterByScope)(tmp_var_types, node.leftNode.valueNode.text, node, 0);
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
                                dim: [obj.dim.reduce(function (a, b) { return a * b; })],
                                ismatrix: false,
                                isvector: true,
                                ispointer: false,
                                isstruct: false,
                                initialized: true,
                                scope: obj.scope
                            });
                        }
                        else {
                            if (idx_3.length == 1) {
                                updateFunParams(0);
                                _4 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[0], "] = ").concat(lhs, ";"), fun_params), main_function = _4[0], function_definitions = _4[1];
                            }
                            else {
                                for (var i = 0; i < idx_3.length; i++) {
                                    updateFunParams(0);
                                    _5 = (0, modifyCode_1.pushToMain)("".concat(tmp_lhs, "[").concat(idx_3[i], "] = ").concat(lhs, "[").concat(i, "];"), fun_params), main_function = _5[0], function_definitions = _5[1];
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
                for (var _39 = 0, _40 = node.namedChildren; _39 < _40.length; _39++) {
                    var child = _40[_39];
                    expression.push(transformNode(child));
                }
                //return "{\n" + expression.join("\n") + "\n}";
                return expression.join("\n");
                break;
            }
            case "cell_subscript" /* g.SyntaxType.CellSubscript */: {
                // only use indexM if subscript is on rhs
                var lhs_flag = false;
                if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
                    if (node.parent.leftNode.text == node.text) {
                        lhs_flag = true;
                    }
                }
                var tmp_d3 = (0, helperFunctions_1.generateTmpVar)("d3_", tmp_tbl);
                var tmp_d2 = (0, helperFunctions_1.generateTmpVar)("d2_", tmp_tbl);
                var tmp_d1 = (0, helperFunctions_1.generateTmpVar)("d1_", tmp_tbl);
                var tmp_d0 = (0, helperFunctions_1.generateTmpVar)("d0_", tmp_tbl);
                var tmp_var_1 = (0, helperFunctions_1.generateTmpVar)("tmp_", tmp_tbl);
                var obj3 = tmp_tbl.find(function (x) { return x.name == "d0_"; });
                var index = getSubscriptIdx(node, obj3.count);
                if (!lhs_flag) { // subscript is on rhs
                    //let obj = alias_tbl.find(x => x.name === node.text);
                    var obj = (0, helperFunctions_1.filterByScope)(alias_tbl, node.text, node, 0);
                    var _41 = (0, typeInference_1.inferType)(node.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_1 = _41[0];
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
                        return "".concat(transformNode(node.valueNode), "[").concat(index[0], "]");
                        // FORGOT REASON FOR ADDING ONE
                        /*} else if (node.startIndex < obj.scope[0] || node.startIndex > obj.scope[1]){
                            if (index.length == 1) {
                                let isnum = /^\d+$/.test(index[0]);
                                if (isnum) {
                                    index[0] = `${Number(index[0]) + 1}`;
                                } else {
                                    index[0] = index[0].replace(/-1/, '');
                                }
                                //index = index[0].concat("+1");
                            }
                            return `${transformNode(node.valueNode)}[${index[0]}]`;*/
                    }
                    else {
                        tmp_var_1 = obj.tmp_var;
                        return tmp_var_1;
                    }
                }
                return "".concat(node.valueNode.text, "[").concat(index[0], "]");
                break;
            }
            case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
                // Is a custom function call
                var obj = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
                var _42 = parseNode(node, false), args1 = _42[0], outs = _42[1], is_subscript = _42[2];
                var arg_types = [];
                var args = [];
                //for (let arg of args1) {
                for (var i = 0; i < args1.length; i++) {
                    var arg = args1[i];
                    args.push(transformNode(arg));
                    var _43 = (0, typeInference_1.inferType)(arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_2 = _43[0], ndim_1 = _43[1], dim_1 = _43[2], ismatrix_3 = _43[3], ispointer_1 = _43[4], isstruct_1 = _43[5], c_5 = _43[6];
                    if (ismatrix_3) { // if a matrix, could actually be a vector so check var name to see if initialized as vector
                        _6 = (0, typeInference_1.inferTypeByName)(args[i], node, tmp_var_types, custom_functions, alias_tbl, debug), type_2 = _6[0], ndim_1 = _6[1], dim_1 = _6[2], ismatrix_3 = _6[3], ispointer_1 = _6[4], isstruct_1 = _6[5], c_5 = _6[6];
                    }
                    custom_functions = c_5;
                    arg_types.push({
                        type: type_2,
                        ndim: ndim_1,
                        dim: dim_1,
                        ismatrix: ismatrix_3,
                        isvector: (0, helperFunctions_1.numel)(dim_1) > 1 && !ismatrix_3,
                        ispointer: ispointer_1,
                        isstruct: isstruct_1
                    });
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
                                scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
                            });
                        }
                        updateFunParams(0);
                        _7 = (0, modifyCode_1.pushToMain)(ptr_declaration.join("\n"), fun_params), main_function = _7[0], function_definitions = _7[1];
                    }
                    if (path.parse(obj.file).name !== path.parse(file).name) {
                        link.push("#include <".concat(path.parse(obj.file).name, ".h>"));
                    }
                    return "".concat(obj.name, "(").concat(args.join(", "), ")");
                }
                else {
                    // Is a builtin function call
                    var obj_2 = builtin_funs.find(function (x) { return x.fun_matlab === node.valueNode.text; });
                    if (obj_2 != null && obj_2 != undefined) {
                        var init_before_1 = obj_2.init_before(args, arg_types, outs);
                        var push_before = obj_2.push_main_before(args, arg_types, outs);
                        var push_after = obj_2.push_main_after(args, arg_types, outs);
                        var return_type = obj_2.return_type(args, arg_types, outs);
                        var fun_c = obj_2.fun_c(args, arg_types, outs);
                        var scope = (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug);
                        args = obj_2.args_transform(args, arg_types, outs);
                        if (init_before_1 != null && init_before_1 != undefined) {
                            var _loop_2 = function (i) {
                                var _52, _53;
                                if (init_before_1[i].name == "complex_one") {
                                    var obj2 = tmp_var_types.find(function (x) { return x.name === init_before_1[i].name; });
                                    if (obj2 == null || obj2 == undefined) {
                                        updateFunParams(0);
                                        _52 = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(init_before_1[i].name, init_before_1[i].val, init_before_1[i], node), fun_params), main_function = _52[0], function_definitions = _52[1];
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
                                    updateFunParams(0);
                                    _53 = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(tmp_var_2, init_before_1[i].val, init_before_1[i], node), fun_params), main_function = _53[0], function_definitions = _53[1];
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
                            };
                            for (var i = 0; i < init_before_1.length; i++) {
                                _loop_2(i);
                            }
                        }
                        updateFunParams(0);
                        _8 = (0, modifyCode_1.pushToMain)(push_before, fun_params), main_function = _8[0], function_definitions = _8[1];
                        var n_args = node.namedChildCount - 1;
                        if (n_args < obj_2.n_req_args) {
                            args = args.concat(obj_2.opt_arg_defaults.slice(0, obj_2.n_req_args - n_args));
                        }
                        var ptr_args = obj_2.ptr_args(arg_types, outs);
                        if (ptr_args != null) {
                            var ptr_declaration = [];
                            var tmp_ptr = "tmp_ptr";
                            for (var i = 0; i < ptr_args.length; i++) {
                                tmp_ptr = (0, helperFunctions_1.generateTmpVar)(ptr_args[i].name, tmp_tbl);
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
                                    isvector: (0, helperFunctions_1.numel)(ptr_args[i].dim) > 1 && !ptr_args[i].ismatrix,
                                    ispointer: false,
                                    isstruct: ptr_args[i].isstruct,
                                    initialized: true,
                                    scope: scope
                                });
                                updateFunParams(0);
                                alias_tbl = (0, helperFunctions_1.pushAliasTbl)(ptr_args[i].name, tmp_ptr, node, fun_params);
                            }
                            updateFunParams(0);
                            _9 = (0, modifyCode_1.pushToMain)(ptr_declaration.join("\n"), fun_params), main_function = _9[0], function_definitions = _9[1];
                            // ptr args were originally outputs in MATLAB code
                            // in the case of 1 ptr arg:
                            // disp(det(A)) -> determinantM(A, &d); fprint("%i", d) 
                            if ((ptr_args.length == 1) && (return_type == null)) {
                                alias_tbl.push({
                                    name: node.text,
                                    tmp_var: tmp_ptr,
                                    scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
                                });
                                if (fun_c != null) {
                                    updateFunParams(0);
                                    _10 = (0, modifyCode_1.pushToMain)("".concat(fun_c, "(").concat(args.join(", "), ");"), fun_params), main_function = _10[0], function_definitions = _10[1];
                                    updateFunParams(0);
                                    _11 = (0, modifyCode_1.pushToMain)(push_after, fun_params), main_function = _11[0], function_definitions = _11[1];
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
                                    _12 = (0, modifyCode_1.pushToMain)(fun_c, fun_params), main_function = _12[0], function_definitions = _12[1];
                                }
                                else {
                                    updateFunParams(0);
                                    _13 = (0, modifyCode_1.pushToMain)("".concat(fun_c, "(").concat(args.join(", "), ");"), fun_params), main_function = _13[0], function_definitions = _13[1];
                                }
                                updateFunParams(0);
                                _14 = (0, modifyCode_1.pushToMain)(push_after, fun_params), main_function = _14[0], function_definitions = _14[1];
                                return null;
                            }
                            else {
                                var var_val = fun_c;
                                if (args != null) {
                                    var_val = "".concat(fun_c, "(").concat(args.join(", "), ")");
                                }
                                if (push_after != null || node.parent.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                                    var tmp_var_3 = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl);
                                    updateFunParams(0);
                                    _15 = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(tmp_var_3, var_val, return_type, node), fun_params), main_function = _15[0], function_definitions = _15[1];
                                    updateFunParams(0);
                                    _16 = (0, modifyCode_1.pushToMain)(push_after, fun_params), main_function = _16[0], function_definitions = _16[1];
                                    tmp_var_types.push({
                                        name: tmp_var_3,
                                        type: return_type.type,
                                        ndim: return_type.ndim,
                                        dim: return_type.dim,
                                        ismatrix: return_type.ismatrix,
                                        isvector: (0, helperFunctions_1.numel)(return_type.dim) > 1 && !return_type.ismatrix,
                                        ispointer: return_type.ispointer,
                                        isstruct: false,
                                        initialized: true,
                                        scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
                                    });
                                    return tmp_var_3;
                                }
                                else {
                                    return var_val;
                                }
                            }
                        }
                        // Is a subscript
                    }
                    else {
                        var tmp_var = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl);
                        // only use indexM if subscript is on rhs
                        var lhs_flag = false;
                        if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
                            if (node.parent.leftNode.text == node.text) {
                                lhs_flag = true;
                            }
                        }
                        var index = [];
                        var tmp_d3 = (0, helperFunctions_1.generateTmpVar)("d3_", tmp_tbl);
                        var tmp_d2 = (0, helperFunctions_1.generateTmpVar)("d2_", tmp_tbl);
                        var tmp_d1 = (0, helperFunctions_1.generateTmpVar)("d1_", tmp_tbl);
                        var tmp_d0 = (0, helperFunctions_1.generateTmpVar)("d0_", tmp_tbl);
                        var tmp_var1_1 = (0, helperFunctions_1.generateTmpVar)("tmp_", tmp_tbl);
                        var obj3 = tmp_tbl.find(function (x) { return x.name == "d0_"; });
                        var flat_idx = getSubscriptIdx(node, obj3.count);
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
                            var obj_3 = (0, helperFunctions_1.filterByScope)(alias_tbl, node.text, node, 0);
                            var _44 = (0, typeInference_1.inferType)(node.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_3 = _44[0];
                            if (obj_3 == null || obj_3 == undefined) {
                                updateFunParams(0);
                                _17 = (0, modifyCode_1.pushToMain)("".concat(type_3, " ").concat(tmp_var, ";"), fun_params), main_function = _17[0], function_definitions = _17[1];
                                if (index.length == 1) {
                                    var isnum = /^\d+$/.test(index[0]);
                                    if (isnum) {
                                        index[0] = "".concat(Number(index[0]) + 1);
                                    }
                                    else {
                                        index[0] = index[0].replace(/-1/, '');
                                    }
                                    //index = index[0].concat("+1");
                                }
                                updateFunParams(0);
                                _18 = (0, modifyCode_1.pushToMain)("indexM(".concat(transformNode(node.valueNode), ", &").concat(tmp_var, ", ").concat(index.length, ", ").concat(index.join(", "), ");"), fun_params), main_function = _18[0], function_definitions = _18[1];
                                //pushToMain(`indexM(${node.valueNode.text}, &${tmp_var}, ${index.length}, ${index.join(", ")});`);
                                var scope = (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug);
                                updateFunParams(0);
                                alias_tbl = (0, helperFunctions_1.pushAliasTbl)(node.text, tmp_var, node, fun_params);
                                tmp_var_types.push({
                                    name: tmp_var,
                                    type: type_3,
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
                                tmp_var = obj_3.tmp_var;
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
                _19 = (0, modifyCode_1.pushToMain)("} else if (" + transformNode(node.conditionNode) + ") {", fun_params), main_function = _19[0], function_definitions = _19[1];
                // come back here
                updateFunParams(0);
                _20 = (0, modifyCode_1.pushToMain)(transformNode(node.consequenceNode), fun_params), main_function = _20[0], function_definitions = _20[1];
                //pushToMain("\n}")
                return null;
                break;
            }
            case "else_clause" /* g.SyntaxType.ElseClause */: {
                var expression = [];
                updateFunParams(0);
                _21 = (0, modifyCode_1.pushToMain)("} else {", fun_params), main_function = _21[0], function_definitions = _21[1];
                updateFunParams(0);
                _22 = (0, modifyCode_1.pushToMain)(transformNode(node.bodyNode), fun_params), main_function = _22[0], function_definitions = _22[1];
                /*for (let i = 0; i < node.bodyNode.namedChildCount; i ++) {
                    pushToMain(transformNode(node.bodyNode.namedChildren[i]));
                }*/
                //pushToMain("\n}")
                return null;
                break;
            }
            // TO DO: FIX STUFF WITH SCOPE IN ADDITION
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
                var obj_4 = (0, helperFunctions_1.filterByScope)(alias_tbl, node.text, node, 0);
                if (obj_4 != null && obj_4 != undefined) {
                    var obj2 = (0, helperFunctions_1.filterByScope)(tmp_var_types, obj_4.tmp_var, node, 0);
                    if (obj2 != null && obj2 != undefined) {
                        // if 1x1 matrix "flatten" to regular int, double, or complex
                        if (obj2.ismatrix && obj2.dim.every(function (x) { return x === 1; }) && node.parent.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                            var obj3 = alias_tbl.find(function (x) { return x.name === obj_4.tmp_var && x.tmp_var.includes("[0]") &&
                                node.startIndex > x.scope[0] && node.endIndex < x.scope[1]; });
                            if (obj3 == null || obj3 == undefined) {
                                var tmp_var_4 = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl);
                                tmp_var_types.push({
                                    name: tmp_var_4,
                                    type: obj2.type,
                                    ndim: 1,
                                    dim: [1],
                                    ismatrix: false,
                                    isvector: false,
                                    ispointer: true,
                                    isstruct: false,
                                    initialized: true,
                                    scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
                                });
                                updateFunParams(0);
                                alias_tbl = (0, helperFunctions_1.pushAliasTbl)(obj_4.tmp_var, "".concat(tmp_var_4, "[0]"), node, fun_params);
                                updateFunParams(0);
                                _23 = (0, modifyCode_1.pushToMain)("".concat(obj2.type, " * ").concat(tmp_var_4, " = ").concat(obj2.type.charAt(0), "_to_").concat(obj2.type.charAt(0), "(").concat(obj_4.tmp_var, ");"), fun_params), main_function = _23[0], function_definitions = _23[1];
                                return "".concat(tmp_var_4, "[0]");
                            }
                            else {
                                return obj3.tmp_var;
                            }
                        }
                    }
                    return obj_4.tmp_var;
                }
                var obj4 = (0, helperFunctions_1.filterByScope)(tmp_var_types, node.text, node, 0);
                if (obj4 != null && obj4 != undefined) {
                    // if 1x1 matrix "flatten" to regular int, double, or complex
                    if (obj4.ismatrix && obj4.dim.every(function (x) { return x === 1; }) && node.parent.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                        var obj5 = alias_tbl.find(function (x) { return x.name === node.text && x.tmp_var.includes("[0]") &&
                            node.startIndex > x.scope[0] && node.endIndex < x.scope[1]; });
                        if (obj5 == null || obj5 == undefined) {
                            var tmp_var_5 = (0, helperFunctions_1.generateTmpVar)("tmp", tmp_tbl);
                            tmp_var_types.push({
                                name: tmp_var_5,
                                type: obj4.type,
                                ndim: 1,
                                dim: [1],
                                ismatrix: false,
                                isvector: false,
                                ispointer: true,
                                isstruct: false,
                                initialized: true,
                                scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
                            });
                            updateFunParams(0);
                            alias_tbl = (0, helperFunctions_1.pushAliasTbl)(node.text, "".concat(tmp_var_5, "[0]"), node, fun_params);
                            updateFunParams(0);
                            _24 = (0, modifyCode_1.pushToMain)("".concat(obj4.type, " * ").concat(tmp_var_5, " = ").concat(obj4.type.charAt(0), "_to_").concat(obj4.type.charAt(0), "(").concat(node.text, ");"), fun_params), main_function = _24[0], function_definitions = _24[1];
                            return "".concat(tmp_var_5, "[0]");
                        }
                        else {
                            return obj5.tmp_var;
                        }
                    }
                }
                return node.text;
                break;
            }
            // Basic types
            //case g.SyntaxType.Ellipsis:
            case "string" /* g.SyntaxType.String */:
            case "attribute" /* g.SyntaxType.Attribute */:
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
                //let expression = slice2list(node);
                //return `{${expression.join(", ")}}`;
                var children_vals = [];
                for (var i = 0; i < node.namedChildCount; i++) {
                    var child = node.namedChildren[i];
                    var _45 = (0, typeInference_1.inferType)(child, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), child_type = _45[0], c_6 = _45[6];
                    custom_functions = c_6;
                    if (child_type == "keyword") {
                        var _46 = (0, typeInference_1.inferType)(node.parent.valueNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), ndim_2 = _46[1], dim_2 = _46[2], c_7 = _46[6];
                        custom_functions = c_7;
                        var firstNode = node.parent.namedChildren[1];
                        var current_dim = 0;
                        var dummyNode = node;
                        while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                            dummyNode = dummyNode.previousNamedSibling;
                            current_dim += 1;
                        }
                        children_vals.push(dim_2[current_dim]);
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
                var _47 = (0, typeInference_1.inferType)(node, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_4 = _47[0], ndim_3 = _47[1], dim_3 = _47[2];
                var numel_2 = dim_3.reduce(function (a, b) { return a * b; });
                var expression = [];
                var tmp_vec = (0, helperFunctions_1.generateTmpVar)("vec", tmp_tbl);
                expression.push("".concat(type_4, " ").concat(tmp_vec, "[").concat(numel_2, "];"));
                expression.push("\nfor (int i = ".concat(start, "; ").concat(start, " + ").concat(step, "*i < ").concat(stop, "; i++) {\n    ").concat(tmp_vec, "[i] = ").concat(start, " + ").concat(step, "*i;\n}\n                "));
                updateFunParams(0);
                _25 = (0, modifyCode_1.pushToMain)(expression.join("\n"), fun_params), main_function = _25[0], function_definitions = _25[1];
                return tmp_vec;
            }
            case "matrix" /* g.SyntaxType.Matrix */: {
                var _48 = (0, typeInference_1.inferType)(node, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type_5 = _48[0], ndim_4 = _48[1], dim_4 = _48[2];
                if (ndim_4 == 2 && dim_4.some(function (x) { return x === 1; })) { // vector
                    var tmp_vec = (0, helperFunctions_1.generateTmpVar)("vec", tmp_tbl);
                    var expression = [];
                    for (var _49 = 0, _50 = node.namedChildren; _49 < _50.length; _49++) {
                        var child = _50[_49];
                        expression.push(child.text);
                    }
                    updateFunParams(0);
                    _26 = (0, modifyCode_1.pushToMain)("".concat(type_5, " ").concat(tmp_vec, "[").concat((0, helperFunctions_1.numel)(dim_4), "] = {").concat(expression.join(", "), "};"), fun_params), main_function = _26[0], function_definitions = _26[1];
                    tmp_var_types.push({
                        name: tmp_vec,
                        type: type_5,
                        ndim: 1,
                        dim: [(0, helperFunctions_1.numel)(dim_4)],
                        ismatrix: false,
                        isvector: true,
                        ispointer: false,
                        isstruct: false,
                        initialized: true,
                        scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
                    });
                    return tmp_vec;
                }
                else { // matrix
                    var tmp_mat = (0, helperFunctions_1.generateTmpVar)("mat", tmp_tbl);
                    updateFunParams(0);
                    _27 = (0, modifyCode_1.pushToMain)(initializeMatrix(node, tmp_mat, ndim_4, dim_4, type_5), fun_params), main_function = _27[0], function_definitions = _27[1];
                    tmp_var_types.push({
                        name: tmp_mat,
                        type: type_5,
                        ndim: ndim_4,
                        dim: dim_4,
                        ismatrix: true,
                        isvector: false,
                        ispointer: false,
                        isstruct: false,
                        initialized: true,
                        scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
                    });
                    return tmp_mat;
                }
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
                    var _a = (0, typeInference_1.inferType)(right_node.leftNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), l_type = _a[0], l_ndim = _a[1], l_dim = _a[2], l_ismatrix = _a[3], l_ispointer = _a[4], l_isstruct = _a[5], c1 = _a[6];
                    custom_functions = c1;
                    var _b = (0, typeInference_1.inferType)(right_node.rightNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), r_type = _b[0], r_ndim = _b[1], r_dim = _b[2], r_ismatrix = _b[3], r_ispointer = _b[4], r_isstruct = _b[5], c2 = _b[6];
                    custom_functions = c2;
                    args.push(right_node.leftNode);
                    args.push(right_node.rightNode);
                    break;
                }
                case "unary_operator" /* g.SyntaxType.UnaryOperator */:
                case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
                    var _c = (0, typeInference_1.inferType)(right_node.argumentNode, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type = _c[0], ndim = _c[1], dim = _c[2], ismatrix = _c[3], ispointer = _c[4], isstruct = _c[5], c = _c[6];
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
    function initializeMatrix(node, name, ndim, dim, type) {
        var obj = customTypes_1.type_to_matrix_type.find(function (x) { return x.type === type; });
        var expression = [];
        var tmp_ndim = (0, helperFunctions_1.generateTmpVar)("ndim", tmp_tbl);
        var tmp_dim = (0, helperFunctions_1.generateTmpVar)("dim", tmp_tbl);
        var scope = (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug);
        expression.push("int ".concat(tmp_ndim, " = ").concat(ndim, ";"));
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
        expression.push("int ".concat(tmp_dim, "[").concat(ndim, "] = {").concat(dim, "};"));
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
        var obj2 = (0, helperFunctions_1.filterByScope)(tmp_var_types, name, node, 0);
        if (obj2 != null && obj2 != undefined) {
            if (obj2.initialized || name.indexOf("[") > -1) {
                expression.push("".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
            }
            else {
                expression.push("Matrix * ".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
                //tmp_var_types = tmp_var_types.filter(function(e) { return e.name !== name });
                tmp_var_types = tmp_var_types.filter(function (e) { return JSON.stringify(e) !== JSON.stringify(obj2); });
                obj2.initialized = true;
                tmp_var_types.push(obj2);
            }
        }
        else {
            if (name.indexOf("[") > -1) {
                expression.push("".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
            }
            else {
                expression.push("Matrix * ".concat(name, " = createM(").concat(tmp_ndim, ", ").concat(tmp_dim, ", ").concat(obj.matrix_type, ");"));
            }
        }
        var tmp_input = (0, helperFunctions_1.generateTmpVar)("input", tmp_tbl);
        expression.push("".concat(type, " *").concat(tmp_input, " = NULL;"));
        var numel = dim.reduce(function (a, b) { return a * b; });
        expression.push("".concat(tmp_input, " = malloc( ").concat(numel, "*sizeof(*").concat(tmp_input, "));"));
        var j = 0;
        for (var i = 0; i < node.childCount; i++) {
            if (node.children[i].isNamed) {
                //let transform_child = node.children[i].text;
                var transform_child = transformNode(node.children[i]);
                if (obj.matrix_type == 3)
                    expression.push("".concat(tmp_input, "[").concat(j, "][] = ").concat(transform_child.replace(/'/g, '"'), ";"));
                else {
                    expression.push("".concat(tmp_input, "[").concat(j, "] = ").concat(transform_child, ";"));
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
        var _a, _b, _c, _d;
        if (debug == 1) {
            console.log("printMatrixFunctions");
        }
        var _e = parseNode(node, false), args1 = _e[0], outs = _e[1], is_subscript = _e[2];
        var arg_types = [];
        var args = [];
        for (var _i = 0, args1_2 = args1; _i < args1_2.length; _i++) {
            var arg = args1_2[_i];
            args.push(transformNode(arg));
            var _f = (0, typeInference_1.inferType)(arg, tmp_var_types, custom_functions, classes, file, alias_tbl, debug), type = _f[0], ndim = _f[1], dim = _f[2], ismatrix = _f[3], ispointer = _f[4], isstruct = _f[5], c = _f[6];
            custom_functions = c;
            arg_types.push({
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: ismatrix,
                isvector: (0, helperFunctions_1.numel)(dim) > 1 && !ismatrix,
                ispointer: ispointer,
                isstruct: isstruct
            });
        }
        for (var i = 0; i < outs.length; i++) {
            outs[i] = outs[i].text;
        }
        var obj = builtinFunctions_1.operatorMapping.find(function (x) { return x.fun_matlab === node.operatorNode.type; });
        var return_type = obj.return_type(args, arg_types, outs);
        var init_before = obj.init_before(args, arg_types, outs);
        var fun_c = obj.fun_c(args, arg_types, outs);
        if (obj.args_transform(args, arg_types, outs) != null) {
            args = obj.args_transform(args, arg_types, outs);
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
                if (init_before[i].ismatrix) {
                    updateFunParams(0);
                    _a = (0, modifyCode_1.pushToMain)("Matrix * ".concat(tmp_var, " = ").concat(init_before[i].val, ";"), fun_params), main_function = _a[0], function_definitions = _a[1];
                }
                else {
                    if (init_before[i].ndim > 1) {
                        updateFunParams(0);
                        _b = (0, modifyCode_1.pushToMain)("".concat(init_before[i].type, " ").concat(tmp_var, "[").concat(init_before[i].ndim, "] = ").concat(init_before[i].val, ";"), fun_params), main_function = _b[0], function_definitions = _b[1];
                    }
                    else {
                        updateFunParams(0);
                        _c = (0, modifyCode_1.pushToMain)("".concat(init_before[i].type, " ").concat(tmp_var, " = ").concat(init_before[i].val, ";"), fun_params), main_function = _c[0], function_definitions = _c[1];
                    }
                }
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
                    scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
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
                scope: (0, typeInference_1.findVarScope)(node, block_idxs, current_code, debug)
            });
            var var_val = fun_c;
            if (args != null) {
                var_val = "".concat(fun_c, "(").concat(args.join(", "), ")");
            }
            updateFunParams(0);
            _d = (0, modifyCode_1.pushToMain)((0, helperFunctions_1.initVar)(tmp_var, var_val, tmp_var_types[tmp_var_types.length - 1], node), fun_params), main_function = _d[0], function_definitions = _d[1];
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
            updateFunParams(0);
            _a = (0, modifyCode_1.pushToMain)("".concat(node.nameNode.text, "_placeholder"), fun_params), main_function = _a[0], function_definitions = _a[1];
            for (var _i = 0, _h = node.bodyNode.namedChildren; _i < _h.length; _i++) {
                var child = _h[_i];
                updateFunParams(0);
                _b = (0, modifyCode_1.pushToMain)(transformNode(child), fun_params), main_function = _b[0], function_definitions = _b[1];
            }
            var _j = parseNode(node, false), outs = _j[1];
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
            var return_node = node.children[1].firstChild;
            //if (obj.return_type.ismatrix) {
            if (ptr_args != null) {
                var ptr_declaration = [];
                for (var i = 0; i < return_node.namedChildCount; i++) {
                    var return_var = return_node.namedChildren[i];
                    var tmp = (0, helperFunctions_1.transformNodeByName)(return_var.text, return_var, alias_tbl);
                    ptr_declaration.push("*p_".concat(return_var.text, " = ").concat(tmp, ";"));
                    if (tmp !== return_var.text) {
                        var _k = (0, typeInference_1.inferTypeByName)(tmp, node, tmp_var_types, custom_functions, alias_tbl, debug), type = _k[0], ndim = _k[1], dim = _k[2], ismatrix = _k[3];
                        ptr_args[i].type = type;
                        ptr_args[i].ndim = ndim;
                        ptr_args[i].dim = dim;
                        ptr_args[i].ismatrix = ismatrix;
                    }
                    // come back here
                    if (ptr_args[i].ismatrix) {
                        param_list.push("Matrix ** p_".concat(return_var.text));
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
                //pushToMain(`\nvoid ${node.nameNode.text}(${param_list_joined}) {`);
                updateFunParams(0);
                _c = (0, modifyCode_1.replaceMain)("\nvoid ".concat(node.nameNode.text, "(").concat(param_list_joined, ") {"), "".concat(node.nameNode.text, "_placeholder"), 1, fun_params), main_function = _c[0], function_definitions = _c[1];
            }
            else {
                if (param_list.length == 0) {
                    var param_list_joined = "void";
                }
                else {
                    var param_list_joined = param_list.join(", ");
                }
                var return_statement = null;
                if (obj.return_type == null) {
                    var return_type = "void";
                }
                else {
                    if (obj.return_type.ismatrix) {
                        var return_type = "Matrix *";
                    }
                    else if (obj.return_type.ispointer) {
                        var return_type = "".concat(obj.return_type.type, " *");
                    }
                    else {
                        var return_type = "".concat(obj.return_type.type);
                    }
                    return_statement = "return ".concat(outs[0], ";");
                }
                function_declarations.push("".concat(return_type, " ").concat(node.nameNode.text, "(").concat(param_list_joined, ");"));
                //pushToMain(`\n${return_type} ${node.nameNode.text}(${param_list_joined}) {`);
                updateFunParams(0);
                _d = (0, modifyCode_1.replaceMain)("\n".concat(return_type, " ").concat(node.nameNode.text, "(").concat(param_list_joined, ") {"), "".concat(node.nameNode.text, "_placeholder"), 1, fun_params), main_function = _d[0], function_definitions = _d[1];
            }
            if (ptr_declaration != undefined) {
                updateFunParams(0);
                _e = (0, modifyCode_1.pushToMain)(ptr_declaration.join("\n"), fun_params), main_function = _e[0], function_definitions = _e[1];
            }
            updateFunParams(0);
            _f = (0, modifyCode_1.pushToMain)(return_statement, fun_params), main_function = _f[0], function_definitions = _f[1];
            updateFunParams(0);
            _g = (0, modifyCode_1.pushToMain)("}", fun_params), main_function = _g[0], function_definitions = _g[1];
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
        var lhs_flag = false;
        if (node.parent.type == "assignment" /* g.SyntaxType.Assignment */) {
            if (node.parent.leftNode.text == node.text) {
                lhs_flag = true;
            }
        }
        var obj = (0, helperFunctions_1.filterByScope)(tmp_var_types, node.valueNode.text, node, 0);
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
                _a = (0, convertSubscript_1.rowMajorFlatIdx)(count, dim, transformNode(node.namedChildren[1]), fun_params), fun_params = _a[0], idx = _a[1];
                updateFunParams(1);
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
        generated_code.push("return 0;");
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