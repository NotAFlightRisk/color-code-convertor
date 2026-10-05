import { FORMATS } from '#lib/guides/index.js';
import { SITE } from '#lib/meta.js';

export const prerender = true;

export const GET = () => {
	const urls = ['', ...FORMATS.map(({ slug }) => `${slug}/`)]
		.map((path) => `\t<url>\n\t\t<loc>${SITE}${path}</loc>\n\t</url>`)
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
