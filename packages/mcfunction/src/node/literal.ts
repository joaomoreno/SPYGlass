import type * as core from '@spyglassmc/core'
import type { CommandChildBaseNode } from './command'

export interface LiteralNode extends CommandChildBaseNode {
	type: 'mcfunction:literal',
	/**
	 * If this literal is under the root command tree node (i.e. the start of a command).
	 */
	isRoot: boolean,
}
export namespace LiteralNode {
	/* istanbul ignore next */
	export function is(node: core.AstNode): node is LiteralNode {
		return (node as LiteralNode).type === 'mcfunction:literal'
	}
}
