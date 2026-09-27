import { describe, expect, it } from 'vitest';
import { anatomy } from './anatomy';

const labelled = (value: string, parts: string[]) =>
	anatomy(value, parts)
		.filter((piece) => piece.part)
		.map((piece) => [piece.text, piece.part]);

describe('anatomy', () => {
	it('pairs up hex digits', () => {
		expect(labelled('#3a7bd5', ['red', 'green', 'blue'])).toEqual([
			['3a', 'red'],
			['7b', 'green'],
			['d5', 'blue']
		]);
	});

	it('reads the alpha first in a Flutter literal, not the 0 of 0x', () => {
		expect(labelled('Color(0xFF3A7BD5)', ['alpha', 'red', 'green', 'blue'])[0]).toEqual([
			'FF',
			'alpha'
		]);
	});

	it('skips the digit inside display-p3', () => {
		expect(labelled('color(display-p3 0.2651 0.4776 0.8093)', ['red', 'green', 'blue'])).toEqual([
			['0.2651', 'red'],
			['0.4776', 'green'],
			['0.8093', 'blue']
		]);
	});

	it('keeps negatives and percentages whole', () => {
		expect(labelled('lab(51.2% 8.5 -55.3)', ['l', 'a', 'b']).map(([text]) => text)).toEqual([
			'51.2%',
			'8.5',
			'-55.3'
		]);
	});

	it('treats a bare number as one piece rather than hex', () => {
		expect(labelled('3832789', ['all of it'])).toEqual([['3832789', 'all of it']]);
	});

	it('hands back a name whole', () => {
		expect(anatomy('cornflowerblue', ['name'])).toEqual([{ text: 'cornflowerblue', part: 'name' }]);
	});

	it('loses nothing when put back together', () => {
		const value = 'UIColor(red: 0.227, green: 0.482, blue: 0.835, alpha: 1)';
		const pieces = anatomy(value, ['red', 'green', 'blue', 'alpha']);
		expect(pieces.map((piece) => piece.text).join('')).toBe(value);
		expect(pieces.filter((piece) => piece.part)).toHaveLength(4);
	});
});
