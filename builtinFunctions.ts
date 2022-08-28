type functionMapping = {
      fun_matlab: string;
      fun_c: string;
      args_transform: { (data: Array<string>): Array<string>; }; // boolean; // true if the c function takes different arguments than the matlab function
      n_req_args: number; // # required args
      n_opt_args: number; // # optional args
      opt_arg_defaults: Array<string>;
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
    {
        fun_matlab: 'xcorr', 
        fun_c: 'xcorrM', 
        args_transform: null, //false,
        n_req_args: 4,
        n_opt_args: 3,
        opt_arg_defaults: ['null', '0', 'none']
        
    },
    {
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
        opt_arg_defaults: ['0']
        
    },
    {
        fun_matlab: 'ttest', 
        fun_c: 'ttestM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'ztest', 
        fun_c: 'ztestM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'vartest', 
        fun_c: 'vartestM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'betapdf', 
        fun_c: 'betapdfM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'exppdf', 
        fun_c: 'exppdfM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'normpdf', 
        fun_c: 'normpdfM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'unidpdf', 
        fun_c: 'unidpdfM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'normfit', 
        fun_c: 'normfitM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'unifit', 
        fun_c: 'unifitM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'containers.Map', 
        fun_c: 'reindexM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'eig', 
        fun_c: 'eigM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'abs', 
        fun_c: 'absM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'round', 
        fun_c: 'roundM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'floor', 
        fun_c: 'floorM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'ceil', 
        fun_c: 'ceilM', 
        args_transform: null,
        n_req_args: 1,
        n_opt_args: 0,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'zeros', 
        fun_c: 'zerosM', 
        args_transform: args => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
            return [ndim, dim];
        },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'ones', 
        fun_c: 'onesM', 
        args_transform: args => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
            return [ndim, dim];
        },
        n_req_args: null,
        n_opt_args: null,
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
        args_transform: args => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
            return [ndim, dim];
        },
        n_req_args: null,
        n_opt_args: null,
        opt_arg_defaults: null
        
    },
    {
        fun_matlab: 'randn', 
        fun_c: 'randnM', 
        args_transform: args => {
            let dim = "{" + args.join(", ") + "}";
            let ndim = args.length;
            return [ndim, dim];
        },
        n_req_args: null,
        n_opt_args: null,
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
    