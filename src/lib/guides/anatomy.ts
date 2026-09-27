export type Piece = {
	text: string;
	part?: string;
};

/** Hex digits after `#` or `0x`, or a number sat between brackets, commas and spaces. */
const TOKEN = /(?<=#|0x)(?<hex>[0-9a-f]{6,8})|(?<=^|[\s(,])-?[\d.]+%?(?=[\s,)]|$)/gi;

/** Splits a value into what each bit means, hex two digits at a time, in writing order. */
export function anatomy(value: string, parts: string[]): Piece[] {
	const pieces: Piece[] = [];
	let at = 0;
	let next = 0;
	for (const match of value.matchAll(TOKEN)) {
		if (match.index > at) pieces.push({ text: value.slice(at, match.index) });
		for (const text of match.groups?.hex?.match(/../g) ?? [match[0]]) {
			pieces.push({ text, part: parts[next++] });
		}
		at = match.index + match[0].length;
	}
	if (next === 0) return [{ text: value, part: parts[0] }];
	if (at < value.length) pieces.push({ text: value.slice(at) });
	return pieces;
}
