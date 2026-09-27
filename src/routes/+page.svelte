<script lang="ts">
	import { onMount } from 'svelte';
	import BarField from '$lib/components/BarField.svelte';
	import Current from '$lib/components/Current.svelte';
	import FormatLinks from '$lib/components/FormatLinks.svelte';
	import Head from '$lib/components/Head.svelte';
	import Masthead from '$lib/components/Masthead.svelte';
	import Readout from '$lib/components/Readout.svelte';
	import Slate from '$lib/components/Slate.svelte';
	import { formatAll, ladder } from '$lib/color';
	import { FORMATS } from '$lib/guides';
	import { APP_SCHEMA, DESCRIPTION, SITE, TITLE } from '$lib/meta';
	import { Clip, Pick } from '$lib/pick.svelte';

	const pick = new Pick();
	const clip = new Clip();
	let slate = $state<{ focus: () => void } | null>(null);

	const entries = $derived(formatAll(pick.shown));
	const steps = $derived(ladder(pick.shown));
	const name = $derived(entries.find((entry) => entry.id === 'name')!.value);

	onMount(() => {
		pick.restore();
		if (matchMedia('(pointer: fine)').matches) slate?.focus();
	});
</script>

<Head
	title={TITLE}
	description={DESCRIPTION}
	url={SITE}
	hex={pick.hex}
	icon={pick.icon}
	schema={APP_SCHEMA}
/>

<svelte:window onpaste={pick.paste} />

<Masthead />

<main>
	<Current css={pick.css} hex={pick.hex} {name} alpha={pick.alpha} />

	<BarField {steps} css={pick.css} onpick={pick.show} />

	<Slate
		bind:this={slate}
		value={pick.input}
		hex={pick.hex}
		alpha={pick.alpha}
		valid={pick.valid}
		oninput={pick.show}
		onalpha={pick.fade}
		onroll={pick.roll}
	/>

	<h2 class="visually-hidden">Every format</h2>
	<Readout {entries} copied={clip.copied} oncopy={clip.copy} />
</main>

<p class="visually-hidden" aria-live="polite">{clip.announcement}</p>

<footer>
	<p>
		A bare number is hex at 3, 4 or 6 digits and decimal at any other length, so <code>255</code> is
		<code>#225555</code> but <code>16711680</code> is red. <code>#</code> plus eight digits is
		<code>RRGGBBAA</code>, while <code>0x</code> plus eight is ARGB, the way Flutter and Android write
		it.
	</p>
	<p>CMYK is the naive conversion. Fine on screen, don't send it to print.</p>
	<FormatLinks heading="Every format, explained" formats={FORMATS} link={pick.link} />
	<p class="legend">
		<a href="https://github.com/NotAFlightRisk/color-code-convertor">Source on GitHub</a>
	</p>
</footer>

<style>
	footer {
		display: grid;
		gap: var(--s3);
		max-inline-size: 68ch;
		padding: var(--s6) var(--gutter) var(--s7);
		color: var(--text-muted);
		font-size: 0.8125rem;
		line-height: 1.65;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		color: var(--text);
	}

	a {
		color: var(--accent);
		text-decoration-thickness: 1px;
		text-underline-offset: 0.25em;
	}
</style>
