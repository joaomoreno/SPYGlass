import { localize } from '@spyglassmc/locales'
import type { IntegerNode, Mutable } from '../node'
import type { ParserContext } from '../service'
import { ErrorSeverity, Range, Source } from '../source'
import type { InfallibleParser, Parser, Result } from './Parser'
import { Failure } from './Parser'

interface OptionsBase {
	pattern: RegExp,
	/**
	 * Inclusive.
	 */
	min?: number,
	/**
	 * Inclusive.
	 */
	max?: number,
	/**
	 * A callback function that will be called when the numeral value is out of range.
	 * 
	 * Defaults to a function that marks an `Error` at the range of the node.
	 */
	onOutOfRange?: (ans: IntegerNode, src: Source, ctx: ParserContext, options: Options) => void,
}

interface FallibleOptions extends OptionsBase {
	failsOnEmpty: true,
}

interface InfallibleOptions extends OptionsBase {
	failsOnEmpty?: false,
}

/** @internal For test only */
export type Options = FallibleOptions | InfallibleOptions

const fallbackOnOutOfRange = (ans: IntegerNode, _src: Source, ctx: ParserContext, options: Options) => {
	ctx.err.report(
		localize('expected', localize('integer.between', options.min ?? '-∞', options.max ?? '+∞')),
		ans,
		ErrorSeverity.Error
	)
}

export function integer(options: InfallibleOptions): InfallibleParser<IntegerNode>
export function integer(options: FallibleOptions): Parser<IntegerNode>
export function integer(options: Options): Parser<IntegerNode> {
	return (src: Source, ctx: ParserContext): Result<IntegerNode> => {
		const ans: Mutable<IntegerNode> = {
			type: 'integer',
			range: Range.create(src),
			value: 0,
		}

		if (src.peek() === '-' || src.peek() === '+') {
			src.skip()
		}

		while (src.canRead() && Source.isDigit(src.peek())) {
			src.skip()
		}

		ans.range.end = src.cursor
		const raw = src.slice(ans.range)

		let errorOccurred = false
		try {
			ans.value = Number(raw)
		} catch (_) {
			// `raw` might be "+" or "-" here.
			errorOccurred = true
		}

		if (!raw) {
			if (options.failsOnEmpty) {
				return Failure
			}
			ctx.err.report(localize('expected', localize('integer')), ans)
		} else if (!options.pattern.test(raw) || errorOccurred) {
			ctx.err.report(localize('parser.integer.illegal', options.pattern), ans)
		} else if ((options.min !== undefined && ans.value < options.min) || (options.max !== undefined && ans.value > options.max)) {
			const onOutOfRange = options.onOutOfRange ?? fallbackOnOutOfRange
			onOutOfRange(ans, src, ctx, options)
		}

		return ans
	}
}
