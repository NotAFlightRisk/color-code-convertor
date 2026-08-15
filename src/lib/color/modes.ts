import {
	modeHsl,
	modeHsv,
	modeHwb,
	modeLab,
	modeLab65,
	modeLch,
	modeLrgb,
	modeOklab,
	modeOklch,
	modeP3,
	modeRgb,
	useMode
} from 'culori/fn';

export const toRgb = useMode(modeRgb);
export const toHsl = useMode(modeHsl);
export const toHsv = useMode(modeHsv);
export const toHwb = useMode(modeHwb);
export const toLab = useMode(modeLab);
/** Only here because CIEDE2000, the metric behind nearest-name lookups, works in D65. */
export const toLab65 = useMode(modeLab65);
export const toLch = useMode(modeLch);
export const toOklab = useMode(modeOklab);
export const toOklch = useMode(modeOklch);
export const toP3 = useMode(modeP3);
/** Never converted to directly, but WCAG luminance routes through it. */
export const toLrgb = useMode(modeLrgb);
