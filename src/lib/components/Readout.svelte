<script lang="ts">
	import type { Formatted } from '$lib/color';

	type Props = {
		entries: Formatted[];
		copied: string | null;
		oncopy: (entry: Formatted) => void;
	};

	let { entries, copied, oncopy }: Props = $props();
</script>

<ul class="bank">
	{#each entries as entry (entry.id)}
		<li>
			<button
				type="button"
				class="row"
				class:lit={copied === entry.id}
				onclick={() => oncopy(entry)}
			>
				<span class="edge" aria-hidden="true"></span>
				<span class="label legend">
					{entry.label}
					{#if entry.note}<span class="note">{entry.note}</span>{/if}
				</span>
				<span class="value">{entry.value}</span>
				<span class="action legend">
					{#if copied === entry.id}
						Copied
					{:else}
						<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
							<rect x="5.5" y="1.5" width="9" height="9" />
							<path d="M10.5 13.5h-9v-9" />
						</svg>
					{/if}
				</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	.bank {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		border-block-end: 1px solid var(--border);
		border-inline-end: 1px solid var(--border);
	}

	.row {
		position: relative;
		display: grid;
		grid-template-columns: 7.5rem minmax(0, 1fr) 3.25rem;
		align-items: baseline;
		gap: var(--s3);
		inline-size: 100%;
		padding: var(--s3) var(--gutter) var(--s3) var(--s5);
		text-align: start;
		transition: background-color 140ms var(--ease);
	}

	.row:hover,
	.row:focus-visible {
		background: var(--surface-hover);
	}

	.row:focus-visible {
		outline-offset: -2px;
	}

	.edge {
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		inline-size: 3px;
		background: var(--accent);
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 200ms var(--ease);
	}

	.row.lit .edge {
		transform: scaleY(1);
	}

	.label {
		align-self: center;
		display: grid;
		gap: 0.15rem;
	}

	.note {
		font-size: 0.5625rem;
		letter-spacing: 0.1em;
		color: var(--text-subtle);
	}

	.value {
		align-self: center;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		font-variant-numeric: tabular-nums;
		line-height: 1.4;
		overflow-wrap: anywhere;
	}

	.action {
		align-self: center;
		justify-self: end;
		color: var(--text-subtle);
		white-space: nowrap;
	}

	.row.lit .action {
		color: var(--accent);
	}

	.action svg {
		display: block;
		inline-size: 0.875rem;
		block-size: 0.875rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
	}

	.row:hover .action,
	.row:focus-visible .action {
		color: var(--text);
	}

	@media (width < 34rem) {
		.row {
			grid-template-columns: minmax(0, 1fr) 3.25rem;
			padding-inline: var(--s4);
			gap: var(--s1) var(--s3);
		}

		.label {
			grid-column: 1;
		}

		.value {
			grid-column: 1;
		}

		.action {
			grid-column: 2;
			grid-row: 1 / span 2;
		}
	}
</style>
