import * as g from "./generated";

// Tree traversal function
// -----------------------------------------------------------------------------

export function gotoPreorderSucc(cursor: g.TreeCursor): boolean {
    if (cursor.gotoFirstChild())
        return true;
    while (!cursor.gotoNextSibling()) {
        if (!cursor.gotoParent()) {
            return false;
        }
    }
    return true;
}