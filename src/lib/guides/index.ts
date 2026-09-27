import type { Format, Guide } from './types';

/** In the same order as the home page's readout. */
export const FORMATS: Format[] = [
	{ slug: 'hex', name: 'HEX' },
	{ slug: 'hex-alpha', name: 'HEX with alpha' },
	{ slug: 'rgb', name: 'RGB' },
	{ slug: 'hsl', name: 'HSL' },
	{ slug: 'hsb', name: 'HSB / HSV' },
	{ slug: 'hwb', name: 'HWB' },
	{ slug: 'cmyk', name: 'CMYK' },
	{ slug: 'lab', name: 'LAB' },
	{ slug: 'lch', name: 'LCH' },
	{ slug: 'oklab', name: 'OKLAB' },
	{ slug: 'oklch', name: 'OKLCH' },
	{ slug: 'display-p3', name: 'Display P3' },
	{ slug: 'css-names', name: 'CSS names' },
	{ slug: 'decimal', name: 'Decimal' },
	{ slug: 'android', name: 'Android' },
	{ slug: 'flutter', name: 'Flutter' },
	{ slug: 'swift', name: 'Swift' }
];

export const EXAMPLES = [
	'tomato',
	'gold',
	'seagreen',
	'teal',
	'royalblue',
	'rebeccapurple',
	'white',
	'black'
];

const content = import.meta.glob<Guide>('./content/*.ts', { import: 'default' });

export const formatFor = (slug: string) => FORMATS.find((format) => format.slug === slug);

export const guideFor = (slug: string) => content[`./content/${slug}.ts`]();

export type { Channel, Format, Guide, Section } from './types';
