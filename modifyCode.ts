export function pushToMain(expression, fun_params) {
    if (fun_params.debug == 1) {
        console.log("pushToMain");
    }
    
    if (expression != null) {
        // Indent expression
        let indent = '\t'.repeat(fun_params.block_level);
        if (expression.slice(0, 2) != '\n') {
            expression = indent.concat(expression);
        }
        expression = expression.replace(/\n|\r/gm, `\n${indent}`);
        
        // Push expression
        if (fun_params.current_code == "main") {
            fun_params.main_function.push(expression);
        } else if (fun_params.entry_fun_node != null) {
            if (fun_params.entry_fun_node.nameNode.text == fun_params.current_code) {
                fun_params.main_function.push(expression);
            }
        } else {
            fun_params.function_definitions.push(expression)
        }
    }
    return [fun_params.main_function, fun_params.function_definitions];
}

//export function insertMain(expression, search_exp, num_back, before_after, fun_params) {
export function insertMain(expression, search_exp, before_after, fun_params) {
    if (fun_params.debug == 1) {
        console.log("insertMain");
    }
    
    // Push expression
    // num_back: if more than one instance of search_exp is found, which instance to choose as formatted as
    // matches[matches.length - num_back]
    let idx = fun_params.main_function.reduce(function(a, e, i) {
        if (e.includes(search_exp))
            a.push(i);
        return a;
    }, []); 
    
    //idx = idx[idx.length - num_back];
    idx = idx[idx.length - 1];
    // Indent expression
    let match = fun_params.main_function[idx].match(/\t+/);
    let indent = match[0];
    let block_level = indent.length;
    if (expression.slice(0, 2) != '\n') {
        expression = indent.concat(expression);
    }
    expression = expression.replace(/\n|\r/gm, `\n${indent}`);
        
    if (expression != null) {
        if (fun_params.current_code == "main") {
            if (before_after == 1) {
                //main_function.splice(idx, 0, expression);
                fun_params.main_function.splice(idx+1, 0, expression);
            } else {
                //main_function.splice(idx-1, 0, expression);
                fun_params.main_function.splice(idx, 0, expression);
            }
        } else if (fun_params.entry_fun_node != null) {
            if (fun_params.entry_fun_node.nameNode.text == fun_params.current_code) {
                fun_params.main_function.splice(idx, 0, expression);
                if (before_after == 1) {
                    fun_params.main_function.splice(idx+1, 0, expression);
                } else {
                    fun_params.main_function.splice(idx, 0, expression);
                }
            }
        } else {
            let idx = fun_params.function_definitions.reduce(function(a, e, i) {
                if (e.includes(search_exp))
                    a.push(i);
                return a;
            }, []); 
            //idx = idx[idx.length - num_back];
            idx = idx[idx.length - 1];
            if (before_after == 1) {
                fun_params.function_definitions.splice(idx+1, 0, expression)
            } else {
                fun_params.function_definitions.splice(idx, 0, expression)
            }
        }
    }
    return [fun_params.main_function, fun_params.function_definitions, block_level];
}

export function replaceMain(expression, search_exp, num_back, fun_params) {
    if (fun_params.debug == 1) {
        console.log("replaceMain");
    }
    
    // Indent expression
    let indent = '\t'.repeat(fun_params.block_level);
    if (expression.slice(0, 2) != '\n') {
        expression = indent.concat(expression);
    }
    expression = expression.replace(/\n|\r/gm, `\n${indent}`);
        
    // Push expression
    // num_back: if more than one instance of search_exp is found, which instance to choose as formatted as
    // matches[matches.length - num_back]
    let idx = fun_params.main_function.reduce(function(a, e, i) {
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
        } else if (fun_params.entry_fun_node != null) {
            if (fun_params.entry_fun_node.nameNode.text == fun_params.current_code) {
                //main_function.splice(idx, 0, expression);
                fun_params.main_function[idx] = expression;
            }
        } else {
            let idx = fun_params.function_definitions.reduce(function(a, e, i) {
                if (e.includes(search_exp))
                    a.push(i);
                return a;
            }, []); 
            if (idx.length > 1) {
                idx = idx[idx.length - num_back];
            }
            fun_params.function_definitions[idx] = expression;
        }
    }
    return [fun_params.main_function, fun_params.function_definitions];
}