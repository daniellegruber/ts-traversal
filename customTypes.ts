import * as g from "./generated";

export type Type = {
  type: string;
  ndim: number;
  dim: Array<number>;
  ismatrix: boolean;
  isvector: boolean;
  ispointer: boolean;
  isstruct: boolean;
};
    
export type VarType = {
  name: string;
  type: string;
  ndim: number;
  dim: Array<number>;
  ismatrix: boolean;
  isvector: boolean;
  ispointer: boolean;
  isstruct: boolean;
  initialized: boolean;
  scope: Array<number>;
};

export type CustomFunction = {
    name: string;
    arg_types: Array<VarType>;
    return_type:Type;
    outs_transform: { (outs: Array<string>): Array<string>; }; 
    ptr_args: { (arg_types: Array<Type>, outs: Array<string>): Array<VarType>; };
    external: boolean;
    file: string;
    def_node: g.SyntaxNode;
    var_types: Array<VarType>;
};

export type Class = {
    name: string;
    methods: Array<CustomFunction>;
    folder: string;
};

export type TmpVar = {
  name: string;
  count: number;
};

export type Alias = {
  name: string;
  tmp_var: string;
  scope: number[];
};

// at each iteration, check each element of mainQueue, if condition true then push expression
export type MainQueue = {
	expression: string;
	condition: string; // pushes expression to main if condition is true
};
    
type typeToMatrixType = {
  type: string;
  matrix_type: number;
};

type typeToCellType = {
  type: string;
  cell_type: number;
  cell_val: string;
};
    
export const type_to_matrix_type: typeToMatrixType[] = [
    {type: "integer", matrix_type: 0},
    {type: "int", matrix_type: 0},
    {type: "double", matrix_type: 1},
    {type: "complex", matrix_type: 2},
    {type: "char", matrix_type: 3}
];
    
export const type_to_cell_type: typeToCellType[] = [
    {type: "integer", cell_type: 0, cell_val: "ival"},
    {type: "int", cell_type: 0, cell_val: "ival"},
    {type: "double", cell_type: 1, cell_val: "dval"},
    {type: "complex", cell_type: 2, cell_val: "cval"},
    {type: "char", cell_type: 3, cell_val: "chval"}
];