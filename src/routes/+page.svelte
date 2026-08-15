<script lang="ts">
	import { onMount } from 'svelte';
	import type { Color } from 'culori/fn';
	import BarField from '$lib/components/BarField.svelte';
	import Readout from '$lib/components/Readout.svelte';
	import Slate from '$lib/components/Slate.svelte';
	import {
		formatAll,
		textOn,
		ladder,
		parseColor,
		accentOn,
		toCss,
		toHexValue,
		type Formatted
	} from '$lib/color';

	const START = '#3a7bd5';
	const HOLD = 1900;

	let input = $state(START);
	let color = $state<Color>(parseColor(START)!);
	let override = $state<number | null>(null);
	let valid = $state(true);
	let copied = $state<string | null>(null);
	let announcement = $state('');
	let slate = $state<{ focus: () => void } | null>(null);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const shown = $derived(override === null ? color : { ...color, alpha: override });
	const entries = $derived(formatAll(shown));
	const steps = $derived(ladder(shown));
	const css = $derived(toCss(shown));
	const hex = $derived(toHexValue(shown));
	const alpha = $derived(shown.alpha ?? 1);
	const accent = $derived(accentOn(hex));

	$effect(() => {
		const root = document.documentElement.style;
		root.setProperty('--accent', accent);
		root.setProperty('--accent-contrast', textOn(accent));
	});

	function show(next: string, remember = true) {
		input = next;
		const parsed = parseColor(next);
		valid = parsed !== null;
		if (!parsed) return;
		color = parsed;
		override = null;
		if (remember) {
			history.replaceState(history.state, '', `#${encodeURIComponent(next.replace(/^#/, ''))}`);
		}
	}

	function roll() {
		const digits = Array.from({ length: 6 }, () =>
			Math.floor(Math.random() * 16).toString(16)
		).join('');
		show(`#${digits}`);
	}

	async function copy(entry: Formatted) {
		try {
			await navigator.clipboard.writeText(entry.value);
		} catch {
			announcement = 'Your browser blocked the clipboard, so copy it by hand.';
			return;
		}
		copied = entry.id;
		announcement = `${entry.label} copied: ${entry.value}`;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = null), HOLD);
	}

	function catchPaste(event: ClipboardEvent) {
		if (event.target instanceof HTMLInputElement) return;
		const text = event.clipboardData?.getData('text')?.trim();
		if (!text) return;
		event.preventDefault();
		show(text);
	}

	onMount(() => {
		const fromLink = decodeURIComponent(location.hash.slice(1)).trim();
		if (fromLink) show(fromLink, false);
		if (matchMedia('(pointer: fine)').matches) slate?.focus();
		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>Color code convertor - paste any format, get all of them</title>
	<meta
		name="description"
		content="Paste a colour in any notation and read it back in seventeen others. Hex, rgb, hsl, hsb, hwb, cmyk, lab, lch, oklab, oklch, display-p3, CSS names, Android, Flutter and Swift."
	/>
	<meta name="theme-color" content={hex} />
</svelte:head>

<svelte:window onpaste={catchPaste} />

<header>
	<h1 class="legend">Color code convertor</h1>
	<p class="legend strap">Paste one format, take any of the other seventeen</p>
</header>

<main>
	<BarField {steps} {css} onpick={show} />

	<Slate
		bind:this={slate}
		value={input}
		{hex}
		{alpha}
		{valid}
		oninput={show}
		onalpha={(next) => (override = next)}
		onroll={roll}
	/>

	<h2 class="visually-hidden">Every format</h2>
	<Readout {entries} {copied} oncopy={copy} />
</main>

<p class="visually-hidden" aria-live="polite">{announcement}</p>

<footer>
	<p>
		It reads hex, rgb, hsl, hsb, hwb, cmyk, lab, lch, oklab, oklch, display-p3, CSS names, decimal, <code
			>0xAARRGGBB</code
		>, and Flutter and Swift literals. Paste the whole CSS declaration if that's what you copied,
		semicolon and all.
	</p>
	<p>
		Two things worth knowing. Bare hex digits win over decimal, so <code>16711680</code> is the only
		plain number read as one. And <code>#</code> plus eight digits is CSS
		<code>RRGGBBAA</code>, while <code>0x</code> plus eight is ARGB, the way Flutter and Android write
		it.
	</p>
	<p>
		CMYK here is the naive conversion, same as every other web tool. Fine on screen, not a proof.
		Nearest CSS name says so when it isn't exact.
	</p>
	<p class="legend">
		<a href="https://github.com/NotAFlightRisk/color-code-convertor">Source on GitHub</a>
	</p>
</footer>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--s2) var(--s4);
		padding: var(--s3) var(--gutter);
		background: var(--surface-raised);
		border-block-end: 1px solid var(--border);
	}

	h1 {
		font-size: 0.75rem;
		color: var(--text);
	}

	.strap {
		color: var(--text-subtle);
	}

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
