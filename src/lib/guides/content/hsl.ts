import { HSL } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'hsl',
	title: 'HSL colors',
	description:
		'How HSL colour codes work: a hue on the colour wheel plus saturation and lightness as percentages, where CSS uses them, and a converter for any colour.',
	lede: "HSL describes a colour the way you'd say it out loud - which colour, how strong, how light. It's the easiest format to tweak by hand, as long as you know where it fibs.",
	parts: ['hue', 'saturation', 'lightness', 'alpha'],
	channels: HSL,
	sections: [
		{
			heading: 'Reading an HSL value',
			body: [
				'Take `hsl(214.84, 64.8%, 53.1%)`, which is `#3A7BD5`. The first number is the hue, an angle round a colour wheel: `0` is red, `120` is green, `240` is blue, and `360` brings you back to red. Everything else is somewhere in between, so 214 is a blue leaning slightly towards cyan.',
				"Saturation is how much colour there is. At `0%` you get grey whatever the hue says, and at `100%` it's as vivid as it goes. Lightness runs from `0%` (black) to `100%` (white), with the pure, full-strength colour at exactly `50%`.",
				'A fourth number, if there is one, is alpha. `hsla(214.84, 64.8%, 53.1%, 0.5)` is the same blue at half opacity.'
			]
		},
		{
			heading: 'Why designers like it',
			body: [
				'You can change one thing at a time. Want a darker shade for a hover state? Drop the lightness and leave the rest alone. Same trick with saturation for a washed-out disabled button, or with the hue for a second theme. Try that with a hex code and your editing three pairs of digits by feel.',
				"It's been proper CSS for years, so it works everywhere. Modern CSS also takes it without commas, `hsl(215 65% 53%)`, with a slash before any alpha, `hsl(215 65% 53% / 0.5)`. These days `hsla()` is just another name for `hsl()`, so either spelling takes an alpha."
			]
		},
		{
			heading: 'Where it fibs',
			body: [
				"HSL's lightness isn't how light a colour looks to you. It's just the midpoint between the strongest and weakest channel. So `hsl(60, 100%, 50%)` (yellow) and `hsl(240, 100%, 50%)` (blue) have exactly the same lightness on paper and look nothing alike - the yellow is glaring, the blue is far darker to your eye.",
				"That makes HSL a bit of a trap for palettes. Step the lightness evenly across a few different hues and the steps won't look even at all, and text contrast will swing about. If that matters, OKLCH has the same shape (lightness, chroma, hue) but its lightness actually tracks what you see."
			]
		},
		{
			heading: 'Same word, different meaning',
			body: [
				"HSB uses the word saturation for something else. That `#3A7BD5` is `64.8%` saturated in HSL and `72.8%` in HSB, so copying the number out of a design tool's HSB picker into `hsl()` won't give you the colour you think. Paste the whole value into the converter instead."
			]
		}
	],
	related: ['hsb', 'hwb', 'oklch']
} satisfies Guide;
