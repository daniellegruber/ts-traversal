# ts-traversal

**ts-traversal** generates C code from MATLAB code by generating a parse tree, traversing the tree, and performing "operations" on each node.

## Built with

* [tree-sitter](https://github.com/tree-sitter/tree-sitter)
* [dts-tree-sitter](https://github.com/asgerf/dts-tree-sitter)
* [tree-sitter-matlab](https://github.com/daniellegruber/tree-sitter-matlab)

## Loading modules

It is important you load binutils before nodejs.
```sh
module load binutils
module load nodejs
``` 

## Usage

```sh
npx tsc -sourcemap index.ts
npx ts-node index.ts MATLAB_FILE SEARCH_FOLDER OUT_FOLDER SHOW_OUTPUT
```

where
- `MATLAB_FILE`: main .m file to parse
- `SEARCH_FOLDER`: used to locate functions called upon in `MATLAB_FILE` (i.e., contains other .m files required for execution of `MATLAB_FILE`)
- `OUT_FOLDER`: generatedCode folder generated in this folder
- `SHOW_OUTPUT`: 1 to show generated code in console, 0 to suppress

The first line is for debugging purposes and only needs to be used when a file is changed.

## Example

```sh
npx tsc -sourcemap index.ts
npx ts-node index.ts test.m $TS_TRAVERSAL $TS_TRAVERSAL 1
```

## Updating tree-sitter-matlab module
Whenever the tree-sitter-matlab grammar is updated, the corresponding module as well as the .d.ts files should be updated via the following commands:
```sh
export YARN="$TS_TRAVERSAL/node_modules/yarn/bin/"
$YARN/yarn add tree-sitter-matlab
export TS_MATLAB="$TS_TRAVERSAL/node_modules/tree-sitter-matlab"
node ./node_modules/@asgerf/dts-tree-sitter/build/src/index.js $TS_MATLAB > OUTPUT.d.ts
node ./node_modules/@asgerf/dts-tree-sitter/build/src/index.js tree-sitter-matlab > generated.d.ts
```

where `$TS_TRAVERSAL` is the path to your ts-traversal folder.

## Under the hood
### index.ts
- Overview
  - Entry-point code
- Details
### generateCode.ts
- Overview
  - Generates code based on node types and values
- Functions
  - `main`: entry-point function
  - `transformNode`: based on inferred node type (from typeInference) and node content, transforms node into C equivalent
### typeInference.ts
- Overview
  - Infers types of variabes used in program
- Functions
  - `typeInference`: entry-point function
    - returns: `[var_types, custom_functions]`
  - `inferTypeFromAssignment`: iterates through assignment statements and updates variables in LHS in `var_types`
    - returns: `[var_types, custom_functions]`
  - `getFunctionReturnType`: gets return type of function by retrieving type from `custom_functions` or `builtin_functions`
    - returns: `[return_type, fun_dictionary]`, where `fun_dictionary` is an updated copy of either `custom_functions` or `builtin_functions`
  - `inferType`: main type inference procedure
    - returns: `[type, ndim, dim, ismatrix, ispointer, isstruct, custom_functions]`
- Exports
  - Type

    ``` typescript
    type Type = {
      type: string;
      ndim: number;
      dim: Array<number>;
      ismatrix: boolean;
      ispointer: boolean;
      isstruct: boolean;
    };
    ```
    
  - VarType
  
    ``` typescript
    type VarType = {
      name: string;
      type: string;
      ndim: number;
      dim: Array<number>;
      ismatrix: boolean;
      ispointer: boolean;
      isstruct: boolean;
      initialized: boolean;
    };
    ```
  
### identifyCustomFunctions.ts
- Overview
  - Identifies user-defined functions to create a dictionary of custom functions
- Exports
  - `custom_functions`: Typed array of custom functions of type `customFunction` (see below)
  - `file_traversal_order`: Order in which to traverse files for type inference and code generation, necessary since most deeply nested functions should have their types inferred first

```typescript
type CustomFunction = {
    name: string;
    arg_types: Array<VarType>;
    return_type:Type;
    //return_type: { (args: Array<string>, arg_types: Array<Type>, outs: Array<string>): Type; };
    outs_transform: { (outs: Array<string>): Array<string>; }; 
    ptr_args: { (arg_types: Array<Type>, outs: Array<string>): Array<VarType>; };
    external: boolean;
    file: string;
    def_node: g.SyntaxNode;
};
```
### helperFunctions.ts
  - Overview
    - Helper functions
  - Functions
    - `getFilesInPath`: gets files in a given directory
    - `getNonClassFilesInPath`: gets non-class files in a given directory
    - `getClassFolders`: returns folders containing class definitions
    - `getClasses`: returns user-defined classes (using `getClassFolders`)
    - `parseFunctionDefNode`: necessary since sometimes function definitions present as ERROR type (due to missing end at the end of function definition)
### builtinFunctions.ts
  - Overview
    - Transforms built-in (not user-defined) MATLAB functions into C functions
  - Exports
    - `builtin_functions`: Typed array of type `functionMapping` (see below) containing information about how to transform each built-in MATLAB function to one or more C functions.
      - fun_matlab: 
      - fun_c: If not `NULL`, then there is a corresponding C function for the given MATLAB function and argument types.

```typescript
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
};
```
### treeTraversal.ts
  - Overview 
    - Contains algorithms for traversing tree
  - Functions
    - `gotoPreorderSucc`: cursor function, traverses nodes of tree preorder
    - `gotoPreorderSucc_OnlyMajorTypes`: same as cursor function above but does not traverse children of "major types": function definitions, if statements, while statements, for statements, call/subscripts, expression statements and comments 
    - `gotoPreorderSucc_SkipFunctionDef`: same as cursor function above but does not traverse children of function definitions
    - `fileIsFunction`: determines whether file is a function
    - `findEntryFunction`: if file is a function, determines the function

# Example 1

```matlab
A = [1, 2.1, 1;
    3, 4, 1];
A_transposed = A';
B = A * A_transposed;
B _scaled = 3 * B;
function [F, G] = myfun1(f,g)
    F = f + g;
    G = f - g;
end
```

## 1. Identify custom functions
identifyCustomFunctions.ts identifies myfun1 as a custom function and thus returns the following "dictionary:"


## 2. Type inference
typeInference.ts
The program begins by traversing all of the assignment statements in the function `inferTypesFromAssignment`:
1. The program encounters the assignment statement `A = ...` in lines 1-2.
  - `inferType` is called on the RHS node. Since the RHS is of type `g.SyntaxType.Matrix`, no recursion is needed and the defining features of the matrix node are returned: `type, ndim, dim, ismatrix,ispointer, isstruct`.
  - `var_types` is updated with a new entry, the variable being the LHS of the assignment statement and all of its features being those received from the call to `inferType` on the RHS node:
    ```typescript
    {
      name: 'A',
      type: 'float',
      ndim: 2,
      dim: [ 2, 3 ],
      ismatrix: true,
      ispointer: true,
      isstruct: false,
      initialized: false
    }
    ```

2. The program encounters the assignment statement `A_transposed = ...` in line 3.
  - Since the RHS node is of type `g.SyntaxType.TransposeOperator`, `inferType` is called on the the argument node.
  - Since the argument node is of type `g.SyntaxType.Identifier`, the name of the node (`A`) is looked up in `var_types`. `var_types` was just updated with an entry for `A` so this will return a match. Therefore `inferType` will return all the defining features of `A`: `type, ndim, dim, ismatrix, ispointer, isstruct`.
  - Since this is a transpose operation, `dim[0]` and `dim[1]` are swapped to arrive at the new dimensions. All the other variables are preserved.
  - `var_types` is thus updated to the following:

    ```typescript
      {
        {
          name: 'A',
          type: 'float',
          ndim: 2,
          dim: [ 2, 3 ],
          ismatrix: true,
          ispointer: true,
          isstruct: false,
          initialized: false
        },
        {
          name: 'A_transposed',
          type: 'float',
          ndim: 2,
          dim: [ 3, 2 ],
          ismatrix: true,
          ispointer: true,
          isstruct: false,
          initialized: false
        }
      }
      ```

3. The program encounters the assignment statement `B = ...` in line 3.
  - Since the RHS is of type `g.SyntaxType.BinaryOperator`, `inferType` is called on each of the two operand nodes.
  - Since both the left and right operand nodes are of type `g.SyntaxType.Identifier`, `inferType` looks up their names in `var_types` and to get the definining features of each: `left_type, left_ndim, left_dim, left_ismatrix, ...` and `right_type, right_ndim, right_dim, right_ismatrix, ...` 
  - `left_ismatrix` and `right_ismatrix` are compared to yield `ismatrix = true`
  - `left_type` and `right_type` are compared to yield `type = float`
  - Since the operator is `*`, the new dimensions are constructed as `[ left_dim[0], right_dim[1] ] = [2, 2]`
  - `var_types` is thus updated to the following:

    ```typesecript
    {
        {
          name: 'A',
          type: 'float',
          ndim: 2,
          dim: [ 2, 3 ],
          ismatrix: true,
          ispointer: true,
          isstruct: false,
          initialized: false
        },
        {
          name: 'A_transposed',
          type: 'float',
          ndim: 2,
          dim: [ 3, 2 ],
          ismatrix: true,
          ispointer: true,
          isstruct: false,
          initialized: false
        },
      {
        name: 'B',
        type: 'float',
        ndim: 2,
        dim: [ 2, 2 ],
        ismatrix: true,
        ispointer: true,
        isstruct: false,
        initialized: true
      }
    }
    ```

## 3. Generate code
generateCode.ts
`main` begins traversing all of the "major" syntax types
1. The program encounters the expression statement (of type `g.SyntaxType.Expression`) `A = ...` in lines 1-2.
  - `transformNode` is called on the first child node, which is of type `g.SyntaxType.Assignment`.
  - Since the RHS node is of type `g.SyntaxType.Matrix`, the `initializeMatrix` function is called.
2. The program encounters the expression statement (of type `g.SyntaxType.Expression`) `A_transposed = ...` in line 3.
  - `transformNode` is called on the first child node, which is of type `g.SyntaxType.Assignment`.
  - Since the RHS node is not of type `g.SyntaxType.Matrix`, `g.SyntaxType.Cell`, or `g.SyntaxType.CallOrSubscript`, `transformNode` is called on the RHS node.
  - Since the RHS node is of type `g.SyntaxType.TransposeOperator`, the node is passed is to the function `printMatrixFunctions`.
  - `parseFunctionCallNode(node)` returns `[args, arg_types, outs, is_subscript]`. (Despite the name, it works with operator nodes as well because they're treated as builtin functions too.)
  - The entry for the transpose operator is searched for in `operatorMapping` and the match is assigned to `obj`.
  - The type of the result of the operation is found using the `return_type` field of `obj`: `return_type = obj.return_type(args, arg_types, outs)`.
  - The C function (or lack thereof) corresponding to the MATLAB operator is found using the `fun_c` field of `obj`: `fun_c = obj.fun_c(arg_types, outs)`. In this case, `obj.fun_c(arg_types, outs)` returns `ctransposeM` because the argument node is a matrix. 
  - Since the result of the operation is a matrix (`return_type.ismatrix = TRUE`), a temporary variable `tmp_var` is created using `generatedTmpVar` to store the result. Since it is the first temporary variable created in the program it will have a value of tmp1.
  - The generated expression `${init_type} ${tmp_var} = ${fun_c}(${args.join(", ")})`, which evaluates as `Matrix * tmp1 = ctransposeM(A)`, is pushed to the main body of the code.
  - `tmp_var` is returned by `printMatrixFunctions` and then by `transformNode` so that the larger expression containing the tranpose operation can replace it with the temporary variable.
3. The program encounters the expression statement (of type `g.SyntaxType.Expression`) `B = ...` in line 4.
  - `transformNode` is called on the first child node, which is of type `g.SyntaxType.Assignment`.
  - Since the RHS node is not of type `g.SyntaxType.Matrix`, `g.SyntaxType.Cell`, or `g.SyntaxType.CallOrSubscript`, `transformNode` is called on the RHS node.
  - Since the RHS node is of type `g.SyntaxType.BinaryOperator`, the node is passed is to the function `printMatrixFunctions`.
  - `parseFunctionCallNode(node)` returns `[args, arg_types, outs, is_subscript]`.
  - The entry for the binary operator is searched for in `operatorMapping` and the match is assigned to `obj`.
  - The type of the result of the operation is found using the `return_type` field of `obj`: `return_type = obj.return_type(args, arg_types, outs)`.
  - The C function (or lack thereof) corresponding to the MATLAB operator is found using the `fun_c` field of `obj`: `fun_c = obj.fun_c(arg_types, outs)`. In this case, `obj.fun_c(arg_types, outs)` returns `mtimesM` because both operands are matrices. 
  - Since the result of the operation is a matrix (`return_type.ismatrix = TRUE`), a temporary variable `tmp_var` is created using `generatedTmpVar` to store the result. Since it is the second temporary variable created in the program it will have a value of tmp2.
  - The generated expression `${init_type} ${tmp_var} = ${fun_c}(${args.join(", ")})`, which evaluates as `Matrix * tmp2 = mtimesM(A, A_transposed)`, is pushed to the main body of the code.
  - `tmp_var` is returned by `printMatrixFunctions` and then by `transformNode` so that the larger expression containing the tranpose operation can replace it with the temporary variable.
4. The program encounters the expression statement (of type `g.SyntaxType.Expression`) `B_scaled = ...` in line 5.
  - The program proceeds the same as in (3) until `fun_c = obj.fun_c(arg_types, outs)` is evaluated. In this case, `obj.fun_c(arg_types, outs)` returns `scaleM` because only one operand is a matrix. 
  - Since the result of the operation is a matrix (`return_type.ismatrix = TRUE`), a temporary variable `tmp_var` is created using `generatedTmpVar` to store the result. Since it is the second temporary variable created in the program it will have a value of tmp3.
  - The generated expression `${init_type} ${tmp_var} = ${fun_c}(${args.join(", ")})`, which evaluates as `Matrix * tmp3 = scaleM(B, 3)`, is pushed to the main body of the code.
  - `tmp_var` is returned by `printMatrixFunctions` and then by `transformNode` so that the larger expression containing the tranpose operation can replace it with the temporary variable.
5. The program encounters the function definition (of type `g.SyntaxType.FunctionDefinition`) `function [F,G] = myfun1(f,g) ...` in lines 5-7.
  - The node is passed to `printFunctionDefDeclare`.
  - The parameter of the function are parsed and their types and values and stored in the array `param_list`.
  - Since the function returns an output and this output is a matrix, each of the elements of the output matrix are transformed into pointer variables. Their declarations are stored in the array `ptr_declarations` and their types and values are pushed onto `param_list` so that they are treated as inputs to the function.
  - The transformed output (`"void"`) and parameters are pushed to `function_declarations`.
  - The transformed output (`"void"`) and parameters, the transformed body of the function, and `ptr_declaration` are pushed to `function_definitions`.
