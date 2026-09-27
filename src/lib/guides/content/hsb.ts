import { HSV } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'hsb',
	title: 'HSB and HSV colors',
	description:
		"HSB (also called HSV) is the colour model behind the picker in Figma and Photoshop. Here's how hue, saturation and brightness work, plus a converter.",
	lede: "If you've ever dragged a dot round the square in a design tool's colour picker, you've used HSB. HSV is exactly the same thing under another name.",
	parts: ['hue', 'saturation', 'brightness', 'alpha'],
	channels: HSV,
	sections: [
		{
			heading: 'Hue, saturation, brightness',
			body: [
				'A mid blue like `#3A7BD5` comes out as `hsb(214.84, 72.8%, 83.5%)`. Hue works just like it does in HSL, an angle round the colour wheel with red at `0`, green at `120` and blue at `240`.',
				'Brightness (the B, or V for value) is how much light the strongest channel gives of. At `0%` you get black, whatever the other two numbers say. At `100%` the colour is as bright as your screen can make that hue. Saturation then decides how far you are from white: `0%` is a grey (or white, at full brightness) and `100%` is the pure hue.',
				"That's the picker square in a nutshell. Left to right is saturation, bottom to top is brightness, and the strip next to it is hue."
			]
		},
		{
			heading: "Why it's in every design tool",
			body: [
				'All the pure, vivid colours live along the top edge of the square, so grabbing something bright and then easing off is quick. Photoshop and Figma are both built round it, along with plenty of other pickers.',
				'HSB and HSV really are identical, just two names that stuck. Alvy Ray Smith came up with it in 1978 for early paint software, and different apps picked different letters.'
			]
		},
		{
			heading: "It isn't CSS",
			body: [
				"Browsers don't understand `hsb()` or `hsv()`, it was never added to CSS. So when you copy a colour out of a picker as HSB, you'll need to convert it before it'll go in a stylesheet. Paste it into the box above and grab the hex, HSL or HWB instead.",
				'HWB is the closest thing CSS has. It uses the same hue and describes the same square from a different angle, with whiteness and blackness in place of saturation and brightness.'
			]
		},
		{
			heading: 'Same word, different number',
			body: [
				"HSB's saturation isn't HSL's saturation. That same blue is `72.8%` saturated in HSB and `64.8%` in HSL, and pale colours are where it really goes wrong: `#FFE0E0`, a faint pink, is `12%` saturated in HSB and `100%` in HSL.",
				"So don't copy numbers between the two by hand. Paste the whole value in and let the converter sort it out."
			]
		}
	],
	related: ['hsl', 'hwb', 'hex']
} satisfies Guide;
