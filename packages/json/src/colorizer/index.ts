import type { ColorTokenType } from '@spyglassmc/core'
import { ColorToken, IndexMap, Range, traverseLeaves } from '@spyglassmc/core'
import { entry as nbtColorizer } from '@spyglassmc/nbt/lib/colorizer'
import type { NbtNode } from '@spyglassmc/nbt/lib/node'
import type { JsonNode } from '../node'
import { JsonPropertyNode } from '../node'

export function entry(root: JsonNode): readonly ColorToken[] {
	const ans: ColorToken[] = []
	traverseLeaves(root, (astNode, [parent]) => {
		const node = (astNode as JsonNode)
		let type: ColorTokenType | undefined
		switch(node.type) {
			case 'json:number':
				type = 'number'
				break
			case 'json:boolean':
				type = 'modifier'
				break
			case 'json:string':
				if (JsonPropertyNode.is(parent) && node.range.start === parent.key.range.start) {
					type = 'property'
				} else if (node.expectation?.find(e => e.type === 'json:string' && e.resource)) {
					type = 'resourceLocation'
				} else if (node.valueNode) {
					const mapping = IndexMap.create({
						outerRange: {
							start: node.range.start + 1,
							end: node.range.end - 1,
						},
						innerRange: Range.create(0, node.value.length),
					})
					let tokens: Readonly<ColorToken[]> = []
					switch (node.valueNode.type) {
						case 'nbt:compound':
							tokens = nbtColorizer(node.valueNode as NbtNode)
							break
					}
					ans.push(...toOuterColorTokens(tokens, mapping))
				} else {
					type = 'string'
				}
		}
		if (type !== undefined) {
			ans.push(ColorToken.create(node, type))
		}
	})
	return Object.freeze(ans)
}

function toOuterColorTokens(tokens: Readonly<ColorToken[]>, mapping: IndexMap) {
	return tokens.map<ColorToken>(token => ({
		...token,
		range: IndexMap.toOuterRange(mapping, token.range),
	}))
}
