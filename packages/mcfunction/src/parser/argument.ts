import * as core from '@spyglassmc/core'
import { localeQuote, localize } from '@spyglassmc/locales'
import type { ArgumentNode, CoordinateNode, EntitySelectorArgumentsNode, EntitySelectorNode, MinecraftEntityArgumentNode, MinecraftFloatRangeArgumentNode, MinecraftIntRangeArgumentNode, MinecraftUuidArgumentNode, SpyglassmcUnknownArgumentNode, VectorBaseNode } from '../node'
import { CoordinateSystem, EntitySelectorVariables, MinecraftTimeArgumentNode } from '../node'
import type { ArgumentTreeNode } from '../tree/type'
import { sep } from './common'

const IntegerPattern = /^-?\d+$/

/**
 * A combination of:
 * - https://github.com/Mojang/brigadier/blob/cf754c4ef654160dca946889c11941634c5db3d5/src/main/java/com/mojang/brigadier/StringReader.java#L137
 * - https://docs.oracle.com/javase/7/docs/api/java/lang/Double.html#valueOf(java.lang.String)
 * 
 * i.e. Only `[0-9\.\-]` is allowed in the number, and its format must follow The Java™ Language Specification.
 * 
 * i.e. 
 * ```
 * [NegativeSign] Digits [`.`] [Digits] |
 * [NegativeSign] `.` Digits
 * ```
 */
const FloatPattern = /^-?(?:\d+\.?\d*|\.\d+)$/

const DoubleMax = Number.MAX_VALUE
const DoubleMin = -DoubleMax
const FloatMax = (2 - (2 ** -23)) * (2 ** 127)
const FloatMin = -FloatMax
const IntegerMax = 2 ** 31 - 1
const IntegerMin = -(2 ** 31)
const LongMax = 9223372036854775807n
const LongMin = -9223372036854775808n

/**
 * @returns The parser for the specified argument tree node. All argument parsers used in the `mcfunction` package
 * fail on empty input.
 */
export function argument(name: string, treeNode: ArgumentTreeNode): core.Parser<ArgumentNode> {
	const wrap = <T extends core.AstNode>(parser: core.Parser<T>): core.Parser<ArgumentNode> => core.map(
		core.failOnEmpty<T>(parser),
		res => ({
			...res,
			type: `mcfunction:argument/${treeNode.parser}`,
			name,
			hover: `\`${argumentTreeNodeToString(name, treeNode)}\``,
		} as ArgumentNode)
	)

	switch (treeNode.parser) {
		case 'brigadier:bool':
			return wrap(core.boolean)
		case 'brigadier:double':
			return wrap(double(treeNode.properties?.min, treeNode.properties?.max))
		case 'brigadier:float':
			return wrap(float(treeNode.properties?.min, treeNode.properties?.max))
		case 'brigadier:integer':
			return wrap(integer(treeNode.properties?.min, treeNode.properties?.max))
		case 'brigadier:long':
			return wrap(long(treeNode.properties?.min, treeNode.properties?.max))
		case 'brigadier:string':
			switch (treeNode.properties.type) {
				case 'word':
					return wrap(core.string({
						unquotable: core.BrigadierUnquotablePattern,
					}))
				case 'phrase':
					return wrap(core.brigadierString)
				case 'greedy':
				default:
					return wrap(core.string({
						unquotable: /^[^\r\n]+$/,
					}))
			}
		case 'minecraft:angle':
			return wrap(core.validate(
				coordinate(),
				res => res.notation !== '^',
				localize('mcfunction.parser.vector.local-disallowed')
			))
		case 'minecraft:block_pos':
			return wrap(vector(3, true))
		case 'minecraft:color':
			return wrap(core.map(
				core.literal(
					...core.Color.ColorNames,
					'reset'
				),
				res => ({
					...res,
					color: core.Color.NamedColors.has(res.value)
						? core.Color.fromCompositeInt(core.Color.NamedColors.get(res.value)!)
						: undefined,
				})
			))
		case 'minecraft:column_pos':
			return wrap(vector(2, true))
		case 'minecraft:component':
			return wrap(core.MetaRegistry.instance.getParser('json:entry'))
		case 'minecraft:dimension':
			return wrap(core.resourceLocation({
				category: 'dimension',
			}))
		case 'minecraft:entity_anchor':
			return wrap(core.literal('feet', 'eyes'))
		case 'minecraft:entity_summon':
			return wrap(core.resourceLocation({
				category: 'entity_type',
			}))
		case 'minecraft:float_range':
			return wrap(range('float'))
		case 'minecraft:function':
			return wrap(core.resourceLocation({
				category: 'function',
				allowTag: true,
			}))
		case 'minecraft:int_range':
			return wrap(range('integer'))
		case 'minecraft:item_enchantment':
			return wrap(core.resourceLocation({
				category: 'enchantment',
			}))
		case 'minecraft:item_slot':
			return wrap(core.literal(
				...[...Array(54).keys()].map(n => `container.${n}`),
				...[...Array(27).keys()].map(n => `enderchest.${n}`),
				...[...Array(15).keys()].map(n => `horse.${n}`),
				...[...Array(9).keys()].map(n => `hotbar.${n}`),
				...[...Array(27).keys()].map(n => `inventory.${n}`),
				...[...Array(8).keys()].map(n => `villager.${n}`),
				'armor.chest', 'armor.feet', 'armor.head', 'armor.legs',
				'horse.armor', 'horse.chest', 'horse.saddle',
				'weapon', 'weapon.mainhand', 'weapon.offhand',
			))
		case 'minecraft:mob_effect':
			return wrap(core.resourceLocation({
				category: 'mob_effect',
			}))
		case 'minecraft:nbt_compound_tag':
			return wrap(core.MetaRegistry.instance.getParser('nbt:compound'))
		case 'minecraft:nbt_tag':
			return wrap(core.MetaRegistry.instance.getParser('nbt:entry'))
		case 'minecraft:objective':
			return wrap(core.symbol({
				category: 'objective',
			}))
		case 'minecraft:operation':
			return wrap(core.literal({
				pool: ['=', '+=', '-=', '*=', '/=', '%=', '<', '>', '><'],
				colorTokenType: 'operator',
			}))
		case 'minecraft:resource_location':
			return wrap(core.resourceLocation(treeNode.properties ?? {
				pool: [],
				allowUnknown: true,
			}))
		case 'minecraft:rotation':
			return wrap(vector(2, undefined, true))
		case 'minecraft:scoreboard_slot':
			// `BeLOWnaME` and `sidebar.team.R--.+++e----__d` are also legal slots.
			// But I do not want to spend time supporting them.
			return wrap(core.literal(
				'belowName', 'list', 'sidebar',
				...core.Color.ColorNames.map(n => `sidebar.team.${n}`),
			))
		case 'minecraft:swizzle':
			return wrap(core.literal(
				'x', 'xy', 'xz', 'xyz', 'xzy',
				'y', 'yx', 'yz', 'yxz', 'yzx',
				'z', 'zx', 'zy', 'zxy', 'zyx',
			))
		case 'minecraft:team':
			return wrap(core.symbol({
				category: 'team',
			}))
		case 'minecraft:time':
			return wrap(time)
		case 'minecraft:uuid':
			return wrap(uuid)
		case 'minecraft:vec2':
			return wrap(vector(2, undefined, true))
		case 'minecraft:vec3':
			return wrap(vector(3))
		case 'spyglassmc:symbol':
			return wrap(core.symbol(treeNode.properties))
		case 'minecraft:block_predicate':
		case 'minecraft:block_state':
		case 'minecraft:entity':
		case 'minecraft:game_profile':
		case 'minecraft:item_predicate':
		case 'minecraft:item_stack':
		case 'minecraft:message':
		case 'minecraft:nbt_path':
		case 'minecraft:objective_criteria':
		case 'minecraft:particle':
		case 'minecraft:score_holder':
		default:
			// Unknown parser. Accept everything from here and add a hint.
			return wrap((src, ctx): SpyglassmcUnknownArgumentNode => {
				const start = src.cursor
				const value = src.readUntilLineEnd()
				const range = core.Range.create(start, src.cursor)
				ctx.err.report(
					localize('mcfunction.parser.unknown-parser', localeQuote(treeNode.parser)),
					range,
					core.ErrorSeverity.Hint
				)
				return {
					type: 'mcfunction:argument/spyglassmc:unknown',
					range,
					name,
					value,
				}
			})
	}
}

function double(min = DoubleMin, max = DoubleMax): core.InfallibleParser<core.FloatNode> {
	return core.float({
		pattern: FloatPattern,
		min,
		max,
	})
}

function float(min = FloatMin, max = FloatMax): core.InfallibleParser<core.FloatNode> {
	return core.float({
		pattern: FloatPattern,
		min,
		max,
	})
}

function integer(min = IntegerMin, max = IntegerMax): core.InfallibleParser<core.IntegerNode> {
	return core.integer({
		pattern: IntegerPattern,
		min,
		max,
	})
}

function long(min?: number, max?: number): core.InfallibleParser<core.LongNode> {
	return core.long({
		pattern: IntegerPattern,
		min: BigInt(min ?? LongMin),
		max: BigInt(max ?? LongMax),
	})
}

function coordinate(integerOnly = false): core.InfallibleParser<CoordinateNode> {
	return (src, ctx): CoordinateNode => {
		const ans: core.Mutable<CoordinateNode> = {
			type: 'mcfunction:coordinate',
			notation: '',
			range: core.Range.create(src),
			value: 0,
		}

		if (src.trySkip('^')) {
			ans.notation = '^'
		} else if (src.trySkip('~')) {
			ans.notation = '~'
		}

		if ((src.canReadInLine() && src.peek() !== ' ') || ans.notation === '') {
			const result = (integerOnly && ans.notation === '' ? integer : double)()(src, ctx)
			ans.value = Number(result.value)
		}

		ans.range.end = src.cursor

		return ans
	}
}

function entity(): core.InfallibleParser<MinecraftEntityArgumentNode> {
	throw ''
}

// function item(allowTag: boolean): core.InfallibleParser<MinecraftItemStackArgumentNode> {

// }

function range(type: 'float'): core.Parser<MinecraftFloatRangeArgumentNode>
function range(type: 'integer'): core.Parser<MinecraftIntRangeArgumentNode>
function range(type: 'float' | 'integer'): core.Parser<MinecraftFloatRangeArgumentNode | MinecraftIntRangeArgumentNode> {
	const number: core.Parser<core.FloatNode | core.IntegerNode> = type === 'float' ? float() : integer()
	const min = core.failOnEmpty(core.stopBefore(number, '..'))
	const sep = core.failOnEmpty(core.literal({ pool: ['..'], colorTokenType: 'keyword' }))
	const max = core.failOnEmpty(number)
	return core.map(
		core.any<core.SequenceUtil<core.FloatNode | core.IntegerNode | core.LiteralNode>>([
			/* exactly */ core.sequence([min]),
			/* atLeast */ core.sequence([min, sep]),
			/* atMost  */ core.sequence([sep, max]),
			/* between */ core.sequence([min, sep, max]),
		]),
		res => {
			const valueNodes = type === 'float'
				? res.children.filter(core.FloatNode.is)
				: res.children.filter(core.IntegerNode.is)
			const sepNode = res.children.find(core.LiteralNode.is)
			return {
				type: type === 'float' ? 'mcfunction:argument/minecraft:float_range' : 'mcfunction:argument/minecraft:int_range',
				range: res.range,
				children: res.children as any,
				name: '',
				value: sepNode
					? valueNodes.length === 2
						? [valueNodes[0].value, valueNodes[1].value]
						: core.Range.endsBefore(valueNodes[0].range, sepNode.range.start)
							? [valueNodes[0].value, null]
							: [null, valueNodes[0].value]
					: [valueNodes[0].value, valueNodes[0].value],
			}
		}
	)
}

const selector: core.Parser<EntitySelectorNode> = core.map<core.SequenceUtil<core.LiteralNode | EntitySelectorArgumentsNode>, EntitySelectorNode>(
	core.sequence([
		core.failOnEmpty(core.literal({ pool: EntitySelectorVariables.map(v => `@${v}`), colorTokenType: 'keyword' })),
		core.optional(core.map<core.TableNode<core.StringNode, core.AstNode>, EntitySelectorArgumentsNode>(
			core.failOnEmpty(core.table({
				start: '[',
				pair: {
					key: core.brigadierString,
					sep: '=',
					value: {
						get: (table, key) => {
							switch (key?.value) {
								case 'advancements':
									throw '// TODO'
								case 'distance':
									throw '// TODO'
								case 'gamemode':
									throw '// TODO'
								case 'limit':
									throw '// TODO'
								case 'level':
									throw '// TODO'
								case 'name':
									throw '// TODO'
								case 'nbt':
									throw '// TODO'
								case 'predicate':
									throw '// TODO'
								case 'scores':
									throw '// TODO'
								case 'sort':
									throw '// TODO'
								case 'tag':
									throw '// TODO'
								case 'team':
									throw '// TODO'
								case 'type':
									throw '// TODO'
								case 'x':
									throw '// TODO'
								case 'y':
									throw '// TODO'
								case 'z':
									throw '// TODO'
								case 'dx':
									throw '// TODO'
								case 'dy':
									throw '// TODO'
								case 'dz':
									throw '// TODO'
								case 'x_rotation':
									throw '// TODO'
								case 'y_rotation':
									throw '// TODO'
								case undefined:
									// The key is empty. Let's just fail the value as well.
									return (): core.Result<never> => core.Failure
								default:
									// The key is unknown.
									return (_src, ctx): core.Result<never> => {
										ctx.err.report(localize('mcfunction.parser.entity-selector.arguments.unknown', localeQuote(key!.value)), key!)
										return core.Failure
									}
							}
						},
					},
					end: ',',
					trailingEnd: true,
				},
				end: ']',
			})),
			res => {
				const ans: EntitySelectorArgumentsNode = {
					...res,
					type: 'mcfunction:entity_selector/arguments',
				}
				return ans
			}
		)),
	]),
	res => {
		const ans: EntitySelectorNode = {
			...res,
			type: 'mcfunction:entity_selector',
		}
		return ans
	}
)

const time: core.InfallibleParser<MinecraftTimeArgumentNode> = core.map(
	core.sequence([float(0, undefined), core.optional(core.failOnEmpty(core.literal(...MinecraftTimeArgumentNode.Units)))]),
	res => {
		const valueNode = res.children.find(core.FloatNode.is)!
		const unitNode = res.children.find(core.LiteralNode.is)
		const ans: MinecraftTimeArgumentNode = {
			type: 'mcfunction:argument/minecraft:time',
			range: res.range,
			children: res.children,
			name: '',
			value: valueNode.value,
			unit: unitNode?.value,
		}
		return ans
	}
)

const uuid: core.InfallibleParser<MinecraftUuidArgumentNode> = (src, ctx): MinecraftUuidArgumentNode => {
	const ans: MinecraftUuidArgumentNode = {
		type: 'mcfunction:argument/minecraft:uuid',
		range: core.Range.create(src),
		name: '',
		bits: [0n, 0n],
	}

	const raw = src.readUntil(' ', '\r', '\n', '\r')

	/**
	 * According to the implementation of Minecraft's UUID parser and Java's `UUID#fromString` method,
	 * only strings that don't have five parts and strings where any part exceed the maximum Long value are
	 * considered invalid.
	 * 
	 * http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/default/src/share/classes/java/util/UUID.java
	 */
	let isLegal = false
	if (raw.match(/^[0-9a-f]+-[0-9a-f]+-[0-9a-f]+-[0-9a-f]+-[0-9a-f]+$/i)) {
		try {
			const parts = raw.split('-').map(p => BigInt(`0x${p}`))
			if (parts.every(p => p <= LongMax)) {
				isLegal = true
				ans.bits[0] = BigInt.asIntN(64, (parts[0] << 32n) | (parts[1] << 16n) | parts[2])
				ans.bits[1] = BigInt.asIntN(64, (parts[3] << 48n) | parts[4])
			}
		} catch (e) {
			// Ignored.
		}
	}

	ans.range.end = src.cursor

	if (!isLegal) {
		ctx.err.report(localize('mcfunction.parser.uuid.invalid'), ans)
	}

	return ans
}

function vector(dimension: 2 | 3, integerOnly = false, noLocal = false): core.InfallibleParser<VectorBaseNode> {
	return (src, ctx): VectorBaseNode => {
		const ans: VectorBaseNode = {
			type: '',
			range: core.Range.create(src),
			children: [],
			dimension,
			system: CoordinateSystem.World,
		}

		if (src.peek() === '^') {
			ans.system = CoordinateSystem.Local
		}

		for (let i = 0; i < dimension; i++) {
			if (i > 0) {
				sep(src, ctx)
			}
			const coord = integerOnly ? coordinate(integerOnly)(src, ctx) : coordinate(integerOnly)(src, ctx)
			ans.children.push(coord as never)

			if ((ans.system === CoordinateSystem.Local) !== (coord.notation === '^')) {
				ctx.err.report(localize('mcfunction.parser.vector.mixed'), coord)
			}
		}

		if (noLocal && ans.system === CoordinateSystem.Local) {
			ctx.err.report(localize('mcfunction.parser.vector.local-disallowed'), ans)
		}

		return ans
	}
}

export function argumentTreeNodeToString(name: string, treeNode: ArgumentTreeNode): string {
	const parserName = treeNode.parser === 'spyglassmc:symbol'
		? treeNode.properties.category
		: treeNode.parser.slice(treeNode.parser.indexOf(':') + 1)
	return `<${name}: ${parserName}>`
}
