import { describe, it } from 'mocha'
import snapshot from 'snap-shot-it'
import { dissectUri } from '../../../lib/binder'

describe('dissectUri()', () => {
	const roots = ['file:///']
	const suites: { uri: string }[] = [
		{ uri: 'file:///data/minecraft/loot_tables/foo.json' },
		{ uri: 'file:///data/minecraft/tags/blocks/bar.json' },
		{ uri: 'file:///data/qux/dimension/foo/baz.json' },
		{ uri: 'file:///data/minecraft/advancements/data/foo/predicates/bar.json' },
		{ uri: 'file:///pack.mcmeta' },
		{ uri: 'file:///data/loot_tables/foo.json' },
		{ uri: 'file:///data/minecraft/entities/foo.json' },
	]
	for (const { uri } of suites) {
		it(`Dissect Uri "${uri}"`, () => {
			snapshot(dissectUri(uri, roots) ?? 'null')
		})
	}
})
