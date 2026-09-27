import { SRGB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'android',
	title: 'Android color ints',
	description:
		'How Android colours like #FF3A7BD5 work, why alpha comes first, why your @ColorInt is negative, and a converter from any colour to Android ARGB.',
	lede: 'Android writes colours as hex, but with alpha at the front instead of the back. Get that the wrong way round and your nice blue turns into something else entirely.',
	parts: ['alpha', 'red', 'green', 'blue'],
	channels: SRGB,
	sections: [
		{
			heading: 'Alpha, then red, green, blue',
			body: [
				'`#FF3A7BD5` is four pairs of hex digits. `FF` is alpha (fully opaque), then `3A` red, `7B` green and `D5` blue. Alpha runs from `00`, invisible, to `FF`, solid, so the same blue at half opacity is `#803A7BD5`.',
				"In a colour resource you can leave alpha off and write `#3A7BD5`, and Android assumes it's opaque. The three and four digit shorthands, `#RGB` and `#ARGB`, work in XML too."
			]
		},
		{
			heading: 'XML, Java and Kotlin',
			body: [
				'In `colors.xml` it\'s a string: `<color name="brand">#FF3A7BD5</color>`. In code it\'s a 32-bit int, written `0xFF3A7BD5`, or you can parse the string with `Color.parseColor("#FF3A7BD5")`.',
				"Kotlin has one annoyance - `0xFF3A7BD5` is too big for an `Int`, so it's a `Long`, and you'll need `.toInt()` for anything that wants a `@ColorInt`. Jetpack Compose side-steps this, because its `Color(0xFF3A7BD5)` takes the `Long` directly."
			]
		},
		{
			heading: 'Why is my colour negative?',
			body: [
				'Because Java ints are signed. Any colour with alpha above `7F` has its top bit set, and a signed 32-bit int reads that as negative. So if you log `Color.parseColor("#3A7BD5")` you\'ll see `-12944427`, which is just `0xFF3A7BD5` read as a signed number. Nothing\'s broken, it just looks alarming.',
				"Convert it back with `Integer.toHexString(color)` and you'll get your `ff3a7bd5` again."
			]
		},
		{
			heading: 'Moving colours between Android and the web',
			body: [
				'CSS puts alpha last, `#3A7BD5FF`. Android puts it first, `#FF3A7BD5`. Both are eight hex digits, so nothing warns you when you paste one into the other. You just get a wierd colour and a confused afternoon.',
				"If all eight digits are there, check which platform they came from before you use them. For opaque colours it's easiest to stick to six digits, which mean the same thing on both."
			]
		}
	],
	related: ['hex-alpha', 'flutter', 'decimal']
} satisfies Guide;
