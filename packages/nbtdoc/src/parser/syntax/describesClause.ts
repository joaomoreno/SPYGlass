import type { CommentNode, Parser } from '@spyglassmc/core'
import { map, optional } from '@spyglassmc/core'
import type { DescribesClauseNode, LiteralToken} from '../../node'
import { IdentPathToken, MinecraftIdentifierToken } from '../../node'
import { identPath, keyword, marker, minecraftIdentifier, punctuation } from '../terminator'
import { syntax, syntaxRepeat } from '../util'

type ChildNode = IdentPathToken | LiteralToken | MinecraftIdentifierToken | CommentNode

/**
 * `Failure` when there isn't the `describes` keyword.
 */
export function describesClause(): Parser<DescribesClauseNode> {
	return map(
		syntax<ChildNode>([
			identPath(),
			keyword('describes'),
			minecraftIdentifier(),
			optional(syntax<ChildNode>([
				marker('['),
				minecraftIdentifier(),
				syntaxRepeat<ChildNode>(syntax<ChildNode>([
					marker(','),
					minecraftIdentifier(),
				])),
				punctuation(']'),
			])),
			punctuation(';'),
		]),
		res => {
			const mcIds = res.children.filter(MinecraftIdentifierToken.is)
			const ans: DescribesClauseNode = {
				type: 'nbtdoc:describes_clause',
				range: res.range,
				children: res.children,
				path: res.children.find(IdentPathToken.is)!,
				registry: mcIds[0],
				objects: mcIds.length > 1 ? mcIds.slice(1) : null,
			}
			return ans
		}
	)
}
