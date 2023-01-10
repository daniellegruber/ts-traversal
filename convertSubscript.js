"use strict";
exports.__esModule = true;
exports.rowMajorFlatIdx = exports.sub2idx = exports.matrix2list = exports.slice2list = void 0;
var typeInference_1 = require("./typeInference");
var modifyCode_1 = require("./modifyCode");
var helperFunctions_1 = require("./helperFunctions");
function slice2list(node, fun_params) {
    if (fun_params.debug == 1) {
        console.log("slice2list");
    }
    var children_vals = [];
    for (var i = 0; i < node.namedChildCount; i++) {
        var child = node.namedChildren[i];
        var _a = (0, typeInference_1.inferType)(child, fun_params.var_types, fun_params.custom_functions, fun_params.classes, fun_params.file, fun_params.alias_tbl, fun_params.debug), child_type = _a[0];
        if (child_type == "keyword") {
            var _b = (0, typeInference_1.inferType)(node.parent.valueNode, fun_params.var_types, fun_params.custom_functions, fun_params.classes, fun_params.file, fun_params.alias_tbl, fun_params.debug), ndim = _b[1], dim = _b[2];
            if (node.parent.namedChildCount == 2) {
                children_vals.push((0, helperFunctions_1.numel)(dim));
            }
            else {
                var firstNode = node.parent.namedChildren[1];
                var current_dim = 0;
                var dummyNode = node;
                while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                    dummyNode = dummyNode.previousNamedSibling;
                    current_dim += 1;
                }
                children_vals.push(dim[current_dim]);
            }
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
exports.slice2list = slice2list;
function matrix2list(node, fun_params) {
    if (fun_params.debug == 1) {
        console.log("matrix2list");
    }
    var list = [];
    for (var _i = 0, _a = node.namedChildren; _i < _a.length; _i++) {
        var child = _a[_i];
        //list.push(transformNode(child));
        list.push(child.text);
    }
    return list;
}
exports.matrix2list = matrix2list;
function sub2idx(dim0_node, dim0, dim1_node, dim1, dim2_node, dim2, dim3_node, dim3, d0, d1, d2, fun_params) {
    if (fun_params.debug == 1) {
        console.log("sub2idx");
    }
    if (dim0_node.type == "slice" /* g.SyntaxType.Slice */) {
        dim0 = slice2list(dim0_node, fun_params);
    }
    else if (dim0_node.type == "matrix" /* g.SyntaxType.Matrix */) {
        dim0 = matrix2list(dim0_node, fun_params);
    }
    else {
        dim0 = [dim0];
    }
    if (dim1_node.type == "slice" /* g.SyntaxType.Slice */) {
        dim1 = slice2list(dim1_node, fun_params);
    }
    else if (dim1_node.type == "matrix" /* g.SyntaxType.Matrix */) {
        dim1 = matrix2list(dim1_node, fun_params);
    }
    else {
        dim1 = [dim1];
    }
    if (dim2_node == null) {
        dim2 = [1];
    }
    else {
        if (dim2_node.type == "slice" /* g.SyntaxType.Slice */) {
            dim2 = slice2list(dim2_node, fun_params);
        }
        else if (dim2_node.type == "matrix" /* g.SyntaxType.Matrix */) {
            dim2 = matrix2list(dim2_node, fun_params);
        }
        else {
            dim2 = [dim2];
        }
    }
    if (dim3_node == null) {
        dim3 = [1];
    }
    else {
        if (dim3_node.type == "slice" /* g.SyntaxType.Slice */) {
            dim3 = slice2list(dim3_node, fun_params);
        }
        else if (dim3_node.type == "matrix" /* g.SyntaxType.Matrix */) {
            dim3 = matrix2list(dim3_node, fun_params);
        }
        else {
            dim3 = [dim3];
        }
    }
    var idx = [];
    for (var i = 0; i < dim0.length; i++) {
        for (var j = 0; j < dim1.length; j++) {
            for (var k = 0; k < dim2.length; k++) {
                for (var l = 0; l < dim3.length; l++) {
                    idx.push("(".concat(dim1[j], "-1) + (").concat(dim0[i], "-1)*").concat(d1, " + (").concat(dim2[k], "-1)*").concat(d0, "*").concat(d1, " + (").concat(dim3[l], "-1)*").concat(d0, "*").concat(d1, "*").concat(d2));
                }
            }
        }
    }
    return idx;
}
exports.sub2idx = sub2idx;
function rowMajorFlatIdx(count, dim, idx, fun_params) {
    var dimlen = dim.length;
    if (dim[1] == undefined) {
        dim.push(1);
    }
    if (dim[2] == undefined) {
        dim.push(1);
    }
    var tmp_d3 = "d3_".concat(count);
    var tmp_d2 = "d2_".concat(count);
    var tmp_d1 = "d1_".concat(count);
    var tmp_d0 = "d0_".concat(count);
    var tmp_var = "tmp_".concat(count);
    var isnum = /^\d+$/.test(idx);
    var d3 = 1;
    var d2 = 1;
    var d1 = 1;
    var d0 = 1;
    var push_to_main = '';
    if (isnum) {
        if (dimlen == 2) {
            d3 = 1;
            d2 = 1;
            d0 = Number(idx) % dim[0];
            if (d0 == 0) {
                d0 = dim[0];
            }
            d1 = (Number(idx) - d0) / dim[0] + 1;
        }
        else if (dimlen == 3) {
            d3 = 1;
            d2 = Math.ceil(Number(idx) / (dim[0] * dim[1]));
            var tmp = Number(idx) % (dim[0] * dim[1]);
            if (tmp == 0) {
                tmp = dim[0] * dim[1];
            }
            d0 = tmp % dim[0];
            if (d0 == 0) {
                d0 = dim[0];
            }
            d1 = (tmp - d0) / dim[0] + 1;
        }
        else if (dimlen == 4) {
            d3 = Math.ceil(Number(idx) / (dim[0] * dim[1] * dim[2]));
            d2 = (Math.ceil(Number(idx) / (dim[0] * dim[1]))) % dim[2];
            if (d2 == 0) {
                d2 = dim[2];
            }
            var tmp = Number(idx) % (dim[0] * dim[1]);
            if (tmp == 0) {
                tmp = dim[0] * dim[1];
            }
            d0 = tmp % dim[0];
            if (d0 == 0) {
                d0 = dim[0];
            }
            d1 = (tmp - d0) / dim[0] + 1;
        }
        return [fun_params, ["".concat((d1 - 1) + (d0 - 1) * dim[1] + (d2 - 1) * dim[0] * dim[1] + (d3 - 1) * dim[0] * dim[1] * dim[2])]];
    }
    else {
        var obj = fun_params.var_types.find(function (x) { return x.name == tmp_d0; });
        if (obj == null || obj == undefined) {
            if (dimlen == 2) {
                var _a = (0, modifyCode_1.pushToMain)(
                //`int ${tmp_d3} = 1;
                //int ${tmp_d2} = 1;
                "int ".concat(tmp_d0, " = ").concat(idx, " % ").concat(dim[0], ";\nif (").concat(tmp_d0, " == 0) {\n\t").concat(tmp_d0, " = ").concat(dim[0], ";\n}\nint ").concat(tmp_d1, " = (").concat(idx, " - ").concat(tmp_d0, ")/").concat(dim[0], " + 1;"), fun_params), mf = _a[0], fd = _a[1];
                fun_params.main_function = mf;
                fun_params.function_definitions = fd;
            }
            else if (dimlen == 3) {
                var _b = (0, modifyCode_1.pushToMain)(
                //`int ${tmp_d3} = 1;
                "int ".concat(tmp_d2, " = ceil((double) ").concat(idx, " / (").concat(dim[0], " * ").concat(dim[1], "));\nint ").concat(tmp_var, " = ").concat(idx, " % (").concat(dim[0], " * ").concat(dim[1], ");\nif (").concat(tmp_var, " == 0) {\n\t").concat(tmp_var, " = ").concat(dim[0], " * ").concat(dim[1], ";\n}\nint ").concat(tmp_d0, " = ").concat(tmp_var, " % ").concat(dim[0], ";\nif (").concat(tmp_d0, " == 0) {\n\t").concat(tmp_d0, " = ").concat(dim[0], ";\n}\nint ").concat(tmp_d1, " = (").concat(tmp_var, " - ").concat(tmp_d0, ")/").concat(dim[0], " + 1;"), fun_params), mf = _b[0], fd = _b[1];
                fun_params.main_function = mf;
                fun_params.function_definitions = fd;
            }
            else if (dimlen == 4) {
                var _c = (0, modifyCode_1.pushToMain)("int ".concat(tmp_d3, " = ceil((double) ").concat(idx, " / (").concat(dim[0], " * ").concat(dim[1], " * ").concat(dim[2], "));\nint ").concat(tmp_d2, " = ((int) ceil((double) ").concat(idx, " / (").concat(dim[0], " * ").concat(dim[1], "))) % ").concat(dim[2], ";\nif (").concat(tmp_d2, " == 0) {\n\t").concat(tmp_d2, " = ").concat(dim[2], ";\n}\nint ").concat(tmp_var, " = ").concat(idx, " % (").concat(dim[0], " * ").concat(dim[1], ");\nif (").concat(tmp_var, " == 0) {\n\t").concat(tmp_var, " = ").concat(dim[0], " * ").concat(dim[1], ";\n}\nint ").concat(tmp_d0, " = ").concat(tmp_var, " % ").concat(dim[0], ";\nif (").concat(tmp_d0, " == 0) {\n\t").concat(tmp_d0, " = ").concat(dim[0], ";\n}\nint ").concat(tmp_d1, " = (").concat(tmp_var, " - ").concat(tmp_d0, ")/").concat(dim[0], " + 1;"), fun_params), mf = _c[0], fd = _c[1];
                fun_params.main_function = mf;
                fun_params.function_definitions = fd;
            }
            fun_params.var_types.push({
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
        var expression = '';
        if (dimlen == 2) {
            expression = "(".concat(tmp_d1, "-1) + (").concat(tmp_d0, "-1) * ").concat(dim[1]);
        }
        else if (dimlen == 3) {
            expression = "(".concat(tmp_d1, "-1) + (").concat(tmp_d0, "-1) * ").concat(dim[1], " + (").concat(tmp_d2, "-1) * ").concat(dim[0], " * ").concat(dim[1]);
        }
        else {
            expression = "(".concat(tmp_d1, "-1) + (").concat(tmp_d0, "-1) * ").concat(dim[1], " + (").concat(tmp_d2, "-1) * ").concat(dim[0], " * ").concat(dim[1], " + (").concat(tmp_d3, "-1) * ").concat(dim[0], " * ").concat(dim[1], " * ").concat(dim[2]);
        }
        expression = expression.replace(' * 1', '');
        return [fun_params, [expression]];
    }
}
exports.rowMajorFlatIdx = rowMajorFlatIdx;
//# sourceMappingURL=convertSubscript.js.map