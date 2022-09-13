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
    - `inferTypeFromAssignment`: iterates through assignment statements and updates variables in LHS in `var_types`
    - `getFunctionReturnType`: gets return type of function by retrieving type from `custom_functions` or `builtin_functions`
    - `inferType`: main type inference procedure
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

## Example 1

```matlab
A = [1, 2.1, 1;
    3, 4, 1];
A_transposed = A';
C = A * B;
C_scaled = 3 * C;
function [F, G] = myfun1(f,g)
    F = f + g;
    G = f - g;
end
```

1. identifyCustomFunctions.ts identifies myfun1 as a custom function and thus returns the following "dictionary:"


2. typeInference.ts 
    1. The program encounters the assignment statement `A = ...` in lines 1-2.
      - Since the RHS is of type `g.SyntaxType.Matrix`,
      - `var_types` is thus updated to the following:
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
    },
    ```

    2. The program encounters the assignment statement `B = ...` in line 3.
      - 
      - `var_types` is thus updated to the following:
    3. The program encounters the assignment statement `C = ...` in line 3.
      - Since the RHS is of type `g.SyntaxType.BinaryOperator`,


3. generateCode.ts
