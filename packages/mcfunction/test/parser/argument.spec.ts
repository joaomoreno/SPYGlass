import { showWhitespaceGlyph, testParser } from '@spyglassmc/core/test-out/utils'
import { describe, it } from 'mocha'
import snapshot from 'snap-shot-it'
import { argument } from '../../lib/parser'
import type { ArgumentTreeNode } from '../../src/tree'

describe.only('mcfunction argument', () => {
	const suites: { parser: ArgumentTreeNode['parser'], cases: { properties?: any, content: string[] }[] }[] = [
		{
			parser: 'brigadier:bool',
			cases: [
				{ content: ['false', 'true'] },
			],
		},
		{
			parser: 'brigadier:double',
			cases: [
				{ content: ['0', '1.2', '.5', '-1', '-.5', '-1234.56'] },
			],
		},
		{
			parser: 'brigadier:float',
			cases: [
				{ content: ['0', '1.2', '.5', '-1', '-.5', '-1234.56'] },
			],
		},
		{
			parser: 'brigadier:integer',
			cases: [
				{ content: ['0', '123', '-123'] },
			],
		},
		{
			parser: 'brigadier:long',
			cases: [
				{ content: ['0', '123', '-123'] },
			],
		},
		{
			parser: 'brigadier:string',
			cases: [
				{ properties: { type: 'word' }, content: ['word', 'word_with_underscores'] },
				{ properties: { type: 'phrase' }, content: ['"quoted phrase"', 'word', '""'] },
				{ properties: { type: 'greedy' }, content: ['word', 'words with spaces', '"and symbols"'] },
			],
		},
		{
			parser: 'minecraft:angle',
			cases: [
				{ content: ['0', '~', '~-0.5', '^'] },
			],
		},
		{
			parser: 'minecraft:block_pos',
			cases: [
				{
					content: [
						'0 0 0',
						'~ ~ ~',
						'^ ^ ^',
						'^1 ^ ^-5',
						'~0.5 ~1 ~-5',
						'0.5 0 0.5',
					],
				},
			],
		},
		{
			parser: 'minecraft:color',
			cases: [
				{ content: ['red', 'green'] },
			],
		},
		{
			parser: 'minecraft:column_pos',
			cases: [
				{ content: ['0 0', '~ ~', '~1 ~-2'] },
			],
		},
		{
			parser: 'minecraft:dimension',
			cases: [
				{ content: ['minecraft:overworld', 'minecraft:the_nether'] },
			],
		},
		{
			parser: 'minecraft:entity_anchor',
			cases: [
				{ content: ['eyes', 'feet'] },
			],
		},
		{
			parser: 'minecraft:entity_summon',
			cases: [
				{ content: ['minecraft:pig', 'cow'] },
			],
		},
		{
			parser: 'minecraft:float_range',
			cases: [
				{ content: ['0..5.2', '0', '-5.4', '-100.76..', '..100', '..'] },
			],
		},
		{
			parser: 'minecraft:function',
			cases: [
				{ content: ['foo', 'foo:bar', '#foo'] },
			],
		},
		{
			parser: 'minecraft:int_range',
			cases: [
				{ content: ['0..5', '0', '-5', '-100..', '..100', '..'] },
			],
		},
		{
			parser: 'minecraft:item_enchantment',
			cases: [
				{ content: ['unbreaking', 'silk_touch'] },
			],
		},
		{
			parser: 'minecraft:item_slot',
			cases: [
				{ content: ['container.5', 'weapon'] },
			],
		},
		{
			parser: 'minecraft:mob_effect',
			cases: [
				{ content: ['spooky', 'effect'] },
			],
		},
		// {
		// 	parser: 'minecraft:nbt_compound_tag',
		// 	cases: [
		// 		{ content: ['{}', '{foo:bar}'] },
		// 	],
		// },
		// {
		// 	parser: 'minecraft:nbt_tag',
		// 	cases: [
		// 		{ content: ['0', '0b', '0l', '0.0', '"foo"', '{foo:bar}'] },
		// 	],
		// },
		{
			parser: 'minecraft:objective',
			cases: [
				{ content: ['foo', '*', '012'] },
			],
		},
		{
			parser: 'minecraft:operation',
			cases: [
				{ content: ['=', '>', '<'] },
			],
		},
		{
			parser: 'minecraft:resource_location',
			cases: [
				{ content: ['foo', 'foo:bar', '012'] },
				{ properties: { category: 'bossbar' }, content: ['foo', 'foo:bar', '012'] },
			],
		},
		{
			parser: 'minecraft:rotation',
			cases: [
				{ content: ['0 0', '~ ~', '~-5 ~5'] },
			],
		},
		{
			parser: 'minecraft:swizzle',
			cases: [
				{ content: ['xyz', 'x'] },
			],
		},
		{
			parser: 'minecraft:team',
			cases: [
				{ content: ['foo', '123'] },
			],
		},
		{
			parser: 'minecraft:time',
			cases: [
				{ content: ['0d', '0s', '0t', '0', '0foo'] },
			],
		},
		{
			parser: 'minecraft:uuid',
			cases: [
				{ content: ['dd12be42-52a9-4a91-a8a1-11c01849e498', '1-1-1-1-1', '42', 'ffffffffffffffff-1-1-1-1', 'fffffffffffffff-1-1-1-1'] },
			],
		},
		{
			parser: 'minecraft:vec2',
			cases: [
				{ content: ['0 0', '~ ~', '0.1 -0.5', '~1 ~-2'] },
			],
		},
		{
			parser: 'minecraft:vec3',
			cases: [
				{ content: ['0 0 0', '~ ~ ~', '^ ^ ^', '^1 ^ ^-5', '0.1 -0.5 .9', '~0.5 ~1 ~-5'] },
			],
		},
		{
			parser: 'spyglassmc:symbol',
			cases: [
				{ properties: { category: 'team' }, content: ['foo'] },
			],
		},
	]
	for (const { parser, cases } of suites) {
		describe(parser, () => {
			for (const { content, properties } of cases) {
				const treeNode: ArgumentTreeNode = {
					type: 'argument',
					parser: parser as any,
					properties,
				}
				for (const string of content) {
					it(`Parse "${showWhitespaceGlyph(string)}"${properties ? ` with ${JSON.stringify(properties)}` : ''}`, () => {
						snapshot(testParser(argument('test', treeNode), string))
					})
				}
			}
		})
	}
})
