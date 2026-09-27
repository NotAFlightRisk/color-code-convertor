import { SRGB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'rgb',
	title: 'RGB colors',
	description:
		'How rgb() colour values work, what the three numbers from 0 to 255 mean, the old rgba() versus the new slash syntax, and a converter for any colour.',
	lede: 'Every pixel on your screen is three tiny lights, red, green and blue. An `rgb()` value just tells each one how bright to be.',
	parts: ['red', 'green', 'blue', 'alpha'],
	channels: SRGB,
	sections: [
		{
			heading: 'Three lights, 0 to 255',
			body: [
				'`rgb(58, 123, 213)` means red at 58, green at 123 and blue at 213, each out of 255. Zero is that light switched off, 255 is full brightness. All three at 0 is black, all three at 255 is white, and equal amounts of each give you a grey.',
				"It's additive, like mixing torchlight rather than paint. Red and green at full with no blue gives you yellow, `rgb(255, 255, 0)`, which feels wrong the first time you see it but makes sense once you think of it as light.",
				"Why 255? Each channel is stored in one byte, and a byte holds 256 values, 0 to 255. That's also why RGB and hex map onto each other so neatly - `58` is `3A`, `123` is `7B` and `213` is `D5`."
			]
		},
		{
			heading: 'rgb(), rgba() and the slash',
			body: [
				'The classic way to add transparency was `rgba(58, 123, 213, 0.5)`, with a fourth number from 0 to 1. Modern CSS lets you drop the commas and put alpha after a slash instead: `rgb(58 123 213 / 50%)`.',
				'These days `rgba()` is just an alias for `rgb()`, so either name takes either syntax in current browsers. You can also write the channels as percentages, `rgb(23% 48% 84%)`, though hardly anyone does.',
				'This page writes the comma version because it works everywhere, including older browsers and tools that never learned the new syntax.'
			]
		},
		{
			heading: "Where you'll see it",
			body: [
				"CSS, obviously, plus pretty much every design tool, image editor and game engine. When a colour picker shows you three number boxes, they're almost always RGB. Some tools use 0 to 1 instead of 0 to 255 - Swift and a lot of shader code do - so divide by 255 to convert."
			]
		},
		{
			heading: 'Where RGB gets awkward',
			body: [
				"RGB is how screens work, not how people see. Want the same blue but a touch lighter? You'd have to nudge all three numbers by different amounts and hope. HSL and OKLCH let you change lightness on its own, which is much easier when you're building a palette.",
				"It's also stuck in sRGB. Numbers above 255 don't get you a brighter red, they just get clamped. For the more vivid colours newer screens can show, you need Display P3."
			]
		}
	],
	related: ['hex', 'hsl', 'display-p3']
} satisfies Guide;
