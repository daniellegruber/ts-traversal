import * as g from "./generated";
import { gotoPreorderSucc } from "./gotoPreorderSucc";

// Type inference
// -----------------------------------------------------------------------------

type VarType = {
      name: string;
      type: string;
      ndim: number;
      dim: Array<number>;
      ismatrix: boolean;
    };
    

    
function typeInference(tree) {
    var var_types: VarType[] = [];
    
    let cursor = tree.walk();
    do {
        const c = cursor as g.TypedTreeCursor;

        switch (c.nodeType) {
            case g.SyntaxType.Assignment: {
                let node = c.currentNode;

                // If LHS is an identifier, type is same as RHS
                if (node.leftNode.type == g.SyntaxType.Identifier) {
                    const [type, ndim, dim, ismatrix] = inferType(node.rightNode, var_types);
                    const v1: VarType = { name: node.leftNode.text, type: type, ndim: ndim, dim: dim, ismatrix: ismatrix };
                    var_types.push(v1);
                    
                    
                // If LHS is subscript, type is matrix
                } else if (node.leftNode.type == g.SyntaxType.CallOrSubscript) {
                    const v1: VarType = { name: node.leftNode.text, type: 'unknown', ndim: 2, dim: [1,1], ismatrix: true };
                    var_types.push(v1);
                }
                
                
                
                break;
            }
        }
    } while(gotoPreorderSucc(cursor));
    return var_types;
}

function inferType(node, var_types) {
    switch (node.type) {
        
        // Named types
        case g.SyntaxType.Ellipsis: {
            return ['ellipsis', 2, [1, 1], false];
            break
        }
        case (g.SyntaxType.True || g.SyntaxType.False): {
            return ['bool',  2, [1, 1], false];
            break
        }
        case g.SyntaxType.Float: {
            return ['float',  2, [1, 1], false];
            break
        }
        case g.SyntaxType.Integer: {
            return ['int',  2, [1, 1], false];
            break
        }
        case g.SyntaxType.Complex: {
            return ['complex',  2, [1, 1], false];
            break
        }
        case g.SyntaxType.String: {
            return ['char',  2, [1, 1], false];
            break
        }
        case g.SyntaxType.Cell:
        case g.SyntaxType.Matrix: {
            
            let row = 0;
            let col = 0;
            let nrows = 0;
            let ncols = 0;
            
            for (let i=0; i<node.childCount; i++) {
                if (node.children[i].type === ";") {
                    row += 1;
                    col = 0;
                }
                else if (node.children[i].isNamed) {
                    
                    if (row == 0) {
                        const [type, ndim, dim] = inferType(node.children[i], var_types);
                        ncols += dim[1];
                    }
                    if (col == 0) {
                        const [type, ndim, dim] = inferType(node.children[i], var_types);
                        nrows += dim[0];
                    }
                    col += 1;
                }
            }
            
            let children_types = [];
            
            for (let child of node.namedChildren) {
                let [child_type,,,] = inferType(child, var_types);
                children_types.push(child_type);
            }
            
            var type = 'unknown';
            if (children_types.every(val => val === children_types[0])) {
                type = children_types[0];
                
            } else if (children_types.every(val => ['int','float','complex'].includes(val))) {
                
                if (children_types.includes('complex')) {
                    type = 'complex';
                } else if (children_types.includes('float')) {
                    type = 'float';
                } else if (children_types.includes('int')) {
                    type = 'int'; 
                }
            } else {
                type = 'heterogeneous';
            }
            
            return [type, 2, [nrows, ncols], true];
            break;
        }
    
            
        // Recursive calls to inferTypes
        case g.SyntaxType.ComparisonOperator:
        case g.SyntaxType.BooleanOperator: {
            return ['bool', 2, [1, 1], false];
            break;
        }
        case g.SyntaxType.TransposeOperator: {
            const [type, ndim, dim, ismatrix] = inferType(node.firstChild, var_types);
            return [type, 2, [dim[1], dim[0]], ismatrix];
            break;
        }
        case g.SyntaxType.UnaryOperator: {
            if (node.operatorNode.type == "~") {
                return ['bool', 2, [1, 1], false];
            }
            else {
                return inferType(node.firstChild, var_types);
            }
            
            break;
        }
        case g.SyntaxType.BinaryOperator: {
            
            let [left_type, left_ndim, left_dim, left_ismatrix] = inferType(node.leftNode, var_types);
            let [right_type, right_ndim, right_dim, right_ismatrix] = inferType(node.rightNode, var_types);
            
            switch (node.operatorNode.type) {
                case "+": 
                case "-": 
                case ".*": 
                case "./": 
                case ".\\":
                case "^":
                case ".^": {
                    var ndim = left_ndim;
                    var dim = left_dim;
                    break;
                }
                case "*": 
                case "/":
                case "\\": {
                    var ndim = left_ndim;
                    var dim = left_dim;
                    dim[1] = right_dim[1];
                    break;
                }
            }
            
            if (left_ismatrix || right_ismatrix) {
                var ismatrix = true;
            } else {
                var ismatrix = false;
            }
                
            if (left_type == right_type) {
                return [left_type, ndim, dim, ismatrix];
            } else if (left_type == 'complex' || right_type == 'complex') {
                return ['complex', ndim, dim, ismatrix];
            } else if (left_type == 'float' || right_type == 'float') {
                return ['float', ndim, dim, ismatrix];
            } else if (left_type == 'bool') {
                return [right_type, ndim, dim, ismatrix];
            } else if (right_type == 'bool') {
                return [left_type, ndim, dim, ismatrix];
            } else {
                return ['unknown', 2, [1, 1], false];
            }
            break;
        }
        
        // Identifiers
        case g.SyntaxType.Identifier: {
            let obj = var_types.find(x => x.name === node.text);
            if (obj != null) {
                return [obj.type, obj.ndim, obj.dim, obj.ismatrix];
            } else {
                return ['unknown', 2, [1, 1], false];
            }
            break;
        }
        
        case g.SyntaxType.CallOrSubscript: {
   
            let [parent_type,,,parent_ismatrix] = inferType(node.valueNode, var_types);

            if (parent_ismatrix) {
                
                
                let dim = [];
                for (let i=1; i<node.namedChildCount; i++) {
                    let [,,child_dim,] = inferType(node.namedChildren[i], var_types);
                    dim.push(child_dim[1]);
                }
                
                
                if (dim.every(val => val === 1)) {
                    return [parent_type, 2, dim, false];
                } else {
                    return [parent_type, 2, dim, true];
                }
                
                
            } else {
                return ['unknown', 2, [1,1], true];
            }
            break;
        }
        
        case g.SyntaxType.Slice: {

            let children_types = [];
            let children_vals = []
            
            for (let i=0; i<node.namedChildCount; i++) {
                let child = node.namedChildren[i];
                let [child_type,,,] = inferType(child, var_types);
                
                if (child_type == "keyword") {
                    
                    [,ndim,dim,] = inferType(node.parent.valueNode, var_types);
                    let firstNode = node.parent.namedChildren[1];
                    let current_dim = 0;
                    let dummyNode = node;
                    while (JSON.stringify(dummyNode) != JSON.stringify(firstNode)) {
                        dummyNode = dummyNode.previousNamedSibling;
                        current_dim += 1;
                    }
                    
                    children_vals.push(dim[current_dim]);
                    children_types.push('int');
                } else {
                    children_vals.push(Number(child.text));
                    children_types.push(child_type);
                }
                
            }
            
            
            var type = 'unknown';
            if (children_types.every(val => ['int','float','complex'].includes(val))) {
                
                if (children_types.includes('complex')) {
                    type = 'complex';
                } else if (children_types.includes('float')) {
                    type = 'float';
                } else if (children_types.includes('int')) {
                    type = 'int'; 
                }
            }
            
            
            let start = children_vals[0];
            var stop = children_vals[1];
            var step = 1;
                
            if (children_vals.length == 3) {
                stop = children_vals[2];
                step = children_vals[1];
            }
            
            let len = Math.floor((stop-start)/step) + 1;
            return [type, 2, [1, len], true];
        }
        
        case g.SyntaxType.Keyword: {
            return ['keyword', 2, [1, 1], false]
        }
        
        // Default
        default: return ['unknown', 2, [1, 1], false];
    }
}

export {VarType, typeInference, inferType};