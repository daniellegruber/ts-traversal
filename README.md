# ts-traversal

**ts-traversal** generates C code from MATLAB code by generating a parse tree, traversing the tree, and performing "operations" on each node.

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
