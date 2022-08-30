"use strict";
exports.__esModule = true;
exports.builtin_functions = exports.transposeMapping = exports.unaryMapping = exports.binaryMapping = void 0;
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
exports.binaryMapping = [
    {
        fun_matlab: '+',
        fun_c: 'plusM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '-',
        fun_c: 'minusM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '*',
        fun_c: 'scaleM',
        arg_types: ['matrix', 'scalar'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '*',
        fun_c: 'mtimesM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '/',
        fun_c: 'mrdivideM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '\\',
        fun_c: 'mldivideM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '^',
        fun_c: 'mpowerM',
        arg_types: ['matrix', 'scalar'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '.*',
        fun_c: 'timesM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: './',
        fun_c: 'rdivideM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '.\\',
        fun_c: 'ldivideM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '.^',
        fun_c: 'powerM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '<',
        fun_c: 'ltM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '<=',
        fun_c: 'leM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '>',
        fun_c: 'gtM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '>=',
        fun_c: 'geM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '==',
        fun_c: 'equalM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '~=',
        fun_c: 'neM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '&',
        fun_c: 'andM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '|',
        fun_c: 'orM',
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '&&',
        fun_c: null,
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '||',
        fun_c: null,
        arg_types: ['matrix', 'matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
];
exports.unaryMapping = [
    {
        fun_matlab: '+',
        fun_c: null,
        arg_types: ['matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '-',
        fun_c: null,
        arg_types: ['matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: '~',
        fun_c: 'notM',
        arg_types: ['matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    }
];
exports.transposeMapping = [
    {
        fun_matlab: "'",
        fun_c: 'ctransposeM',
        arg_types: ['matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: ".'",
        fun_c: 'transposeM',
        arg_types: ['matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: null,
            ndim: null,
            dim: null,
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    }
];
exports.builtin_functions = [
    {
        fun_matlab: 'isequal',
        fun_c: 'isEqualM',
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            type: 'bool',
            ndim: 2,
            dim: [1, 1],
            ismatrix: false,
            ispointer: false
        },
        n_out: 1
    },
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
        },
        n_out: 1
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
        },
        n_out: 1
    },
    {
        fun_matlab: 'ttest',
        fun_c: 'ttestM',
        arg_types: ['matrix'],
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
        return_type: null,
        n_out: 6
    },
    {
        fun_matlab: 'ttest',
        fun_c: 'ttestM_xy',
        arg_types: ['matrix', 'matrix'],
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
        return_type: null,
        n_out: 6
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
        return_type: null,
        n_out: 5
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
        return_type: null,
        n_out: 5
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
        },
        n_out: 1
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
        },
        n_out: 1
    },
    {
        fun_matlab: 'chi2pdf',
        fun_c: 'chi2pdfM',
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: 'gampdf',
        fun_c: 'gampdfM',
        args_transform: null,
        n_req_args: 3,
        n_opt_args: 1,
        opt_arg_defaults: ['1'],
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: 'lognpdf',
        fun_c: 'lognpdfM',
        args_transform: null,
        n_req_args: 3,
        n_opt_args: 2,
        opt_arg_defaults: ['0', '1'],
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
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
        },
        n_out: 1
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
        },
        n_out: 1
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
        return_type: null,
        n_out: 2
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
        return_type: null,
        n_out: 2
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
        ptr_args: ['evals', 'evecs'],
        ptr_arg_types: [
            'Matrix* restrict',
            'Matrix* restrict'
        ],
        return_type: null,
        n_out: 2
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
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
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
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
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
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
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
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: 'max',
        fun_c: 'maxM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: 'min',
        fun_c: 'minM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: 'max',
        fun_c: 'maxV',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: ['index'],
        ptr_arg_types: ['int* restrict'],
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 2
    },
    {
        fun_matlab: 'min',
        fun_c: 'minV',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: ['index'],
        ptr_arg_types: ['int* restrict'],
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 2
    },
    {
        fun_matlab: 'var',
        fun_c: 'varM',
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    {
        fun_matlab: 'quantile',
        fun_c: 'quantileM_vec',
        args_transform: function (args) {
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
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
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
        },
        n_out: 1
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
        },
        n_out: 1
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
        },
        n_out: 1
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
        },
        n_out: 1
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
        return_type: null,
        n_out: null
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
        },
        n_out: 1
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
        },
        n_out: 1
    },
    {
        fun_matlab: 'length',
        fun_c: null,
        args_transform: null,
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null,
        n_out: null
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
        return_type: null,
        n_out: null
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
        return_type: null,
        n_out: null
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
        return_type: null,
        n_out: null
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
        return_type: null,
        n_out: null
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
        },
        n_out: 1
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
        },
        n_out: 1
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
        return_type: null,
        n_out: null
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
        },
        n_out: 1
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
        },
        n_out: 1
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
        return_type: null,
        n_out: null
    },
];
//# sourceMappingURL=builtinFunctions.js.map