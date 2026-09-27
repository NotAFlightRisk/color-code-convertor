import { LCH } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'lch',
	title: 'LCH colors',
	description:
		'What lch() colour values mean, how lightness, chroma and hue work, how LCH relates to LAB and HSL, plus a converter that turns any colour into LCH.',
	lede: 'LCH is LAB with friendlier controls. You get lightness, how colourful it is, and a hue angle, and changing one of them leaves the other two alone.',
	parts: ['lightness', 'chroma', 'hue', 'alpha'],
	channels: LCH,
	sections: [
		{
			heading: 'How to read one',
			body: [
				'Take `lch(50.89% 53.41 272.79)`. Lightness comes first and runs from `0` (black) to `100` (white). Then chroma, which is how much colour there is - `0` is grey, and the bigger the number the more vivid it gets. Last is the hue, an angle round a colour wheel from `0` to `360`.',
				"So this is a mid lightness, fairly strong blue. Drop the chroma to `0` and you'd get a grey of exactly the same lightness, which is a really handy trick for checking contrast.",
				'Chroma has no fixed maximum. Everyday screen colours top out around `130`, and CSS treats `150` as 100% if you write it as a percentage.'
			]
		},
		{
			heading: "It's LAB, just pointing a different way",
			body: [
				"LCH isn't a new colour space. It's LAB described in polar form - the same lightness, with `a` and `b` swapped for a distance from grey (chroma) and a direction (hue). Every LAB colour has an LCH twin (greys just don't get a meaningful hue), and the converter above flips between them without losing anything.",
				"The payoff is that the numbers finally match how you think about colour. Want a lighter version? Raise the lightness. Want it more muted? Lower the chroma. The hue doesn't budge, which is more then you can say for hex."
			]
		},
		{
			heading: "Don't expect HSL's hues",
			body: [
				"The hue angles don't line up with HSL. Pure red is around `41` in LCH rather than `0`, and the `#0000FF` blue is up around `301` instead of `240`. If you're copying a hue across from HSL, convert the whole colour rather than just the angle.",
				'Lightness is different too, in a good way. In HSL, yellow and blue at 50% lightness look nothing alike. In LCH, two colours with the same lightness really do look about as light as each other.'
			]
		},
		{
			heading: 'Where it goes wrong',
			body: [
				"It's easy to ask for a colour that doesn't exist on a screen, like high chroma at very high or very low lightness. The browser has to bring it back into range, so what you see isn't quite what you wrote.",
				"CSS `lch()` works in every current major browser and uses the D50 white point, like LAB. It also inherits LAB's wobble in the blues, where changing lightness nudges the hue towards purple. OKLCH is the same idea with that fixed, and it's usually the better pick."
			]
		}
	],
	related: ['lab', 'oklch', 'hsl']
} satisfies Guide;
