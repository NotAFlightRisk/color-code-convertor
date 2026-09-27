<script lang="ts">
	import { formatAll, parseColor, toCss } from '$lib/color';

	type Props = {
		id: string;
		samples: string[];
		onpick: (value: string) => void;
	};

	let { id, samples, onpick }: Props = $props();

	/** Names print as the first exact match, so aqua would pose as cyan without this */
	const chips = $derived(
		samples.map((sample) => {
			const color = parseColor(sample)!;
			const value =
				id === 'name' ? sample : formatAll(color).find((entry) => entry.id === id)!.value;
			return { sample, css: toCss(color), value };
		})
	);
</script>

<ul class="chips">
	{#each chips as chip (chip.sample)}
		<li>
			<button type="button" onclick={() => onpick(chip.value)}>
				<span class="swatch" style:--swatch={chip.css}></span>
				<span class="value">{chip.value}</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	.chips {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
		border-block-start: 1px solid var(--border);
		border-inline-start: 1px solid var(--border);
	}

	li {
		display: grid;
		border-block-end: 1px solid var(--border);
		border-inline-end: 1px solid var(--border);
	}

	button {
		display: grid;
		grid-template-columns: 1.5rem minmax(0, 1fr);
		align-items: center;
		gap: var(--s3);
		padding: var(--s3);
		text-align: start;
		transition: background-color 140ms var(--ease);

		&:hover,
		&:focus-visible {
			background: var(--surface-hover);
		}

		&:focus-visible {
			outline-offset: -2px;
		}
	}

	.swatch {
		aspect-ratio: 1;
		background: var(--swatch);
		box-shadow: inset 0 0 0 1px var(--border);
	}

	.value {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		overflow-wrap: anywhere;
	}
</style>
