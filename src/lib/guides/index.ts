import type { Guide } from './types';

export { FORMATS, formatFor } from './formats';

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

export const guideFor = (slug: string) => content[`./content/${slug}.ts`]();

export type { Channel, Format, Guide, Section } from './types';
