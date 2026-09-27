import { OKLAB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'oklab',
	title: 'OKLAB colors',
	description:
		'What oklab() colour values mean, how its lightness and a and b axes work, why it beats CIELAB for gradients and mixing, plus a converter for any colour.',
	lede: 'OKLAB is LAB with the rough edges sanded off. Same idea - one number for lightness and two for direction - but the maths behind it matches your eyes much more closely.',
	parts: ['lightness', 'a (green to red)', 'b (blue to yellow)', 'alpha'],
	channels: OKLAB,
	sections: [
		{
			heading: 'How to read one',
			body: [
				"Say you've got `oklab(58.62% -0.0339 -0.1495)`. Lightness is first, from `0%` (black) to `100%` (white), and you can also write it as a plain number from `0` to `1`. Then come `a` and `b`, which work like compass directions. `a` goes from green (negative) to red (positive) and `b` from blue (negative) to yellow (positive).",
				"This one's leaning slightly green and a fair way towards blue, so it's a mid blue. The numbers look tiny next to LAB's because the scale is smaller - `a` and `b` rarely get past about `0.4` either way, and that's what CSS counts as 100%."
			]
		},
		{
			heading: 'What the OK is for',
			body: [
				'Björn Ottosson published OKLAB in 2020 as a fix for the places CIELAB gets things wrong. The big one is blue. Lighten or desaturate a blue in LAB and it slides towards purple, but in OKLAB it stays blue.',
				"So equal steps really do look like equal steps. A gradient in OKLAB doesn't dip dark and muddy in the middle the way an sRGB one can, and mixing two colours gives you something that looks halfway between them. Thats why CSS lets you pick it for exactly those jobs, with `color-mix(in oklab, ...)` and `linear-gradient(in oklab, ...)`."
			]
		},
		{
			heading: "Where you'll see it",
			body: [
				"CSS has `oklab()` as part of Color Level 4, and it works in every current major browser. You'll mostly meet it behind the scenes though, as the space things get mixed or interpolated in, rather than typed out by hand.",
				"If you want to pick or tweak colours yourself, OKLCH is easier. It's the same space described as lightness, chroma and hue, so you can change one without touching the others."
			]
		},
		{
			heading: 'Worth knowing',
			body: [
				"OKLAB uses the D65 white point, the same as sRGB, whereas CSS `lab()` uses D50. The numbers aren't interchangeable, so don't paste one into the other.",
				"Like LAB, it can describe colours your screen can't show. The browser pulls those back into range, so you get the nearest thing it can manage rather than an error."
			]
		}
	],
	related: ['oklch', 'lab', 'rgb']
} satisfies Guide;
