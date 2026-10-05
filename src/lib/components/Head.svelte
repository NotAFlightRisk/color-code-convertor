<script lang="ts">
	import { accentOn, textOn } from '#lib/color/index.js';
	import { NAME, schemaTag } from '#lib/meta.js';

	type Props = {
		title: string;
		description: string;
		url: string;
		hex: string;
		icon: string;
		schema: object;
		type?: 'website' | 'article';
	};

	let { title, description, url, hex, icon, schema, type = 'website' }: Props = $props();

	const accent = $derived(accentOn(hex));

	$effect(() => {
		const root = document.documentElement.style;
		root.setProperty('--accent', accent);
		root.setProperty('--accent-contrast', textOn(accent));
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={NAME} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content="en_GB" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	<link rel="icon" href={icon} />
	<meta name="theme-color" content={hex} />
	{@html schemaTag(schema)}
</svelte:head>
