import {Type, VarType} from "./typeInference";
//import {SyntaxNode} from "./generated";
    
type typeToMatrixType = {
  type: string;
  matrix_type: number;
};
    
const type_to_matrix_type: typeToMatrixType[] = [
    {type: "integer", matrix_type: 0},
    {type: "int", matrix_type: 0},
    {type: "double", matrix_type: 1},
    {type: "complex", matrix_type: 2},
    {type: "char", matrix_type: 3}
];

type InitVar = {
    name: string;
    val: string;
    type: string;
    ndim: number;
    dim: Array<number>;
    ismatrix: boolean;
    ispointer: boolean;
    isstruct: boolean;
};

type functionMapping = {
    fun_matlab: string;
    fun_c: { (arg_types: Array<Type>, outs: Array<string>): string; };
    args_transform: { (args: Array<string>, arg_types: Array<Type>, outs: Array<string>): Array<string>; }; 
    outs_transform: { (outs: Array<string>): Array<string>; }; 
    n_req_args: number; // # required args
    n_opt_args: number; // # optional args
    opt_arg_defaults: Array<string>;
    ptr_args: { (arg_types: Array<Type>, outs: Array<string>): Array<VarType>; };
    return_type: { (args: Array<string>, arg_types: Array<Type>, outs: Array<string>): Type; };
    push_main_before: { (args: Array<string>, arg_types: Array<Type>, outs: Array<string>): Array<string>; }; // push to main before function call 
    push_main_after: { (args: Array<string>, arg_types: Array<Type>, outs: Array<string>): Array<string>; }; // push to main after function call
    init_before: { (args: Array<string>, arg_types: Array<Type>, outs: Array<string>): Array<InitVar>; }; // vars to initialize before function call 
};

function parseCharArg(arg:string) {
    let regex = /(?<=')(.*?)(?=')|(?<=")(.*?)(?=")/;
    let match = arg.match(regex);
    if (match != null) {
        return match[0];
    } else {
        return arg;
    }
}

function parseVectorArg(arg:string) {
    let regex = /(?<=\[)(.*?)(?=\])/;
    let match1 = arg.match(regex);
    if (match1 != null) {
        let vec_str = match1[0];
        let regex2 = /".*?"|[^,; ]*/g;
        let match2 = vec_str.match(regex2);
        let vec_elements = [];
        if (match2 != null) {
            for (let element of match2) {
                if (element != "") {
                    vec_elements.push(parseCharArg(element));
                }
            }
        }
        return [`{${vec_str}}`, vec_elements];
    } else {
        return [arg, null];
    }
}
    
const binaryOpType = (left_type, right_type) => {
    if (left_type == right_type) {
        return left_type;
    } else if (left_type == 'complex' || right_type == 'complex') {
        return 'complex';
    } else if (left_type == 'double' || right_type == 'double') {
        return 'double';
    } else if (left_type == 'bool') {
        return right_type;
    } else if (right_type == 'bool') {
        return left_type;
    } else {
        return 'unknown';
    }
}
    
export const operatorMapping: functionMapping[] = [
    { // Matrix * plusM(Matrix *m, Matrix *n)
        fun_matlab: '+', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'plusM';
            } else {
                return null;
            }
        }, 
        args_transform: (args, arg_types, outs) => args,
        outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;

            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * minusM(Matrix *m, Matrix *n)
        fun_matlab: '-', 
        fun_c: (arg_types, outs) => {
            
            if (arg_types.length == 1) {
                return null;
            } else {
                let left_ismatrix = arg_types[0].ismatrix;
                let right_ismatrix = arg_types[1].ismatrix;
                if (left_ismatrix && right_ismatrix) {
                    return 'minusM';
                } else {
                    return null;
                }
            }
            
        },  
        args_transform: (args, arg_types, outs) => args,
        outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            if (arg_types.length == 1) {
                return {
                    type: arg_types[0].type,
                    ndim: arg_types[0].ndim,
                    dim: arg_types[0].dim,
                    ismatrix: arg_types[0].ismatrix,
                    ispointer: arg_types[0].ispointer,
                    isstruct: false 
                };
            } else {
                let left_type = arg_types[0].type;
                let left_ndim = arg_types[0].ndim;
                let left_dim = arg_types[0].dim;
                let right_type = arg_types[1].type;
                let right_ndim = arg_types[1].ndim;
                let right_dim = arg_types[1].dim;
                
                return {
                    type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                    ndim: left_ndim,
                    dim: left_dim,
                    ismatrix: true,
                    ispointer: true,
                    isstruct: false 
                };
            }
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * scaleM(Matrix* restrict m, void* restrict scalar, int type)
      // Matrix * mtimesM(Matrix *m, Matrix *n)
        fun_matlab: '*', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            
            if (left_ismatrix && right_ismatrix) {
                return 'mtimesM';
            } else if ((left_ismatrix && !right_ismatrix) || (!left_ismatrix && right_ismatrix)) {
                return 'scaleM';
            } else {
                return null;
            }
        },
        args_transform: (args, arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            
            if ((left_ismatrix && !right_ismatrix) || (!left_ismatrix && right_ismatrix)) {
                let left_type = arg_types[0].type;
                let right_type = arg_types[1].type;
                let type = binaryOpType(left_type, right_type);
                let obj = type_to_matrix_type.find(x => x.type === type);
                if (left_ismatrix) {
                    return [args[0], "&scalar", obj.matrix_type.toString()];
                } else {
                    return [args[1], "&scalar", obj.matrix_type.toString()];
                }
                
            } else {
                return args;
            }
        },
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let left_ismatrix = arg_types[0].ismatrix;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            let right_ismatrix = arg_types[1].ismatrix;
            
            if (left_ismatrix && right_ismatrix) {
                return {
                    type: binaryOpType(left_type, right_type), 
                    ndim: left_ndim,
                    dim: left_dim,
                    ismatrix: true,
                    ispointer: true,
                    isstruct: false 
                };
            } else {
                return {
                    type: binaryOpType(left_type, right_type),
                    ndim: left_ndim,
                    dim: [left_dim[0], right_dim[1]],
                    ismatrix: true,
                    ispointer: true,
                    isstruct: false 
                };
            }
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let left_type = arg_types[0].type;
            let right_ismatrix = arg_types[1].ismatrix;
            let right_type = arg_types[1].type;
            if ((left_ismatrix && !right_ismatrix) || (!left_ismatrix && right_ismatrix)) {
                let init_var: InitVar[] = [];
                let val = args[0];
                let type = left_type;
                if (left_ismatrix) {
                    val = args[1];
                    type = right_type;
                }
                init_var.push({
                    name: 'scalar',
                    val: val,
                    type: type,
                    ndim: 1,
                    dim: [1],
                    ismatrix: false,
                    ispointer: false,
                    isstruct: false
                })
                return init_var;
            } else {
                return null;
            }
        }
    },
    { // Matrix * mrdivideM(Matrix *m, Matrix *n)
        fun_matlab: '/', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            
            if (left_ismatrix && right_ismatrix) {
                return 'mrdivideM';
            } else if (left_ismatrix && !right_ismatrix) {
                return 'scaleM';
            } else {
                return null;
            }
        },
        args_transform: (args, arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            
            if (left_ismatrix && right_ismatrix) {
                return args;
            } else if (left_ismatrix && !right_ismatrix) {
                let left_type = arg_types[0].type;
                let right_type = arg_types[1].type;
                let type = binaryOpType(left_type, right_type);
                let obj = type_to_matrix_type.find(x => x.type === type);
                return [args[0], `1/(${args[1]})`, obj.matrix_type.toString()];
            } else {
                return args;
            }
        },
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: [left_dim[0], right_dim[1]],
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * mldivideM(Matrix *m, Matrix *n)
        fun_matlab: '\\', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            
            if (left_ismatrix && right_ismatrix) {
                return 'mldivideM';
            } else if (!left_ismatrix && right_ismatrix) {
                return 'scaleM';
            } else {
                return null;
            }
        }, 
        args_transform: (args, arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            
            if (left_ismatrix && right_ismatrix) {
                return args;
            } else {
                let left_type = arg_types[0].type;
                let right_type = arg_types[1].type;
                let type = binaryOpType(left_type, right_type);
                let obj = type_to_matrix_type.find(x => x.type === type);
                return [`1/(${args[0]})`, args[1], obj.matrix_type.toString()];
            }
        },
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: [left_dim[0], right_dim[1]],
                ismatrix: true,
                ispointer: true,
                isstruct: false
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * mpowerM(Matrix *m, void *scalar, int type)
        fun_matlab: '^', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && !right_ismatrix) {
                return 'mpowerM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * timesM(Matrix *m, Matrix *n)
        fun_matlab: '.*', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'timesM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * rdivideM(Matrix *m, Matrix *n)
        fun_matlab: './', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'rdivideM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * ldivideM(Matrix *m, Matrix *n)
        fun_matlab: '.\\', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'ldivideM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * powerM(Matrix *m, Matrix *n)
        fun_matlab: '.^', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'powerM';
            } else {
                return null;
            }
        },   
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * ltM(Matrix *m, Matrix *n)
        fun_matlab: '<', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'ltM';
            } else {
                return null;
            }
        },   
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: 'bool', // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * leM(Matrix *m, Matrix *n)
        fun_matlab: '<=', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'leM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: 'bool', // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * gtM(Matrix *m, Matrix *n)
        fun_matlab: '>', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'gtM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: 'bool', // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * geM(Matrix *m, Matrix *n)
        fun_matlab: '>=', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'geM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: 'bool', // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * equalM(Matrix *m, Matrix *n)
        fun_matlab: '==', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'equalM';
            } else {
                return null;
            }
        },   
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: 'bool', // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * neM(Matrix *m, Matrix *n)
        fun_matlab: '~=', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'neM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: 'bool', // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * andM(Matrix *m, Matrix *n)
        fun_matlab: '&', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'andM';
            } else {
                return null;
            }
        },   
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: 'bool', // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * orM(Matrix *m, Matrix *n)
        fun_matlab: '|', 
        fun_c: (arg_types, outs) => {
            let left_ismatrix = arg_types[0].ismatrix;
            let right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'orM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: 'bool', // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { 
        fun_matlab: '&&', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { 
        fun_matlab: '||', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { 
        fun_matlab: '+', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
        outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { 
        fun_matlab: '-', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * notM(Matrix* restrict m)
        fun_matlab: '~', 
        fun_c: (arg_types, outs) => {
            let ismatrix = arg_types[0].ismatrix;
            if (ismatrix) {
                return 'notM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * ctransposeM(Matrix* restrict m)
        fun_matlab: "'", 
        fun_c: (arg_types, outs) => {
            let ismatrix = arg_types[0].ismatrix;
            if (ismatrix) {
                return 'ctransposeM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: [dim[1], dim[0]],
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * transposeM(Matrix* restrict m)
        fun_matlab: ".'", 
        fun_c: (arg_types, outs) => {
            let ismatrix = arg_types[0].ismatrix;
            if (ismatrix) {
                return 'transposeM';
            } else {
                return null;
            }
        },  
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: [dim[1], dim[0]],
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    }
];


export const builtin_functions = [
    { // bool isEqualM(Matrix *m, Matrix *n)
        fun_matlab: 'isequal', 
        fun_c: (arg_types, outs) => 'isEqualM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            return {
                type: 'bool',
                ndim: 2,
                dim: [1,1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // TO DO: Matrix * xcorrM(Matrix *x, Matrix *y, int maxlag, char *scale)
        fun_matlab: 'xcorr', 
        fun_c: (arg_types, outs) => 'xcorrM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 4,
        n_opt_args: 3,
        opt_arg_defaults: ['null', '0', 'none'],
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
        // Initialize output
    	/* if (maxlag == 0)
    	{
    		maxlag = (int) fmax(x_data_size, y_data_size) - 1;
    	}
    	int output_data_size = 2*maxlag + 1;
    
    	int output_type = DOUBLE;
    	if (x->data->datatype == COMPLEX || y->data->datatype == COMPLEX)
    	{
    		output_type = COMPLEX;
    	}
    
    	Matrix *output = NULL;
    
    	if (x->ndim == 2)
    	{
    		int output_dims[] = {1, output_data_size};
    		output = createM(2, output_dims, output_type);
    	}
    	else
    	{
    		int output_dims[] = {output_data_size};
    		output = createM(1, output_dims, output_type);
    	} */

            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * sortM(Matrix* restrict m, int direction)
        fun_matlab: 'sort', // sort(m, dim, direction)
        fun_c: (arg_types, outs) => 'sortM', // sortM(m, direction) -> update c function to accept dim
        args_transform: args => {
            let args_transformed = [];
            for (let i=0; i < args.length; i++) {
                if (i == 0) {
                    args_transformed.push(args[i]);
                } else {
                    if (parseCharArg(args[i]) == 'ascend') {
                        args_transformed.push('0');
                    } else if (parseCharArg(args[i]) == 'descend') {
                        args_transformed.push('1');
                    }
                }
            }
            return args_transformed;
        },
				outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['0'],
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // void ttestM(Matrix* restrict m, double mu, bool* restrict h, double* restrict pval, double* restrict *ci, double* restrict tstat, double* restrict df, double* restrict sd)
      // [h,p,ci,stats] = ttest(___)  
		fun_matlab: 'ttest', 
        fun_c: (arg_types, outs) => {
            if (arg_types.length >= 2) {
                if (arg_types[1].ismatrix) {
                    return 'ttestM_xy';
                }
            }
            return 'ttestM';
        },
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => null,
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['0'],
        ptr_args: (arg_types, outs) => {
            var arg_h = 'h';
            var arg_pval = 'pval';
            var arg_ci = 'ci';
			if (outs.length >= 1) {
			    arg_h = outs[0];
			}
			if (outs.length >= 2) {
			    arg_pval = outs[1];
			}
			if (outs.length >= 3) {
				arg_ci = outs[2];
			} 
			return [
			    {
			        name: arg_h,
			        type: 'bool',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true
			    },
			    {
			        name: arg_pval,
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true
			    },
			    {
			        name: arg_ci,
			        type: 'double',
			        ndim: 2,
			        dim: [1,2],
			        ismatrix: false,
			        ispointer: true
			    },
			    {
			        name: 'tstat',
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true
			    },
			    {
			        name: 'df',
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true
			    },
			    {
			        name: 'sd',
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true
			    },
			];
		},
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // void ztestM(Matrix* restrict m, double mu, double s, bool* restrict h, double* restrict pval, double* restrict *ci, double* restrict z, double* restrict zcrit)
        fun_matlab: 'ztest', 
        fun_c: (arg_types, outs) => 'ztestM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => null,
        n_req_args: 3,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => {
            var arg_h = 'h';
            var arg_pval = 'pval';
            var arg_ci = 'ci';
            var arg_z = 'z';
			if (outs.length >= 1) {
			    arg_h = outs[0];
			}
			if (outs.length >= 2) {
			    arg_pval = outs[1];
			}
			if (outs.length >= 3) {
				arg_ci = outs[2];
			} 
			if (outs.length >= 4) {
				arg_ci = outs[3];
			} 
			return [
			    {
			        name: arg_h,
			        type: 'bool',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: arg_pval,
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: arg_ci,
			        type: 'double',
			        ndim: 2,
			        dim: [1,2],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: arg_z,
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: 'zcrit',
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    }
			];
		},
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // void vartestM(Matrix* restrict m, double v, bool* restrict h, double* restrict pval, double* restrict *ci, double* restrict chisqstat, double* restrict df)
        fun_matlab: 'vartest', 
        fun_c: (arg_types, outs) => 'vartestM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => {
            var arg_h = 'h';
            var arg_pval = 'pval';
            var arg_ci = 'ci';
			if (outs.length >= 1) {
			    arg_h = outs[0];
			}
			if (outs.length >= 2) {
			    arg_pval = outs[1];
			}
			if (outs.length >= 3) {
				arg_ci = outs[2];
			} 
			return [
			    {
			        name: arg_h,
			        type: 'bool',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: arg_pval,
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: arg_ci,
			        type: 'double',
			        ndim: 2,
			        dim: [1,2],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: 'chisqstat',
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: 'df',
			        type: 'double',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    }
			];
		},
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * betapdfM(Matrix* restrict m, double a, double b)
        fun_matlab: 'betapdf', 
        fun_c: (arg_types, outs) => 'betapdfM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 3,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * exppdfM(Matrix* restrict m, double lambda)
        fun_matlab: 'exppdf', 
        fun_c: (arg_types, outs) => 'exppdfM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['1'],
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * chi2pdfM(Matrix* restrict m, double n)
        fun_matlab: 'chi2pdf', 
        fun_c: (arg_types, outs) => 'chi2pdfM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * gampdfM(Matrix* restrict m, double a, double b)
        fun_matlab: 'gampdf', 
        fun_c: (arg_types, outs) => 'gampdfM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 3,
        n_opt_args: 1,
        opt_arg_defaults: ['1'],
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * lognpdfM(Matrix* restrict m, double mu, double sigma)
        fun_matlab: 'lognpdf', 
        fun_c: (arg_types, outs) => 'lognpdfM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 3,
        n_opt_args: 2,
        opt_arg_defaults: ['0','1'],
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * normpdfM(Matrix* restrict m, double mu, double sigma)
        fun_matlab: 'normpdf', 
        fun_c: (arg_types, outs) => 'normpdfM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 3,
        n_opt_args: 2,
        opt_arg_defaults: ['0','1'],
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * unidpdfM(Matrix* restrict m, int n)
        fun_matlab: 'unidpdf', 
        fun_c: (arg_types, outs) => 'unidpdfM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // void normfitM(Matrix* restrict m, void* restrict mu, void* restrict sigma)
        fun_matlab: 'normfit', 
        fun_c: (arg_types, outs) => 'normfitM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => {
            var arg_mu = 'mu';
            var arg_sigma = 'sigma';
			if (outs.length >= 1) {
			    arg_mu = outs[0];
			}
			if (outs.length >= 2) {
			    arg_sigma = outs[1];
			}
			return [
			    {
			        name: arg_mu,
			        type: 'void',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: arg_sigma,
			        type: 'void',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    }
			];
		},
        return_type: arg_types => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // void unifitM(Matrix* restrict m, void* restrict a, void* restrict b)
        fun_matlab: 'unifit', 
        fun_c: (arg_types, outs) => 'unifitM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => {
            var arg_a = 'a';
            var arg_b = 'b';
			if (outs.length >= 1) {
			    arg_a = outs[0];
			}
			if (outs.length >= 2) {
			    arg_b = outs[1];
			}
			return [
			    {
			        name: arg_a,
			        type: 'void',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: arg_b,
			        type: 'void',
			        ndim: 2,
			        dim: [1,1],
			        ismatrix: false,
			        ispointer: true,
                    isstruct: false
			    }
			];
		},
        return_type: arg_types => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    /*{ // Matrix * reindexM(Matrix* restrict m, int size, ...)
        fun_matlab: 'containers.Map', 
        fun_c: (arg_types, outs) => 'reindexM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },*/
    { // TO DO: void eigM(Matrix* restrict m, Matrix* restrict *evals, Matrix* restrict *evecs)
        fun_matlab: 'eig', 
        fun_c: (arg_types, outs) => 'eigM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => {
            var arg_evals = 'evals';
            var arg_evecs = 'evecs';
			if (outs.length >= 1) {
			    arg_evals = outs[0];
			}
			if (outs.length >= 2) {
			    arg_evecs = outs[1];
			}
			return [
			    {
			        name: arg_evals,
			        type: 'complex',
			        ndim: arg_types[0].ndim,
			        dim: arg_types[0].dim,
			        ismatrix: true,
			        ispointer: true,
                    isstruct: false
			    },
			    {
			        name: arg_evecs,
			        type: 'complex',
			        ndim: arg_types[0].ndim,
			        dim: arg_types[0].dim,
			        ismatrix: true,
			        ispointer: true,
                    isstruct: false
			    }
			];
		},
        return_type: arg_types => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * absM(Matrix* restrict m)
        fun_matlab: 'abs', 
        fun_c: (arg_types, outs) => 'absM', 
        args_transform: (args, arg_types, outs) => args,
				outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * roundM(Matrix* restrict m)
        fun_matlab: 'round', 
        fun_c: (arg_types, outs) => 'roundM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * floorM(Matrix* restrict m)
        fun_matlab: 'floor', 
        fun_c: (arg_types, outs) => 'floorM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * ceilM(Matrix* restrict m)
        fun_matlab: 'ceil', 
        fun_c: (arg_types, outs) => 'ceilM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * maxM(Matrix* restrict m)
        fun_matlab: 'max', 
        fun_c: (arg_types, outs) => {
            if (outs.length == 1) {
                return 'max';
            }
            else {
                return 'maxV';
            }
        }, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => {
			return outs[0];
		},
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => {
            if (outs.length == 1) {
                return null;
            }
            else {
                return [
                    {
                        name: outs[1],
                        type: 'int',
                        ndim: 2,
                        dim: [1,1],
                        ismatrix: false,
                        ispointer: true,
                        isstruct: false
                    }
                ];
            }
        },
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            
            return {
                type: type,
                ndim: 2,
                dim: [1,1],
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * minM(Matrix* restrict m)
        fun_matlab: 'min', 
        fun_c: (arg_types, outs) => {
            if (outs.length == 1) {
                return 'min';
            }
            else {
                return 'minV';
            }
        },  
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => {
			return outs[0];
		},
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => {
            if (outs.length == 1) {
                return null;
            }
            else {
                return [
                    {
                        name: outs[1],
                        type: 'int',
                        ndim: 2,
                        dim: [1,1],
                        ismatrix: false,
                        ispointer: true
                    }
                ];
            }
        },
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            
            return {
                type: type,
                ndim: 2,
                dim: [1,1],
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * varM(Matrix* restrict m)
        fun_matlab: 'var', 
        fun_c: (arg_types, outs) => 'varM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let type = arg_types[0].type;
            let ndim = arg_types[0].ndim;
            let dim = arg_types[0].dim;
            
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * quantileM_vec(Matrix* restrict m, int N, double* restrict quantiles)
        fun_matlab: 'quantile', 
        fun_c: (arg_types, outs) => 'quantileM_vec', 
        args_transform: (args, arg_types, outs) => {
            let quantile_specifier = Number(args[1]);
            if (Number.isInteger(quantile_specifier)) {
                var n_quantiles:number = quantile_specifier;
                let arr = [];
                let step = 1/(quantile_specifier + 1);
                for (let i = 0; i < 1; i += step) {
                    arr.push(i);
                }
                var quantiles:string = `{${arr.toString()}}`;
            } else {
                let [vec_str, vec_elements] = parseVectorArg(args[1]);
                var n_quantiles:number = vec_elements.length;
                var quantiles:string = vec_str.toString();
            }
            return [args[0], n_quantiles, quantiles];
        },
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            let arg0_type = arg_types[0].type;
            let arg0_ndim = arg_types[0].ndim;
            let arg0_dim = arg_types[0].dim;
            let quantile_specifier = Number(args[1]);
            if (Number.isInteger(quantile_specifier)) {
                var n_quantiles:number = quantile_specifier;
            } else {
                let [, vec_elements] = parseVectorArg(args[1]);
                var n_quantiles:number = vec_elements.length;
            }
            
            // If m is a row or column vector, returns a 1xN matrix with the specified  quantiles
            // If m is a matrix of size rxc, returns a Nxc matrix with the specified quantiles of each column
            return {
                type: arg0_type,
                ndim: 2,
                dim: [n_quantiles, arg0_dim[1]],
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * zerosM(int ndim, int dim[ndim])
        fun_matlab: 'zeros', 
        fun_c: (arg_types, outs) => 'zerosM', 
        args_transform: (args, arg_types, outs) => {
            var dim = `{${args.join(", ")}}`;
            var ndim = args.length;
            
            if (args.length == 1) {
                dim = `{${args[0]},${args[0]}}`;
                ndim = 2;
            }
            //return [ndim, dim];
            return ['ndim', 'dim'];
        },
		outs_transform: (outs) => outs[0],
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            var dim = [];
            var ndim = args.length;
            if (args.length == 1) {
                dim = [Number(args[0]), Number(args[0])];
                ndim = 2;
            } else {
                for (let arg of args) {
                    dim.push(Number(arg));
                }
            }
            
            return {
                type: 'int',
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => {
            let dim = `{${args.join(", ")}}`;
            let ndim = args.length;
            if (args.length == 1) {
                dim = `{${args[0]},${args[0]}}`;
                ndim = 2;
            }
            
            let init_var: InitVar[] = [];
            init_var.push({
                name: 'ndim',
                val: ndim,
                type: 'int',
                ndim: 1,
                dim: [1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            })
            init_var.push({
                name: 'dim',
                val: dim,
                type: 'int',
                ndim: ndim,
                dim: [ndim],
                ismatrix: ndim > 1,
                ispointer: false,
                isstruct: false
            })
            return init_var;
        }
    },
    { // Matrix * onesM(int ndim, int dim[ndim])
        fun_matlab: 'ones', 
        fun_c: (arg_types, outs) => 'onesM', 
        args_transform: (args, arg_types, outs) => {
            var dim = `{${args.join(", ")}}`;
            var ndim = args.length;
            if (args.length == 1) {
                dim = `{${args[0]},${args[0]}}`;
                ndim = 2;
            }
            //return [ndim, dim];
            return ['ndim', 'dim'];
        },
		outs_transform: (outs) => outs,
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            var dim = [];
            var ndim = args.length;
            if (args.length == 1) {
                dim = [Number(args[0]), Number(args[0])];
                ndim = 2;
            } else {
                for (let arg of args) {
                    dim.push(Number(arg));
                }
            }
            
            return {
                type: 'int',
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => {
            let dim = `{${args.join(", ")}}`;
            let ndim = args.length;
            if (args.length == 1) {
                dim = `{${args[0]},${args[0]}}`;
                ndim = 2;
            }
            
            let init_var: InitVar[] = [];
            init_var.push({
                name: 'ndim',
                val: `${ndim}`,
                type: 'int',
                ndim: 1,
                dim: [1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            })
            init_var.push({
                name: 'dim',
                val: `${dim}`,
                type: 'int',
                ndim: ndim,
                dim: [ndim],
                ismatrix: ndim > 1,
                ispointer: false,
                isstruct: false
            })
            return init_var;
        }
    },
    { // Matrix * identityM(int size)
        fun_matlab: 'eye', 
        fun_c: (arg_types, outs) => 'identityM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            var dim = [Number(args[0]), Number(args[0])];
            var ndim = 2;
            
            return {
                type: 'int',
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => {
            let dim = `{${args[0]}, ${args[0]}}`;
            let ndim = 2;
            
            let init_var: InitVar[] = [];
            init_var.push({
                name: 'ndim',
                val: `${ndim}`,
                type: 'int',
                ndim: 1,
                dim: [1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            })
            init_var.push({
                name: 'dim',
                val: dim,
                type: 'int',
                ndim: ndim,
                dim: [ndim],
                ismatrix: ndim > 1,
                ispointer: false,
                isstruct: false
            })
            return init_var;
        }
    },
    { 
        fun_matlab: 'cell', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => {
            var dim = `{${args.join(", ")}}`;
            var ndim = args.length;
            
            if (args.length == 1) {
                dim = `{${args[0]},${args[0]}}`;
                ndim = 2;
            }
            //return [ndim, dim];
            return ['ndim', 'dim'];
        },
		outs_transform: (outs) => outs[0],
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            var dim = [];
            var ndim = args.length;
            if (args.length == 1) {
                dim = [Number(args[0]), Number(args[0])];
                ndim = 2;
            } else {
                for (let arg of args) {
                    dim.push(Number(arg));
                }
            }
            
            return {
                type: 'heterogeneous',
                ndim: ndim,
                dim: dim,
                ismatrix: true, //false,
                ispointer: true,
                isstruct: false, //true 
            };
        },
        push_main_before: (args, arg_types, outs) => {
            var dim = [];
            var ndim = args.length;
            if (args.length == 1) {
                dim = [Number(args[0]), Number(args[0])];
                ndim = 2;
            } else {
                for (let arg of args) {
                    dim.push(Number(arg));
                }
            }
            let numel = dim.reduce(function(a, b) {return a * b;});
            return `
Matrix **${outs[0]} = NULL;
${outs[0]} = malloc(${numel}*sizeof(*${outs[0]}));
	        `
        },
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => {
            let dim = `{${args.join(", ")}}`;
            let ndim = args.length;
            if (args.length == 1) {
                dim = `{${args[0]},${args[0]}}`;
                ndim = 2;
            }
            
            let init_var: InitVar[] = [];
            init_var.push({
                name: 'ndim',
                val: `${ndim}`,
                type: 'int',
                ndim: 1,
                dim: [1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            })
            init_var.push({
                name: 'dim',
                val: `${dim}`,
                type: 'int',
                ndim: ndim,
                dim: [ndim],
                ismatrix: ndim > 1,
                ispointer: false,
                isstruct: false
            })
            return init_var;
        }
    },
    { // int strcmp(const char* str1, const char* str2)
        fun_matlab: 'strcmp', 
        fun_c: (arg_types, outs) => 'strcmp', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            return {
                type: 'int',
                ndim: 2,
                dim: [1,1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // int strcmpi(const char * str1, const char * str2 )
        fun_matlab: 'strcmpi', 
        fun_c: (arg_types, outs) => 'strcmpi', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        
        return_type: (args, arg_types, outs) => {
            return {
                type: 'int',
                ndim: 2,
                dim: [1,1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    {
        fun_matlab: 'struct', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { //int getsizeM(Matrix* restrict m)
        fun_matlab: 'numel', 
        fun_c: (arg_types, outs) => 'getsizeM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            return {
                type: 'int',
                ndim: 2,
                dim: [1,1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // int * getDimsM(Matrix* restrict m)
        fun_matlab: 'size', 
        fun_c: (arg_types, outs) => 'getDimsM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            return {
                type: 'int',
                ndim: arg_types[0].ndim,
                dim: arg_types[0].dim,
                ismatrix: false,
                ispointer: true
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    {
        fun_matlab: 'length', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    {
        fun_matlab: 'sum', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    {
        fun_matlab: 'prod', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    {
        fun_matlab: 'error', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    {
        fun_matlab: 'permute', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * randM(int ndim, int dim[ndim])
        fun_matlab: 'rand', 
        fun_c: (arg_types, outs) => 'randM', 
        args_transform: args => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
            return [ndim, dim];
        },
		outs_transform: (outs) => outs,
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), 
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * randnM(int ndim, int dim[ndim])
        fun_matlab: 'randn', 
        fun_c: (arg_types, outs) => 'randnM', 
        args_transform: (args, arg_types, outs) => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
            return [ndim, dim];
        },
		outs_transform: (outs) => outs,
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), // create function to get types giving precedence to complex, double, then int
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    {
        fun_matlab: 'memmapfile', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: arg_types => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * meanM(Matrix* restrict m)
        fun_matlab: 'mean', 
        fun_c: (arg_types, outs) => 'meanM', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), 
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * stdM(Matrix* restrict m)
        fun_matlab: 'std', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            let left_type = arg_types[0].type;
            let left_ndim = arg_types[0].ndim;
            let left_dim = arg_types[0].dim;
            let right_type = arg_types[1].type;
            let right_ndim = arg_types[1].ndim;
            let right_dim = arg_types[1].dim;
            
            return {
                type: binaryOpType(left_type, right_type), 
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    {
        fun_matlab: 'isa', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    {
        fun_matlab: 'fieldnames', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // TO DO: fix this
        fun_matlab: 'struct', 
        fun_c: (arg_types, outs) => null, 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            return {
                type: 'unknown', 
                ndim: 2,
                dim: [1,1],
                ismatrix: false,
                ispointer: false,
                isstruct: true 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // TO DO: FIX THIS https://www.tutorialspoint.com/c_standard_library/c_function_printf.htm
        fun_matlab: 'disp', 
        fun_c: (arg_types, outs) => {
            if (arg_types[0].ismatrix) {
                return 'printM';
            } else {
                return 'printf';
            }
        }, 
        args_transform: (args, arg_types, outs) => {
            if (arg_types[0].ismatrix) {
                return args;
            } else {
                let format = '"\\n%d"';
                if (arg_types[0].type == 'double') {
                    format = '"\\n%f"';
                } else if (arg_types[0].type == 'int') {
                    format = '"\\n%d"';
                } else if (arg_types[0].type == 'char') {
                    format = '"\\n%s"';
                    args[0] = args[0].replace(/'/g, '"');
                }
                return [format, args[0]];
            }
        },
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // TO DO: FIX THIS
        fun_matlab: 'sprintf', 
        fun_c: (arg_types, outs) => 'printf', 
        args_transform: (args, arg_types, outs) => args,
		outs_transform: (outs) => outs,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => null,
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => null
    },
    { // Matrix * fftM(Matrix* restrict m)
        fun_matlab: 'fft', 
        fun_c: (arg_types, outs) => 'fftM', 
        args_transform: (args, arg_types, outs) => [args[0]],
		outs_transform: (outs) => outs[0],
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            
            let dim = arg_types[0].dim;
            let ndim = arg_types[0].ndim;
            
            if (args.length == 2) {
                console.log("WARNING: fftM dimensions adjusted")
            }
            
            return {
                type: 'float',
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => {
            let dim = arg_types[0].dim;
            let ndim = arg_types[0].ndim;
            
            let init_var: InitVar[] = [];
            init_var.push({
                name: 'ndim',
                val: ndim,
                type: 'int',
                ndim: 1,
                dim: [1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            })
            init_var.push({
                name: 'dim',
                val: `{${dim}}`,
                type: 'int',
                ndim: ndim,
                dim: [ndim],
                ismatrix: ndim > 1,
                ispointer: false,
                isstruct: false
            })
            return init_var;
        }
    },
    { // Matrix * ifftM(Matrix* restrict m)
        fun_matlab: 'ifft', 
        fun_c: (arg_types, outs) => 'ifftM', 
        args_transform: (args, arg_types, outs) => [args[0]],
		outs_transform: (outs) => outs[0],
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: (arg_types, outs) => null,
        return_type: (args, arg_types, outs) => {
            
            let dim = arg_types[0].dim;
            let ndim = arg_types[0].ndim;
            
            if (args.length == 2) {
                console.log("WARNING: ifftM dimensions adjusted")
            }
            
            return {
                type: 'float',
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true,
                isstruct: false 
            };
        },
        push_main_before: (args, arg_types, outs) => null,
        push_main_after: (args, arg_types, outs) => null,         
        init_before: (args, arg_types, outs) => {
            let dim = arg_types[0].dim;
            let ndim = arg_types[0].ndim;
            
            let init_var: InitVar[] = [];
            init_var.push({
                name: 'ndim',
                val: ndim,
                type: 'int',
                ndim: 1,
                dim: [1],
                ismatrix: false,
                ispointer: false,
                isstruct: false
            })
            init_var.push({
                name: 'dim',
                val: `{${dim}}`,
                type: 'int',
                ndim: ndim,
                dim: [ndim],
                ismatrix: ndim > 1,
                ispointer: false,
                isstruct: false
            })
            return init_var;
        }
    },
];