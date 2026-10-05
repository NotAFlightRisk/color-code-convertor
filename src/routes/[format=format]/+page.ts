import { FORMATS, formatFor, guideFor } from '#lib/guides/index.js';
import type { EntryGenerator, PageLoad } from './$types';

export const trailingSlash = 'always';

export const entries: EntryGenerator = () => FORMATS.map(({ slug }) => ({ format: slug }));

export const load: PageLoad = async ({ params }) => ({
	format: formatFor(params.format)!,
	guide: await guideFor(params.format)
});
