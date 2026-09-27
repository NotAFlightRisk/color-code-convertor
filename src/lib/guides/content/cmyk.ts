import { CMYK } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'cmyk',
	title: 'CMYK colors',
	description:
		"What CMYK percentages mean, why print uses cyan, magenta, yellow and black, and why a quick screen-to-CMYK conversion isn't print-ready. Converter included.",
	lede: 'CMYK is the language of printers: four inks, each as a percentage. You can get a rough CMYK value from any screen colour, just read the bit about print before you send one off.',
	parts: ['cyan', 'magenta', 'yellow', 'key (black)'],
	channels: CMYK,
	sections: [
		{
			heading: 'Four inks',
			body: [
				'A mid blue like `#3A7BD5` comes out as `cmyk(73%, 42%, 0%, 16%)`. Each number is how much of one ink goes down on the paper: cyan, magenta, yellow, and K for key, which is black. `0%` is none, `100%` is solid coverage.',
				"Screens add light, so more is brighter. Ink takes light away, so more is darker. That's why the scale feels upside down if you're used to RGB: `cmyk(0%, 0%, 0%, 0%)` is bare paper, and piling on ink heads towards black.",
				"In theory cyan, magenta and yellow together make black. In practice you get a muddy brown and a soggy page, so printers add a separate black ink for text and shadows. It's called key because it's printed from the key plate, the one the other colours line up to."
			]
		},
		{
			heading: "Where you'll need it",
			body: [
				"Anywhere ink is involved - business cards, posters, packaging, anything going to a print shop. Print designers work in CMYK in InDesign, Illustrator and Photoshop, and a printer's spec sheet will often ask for your brand colours in it.",
				"It isn't a screen format. There's no CMYK you can use in a browser, and any CMYK you see on a screen is a simulation of ink."
			]
		},
		{
			heading: "Why this number isn't print-ready",
			body: [
				"The CMYK here is the naive formula every web converter uses: black is whatever's missing from the brightest channel, and the rest gets split across the other three inks. It's fine for a ballpark, and that's all the numbers above are.",
				"Real print conversion depends on the paper, the press, the inks and how much ink the paper can soak up in total, and it's done with a colour profile (an ICC profile) made for that exact setup. The same blue can need noticably different numbers on glossy card and on newsprint. So if it's going to a printer, ask them for their profile, or let your design app convert it with that profile, and treat this as a starting point.",
				"It goes wrong the other way too. Plenty of bright screen colours, especially electric blues and greens, just can't be printed with four inks. You'll get the nearest the press can manage, which is usually duller."
			]
		}
	],
	related: ['rgb', 'hex', 'lab']
} satisfies Guide;
