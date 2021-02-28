import { localize } from '@spyglassmc/locales'
import { ErrorNode } from '../node'
import { Range, Source } from '../source'
import { InfallibleParser } from './Parser'
import { ParserContext } from './ParserContext'

/**
 * Returns an error node containing all the remaining text (including whitespace),
 * or returns `null` if the `Source` has already reached its end.
 */
export const error: InfallibleParser<ErrorNode | null> = (src: Source, ctx: ParserContext): ErrorNode | null => {
	if (!src.canRead()) {
		return null
	}
	const ans: ErrorNode = {
		type: 'error',
		range: Range.create(src, () => src.skipRemaining()),
	}
	ctx.err.report(localize('error.unparseable-content'), ans)
	return ans
}
