import type { AstNode, CommentNode, FloatNode, IntegerNode, ResourceLocationNode, SequenceNode, SequenceUtil } from '@spyglassmc/core'
import { StringNode } from '@spyglassmc/core'
import type { CompoundDefinitionNode, CompoundFieldTypeNode } from './CompoundDefinition'
import type { EnumDefinitionNode } from './EnumDefinition'
import type { InjectClauseNode } from './InjectClause'

export type SyntaxNode<CN extends AstNode = AstNode> = SequenceNode<CN | CommentNode>
export type SyntaxUtil<CN extends AstNode = AstNode> = SequenceUtil<CN | CommentNode>

export interface LiteralToken<T extends string = string> extends AstNode {
	type: 'nbtdoc:literal',
	value: T,
}
export namespace LiteralToken {
	export function is<T extends string>(literal?: T | T[] | readonly T[]): (obj: object) => obj is LiteralToken<T> {
		return (obj: object): obj is LiteralToken<T> => (
			(obj as LiteralToken).type === 'nbtdoc:literal' &&
			(literal === undefined || (Array.isArray(literal) ? literal.includes((obj as LiteralToken<T>).value) : (obj as LiteralToken).value === literal))
		)
	}
}

export interface IdentifierToken extends AstNode {
	type: 'nbtdoc:identifier',
	value: string,
}
export namespace IdentifierToken {
	export function is(obj: object): obj is IdentifierToken {
		return (obj as IdentifierToken).type === 'nbtdoc:identifier'
	}
}

export interface IdentPathToken extends AstNode {
	type: 'nbtdoc:ident_path',
	fromGlobalRoot: boolean,
	children: (IdentifierToken | LiteralToken<'super'>)[],
}
export namespace IdentPathToken {
	export function is(obj: object): obj is IdentPathToken {
		return (obj as IdentPathToken).type === 'nbtdoc:ident_path'
	}
}

export type Primitive = FloatNode | IntegerNode | StringNode
export namespace Primitive {
	export function is(obj: object): obj is Primitive {
		return (obj as Primitive).type === 'float' ||
			(obj as Primitive).type === 'integer' ||
			StringNode.is(obj)
	}
}

export interface DocCommentsNode extends SyntaxNode<CommentNode> {
	type: 'nbtdoc:doc_comments',
	value: string,
}
export namespace DocCommentsNode {
	export function is(obj: object): obj is DocCommentsNode {
		return (obj as DocCommentsNode).type === 'nbtdoc:doc_comments'
	}
}

export interface DescribesClauseNode extends SyntaxNode<IdentPathToken | LiteralToken | ResourceLocationNode> {
	type: 'nbtdoc:describes_clause',
	path: IdentPathToken,
	registry: ResourceLocationNode,
	objects: ResourceLocationNode[] | null,
}

export interface ModuleDeclarationNode extends SyntaxNode<LiteralToken | IdentifierToken> {
	type: 'nbtdoc:module_declaration',
	identifier: IdentifierToken,
}

export interface UseClauseNode extends SyntaxNode<LiteralToken | IdentPathToken> {
	type: 'nbtdoc:use_clause',
	isExport: boolean,
	path: IdentPathToken,
}

export type ContentNode =
	| CommentNode
	| CompoundDefinitionNode
	| EnumDefinitionNode
	| ModuleDeclarationNode
	| UseClauseNode
	| DescribesClauseNode
	| InjectClauseNode

export interface MainNode extends SyntaxNode {
	type: 'nbtdoc:main',
	children: ContentNode[],
}

export type LeafNode =
	| LiteralToken
	| IdentifierToken
	| ResourceLocationNode
	| Primitive
	| CommentNode
	| CompoundFieldTypeNode

export const ExtendableRootRegistryMap = {
	'minecraft:block': 'block',
	'minecraft:entity': 'entity_type',
	'minecraft:item': 'item',
	'minecraft:storage': 'storage',
} as const
export const ExtendableRootRegistries = Object.keys(ExtendableRootRegistryMap) as (keyof typeof ExtendableRootRegistryMap)[]

export const RootRegistryMap = {
	...ExtendableRootRegistryMap,
	'custom:blockitemstates': 'custom:blockitemstates',
	'custom:blockstates': 'custom:blockstates',
	'custom:spawnitemtag': 'custom:spawnitemtag',
} as const
export const RootRegistries = Object.keys(RootRegistryMap) as (keyof typeof RootRegistryMap)[]
export type ResolvedRootRegistry = (typeof RootRegistryMap)[keyof typeof RootRegistryMap]

export const IdRegistryMap = {
	'minecraft:attribute': 'attribute',
	'minecraft:block': 'block',
	'minecraft:block_entity': 'block_entity_type',
	'minecraft:dimension': 'dimension',
	'minecraft:enchantment': 'enchantment',
	'minecraft:entity': 'entity_type',
	'minecraft:item': 'item',
	'minecraft:loot_table': 'loot_table',
	'minecraft:motive': 'motive',
	'minecraft:potion': 'potion',
	'minecraft:recipe': 'recipe',
	'minecraft:structure': 'structure',
	'minecraft:villager_profession': 'villager_profession',
	'minecraft:villager_type': 'villager_type',
} as const
export const IdRegistries = Object.keys(IdRegistryMap) as (keyof typeof IdRegistryMap)[]
export type ResolvedIdRegistry = (typeof IdRegistryMap)[keyof typeof IdRegistryMap]
