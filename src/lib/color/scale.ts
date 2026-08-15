import { clampChroma, formatHex, wcagContrast } from 'culori/fn';
import type { Color } from 'culori/fn';
import { toOklch, toRgb } from './modes';

export type Step = {
	hex: string;
	lightness: number;
	source: boolean;
};

const TARGETS = [0.16, 0.26, 0.37, 0.47, 0.58, 0.68, 0.78, 0.88, 0.96];

const inGamutHex = (color: Color) => formatHex(toRgb(clampChroma(color, 'oklch', 'rgb')));

const VOID = '#050607';
const BONE = '#e9ebec';

/** Whichever of the two page inks stays legible on top of a given colour. */
export const inkOn = (hex: string) =>
	wcagContrast(hex, VOID) >= wcagContrast(hex, BONE) ? VOID : BONE;

/** The colour drives focus rings and selection, unless it is too dark to see against the ground. */
export const signalOn = (hex: string) => (wcagContrast(hex, VOID) >= 3 ? hex : BONE);

/** The colour's own lightness ladder, with the pasted colour standing in its true position. */
export function ladder(color: Color): Step[] {
	const base = toOklch(color);
	const nearest = TARGETS.reduce(
		(best, target, index) =>
			Math.abs(target - base.l) < Math.abs(TARGETS[best] - base.l) ? index : best,
		0
	);

	return TARGETS.map((lightness, index) => {
		const source = index === nearest;
		const step = source ? base : { ...base, l: lightness, alpha: 1 };
		return {
			hex: inGamutHex({ ...step, alpha: 1 }),
			lightness: source ? base.l : lightness,
			source
		};
	});
}
