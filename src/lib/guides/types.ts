import type { Color } from 'culori/fn';

/** One slider's worth of a colour model, from the reader's side of the maths. */
export type Channel = {
	label: string;
	min: number;
	max: number;
	step: number;
	read: (color: Color) => number;
	write: (color: Color, value: number) => Color;
	say: (value: number) => string;
	locked?: boolean;
};

/** Paragraphs are plain text, with `backticks` round anything that's code. */
export type Section = {
	heading: string;
	body: string[];
};

export type Format = {
	slug: string;
	name: string;
};

export type Guide = {
	id: string;
	title: string;
	description: string;
	lede: string;
	parts: string[];
	channels: Channel[];
	sections: Section[];
	related: string[];
	examples?: string[];
};
