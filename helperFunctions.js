"use strict";
exports.__esModule = true;
exports.parseFunctionDefNode = exports.getClasses = exports.getClassFolders = exports.getNonClassFilesInPath = exports.getFilesInPath = exports.writeToFile = exports.initVar = exports.numel = exports.transformNodeByName = exports.findLastSubscript = exports.pushAliasTbl = exports.filterByScope = exports.generateTmpVar = void 0;
//const fs = require("graceful-fs");
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
var path = require("path");
var glob = require("glob");
var identifyCustomFunctions_1 = require("./identifyCustomFunctions");
var typeInference_1 = require("./typeInference");
var treeTraversal_1 = require("./treeTraversal");
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var parser = new Parser();
parser.setLanguage(Matlab);
function generateTmpVar(name, tmp_tbl) {
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
exports.generateTmpVar = generateTmpVar;
function filterByScope(obj, name, node, find_or_filter) {
    if (find_or_filter == 0) {
        return obj.find(function (x) { return x.name === name && node.startIndex >= x.scope[0] && node.endIndex <= x.scope[1]; });
    }
    else if (find_or_filter == 1) {
        return obj.filter(function (x) { return x.name === name && node.startIndex >= x.scope[0] && node.endIndex <= x.scope[1]; });
    }
}
exports.filterByScope = filterByScope;
function pushAliasTbl(lhs, rhs, node, fun_params) {
    var scope = (0, typeInference_1.findVarScope)(node, fun_params.block_idxs, fun_params.current_code, fun_params.debug);
    var obj = filterByScope(fun_params.var_types, lhs, node, 0);
    if (obj !== null && obj !== undefined) {
        scope = obj.scope;
    }
    fun_params.alias_tbl = fun_params.alias_tbl.filter(function (e) {
        return (e.name !== lhs) ||
            ((e.name == lhs) && (e.scope[0] !== scope[0]) && (e.scope[1] !== scope[1]));
    });
    fun_params.alias_tbl.push({
        name: lhs,
        tmp_var: rhs,
        scope: scope
    });
    return fun_params.alias_tbl;
}
exports.pushAliasTbl = pushAliasTbl;
function findLastSubscript(node, fun_params) {
    // for a valueNode with text "m" finds all nodes of form m(...) = ...
    // helps with figuring out when to insert writeM(m) code since we want to do that
    // after all values have been assigned to the matrix m
    var matches = [];
    var re = new RegExp("".concat(node.text, "\\(([\\s\\w+\\-\\*]*)\\)(=| =)"));
    var scope = (0, typeInference_1.findVarScope)(node, fun_params.block_idxs, fun_params.current_code, fun_params.debug);
    var obj = filterByScope(fun_params.var_types, node.text, node, 0);
    if (obj !== null && obj !== undefined) {
        scope = obj.scope;
    }
    var cursor = fun_params.tree.walk();
    do {
        var c = cursor;
        var m = c.currentNode.text.match(re);
        if (c.currentNode.type == "assignment" /* g.SyntaxType.Assignment */) {
            if ((m != null) && (c.currentNode.startIndex >= scope[0]) && (c.currentNode.endIndex <= scope[1])) {
                matches.push(m[0]);
            }
        }
    } while ((0, treeTraversal_1.gotoPreorderSucc)(cursor, fun_params.debug));
    return matches;
}
exports.findLastSubscript = findLastSubscript;
function transformNodeByName(var_name, node, alias_tbl) {
    var obj = filterByScope(alias_tbl, var_name, node, 0);
    if (obj != null) {
        return obj.tmp_var;
    }
    return var_name;
}
exports.transformNodeByName = transformNodeByName;
function numel(x) {
    return x.reduce(function (a, b) { return a * b; });
}
exports.numel = numel;
function initVar(var_name, var_val, var_type, node) {
    var expression = '';
    if (var_type.ismatrix && var_type.ispointer) {
        expression = "Matrix ** ".concat(var_name);
    }
    else if (var_type.ismatrix) {
        expression = "Matrix * ".concat(var_name);
    }
    else if (var_type.isvector) {
        if (var_type.dim.includes(NaN)) {
            expression = "".concat(var_type.type, " ").concat(var_name, "[]");
        }
        else {
            expression = "".concat(var_type.type, " ").concat(var_name, "[").concat(numel(var_type.dim), "]");
        }
    }
    else if (var_type.ispointer) {
        expression = "".concat(var_type.type, " * ").concat(var_name);
    }
    else {
        expression = "".concat(var_type.type, " ").concat(var_name);
    }
    if (var_val !== null) {
        expression = expression.concat("= ".concat(var_val, ";"));
    }
    else {
        if (var_type.ismatrix) {
            expression = expression.concat("= NULL;");
        }
        else {
            expression = expression.concat(";");
        }
    }
    return expression;
}
exports.initVar = initVar;
function writeToFile(out_folder, filename, generated_code) {
    if (!fs.existsSync(out_folder)) {
        fs.mkdirSync(out_folder);
    }
    fs.writeFile(path.join(out_folder, filename), generated_code, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}
exports.writeToFile = writeToFile;
function getFilesInPath(src) {
    var files = glob.sync(src + '/**/*.m');
    return files;
}
exports.getFilesInPath = getFilesInPath;
;
function getNonClassFilesInPath(src) {
    var files1 = glob.sync(src + '/!(@)**/*.m');
    var files2 = glob.sync(src + '/*.m');
    return files1.concat(files2);
}
exports.getNonClassFilesInPath = getNonClassFilesInPath;
;
// https://www.mathworks.com/help/matlab/matlab_oop/organizing-classes-in-folders.html
function getClassFolders(src) {
    var folders = glob.sync(src + '/@**');
    return folders;
}
exports.getClassFolders = getClassFolders;
;
function getClasses(src, debug) {
    var _a;
    var folders = getClassFolders(src);
    var classes = [];
    // Loop 1
    for (var _i = 0, folders_1 = folders; _i < folders_1.length; _i++) {
        var folder = folders_1[_i];
        var class_name = folder.substr(folder.indexOf("@") + 1);
        var files = getFilesInPath(folder);
        var methods = [];
        for (var _b = 0, files_1 = files; _b < files_1.length; _b++) {
            var file = files_1[_b];
            var sourceCode = fs.readFileSync(file, "utf8");
            var tree = parser.parse(sourceCode);
            methods = (0, identifyCustomFunctions_1.identifyCustomFunctions)(tree, methods, [], file, [], debug)[0];
        }
        // Placeholder
        var c = {
            name: class_name,
            methods: methods,
            folder: folder
        };
        classes.push(c);
    }
    // Loop 2
    var classes2 = [];
    for (var _c = 0, classes_1 = classes; _c < classes_1.length; _c++) {
        var c1 = classes_1[_c];
        var files = getFilesInPath(c1.folder);
        var methods = c1.methods;
        for (var _d = 0, files_2 = files; _d < files_2.length; _d++) {
            var file = files_2[_d];
            // Update placeholders
            _a = (0, typeInference_1.typeInference)(file, methods, classes, debug), methods = _a[1];
        }
        var c = {
            name: c1.name,
            methods: methods,
            folder: c1.folder
        };
        classes2.push(c);
    }
    return classes2;
}
exports.getClasses = getClasses;
;
function parseFunctionDefNode(node) {
    switch (node.type) {
        case "ERROR" /* g.SyntaxType.ERROR */: {
            var types = [];
            for (var _i = 0, _a = node.namedChildren; _i < _a.length; _i++) {
                var child = _a[_i];
                types.push(child.type);
            }
            if (types.includes("parameters" /* g.SyntaxType.Parameters */)) {
                var param_idx = types.indexOf("parameters" /* g.SyntaxType.Parameters */);
                var parametersNode = node.namedChildren[param_idx];
                var nameNode = node.namedChildren[param_idx - 1];
                var bodyNode = node.namedChildren[param_idx + 1];
                var return_variableNode = undefined;
                var return_idx = types.indexOf("return_value" /* g.SyntaxType.ReturnValue */);
                if (return_idx != null && return_idx != undefined) {
                    return_variableNode = node.namedChildren[return_idx];
                }
                //return [return_variableNode, nameNode, parametersNode, bodyNode];
                return {
                    type: "function_definition" /* g.SyntaxType.FunctionDefinition */,
                    return_variableNode: return_variableNode,
                    nameNode: nameNode,
                    parametersNode: parametersNode,
                    bodyNode: bodyNode
                };
            }
            else {
                return null;
            }
            break;
        }
        case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
            //return [node.return_variableNode, node.nameNode, node.parametersNode, node.bodyNode];
            if (node.return_variableNode == undefined && node.namedChildren[0].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                node.return_variableNode = node.namedChildren[0];
            }
            return node;
            break;
        }
        default: {
            return null;
            break;
        }
    }
}
exports.parseFunctionDefNode = parseFunctionDefNode;
//# sourceMappingURL=helperFunctions.js.map