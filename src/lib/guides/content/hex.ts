import { SRGB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'hex',
	title: 'HEX color codes',
	description:
		'What a hex colour code like #3a7bd5 actually means, how the six digits map to red, green and blue, plus a converter that turns any colour into hex.',
	lede: 'That `#3a7bd5` in your stylesheet is three numbers in a disguise. Once you can see them, you can read any hex code at a glance.',
	parts: ['red', 'green', 'blue'],
	channels: SRGB,
	sections: [
		{
			heading: 'Three pairs of digits',
			body: [
				'A hex code is a `#` and six characters, read in pairs. The first pair is red, the second is green and the third is blue. Each pair runs from `00` (none of that light) to `FF` (all of it), so `#FF0000` is full red with no green or blue, and `#FFFFFF` is all three at once, which your screen shows as white.',
				"Why the letters? Hex counts in base 16, so after 9 it carries on with A to F. `A` is 10, `F` is 15, and a pair is the first digit times 16, plus the second. `3A` is 3 times 16 plus 10, which is 58. Thats the only maths you'll ever need here, and the converter above does it for you anyway.",
				'Two digits per channel gives 256 levels each, and 256 cubed is a bit over 16.7 million colours. That covers every colour a normal sRGB screen can show, which is a big part of why hex has stuck around.'
			]
		},
		{
			heading: 'The three-digit shorthand',
			body: [
				"When every pair is a doubled digit you can write it with three characters instead, so `#FA0` is the same colour as `#FFAA00`. It only works for 4,096 colours though, so most of the ones you pick won't have a short form.",
				"There's a four-digit version as well, `#FA08`, where the last digit is alpha (see the 8-digit hex page for how transparency works)."
			]
		},
		{
			heading: "Where you'll see it",
			body: [
				"Pretty much everywhere. CSS, HTML, SVG, Figma, Photoshop, brand guidelines, the colour picker built into your OS. If a tool only accepts one colour format, it's this one.",
				"Case doesn't matter. `#3A7BD5` and `#3a7bd5` are the same colour, so pick a style and stick with it."
			]
		},
		{
			heading: "What it's bad at",
			body: [
				'Hex is RGB written differently, so it has all of RGB\'s problems. Making a colour "a bit lighter" by editing a hex code is guesswork, because lightness is spread across all three pairs. If you\'re building a palette, HSL or OKLCH are much easier to reason about, and you can convert back to hex at the end.',
				"It also stops at sRGB. The extra-vivid colours newer screens can show (Display P3) don't have a hex code, so they get clamped to the nearest one that does."
			]
		}
	],
	related: ['hex-alpha', 'rgb', 'decimal']
} satisfies Guide;
