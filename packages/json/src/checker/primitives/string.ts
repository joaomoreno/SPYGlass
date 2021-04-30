import type { AllCategory, Checker, Parser, ResourceLocationCategory, Returnable, TaggableResourceLocationCategory } from '@spyglassmc/core'
import * as core from '@spyglassmc/core'
import { AstNode, Color, Failure, Lazy, Range } from '@spyglassmc/core'
import { localize } from '@spyglassmc/locales'
import type { JsonExpectation, JsonNode } from '../../node'
import { JsonStringNode } from '../../node'
import type { JsonChecker, JsonCheckerContext } from '../JsonChecker'

export async function string(node: JsonNode, ctx: JsonCheckerContext) {
	node.expectation = [{ type: 'json:string', typedoc: 'String' }]
	if (!JsonStringNode.is(node)) {
		ctx.err.report(localize('expected', localize('string')), node)
	}
}

export function resource(id: TaggableResourceLocationCategory, allowTag?: boolean): JsonChecker
export function resource(id: ResourceLocationCategory | string[], allowTag?: false): JsonChecker
export function resource(id: ResourceLocationCategory | string[], allowTag = false): JsonChecker {
	return special(id, core.resourceLocation(typeof id === 'string' ? { category: id as any, allowTag } : { pool: id }))
}

export function literal(value: AllCategory | string[]): JsonChecker {
	return special(value, typeof value === 'string'
		? core.symbol(value)
		: core.literal(...value)
	)
}

export function stringColor(): JsonChecker {
	const HexPattern = /^[0-9a-f]{1,6}$/i

	const parser: Parser<Color> = (src, ctx) => {
		let value = 0
		const start = src.cursor
		if (src.trySkip('#')) {
			const remaining = src.readRemaining()
			if (remaining.match(HexPattern)) {
				value = parseInt(remaining, 16)
			} else {
				ctx.err.report(localize('expected', localize('json.checker.string.hex-color')), Range.create(start, src))
			}
		} else {
			const remaining = src.readRemaining()
			if (Color.NamedColors.has(remaining)) {
				value = Color.NamedColors.get(remaining)!
			} else {
				ctx.err.report(localize('expected', Color.ColorNames), Range.create(start, src))
			}
		}
		return Color.fromCompositeInt(value)
	}

	return special('color', parser, undefined, { pool: Color.ColorNames }, 'color')
}

export function special(name: string | string[], parser?: Lazy<Parser<Returnable>>, checker?: Lazy<Checker<AstNode>>, expectation?: Partial<JsonExpectation>, store: 'color' | 'valueNode' = 'valueNode'): JsonChecker {
	return (node, ctx) => {
		node.expectation = [{ type: 'json:string', typedoc: typedoc(name), ...expectation }]
		if (!JsonStringNode.is(node)) {
			ctx.err.report(localize('expected', localize('string')), node)
		} else if (parser) {
			const result = core.parseStringValue(Lazy.resolve(parser), node.value, node.valueMap, ctx)
			if (result !== Failure) {
				node[store] = result as any
				if (checker && AstNode.is(result)) {
					Lazy.resolve(checker)(result, ctx)
				}
			}
		}
	}
}

function typedoc(id: string | string[]) {
	return typeof id === 'string'
		? `String("${id}")`
		: id.length <= 10
			? id.map(e => `"${e}"`).join(' | ')
			: `${id.slice(0, 10).map(e => `"${e}"`).join(' | ')} | ...`
}
