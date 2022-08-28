type functionMapping = {
      fun_matlab: string;
      fun_c: string;
      args_transform: { (data: Array<string>): Array<string>; }; // boolean; // true if the c function takes different arguments than the matlab function
      n_req_args: number; // # required args
      n_opt_args: number; // # optional args
      opt_arg_defaults: Array<string>;
      ptr_args: Array<string>;
      ptr_arg_types: Array<string>;
      return_type: string;
    };

function parseCharArg(arg) {
    let regex = /(?<=')(.*?)(?=')|(?<=")(.*?)(?=")/;
    let match = arg.match(regex);
    if (match != null) {
        return match[0];
    } else {
        return null;
    }
}

export const builtin_functions = [
    { // Matrix * xcorrM(Matrix *x, Matrix *y, int maxlag, char *scale)
        fun_matlab: 'xcorr', 
        fun_c: 'xcorrM', 
        args_transform: null,
        n_req_args: 4,
        n_opt_args: 3,
        opt_arg_defaults: ['null', '0', 'none'],
        ptr_args: null,
        ptr_arg_types: null,
        return_type: 'Matrix *'
    },
    { // Matrix * sortM(Matrix* restrict m, int direction)
        fun_matlab: 'sort', // sort(m, dim, direction)
        fun_c: 'sortM', // sortM(m, direction) -> update c function to accept dim
        args_transform: args => {
            let args_transformed = [];
            for (let i=0; i < args.length; i++) {
                if (i == 0) {
                    args_transformed.push(args[i])
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
        return_type: 'Matrix *'
    },
    { // void ttestM(Matrix* restrict m, double mu, bool* restrict h, double* restrict pval, double* restrict *ci, double* restrict tstat, double* restrict df, double* restrict sd)
        fun_matlab: 'ttest', 
        fun_c: 'ttestM', 
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
        return_type: null 
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
        return_type: null 
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
        return_type: null 
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
        return_type: 'Matrix *'
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
        return_type: 'Matrix *'
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
        return_type: 'Matrix *'
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
        return_type: 'Matrix *'
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
        return_type: null
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
        return_type: null
    },
    { // Matrix * reindexM(Matrix* restrict m, int size, ...)
        fun_matlab: 'containers.Map', 
        fun_c: 'reindexM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
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
        return_type: 'Matrix *'
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
        return_type: 'Matrix *'
    },
    {
        fun_matlab: 'strcmp', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'strcmpi', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: null
    },
    {
        fun_matlab: 'struct', 
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
        fun_matlab: 'size', 
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
        return_type: 'Matrix *'
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
        return_type: 'Matrix *'
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
    { // Matrix * meanM(Matrix* restrict m)
        fun_matlab: 'mean', 
        fun_c: 'meanM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null,
        ptr_args: null,
        ptr_arg_types: null,
        return_type: 'Matrix *'
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
        return_type: 'Matrix *'
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
    