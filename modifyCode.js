"use strict";
exports.__esModule = true;
exports.replaceMain = exports.insertMain = exports.pushToMain = void 0;
function pushToMain(expression, fun_params) {
    if (fun_params.debug == 1) {
        console.log("pushToMain");
    }
    if (expression != null) {
        if (fun_params.current_code == "main") {
            fun_params.main_function.push(expression);
        }
        else if (fun_params.entry_fun_node != null) {
            if (fun_params.entry_fun_node.nameNode.text == fun_params.current_code) {
                fun_params.main_function.push(expression);
            }
        }
        else {
            fun_params.function_definitions.push(expression);
        }
    }
    return [fun_params.main_function, fun_params.function_definitions];
}
exports.pushToMain = pushToMain;
function insertMain(expression, search_exp, num_back, before_after, fun_params) {
    if (fun_params.debug == 1) {
        console.log("insertMain");
    }
    // num_back: if more than one instance of search_exp is found, which instance to choose as formatted as
    // matches[matches.length - num_back]
    var idx = fun_params.main_function.reduce(function (a, e, i) {
        if (e.includes(search_exp))
            a.push(i);
        return a;
    }, []);
    if (idx.length > 1) {
        idx = idx[idx.length - num_back];
    }
    if (expression != null) {
        if (fun_params.current_code == "main") {
            if (before_after == 1) {
                //main_function.splice(idx, 0, expression);
                fun_params.main_function.splice(idx + 1, 0, expression);
            }
            else {
                //main_function.splice(idx-1, 0, expression);
                fun_params.main_function.splice(idx, 0, expression);
            }
        }
        else if (fun_params.entry_fun_node != null) {
            if (fun_params.entry_fun_node.nameNode.text == fun_params.current_code) {
                fun_params.main_function.splice(idx, 0, expression);
                if (before_after == 1) {
                    fun_params.main_function.splice(idx + 1, 0, expression);
                }
                else {
                    fun_params.main_function.splice(idx, 0, expression);
                }
            }
        }
        else {
            var idx_1 = fun_params.function_definitions.reduce(function (a, e, i) {
                if (e.includes(search_exp))
                    a.push(i);
                return a;
            }, []);
            if (idx_1.length > 1) {
                idx_1 = idx_1[idx_1.length - num_back];
            }
            if (before_after == 1) {
                fun_params.function_definitions.splice(idx_1 + 1, 0, expression);
            }
            else {
                fun_params.function_definitions.splice(idx_1, 0, expression);
            }
        }
    }
    return [fun_params.main_function, fun_params.function_definitions];
}
exports.insertMain = insertMain;
function replaceMain(expression, search_exp, num_back, fun_params) {
    if (fun_params.debug == 1) {
        console.log("replaceMain");
    }
    // num_back: if more than one instance of search_exp is found, which instance to choose as formatted as
    // matches[matches.length - num_back]
    var idx = fun_params.main_function.reduce(function (a, e, i) {
        if (e.includes(search_exp))
            a.push(i);
        return a;
    }, []);
    if (idx.length > 1) {
        idx = idx[idx.length - num_back];
    }
    if (expression != null) {
        if (fun_params.current_code == "main") {
            fun_params.main_function[idx] = expression;
        }
        else if (fun_params.entry_fun_node != null) {
            if (fun_params.entry_fun_node.nameNode.text == fun_params.current_code) {
                //main_function.splice(idx, 0, expression);
                fun_params.main_function[idx] = expression;
            }
        }
        else {
            var idx_2 = fun_params.function_definitions.reduce(function (a, e, i) {
                if (e.includes(search_exp))
                    a.push(i);
                return a;
            }, []);
            if (idx_2.length > 1) {
                idx_2 = idx_2[idx_2.length - num_back];
            }
            fun_params.function_definitions[idx_2] = expression;
        }
    }
    return [fun_params.main_function, fun_params.function_definitions];
}
exports.replaceMain = replaceMain;
//# sourceMappingURL=modifyCode.js.map