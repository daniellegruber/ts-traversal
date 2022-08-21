"use strict";
exports.__esModule = true;
require('source-map-support').install();
var Parser = require("tree-sitter");
var Matlab = require("tree-sitter-matlab");
var fs_1 = require("fs");
var parser = new Parser();
parser.setLanguage(Matlab);
var args = process.argv.slice(2);
if (args.length != 1) {
    process.exit(1);
}
// Load the file passed as an argument
var sourceCode = (0, fs_1.readFileSync)(args[0], "utf8");
var tree = parser.parse(sourceCode);
var generated_code = [];
var main_function = [];
var cursor_adjust = false;
var current_code = "main";
var tmpVarCnt = 0;
function generateTmpVar() {
    tmpVarCnt += 1;
    return "tmp" + tmpVarCnt;
}
// Main
function generateCode() {
    var cursor = tree.walk();
    do {
        if (cursor_adjust) {
            cursor.gotoParent();
        }
        var c = cursor;
        var node = c.currentNode;
        switch (node.type) {
            case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                printFunctionDefDeclare(node);
                if (!cursor.gotoNextSibling()) {
                    return;
                }
                cursor_adjust = true;
                current_code = "subprogram";
                break;
            }
            case "comment" /* g.SyntaxType.Comment */:
            case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
                var expression = transformNode(node);
                if (expression != ";") {
                    main_function.push(expression);
                }
                cursor_adjust = false;
                current_code = "main";
                break;
            }
            case "if_statement" /* g.SyntaxType.IfStatement */:
            case "while_statement" /* g.SyntaxType.WhileStatement */:
            case "for_statement" /* g.SyntaxType.ForStatement */: {
                main_function.push(transformNode(node));
                if (!cursor.gotoNextSibling()) {
                    return;
                }
                cursor_adjust = true;
                current_code = "main";
                break;
            }
        }
    } while (gotoPreorderSucc(cursor));
}
var type_to_matrix_type = [
    { type: "integer", matrix_type: 0 },
    { type: "float", matrix_type: 1 },
    { type: "complex", matrix_type: 2 },
    { type: "char", matrix_type: 3 }
];
var numCellStruct = 0;
// Main
function transformNode(node) {
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
            return expression.join("\n");
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
            return expression.join("\n");
            break;
        }
        case "for_statement" /* g.SyntaxType.ForStatement */: {
            var expression1 = [];
            var expression2 = [];
            if (node.rightNode.type == "slice" /* g.SyntaxType.Slice */) {
                expression1.push("int " + node.leftNode.text + ";");
                expression2.push("for (" + node.leftNode.text + " = ");
                expression2.push(node.rightNode.children[0].text + ";");
                if (node.rightNode.childCount == 5) {
                    expression2.push(node.leftNode.text + " <= " + node.rightNode.children[4].text + ";");
                    expression2.push(node.leftNode.text + " += " + node.rightNode.children[2].text);
                }
                else {
                    expression2.push(node.leftNode.text + " <= " + node.rightNode.children[2].text + ";");
                    expression2.push("++ " + node.leftNode.text);
                }
                expression1.push(expression2.join(" ") + ")");
            }
            else if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */) {
                var tmp_var = generateTmpVar();
                var _a = inferType(node.rightNode), type = _a[0], ndim = _a[1], dim = _a[2];
                var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
                if (obj != null) {
                    expression1.push(initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim, type));
                }
                expression1.push("int j;");
                expression2.push("for (j = 1;");
                expression2.push("j <= " + node.rightNode.namedChildCount + ";");
                expression2.push("++j");
                expression1.push(expression2.join(" ") + ")");
                expression1.push("indexM(" + tmp_var + ", &" + node.leftNode.text + ", " + tmp_var + "->ndim=1, j);");
            }
            expression1.push(transformNode(node.bodyNode));
            return expression1.join("\n");
            break;
        }
        case "expression_statement" /* g.SyntaxType.ExpressionStatement */: {
            return transformNode(node.firstChild) + ";";
            break;
        }
        // Assignment
        case "assignment" /* g.SyntaxType.Assignment */: {
            if (node.rightNode.type == "matrix" /* g.SyntaxType.Matrix */ || node.rightNode.type == "cell" /* g.SyntaxType.Cell */) {
                // https://www.mathworks.com/help/coder/ug/homogeneous-vs-heterogeneous-cell-arrays.html
                var _b = inferType(node.rightNode), type = _b[0], ndim = _b[1], dim = _b[2];
                if (type == 'heterogeneous') {
                    var expression1 = [];
                    var expression2 = [];
                    expression1.push("struct cell".concat(numCellStruct, " {"));
                    expression2.push("cell".concat(numCellStruct, " ").concat(node.leftNode.text, ";"));
                    for (var i = 1; i < node.namedChildCount; i++) {
                        var child = node.namedChildren[i];
                        var _c = inferType(child), child_type = _c[0], child_ndim = _c[1], child_dim = _c[2], child_ismatrix = _c[3];
                        var numel = dim.reduce(function (a, b) { return a * b; });
                        if (child.type == "matrix" /* g.SyntaxType.Matrix */) {
                            expression1.push("Matrix f".concat(i, "[").concat(numel, "];"));
                            expression2.push(initializeMatrix(node.rightNode, "".concat(node.leftNode.text, ".f").concat(i), child_ndim, child_dim, type));
                        }
                        else if (child_type == 'char') {
                            expression1.push("".concat(child_type, " f").concat(i, "[").concat(numel, "];"));
                            expression2.push("strcpy(".concat(node.leftNode.text, ".f").concat(i, ", ").concat(child.text.replace(/'/g, '"'), ");"));
                        }
                        else {
                            expression1.push("".concat(child_type, " f").concat(i, ";"));
                            expression2.push("".concat(node.leftNode.text, ".f").concat(i, " = ").concat(child.text));
                        }
                    }
                    expression1.push("}");
                    numCellStruct += 1;
                    expression1.push(expression2);
                    return expression1.join("\n");
                }
                else {
                    var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
                    if (obj != null) {
                        return initializeMatrix(node.rightNode, node.leftNode.text, ndim, dim, type);
                    }
                    else {
                        return "";
                    }
                }
            }
            else {
                var expression = [];
                expression.push(transformNode(node.leftNode));
                expression.push("=");
                expression.push(transformNode(node.rightNode));
                return expression.join(" ");
            }
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
            for (var _i = 0, _d = node.namedChildren; _i < _d.length; _i++) {
                var child = _d[_i];
                expression.push(transformNode(child));
            }
            return "{\n" + expression.join("\n") + "\n}";
            break;
        }
        case "call_or_subscript" /* g.SyntaxType.CallOrSubscript */: {
            // Is a custom function call
            var obj = custom_functions.find(function (x) { return x.name === node.valueNode.text; });
            if (obj != null) {
                var arg_list = [];
                for (var i = 2; i < node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        arg_list.push(transformNode(node.children[i]));
                    }
                }
                arg_list.push(obj.ptr_param);
                var expression = [];
                expression.push(obj.ptr_declaration);
                expression.push(obj.name + "(" + arg_list.join(", ") + ")");
                return expression.join("\n");
                // Is a builtin function call
            }
            else if (builtin_functions.includes(node.valueNode.text)) {
                switch (node.valueNode.text) {
                    case "zeros":
                    case "ones":
                    case "rand":
                    case "randn": {
                        var args_1 = [];
                        for (var i = 2; i < node.childCount; i++) {
                            if (node.children[i].isNamed) {
                                args_1.push(transformNode(node.children[i]));
                            }
                        }
                        var dim_1 = "{" + args_1.join(", ") + "}";
                        var ndim_1 = args_1.length;
                        var tmp_var = generateTmpVar();
                        if (current_code == "main") {
                            main_function.push("Matrix * ".concat(tmp_var, " = ").concat(node.valueNode.text, "M(").concat(ndim_1, ", ").concat(dim_1, ");"));
                        }
                        else if (current_code == "subprogram") {
                            function_definitions.push("Matrix * ".concat(tmp_var, " = onesM(").concat(ndim_1, ", ").concat(dim_1, ");"));
                        }
                        return tmp_var;
                        break;
                    }
                }
                // Is a subscript
            }
            else {
                var v1 = { name: node.valueNode.text, type: 'unknown', ndim: 1, dim: [1], ismatrix: true };
                var_types.push(v1);
                var index = [];
                for (var i = 2; i < node.childCount; i++) {
                    if (node.children[i].isNamed) {
                        index.push(transformNode(node.children[i]));
                    }
                }
                var tmp_var = generateTmpVar();
                if (current_code == "main") {
                    main_function.push("double " + tmp_var + ";");
                    main_function.push("indexM(" + node.valueNode.text + ", &" + tmp_var + ", " + index.join(", ") + ");");
                }
                else if (current_code == "subprogram") {
                    function_definitions.push("double " + tmp_var + ";");
                    function_definitions.push("indexM(" + node.valueNode.text + ", &" + tmp_var + ", " + index.join(", ") + ");");
                }
                return tmp_var;
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
        // Basic types
        //case g.SyntaxType.Ellipsis:
        case "string" /* g.SyntaxType.String */:
        case "identifier" /* g.SyntaxType.Identifier */:
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
    }
}
// Initialize variables
// -----------------------------------------------------------------------------
var var_initializations = [];
function initializeVariables() {
    for (var _i = 0, var_types_1 = var_types; _i < var_types_1.length; _i++) {
        var var_type = var_types_1[_i];
        if (var_type.type != 'matrix' && var_type.type != 'cell') {
            var_initializations.push(var_type.type + " " + var_type.name + ";");
        }
    }
}
// Initialize matrices
// -----------------------------------------------------------------------------
var matrix_initializations = [];
function initializeMatrix(node, name, ndim, dim, type) {
    /*matrix_initializations.push("int ndim = " + ndim + ";");
    matrix_initializations.push("int dim = {" + dim + "};");
    matrix_initializations.push(`Matrix * ${name} = createM(ndim, dim, ${matrix_type});`)
    matrix_initializations.push("double complex *input = NULL;");*/
    var obj = type_to_matrix_type.find(function (x) { return x.type === type; });
    var expression = [];
    expression.push("int ndim = ".concat(ndim, ";"));
    expression.push("int dim = ".concat(dim, ";"));
    expression.push("Matrix * ".concat(name, " = createM(ndim, dim, ").concat(obj.matrix_type, ");"));
    expression.push("double ".concat(type, " *input = NULL;"));
    var numel = dim.reduce(function (a, b) { return a * b; });
    //matrix_initializations.push("input = malloc(" + numel + "*sizeof(*input));");
    expression.push("input = malloc( ".concat(numel, "*sizeof(*input));"));
    var j = 0;
    for (var i = 0; i < node.childCount; i++) {
        if (node.children[i].isNamed) {
            if (obj.matrix_type == 3)
                //matrix_initializations.push("input[" + j + "][] = " + node.children[i].text.replace(/'/g, '"') + ";");
                expression.push("input[".concat(j, "][] = ").concat(node.children[i].text.replace(/'/g, '"'), ";"));
            else {
                //matrix_initializations.push("input[" + j + "] = " + node.children[i].text + ";");
                expression.push("input[j] = ".concat(node.children[i].text, ";"));
            }
            j++;
        }
    }
    /*matrix_initializations.push("writeM(" + name + ", " + numel + ", input);")
    matrix_initializations.push("free(input);")*/
    expression.push("writeM( ".concat(name, ", ").concat(numel, ", input);"));
    expression.push("free(input);");
    return expression.join("\n");
}
var binaryMapping = [
    { operator: '+', "function": "addM" },
    { operator: '-', "function": "minusM" },
    { operator: '*', "function": "mtimesM" },
    { operator: '/', "function": "mrdivideM" },
    { operator: '\\', "function": "mldivideM" },
    { operator: '^', "function": "mpowerM" },
    { operator: '.*', "function": "timesM" },
    { operator: './', "function": "rdivideM" },
    { operator: '.\\', "function": "ldivideM" },
    { operator: '.^', "function": "powerM" },
    { operator: '<', "function": "ltM" },
    { operator: '<=', "function": "leM" },
    { operator: '==', "function": "eqM" },
    { operator: '>', "function": "gtM" },
    { operator: '>=', "function": "geM" },
    { operator: '~=', "function": "neqM" },
];
var unaryMapping = [
    { operator: "+", "function": "FILLIN" },
    { operator: "-", "function": "FILLIN" },
    { operator: "~", "function": "notM" }
];
var transposeMapping = [
    { operator: "'", "function": "ctransposeM" },
    { operator: ".'", "function": "tranposeM" }
];
// Print matrix functions
// -----------------------------------------------------------------------------
function printMatrixFunctions(node) {
    var tmp_var = generateTmpVar();
    switch (node.type) {
        case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
            var obj = unaryMapping.find(function (x) { return x.operator === node.operatorNode.type; });
            var _a = inferType(node.argumentNode), type = _a[0], ismatrix = _a[3];
            if (ismatrix) {
                if (current_code == "main") {
                    main_function.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.argumentNode.text, ")"));
                }
                else if (current_code == "subprogram") {
                    function_definitions.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.argumentNode.text, ")"));
                }
                return tmp_var;
            }
            else {
                return "".concat(obj.operator).concat(transformNode(node.argumentNode));
            }
            break;
        }
        case "transpose_operator" /* g.SyntaxType.TransposeOperator */: {
            var obj = transposeMapping.find(function (x) { return x.operator === node.operatorNode.type; });
            var _b = inferType(node.argumentNode), type = _b[0], ismatrix = _b[3];
            if (ismatrix) {
                if (current_code == "main") {
                    main_function.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.argumentNode.text, ")"));
                }
                else if (current_code == "subprogram") {
                    function_definitions.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.argumentNode.text, ")"));
                }
                return tmp_var;
            }
            else {
                return "".concat(transformNode(node.argumentNode)).concat(obj.operator);
            }
            break;
        }
        case "comparison_operator" /* g.SyntaxType.ComparisonOperator */:
        case "boolean_operator" /* g.SyntaxType.BooleanOperator */:
        case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
            var obj = binaryMapping.find(function (x) { return x.operator === node.operatorNode.type; });
            var _c = inferType(node.leftNode), left_type = _c[0], left_ismatrix = _c[3];
            var _d = inferType(node.rightNode), right_type = _d[0], right_ismatrix = _d[3];
            if (left_ismatrix || right_ismatrix) {
                if (current_code == "main") {
                    main_function.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                }
                else if (current_code == "subprogram") {
                    function_definitions.push("Matrix * ".concat(tmp_var, " = ").concat(obj["function"], "(").concat(node.leftNode.text, ",").concat(node.rightNode.text, ")"));
                }
                return tmp_var;
            }
            else {
                return "".concat(transformNode(node.leftNode), " ").concat(obj.operator, " ").concat(transformNode(node.rightNode));
            }
            break;
        }
    }
}
var custom_functions = [];
var builtin_functions = ['zeros', 'ones'];
function identifyCustomFunctions() {
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                var node = c.currentNode;
                if (node.isNamed && node.nameNode != null) {
                    if (node.children[1].type == "return_value" /* g.SyntaxType.ReturnValue */) {
                        var return_node = node.children[1].firstChild;
                        // If multiple return values, use pointers
                        if (return_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                            var ptr_declaration = [];
                            var ptr_param = [];
                            for (var _i = 0, _a = return_node.namedChildren; _i < _a.length; _i++) {
                                var return_var = _a[_i];
                                var _b = inferType(return_var), return_type = _b[0];
                                ptr_declaration.push(return_type + "* p_" + return_var.text);
                                ptr_param.push("*p_" + return_var.text);
                            }
                            var v1 = { name: node.nameNode.text, ptr_param: ptr_param.join(", "), ptr_declaration: ptr_declaration.join("\n") };
                            custom_functions.push(v1);
                            // If single return value, don't use pointers 
                        }
                        else {
                            var v1 = { name: node.nameNode.text, ptr_param: "", ptr_declaration: "" };
                            custom_functions.push(v1);
                        }
                    }
                    else {
                        var v1 = { name: node.nameNode.text, ptr_param: "", ptr_declaration: "" };
                        custom_functions.push(v1);
                    }
                }
                break;
            }
        }
    } while (gotoPreorderSucc(cursor));
}
// Print function definitions and declarations
// -----------------------------------------------------------------------------
var function_definitions = [];
var function_declarations = [];
function printFunctionDefDeclare(node) {
    if (node.isNamed && node.nameNode != null) {
        var param_list = [];
        for (var _i = 0, _a = node.parametersNode.namedChildren; _i < _a.length; _i++) {
            var param = _a[_i];
            var _b = inferType(param), param_type = _b[0];
            param_list.push(param_type + " " + param.text);
        }
        if (node.children[1].type == "return_value" /* g.SyntaxType.ReturnValue */) {
            var return_node = node.children[1].firstChild;
            // If multiple return values, use pointers
            if (return_node.type == "matrix" /* g.SyntaxType.Matrix */) {
                var ptr_declaration = [];
                for (var _c = 0, _d = return_node.namedChildren; _c < _d.length; _c++) {
                    var return_var = _d[_c];
                    ptr_declaration.push("*p_" + return_var.text + " = " + return_var.text + ";");
                    var _e = inferType(return_var), return_type = _e[0];
                    param_list.push(return_type + "* p_" + return_var.text);
                }
                var ptr_declaration_joined = ptr_declaration.join("\n");
                if (param_list.length == 0) {
                    var param_list_joined = "(void)";
                }
                else {
                    var param_list_joined = "(" + param_list.join(", ") + ")";
                }
                function_declarations.push("void " + node.nameNode.text + param_list_joined + ";");
                function_definitions.push("void " + node.nameNode.text + param_list_joined);
                function_definitions.push("{");
                function_definitions.push(ptr_declaration_joined);
                // If single return value, don't use pointers 
            }
            else {
                if (param_list.length == 0) {
                    var param_list_joined = "(void)";
                }
                else {
                    var param_list_joined = "(" + param_list.join(", ") + ")";
                }
                var _f = inferType(return_node), return_type = _f[0];
                if (return_type == "char") {
                    return_type = "char *";
                }
                function_declarations.push(return_type + " " + node.nameNode.text + param_list_joined + ";");
                function_definitions.push(return_type + " " + node.nameNode.text + param_list_joined);
                function_definitions.push("{");
            }
        }
        for (var _g = 0, _h = node.bodyNode.children; _g < _h.length; _g++) {
            var child = _h[_g];
            function_definitions.push(transformNode(child));
        }
        function_definitions.push("}");
    }
}
var var_types = [];
function inferType(node) {
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
                        var _b = inferType(node.children[i]), type_1 = _b[0], ndim_2 = _b[1], dim_2 = _b[2];
                        ncols += dim_2[1];
                    }
                    if (col == 0) {
                        var _c = inferType(node.children[i]), type_2 = _c[0], ndim_3 = _c[1], dim_3 = _c[2];
                        nrows += dim_3[0];
                    }
                    col += 1;
                }
            }
            var children_types_1 = [];
            for (var _i = 0, _d = node.namedChildren; _i < _d.length; _i++) {
                var child = _d[_i];
                //children_types.push(child.type);
                var _e = inferType(child), child_type = _e[0];
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
            var _f = inferType(node.firstChild), type_3 = _f[0], ndim_4 = _f[1], dim_4 = _f[2], ismatrix_1 = _f[3];
            return [type_3, 2, [dim_4[1], dim_4[0]], ismatrix_1];
            break;
        }
        case "unary_operator" /* g.SyntaxType.UnaryOperator */: {
            if (node.operatorNode.type == "~") {
                return ['bool', 2, [1, 1], false];
            }
            else {
                return inferType(node.firstChild);
            }
            break;
        }
        case "binary_operator" /* g.SyntaxType.BinaryOperator */: {
            var _g = inferType(node.leftNode), left_type = _g[0], left_ndim = _g[1], left_dim = _g[2], left_ismatrix = _g[3];
            var _h = inferType(node.rightNode), right_type = _h[0], right_ndim = _h[1], right_dim = _h[2], right_ismatrix = _h[3];
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
            var _j = inferType(node.valueNode), parent_type = _j[0], parent_ismatrix = _j[3];
            if (parent_ismatrix) {
                var dim_5 = [];
                for (var i = 1; i < node.namedChildCount; i++) {
                    var _k = inferType(node.namedChildren[i]), child_dim = _k[2];
                    dim_5.push(child_dim[1]);
                }
                if (dim_5.every(function (val) { return val === 1; })) {
                    return [parent_type, 2, dim_5, false];
                }
                else {
                    return [parent_type, 2, dim_5, true];
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
                var _l = inferType(child), child_type = _l[0];
                if (child_type == "keyword") {
                    _a = inferType(node.parent.valueNode), ndim = _a[1], dim = _a[2];
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
function typeInference() {
    var cursor = tree.walk();
    do {
        var c = cursor;
        switch (c.nodeType) {
            case "assignment" /* g.SyntaxType.Assignment */: {
                var node = c.currentNode;
                // If LHS is an identifier, type is same as RHS
                if (node.leftNode.type == "identifier" /* g.SyntaxType.Identifier */) {
                    var _a = inferType(node.rightNode), type = _a[0], ndim = _a[1], dim = _a[2], ismatrix = _a[3];
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
    } while (gotoPreorderSucc(cursor));
    console.log("Inferred types:");
    console.log(var_types);
}
// Tree traversal function
// -----------------------------------------------------------------------------
function gotoPreorderSucc(cursor) {
    if (cursor.gotoFirstChild())
        return true;
    while (!cursor.gotoNextSibling()) {
        if (!cursor.gotoParent()) {
            return false;
        }
    }
    return true;
}
// Call functions
// -----------------------------------------------------------------------------
console.log("Source code:\n" + sourceCode);
console.log("---------------------\n");
identifyCustomFunctions();
typeInference();
initializeVariables();
generateCode();
console.log("---------------------\nGenerated code:\n");
generated_code.push("//Link\n#include <stdio.h>\n#include <stdbool.h>\n#include <complex.h>");
generated_code.push("\n//Function declarations");
generated_code.push(function_declarations.join("\n"));
generated_code.push("\n//Main function\nint main(void)\n{\n// Initialize variables");
generated_code.push(var_initializations.join("\n"));
generated_code.push("\n//Initialize matrices");
generated_code.push(matrix_initializations.join("\n"));
generated_code.push("\n" + main_function.join("\n"));
generated_code.push("}\n\n//Subprograms");
generated_code.push(function_definitions.join("\n"));
console.log(generated_code.join("\n"));
//# sourceMappingURL=index.js.map