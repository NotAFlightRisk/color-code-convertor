import { defineParams } from '@sveltejs/kit/params';
import { formatFor } from './lib/guides/formats.ts';

export const params = defineParams({
	format: (param) => (formatFor(param) ? param : undefined)
});
