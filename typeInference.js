"use strict";
exports.__esModule = true;
exports.inferType = exports.typeInference = void 0;
var gotoPreorderSucc_1 = require("./gotoPreorderSucc");
function typeInference(tree) {
    var var_types = [];
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "assignment" /* g.SyntaxType.Assignment */: {
                var node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                if (node.leftNode.type == "identifier" /* g.SyntaxType.Identifier */) {
                    var _a = inferType(node.rightNode, var_types), type = _a[0], ndim = _a[1], dim = _a[2], ismatrix = _a[3];
                    var v1 = { name: node.leftNode.text, type: type, ndim: ndim, dim: dim, ismatrix: ismatrix };
                    var_types.push(v1);
                    // If LHS is subscript, type is matrix
                }
                else if (node.leftNode.type == "call_or_subscript" /* g.SyntaxType.CallOrSubscript */) {
                    var v1 = { name: node.leftNode.text, type: 'unknown', ndim: 2, dim: [1, 1], ismatrix: true };
                    var_types.push(v1);
                }
                break;
            }
        }
    } while ((0, gotoPreorderSucc_1.gotoPreorderSucc)(cursor));
    console.log(var_types);
    return var_types;
}
exports.typeInference = typeInference;
function inferType(node, var_types) {
    var _a;
    switch (node.type) {
        // Named types
        case "ellipsis" /* g.SyntaxType.Ellipsis */: {
            return ['ellipsis', 2, [1, 1], false];
            break;
        }
        case ("true" /* g.SyntaxType.True */ || "false" /* g.SyntaxType.False */): {
            return ['bool', 2, [1, 1], false];
            break;
        }
        case "float" /* g.SyntaxType.Float */: {
            return ['float', 2, [1, 1], false];
            break;
        }
        case "integer" /* g.SyntaxType.Integer */: {
            return ['int', 2, [1, 1], false];
            break;
        }
        case "complex" /* g.SyntaxType.Complex */: {
            return ['complex', 2, [1, 1], false];
            break;
        }
        case "string" /* g.SyntaxType.String */: {
            return ['char', 2, [1, 1], false];
            break;
        }
        case "cell" /* g.SyntaxType.Cell */:
        case "matrix" /* g.SyntaxType.Matrix */: {
            var row = 0;
            var col = 0;
            var nrows = 0;
            var ncols = 0;
            for (var i = 0; i < node.childCount; i++) {
                if (node.children[i].type === ";") {
                    row += 1;
                    col = 0;
                }
                else if (node.children[i].isNamed) {
                    if (row == 0) {
                        var _b = inferType(node.children[i], var_types), type_1 = _b[0], ndim_1 = _b[1], dim_1 = _b[2];
                        ncols += dim_1[1];
                    }
                    if (col == 0) {
                        var _c = inferType(node.children[i], var_types), type_2 = _c[0], ndim_2 = _c[1], dim_2 = _c[2];
                        nrows += dim_2[0];
                    }
                    col += 1;
                }
            }
            var children_types_1 = [];
            for (var _i = 0, _d = node.namedChildren; _i < _d.length; _i++) {
                var child = _d[_i];
                var _e = inferType(child, var_types), child_type = _e[0];
                children_types_1.push(child_type);
            }
            var type = 'unknown';
            if (children_types_1.every(function (val) { return val === children_types_1[0]; })) {
                type = children_types_1[0];
            }
            else if (children_types_1.every(function (val) { return ['int', 'float', 'complex'].includes(val); })) {
                if (children_types_1.includes('complex')) {
                    type = 'complex';
                }
                else if (children_types_1.includes('float')) {
                    type = 'float';
                }
                else if (children_types_1.includes('int')) {
                    type = 'int';
                }
            }
            else {
                type = 'heterogeneous';
            }
            return [type, 2, [nrows, ncols], true];
            break;
        }
        // Recursive calls to inferTypes
        case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
        case "boolean_operator" /* g.SyntaxType.BooleanOperator */: {
            return ['bool', 2, [1, 1], false];
            break;
        }
        case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
            var _f = inferType(node.firstChild, var_types), type_3 = _f[0], ndim_3 = _f[1], dim_3 = _f[2], ismatrix_1 = _f[3];
            return [type_3, 2, [dim_3[1], dim_3[0]], ismatrix_1];
            break;
        }
        case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
            if (node.operatorNode.type == "~") {
                return ['bool', 2, [1, 1], false];
            }
            else {
                return inferType(node.firstChild, var_types);
            }
            break;
        }
        case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
            var _g = inferType(node.leftNode, var_types), left_type = _g[0], left_ndim = _g[1], left_dim = _g[2], left_ismatrix = _g[3];
            var _h = inferType(node.rightNode, var_types), right_type = _h[0], right_ndim = _h[1], right_dim = _h[2], right_ismatrix = _h[3];
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
            if (left_ismatrix || right_ismatrix) {
                var ismatrix = true;
            }
            else {
                var ismatrix = false;
            }
            if (left_type == right_type) {
                return [left_type, ndim, dim, ismatrix];
            }
            else if (left_type == 'complex' || right_type == 'complex') {
                return ['complex', ndim, dim, ismatrix];
            }
            else if (left_type == 'float' || right_type == 'float') {
                return ['float', ndim, dim, ismatrix];
            }
            else if (left_type == 'bool') {
                return [right_type, ndim, dim, ismatrix];
            }
            else if (right_type == 'bool') {
                return [left_type, ndim, dim, ismatrix];
            }
            else {
                return ['unknown', 2, [1, 1], false];
            }
            break;
        }
        // Identifiers
        case "identifier" /* g.SyntaxType.Identifier */: {
            var obj = var_types.find(function (x) { return x.name === node.text; });
            if (obj != null) {
                return [obj.type, obj.ndim, obj.dim, obj.ismatrix];
            }
            else {
                return ['unknown', 2, [1, 1], false];
            }
            break;
        }
        case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
            var _j = inferType(node.valueNode, var_types), parent_type = _j[0], parent_ismatrix = _j[3];
            if (parent_ismatrix) {
                var dim_4 = [];
                for (var i = 1; i < node.namedChildCount; i++) {
                    var _k = inferType(node.namedChildren[i], var_types), child_dim = _k[2];
                    dim_4.push(child_dim[1]);
                }
                if (dim_4.every(function (val) { return val === 1; })) {
                    return [parent_type, 2, dim_4, false];
                }
                else {
                    return [parent_type, 2, dim_4, true];
                }
            }
            else {
                return ['unknown', 2, [1, 1], true];
            }
            break;
        }
        case "slice" /* g.SyntaxType.Slice */: {
            var children_types = [];
            var children_vals = [];
            for (var i = 0; i < node.namedChildCount; i++) {
                var child = node.namedChildren[i];
                var _l = inferType(child, var_types), child_type = _l[0];
                if (child_type == "keyword") {
                    _a = inferType(node.parent.valueNode, var_types), ndim = _a[1], dim = _a[2];
                    var firstNode = node.parent.namedChildren[1];
                    var current_dim = 0;
                    var dummyNode = node;
                    while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                        dummyNode = dummyNode.previousNamedSibling;
                        current_dim += 1;
                    }
                    children_vals.push(dim[current_dim]);
                    children_types.push('int');
                }
                else {
                    children_vals.push(Number(child.text));
                    children_types.push(child_type);
                }
            }
            var type = 'unknown';
            if (children_types.every(function (val) { return ['int', 'float', 'complex'].includes(val); })) {
                if (children_types.includes('complex')) {
                    type = 'complex';
                }
                else if (children_types.includes('float')) {
                    type = 'float';
                }
                else if (children_types.includes('int')) {
                    type = 'int';
                }
            }
            var start = children_vals[0];
            var stop = children_vals[1];
            var step = 1;
            if (children_vals.length == 3) {
                stop = children_vals[2];
                step = children_vals[1];
            }
            var len = Math.floor((stop - start) / step) + 1;
            return [type, 2, [1, len], true];
        }
        case "keyword" /* g.SyntaxType.Keyword */: {
            return ['keyword', 2, [1, 1], false];
        }
        // Default
        default: return ['unknown', 2, [1, 1], false];
    }
}
exports.inferType = inferType;
//# sourceMappingURL=typeInference.js.map