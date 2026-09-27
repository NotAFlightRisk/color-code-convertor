import { LAB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'lab',
	title: 'CIE LAB colors',
	description:
		'What lab() colour values mean, how lightness and the a and b axes work, where CIELAB turns up in CSS and print, plus a converter for any colour.',
	lede: 'LAB describes a colour the way your eyes see it, not the way a screen makes it. One number for how light it is, and two for which way it leans.',
	parts: ['lightness', 'a (green to red)', 'b (blue to yellow)', 'alpha'],
	channels: LAB,
	sections: [
		{
			heading: 'How to read one',
			body: [
				'Take `lab(50.89% 2.6 -53.35)`. The first number is lightness, from `0` (black) to `100` (white), so this one sits right in the middle. The other two are directions rather than amounts of light. `a` runs from green (negative) to red (positive), and `b` runs from blue (negative) to yellow (positive).',
				"So `2.6` means it's barely leaning red at all, and `-53.35` means it's heading a long way towards blue. Put those together and you get a mid blue, which is exactly what `#3a7bd5` is. When `a` and `b` are both `0` you've got a pure grey, whatever the lightness.",
				"There's no hard limit on `a` and `b`. Most colours a screen can show land somewhere between about `-125` and `125`, which is also what CSS treats as 100% if you write them as percentages."
			]
		},
		{
			heading: 'Why bother with it?',
			body: [
				'The CIE designed it in 1976 so that the same distance anywhere in the space looks like roughly the same amount of change. RGB and hex dont work like that at all - a small nudge to the green channel can be obvious or invisible depending on the colour you started from.',
				"That's why LAB is the go-to for measuring how different two colours are (the Delta E numbers you'll see in print and colour management), and why it's the space this site uses to find the nearest CSS colour name."
			]
		},
		{
			heading: "Where you'll see it",
			body: [
				'CSS has had `lab()` since Color Level 4, and every current major browser supports it. Photoshop has a whole Lab colour mode, and printers and colour-management software use it as the neutral middle ground when they convert between devices.',
				"If you want to adjust colours by hand though, LCH is usually friendlier. It's the same space, just described with a hue angle and a chroma instead of `a` and `b`."
			]
		},
		{
			heading: 'Things that catch people out',
			body: [
				'CSS `lab()` uses the D50 white point, the same as Photoshop and ICC profiles. Some older tools use D65, so the same colour can come out with slightly different numbers depending on where you copied it from.',
				"Plenty of valid LAB values describe colours no screen can actually show. The browser brings those back into range, so you'll get something close, but not quite what you typed.",
				"It isn't perfectly even either. Blues are the famous problem - make a blue lighter or duller in LAB and it drifts towards purple. OKLAB was built to fix exactly that."
			]
		}
	],
	related: ['lch', 'oklab', 'rgb']
} satisfies Guide;
