import { describe, expect, it } from 'vitest';
import { formatAll, inkOn, ladder, parseColor, signalOn, toHexValue } from './index';

const hex = (input: string) => {
	const color = parseColor(input);
	expect(color, `failed to parse: ${input}`).not.toBeNull();
	return toHexValue(color!);
};

const format = (input: string, id: string) =>
	formatAll(parseColor(input)!).find((entry) => entry.id === id)?.value;

describe('parsing', () => {
	it.each([
		['#ff0000', '#ff0000'],
		['#F00', '#ff0000'],
		['ff0000', '#ff0000'],
		['  #Ff0000  ', '#ff0000'],
		['red', '#ff0000'],
		['rgb(255, 0, 0)', '#ff0000'],
		['rgb(255 0 0)', '#ff0000'],
		['rgba(255, 0, 0, 0.5)', '#ff0000'],
		['255, 0, 0', '#ff0000'],
		['255 0 0', '#ff0000'],
		['hsl(0, 100%, 50%)', '#ff0000'],
		['0, 100%, 50%', '#ff0000'],
		['hsb(0, 100%, 100%)', '#ff0000'],
		['hsv(0deg 100% 100%)', '#ff0000'],
		['hwb(0 0% 0%)', '#ff0000'],
		['cmyk(0%, 100%, 100%, 0%)', '#ff0000'],
		['cmyk(0, 1, 1, 0)', '#ff0000'],
		['lab(54.29% 80.8 69.89)', '#ff0000'],
		['oklch(62.8% 0.2577 29.23)', '#ff0000'],
		['color(display-p3 0.9175 0.2003 0.1386)', '#ff0000'],
		['0xFFFF0000', '#ff0000'],
		['Color(0xFFFF0000)', '#ff0000'],
		['UIColor(red: 1.0, green: 0.0, blue: 0.0, alpha: 1.0)', '#ff0000'],
		['--brand: #ff0000;', '#ff0000'],
		['background: red;', '#ff0000'],
		['"#ff0000"', '#ff0000']
	])('reads %s', (input, expected) => {
		expect(hex(input)).toBe(expected);
	});

	it('reads a bare number as decimal only when it cannot be hex', () => {
		expect(hex('16711680')).toBe('#ff0000');
		expect(hex('12345')).toBe('#003039');
		expect(hex('255')).toBe('#225555');
	});

	it('keeps alpha', () => {
		expect(parseColor('rgba(255, 0, 0, 0.5)')?.alpha).toBe(0.5);
		expect(parseColor('#ff000080')?.alpha).toBeCloseTo(0.502, 3);
		expect(parseColor('0x80FF0000')?.alpha).toBeCloseTo(0.502, 3);
	});

	it('rejects nonsense', () => {
		expect(parseColor('')).toBeNull();
		expect(parseColor('not a colour')).toBeNull();
		expect(parseColor('#gg0000')).toBeNull();
		expect(parseColor('rgb(')).toBeNull();
	});
});

describe('formatting', () => {
	it('covers every format for red', () => {
		const entries = formatAll(parseColor('#ff0000')!);
		expect(Object.fromEntries(entries.map((e) => [e.id, e.value]))).toMatchObject({
			hex: '#ff0000',
			hex8: '#ff0000ff',
			rgb: 'rgb(255, 0, 0)',
			hsl: 'hsl(0, 100%, 50%)',
			hsb: 'hsb(0, 100%, 100%)',
			hwb: 'hwb(0 0% 0%)',
			cmyk: 'cmyk(0%, 100%, 100%, 0%)',
			name: 'red',
			int: '16711680',
			android: '#FFFF0000',
			flutter: 'Color(0xFFFF0000)',
			swift: 'UIColor(red: 1, green: 0, blue: 0, alpha: 1)'
		});
	});

	it('switches to alpha syntax when translucent', () => {
		expect(format('rgba(255, 0, 0, 0.5)', 'rgb')).toBe('rgba(255, 0, 0, 0.5)');
		expect(format('rgba(255, 0, 0, 0.5)', 'hsl')).toBe('hsla(0, 100%, 50%, 0.5)');
		expect(format('rgba(255, 0, 0, 0.5)', 'hwb')).toBe('hwb(0 0% 0% / 0.5)');
		expect(format('rgba(255, 0, 0, 0.5)', 'android')).toBe('#80FF0000');
	});

	it('handles greys, black and white', () => {
		expect(format('#000000', 'cmyk')).toBe('cmyk(0%, 0%, 0%, 100%)');
		expect(format('#ffffff', 'cmyk')).toBe('cmyk(0%, 0%, 0%, 0%)');
		expect(format('#808080', 'hsl')).toBe('hsl(0, 0%, 50.2%)');
		expect(format('#ffffff', 'name')).toBe('white');
	});

	it('marks a name it had to approximate', () => {
		const entries = formatAll(parseColor('#ff0001')!);
		const name = entries.find((entry) => entry.id === 'name');
		expect(name?.note).toBe('closest match');
	});

	it('picks an ink that can be read on the colour', () => {
		expect(inkOn('#ffffff')).toBe('#050607');
		expect(inkOn('#000000')).toBe('#e9ebec');
		expect(signalOn('#ffffff')).toBe('#ffffff');
		expect(signalOn('#0a0a0a')).toBe('#e9ebec');
	});

	it('builds a ladder holding the pasted colour in place', () => {
		const steps = ladder(parseColor('#3a7bd5')!);
		expect(steps).toHaveLength(9);
		expect(steps.filter((step) => step.source)).toHaveLength(1);
		expect(steps.find((step) => step.source)?.hex).toBe('#3a7bd5');
		expect(steps.map((step) => step.lightness)).toEqual(
			[...steps.map((s) => s.lightness)].sort((a, b) => a - b)
		);
	});

	it('round-trips every format it prints', () => {
		const source = parseColor('#3a7bd5')!;
		const skip = new Set(['name', 'cmyk', 'android']);
		for (const entry of formatAll(source)) {
			if (skip.has(entry.id)) continue;
			expect(hex(entry.value), `${entry.id}: ${entry.value}`).toBe('#3a7bd5');
		}
	});
});
