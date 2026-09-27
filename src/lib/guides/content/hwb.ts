import { HWB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'hwb',
	title: 'HWB colors',
	description:
		'HWB describes a colour as a hue plus how much white and black you mix in. How to read it, how CSS supports it, and a converter for any colour you have.',
	lede: "HWB is how you'd mix paint if paint were light: start with a pure colour, then stir in some white and some black. It's also one of the friendliest formats CSS has.",
	parts: ['hue', 'whiteness', 'blackness', 'alpha'],
	channels: HWB,
	sections: [
		{
			heading: 'A hue, some white, some black',
			body: [
				'A mid blue like `#3A7BD5` is `hwb(214.84 22.7% 16.5%)`. The first number is the hue, the same angle round the colour wheel that HSL and HSB use, so `0` is red, `120` is green and `240` is blue.',
				"Whiteness is how much white is mixed in, blackness is how much black. `hwb(0 0% 0%)` is pure red. Add white and it heads towards pink, add black and it heads towards maroon, add both and it goes greyish. That's it - two knobs that do exactly what they say on the tin.",
				"Once whiteness and blackness add up to `100%` or more there's no room left for the hue, and you get a flat grey. `hwb(0 50% 50%)` and `hwb(200 50% 50%)` are the same middle grey."
			]
		},
		{
			heading: 'Where you can use it',
			body: [
				"`hwb()` is proper CSS and works in every current major browser, so you can drop it straight into a stylesheet. Unlike `rgb()` and `hsl()` it never had a comma version, so it's always spaces, with a slash before any alpha: `hwb(215 23% 17% / 0.5)`.",
				"Design tools mostly don't show it, and you won't find many brand guides written in it. It's more of a writing-by-hand format, handy when you're tweeking a colour in code and want to know what the numbers will do before you save."
			]
		},
		{
			heading: 'How it relates to HSB',
			body: [
				'HWB was designed by Alvy Ray Smith, the same person behind HSV, as an easier way to think about the same thing. The maths is a straight swap: whiteness is one minus saturation, times brightness, and blackness is one minus brightness.',
				"So every point in a design tool's HSB square has an HWB address too. Whiteness grows as you move towards the left edge, blackness as you move towards the bottom."
			]
		},
		{
			heading: "What it won't do for you",
			body: [
				"Like HSL and HSB, HWB is built straight on top of sRGB, so equal steps don't look equal. A yellow and a blue with the same whiteness and blackness still look miles apart in brightness. For palettes where that matters, have a look at OKLCH."
			]
		}
	],
	related: ['hsb', 'hsl', 'oklch']
} satisfies Guide;
