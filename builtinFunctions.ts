import {Type} from "./typeInference";
import {SyntaxNode} from "./generated";


type functionMapping = {
      fun_matlab: string;
      fun_c: string;
      arg_types: Array<string>;
      args_transform: { (data: Array<string>): Array<string>; }; // boolean; // true if the c function takes different arguments than the matlab function
      n_req_args: number; // # required args
      n_opt_args: number; // # optional args
      opt_arg_defaults: Array<string>;
      ptr_args: Array<string>;
      ptr_arg_types: Array<string>;
      return_type: Type;
      n_out: number;
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
    
    
export const binaryMapping: functionMapping[] = [
    { // Matrix * plusM(Matrix *m, Matrix *n)
        fun_matlab: '+', 
        fun_c: 'plusM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * minusM(Matrix *m, Matrix *n)
        fun_matlab: '-', 
        fun_c: 'minusM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * scaleM(Matrix* restrict m, void* restrict scalar, int type)
        fun_matlab: '*', 
        fun_c: 'scaleM', 
        arg_types: ['matrix','scalar'],
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
    { // Matrix * mtimesM(Matrix *m, Matrix *n)
        fun_matlab: '*', 
        fun_c: 'mtimesM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * mrdivideM(Matrix *m, Matrix *n)
        fun_matlab: '/', 
        fun_c: 'mrdivideM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * mldivideM(Matrix *m, Matrix *n)
        fun_matlab: '\\', 
        fun_c: 'mldivideM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * mpowerM(Matrix *m, void *scalar, int type)
        fun_matlab: '^', 
        fun_c: 'mpowerM', 
        arg_types: ['matrix','scalar'],
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
    { // Matrix * timesM(Matrix *m, Matrix *n)
        fun_matlab: '.*', 
        fun_c: 'timesM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * rdivideM(Matrix *m, Matrix *n)
        fun_matlab: './', 
        fun_c: 'rdivideM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * ldivideM(Matrix *m, Matrix *n)
        fun_matlab: '.\\', 
        fun_c: 'ldivideM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * powerM(Matrix *m, Matrix *n)
        fun_matlab: '.^', 
        fun_c: 'powerM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * ltM(Matrix *m, Matrix *n)
        fun_matlab: '<', 
        fun_c: 'ltM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * leM(Matrix *m, Matrix *n)
        fun_matlab: '<=', 
        fun_c: 'leM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * gtM(Matrix *m, Matrix *n)
        fun_matlab: '>', 
        fun_c: 'gtM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * geM(Matrix *m, Matrix *n)
        fun_matlab: '>=', 
        fun_c: 'geM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * equalM(Matrix *m, Matrix *n)
        fun_matlab: '==', 
        fun_c: 'equalM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * neM(Matrix *m, Matrix *n)
        fun_matlab: '~=', 
        fun_c: 'neM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * andM(Matrix *m, Matrix *n)
        fun_matlab: '&', 
        fun_c: 'andM', 
        arg_types: ['matrix','matrix'],
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
    { // Matrix * orM(Matrix *m, Matrix *n)
        fun_matlab: '|', 
        fun_c: 'orM', 
        arg_types: ['matrix','matrix'],
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
        arg_types: ['matrix','matrix'],
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
        arg_types: ['matrix','matrix'],
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


export const unaryMapping: functionMapping[] = [
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
    { // Matrix * notM(Matrix* restrict m)
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

export const transposeMapping: functionMapping[] = [
    { // Matrix * ctransposeM(Matrix* restrict m)
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
    { // Matrix * transposeM(Matrix* restrict m)
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


export const builtin_functions = [
    { // bool isEqualM(Matrix *m, Matrix *n)
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
            dim: [1,1],
            ismatrix: false,
            ispointer: false
        },
        n_out: 1
    },
    { // Matrix * xcorrM(Matrix *x, Matrix *y, int maxlag, char *scale)
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
    { // Matrix * sortM(Matrix* restrict m, int direction)
        fun_matlab: 'sort', // sort(m, dim, direction)
        fun_c: 'sortM', // sortM(m, direction) -> update c function to accept dim
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
    { // void ttestM(Matrix* restrict m, double mu, bool* restrict h, double* restrict pval, double* restrict *ci, double* restrict tstat, double* restrict df, double* restrict sd)
        fun_matlab: 'ttest', 
        fun_c: 'ttestM', 
        arg_types: ['matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['0'],
        ptr_args: ['h','pval', 'ci', 'tstat', 'df', 'sd'],
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
    { // void ttestM_xy(Matrix *x, Matrix *y, bool* restrict h, double* restrict pval, double* restrict *ci, double* restrict tstat, double* restrict df, double* restrict sd)
        fun_matlab: 'ttest', 
        fun_c: 'ttestM_xy', 
        arg_types: ['matrix','matrix'],
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 1,
        opt_arg_defaults: ['0'],
        ptr_args: ['h','pval', 'ci', 'tstat', 'df', 'sd'],
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
    { // void ztestM(Matrix* restrict m, double mu, double s, bool* restrict h, double* restrict pval, double* restrict *ci, double* restrict z, double* restrict zcrit)
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
    { // void vartestM(Matrix* restrict m, double v, bool* restrict h, double* restrict pval, double* restrict *ci, double* restrict chisqstat, double* restrict df)
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
    { // Matrix * betapdfM(Matrix* restrict m, double a, double b)
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
    { // Matrix * exppdfM(Matrix* restrict m, double lambda)
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
    { // Matrix * chi2pdfM(Matrix* restrict m, double n)
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
    { // Matrix * gampdfM(Matrix* restrict m, double a, double b)
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
    { // Matrix * lognpdfM(Matrix* restrict m, double mu, double sigma)
        fun_matlab: 'lognpdf', 
        fun_c: 'lognpdfM', 
        args_transform: null,
        n_req_args: 3,
        n_opt_args: 2,
        opt_arg_defaults: ['0','1'],
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    { // Matrix * normpdfM(Matrix* restrict m, double mu, double sigma)
        fun_matlab: 'normpdf', 
        fun_c: 'normpdfM', 
        args_transform: null,
        n_req_args: 3,
        n_opt_args: 2,
        opt_arg_defaults: ['0','1'],
        ptr_args: null,
        ptr_arg_types: null,
        return_type: {
            ismatrix: true,
            ispointer: true
        },
        n_out: 1
    },
    { // Matrix * unidpdfM(Matrix* restrict m, int n)
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
    { // void normfitM(Matrix* restrict m, void* restrict mu, void* restrict sigma)
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
    { // void unifitM(Matrix* restrict m, void* restrict a, void* restrict b)
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
    { // void eigM(Matrix* restrict m, Matrix* restrict *evals, Matrix* restrict *evecs)
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
    { // Matrix * absM(Matrix* restrict m)
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
    { // Matrix * roundM(Matrix* restrict m)
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
    { // Matrix * floorM(Matrix* restrict m)
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
    { // Matrix * ceilM(Matrix* restrict m)
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
    { // Matrix * maxM(Matrix* restrict m)
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
    { // Matrix * minM(Matrix* restrict m)
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
    { // Matrix * maxV(Matrix* restrict m, int* restrict index)
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
    { // Matrix * minV(Matrix* restrict m, int* restrict index)
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
    { // Matrix * varM(Matrix* restrict m)
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
    { // Matrix * quantileM_vec(Matrix* restrict m, int N, double* restrict quantiles)
        fun_matlab: 'quantile', 
        fun_c: 'quantileM_vec', 
        args_transform: args => {
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
    { // Matrix * zerosM(int ndim, int dim[ndim])
        fun_matlab: 'zeros', 
        fun_c: 'zerosM', 
        args_transform: args => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
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
    { // Matrix * onesM(int ndim, int dim[ndim])
        fun_matlab: 'ones', 
        fun_c: 'onesM', 
        args_transform: args => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
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
    { // int strcmp(const char* str1, const char* str2)
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
            dim: [1,1],
            ismatrix: false,
            ispointer: false
        },
        n_out: 1
    },
    { // int strcmpi(const char * str1, const char * str2 )
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
            dim: [1,1],
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
    { //int getsizeM(Matrix* restrict m)
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
            dim: [1,1],
            ismatrix: false,
            ispointer: false
        },
        n_out: 1
    },
    { // int * getDimsM(Matrix* restrict m)
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
    { // Matrix * randM(int ndim, int dim[ndim])
        fun_matlab: 'rand', 
        fun_c: 'randM', 
        args_transform: args => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
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
    { // Matrix * randnM(int ndim, int dim[ndim])
        fun_matlab: 'randn', 
        fun_c: 'randnM', 
        args_transform: args => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
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
    { // Matrix * meanM(Matrix* restrict m)
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
    { // Matrix * stdM(Matrix* restrict m)
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
    