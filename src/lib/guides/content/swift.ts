import { SRGB } from '../channels';
import type { Guide } from '../types';

export default {
	id: 'swift',
	title: 'Swift UIColor values',
	description:
		'How UIColor and SwiftUI Color values work, why they use 0 to 1 instead of 0 to 255, the NSColor equivalent, and a converter from any colour to Swift.',
	lede: "Apple's colour APIs don't take hex or 0 to 255. They want each channel as a fraction from 0 to 1, which is easy once you know the one division involved.",
	parts: ['red', 'green', 'blue', 'alpha'],
	channels: SRGB,
	sections: [
		{
			heading: 'Divide by 255',
			body: [
				'`UIColor(red: 0.227, green: 0.482, blue: 0.835, alpha: 1)` is the same colour as `rgb(58, 123, 213)`. Each channel is just its 0 to 255 value divided by 255. 58 divided by 255 is about 0.227, 123 gives 0.482 and 213 gives 0.835.',
				'Alpha is 0 to 1 already, so `1` is solid and `0.5` is half see-through. Three decimal places is plenty - the next digit changes the colour by less than one step out of 255.'
			]
		},
		{
			heading: 'UIColor, NSColor and SwiftUI',
			body: [
				"UIKit on iPhone and iPad uses `UIColor(red:green:blue:alpha:)`. On the Mac, AppKit's `NSColor(red:green:blue:alpha:)` takes the same four numbers.",
				'SwiftUI has its own `Color(red: 0.227, green: 0.482, blue: 0.835)`, with an optional `opacity:` on the end. You can wrap a UIKit colour too with `Color(uiColor:)`, handy when a project has both.',
				"There's no built-in way to make a colour from a hex string in either framework. People write little extensions for it, or you can just paste the hex here and copy the Swift version."
			]
		},
		{
			heading: 'The classic mistake',
			body: [
				"Writing `UIColor(red: 58, green: 123, blue: 213, alpha: 1)` with the 0 to 255 values. It compiles fine, runs fine, and gives you something that's basically white, because every channel is way over 1. Divide by 255, or write `58 / 255` in the call and let Swift do it.",
				"Since iOS 10 these initialisers work in extended sRGB, so values outside 0 to 1 are allowed on purpose, to reach colours beyond sRGB. That's why nothing warns you when you pass 58."
			]
		},
		{
			heading: 'Asset catalogs',
			body: [
				'For colours you use all over an app, a colour set in your asset catalog is usually tidier than code. Xcode lets you type a hex value or 0 to 255 numbers there, and you can give each colour a dark mode variant. Then it\'s just `Color("Brand")` or `UIColor(named: "Brand")` in your code.'
			]
		}
	],
	related: ['rgb', 'display-p3', 'flutter']
} satisfies Guide;
