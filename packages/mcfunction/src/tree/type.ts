interface BaseTreeNode {
	// The following properties are provided in `commands.json` created by the data generator.
	type: string,
	children?: {
		[name: string]: TreeNode,
	},
	executable?: boolean,
	redirect?: string[],

	// The following properties are custom.
	/**
	 * The permission level required to use this node.
	 * @default 2
	 */
	permission?: 0 | 1 | 2 | 3 | 4,
}

export interface ArgumentTreeNode extends BaseTreeNode {
	type: 'argument',
	parser: string,
	properties?: Record<string, any>,
}

export interface LiteralTreeNode extends BaseTreeNode {
	type: 'literal',
}

export interface RootTreeNode extends BaseTreeNode {
	type: 'root',
}

export type TreeNode =
	| ArgumentTreeNode
	| LiteralTreeNode
	| RootTreeNode

type RecursivePartial<T> = T extends object ? { [K in keyof T]?: RecursivePartial<T[K]> } : T

export type PartialTreeNode = RecursivePartial<TreeNode>
export type PartialRootTreeNode = RecursivePartial<RootTreeNode>
