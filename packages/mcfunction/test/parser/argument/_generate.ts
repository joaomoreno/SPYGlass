import * as fs from 'fs'
import * as path from 'path'
import { CommandArgumentTestSuites } from './_suites'

// Generates test files for each command argument parser with test suites from `./suites.ts`.
// It is super laggy to have a giant 80k-line snapshot file, hence why we separated the tests to multiple files.

const ShouldGenerate = false // Prevent from mis-triggering.

function template(parser: string): string {
	return `import { showWhitespaceGlyph, testParser } from '@spyglassmc/core/test-out/utils'
import { describe, it } from 'mocha'
import snapshot from 'snap-shot-it'
import { CommandArgumentTestSuites } from './_suites'
import { argument } from '../../../lib/parser'
import type { ArgumentTreeNode } from '../../../src/tree'

describe('mcfunction argument ${parser}', () => {
	for (const { content, properties } of CommandArgumentTestSuites['${parser}']!) {
		const treeNode: ArgumentTreeNode = {
			type: 'argument',
			parser: '${parser}',
			properties,
		}
		for (const string of content) {
			it(\`Parse "\${showWhitespaceGlyph(string)}"\${properties ? \` with \${JSON.stringify(properties)}\` : ''}\`, () => {
				snapshot(testParser(argument('test', treeNode), string))
			})
		}
	}
})
`
}

if (ShouldGenerate) {
	for (const parser of Object.keys(CommandArgumentTestSuites)) {
		fs.writeFileSync(
			path.join(__dirname, `${parser.replace(/[:_](\w)/g, (_, c) => (c as string).toUpperCase())}.spec.ts`),
			template(parser),
			{ encoding: 'utf-8' }
		)
	}
}

export { }
