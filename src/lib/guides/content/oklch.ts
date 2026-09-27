import { OKLCH } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'oklch',
	title: 'OKLCH colors',
	description:
		'What oklch() colour values mean, how lightness, chroma and hue work, why design systems and Tailwind use it, plus a converter that turns any colour into OKLCH.',
	lede: "OKLCH is the colour format that finally behaves the way you'd expect. Change the lightness and only the lightness changes, and two colours with the same number really do look equally light.",
	parts: ['lightness', 'chroma', 'hue', 'alpha'],
	channels: OKLCH,
	sections: [
		{
			heading: 'How to read one',
			body: [
				"Take `oklch(58.62% 0.1533 257.23)`. Lightness comes first, from `0%` (black) to `100%` (white), and `0.5862` means the same thing if you'd rather skip the percent sign. Then chroma, which is how colourful it is - `0` is grey and it climbs from there. Last is the hue, an angle round the wheel from `0` to `360`.",
				'Chroma is the one that looks odd at first because the numbers are so small. Everything a normal screen can show stays under about `0.33`, and wide-gamut screens go a bit further. CSS treats `0.4` as 100% if you write it as a percentage.',
				"Rough hue landmarks: red is around `29`, yellow around `110`, green around `142` and blue around `264`. They don't match HSL's numbers, so convert the whole colour rather than copying the hue across."
			]
		},
		{
			heading: 'Why people switched to it',
			body: [
				"It's OKLAB (Björn Ottosson's 2020 fix for CIELAB) described as lightness, chroma and hue. That makes it the easiest format to edit by hand without anything drifting. Lighten a blue and it stays blue, rather than going purple like it does in LAB and LCH.",
				"Its brilliant for palettes. Keep the hue and chroma, step the lightness, and you get a set of shades that look evenly spaced. Tailwind v4's whole default palette is written in OKLCH, and plenty of design systems do the same.",
				'CSS has `oklch()` in every current major browser, plus `color-mix(in oklch, ...)` for blending and relative colours like `oklch(from var(--brand) calc(l + 0.1) c h)` for making a lighter shade of whatever your brand colour is.'
			]
		},
		{
			heading: 'The catch',
			body: [
				"It's very easy to write a colour that doesn't exist on your screen. High chroma only works at certain lightnesses (yellow can get really vivid when it's light, blue when it's darker), so `oklch(95% 0.3 264)` asks for something no display can show. The browser brings it back into range and you get the closest thing it can manage, which might not be what you had in mind.",
				'The safe habit is to lower the chroma as you move towards very light or very dark shades. The sliders above show this pretty clearly - watch where the chroma strip stops getting more vivid.',
				"When chroma is `0` the hue doesn't mean anything, since grey has no hue. This converter prints `0` there, and CSS also accepts the keyword `none`."
			]
		}
	],
	related: ['oklab', 'lch', 'display-p3']
} satisfies Guide;
