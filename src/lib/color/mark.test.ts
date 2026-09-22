import { describe, expect, it } from 'vitest';
import { markSvg, markUri, parseColor } from './index';

const svg = (input: string) => markSvg(parseColor(input)!);
const fills = (input: string) =>
	[...svg(input).matchAll(/<rect[^>]*fill="(#[0-9a-f]{6})"/g)].map((m) => m[1]);

describe('the mark', () => {
	it('draws the ground plus three squares', () => {
		expect(fills('#3a7bd5')).toHaveLength(4);
	});

	it('paints the colour itself last, so it lands on top', () => {
		expect(fills('#3a7bd5').at(-1)).toBe('#3a7bd5');
	});

	it('gives an achromatic colour three identical squares', () => {
		expect(new Set(fills('#808080').slice(1)).size).toBe(1);
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
