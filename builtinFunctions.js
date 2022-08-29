"use strict";
exports.__esModule = true;
exports.builtin_functions = void 0;
function parseCharArg(arg) {
    var regex = /(?<=')(.*?)(?=')|(?<=")(.*?)(?=")/;
    var match = arg.match(regex);
    if (match != null) {
        return match[0];
    }
    else {
        return null;
    }
}
exports.builtin_functions = [
    {
        fun_matlab: 'xcorr',
        fun_c: 'xcorrM',
        args_transform: null,
        n_req_args: 4,
        n_opt_args: 3,
        opt_arg_defaults: ['null', '0', 'none'],
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },
    {
        fun_matlab: 'sort',
        fun_c: 'sortM',
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
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['0'],
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },
    {
        fun_matlab: 'ttest',
        fun_c: 'ttestM',
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['0'],
        ptr_args: ['h', 'pval', 'ci', 'tstat', 'df', 'sd'],
        ptr_arg_types: [
            'bool* restrict',
            'double* restrict',
            'double* restrict *',
            'double* restrict',
            'double* restrict',
            'double* restrict'
        ],
        return_type: null
    },
    {
        fun_matlab: 'ztest',
        fun_c: 'ztestM',
        args_transform: null,
        n_req_args: 3,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: ['h', 'pval', 'ci', 'z', 'zcrit'],
        ptr_arg_types: [
            'bool* restrict',
            'double* restrict',
            'double* restrict *',
            'double* restrict',
            'double* restrict'
        ],
        return_type: null
    },
    {
        fun_matlab: 'vartest',
        fun_c: 'vartestM',
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: ['h', 'pval', 'ci', 'chisqstat', 'df'],
        ptr_arg_types: [
            'bool* restrict',
            'double* restrict',
            'double* restrict *',
            'double* restrict',
            'double* restrict'
        ],
        return_type: null
    },
    {
        fun_matlab: 'betapdf',
        fun_c: 'betapdfM',
        args_transform: null,
        n_req_args: 3,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },
    {
        fun_matlab: 'exppdf',
        fun_c: 'exppdfM',
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['1'],
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },
    {
        fun_matlab: 'normpdf',
        fun_c: 'normpdfM',
        args_transform: null,
        n_req_args: 3,
        n_opt_args: 2,
        opt_arg_defaults: ['0', '1'],
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },
    {
        fun_matlab: 'unidpdf',
        fun_c: 'unidpdfM',
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },
    {
        fun_matlab: 'normfit',
        fun_c: 'normfitM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: ['mu', 'sigma'],
        ptr_arg_types: [
            'void* restrict',
            'void* restrict'
        ],
        return_type: null
    },
    {
        fun_matlab: 'unifit',
        fun_c: 'unifitM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: ['a', 'b'],
        ptr_arg_types: [
            'void* restrict',
            'void* restrict'
        ],
        return_type: null
    },
    /*{ // Matrix * reindexM(Matrix* restrict m, int size, ...)
        fun_matlab: 'containers.Map',
        fun_c: 'reindexM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },*/
    {
        fun_matlab: 'eig',
        fun_c: 'eigM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'abs',
        fun_c: 'absM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'round',
        fun_c: 'roundM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'floor',
        fun_c: 'floorM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'ceil',
        fun_c: 'ceilM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'zeros',
        fun_c: 'zerosM',
        args_transform: function (args) {
            var dim = "{" + args.join(", ") + "}";
            var ndim = args.length;
            return [ndim, dim];
        },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },
    {
        fun_matlab: 'ones',
        fun_c: 'onesM',
        args_transform: function (args) {
            var dim = "{" + args.join(", ") + "}";
            var ndim = args.length;
            return [ndim, dim];
        },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        }
    },
    {
        fun_matlab: 'strcmp',
        fun_c: 'strcmp',
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: 'int',
            ndim: 2,
            dim: [1, 1],
            ismatrix: false,
            ispointer: false
        }
    },
    {
        fun_matlab: 'strcmpi',
        fun_c: 'strcmpi',
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: 'int',
            ndim: 2,
            dim: [1, 1],
            ismatrix: false,
            ispointer: false
        }
    },
    {
        fun_matlab: 'struct',
        fun_c: null,
        args_transform: null,
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'numel',
        fun_c: 'getsizeM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: 'int',
            ndim: 2,
            dim: [1, 1],
            ismatrix: false,
            ispointer: false
        }
    },
    {
        fun_matlab: 'size',
        fun_c: 'getDimsM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: 'int',
            ndim: null,
            dim: null,
            ismatrix: false,
            ispointer: true
        }
    },
    {
        fun_matlab: 'length',
        fun_c: null,
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'sum',
        fun_c: null,
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'prod',
        fun_c: null,
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'error',
        fun_c: null,
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'permute',
        fun_c: null,
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'rand',
        fun_c: 'randM',
        args_transform: function (args) {
            var dim = "{" + args.join(", ") + "}";
            var ndim = args.length;
            return [ndim, dim];
        },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true
        }
    },
    {
        fun_matlab: 'randn',
        fun_c: 'randnM',
        args_transform: function (args) {
            var dim = "{" + args.join(", ") + "}";
            var ndim = args.length;
            return [ndim, dim];
        },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true
        }
    },
    {
        fun_matlab: 'memmapfile',
        fun_c: null,
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'mean',
        fun_c: 'meanM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true
        }
    },
    {
        fun_matlab: 'std',
        fun_c: null,
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true
        }
    },
    {
        fun_matlab: 'isa',
        fun_c: null,
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
];
//# sourceMappingURL=builtinFunctions.js.map