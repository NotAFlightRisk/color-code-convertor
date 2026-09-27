import { SRGB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'hex8',
	title: '8-digit HEX colors',
	description:
		'How 8-digit hex colours like #3a7bd580 carry transparency in the last pair, why Android puts it first, and a converter that adds alpha to any colour.',
	lede: 'Tack two more digits onto a normal hex code and you get transparency. The trick is knowing which end they go on, because not everyone agrees.',
	parts: ['red', 'green', 'blue', 'alpha'],
	channels: SRGB,
	sections: [
		{
			heading: 'The fourth pair is alpha',
			body: [
				'An 8-digit hex code is a regular `#RRGGBB` with one extra pair on the end. That last pair is alpha, how solid the colour is, and it runs from `00` (fully see-through) to `FF` (fully opaque). So `#3a7bd5ff` is exactly the same as `#3a7bd5`, and `#3a7bd500` is the same blue but completely invisible.',
				"To turn a percentage into a pair, multiply by 255 and convert to hex. Half transparent is 255 times 0.5, which is about 128, and 128 in hex is `80`. So `#3a7bd580` is the blue at roughly 50%. Its not exact - `80` works out at 50.2% - but nobody's going to spot the difference.",
				"There's a four-digit shorthand too. `#FA08` expands to `#FFAA0088`, the same doubling trick as three-digit hex."
			]
		},
		{
			heading: 'Which end does alpha go on?',
			body: [
				"CSS puts it last, `#RRGGBBAA`. Android and Flutter put it first, `#AARRGGBB` and `0xAARRGGBB`. Both are eight hex digits, so there's no way to tell them apart by looking, and pasting one into the other gives you a completely different colour.",
				"Take `#80FF0000`. In CSS that's a lime green with an alpha of `00`, so you can't see it at all. On Android it's red at 50%. If a colour looks wildly wrong after you've copied it between a web project and a mobile one, check this first. This converter treats `#` plus eight digits as CSS order, and `0x` plus eight as alpha-first."
			]
		},
		{
			heading: "Where you'll see it",
			body: [
				"Every current browser understands 8-digit hex in CSS, and plenty of design tools will take one too. It's handy for overlays, shadows and hover tints, where you want a brand colour but a bit see-through.",
				'If you only need transparency in CSS, `rgb(58 123 213 / 50%)` says the same thing more readably. Hex with alpha wins when a tool or config file only accepts hex.'
			]
		},
		{
			heading: 'Things that catch people out',
			body: [
				"Alpha isn't a lighter colour. A 50% blue over white looks pale, but over black it looks dark, because you're seeing whatever's behind it. If you want a lighter shade that looks the same everywhere, change the colour itself instead.",
				"Some older tools and email clients don't understand 8-digit hex at all, so check anywhere that isn't a modern browser before you rely on it."
			]
		}
	],
	related: ['hex', 'android', 'rgb']
} satisfies Guide;
