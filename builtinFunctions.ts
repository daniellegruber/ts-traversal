type functionMapping = {
      fun_matlab: string;
      fun_c: string;
      args_transform: boolean; // true if the c function takes different arguments than the matlab function
      n_req_args: number; // # required args
      n_opt_args: number; // # optional args
      opt_arg_defaults: Array<string>;
    };

/*export const builtin_functions = [
    'zeros', 
    'ones',
    'strcmp',
    'strcmpi',
    'struct',
    'size',
    'length',
    'sum',
    'std',
    'prod',
    'error',
    'permute',
    'rand',
    'randn',
    'memmapfile',
    'mean'
];*/

export const builtin_functions = [
    {
        fun_matlab: 'xcorr', 
        fun_c: 'xcorrM', 
        args_transform: false,
        n_req_args: 4,
        n_opt_args: 3,
        opt_arg_defaults: ['null', '0', 'none']
        
    },
    /*{fun_matlab: 'sort', fun_c: 'sortM'},
    {fun_matlab: 'ttest', fun_c: 'ttestM'},
    {fun_matlab: 'ztest', fun_c: 'ztestM'},
    {fun_matlab: 'vartest', fun_c: 'vartestM'},
    {fun_matlab: 'betapdf', fun_c: 'betapdfM'},
    {fun_matlab: 'exppdf', fun_c: 'exppdfM'},
    {fun_matlab: 'normpdf', fun_c: 'normpdfM'},
    {fun_matlab: 'unidpdf', fun_c: 'unidpdfM'},
    {fun_matlab: 'normfit', fun_c: 'normfitM'},
    {fun_matlab: 'unifit', fun_c: 'unifitM'},
    {fun_matlab: 'containers.Map', fun_c: 'reindexM'},
    {fun_matlab: 'eig', fun_c: 'eigM'},
    {fun_matlab: 'abs', fun_c: 'absM'},
    {fun_matlab: 'round', fun_c: 'roundM'},
    {fun_matlab: 'floor', fun_c: 'floorM'},
    {fun_matlab: 'ceil', fun_c: 'ceilM'},*/
    {
        fun_matlab: 'zeros', 
        fun_c: 'zerosM', 
        args_transform: true,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'ones', 
        fun_c: 'onesM', 
        args_transform: true,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'strcmp', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'strcmpi', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'struct', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'size', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'length', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'sum', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'std', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'prod', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'error', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'permute', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'rand', 
        fun_c: 'randM', 
        args_transform: true,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'randn', 
        fun_c: 'randnM', 
        args_transform: true,
        n_req_args: 2,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'memmapfile', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'mean', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'isa', 
        fun_c: null, 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
];
    