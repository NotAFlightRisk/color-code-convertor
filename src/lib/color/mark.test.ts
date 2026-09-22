import { describe, expect, it } from 'vitest';
import { ladder, markSvg, markUri, parseColor } from './index';
import { toOklch } from './modes';

const RECT = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)" fill="(#[0-9a-f]{6})"\/>/g;

type Patch = { x: number; y: number; w: number; h: number; fill: string };

const rects = (svg: string): Patch[] =>
	[...svg.matchAll(RECT)].map(([, x, y, w, h, fill]) => ({
		x: Number(x),
		y: Number(y),
		w: Number(w),
		h: Number(h),
		fill
	}));
const inside = (inner: Patch, ...outers: Patch[]) =>
	outers.every(
		(outer) =>
			inner.x >= outer.x &&
			inner.y >= outer.y &&
			inner.x + inner.w <= outer.x + outer.w &&
			inner.y + inner.h <= outer.y + outer.h
	);
const fills = (input: string) => rects(markSvg(parseColor(input)!)).map((rect) => rect.fill);
const lightness = (hex: string) => toOklch(parseColor(hex)!).l;

describe('the mark', () => {
	it('draws three solid squares and nothing behind them', () => {
		const svg = markSvg(parseColor('#3a7bd5')!);
		expect(rects(svg)).toHaveLength(3);
		expect(svg).not.toContain('width="64"');
		expect(svg).not.toContain('opacity');
	});

	it('paints the colour itself last, so it lands on top', () => {
		expect(fills('#3a7bd5').at(-1)).toBe('#3a7bd5');
	});

	it("takes the two shades off the colour's own ladder", () => {
		const rungs = ladder(parseColor('#3a7bd5')!).map((step) => step.hex);
		expect(rungs).toEqual(expect.arrayContaining(fills('#3a7bd5').slice(0, 2)));
	});

	it('lightens a dark colour and darkens a light one', () => {
		const dark = fills('#0b3d2e');
		const light = fills('#f5d76e');
		expect(dark.map(lightness)).toEqual(dark.map(lightness).toSorted().toReversed());
		expect(light.map(lightness)).toEqual(light.map(lightness).toSorted());
	});

	it('gives a grey three different greys', () => {
		expect(new Set(fills('#808080')).size).toBe(3);
	});

	it('moves every square when the colour changes', () => {
		const other = fills('#d53a7b');
		fills('#3a7bd5').forEach((hex, index) => expect(hex).not.toBe(other[index]));
	});

	it('falls back to red, green and blue with white where all three cross', () => {
		const patches = rects(markSvg());
		expect(patches.map((patch) => patch.fill)).toEqual([
			'#ff0000',
			'#00ff00',
			'#0000ff',
			'#ffff00',
			'#ff00ff',
			'#00ffff',
			'#ffffff'
		]);
	});

	it('mixes the light where two squares cross, and all of it where three do', () => {
		const [red, green, blue, yellow, magenta, cyan, white] = rects(markSvg());
		expect(inside(yellow, red, green)).toBe(true);
		expect(inside(magenta, red, blue)).toBe(true);
		expect(inside(cyan, green, blue)).toBe(true);
		expect(inside(white, red, green, blue)).toBe(true);
		expect(white.w * white.h).toBeGreaterThan(0);
	});

	it('escapes the hashes so the data URI survives', () => {
		expect(markUri(parseColor('#3a7bd5')!)).toMatch(/^data:image\/svg\+xml,%3Csvg/);
		expect(markUri()).not.toContain('#');
	});
});
