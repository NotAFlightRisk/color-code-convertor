import { P3 } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'p3',
	title: 'Display P3 colors',
	description:
		'What color(display-p3) values mean, how Display P3 fits more vivid colours than sRGB and hex, when to use it in CSS, plus a converter for any colour.',
	lede: "Display P3 is RGB with a bigger box of crayons. Your phone can probably show reds and greens that hex just can't describe, and this is how you ask for them.",
	parts: ['red', 'green', 'blue', 'alpha'],
	channels: P3,
	sections: [
		{
			heading: 'How to read one',
			body: [
				'The default blue on this site is `color(display-p3 0.2933 0.4765 0.81)`. The `display-p3` bit names the colour space, then you get red, green and blue, each from `0` to `1` rather than `0` to `255`. It works just like RGB - mix the three lights, all at `1` is white, all at `0` is black.',
				"The difference is how far each light goes. P3's `1` for red is a deeper, more intense red than sRGB's, and the same goes for green. The result is roughly a quarter more colours than sRGB, with most of the extra room in the reds, oranges and greens."
			]
		},
		{
			heading: 'Same colour, different numbers',
			body: [
				'Because the scale is wider, a colour you already know gets different numbers in P3. Plain `#FF0000` is `color(display-p3 0.9175 0.2003 0.1386)`, nowhere near `1 0 0`.',
				"Go the other way and `color(display-p3 1 0 0)` is a red that doesn't have a hex code at all. On an sRGB screen it gets squashed down to about `#FF0000`, and on a P3 screen it looks noticably punchier. That's also why the hex, RGB and HSL rows in this converter can't always represent a P3 colour exactly - they clamp it to the nearest one they can hold."
			]
		},
		{
			heading: "Where you'll see it",
			body: [
				"Apple kicked it off, so it's the native space for recent iPhones, iPads and Macs. Plenty of newer Android phones, laptops and monitors cover it too.",
				"In CSS it's `color(display-p3 ...)`, which every current major browser understands. You can check whether the screen can actually show it with `@media (color-gamut: p3)`, and a common pattern is to declare a normal hex colour first and then the P3 version on the next line, so anything that doesn't get it still has something sensible."
			]
		},
		{
			heading: 'Things to watch',
			body: [
				"It uses the same brightness curve and white point as sRGB, so the only thing that changes is how saturated the primaries are. That makes it easy to move between the two, but it also means you can't tell a P3 colour from an sRGB one by eye on a screen that isn't P3 - test on a real wide-gamut display before you get too attached.",
				"Values below `0` or above `1` mean you've gone outside P3 itself. Browsers clamp those, same as they do for anything else out of range. For picking or tweaking wide-gamut colours by hand, OKLCH is usually easier, and it reaches P3 colours just fine."
			]
		}
	],
	related: ['rgb', 'oklch', 'hex']
} satisfies Guide;
