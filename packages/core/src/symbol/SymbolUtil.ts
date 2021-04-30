import { TextDocument } from 'vscode-languageserver-textdocument'
import type { AstNode } from '../node'
import type { Logger } from '../service'
import type { RangeLike } from '../source'
import { Range } from '../source'
import type { AllCategory, Symbol, SymbolLocationMetadata, SymbolMap, SymbolMetadata, SymbolTable, SymbolUsageType } from './Symbol'
import { SymbolLocation, SymbolUsageTypes, SymbolVisibility } from './Symbol'

export class SymbolUtil {
	private readonly stacks = new Map<string, SymbolStack>()

	private isUriBinding = false

	constructor(
		public readonly global: SymbolTable
	) { }

	/* istanbul ignore next */
	/**
	 * Do not use this method. This should only be called by `Service` when executing `UriBinder`s.
	 */
	uriBinding(logger: Logger, fn: () => unknown): void {
		this.isUriBinding = true
		SymbolUtil.removeLocations(this.global, l => l.isUriBound)
		try {
			fn()
		} catch (e) {
			logger.error(JSON.stringify(e))
		} finally {
			this.isUriBinding = false
		}
	}

	getStack(uri: string): SymbolStack {
		if (!this.stacks.has(uri)) {
			this.stacks.set(uri, [{}])
		}
		return this.stacks.get(uri)!
	}

	clear(uri: string): void {
		this.stacks.delete(uri)
		SymbolUtil.removeLocations(this.global, loc => !loc.isUriBound && loc.uri === uri)
	}

	/**
	 * @returns An object:
	 * - `map`: The `SymbolMap` that (potentially) contains the symbol. `null` if no such map exists.
	 * - `createMap`: A method that can be called to create the `SymbolMap` containing the symbol if it doesn't exist. `null` if such map cannot be created (e.g. when the symbol containing the member symbol doesn't exist either).
	 * - `symbol`: The `Symbol` corresponding to the `path`. `null` if no such symbol exists.
	 * - `visible`: If it is visible in `uri`. This will be `null` if the symbol is `null`.
	 */
	lookup(category: AllCategory, path: string[], uri: string): { map: SymbolMap | null, createMap: ((addition: SymbolAddition) => SymbolMap) | null, symbol: Symbol | null, visible: boolean | null }
	lookup(category: string, path: string[], uri: string): { map: SymbolMap | null, createMap: ((addition: SymbolAddition) => SymbolMap) | null, symbol: Symbol | null, visible: boolean | null }
	lookup(category: string, path: string[], uri: string): { map: SymbolMap | null, createMap: ((addition: SymbolAddition) => SymbolMap) | null, symbol: Symbol | null, visible: boolean | null } {
		if (uri) {
			// TODO: Lookup in local stack as well.
			const stack = this.getStack(uri)
			stack
		}
		let parentSymbol: Symbol | null = null
		let symbol: Symbol | null = null
		let map: SymbolMap | null = this.global[category] ?? null
		for (let i = 0; map && i < path.length; i++) {
			symbol = map[path[i]] ?? null
			if (!symbol) {
				break
			}
			if (i === path.length - 1) {
				break
			}
			parentSymbol = symbol
			map = symbol.members ?? null
		}
		return {
			createMap: path.length === 1
				? (addition: SymbolAddition) => SymbolUtil.getTable(this.getStack(uri), this.global, addition.data?.visibility)[category] ??= {}
				: parentSymbol ? ((_: SymbolAddition) => parentSymbol!.members ??= {}) : null,
			map,
			symbol,
			visible: symbol ? SymbolUtil.isVisible(symbol, uri) : null,
		}
	}

	/**
	 * @param doc A `TextDocument` or a string URI. It is used to both check the visibility of symbols and serve as
	 * the location of future entered symbol usages. If a string URI is provided, all `range`s specified while entering
	 * symbol usages latter will be ignored and seen as `[0, 0)`.
	 * 
	 * @throws When the queried symbol belongs to another non-existent symbol.
	 */
	query(doc: TextDocument | string, category: AllCategory, ...path: string[]): SymbolQueryResult
	query(doc: TextDocument | string, category: string, ...path: string[]): SymbolQueryResult
	query(doc: TextDocument | string, category: string, ...path: string[]): SymbolQueryResult {
		const uri = SymbolUtil.toUri(doc)
		const lookupResult = this.lookup(category, path, uri)
		if (!lookupResult.createMap) {
			throw new Error(`Cannot query symbol at path “${path.join('.')}” as its parent doesn't exist`)
		}
		return new SymbolQueryResult({
			category,
			createMap: lookupResult.createMap,
			doc,
			isUriBinding: this.isUriBinding,
			map: lookupResult.visible ? lookupResult.map : null,
			path,
			symbol: lookupResult.visible ? lookupResult.symbol : null,
		})
	}

	getVisibleSymbols(category: AllCategory): SymbolMap
	getVisibleSymbols(category: string): SymbolMap
	getVisibleSymbols(uri: string, category: AllCategory): SymbolMap
	getVisibleSymbols(uri: string, category: string): SymbolMap
	getVisibleSymbols(param1: string, param2?: string): SymbolMap {
		const [uri, category] = param2 ? [param1, param2] : [undefined, param1]
		const ans: SymbolMap = {}

		if (uri) {
			// TODO: Lookup in local stack as well.
			const stack = this.getStack(uri)
			stack
		}

		const map = this.global[category]
		if (map) {
			for (const key of Object.keys(map)) {
				if (SymbolUtil.isVisible(map[key]!, uri)) {
					ans[key] = map[key]
				}
			}
		}

		return ans
	}

	/**
	 * Executes the `callbackFn` in a new block.
	 * 
	 * ~~We're not using blockchain technique here, unfortunately.~~
	 */
	block(uri: string, callbackFn: (this: void) => unknown): void {
		const stack = this.getStack(uri)
		stack.push({})
		try {
			callbackFn()
		} catch (e) {
			throw e
		} finally {
			if (stack.length <= 1) {
				throw new Error('Unable to pop a block out as it is the last element in this stack')
			}
			stack.pop()
		}
	}

	static toUri(uri: TextDocument | string): string {
		return typeof uri === 'string' ? uri : uri.uri
	}

	static trim(table: SymbolTable): void {
		for (const category of Object.keys(table)) {
			const map = table[category]!
			this.trimMap(map)
			if (Object.keys(map).length === 0) {
				delete table[category]
			}
		}
	}

	static trimMap(map: SymbolMap | undefined): void {
		if (!map) {
			return
		}
		for (const identifier of Object.keys(map)) {
			const symbol = map[identifier]!
			if (!symbol.declaration?.length && !symbol.definition?.length && !symbol.implementation?.length && !symbol.reference?.length && !symbol.typeDefinition?.length) {
				delete map[identifier]
			} else if (symbol.members) {
				this.trimMap(symbol.members)
				if (Object.keys(symbol.members).length === 0) {
					delete symbol.members
				}
			}
		}
	}

	/**
	 * Remove all references provided by the specific `uri` from the `table`.
	 * 
	 * @param predicate A predicate that matches locations that should be removed.
	 */
	static removeLocations(table: SymbolTable, predicate: (this: void, loc: SymbolLocation) => unknown): void {
		for (const category of Object.keys(table)) {
			this.removeLocationsFromMap(table[category]!, predicate)
		}
		this.trim(table)
	}

	static removeLocationsFromMap(map: SymbolMap | undefined, predicate: (this: void, loc: SymbolLocation) => unknown): void {
		if (!map) {
			return
		}
		for (const identifier of Object.keys(map)) {
			const symbol = map[identifier]!
			for (const form of SymbolUsageTypes) {
				if (!symbol[form]) {
					continue
				}
				symbol[form] = symbol[form]!.filter(l => !predicate(l))
			}
			if (symbol.members) {
				this.removeLocationsFromMap(symbol.members, predicate)
			}
		}
	}

	/**
	 * @param visibility `undefined` will be seen as `Public`.
	 * 
	 * @returns The `SymbolTable` that should be used to insert the `Symbol` with the given `visibility`.
	 */
	static getTable(stack: SymbolStack, global: SymbolTable, visibility: SymbolVisibility | undefined): SymbolTable {
		switch (visibility) {
			case SymbolVisibility.Block:
				return stack[stack.length - 1]
			case SymbolVisibility.File:
				return stack[0]
			case SymbolVisibility.Public:
			case SymbolVisibility.Restricted:
			default:
				return global
		}
	}

	private static enterMapContainer<K extends string>({ container, keyToMap, category, identifier, addition, doc, isUriBinding }: {
		addition: SymbolAddition,
		category: string,
		container: {
			[key in K]?: SymbolMap
		},
		doc: TextDocument,
		identifier: string,
		isUriBinding: boolean,
		keyToMap: K,
	}): Symbol {
		const map: SymbolMap = container[keyToMap] ??= {}
		return this.enterMap(map, category, identifier, addition, doc, isUriBinding)
	}

	static enterTable(table: SymbolTable, category: string, identifier: string, addition: SymbolAddition, doc: TextDocument, isUriBinding: boolean): Symbol {
		return this.enterMapContainer({
			container: table,
			keyToMap: category,
			category,
			identifier,
			addition,
			doc,
			isUriBinding,
		})
	}

	static enterMember(symbol: Symbol, identifier: string, addition: SymbolAddition, doc: TextDocument, isUriBinding: boolean): Symbol {
		return this.enterMapContainer({
			container: symbol,
			keyToMap: 'members',
			category: symbol.category,
			identifier,
			addition,
			doc,
			isUriBinding,
		})
	}

	/**
	 * Enters a symbol into a symbol map. If there is already a symbol with the specified identifier under the map,
	 * it will be amended with the information provided in `addition`. Otherwise, a new symbol with that identifier
	 * will be created.
	 * 
	 * @param map The map where this symbol will be entered into.
	 * @param category The category of this symbol.
	 * @param identifier The identifier of this symbol.
	 * @param addition The metadata and usage that will be amended onto this symbol if it already exists, or
	 * to create the symbol if it doesn't exist yet.
	 * @param doc The `TextDocument` where this symbol belongs to.
	 * @param isUriBinding Whether this entering is done by a URI binder or not.
	 * 
	 * @returns The created/amended symbol.
	 */
	static enterMap(map: SymbolMap, category: AllCategory, identifier: string, addition: SymbolAddition, doc: TextDocument, isUriBinding: boolean): Symbol
	static enterMap(map: SymbolMap, category: string, identifier: string, addition: SymbolAddition, doc: TextDocument, isUriBinding: boolean): Symbol
	static enterMap(map: SymbolMap, category: string, identifier: string, addition: SymbolAddition, doc: TextDocument, isUriBinding: boolean): Symbol {
		const target = map[identifier]
		if (target) {
			this.amendSymbol(target, addition, doc, isUriBinding)
			return target
		} else {
			return map[identifier] = this.createSymbol(category, identifier, addition, doc, isUriBinding)
		}
	}

	private static createSymbol(category: string, identifier: string, enterable: SymbolAddition, doc: TextDocument, isUriBinding: boolean): Symbol {
		const ans: Symbol = {
			category,
			identifier,
			...enterable.data,
		}
		this.amendSymbolUsage(ans, enterable.usage, doc, isUriBinding)
		return ans
	}

	static amendSymbol(symbol: Symbol, enterable: SymbolAddition, doc: TextDocument, isUriBinding: boolean): void {
		this.amendSymbolMetadata(symbol, enterable.data)
		this.amendSymbolUsage(symbol, enterable.usage, doc, isUriBinding)
	}

	private static amendSymbolMetadata(symbol: Symbol, addition: SymbolAddition['data']) {
		if (addition) {
			if (addition.doc !== undefined) {
				symbol.doc = addition.doc
			}
			if (addition.relations && Object.keys(addition.relations).length) {
				symbol.relations ??= {}
				for (const relationship of Object.keys(addition.relations)) {
					symbol.relations[relationship] = addition.relations[relationship]
				}
			}
			if (addition.subcategory !== undefined) {
				symbol.doc = addition.subcategory
			}
			if (addition.visibility !== undefined) {
				// Visibility changes are only accepted if the change wouldn't result in the
				// symbol being stored in a different symbol table.
				const inGlobalTable = (v: SymbolVisibility | undefined) => v === undefined || v === SymbolVisibility.Public || v === SymbolVisibility.Restricted
				if (symbol.visibility === addition.visibility || (inGlobalTable(symbol.visibility) && inGlobalTable(addition.visibility))) {
					symbol.visibility = addition.visibility
				} else {
					throw new Error(`Cannot change visibility from ${symbol.visibility} to ${addition.visibility}: ${JSON.stringify(symbol)}`)
				}
			}
			if (addition.visibilityRestriction?.length) {
				symbol.visibilityRestriction = (symbol.visibilityRestriction ?? []).concat(addition.visibilityRestriction)
			}
		}
	}

	private static amendSymbolUsage(symbol: Symbol, addition: SymbolAddition['usage'], doc: TextDocument, isUriBinding: boolean) {
		if (addition) {
			const arr = symbol[addition.type] ??= []
			const range = Range.get((SymbolAdditionUsageWithNode.is(addition) ? addition.node : addition.range) ?? 0)
			const loc = SymbolLocation.create(doc, range, addition.fullRange, isUriBinding, {
				accessType: addition.accessType,
				fromDefaultLibrary: addition.fromDefaultLibrary,
			})
			if (!doc.uri.startsWith('file:')) {
				delete loc.range
				delete loc.posRange
				delete loc.fullRange
				delete loc.fullPosRange
			}
			arr.push(loc)
		}
	}

	static filterVisibleSymbols(uri: string, map: SymbolMap = {}): SymbolMap {
		const ans: SymbolMap = {}

		for (const [identifier, symbol] of Object.entries(map)) {
			if (SymbolUtil.isVisible(symbol!, uri)) {
				ans[identifier] = symbol
			}
		}

		return ans
	}

	/**
	 * @returns
	 * - For `Block` and `File` visibilities, always `true` as `Symbol`s of these visibilities are validated at the
	 * `SymbolStack` level, instead of here.
	 * - For `Public` visibility, also always `true`, obviously.
	 * - For `Restricted` visibility, // TODO: roots.
	 */
	static isVisible(symbol: Symbol, uri: string): boolean
	static isVisible(symbol: Symbol, uri: string | undefined): boolean | null
	static isVisible(symbol: Symbol, _uri: string | undefined): boolean | null {
		switch (symbol.visibility) {
			case SymbolVisibility.Restricted:
				return false // FIXME: check with workspace root URIs.
			case SymbolVisibility.Block:
			case SymbolVisibility.File:
			case SymbolVisibility.Public:
			default:
				return true
		}
	}

	/**
	 * @returns The ultimate symbol being pointed by the passed-in `symbol`'s alias.
	 */
	static resolveAlias(symbol: Symbol): Symbol {
		return symbol.relations?.aliasOf ? this.resolveAlias(symbol.relations.aliasOf) : symbol
	}

	/**
	 * @returns If the symbol has declarations or definitions.
	 */
	static isDeclared(symbol: Symbol | null): symbol is Symbol {
		return !!(symbol?.declaration?.length || symbol?.definition?.length)
	}
	/**
	 * @returns If the symbol has definitions, or declarations and implementations.
	 */
	static isDefined(symbol: Symbol | null): symbol is Symbol {
		return !!(symbol?.definition?.length || (symbol?.definition?.length && symbol?.implementation?.length))
	}
	/**
	 * @returns If the symbol has implementations or definitions.
	 */
	static isImplemented(symbol: Symbol | null): symbol is Symbol {
		return !!(symbol?.implementation?.length || symbol?.definition?.length)
	}
	/**
	 * @returns If the symbol has references.
	 */
	static isReferenced(symbol: Symbol | null): symbol is Symbol {
		return !!symbol?.reference?.length
	}
	/**
	 * @returns If the symbol has type definitions.
	 */
	static isTypeDefined(symbol: Symbol | null): symbol is Symbol {
		return !!symbol?.typeDefinition?.length
	}

	/**
	 * @throws If the symbol does not have any declarations or definitions.
	 */
	static getDeclaredLocation(symbol: Symbol): SymbolLocation {
		return symbol.declaration?.[0] ?? symbol.definition?.[0] ?? (() => { throw new Error(`Cannot get declared location of ${JSON.stringify(symbol)}`) })()
	}
}

interface SymbolAddition {
	data?: Omit<SymbolMetadata, 'category' | 'identifier' | 'members'>,
	usage?: SymbolAdditionUsage,
}
type SymbolAdditionUsage = SymbolAdditionUsageWithRange | SymbolAdditionUsageWithNode
interface SymbolAdditionUsageBase extends SymbolLocationMetadata {
	/**
	 * The type of this usage. Use `definition` when the usage consists both a `declaration` and an `implementation`.
	 */
	type: SymbolUsageType,
	/**
	 * The range of the full declaration/implementation of this `Symbol`. For example, for the following piece of
	 * nbtdoc code,
	 * ```nbtdoc
	 * 0123456789012345
	 * compound Foo {}
	 * ```
	 * 
	 * The `range` for the Symbol `Foo` is `[9, 12)`, while the `fullRange` for it is `[0, 15)`.
	 */
	fullRange?: RangeLike,
}
interface SymbolAdditionUsageWithRange extends SymbolAdditionUsageBase {
	/**
	 * The range of this symbol usage. It should contain exactly the symbol identifier itself, with no
	 * whitespaces whatsoever included.
	 * 
	 * This property is ignored when the specified document's URI is not of `file:` schema. It is also ignored and
	 * set to `[0, 0)` if only a file URI, instead of a `TextDocument`, is provided.
	 * 
	 * Please use `node` instead of this property whenever it makes sense. Learn more at the documentation
	 * for that property.
	 * 
	 * If neither `node` nor `range` is provided, the range falls back to `[0, 0)`.
	 */
	range?: RangeLike,
	node?: undefined,
}
namespace SymbolAdditionUsageWithRange {
	/* istanbul ignore next */
	export function is(usage: SymbolAdditionUsage | undefined): usage is SymbolAdditionUsageWithRange {
		return !!usage?.range
	}
}
interface SymbolAdditionUsageWithNode extends SymbolAdditionUsageBase {
	/**
	 * The node associated with this symbol usage. It should contain exactly the symbol identifier itself, with no
	 * wrapper nodes whatsoever included.
	 * 
	 * This property is ignored when the specified document's URI is not of `file:` schema. It is also ignored and
	 * treated as `range: [0, 0)` if only a file URI, instead of a `TextDocument`, is provided.
	 * 
	 * Either this property or `range` could be used to represent the range of this usage.
	 * 
	 * However, using `node` also have the benefit of auto setting `node.symbol` to the queried symbol.
	 * It is recommended to use `node` whenever applicable.
	 * 
	 * If neither `node` nor `range` is provided, the range falls back to `[0, 0)`.
	 */
	node?: AstNode,
	range?: undefined,
}
namespace SymbolAdditionUsageWithNode {
	/* istanbul ignore next */
	export function is(usage: SymbolAdditionUsage | undefined): usage is SymbolAdditionUsageWithNode {
		return !!usage?.node
	}
}

/**
 * A stack of `SymbolTable`s. The first element represents the `File` visibility scope,
 * which is accessible by any later elements but not saved to the global `SymbolTable`.
 * Later elements represent different levels of `Block` visibility scopes.
 */
type SymbolStack = [SymbolTable, ...SymbolTable[]]

type QueryCallback<S extends Symbol | null = Symbol | null> = (this: SymbolQueryResult, symbol: S) => unknown
type QueryMemberCallback = (this: void, query: SymbolQueryResult) => unknown

export class SymbolQueryResult {
	readonly category: string
	readonly path: readonly string[]
	readonly #doc: TextDocument
	/**
	 * If only a string URI (instead of a `TextDocument`) is provided when constructing this class.
	 * 
	 * If this is `true`, `usage.range` is ignored and treated as `[0, 0)` when entering symbols through this class.
	 */
	readonly #createdWithUri?: boolean
	/**
	 * A function that returns the symbol map where the queried symbol should be in when creating it.
	 * 
	 * This is only called if `#map` is `null`.
	 */
	readonly #createMap: (this: void, addition: SymbolAddition) => SymbolMap
	readonly #isUriBinding: boolean
	#hasTriggeredIf = false
	/**
	 * The map where the queried symbol is stored. `null` if the map hasn't been created yet. 
	 */
	#map: SymbolMap | null
	/**
	 * The queried symbol. `null` if the symbol hasn't been created yet.
	 */
	#symbol: Symbol | null

	get symbol(): Symbol | null {
		return this.#symbol
	}

	get visibleMembers(): SymbolMap {
		return SymbolUtil.filterVisibleSymbols(this.#doc.uri, this.#symbol?.members)
	}

	constructor({ category, createMap, doc, isUriBinding, map, path, symbol }: {
		category: string,
		createMap: (this: void, addition: SymbolAddition) => SymbolMap,
		doc: TextDocument | string,
		isUriBinding: boolean,
		map: SymbolMap | null,
		path: readonly string[],
		symbol: Symbol | null,
	}) {
		this.category = category
		this.path = path

		this.#createMap = createMap
		if (typeof doc === 'string') {
			doc = TextDocument.create(doc, '', 0, '')
			this.#createdWithUri = true
		}
		this.#doc = doc
		this.#isUriBinding = isUriBinding
		this.#map = map
		this.#symbol = symbol
	}

	heyGimmeDaSymbol() {
		return this.#symbol
	}

	if(predicate: (this: void, symbol: Symbol | null) => symbol is null, fn: QueryCallback<null>): this
	if(predicate: (this: void, symbol: Symbol | null) => symbol is Symbol, fn: QueryCallback<Symbol>): this
	if(predicate: QueryCallback, fn: QueryCallback): this
	if(predicate: QueryCallback, fn: QueryCallback<any>): this {
		if (predicate.call(this, this.#symbol)) {
			fn.call(this, this.#symbol)
			this.#hasTriggeredIf = true
		}
		return this
	}

	/**
	 * Calls `fn` if the queried symbol does not exist.
	 */
	ifUnknown(fn: QueryCallback<null>): this {
		return this.if(s => s === null, fn as QueryCallback)
	}

	/**
	 * Calls `fn` if the queried symbol exists (i.e. has any of declarations/definitions/implementations/references/typeDefinitions).
	 */
	ifKnown(fn: QueryCallback<null>): this {
		return this.if(s => s !== null, fn as QueryCallback)
	}

	/**
	 * Calls `fn` if the queried symbol has declarations or definitions.
	 */
	ifDeclared(fn: QueryCallback<Symbol>): this {
		return this.if(SymbolUtil.isDeclared, fn)
	}

	/**
	 * Calls `fn` if the queried symbol has definitions, or both declarations and implementations.
	 */
	ifDefined(fn: QueryCallback<Symbol>): this {
		return this.if(SymbolUtil.isDefined, fn)
	}

	/**
	 * Calls `fn` if the queried symbol has implementations or definitions.
	 */
	ifImplemented(fn: QueryCallback<Symbol>): this {
		return this.if(SymbolUtil.isImplemented, fn)
	}

	/**
	 * Calls `fn` if the queried symbol has references.
	 */
	ifReferenced(fn: QueryCallback<Symbol>): this {
		return this.if(SymbolUtil.isReferenced, fn)
	}

	/**
	 * Calls `fn` if the queried symbol has type definitions.
	 */
	ifTypeDefined(fn: QueryCallback<Symbol>): this {
		return this.if(SymbolUtil.isTypeDefined, fn)
	}

	/**
	 * Calls `fn` if none of the former `if` conditions are met.
	 */
	else(fn: QueryCallback): this {
		if (!this.#hasTriggeredIf) {
			fn.call(this, this.#symbol)
		}
		return this
	}

	/**
	 * Enters the queried symbol if none of the former `if` conditions are met.
	 */
	elseEnter(symbol: SymbolAddition): this {
		return this.else(() => this.enter(symbol as any))
	}

	/**
	 * Resolves the queried symbol if it is an alias and if none of the former `if` conditions are met.
	 */
	elseResolveAlias(): this {
		return this.else(() => this.resolveAlias())
	}

	/**
	 * Enters the queried symbol.
	 */
	enter(addition: SymbolAddition): this {
		// Treat `usage.range` as `[0, 0)` if this class was constructed with a string URI (instead of a `TextDocument`).
		if (this.#createdWithUri && SymbolAdditionUsageWithRange.is(addition.usage)) {
			addition.usage.range = Range.create(0, 0)
		}

		this.#map ??= this.#createMap(addition)
		this.#symbol = SymbolUtil.enterMap(this.#map, this.category, this.path[this.path.length - 1], addition, this.#doc, this.#isUriBinding)
		if (addition.usage?.node) {
			addition.usage.node.symbol = this.#symbol
		}
		return this
	}

	/**
	 * Amends the queried symbol if the queried symbol exists (i.e. has any of declarations/definitions/implementations/references/typeDefinitions) and is visible at the current scope.
	 * 
	 * This is equivalent to calling
	 * ```typescript
	 * query.ifKnown(function () {
	 * 	this.enter(symbol)
	 * })
	 * ```
	 * 
	 * Therefore, if the symbol is successfully amended, `elseX` methods afterwards will **not** be executed.
	 */
	amend(symbol: SymbolAddition): this {
		return this.ifKnown(() => this.enter(symbol as any))
	}

	/**
	 * Resolves this symbol if it is an alias.
	 */
	resolveAlias(): this {
		if (this.#symbol) {
			this.#symbol = SymbolUtil.resolveAlias(this.#symbol)
		}
		return this
	}

	/**
	 * @param identifier The identifier of the member symbol.
	 * @param fn A callback function where `this` is the member symbol's query result.
	 * 
	 * @throws If the current queried symbol doesn't exist.
	 */
	queryMember(identifier: string, fn: QueryMemberCallback): void
	queryMember(doc: TextDocument | string, identifier: string, fn: QueryMemberCallback): void
	queryMember(): void {
		// Handle overloads.
		let doc: TextDocument | string, identifier: string, fn: QueryMemberCallback
		if (arguments.length === 2) {
			// Ensure the member query result will not unknowingly have a dummy TextDocument passed down from this class.
			doc = this.#createdWithUri ? this.#doc.uri : this.#doc
			identifier = arguments[0]
			fn = arguments[1]
		} else {
			doc = arguments[0]
			identifier = arguments[1]
			fn = arguments[2]
		}

		if (this.#symbol === null) {
			throw new Error(`Tried to query member symbol “${identifier}” from an undefined symbol (path “${this.path.join('.')}”)`)
		}

		const memberDoc = typeof doc === 'string' && doc === this.#doc.uri && !this.#createdWithUri
			? this.#doc
			: doc
		const memberMap = this.#symbol.members ?? null
		const memberSymbol = memberMap?.[identifier] ?? null
		const memberQueryResult = new SymbolQueryResult({
			category: this.category,
			createMap: () => this.#symbol!.members ??= {},
			doc: memberDoc,
			isUriBinding: this.#isUriBinding,
			map: memberMap,
			path: [...this.path, identifier],
			symbol: memberSymbol,
		})
		fn(memberQueryResult)
	}

	/**
	 * Do something with this query on each value in a given iterable. The query itself will be included
	 * in the callback function as the second parameter.
	 */
	onEach<T>(values: Iterable<T>, fn: (this: this, value: T, query: this) => unknown): this {
		for (const value of values) {
			fn.call(this, value, this)
		}
		return this
	}
}
