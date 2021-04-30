import type { RangeLike } from './Range'
import { Range } from './Range'

type Digit =
	| '0'
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
type Space =
	| ' '
	| '\t'
type Newline =
	| '\r\n'
	| '\r'
	| '\n'
type Whitespace =
	| Space
	| Newline

export const CRLF = '\r\n'
export const CR = '\r'
export const LF = '\n'

export class Source {
	public cursor = 0

	constructor(
		public string: string
	) { }

	get nextCharRange(): Range {
		return Range.create(this, this.cursor + 1)
	}

	clone(): Source {
		const ans = new Source(this.string)
		ans.cursor = this.cursor
		return ans
	}

	canRead(length = 1) {
		return this.cursor + length <= this.string.length
	}

	canReadInLine() {
		return this.canRead() && this.peek() !== CR && this.peek() !== LF
	}

	/**
	 * Peeks a substring from the current cursor.
	 * @param length The length of the substring. @default 1
	 * @param offset The index to offset from cursor. @default 0
	 */
	peek(length = 1, offset = 0) {
		return this.string.substr(this.cursor + offset, length)
	}

	read() {
		return this.string.charAt(this.cursor++)
	}

	/**
	 * Skips the current character.
	 * @param step The step to skip. @default 1
	 */
	skip(step = 1): this {
		this.cursor += step
		return this
	}

	slice(rangeLike: RangeLike): string {
		const range = Range.get(rangeLike)
		return this.string.slice(range.start, range.end)
	}

	/**
	 * If the `expectedValue` is right after the cursor, skips it and returns `true`. Otherwise returns `false`.
	 * 
	 * This is a shortcut for the following piece of code:
	 * ```typescript
	 * declare const src: Source
	 * if (src.peek(expectedValue.length) === expectedValue) {
	 * 	src.skip(expectedValue.length)
	 * 	// Do something here.
	 * }
	 * ```
	 */
	trySkip(expectedValue: string): boolean {
		if (this.peek(expectedValue.length) === expectedValue) {
			this.skip(expectedValue.length)
			return true
		}
		return false
	}

	/**
	 * Reads until the end of this line.
	 */
	readLine() {
		return this.readUntil(CR, LF)
	}
	/**
	 * Skips until the end of this line.
	 */
	skipLine(): this {
		this.readLine()
		return this
	}
	/**
	 * Jumps to the beginning of the next line.
	 */
	nextLine(): this {
		this.skipLine()
		if (this.peek(2) === CRLF) {
			this.skip(2)
		} else if (this.peek() === CR || this.peek() === LF) {
			this.skip()
		}
		return this
	}

	readSpace() {
		const start = this.cursor
		this.skipSpace()
		return this.string.slice(start, this.cursor)
	}
	skipSpace(): this {
		while (this.canRead() && Source.isSpace(this.peek())) {
			this.skip()
		}
		return this
	}

	readWhitespace() {
		const start = this.cursor
		this.skipWhitespace()
		return this.string.slice(start, this.cursor)
	}
	skipWhitespace(): this {
		while (this.canRead() && Source.isWhitespace(this.peek())) {
			this.skip()
		}
		return this
	}

	/**
	 * @param terminators Ending character. Will not be skipped or included in the result.
	 */
	readUntil(...terminators: string[]) {
		let ans = ''
		while (this.canRead()) {
			const c = this.peek()
			if (terminators.includes(c)) {
				return ans
			} else {
				ans += c
			}
			this.skip()
		}
		return ans
	}
	/**
	 * @param terminators Ending character. Will not be skipped.
	 */
	skipUntilOrEnd(...terminators: string[]): this {
		this.readUntil(...terminators)
		return this
	}

	readUntilLineEnd() {
		return this.readUntil(CR, LF)
	}
	skipUntilLineEnd() {
		return this.skipUntilOrEnd(CR, LF)
	}

	readRemaining(): string {
		const start = this.cursor
		this.cursor = this.string.length
		return this.string.slice(start)
	}
	skipRemaining(): this {
		this.readRemaining()
		return this
	}

	static isDigit(c: string): c is Digit {
		return c >= '0' && c <= '9'
	}

	static isBrigadierQuote(c: string): c is '"' | "'" {
		return c === '"' || c === "'"
	}

	static isNewline(c: string): c is Newline {
		return c === '\r\n' || c === '\r' || c === '\n'
	}

	static isSpace(c: string): c is Space {
		return c === ' ' || c === '\t'
	}

	static isWhitespace(c: string): c is Whitespace {
		return Source.isSpace(c) || Source.isNewline(c)
	}
}
