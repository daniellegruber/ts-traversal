"use strict";
exports.__esModule = true;
exports.builtin_functions = exports.operatorMapping = void 0;
var type_to_matrix_type = [
    { type: "integer", matrix_type: 0 },
    { type: "int", matrix_type: 0 },
    { type: "float", matrix_type: 1 },
    { type: "complex", matrix_type: 2 },
    { type: "char", matrix_type: 3 }
];
function parseCharArg(arg) {
    var regex = /(?<=')(.*?)(?=')|(?<=")(.*?)(?=")/;
    var match = arg.match(regex);
    if (match != null) {
        return match[0];
    }
    else {
        return arg;
    }
}
function parseVectorArg(arg) {
    var regex = /(?<=\[)(.*?)(?=\])/;
    var match1 = arg.match(regex);
    if (match1 != null) {
        var vec_str = match1[0];
        var regex2 = /".*?"|[^,; ]*/g;
        var match2 = vec_str.match(regex2);
        var vec_elements = [];
        if (match2 != null) {
            for (var _i = 0, match2_1 = match2; _i < match2_1.length; _i++) {
                var element = match2_1[_i];
                if (element != "") {
                    vec_elements.push(parseCharArg(element));
                }
            }
        }
        return ["{".concat(vec_str, "}"), vec_elements];
    }
    else {
        return [arg, null];
    }
}
var binaryOpType = function (left_type, right_type) {
    if (left_type == right_type) {
        return left_type;
    }
    else if (left_type == 'complex' || right_type == 'complex') {
        return 'complex';
    }
    else if (left_type == 'float' || right_type == 'float') {
        return 'float';
    }
    else if (left_type == 'bool') {
        return right_type;
    }
    else if (right_type == 'bool') {
        return left_type;
    }
    else {
        return 'unknown';
    }
};
exports.operatorMapping = [
    {
        fun_matlab: '+',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'plusM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '-',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'minusM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        // Matrix * mtimesM(Matrix *m, Matrix *n)
        fun_matlab: '*',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'mtimesM';
            }
            else if ((left_ismatrix && !right_ismatrix) || (!left_ismatrix && right_ismatrix)) {
                return 'scaleM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return args;
            }
            else {
                var left_type = arg_types[0].type;
                var right_type = arg_types[1].type;
                var type_1 = binaryOpType(left_type, right_type);
                var obj = type_to_matrix_type.find(function (x) { return x.type === type_1; });
                return [args[0], args[1], obj.matrix_type.toString()];
            }
        },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var left_ismatrix = arg_types[0].ismatrix;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return {
                    type: binaryOpType(left_type, right_type),
                    ndim: left_ndim,
                    dim: left_dim,
                    ismatrix: true,
                    ispointer: true
                };
            }
            else {
                return {
                    type: binaryOpType(left_type, right_type),
                    ndim: left_ndim,
                    dim: [left_dim[0], right_dim[1]],
                    ismatrix: true,
                    ispointer: true
                };
            }
        }
    },
    {
        fun_matlab: '/',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'mrdivideM';
            }
            else if (left_ismatrix && !right_ismatrix) {
                return 'scaleM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return args;
            }
            else {
                var left_type = arg_types[0].type;
                var right_type = arg_types[1].type;
                var type_2 = binaryOpType(left_type, right_type);
                var obj = type_to_matrix_type.find(function (x) { return x.type === type_2; });
                return [args[0], "1/(".concat(args[1], ")"), obj.matrix_type.toString()];
            }
        },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: [left_dim[0], right_dim[1]],
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '\\',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'mldivideM';
            }
            else if (!left_ismatrix && right_ismatrix) {
                return 'scaleM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return args;
            }
            else {
                var left_type = arg_types[0].type;
                var right_type = arg_types[1].type;
                var type_3 = binaryOpType(left_type, right_type);
                var obj = type_to_matrix_type.find(function (x) { return x.type === type_3; });
                return ["1/(".concat(args[0], ")"), args[1], obj.matrix_type.toString()];
            }
        },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: [left_dim[0], right_dim[1]],
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '^',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && !right_ismatrix) {
                return 'mpowerM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '.*',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'timesM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: './',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'rdivideM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '.\\',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'ldivideM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '.^',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'powerM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '<',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'ltM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: 'bool',
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '<=',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'leM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: 'bool',
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '>',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'gtM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: 'bool',
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '>=',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'geM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: 'bool',
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '==',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'equalM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: 'bool',
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '~=',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'neM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: 'bool',
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '&',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'andM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: 'bool',
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '|',
        fun_c: function (arg_types, outs) {
            var left_ismatrix = arg_types[0].ismatrix;
            var right_ismatrix = arg_types[1].ismatrix;
            if (left_ismatrix && right_ismatrix) {
                return 'orM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: 'bool',
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '&&',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '||',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '+',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '-',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: '~',
        fun_c: function (arg_types, outs) {
            var ismatrix = arg_types[0].ismatrix;
            if (ismatrix) {
                return 'notM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: "'",
        fun_c: function (arg_types, outs) {
            var ismatrix = arg_types[0].ismatrix;
            if (ismatrix) {
                return 'ctransposeM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: [dim[1], dim[0]],
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: ".'",
        fun_c: function (arg_types, outs) {
            var ismatrix = arg_types[0].ismatrix;
            if (ismatrix) {
                return 'transposeM';
            }
            else {
                return null;
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: [dim[1], dim[0]],
                ismatrix: true,
                ispointer: true
            };
        }
    }
];
exports.builtin_functions = [
    {
        fun_matlab: 'isequal',
        fun_c: function (arg_types, outs) { return 'isEqualM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            return {
                type: 'bool',
                ndim: 2,
                dim: [1, 1],
                ismatrix: false,
                ispointer: false
            };
        }
    },
    {
        fun_matlab: 'xcorr',
        fun_c: function (arg_types, outs) { return 'xcorrM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 4,
        n_opt_args: 3,
        opt_arg_defaults: ['null', '0', 'none'],
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
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
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'sort',
        fun_c: function (arg_types, outs) { return 'sortM'; },
        args_transform: function (args) {
            var args_transformed = [];
            for (var i = 0; i < args.length; i++) {
                if (i == 0) {
                    args_transformed.push(args[i]);
                }
                else {
                    if (parseCharArg(args[i]) == 'ascend') {
                        args_transformed.push('0');
                    }
                    else if (parseCharArg(args[i]) == 'descend') {
                        args_transformed.push('1');
                    }
                }
            }
            return args_transformed;
        },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['0'],
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        // [h,p,ci,stats] = ttest(___)  
        fun_matlab: 'ttest',
        fun_c: function (arg_types, outs) {
            if (arg_types.length >= 2) {
                if (arg_types[1].ismatrix) {
                    return 'ttestM_xy';
                }
            }
            return 'ttestM';
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return null; },
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['0'],
        ptr_args: function (arg_types, outs) {
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
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: arg_pval,
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: arg_ci,
                    type: 'double',
                    ndim: 2,
                    dim: [1, 2],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: 'tstat',
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: 'df',
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: 'sd',
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
            ];
        },
        return_type: function (args, arg_types, outs) { return null; }
    },
    {
        fun_matlab: 'ztest',
        fun_c: function (arg_types, outs) { return 'ztestM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return null; },
        n_req_args: 3,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) {
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
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: arg_pval,
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: arg_ci,
                    type: 'double',
                    ndim: 2,
                    dim: [1, 2],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: arg_z,
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: 'zcrit',
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                }
            ];
        },
        return_type: function (args, arg_types, outs) { return null; }
    },
    {
        fun_matlab: 'vartest',
        fun_c: function (arg_types, outs) { return 'vartestM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) {
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
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: arg_pval,
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: arg_ci,
                    type: 'double',
                    ndim: 2,
                    dim: [1, 2],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: 'chisqstat',
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: 'df',
                    type: 'double',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                }
            ];
        },
        return_type: function (args, arg_types, outs) { return null; }
    },
    {
        fun_matlab: 'betapdf',
        fun_c: function (arg_types, outs) { return 'betapdfM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 3,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'exppdf',
        fun_c: function (arg_types, outs) { return 'exppdfM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['1'],
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'chi2pdf',
        fun_c: function (arg_types, outs) { return 'chi2pdfM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'gampdf',
        fun_c: function (arg_types, outs) { return 'gampdfM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 3,
        n_opt_args: 1,
        opt_arg_defaults: ['1'],
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'lognpdf',
        fun_c: function (arg_types, outs) { return 'lognpdfM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 3,
        n_opt_args: 2,
        opt_arg_defaults: ['0', '1'],
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'normpdf',
        fun_c: function (arg_types, outs) { return 'normpdfM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 3,
        n_opt_args: 2,
        opt_arg_defaults: ['0', '1'],
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'unidpdf',
        fun_c: function (arg_types, outs) { return 'unidpdfM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'normfit',
        fun_c: function (arg_types, outs) { return 'normfitM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) {
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
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: arg_sigma,
                    type: 'void',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                }
            ];
        },
        return_type: function (arg_types) { return null; }
    },
    {
        fun_matlab: 'unifit',
        fun_c: function (arg_types, outs) { return 'unifitM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) {
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
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                },
                {
                    name: arg_b,
                    type: 'void',
                    ndim: 2,
                    dim: [1, 1],
                    ismatrix: false,
                    ispointer: true
                }
            ];
        },
        return_type: function (arg_types) { return null; }
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
    {
        fun_matlab: 'eig',
        fun_c: function (arg_types, outs) { return 'eigM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) {
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
                    ispointer: true
                },
                {
                    name: arg_evecs,
                    type: 'complex',
                    ndim: arg_types[0].ndim,
                    dim: arg_types[0].dim,
                    ismatrix: true,
                    ispointer: true
                }
            ];
        },
        return_type: function (arg_types) { return null; }
    },
    {
        fun_matlab: 'abs',
        fun_c: function (arg_types, outs) { return 'absM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'round',
        fun_c: function (arg_types, outs) { return 'roundM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'floor',
        fun_c: function (arg_types, outs) { return 'floorM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'ceil',
        fun_c: function (arg_types, outs) { return 'ceilM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'max',
        fun_c: function (arg_types, outs) {
            if (outs.length == 1) {
                return 'max';
            }
            else {
                return 'maxV';
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) {
            return outs[0];
        },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) {
            if (outs.length == 1) {
                return null;
            }
            else {
                return [
                    {
                        name: outs[1],
                        type: 'int',
                        ndim: 2,
                        dim: [1, 1],
                        ismatrix: false,
                        ispointer: true
                    }
                ];
            }
        },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            return {
                type: type,
                ndim: 2,
                dim: [1, 1],
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'min',
        fun_c: function (arg_types, outs) {
            if (outs.length == 1) {
                return 'min';
            }
            else {
                return 'minV';
            }
        },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) {
            return outs[0];
        },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) {
            if (outs.length == 1) {
                return null;
            }
            else {
                return [
                    {
                        name: outs[1],
                        type: 'int',
                        ndim: 2,
                        dim: [1, 1],
                        ismatrix: false,
                        ispointer: true
                    }
                ];
            }
        },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            return {
                type: type,
                ndim: 2,
                dim: [1, 1],
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'var',
        fun_c: function (arg_types, outs) { return 'varM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var type = arg_types[0].type;
            var ndim = arg_types[0].ndim;
            var dim = arg_types[0].dim;
            return {
                type: type,
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'quantile',
        fun_c: function (arg_types, outs) { return 'quantileM_vec'; },
        args_transform: function (args, arg_types, outs) {
            var quantile_specifier = Number(args[1]);
            if (Number.isInteger(quantile_specifier)) {
                var n_quantiles = quantile_specifier;
                var arr = [];
                var step = 1 / (quantile_specifier + 1);
                for (var i = 0; i < 1; i += step) {
                    arr.push(i);
                }
                var quantiles = "{".concat(arr.toString(), "}");
            }
            else {
                var _a = parseVectorArg(args[1]), vec_str = _a[0], vec_elements = _a[1];
                var n_quantiles = vec_elements.length;
                var quantiles = vec_str.toString();
            }
            return [args[0], n_quantiles, quantiles];
        },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var arg0_type = arg_types[0].type;
            var arg0_ndim = arg_types[0].ndim;
            var arg0_dim = arg_types[0].dim;
            var quantile_specifier = Number(args[1]);
            if (Number.isInteger(quantile_specifier)) {
                var n_quantiles = quantile_specifier;
            }
            else {
                var _a = parseVectorArg(args[1]), vec_elements = _a[1];
                var n_quantiles = vec_elements.length;
            }
            // If m is a row or column vector, returns a 1xN matrix with the specified  quantiles
            // If m is a matrix of size rxc, returns a Nxc matrix with the specified quantiles of each column
            return {
                type: arg0_type,
                ndim: 2,
                dim: [n_quantiles, arg0_dim[1]],
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'zeros',
        fun_c: function (arg_types, outs) { return 'zerosM'; },
        args_transform: function (args, arg_types, outs) {
            var dim = "{".concat(args.join(", "), "}");
            var ndim = args.length;
            if (args.length == 1) {
                dim = "{".concat(args[0], ",").concat(args[0], "}");
                ndim = 2;
            }
            return [ndim, dim];
        },
        outs_transform: function (outs) { return outs; },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var dim = [];
            var ndim = args.length;
            if (args.length == 1) {
                dim = [Number(args[0]), Number(args[0])];
                ndim = 2;
            }
            else {
                for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                    var arg = args_1[_i];
                    dim.push(Number(arg));
                }
            }
            return {
                type: 'int',
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'ones',
        fun_c: function (arg_types, outs) { return 'onesM'; },
        args_transform: function (args, arg_types, outs) {
            var dim = "{".concat(args.join(", "), "}");
            var ndim = args.length;
            if (args.length == 1) {
                dim = "{".concat(args[0], ",").concat(args[0], "}");
                ndim = 2;
            }
            return [ndim, dim];
        },
        outs_transform: function (outs) { return outs; },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var dim = [];
            var ndim = args.length;
            if (args.length == 1) {
                dim = [Number(args[0]), Number(args[0])];
                ndim = 2;
            }
            else {
                for (var _i = 0, args_2 = args; _i < args_2.length; _i++) {
                    var arg = args_2[_i];
                    dim.push(Number(arg));
                }
            }
            return {
                type: 'int',
                ndim: ndim,
                dim: dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'strcmp',
        fun_c: function (arg_types, outs) { return 'strcmp'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            return {
                type: 'int',
                ndim: 2,
                dim: [1, 1],
                ismatrix: false,
                ispointer: false
            };
        }
    },
    {
        fun_matlab: 'strcmpi',
        fun_c: function (arg_types, outs) { return 'strcmpi'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            return {
                type: 'int',
                ndim: 2,
                dim: [1, 1],
                ismatrix: false,
                ispointer: false
            };
        }
    },
    {
        fun_matlab: 'struct',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) { return null; }
    },
    {
        fun_matlab: 'numel',
        fun_c: function (arg_types, outs) { return 'getsizeM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            return {
                type: 'int',
                ndim: 2,
                dim: [1, 1],
                ismatrix: false,
                ispointer: false
            };
        }
    },
    {
        fun_matlab: 'size',
        fun_c: function (arg_types, outs) { return 'getDimsM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var _a = arg_types[0], ndim = _a[1], dim = _a[2];
            return {
                type: 'int',
                ndim: ndim,
                dim: dim,
                ismatrix: false,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'length',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) { return null; }
    },
    {
        fun_matlab: 'sum',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) { return null; }
    },
    {
        fun_matlab: 'prod',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) { return null; }
    },
    {
        fun_matlab: 'error',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) { return null; }
    },
    {
        fun_matlab: 'permute',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) { return null; }
    },
    {
        fun_matlab: 'rand',
        fun_c: function (arg_types, outs) { return 'randM'; },
        args_transform: function (args) {
            var dim = "{" + args.join(", ") + "}";
            var ndim = args.length;
            return [ndim, dim];
        },
        outs_transform: function (outs) { return outs; },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'randn',
        fun_c: function (arg_types, outs) { return 'randnM'; },
        args_transform: function (args, arg_types, outs) {
            var dim = "{" + args.join(", ") + "}";
            var ndim = args.length;
            return [ndim, dim];
        },
        outs_transform: function (outs) { return outs; },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'memmapfile',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (arg_types) { return null; }
    },
    {
        fun_matlab: 'mean',
        fun_c: function (arg_types, outs) { return 'meanM'; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'std',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) {
            var left_type = arg_types[0].type;
            var left_ndim = arg_types[0].ndim;
            var left_dim = arg_types[0].dim;
            var right_type = arg_types[1].type;
            var right_ndim = arg_types[1].ndim;
            var right_dim = arg_types[1].dim;
            return {
                type: binaryOpType(left_type, right_type),
                ndim: left_ndim,
                dim: left_dim,
                ismatrix: true,
                ispointer: true
            };
        }
    },
    {
        fun_matlab: 'isa',
        fun_c: function (arg_types, outs) { return null; },
        args_transform: function (args, arg_types, outs) { return args; },
        outs_transform: function (outs) { return outs; },
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: function (arg_types, outs) { return null; },
        return_type: function (args, arg_types, outs) { return null; }
    },
];
//# sourceMappingURL=builtinFunctions.js.map