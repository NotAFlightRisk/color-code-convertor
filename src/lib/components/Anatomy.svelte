<script lang="ts">
	import { anatomy } from '#lib/guides/anatomy.js';

	type Props = {
		name: string;
		value: string;
		note?: string;
		parts: string[];
		copied: boolean;
		oncopy: () => void;
	};

	let { name, value, note, parts, copied, oncopy }: Props = $props();

	const pieces = $derived(anatomy(value, parts));
</script>

<div class="anatomy">
	<div class="reading">
		<p class="value">
			{#each pieces as piece, index (index)}
				{#if piece.part}
					<span class="piece">
						<span class="text">{piece.text}</span>
						<span class="part legend">{piece.part}</span>
					</span>
				{:else}
					<span class="glue">{piece.text}</span>
				{/if}
			{/each}
		</p>
		{#if note}<p class="legend note">{note}</p>{/if}
	</div>
	<button type="button" class="copy" class:lit={copied} onclick={oncopy}>
		<span class="legend">{copied ? 'Copied' : `Copy ${name}`}</span>
	</button>
</div>

<style>
	.anatomy {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: start;
		gap: var(--s4) var(--s6);
		padding: var(--s5) var(--gutter);
		border-block-end: 1px solid var(--border);
	}

	.value {
		display: flex;
		flex-wrap: wrap;
		row-gap: var(--s3);
		font-family: var(--font-mono);
		font-size: clamp(1.25rem, 3.5vw, 2rem);
		font-weight: 500;
		font-variant-numeric: tabular-nums;
		line-height: 1.2;
	}

	.reading {
		display: grid;
		gap: var(--s3);
	}

	.piece {
		display: grid;
		gap: var(--s2);

		& + & {
			margin-inline-start: var(--s2);
		}
	}

	.text {
		padding-block-end: var(--s1);
		border-block-end: 2px solid var(--accent);
	}

	.part {
		font-size: 0.625rem;
		color: var(--text-muted);
		user-select: none;
	}

	.note,
	.glue {
		color: var(--text-muted);
	}

	.glue {
		white-space: pre;
	}

	.copy {
		display: grid;
		place-items: center;
		block-size: 2.25rem;
		padding-inline: var(--s4);
		border: 1px solid var(--border-strong);
		transition:
			background-color 160ms var(--ease),
			color 160ms var(--ease);

		.legend {
			color: inherit;
		}

		&:hover,
		&:focus-visible,
		&.lit {
			background: var(--accent);
			border-color: var(--accent);
			color: var(--accent-contrast);
		}
	}

	@media (width < 34rem) {
		.anatomy {
			grid-template-columns: minmax(0, 1fr);
		}

		.copy {
			justify-self: start;
		}
	}
</style>
