import type { Color } from 'culori/fn';
import { ladder, textOn } from './scale';

const BOX = 64;
const SIZE = 34;

/** Painted in order, so the colour itself lands on top of its two shades. */
const SQUARES = [
	{ x: 4, y: 26 },
	{ x: 26, y: 26 },
	{ x: 15, y: 4 }
];

/** Four and two rungs up or down the colour's own ladder, then the colour itself. */
const fills = (color: Color) => {
	const steps = ladder(color);
	const at = steps.findIndex((step) => step.source);
	const lighter = at < steps.length / 2;
	return [4, 2, 0].map((gap) => steps[lighter ? at + gap : at - gap].hex);
};

/** The site mark: three overlapping squares, a colour sat on two shades of itself. */
export function markSvg(color: Color): string {
	const hexes = fills(color);
	const squares = SQUARES.map(
		({ x, y }, index) =>
			`<rect x="${x}" y="${y}" width="${SIZE}" height="${SIZE}" fill="${hexes[index]}"/>`
	).join('');

	return (
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOX} ${BOX}">` +
		`<rect width="${BOX}" height="${BOX}" rx="10" fill="${textOn(hexes[2])}"/>` +
		`<g fill-opacity=".85">${squares}</g></svg>`
	);
}

export const markUri = (color: Color) => `data:image/svg+xml,${encodeURIComponent(markSvg(color))}`;
