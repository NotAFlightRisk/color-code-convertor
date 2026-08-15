import { parse as parseCss } from 'culori/fn';
import type { Color } from 'culori/fn';
import './modes';

const NUMBER = /[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?%?/gi;
const HEX_LENGTHS = new Set([3, 4, 6, 8]);

type Parser = (input: string) => Color | null | undefined;

const strip = (input: string) =>
	input
		.trim()
		.replace(/^[-\w]+\s*:\s*/, '')
		.replace(/[;,]$/, '')
		.replace(/^["'`]|["'`]$/g, '')
		.trim();

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

const numbers = (input: string) => {
	const found = input.match(NUMBER) ?? [];
	return found.map((token) => ({
		value: parseFloat(token),
		percent: token.endsWith('%')
	}));
};

const alphaOf = (raw: { value: number; percent: boolean } | undefined) =>
	raw === undefined ? 1 : clamp(raw.percent ? raw.value / 100 : raw.value);

const fromCmyk = (c: number, m: number, y: number, k: number, alpha: number): Color => ({
	mode: 'rgb',
	r: (1 - clamp(c)) * (1 - clamp(k)),
	g: (1 - clamp(m)) * (1 - clamp(k)),
	b: (1 - clamp(y)) * (1 - clamp(k)),
	alpha
});

const fromInt = (value: number, alpha = 1): Color => ({
	mode: 'rgb',
	r: ((value >> 16) & 255) / 255,
	g: ((value >> 8) & 255) / 255,
	b: (value & 255) / 255,
	alpha
});

/** `hsb(210, 50%, 80%)` and its `hsv` alias, which CSS never got round to shipping. */
const parseHsb: Parser = (input) => {
	if (!/^hs[vb]a?\(/i.test(input)) return null;
	const [h, s, v, a] = numbers(input);
	if (v === undefined) return null;
	return {
		mode: 'hsv',
		h: h.value,
		s: s.percent ? s.value / 100 : s.value,
		v: v.percent ? v.value / 100 : v.value,
		alpha: alphaOf(a)
	};
};

const parseCmyk: Parser = (input) => {
	if (!/^(?:device-)?cmyk\(/i.test(input)) return null;
	const parts = numbers(input);
	if (parts.length < 4) return null;
	const fraction = parts.slice(0, 4).every((part) => !part.percent && part.value <= 1);
	const [c, m, y, k] = parts.slice(0, 4).map((part) => (fraction ? part.value : part.value / 100));
	return fromCmyk(c, m, y, k, alphaOf(parts[4]));
};

/** Flutter and Android write alpha first: `Color(0xFFFF0000)`, `0xFFFF0000`. */
const parseArgb: Parser = (input) => {
	const match = /^(?:(?:const\s+)?Color\(\s*)?0x([0-9a-f]{6}|[0-9a-f]{8})\)?$/i.exec(input);
	if (!match) return null;
	const digits = match[1];
	if (digits.length === 6) return fromInt(parseInt(digits, 16));
	const value = parseInt(digits, 16);
	return fromInt(value & 0xffffff, ((value >>> 24) & 255) / 255);
};

/** Swift's `UIColor(red: 1, green: 0, blue: 0, alpha: 1)`, SwiftUI's `Color(red:…)`. */
const parseSwift: Parser = (input) => {
	if (!/^(?:UI|NS)?Color\(/i.test(input) || !/red\s*:/i.test(input)) return null;
	const parts = numbers(input);
	if (parts.length < 3) return null;
	const [r, g, b, a] = parts;
	const scale = parts.slice(0, 3).some((part) => part.value > 1) ? 255 : 1;
	return {
		mode: 'rgb',
		r: clamp(r.value / scale),
		g: clamp(g.value / scale),
		b: clamp(b.value / scale),
		alpha: alphaOf(a)
	};
};

/** Bare hex (`ff0000`) and bare channels (`255, 0, 0`, `0, 100%, 50%`). */
const parseBare: Parser = (input) => {
	const digitsOnly = /^\d+$/.test(input);
	const looksHex = /^[0-9a-f]+$/i.test(input) && HEX_LENGTHS.has(input.length);
	if (looksHex && !(digitsOnly && input.length === 8)) return parseCss(`#${input}`);
	if (digitsOnly) return fromInt(parseInt(input, 10) & 0xffffff);
	if (!/^[\d\s.,%\/+-]+$/.test(input)) return null;

	const parts = numbers(input);
	if (parts.length < 3 || parts.length > 4) return null;
	const [first, second, third, a] = parts;
	const alpha = alphaOf(a);
	if (!first.percent && second.percent && third.percent)
		return { mode: 'hsl', h: first.value, s: second.value / 100, l: third.value / 100, alpha };
	const scale = parts.slice(0, 3).some((part) => part.percent) ? 100 : 255;
	return {
		mode: 'rgb',
		r: clamp(first.value / scale),
		g: clamp(second.value / scale),
		b: clamp(third.value / scale),
		alpha
	};
};

const parsers: Parser[] = [parseHsb, parseCmyk, parseArgb, parseSwift, parseBare, parseCss];

/** Takes whatever the user pasted and hands back a colour, keeping its original mode. */
export function parseColor(input: string): Color | null {
	const cleaned = strip(input);
	if (!cleaned) return null;
	for (const parser of parsers) {
		const color = parser(cleaned);
		if (color) return color;
	}
	return null;
}
