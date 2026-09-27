<script lang="ts">
	import { onMount } from 'svelte';
	import type { Color } from 'culori/fn';
	import Anatomy from '$lib/components/Anatomy.svelte';
	import Channels from '$lib/components/Channels.svelte';
	import Current from '$lib/components/Current.svelte';
	import Examples from '$lib/components/Examples.svelte';
	import FormatLinks from '$lib/components/FormatLinks.svelte';
	import Head from '$lib/components/Head.svelte';
	import Masthead from '$lib/components/Masthead.svelte';
	import Prose from '$lib/components/Prose.svelte';
	import Slate from '$lib/components/Slate.svelte';
	import { formatAll } from '$lib/color';
	import { EXAMPLES, FORMATS, formatFor } from '$lib/guides';
	import { SITE, guideSchema } from '$lib/meta';
	import { Clip, Pick } from '$lib/pick.svelte';

	let { data } = $props();

	const pick = new Pick();
	const clip = new Clip();
	let tool = $state<HTMLElement | null>(null);

	const format = $derived(data.format);
	const guide = $derived(data.guide);
	const url = $derived(`${SITE}${format.slug}/`);
	const entries = $derived(formatAll(pick.shown));
	const entry = $derived(entries.find(({ id }) => id === guide.id)!);
	const name = $derived(entries.find(({ id }) => id === 'name')!.value);
	const related = $derived(guide.related.map((slug) => formatFor(slug)!));

	const valueOf = (color: Color) => formatAll(color).find(({ id }) => id === guide.id)!.value;

	function tryOut(value: string) {
		pick.show(value);
		tool?.scrollIntoView({ block: 'start' });
	}

	onMount(() => pick.restore());
</script>

<Head
	title="{guide.title} explained, with a converter"
	description={guide.description}
	{url}
	hex={pick.hex}
	icon={pick.icon}
	schema={guideSchema(format.name, guide.title, guide.description, url)}
	type="article"
/>

<svelte:window onpaste={pick.paste} />

<Masthead crumb={format.name} link={pick.link} />

<main>
	<div class="intro">
		<h1>{guide.title}</h1>
		<p class="lede"><Prose text={guide.lede} /></p>
	</div>

	<section class="tool" aria-labelledby="tool-heading" bind:this={tool}>
		<h2 id="tool-heading" class="visually-hidden">Convert any colour to {format.name}</h2>
		<Current css={pick.css} hex={pick.hex} {name} alpha={pick.alpha} />
		<Slate
			value={pick.input}
			hex={pick.hex}
			alpha={pick.alpha}
			valid={pick.valid}
			oninput={pick.show}
			onalpha={pick.fade}
			onroll={pick.roll}
		/>
		<Anatomy
			name={format.name}
			value={entry.value}
			note={entry.note}
			parts={guide.parts}
			copied={clip.copied === entry.id}
			oncopy={() => clip.copy(entry)}
		/>
		{#if guide.channels.length}
			<Channels
				channels={guide.channels}
				color={pick.shown}
				ontune={(color) => pick.tune(color, valueOf(color))}
			/>
		{/if}
	</section>

	<article>
		{#each guide.sections as section (section.heading)}
			<section>
				<h2>{section.heading}</h2>
				<div class="body">
					{#each section.body as text, index (index)}
						<p><Prose {text} /></p>
					{/each}
				</div>
			</section>
		{/each}
	</article>

	<section class="examples" aria-labelledby="examples-heading">
		<div class="examples-head">
			<h2 id="examples-heading">{format.name} at a glance</h2>
			<p>Pick one to load it into the converter.</p>
		</div>
		<Examples id={guide.id} samples={guide.examples ?? EXAMPLES} onpick={tryOut} />
	</section>
</main>

<p class="visually-hidden" aria-live="polite">{clip.announcement}</p>

<footer>
	<FormatLinks heading="Close relatives" formats={related} link={pick.link} />
	<FormatLinks
		heading="Every format, explained"
		formats={FORMATS}
		current={format.slug}
		link={pick.link}
	/>
	<p class="legend">
		<a href="https://github.com/NotAFlightRisk/color-code-convertor">Source on GitHub</a>
	</p>
</footer>

<style>
	.intro {
		display: grid;
		gap: var(--s3);
		padding: var(--s6) var(--gutter) var(--s5);
		border-block-end: 1px solid var(--border);
	}

	h1 {
		font: 600 clamp(2rem, 5vw, 3.25rem) / 1.05 var(--font-ui);
		font-variation-settings: 'wdth' 78;
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	h2 {
		font: 600 1.125rem / 1.3 var(--font-ui);
		text-wrap: balance;
	}

	.lede {
		max-inline-size: 60ch;
		font-size: 1.0625rem;
		color: var(--text-muted);
		text-wrap: pretty;
	}

	.tool {
		scroll-margin-block-start: var(--s4);
	}

	article section {
		display: grid;
		grid-template-columns: minmax(0, 16rem) minmax(0, 68ch);
		gap: var(--s3) var(--s6);
		padding: var(--s6) var(--gutter);
		border-block-end: 1px solid var(--border);
	}

	.body {
		display: grid;
		gap: var(--s4);
		line-height: 1.7;
		text-wrap: pretty;
	}

	.examples {
		display: grid;
		gap: var(--s4);
		padding: var(--s6) var(--gutter);
	}

	.examples-head {
		display: grid;
		gap: var(--s1);

		p {
			color: var(--text-muted);
		}
	}

	footer {
		display: grid;
		gap: var(--s6);
		padding: var(--s6) var(--gutter) var(--s7);
		border-block-start: 1px solid var(--border);
	}

	footer a {
		color: var(--accent);
		text-decoration-thickness: 1px;
		text-underline-offset: 0.25em;
	}

	@media (width < 48rem) {
		article section {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
