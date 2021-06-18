import type { UriBinder, UriBinderContext } from '@spyglassmc/core'
import { fileUtil } from '@spyglassmc/core'
import { segToIdentifier } from './util'

const Extension = '.nbtdoc'
const NbtdocRootPrefix = 'nbtdoc/'

export const uriBinder: UriBinder = (uris: readonly string[], ctx: UriBinderContext) => {
	let urisAndRels: [string, string][] = []
	for (const uri of uris) {
		if (!uri.endsWith(Extension)) {
			continue
		}
		let rel = fileUtil.getRel(uri, ctx.roots)
		if (!rel) {
			continue
		}
		rel = rel
			.slice(0, -Extension.length)
			.replace(/(^|\/)mod$/, '')
		urisAndRels.push([uri, rel])
	}
	// Now the value of `urisAndRels`:
	// file:///root/nbtdoc/foo/mod.nbtdoc -> nbtdoc/foo
	// file:///root/nbtdoc/foo/bar.nbtdoc -> nbtdoc/foo/bar

	// A special check for the directory named `nbtdoc`:
	// If all files are put under this folder, we will treat that folder as the "root" instead.
	if (urisAndRels.every(([_, rel]) => rel.startsWith(NbtdocRootPrefix))) {
		urisAndRels = urisAndRels
			.map(([uri, rel]) => [uri, rel.slice(NbtdocRootPrefix.length)])
	}
	// Now the value of `urisAndRels`:
	// file:///root/nbtdoc/foo/mod.nbtdoc -> foo
	// file:///root/nbtdoc/foo/bar.nbtdoc -> foo/bar

	for (const [uri, rel] of urisAndRels) {
		ctx.symbols
			.query(uri, 'nbtdoc', segToIdentifier(rel.split('/')))
			.ifKnown(() => { })
			.elseEnter({
				data: {
					subcategory: 'module',
				},
				usage: {
					type: 'implementation',
				},
			})
	}
}
