"use strict";
exports.__esModule = true;
exports.gotoPreorderSucc = void 0;
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
//# sourceMappingURL=gotoPreorderSucc.js.map