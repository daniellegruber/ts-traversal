"use strict";
exports.__esModule = true;
exports.findEntryFunction = exports.fileIsFunction = exports.gotoPreorderSucc_SkipFunctionDef = exports.gotoPreorderSucc_OnlyMajorTypes = exports.gotoPreorderSucc = void 0;
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
exports.gotoPreorderSucc = gotoPreorderSucc;
function gotoPreorderSucc_OnlyMajorTypes(cursor) {
    switch (cursor.currentNode.type) {
        // Don't iterate through children nodes
        case "comment" /* g.SyntaxType.Comment */:
        case "expression_statement" /* g.SyntaxType.ExpressionStatement */:
        case "function_definition" /* g.SyntaxType.FunctionDefinition */:
        case "if_statement" /* g.SyntaxType.IfStatement */:
        case "while_statement" /* g.SyntaxType.WhileStatement */:
        case "for_statement" /* g.SyntaxType.ForStatement */: {
            while (!cursor.gotoNextSibling()) {
                if (!cursor.gotoParent()) {
                    return false;
                }
            }
            break;
        }
        default: {
            if (cursor.gotoFirstChild())
                return true;
            while (!cursor.gotoNextSibling()) {
                if (!cursor.gotoParent()) {
                    return false;
                }
            }
            break;
        }
    }
    return true;
}
exports.gotoPreorderSucc_OnlyMajorTypes = gotoPreorderSucc_OnlyMajorTypes;
function gotoPreorderSucc_SkipFunctionDef(cursor) {
    switch (cursor.currentNode.type) {
        // Don't iterate through children nodes
        case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
            while (!cursor.gotoNextSibling()) {
                if (!cursor.gotoParent()) {
                    return false;
                }
            }
            break;
        }
        default: {
            if (cursor.gotoFirstChild())
                return true;
            while (!cursor.gotoNextSibling()) {
                if (!cursor.gotoParent()) {
                    return false;
                }
            }
            break;
        }
    }
    return true;
}
exports.gotoPreorderSucc_SkipFunctionDef = gotoPreorderSucc_SkipFunctionDef;
function fileIsFunction(tree) {
    var encountered_code_before = false;
    var encountered_function = false;
    var encountered_code_after = false;
    var cursor = tree.walk();
    do {
        var c = cursor;
        var node = c.currentNode;
        switch (node.type) {
            case "function_definition" /* g.SyntaxType.FunctionDefinition */: {
                if (encountered_function) {
                    return false;
                }
                encountered_function = true;
                if (encountered_code_before) {
                    return false;
                }
                break;
            }
            case "module" /* g.SyntaxType.Module */:
            case "comment" /* g.SyntaxType.Comment */: {
                break;
            }
            default: {
                if (encountered_function) {
                    encountered_code_after = true;
                }
                else {
                    encountered_code_before = true;
                }
                break;
            }
        }
    } while (gotoPreorderSucc_SkipFunctionDef(cursor));
    if (!encountered_function || encountered_code_after) {
        return false;
    }
    else
        return true;
}
exports.fileIsFunction = fileIsFunction;
function findEntryFunction(tree) {
    if (fileIsFunction(tree)) {
        var cursor = tree.walk();
        do {
            var c = cursor;
            if (c.currentNode.type == "function_definition" /* g.SyntaxType.FunctionDefinition */) {
                return c.currentNode;
            }
        } while (gotoPreorderSucc(cursor));
    }
    else {
        return null;
    }
}
exports.findEntryFunction = findEntryFunction;
//# sourceMappingURL=treeTraversal.js.map