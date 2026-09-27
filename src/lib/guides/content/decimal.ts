import { SRGB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'int',
	title: 'Decimal color codes',
	description:
		'How a colour turns into one decimal number like 3832789, the maths from RGB and back, where Discord and Minecraft want it, and a converter.',
	lede: "Some tools want your colour as one plain number, like `3832789`. It's the same red, green and blue as a hex code, just added up.",
	parts: ['red, green and blue in one number'],
	channels: SRGB,
	sections: [
		{
			heading: 'Hex, without the hex',
			body: [
				"Take a hex code, drop the `#`, and read the six digits as one big hexadecimal number. Convert that to ordinary base 10 and you've got the decimal colour. `#3a7bd5` becomes `0x3a7bd5`, which is `3832789`.",
				"If you'd rather do it from RGB, red is worth 65,536, green is worth 256 and blue is worth 1. For `rgb(58, 123, 213)` that's 58 times 65,536, plus 123 times 256, plus 213, which is 3,801,088 plus 31,488 plus 213. Same answer, `3832789`.",
				'The range runs from `0` for black up to `16777215` for white, so every sRGB colour has exactly one number.'
			]
		},
		{
			heading: 'Going back the other way',
			body: [
				"Divide by 65,536 and the whole number is red. Take what's left over, divide by 256, and the whole number is green. Whatever remains is blue. In code it's usually bit shifts: `(n >> 16) & 255` for red, `(n >> 8) & 255` for green and `n & 255` for blue.",
				'Easier still, convert it to hex and pad it to six digits. `65280` is `FF00`, which pads to `00FF00`, pure green. The padding goes on the front, never the back.'
			]
		},
		{
			heading: "Where you'll see it",
			body: [
				'Discord embeds want the colour as a decimal number, so do some game files, like the colour of dyed leather armour in Minecraft. Databases and APIs sometimes store colours this way too, because one integer is smaller than a string.',
				"If you paste a bare number here it's read as decimal, unless it's 3, 4 or 6 digits long, in which case it's read as hex. So `16711680` is red, but `255` comes out as `#225555`. Bit odd, but short hex codes are far more common than tiny decimals."
			]
		},
		{
			heading: 'Watch out for BGR',
			body: [
				'Windows, Excel and VBA pack colours the other way round, blue first. Their `RGB(255, 0, 0)` gives `255`, which in the usual red-first order is pure blue. If a number from Office comes out with red and blue swapped, thats why.',
				"There's no alpha either. If a system stores alpha in a decimal colour, it's usually a 32-bit number with alpha on the front, which is basically the Android format as one number."
			]
		}
	],
	related: ['hex', 'rgb', 'android']
} satisfies Guide;
