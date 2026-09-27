import { colorsNamed } from 'culori/fn';
import type { Guide } from '../types';

export default {
	id: 'name',
	title: 'CSS color names',
	description:
		'All 148 CSS colour names, from aliceblue to yellowgreen, with swatches. Where they came from, the odd ones out, and a converter that finds the nearest name.',
	lede: "CSS knows 148 colours by name, so you can write `tomato` instead of `#FF6347`. They're handy for prototypes and debugging, and a few of them are genuinly odd.",
	parts: ['name'],
	channels: [],
	sections: [
		{
			heading: 'Where the names came from',
			body: [
				'Most of them come from the colour list that shipped with the X Window System on Unix machines, which is where `papayawhip`, `peachpuff` and `lemonchiffon` come from. Browsers picked that list up, and CSS eventually made it official.',
				"That's why they're so random. There's `lightgoldenrodyellow` but no `darkgoldenrodyellow`, `indianred` and `mediumvioletred` live alongside plain `red`, and `darkgray` (`#A9A9A9`) is actually lighter than `gray` (`#808080`)."
			]
		},
		{
			heading: 'The one with a story',
			body: [
				"`rebeccapurple` (`#663399`) was added in 2014. It's named after Rebecca Meyer, daughter of the long-time CSS writer Eric Meyer, who died on her sixth birthday. Purple was her favourite colour, and the web community asked for it to be added in her memory."
			]
		},
		{
			heading: 'Grey or gray?',
			body: [
				"Both. Every name with gray in it has a grey twin, so `slategrey` and `slategray` are the same colour. Names aren't case sensitive either, so `DarkOrange` works just as well as `darkorange`.",
				'A few other pairs are exact duplicates too: `aqua` and `cyan` are both `#00FFFF`, and `fuchsia` and `magenta` are both `#FF00FF`.'
			]
		},
		{
			heading: "When there isn't an exact name",
			body: [
				'Most colours don\'t have one. There are about 16.7 million hex codes and only 148 names, so when you paste something in, the converter picks the name that looks closest to your eye (using a colour difference formula called CIEDE2000) and labels it "closest match". Treat that as a rough description rather than a swap - `cornflowerblue` near your brand blue isn\'t your brand blue.',
				"Names are great for demos, prototypes and debugging borders. For anything that ships, use a proper value so you know exactly what you're getting."
			]
		}
	],
	related: ['hex', 'rgb', 'hsl'],
	examples: Object.keys(colorsNamed).filter((name) => name !== 'transparent')
} satisfies Guide;
