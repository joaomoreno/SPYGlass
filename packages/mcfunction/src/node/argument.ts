import type * as core from '@spyglassmc/core'
import type * as nbt from '@spyglassmc/nbt'
import type { CommandChildBaseNode, CommandChildNodeExtender } from './command'

export interface BlockStatesNode extends core.TableNode<core.StringNode, core.StringNode> {
	type: 'mcfunction:block/states'
}
export namespace BlockStatesNode {
	/* istanbul ignore next */
	export function is(node: core.AstNode): node is BlockStatesNode {
		return (node as BlockStatesNode).type === 'mcfunction:block/states'
	}
}
export interface BlockBaseNode extends CommandChildBaseNode {
	children: (core.ResourceLocationNode | BlockStatesNode | nbt.NbtCompoundNode)[],
	id: core.ResourceLocationNode,
	states?: BlockStatesNode,
	nbt?: nbt.NbtCompoundNode,
}

export const CoordinateNotations = ['', '~', '^'] as const
export type CoordinateNodeNotation = typeof CoordinateNotations[number]

export interface CoordinateNodeExtender {
	notation: CoordinateNodeNotation,
}
export interface CoordinateBaseNode extends core.FloatBaseNode, CoordinateNodeExtender { }
export interface CoordinateNode extends CoordinateBaseNode {
	type: 'mcfunction:coordinate',
}
export namespace CoordinateNode {
	/**
	 * @returns A number in the range `[-180.0, 180.0)`.
	 */
	export function toDegree(node: CoordinateNode): number {
		// TODO: For relative coordinates, const value = (node.value + baseCoordinate) % 360
		const value = Number(typeof node.value === 'bigint' ? node.value % 360n : node.value % 360)
		return value >= 180
			? value - 360
			: value < -180 ? value + 360 : value
	}
}

export const enum CoordinateSystem {
	World = 0,
	Local = 1,
}

export interface EntitySelectorAdvancementsArgumentCriteriaNode extends core.TableNode<core.StringNode, core.BooleanNode> {
	type: 'mcfunction:entity_selector/arguments/advancements/criteria'
}
export interface EntitySelectorAdvancementsArgumentNode extends core.TableNode<core.ResourceLocationNode, core.BooleanNode | EntitySelectorAdvancementsArgumentCriteriaNode> {
	type: 'mcfunction:entity_selector/arguments/advancements'
}
export interface EntitySelectorScoresArgumentNode extends core.TableNode<core.SymbolNode, MinecraftIntRangeArgumentNode> {
	type: 'mcfunction:entity_selector/arguments/scores'
}
export interface EntitySelectorInvertableArgumentValueNode<T extends core.AstNode> extends core.SequenceNode<core.LiteralNode | T> {
	type: 'mcfunction:entity_selector/arguments/value/invertable',
	value: T,
	inverted: boolean,
}
export interface EntitySelectorArgumentsNode extends core.TableNode<core.StringNode, any> {
	type: 'mcfunction:entity_selector/arguments'
}
export namespace EntitySelectorArgumentsNode {
	/* istanbul ignore next */
	export function is(node: core.AstNode): node is EntitySelectorArgumentsNode {
		return (node as EntitySelectorArgumentsNode).type === 'mcfunction:entity_selector/arguments'
	}
}
export const EntitySelectorVariables = ['p', 'a', 'r', 's', 'e']
export type EntitySelectorVariable = typeof EntitySelectorVariables[number]
export const EntitySelectorAtVariables = ['@p', '@a', '@r', '@s', '@e']
export type EntitySelectorAtVariable = typeof EntitySelectorAtVariables[number]
export namespace EntitySelectorVariable {
	/* istanbul ignore next */
	export function is(value: string): value is EntitySelectorVariable {
		return EntitySelectorVariables.includes(value)
	}
}
export interface EntitySelectorNode extends core.SequenceNode<core.LiteralNode | EntitySelectorArgumentsNode> {
	type: 'mcfunction:entity_selector',
	variable?: EntitySelectorVariable,
	argument?: EntitySelectorArgumentsNode,
	currentEntity?: boolean,
	dimensionLimited?: boolean,
	playersOnly?: boolean,
	predicates?: string[],
	chunkLimited?: boolean,
	single?: boolean,
	typeLimited?: boolean,
}
export namespace EntitySelectorNode {
	/* istanbul ignore next */
	export function is(node: core.AstNode): node is EntitySelectorNode {
		return (node as EntitySelectorNode).type === 'mcfunction:entity_selector'
	}
}
export interface EntityBaseNode extends CommandChildBaseNode {
	children: (core.StringNode | EntitySelectorNode | MinecraftUuidArgumentNode)[],
	playerName?: core.StringNode,
	selector?: EntitySelectorNode,
	uuid?: MinecraftUuidArgumentNode,
}

export interface ItemBaseNode extends CommandChildBaseNode {
	children: (core.ResourceLocationNode | nbt.NbtCompoundNode)[],
	id: core.ResourceLocationNode,
	nbt?: nbt.NbtCompoundNode,
}

export interface VectorNodeExtender {
	dimension: 2 | 3,
	system: CoordinateSystem,
}
export interface VectorBaseNode extends core.SequenceNode<CoordinateNode>, VectorNodeExtender { }

export interface BrigadierBoolArgumentNode extends CommandChildBaseNode, core.BooleanBaseNode {
	type: 'mcfunction:argument/brigadier:bool',
}
export interface BrigadierDoubleArgumentNode extends CommandChildBaseNode, core.FloatBaseNode {
	type: 'mcfunction:argument/brigadier:double',
}
export interface BrigadierFloatArgumentNode extends CommandChildBaseNode, core.FloatBaseNode {
	type: 'mcfunction:argument/brigadier:float',
}
export interface BrigadierIntegerArgumentNode extends CommandChildBaseNode, core.IntegerBaseNode {
	type: 'mcfunction:argument/brigadier:integer',
}
export interface BrigadierLongArgumentNode extends CommandChildBaseNode, core.LongBaseNode {
	type: 'mcfunction:argument/brigadier:long',
}
export interface BrigadierStringArgumentNode extends CommandChildBaseNode, core.StringBaseNode {
	type: 'mcfunction:argument/brigadier:string',
}
export interface MinecraftAngleArgumentNode extends CommandChildBaseNode, CoordinateBaseNode {
	type: 'mcfunction:argument/minecraft:angle',
}
export interface MinecraftBlockPosArgumentNode extends VectorBaseNode, CommandChildNodeExtender {
	type: 'mcfunction:argument/minecraft:block_pos',
}
export interface MinecraftBlockPredicateArgumentNode extends BlockBaseNode {
	type: 'mcfunction:argument/minecraft:block_predicate',
}
export interface MinecraftBlockStateArgumentNode extends BlockBaseNode {
	type: 'mcfunction:argument/minecraft:block_state',
}
export interface MinecraftColorArgumentNode extends CommandChildBaseNode, core.LiteralBaseNode {
	type: 'mcfunction:argument/minecraft:color',
}
export interface MinecraftColumnPosArgumentNode extends VectorBaseNode, CommandChildNodeExtender {
	type: 'mcfunction:argument/minecraft:column_pos',
}
export interface MinecraftComponentArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:component',
}
export interface MinecraftDimensionArgumentNode extends CommandChildBaseNode, core.ResourceLocationBaseNode {
	type: 'mcfunction:argument/minecraft:dimension',
}
export interface MinecraftEntityArgumentNode extends EntityBaseNode {
	type: 'mcfunction:argument/minecraft:entity',
}
export interface MinecraftEntityAnchorArgumentNode extends CommandChildBaseNode, core.LiteralBaseNode {
	type: 'mcfunction:argument/minecraft:entity_anchor',
}
export interface MinecraftEntitySummonArgumentNode extends CommandChildBaseNode, core.ResourceLocationBaseNode {
	type: 'mcfunction:argument/minecraft:entity_summon',
}
export interface MinecraftFloatRangeArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:float_range',
	children: (core.FloatNode | core.LiteralNode)[],
	value: [number | null, number | null],
}
export interface MinecraftFunctionArgumentNode extends CommandChildBaseNode, core.ResourceLocationBaseNode {
	type: 'mcfunction:argument/minecraft:function',
}
export interface MinecraftGameProfileArgumentNode extends EntityBaseNode {
	type: 'mcfunction:argument/minecraft:game_profile',
}
export interface MinecraftIntRangeArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:int_range',
	children: (core.IntegerNode | core.LiteralNode)[],
	value: [number | null, number | null],
}
export interface MinecraftItemEnchantmentArgumentNode extends CommandChildBaseNode, core.ResourceLocationBaseNode {
	type: 'mcfunction:argument/minecraft:item_enchantment',
}
export interface MinecraftItemPredicateArgumentNode extends ItemBaseNode {
	type: 'mcfunction:argument/minecraft:item_predicate',
}
export interface MinecraftItemSlotArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:item_slot',
}
export interface MinecraftItemStackArgumentNode extends ItemBaseNode {
	type: 'mcfunction:argument/minecraft:item_stack',
}
export interface MinecraftMessageArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:message',
	children: (core.StringNode | EntitySelectorNode)[],
}
export interface MinecraftMobEffectArgumentNode extends CommandChildBaseNode, core.ResourceLocationBaseNode {
	type: 'mcfunction:argument/minecraft:mob_effect',
}
export interface MinecraftNbtCompoundTagArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:nbt_compound_tag',
}
export interface MinecraftNbtPathArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:nbt_path',
}
export interface MinecraftNbtTagArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:nbt_tag',
}
export interface MinecraftObjectiveArgumentNode extends CommandChildBaseNode, core.SymbolBaseNode {
	type: 'mcfunction:argument/minecraft:objective',
}
export interface MinecraftObjectiveCriteriaArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:objective_criteria',
}
export interface MinecraftOperationArgumentNode extends CommandChildBaseNode, core.LiteralBaseNode {
	type: 'mcfunction:argument/minecraft:operation',
}
export interface MinecraftParticleArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:particle',
}
export interface MinecraftResourceLocationArgumentNode extends CommandChildBaseNode, core.ResourceLocationBaseNode {
	type: 'mcfunction:argument/minecraft:resource_location',
}
export interface MinecraftRotationArgumentNode extends VectorBaseNode, CommandChildNodeExtender {
	type: 'mcfunction:argument/minecraft:rotation',
}
export interface MinecraftScoreHolderArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:score_holder',
	children: (core.SymbolNode | EntitySelectorNode)[],
	fakeName?: core.SymbolNode,
	selector?: EntitySelectorNode,
}
export interface MinecraftScoreboardSlotArgumentNode extends CommandChildBaseNode, core.LiteralBaseNode {
	type: 'mcfunction:argument/minecraft:scoreboard_slot',
}
export interface MinecraftSwizzleArgumentNode extends CommandChildBaseNode, core.LiteralBaseNode {
	type: 'mcfunction:argument/minecraft:swizzle',
}
export interface MinecraftTeamArgumentNode extends CommandChildBaseNode, core.SymbolBaseNode {
	type: 'mcfunction:argument/minecraft:team',
}
export interface MinecraftTimeArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:time',
	children: (core.FloatNode | core.LiteralNode)[],
	value: number,
	unit?: string,
}
export namespace MinecraftTimeArgumentNode {
	export const UnitToTicks = new Map<string, number>([
		['', 1],
		['t', 1],
		['s', 20],
		['d', 24000],
	])
	export const Units = [...UnitToTicks.keys()]
}
export interface MinecraftUuidArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/minecraft:uuid',
	bits: [bigint, bigint],
}
export interface MinecraftVec2ArgumentNode extends VectorBaseNode, CommandChildNodeExtender {
	type: 'mcfunction:argument/minecraft:vec2',
}
export interface MinecraftVec3ArgumentNode extends VectorBaseNode, CommandChildNodeExtender {
	type: 'mcfunction:argument/minecraft:vec3',
}
export interface SpyglassmcSymbolArgumentNode extends CommandChildBaseNode, core.SymbolBaseNode {
	type: 'mcfunction:argument/spyglassmc:symbol',
}
export interface SpyglassmcTrailingArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/spyglassmc:trailing',
	value: string,
}
export interface SpyglassmcUnknownArgumentNode extends CommandChildBaseNode {
	type: 'mcfunction:argument/spyglassmc:unknown',
	value: string,
}

export type ArgumentNode =
	| BrigadierBoolArgumentNode
	| BrigadierDoubleArgumentNode
	| BrigadierFloatArgumentNode
	| BrigadierIntegerArgumentNode
	| BrigadierLongArgumentNode
	| BrigadierStringArgumentNode
	| MinecraftAngleArgumentNode
	| MinecraftBlockPosArgumentNode
	| MinecraftBlockPredicateArgumentNode
	| MinecraftBlockStateArgumentNode
	| MinecraftColorArgumentNode
	| MinecraftColumnPosArgumentNode
	| MinecraftComponentArgumentNode
	| MinecraftDimensionArgumentNode
	| MinecraftEntityArgumentNode
	| MinecraftEntityAnchorArgumentNode
	| MinecraftEntitySummonArgumentNode
	| MinecraftFloatRangeArgumentNode
	| MinecraftFunctionArgumentNode
	| MinecraftGameProfileArgumentNode
	| MinecraftIntRangeArgumentNode
	| MinecraftItemEnchantmentArgumentNode
	| MinecraftItemPredicateArgumentNode
	| MinecraftItemSlotArgumentNode
	| MinecraftItemStackArgumentNode
	| MinecraftMessageArgumentNode
	| MinecraftMobEffectArgumentNode
	| MinecraftNbtCompoundTagArgumentNode
	| MinecraftNbtPathArgumentNode
	| MinecraftNbtTagArgumentNode
	| MinecraftObjectiveArgumentNode
	| MinecraftObjectiveCriteriaArgumentNode
	| MinecraftOperationArgumentNode
	| MinecraftParticleArgumentNode
	| MinecraftResourceLocationArgumentNode
	| MinecraftRotationArgumentNode
	| MinecraftScoreHolderArgumentNode
	| MinecraftScoreboardSlotArgumentNode
	| MinecraftSwizzleArgumentNode
	| MinecraftTeamArgumentNode
	| MinecraftTimeArgumentNode
	| MinecraftUuidArgumentNode
	| MinecraftVec2ArgumentNode
	| MinecraftVec3ArgumentNode
	| SpyglassmcSymbolArgumentNode
	| SpyglassmcTrailingArgumentNode
	| SpyglassmcUnknownArgumentNode
