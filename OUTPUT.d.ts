export interface Parser {
  parse(input: string | Input, previousTree?: Tree, options?: {bufferSize?: number, includedRanges?: Range[]}): Tree;
  getLanguage(): any;
  setLanguage(language: any): void;
  getLogger(): Logger;
  setLogger(logFunc: Logger): void;
}

export type Point = {
  row: number;
  column: number;
};

export type Range = {
  startIndex: number,
  endIndex: number,
  startPosition: Point,
  endPosition: Point
};

export type Edit = {
  startIndex: number;
  oldEndIndex: number;
  newEndIndex: number;
  startPosition: Point;
  oldEndPosition: Point;
  newEndPosition: Point;
};

export type Logger = (
  message: string,
  params: {[param: string]: string},
  type: "parse" | "lex"
) => void;

export interface Input {
  seek(index: number): void;
  read(): any;
}

interface SyntaxNodeBase {
  tree: Tree;
  type: string;
  isNamed: boolean;
  text: string;
  startPosition: Point;
  endPosition: Point;
  startIndex: number;
  endIndex: number;
  parent: SyntaxNode | null;
  children: Array<SyntaxNode>;
  namedChildren: Array<SyntaxNode>;
  childCount: number;
  namedChildCount: number;
  firstChild: SyntaxNode | null;
  firstNamedChild: SyntaxNode | null;
  lastChild: SyntaxNode | null;
  lastNamedChild: SyntaxNode | null;
  nextSibling: SyntaxNode | null;
  nextNamedSibling: SyntaxNode | null;
  previousSibling: SyntaxNode | null;
  previousNamedSibling: SyntaxNode | null;

  hasChanges(): boolean;
  hasError(): boolean;
  isMissing(): boolean;
  toString(): string;
  child(index: number): SyntaxNode | null;
  namedChild(index: number): SyntaxNode | null;
  firstChildForIndex(index: number): SyntaxNode | null;
  firstNamedChildForIndex(index: number): SyntaxNode | null;

  descendantForIndex(index: number): SyntaxNode;
  descendantForIndex(startIndex: number, endIndex: number): SyntaxNode;
  namedDescendantForIndex(index: number): SyntaxNode;
  namedDescendantForIndex(startIndex: number, endIndex: number): SyntaxNode;
  descendantForPosition(position: Point): SyntaxNode;
  descendantForPosition(startPosition: Point, endPosition: Point): SyntaxNode;
  namedDescendantForPosition(position: Point): SyntaxNode;
  namedDescendantForPosition(startPosition: Point, endPosition: Point): SyntaxNode;
  descendantsOfType<T extends TypeString>(types: T | readonly T[], startPosition?: Point, endPosition?: Point): NodeOfType<T>[];

  closest<T extends SyntaxType>(types: T | readonly T[]): NamedNode<T> | null;
  walk(): TreeCursor;
}

export interface TreeCursor {
  nodeType: string;
  nodeText: string;
  nodeIsNamed: boolean;
  startPosition: Point;
  endPosition: Point;
  startIndex: number;
  endIndex: number;
  readonly currentNode: SyntaxNode

  reset(node: SyntaxNode): void
  gotoParent(): boolean;
  gotoFirstChild(): boolean;
  gotoFirstChildForIndex(index: number): boolean;
  gotoNextSibling(): boolean;
}

export interface Tree {
  readonly rootNode: SyntaxNode;

  edit(delta: Edit): Tree;
  walk(): TreeCursor;
  getChangedRanges(other: Tree): Range[];
  getEditedRange(other: Tree): Range;
}

interface NamedNodeBase extends SyntaxNodeBase {
    isNamed: true;
}

/** An unnamed node with the given type string. */
export interface UnnamedNode<T extends string = string> extends SyntaxNodeBase {
  type: T;
  isNamed: false;
}

type PickNamedType<Node, T extends string> = Node extends { type: T; isNamed: true } ? Node : never;

type PickType<Node, T extends string> = Node extends { type: T } ? Node : never;

/** A named node with the given `type` string. */
export type NamedNode<T extends SyntaxType = SyntaxType> = PickNamedType<SyntaxNode, T>;

/**
 * A node with the given `type` string.
 *
 * Note that this matches both named and unnamed nodes. Use `NamedNode<T>` to pick only named nodes.
 */
export type NodeOfType<T extends string> = PickType<SyntaxNode, T>;

interface TreeCursorOfType<S extends string, T extends SyntaxNodeBase> {
  nodeType: S;
  currentNode: T;
}

type TreeCursorRecord = { [K in TypeString]: TreeCursorOfType<K, NodeOfType<K>> };

/**
 * A tree cursor whose `nodeType` correlates with `currentNode`.
 *
 * The typing becomes invalid once the underlying cursor is mutated.
 *
 * The intention is to cast a `TreeCursor` to `TypedTreeCursor` before
 * switching on `nodeType`.
 *
 * For example:
 * ```ts
 * let cursor = root.walk();
 * while (cursor.gotoNextSibling()) {
 *   const c = cursor as TypedTreeCursor;
 *   switch (c.nodeType) {
 *     case SyntaxType.Foo: {
 *       let node = c.currentNode; // Typed as FooNode.
 *       break;
 *     }
 *   }
 * }
 * ```
 */
export type TypedTreeCursor = TreeCursorRecord[keyof TreeCursorRecord];

export interface ErrorNode extends NamedNodeBase {
    type: SyntaxType.ERROR;
    hasError(): true;
}

export const enum SyntaxType {
  ERROR = "ERROR",
  Assignment = "assignment",
  BinaryOperator = "binary_operator",
  Block = "block",
  BooleanOperator = "boolean_operator",
  BreakStatement = "break_statement",
  CallOrSubscript = "call_or_subscript",
  CatchClause = "catch_clause",
  Cell = "cell",
  ComparisonOperator = "comparison_operator",
  ConditionalExpression = "conditional_expression",
  ContinueStatement = "continue_statement",
  ElseClause = "else_clause",
  ElseifClause = "elseif_clause",
  ExpressionList = "expression_list",
  ExpressionStatement = "expression_statement",
  ForStatement = "for_statement",
  FunctionDefinition = "function_definition",
  IfStatement = "if_statement",
  Keyword = "keyword",
  Matrix = "matrix",
  Module = "module",
  Parameters = "parameters",
  ReturnValue = "return_value",
  Slice = "slice",
  String = "string",
  TransposeOperator = "transpose_operator",
  TryStatement = "try_statement",
  UnaryOperator = "unary_operator",
  WhileStatement = "while_statement",
  Comment = "comment",
  Ellipsis = "ellipsis",
  EscapeSequence = "escape_sequence",
  False = "false",
  Float = "float",
  Identifier = "identifier",
  Integer = "integer",
  StringFragment = "string_fragment",
  True = "true",
}

export type UnnamedType =
  | "\""
  | "&"
  | "&&"
  | "'"
  | "("
  | ")"
  | "*"
  | "+"
  | ","
  | "-"
  | ".'"
  | ".*"
  | "./"
  | ".\\"
  | ".^"
  | "/"
  | ":"
  | ";"
  | "<"
  | "<="
  | "="
  | "=="
  | ">"
  | ">="
  | "["
  | "\\"
  | "]"
  | "^"
  | "async"
  | "break"
  | "case"
  | "catch"
  | "continue"
  | "else"
  | "elseif"
  | "end"
  | "for"
  | "function"
  | "if"
  | "try"
  | "while"
  | "{"
  | "|"
  | "||"
  | "}"
  | "~"
  | "~="
  ;

export type TypeString = SyntaxType | UnnamedType;

export type SyntaxNode = 
  | CompoundStatementNode
  | SimpleStatementNode
  | ExpressionNode
  | ParameterNode
  | PrimaryExpressionNode
  | AssignmentNode
  | BinaryOperatorNode
  | BlockNode
  | BooleanOperatorNode
  | BreakStatementNode
  | CallOrSubscriptNode
  | CatchClauseNode
  | CellNode
  | ComparisonOperatorNode
  | ConditionalExpressionNode
  | ContinueStatementNode
  | ElseClauseNode
  | ElseifClauseNode
  | ExpressionListNode
  | ExpressionStatementNode
  | ForStatementNode
  | FunctionDefinitionNode
  | IfStatementNode
  | KeywordNode
  | MatrixNode
  | ModuleNode
  | ParametersNode
  | ReturnValueNode
  | SliceNode
  | StringNode
  | TransposeOperatorNode
  | TryStatementNode
  | UnaryOperatorNode
  | WhileStatementNode
  | UnnamedNode<"\"">
  | UnnamedNode<"&">
  | UnnamedNode<"&&">
  | UnnamedNode<"'">
  | UnnamedNode<"(">
  | UnnamedNode<")">
  | UnnamedNode<"*">
  | UnnamedNode<"+">
  | UnnamedNode<",">
  | UnnamedNode<"-">
  | UnnamedNode<".'">
  | UnnamedNode<".*">
  | UnnamedNode<"./">
  | UnnamedNode<".\\">
  | UnnamedNode<".^">
  | UnnamedNode<"/">
  | UnnamedNode<":">
  | UnnamedNode<";">
  | UnnamedNode<"<">
  | UnnamedNode<"<=">
  | UnnamedNode<"=">
  | UnnamedNode<"==">
  | UnnamedNode<">">
  | UnnamedNode<">=">
  | UnnamedNode<"[">
  | UnnamedNode<"\\">
  | UnnamedNode<"]">
  | UnnamedNode<"^">
  | UnnamedNode<"async">
  | UnnamedNode<"break">
  | UnnamedNode<"case">
  | UnnamedNode<"catch">
  | CommentNode
  | UnnamedNode<"continue">
  | EllipsisNode
  | UnnamedNode<"else">
  | UnnamedNode<"elseif">
  | UnnamedNode<"end">
  | EscapeSequenceNode
  | FalseNode
  | FloatNode
  | UnnamedNode<"for">
  | UnnamedNode<"function">
  | IdentifierNode
  | UnnamedNode<"if">
  | IntegerNode
  | StringFragmentNode
  | TrueNode
  | UnnamedNode<"try">
  | UnnamedNode<"while">
  | UnnamedNode<"{">
  | UnnamedNode<"|">
  | UnnamedNode<"||">
  | UnnamedNode<"}">
  | UnnamedNode<"~">
  | UnnamedNode<"~=">
  | ErrorNode
  ;

export type CompoundStatementNode = 
  | ForStatementNode
  | FunctionDefinitionNode
  | IfStatementNode
  | TryStatementNode
  | WhileStatementNode
  ;

export type SimpleStatementNode = 
  | BreakStatementNode
  | ContinueStatementNode
  | ExpressionStatementNode
  ;

export type ExpressionNode = 
  | BooleanOperatorNode
  | ComparisonOperatorNode
  | ConditionalExpressionNode
  | PrimaryExpressionNode
  ;

export type ParameterNode = 
  | IdentifierNode
  ;

export type PrimaryExpressionNode = 
  | BinaryOperatorNode
  | CallOrSubscriptNode
  | CellNode
  | EllipsisNode
  | FalseNode
  | FloatNode
  | IdentifierNode
  | IntegerNode
  | KeywordNode
  | MatrixNode
  | StringNode
  | TransposeOperatorNode
  | TrueNode
  | UnaryOperatorNode
  ;

export interface AssignmentNode extends NamedNodeBase {
  type: SyntaxType.Assignment;
  leftNode: CallOrSubscriptNode | IdentifierNode;
  rightNode: ExpressionNode;
}

export interface BinaryOperatorNode extends NamedNodeBase {
  type: SyntaxType.BinaryOperator;
  leftNode: PrimaryExpressionNode;
  operatorNode: UnnamedNode<"*"> | UnnamedNode<"+"> | UnnamedNode<"-"> | UnnamedNode<".*"> | UnnamedNode<"./"> | UnnamedNode<".\\"> | UnnamedNode<".^"> | UnnamedNode<"/"> | UnnamedNode<"\\"> | UnnamedNode<"^">;
  rightNode: PrimaryExpressionNode;
}

export interface BlockNode extends NamedNodeBase {
  type: SyntaxType.Block;
}

export interface BooleanOperatorNode extends NamedNodeBase {
  type: SyntaxType.BooleanOperator;
  leftNode: ExpressionNode;
  operatorNode: UnnamedNode<"&"> | UnnamedNode<"&&"> | UnnamedNode<"|"> | UnnamedNode<"||">;
  rightNode: ExpressionNode;
}

export interface BreakStatementNode extends NamedNodeBase {
  type: SyntaxType.BreakStatement;
}

export interface CallOrSubscriptNode extends NamedNodeBase {
  type: SyntaxType.CallOrSubscript;
  args_or_subscriptNodes: (UnnamedNode<","> | ExpressionNode | SliceNode)[];
  valueNode: PrimaryExpressionNode;
}

export interface CatchClauseNode extends NamedNodeBase {
  type: SyntaxType.CatchClause;
  bodyNode: BlockNode;
  exceptionNode?: ExpressionNode;
}

export interface CellNode extends NamedNodeBase {
  type: SyntaxType.Cell;
}

export interface ComparisonOperatorNode extends NamedNodeBase {
  type: SyntaxType.ComparisonOperator;
  leftNode: ExpressionNode;
  operatorNode: UnnamedNode<"<"> | UnnamedNode<"<="> | UnnamedNode<"=="> | UnnamedNode<">"> | UnnamedNode<">="> | UnnamedNode<"~=">;
  rightNode: ExpressionNode;
}

export interface ConditionalExpressionNode extends NamedNodeBase {
  type: SyntaxType.ConditionalExpression;
}

export interface ContinueStatementNode extends NamedNodeBase {
  type: SyntaxType.ContinueStatement;
}

export interface ElseClauseNode extends NamedNodeBase {
  type: SyntaxType.ElseClause;
  bodyNode: BlockNode;
}

export interface ElseifClauseNode extends NamedNodeBase {
  type: SyntaxType.ElseifClause;
  conditionNode: ExpressionNode;
  consequenceNode: BlockNode;
}

export interface ExpressionListNode extends NamedNodeBase {
  type: SyntaxType.ExpressionList;
}

export interface ExpressionStatementNode extends NamedNodeBase {
  type: SyntaxType.ExpressionStatement;
}

export interface ForStatementNode extends NamedNodeBase {
  type: SyntaxType.ForStatement;
  bodyNode: BlockNode;
  leftNode: CallOrSubscriptNode | IdentifierNode;
  rightNode: ExpressionNode | SliceNode;
}

export interface FunctionDefinitionNode extends NamedNodeBase {
  type: SyntaxType.FunctionDefinition;
  bodyNode: BlockNode;
  nameNode: IdentifierNode;
  parametersNode: ParametersNode;
  return_variableNode?: ReturnValueNode;
}

export interface IfStatementNode extends NamedNodeBase {
  type: SyntaxType.IfStatement;
  alternativeNodes: (ElseClauseNode | ElseifClauseNode)[];
  conditionNode: ExpressionNode;
  consequenceNode: BlockNode;
}

export interface KeywordNode extends NamedNodeBase {
  type: SyntaxType.Keyword;
}

export interface MatrixNode extends NamedNodeBase {
  type: SyntaxType.Matrix;
}

export interface ModuleNode extends NamedNodeBase {
  type: SyntaxType.Module;
}

export interface ParametersNode extends NamedNodeBase {
  type: SyntaxType.Parameters;
}

export interface ReturnValueNode extends NamedNodeBase {
  type: SyntaxType.ReturnValue;
}

export interface SliceNode extends NamedNodeBase {
  type: SyntaxType.Slice;
}

export interface StringNode extends NamedNodeBase {
  type: SyntaxType.String;
}

export interface TransposeOperatorNode extends NamedNodeBase {
  type: SyntaxType.TransposeOperator;
  argumentNode: PrimaryExpressionNode;
  operatorNode: UnnamedNode<"'"> | UnnamedNode<".'">;
}

export interface TryStatementNode extends NamedNodeBase {
  type: SyntaxType.TryStatement;
  bodyNode: BlockNode;
}

export interface UnaryOperatorNode extends NamedNodeBase {
  type: SyntaxType.UnaryOperator;
  argumentNode: PrimaryExpressionNode;
  operatorNode: UnnamedNode<"+"> | UnnamedNode<"-"> | UnnamedNode<"~">;
}

export interface WhileStatementNode extends NamedNodeBase {
  type: SyntaxType.WhileStatement;
  alternativeNode?: ElseClauseNode;
  bodyNode: BlockNode;
  conditionNode: ExpressionNode;
}

export interface CommentNode extends NamedNodeBase {
  type: SyntaxType.Comment;
}

export interface EllipsisNode extends NamedNodeBase {
  type: SyntaxType.Ellipsis;
}

export interface EscapeSequenceNode extends NamedNodeBase {
  type: SyntaxType.EscapeSequence;
}

export interface FalseNode extends NamedNodeBase {
  type: SyntaxType.False;
}

export interface FloatNode extends NamedNodeBase {
  type: SyntaxType.Float;
}

export interface IdentifierNode extends NamedNodeBase {
  type: SyntaxType.Identifier;
}

export interface IntegerNode extends NamedNodeBase {
  type: SyntaxType.Integer;
}

export interface StringFragmentNode extends NamedNodeBase {
  type: SyntaxType.StringFragment;
}

export interface TrueNode extends NamedNodeBase {
  type: SyntaxType.True;
}

