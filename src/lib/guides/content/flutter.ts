import { SRGB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'flutter',
	title: 'Flutter Color values',
	description:
		'How Flutter Color(0xFF3A7BD5) values work, why you need the FF on the front, the other ways to build a Color, and a converter from any colour.',
	lede: "Flutter wants colours as `Color(0xFF3A7BD5)`. It's a hex code with alpha on the front, and forgetting that alpha is the most common reason a Flutter colour vanishes.",
	parts: ['alpha', 'red', 'green', 'blue'],
	channels: SRGB,
	sections: [
		{
			heading: 'Reading Color(0xAARRGGBB)',
			body: [
				'The `0x` just means "this is hex". After it come four pairs: alpha, red, green, blue. In `Color(0xFF3A7BD5)`, `FF` is fully opaque, `3A` is red, `7B` green and `D5` blue.',
				'Alpha goes from `00` to `FF`. Half transparent is about `80`, so `Color(0x803A7BD5)` is the same blue at roughly 50%.'
			]
		},
		{
			heading: 'Where did my colour go?',
			body: [
				"If you copy `#3A7BD5` from a design and write `Color(0x3A7BD5)`, Flutter reads the missing pair as alpha `00`. Your colour is there, it's just completely transparent. Always put `FF` on the front of a six-digit hex code.",
				"It's also alpha first, unlike CSS, which puts it last. An 8-digit hex from a web project like `#3A7BD580` needs its last pair moving to the front: `Color(0x803A7BD5)`."
			]
		},
		{
			heading: 'Other ways to make one',
			body: [
				'If hex feels fiddly there are constructors that take plain numbers. `Color.fromARGB(255, 58, 123, 213)` takes alpha and the three channels from 0 to 255. `Color.fromRGBO(58, 123, 213, 1.0)` takes the channels, then opacity from 0 to 1, much like CSS `rgba()`.',
				'Stick `const` in front when the value never changes, `const Color(0xFF3A7BD5)`, and Flutter can build it once at compile time.'
			]
		},
		{
			heading: 'Flutter, Android and the web',
			body: [
				"Flutter's layout is the same as Android's, alpha then red, green, blue, so values copy between the two without any shuffling. Just swap `#` for `0x`. The web is the odd one out, with alpha at the end.",
				'If your designer hands you colours as `rgb()` or HSL, paste them into the box above and copy the Flutter line. Saves a lot of squinting at hex.'
			]
		}
	],
	related: ['android', 'hex-alpha', 'swift']
} satisfies Guide;
