export const SITE = 'https://color-code-convertor.peng.li/';

export const TITLE = 'Color code convertor - paste any format, get all of them';

export const DESCRIPTION =
	'Paste a color in any notation, get all seventeen others: hex, rgb, hsl, hsb, hwb, cmyk, lab, lch, oklab, oklch, display-p3, CSS names, Android, Flutter and Swift.';

const schema = {
	'@context': 'https://schema.org',
	'@type': 'WebApplication',
	name: 'Color code convertor',
	url: SITE,
	description: DESCRIPTION,
	applicationCategory: 'DeveloperApplication',
	operatingSystem: 'Any',
	browserRequirements: 'Requires JavaScript',
	isAccessibleForFree: true,
	offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' }
};

export const schemaTag = `<script type="application/ld+json">${JSON.stringify(schema).replace(
	/</g,
	'\\u003c'
)}<\/script>`;
