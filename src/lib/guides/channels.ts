import { converter } from 'culori/fn';
import type { Color } from 'culori/fn';
import { fromCmyk, toCmyk } from '#lib/color/index.js';
import type { Channel } from './types';

type Mode = 'rgb' | 'hsl' | 'hsv' | 'hwb' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'p3';

type Options = {
	min?: number;
	scale?: number;
	unit?: string;
	places?: number;
	step?: number;
};

type Channels = Record<string, number | undefined>;

const channel = (
	label: string,
	mode: Mode,
	key: string,
	max: number,
	{ min = 0, scale = 1, unit = '', places = 0, step = (max - min) / 100 }: Options = {}
): Channel => {
	const to = converter(mode) as unknown as (color: Color) => Channels;
	return {
		label,
		min,
		max,
		step,
		read: (color) => to(color)[key] ?? 0,
		write: (color, value) => ({ ...to(color), [key]: value }) as unknown as Color,
		say: (value) => `${Number((value * scale).toFixed(places))}${unit}`
	};
};

const percent = { scale: 100, unit: '%' };
const hue = (mode: Mode) => channel('Hue', mode, 'h', 360, { unit: '°', step: 1 });
const byte = (label: string, key: string) =>
	channel(label, 'rgb', key, 1, { scale: 255, step: 1 / 255 });

/** Ink levels to look at rather than drag, as naive CMYK always zeroes one of C, M or Y. */
const ink = (label: string, key: 'c' | 'm' | 'y' | 'k'): Channel => ({
	label,
	min: 0,
	max: 1,
	step: 0.01,
	locked: true,
	read: (color) => toCmyk(color)[key],
	write: (color, value) => {
		const inks = toCmyk(color);
		inks[key] = value;
		return fromCmyk(inks.c, inks.m, inks.y, inks.k, color.alpha ?? 1);
	},
	say: (value) => `${Math.round(value * 100)}%`
});

export const SRGB = [byte('Red', 'r'), byte('Green', 'g'), byte('Blue', 'b')];

export const HSL = [
	hue('hsl'),
	channel('Saturation', 'hsl', 's', 1, percent),
	channel('Lightness', 'hsl', 'l', 1, percent)
];

export const HSV = [
	hue('hsv'),
	channel('Saturation', 'hsv', 's', 1, percent),
	channel('Brightness', 'hsv', 'v', 1, percent)
];

export const HWB = [
	hue('hwb'),
	channel('Whiteness', 'hwb', 'w', 1, percent),
	channel('Blackness', 'hwb', 'b', 1, percent)
];

export const CMYK = [ink('Cyan', 'c'), ink('Magenta', 'm'), ink('Yellow', 'y'), ink('Key', 'k')];

export const LAB = [
	channel('Lightness', 'lab', 'l', 100, { unit: '%' }),
	channel('a: green to red', 'lab', 'a', 125, { min: -125 }),
	channel('b: blue to yellow', 'lab', 'b', 125, { min: -125 })
];

export const LCH = [
	channel('Lightness', 'lch', 'l', 100, { unit: '%' }),
	channel('Chroma', 'lch', 'c', 150),
	hue('lch')
];

export const OKLAB = [
	channel('Lightness', 'oklab', 'l', 1, percent),
	channel('a: green to red', 'oklab', 'a', 0.4, { min: -0.4, places: 3 }),
	channel('b: blue to yellow', 'oklab', 'b', 0.4, { min: -0.4, places: 3 })
];

export const OKLCH = [
	channel('Lightness', 'oklch', 'l', 1, percent),
	channel('Chroma', 'oklch', 'c', 0.4, { places: 3 }),
	hue('oklch')
];

export const P3 = [
	channel('Red', 'p3', 'r', 1, { places: 3 }),
	channel('Green', 'p3', 'g', 1, { places: 3 }),
	channel('Blue', 'p3', 'b', 1, { places: 3 })
];
