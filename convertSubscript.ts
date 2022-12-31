import * as g from "./generated";
import { inferType } from "./typeInference";
import { pushToMain, insertMain, replaceMain } from "./modifyCode";
import { numel } from "./helperFunctions";

export function slice2list(node, fun_params) {
    if (fun_params.debug == 1) {
        console.log("slice2list");
    }
    
    let children_vals = []
            
    for (let i=0; i<node.namedChildCount; i++) {
        let child = node.namedChildren[i];
        let [child_type,,,,,,] = inferType(child, fun_params.var_types, fun_params.custom_functions, fun_params.classes, fun_params.file, fun_params.alias_tbl, fun_params.debug);
        
        if (child_type == "keyword") {
            let [,ndim,dim,,,,] = inferType(node.parent.valueNode, fun_params.var_types, fun_params.custom_functions, fun_params.classes, fun_params.file, fun_params.alias_tbl, fun_params.debug);
            if (node.parent.namedChildCount == 2) {
                children_vals.push(numel(dim));
            } else {
                let firstNode = node.parent.namedChildren[1];
                let current_dim = 0;
                let dummyNode = node;
                while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                    dummyNode = dummyNode.previousNamedSibling;
                    current_dim += 1;
                }
                
                children_vals.push(dim[current_dim]);
            }
        } else {
            children_vals.push(Number(child.text));
            
        }
    }
    
    let start = children_vals[0];
    let stop = children_vals[1];
    let step = 1;
        
    if (children_vals.length == 3) {
        stop = children_vals[2];
        step = children_vals[1];
    }
    
    let list = [];
    for (let i = start; i <= stop; i += step) {
        list.push(i);
    }
    console.log("WAZZUP");
    console.log(node.parent.namedChildCount);
    console.log(node.text);
    console.log(children_vals);
    console.log(list);
    return list;
}

export function matrix2list(node, fun_params) {
    if (fun_params.debug == 1) {
        console.log("matrix2list");
    }
    
    let list = []
            
    for (let child of node.namedChildren) {
        //list.push(transformNode(child));
        list.push(child.text);
    }
    return list;
}

export function sub2idx(dim0_node, dim0, dim1_node, dim1, dim2_node, dim2, dim3_node, dim3, d0, d1, d2, fun_params) {
    if (fun_params.debug == 1) {
        console.log("sub2idx");
    }
    
    //var dim0 = dim0_node.text;
    //var dim1 = dim1_node.text;
    //var dim0 = transformNode(dim0_node);
    //var dim1 = transformNode(dim1_node);
    //var dim2 = dim2_node;
    //var dim3 = dim3_node;
    if (dim0_node.type == g.SyntaxType.Slice) {
        dim0 = slice2list(dim0_node, fun_params);
    } else if (dim0_node.type == g.SyntaxType.Matrix) {
        dim0 = matrix2list(dim0_node, fun_params);
    } else {
        dim0 = [dim0];
    }
    if (dim1_node.type == g.SyntaxType.Slice) {
        dim1 = slice2list(dim1_node, fun_params);
    } else if (dim1_node.type == g.SyntaxType.Matrix) {
        dim1 = matrix2list(dim1_node, fun_params);
    } else {
        dim1 = [dim1];
    }
    if (dim2_node == null) {
        dim2 = [1];
    } else {
        if (dim2_node.type == g.SyntaxType.Slice) {
            dim2 = slice2list(dim2_node, fun_params);
        } else if (dim2_node.type == g.SyntaxType.Matrix) {
            dim2 = matrix2list(dim2_node, fun_params);
        } else {
            dim2 = [dim2];
        }
    }
    if (dim3_node == null) {
        dim3 = [1];
    } else {
        if (dim3_node.type == g.SyntaxType.Slice) {
            dim3 = slice2list(dim3_node, fun_params);
        } else if (dim3_node.type == g.SyntaxType.Matrix) {
            dim3 = matrix2list(dim3_node, fun_params);
        } else {
            dim3 = [dim3];
        }
    }

    let idx = [];
    for (let i = 0; i < dim0.length; i++) {
        for (let j = 0; j < dim1.length; j++) {
            for (let k = 0; k < dim2.length; k++) {
                for (let l = 0; l < dim3.length; l++) {
                    
                idx.push(`(${dim1[j]}-1) + (${dim0[i]}-1)*${d1} + (${dim2[k]}-1)*${d0}*${d1} + (${dim3[l]}-1)*${d0}*${d1}*${d2}`);
            
                }
            }
        }
    }
    return idx;
    
}


export function rowMajorFlatIdx(count, dim, idx, fun_params) {
    let dimlen = dim.length;
    if (dim[1] == undefined) {
        dim.push(1);
    }
    if (dim[2] == undefined) {
        dim.push(1);
    }
    
    let tmp_d3 = `d3_${count}`;
    let tmp_d2 = `d2_${count}`;
    let tmp_d1 = `d1_${count}`;
    let tmp_d0 = `d0_${count}`;
    let tmp_var = `tmp_${count}`;
            
    let isnum = /^\d+$/.test(idx);
    let d3 = 1;
    let d2 = 1;
    let d1 = 1;
    let d0 = 1;
    
    let push_to_main = '';
    
    if (isnum) {
        if (dimlen == 2) {
            d3 = 1;
            d2 = 1;
            d0 = Number(idx) % dim[0];
            if (d0 == 0) {
                d0 = dim[0];
            }
            d1 = (Number(idx) - d0)/dim[0] + 1;
        } else if (dimlen == 3) {
            d3 = 1;
            d2 = Math.ceil(Number(idx) / (dim[0] * dim[1]));
            let tmp = Number(idx) % (dim[0] * dim[1]);
            if (tmp == 0) {
                tmp = dim[0] * dim[1];
            }
            d0 = tmp % dim[0];
            if (d0 == 0) {
                d0 = dim[0];
            }
            d1 = (tmp - d0)/dim[0] + 1;
        } else if (dimlen == 4) {
            d3 = Math.ceil(Number(idx) / (dim[0] * dim[1] * dim[2]));
            d2 = (Math.ceil(Number(idx) / (dim[0] * dim[1]))) % dim[2];
            if (d2 == 0) {
                d2 = dim[2];
            }
            let tmp = Number(idx) % (dim[0] * dim[1]);
            if (tmp == 0) {
                tmp = dim[0] * dim[1];
            }
            d0 = tmp % dim[0];
            if (d0 == 0) {
                d0 = dim[0];
            }
            d1 = (tmp - d0)/dim[0] + 1;
        }
    
        return [fun_params, [`${(d1-1) + (d0-1) * dim[1] + (d2-1) * dim[0] * dim[1] + (d3-1) * dim[0] * dim[1] * dim[2]}`]];
        
    } else {
        let obj = fun_params.var_types.find(x => x.name == tmp_d0);
        if (obj == null || obj == undefined) {
        if (dimlen == 2) {
            let [mf, fd] = pushToMain( 
`int ${tmp_d3} = 1;
int ${tmp_d2} = 1;
int ${tmp_d0} = ${idx} % ${dim[0]};
if (${tmp_d0} == 0) {
${tmp_d0} = ${dim[0]};
}
int ${tmp_d1} = (${idx} - ${tmp_d0})/${dim[0]} + 1;`, fun_params);
            fun_params.main_function = mf;
            fun_params.function_definitions = fd;
        } else if (dimlen == 3) {
            let [mf, fd] = pushToMain(
`int ${tmp_d3} = 1;
int ${tmp_d2} = ceil((double) ${idx} / (${dim[0]} * ${dim[1]}));
int ${tmp_var} = ${idx} % (${dim[0]} * ${dim[1]});
if (${tmp_var} == 0) {
${tmp_var} = ${dim[0]} * ${dim[1]};
}
int ${tmp_d0} = ${tmp_var} % ${dim[0]};
if (${tmp_d0} == 0) {
${tmp_d0} = ${dim[0]};
}
int ${tmp_d1} = (${tmp_var} - ${tmp_d0})/${dim[0]} + 1;`, fun_params); 
            fun_params.main_function = mf;
            fun_params.function_definitions = fd;
        } else if (dimlen == 4) {
            let [mf, fd] = pushToMain(
`int ${tmp_d3} = ceil((double) ${idx} / (${dim[0]} * ${dim[1]} * ${dim[2]}));
int ${tmp_d2} = ((int) ceil((double) ${idx} / (${dim[0]} * ${dim[1]}))) % ${dim[2]};
if (${tmp_d2} == 0) {
${tmp_d2} = ${dim[2]};
}
int ${tmp_var} = ${idx} % (${dim[0]} * ${dim[1]});
if (${tmp_var} == 0) {
${tmp_var} = ${dim[0]} * ${dim[1]};
}
int ${tmp_d0} = ${tmp_var} % ${dim[0]};
if (${tmp_d0} == 0) {
${tmp_d0} = ${dim[0]};
}
int ${tmp_d1} = (${tmp_var} - ${tmp_d0})/${dim[0]} + 1;`, fun_params); 
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
        
        return [fun_params, [`(${tmp_d1}-1) + (${tmp_d0}-1) * ${dim[1]} + (${tmp_d2}-1) * ${dim[0]} * ${dim[1]} + (${tmp_d3}-1) * ${dim[0]} * ${dim[1]} * ${dim[2]}`]];
    }
}