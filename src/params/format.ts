import type { ParamMatcher } from '@sveltejs/kit';
import { formatFor } from '$lib/guides';

export const match: ParamMatcher = (param) => formatFor(param) !== undefined;
