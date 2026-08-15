import {
	colorsNamed,
	differenceCiede2000,
	formatCss,
	formatHex,
	formatHex8,
	nearest
} from 'culori/fn';
import type { Color } from 'culori/fn';
import { toHsl, toHsv, toHwb, toLab, toLab65, toLch, toOklab, toOklch, toP3, toRgb } from './modes';

export type Formatted = {
	id: string;
	label: string;
	value: string;
	note?: string;
};

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

const num = (n: number, places = 2) => {
	const factor = 10 ** places;
	const rounded = Math.round((n + Number.EPSILON) * factor) / factor;
	return String(rounded === 0 ? 0 : rounded);
};

const pct = (n: number, places = 2) => `${num(clamp(n) * 100, places)}%`;
const hue = (n: number | undefined) => num((((n ?? 0) % 360) + 360) % 360, 2);
const channel = (n: number) => Math.round(clamp(n) * 255);
const hex2 = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
const alphaOf = (color: Color) => clamp(color.alpha ?? 1);

/** Builds `name(a b c)`, appending alpha in whichever style that syntax uses. */
const fn = (name: string, parts: string[], alpha: number, comma = false) => {
	const body = parts.join(comma ? ', ' : ' ');
	if (alpha === 1) return `${name}(${body})`;
	return `${name}(${body}${comma ? ', ' : ' / '}${num(alpha, 3)})`;
};

const toInt = (color: Color) => {
	const { r, g, b } = toRgb(color);
	return (channel(r) << 16) | (channel(g) << 8) | channel(b);
};

const toCmyk = (color: Color) => {
	const { r, g, b } = toRgb(color);
	const [red, green, blue] = [clamp(r), clamp(g), clamp(b)];
	const k = 1 - Math.max(red, green, blue);
	if (k === 1) return { c: 0, m: 0, y: 0, k: 1 };
	return {
		c: (1 - red - k) / (1 - k),
		m: (1 - green - k) / (1 - k),
		y: (1 - blue - k) / (1 - k),
		k
	};
};

const namedEntries = Object.entries(colorsNamed).filter(([name]) => name !== 'transparent');
const nearestNamed = nearest(
	namedEntries.map(([name]) => name),
	differenceCiede2000(),
	(name) => toLab65(name)!
);

const toName = (color: Color) => {
	const exact = namedEntries.find(([, code]) => code === toInt(color));
	if (exact) return { name: exact[0], approximate: false };
	return { name: nearestNamed(toLab65(color))[0], approximate: true };
};

/** CSS-ready string for painting the colour itself, wide gamut kept where the browser allows. */
export const toCss = (color: Color) => formatCss(color) ?? formatHex(toRgb(color));

export const toHexValue = (color: Color) => formatHex(toRgb(color));

export function formatAll(color: Color): Formatted[] {
	const rgb = toRgb(color);
	const hsl = toHsl(color);
	const hsv = toHsv(color);
	const hwb = toHwb(color);
	const lab = toLab(color);
	const lch = toLch(color);
	const oklab = toOklab(color);
	const oklch = toOklch(color);
	const p3 = toP3(color);
	const cmyk = toCmyk(color);
	const named = toName(color);
	const alpha = alphaOf(color);
	const argb = [Math.round(alpha * 255), channel(rgb.r), channel(rgb.g), channel(rgb.b)]
		.map(hex2)
		.join('');

	return [
		{ id: 'hex', label: 'HEX', value: formatHex(rgb) },
		{ id: 'hex8', label: 'HEX with alpha', value: formatHex8({ ...rgb, alpha }) },
		{
			id: 'rgb',
			label: 'RGB',
			value: fn(
				alpha === 1 ? 'rgb' : 'rgba',
				[channel(rgb.r), channel(rgb.g), channel(rgb.b)].map(String),
				alpha,
				true
			)
		},
		{
			id: 'hsl',
			label: 'HSL',
			value: fn(
				alpha === 1 ? 'hsl' : 'hsla',
				[hue(hsl.h), pct(hsl.s, 1), pct(hsl.l, 1)],
				alpha,
				true
			)
		},
		{
			id: 'hsb',
			label: 'HSB / HSV',
			value: fn('hsb', [hue(hsv.h), pct(hsv.s, 1), pct(hsv.v, 1)], alpha, true)
		},
		{
			id: 'hwb',
			label: 'HWB',
			value: fn('hwb', [hue(hwb.h), pct(hwb.w, 1), pct(hwb.b, 1)], alpha)
		},
		{
			id: 'cmyk',
			label: 'CMYK',
			value: fn(
				'cmyk',
				[cmyk.c, cmyk.m, cmyk.y, cmyk.k].map((v) => pct(v, 0)),
				1,
				true
			)
		},
		{
			id: 'lab',
			label: 'LAB',
			value: fn('lab', [`${num(lab.l)}%`, num(lab.a), num(lab.b)], alpha)
		},
		{
			id: 'lch',
			label: 'LCH',
			value: fn('lch', [`${num(lch.l)}%`, num(lch.c), hue(lch.h)], alpha)
		},
		{
			id: 'oklab',
			label: 'OKLAB',
			value: fn('oklab', [pct(oklab.l), num(oklab.a, 4), num(oklab.b, 4)], alpha)
		},
		{
			id: 'oklch',
			label: 'OKLCH',
			value: fn('oklch', [pct(oklch.l), num(oklch.c, 4), hue(oklch.h)], alpha)
		},
		{
			id: 'p3',
			label: 'Display P3',
			value: fn('color', ['display-p3', num(p3.r, 4), num(p3.g, 4), num(p3.b, 4)], alpha)
		},
		{
			id: 'name',
			label: 'CSS name',
			value: named.name,
			note: named.approximate ? 'closest match' : undefined
		},
		{ id: 'int', label: 'Decimal', value: String(toInt(color)) },
		{ id: 'android', label: 'Android', value: `#${argb}`, note: 'AARRGGBB' },
		{ id: 'flutter', label: 'Flutter', value: `Color(0x${argb})` },
		{
			id: 'swift',
			label: 'Swift',
			value: `UIColor(red: ${num(clamp(rgb.r), 3)}, green: ${num(clamp(rgb.g), 3)}, blue: ${num(clamp(rgb.b), 3)}, alpha: ${num(alpha, 3)})`
		}
	];
}
