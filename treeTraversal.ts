import * as g from "./generated";

// Tree traversal function
// -----------------------------------------------------------------------------

export function gotoPreorderSucc(cursor: g.TreeCursor): boolean {
    //console.log("hello1");
    //console.log(cursor.currentNode);
    if (cursor.gotoFirstChild())
        return true;
    while (!cursor.gotoNextSibling()) {
        if (!cursor.gotoParent()) {
            return false;
        }
    }
    return true;
}

export function gotoPreorderSucc_OnlyMajorTypes(cursor: g.TreeCursor): boolean {
    //console.log("hello2");
    
    switch (cursor.currentNode.type) {
        // Don't iterate through children nodes
        case g.SyntaxType.Comment:
        case g.SyntaxType.ExpressionStatement:
        case g.SyntaxType.FunctionDefinition:
        case g.SyntaxType.IfStatement:
        case g.SyntaxType.WhileStatement:
        case g.SyntaxType.ForStatement: {
            while (!cursor.gotoNextSibling()) {
                if (!cursor.gotoParent()) {
                    return false;
                }
            }
            //console.log(cursor.currentNode);
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

export function gotoPreorderSucc_SkipFunctionDef(cursor: g.TreeCursor): boolean {
    //console.log("hello3");
    //console.log(cursor.currentNode);
    switch (cursor.currentNode.type) {
        // Don't iterate through children nodes
        case g.SyntaxType.FunctionDefinition: {
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

export function fileIsFunction(tree): boolean {
    var encountered_code_before = false;
    var encountered_function = false;
    var encountered_code_after = false;
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;
        let node = c.currentNode;
        //console.log("hello4");
        //console.log(cursor.currentNode);
        switch (node.type) {
            case g.SyntaxType.FunctionDefinition: {
                if (encountered_function) {
                    return false;
                }
                encountered_function = true;
                if (encountered_code_before) {
                    return false;
                }
                break;
            }
            case g.SyntaxType.Module:
            case g.SyntaxType.Comment: {
                break;
            }
            default: {
                if (encountered_function) {
                    encountered_code_after = true;
                } else {
                    encountered_code_before = true;
                }
                break;
            }
        }    
    } while(gotoPreorderSucc_SkipFunctionDef(cursor));
    
    if (!encountered_function || encountered_code_after) {
        return false;
    } else
        return true;
}

export function findEntryFunction (tree) {
    if (fileIsFunction(tree)) {
        let cursor = tree.walk(); 
        do {
            const c = cursor as g.TypedTreeCursor;
            if (c.currentNode.type == g.SyntaxType.FunctionDefinition) {
                return c.currentNode
            }
        } while(gotoPreorderSucc(cursor));
    }
    else {
        return null;
    }
}