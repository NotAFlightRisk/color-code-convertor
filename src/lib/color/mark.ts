import type { Color } from 'culori/fn';
import { ladder } from './scale';

type Box = { x: number; y: number; w: number; h: number };

const BOX = 64;
const SIZE = 34;

/** Painted in order, so the colour itself lands on top of its two shades. */
const SQUARES: Box[] = [
	{ x: 4, y: 26, w: SIZE, h: SIZE },
	{ x: 26, y: 26, w: SIZE, h: SIZE },
	{ x: 15, y: 4, w: SIZE, h: SIZE }
];

const meet = (a: Box, b: Box): Box => {
	const x = Math.max(a.x, b.x);
	const y = Math.max(a.y, b.y);
	return { x, y, w: Math.min(a.x + a.w, b.x + b.w) - x, h: Math.min(a.y + a.h, b.y + b.h) - y };
};

const [left, right, top] = SQUARES;

/** Where the squares cross, ending with the patch all three share. */
const CROSSINGS = [
	meet(left, right),
	meet(left, top),
	meet(right, top),
	meet(meet(left, right), top)
];

/** Red, green and blue, the light they add up to in pairs, then white where all three meet. */
const LIGHT = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];

/** Four and two rungs up or down the colour's own ladder, then the colour itself. */
const shades = (color: Color) => {
	const steps = ladder(color);
	const at = steps.findIndex((step) => step.source);
	const lighter = at < steps.length / 2;
	return [4, 2, 0].map((gap) => steps[lighter ? at + gap : at - gap].hex);
};

const paint = (boxes: Box[], fills: string[]) =>
	boxes
		.map(
			({ x, y, w, h }, index) =>
				`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fills[index]}"/>`
		)
		.join('');

/** A colour on two shades of itself, or red, green and blue while there isn't one yet. */
export function markSvg(color?: Color): string {
	const body = color ? paint(SQUARES, shades(color)) : paint([...SQUARES, ...CROSSINGS], LIGHT);
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOX} ${BOX}">${body}</svg>`;
}

export const markUri = (color?: Color) =>
	`data:image/svg+xml,${encodeURIComponent(markSvg(color))}`;
