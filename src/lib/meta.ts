export const SITE = 'https://color-code-convertor.peng.ly/';

export const NAME = 'Color code convertor';

export const TITLE = 'Color code convertor - paste any format, get all of them';

export const DESCRIPTION =
	'Paste a color in any notation, get all seventeen others: hex, rgb, hsl, hsb, hwb, cmyk, lab, lch, oklab, oklch, display-p3, CSS names, Android, Flutter and Swift.';

export const schemaTag = (schema: object) =>
	`<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		...schema
	}).replace(/</g, '\\u003c')}<\/script>`;

export const APP_SCHEMA = {
	'@type': 'WebApplication',
	name: NAME,
	url: SITE,
	description: DESCRIPTION,
	applicationCategory: 'DeveloperApplication',
	operatingSystem: 'Any',
	browserRequirements: 'Requires JavaScript',
	isAccessibleForFree: true,
	offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' }
};

export const guideSchema = (name: string, title: string, description: string, url: string) => ({
	'@graph': [
		{ '@type': 'TechArticle', headline: title, description, url, inLanguage: 'en-GB' },
		{
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: NAME, item: SITE },
				{ '@type': 'ListItem', position: 2, name, item: url }
			]
		}
	]
});
