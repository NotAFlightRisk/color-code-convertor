import { describe, expect, it } from 'vitest';
import { fromHash, toHash } from './link';
import { parseColor, toHexValue } from './color';

describe('share links', () => {
	it.each([
		'#3a7bd5',
		'hsl(210, 50%, 50%)',
		'oklch(58% .15 258)',
		'color(display-p3 0.2933 0.4765 0.81)',
		'rgb(58 123 213 / 50%)',
		'--brand: #3a7bd5;'
	])('round-trips %s', (input) => {
		expect(fromHash(toHash(input))).toBe(input.replace(/^#/, ''));
	});

	it.each([
		['#hsl(210,%2050%,%2050%)', '#4080bf'],
		['#hsl(210 50% 50%)', '#4080bf'],
		['#rgb(58,%20123,%20213)', '#3a7bd5']
	])('reads the colour out of a hand-written %s', (hash, expected) => {
		expect(toHexValue(parseColor(fromHash(hash))!)).toBe(expected);
	});

	it.each([
		['#50%', '50%'],
		['#%', '%'],
		['#%zz', '%zz'],
		['#%FF', '%FF'],
		['#50% %FF', '50% %FF']
	])('leaves %s as it found it', (hash, expected) => {
		expect(fromHash(hash)).toBe(expected);
	});
});
