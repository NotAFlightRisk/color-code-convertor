import { clampChroma, formatHex } from 'culori/fn';
import type { Color } from 'culori/fn';
import { toOklch, toRgb } from './modes';
import { textOn } from './scale';

const BOX = 64;
const SIZE = 34;

/** Painted in order, so the colour itself lands on top of its two triadic siblings. */
const SQUARES = [
	{ x: 4, y: 26, turn: -120 },
	{ x: 26, y: 26, turn: 120 },
	{ x: 15, y: 4, turn: 0 }
];

const sibling = (color: Color, turn: number) => {
	const base = toOklch(color);
	const turned = { ...base, h: ((base.h ?? 0) + turn + 360) % 360, alpha: 1 };
	return formatHex(toRgb(clampChroma(turned, 'oklch', 'rgb')));
};

/** The site mark: three overlapping squares mixing a colour with its triad. */
export function markSvg(color: Color): string {
	const ground = textOn(sibling(color, 0));
	const squares = SQUARES.map(
		({ x, y, turn }) =>
			`<rect x="${x}" y="${y}" width="${SIZE}" height="${SIZE}" fill="${sibling(color, turn)}"/>`
	).join('');

	return (
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOX} ${BOX}">` +
		`<rect width="${BOX}" height="${BOX}" rx="10" fill="${ground}"/>` +
		`<g fill-opacity=".85">${squares}</g></svg>`
	);
}

export const markUri = (color: Color) => `data:image/svg+xml,${encodeURIComponent(markSvg(color))}`;
