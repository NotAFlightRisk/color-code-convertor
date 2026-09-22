import { describe, expect, it } from 'vitest';
import { ladder, markSvg, markUri, parseColor } from './index';
import { toOklch } from './modes';

const svg = (input: string) => markSvg(parseColor(input)!);
const fills = (input: string) =>
	[...svg(input).matchAll(/<rect[^>]*fill="(#[0-9a-f]{6})"/g)].map((m) => m[1]);
const lightness = (hex: string) => toOklch(parseColor(hex)!).l;

describe('the mark', () => {
	it('draws the ground plus three squares', () => {
		expect(fills('#3a7bd5')).toHaveLength(4);
	});

	it('paints the colour itself last, so it lands on top', () => {
		expect(fills('#3a7bd5').at(-1)).toBe('#3a7bd5');
	});

	it("takes the two shades off the colour's own ladder", () => {
		const rungs = ladder(parseColor('#3a7bd5')!).map((step) => step.hex);
		expect(rungs).toEqual(expect.arrayContaining(fills('#3a7bd5').slice(1, 3)));
	});

	it('lightens a dark colour and darkens a light one', () => {
		const [, ...dark] = fills('#0b3d2e');
		const [, ...light] = fills('#f5d76e');
		expect(dark.map(lightness)).toEqual(dark.map(lightness).toSorted().toReversed());
		expect(light.map(lightness)).toEqual(light.map(lightness).toSorted());
	});

	it('gives a grey three different greys', () => {
		expect(new Set(fills('#808080').slice(1)).size).toBe(3);
	});

	it('grounds a dark colour on light and a light one on dark', () => {
		expect(fills('#0b3d2e')[0]).toBe('#e9ebec');
		expect(fills('#f5d76e')[0]).toBe('#050607');
	});

	it('moves every square when the colour changes', () => {
		expect(fills('#3a7bd5').slice(1)).not.toEqual(fills('#d53a7b').slice(1));
	});

	it('escapes the hashes so the data URI survives', () => {
		expect(markUri(parseColor('#3a7bd5')!)).toMatch(/^data:image\/svg\+xml,%3Csvg/);
		expect(markUri(parseColor('#3a7bd5')!)).not.toContain('#');
	});
});
