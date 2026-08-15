<script lang="ts">
	import { textOn } from '$lib/color';

	type Props = {
		css: string;
		hex: string;
		name: string;
		alpha: number;
	};

	let { css, hex, name, alpha }: Props = $props();
</script>

<figure class="current" style:--current={css} style:--solid={hex} style:--on-solid={textOn(hex)}>
	<div class="tint"></div>
	<figcaption class="plate" class:opaque={alpha === 1}>
		<span class="legend">Current</span>
		<span class="value">{hex}</span>
		<span class="legend">
			{name}{alpha < 1 ? ` at ${Math.round(alpha * 100)}% alpha` : ''}
		</span>
	</figcaption>
</figure>

<style>
	.current {
		position: relative;
		display: grid;
		align-items: end;
		margin: 0;
		min-block-size: clamp(8rem, 22vh, 13rem);
		background:
			conic-gradient(
					from 90deg,
					var(--surface-hover) 0 25%,
					var(--surface) 0 50%,
					var(--surface-hover) 0 75%,
					var(--surface) 0
				)
				0 0 / 1.5rem 1.5rem,
			var(--surface);
		border-block-end: 1px solid var(--border);
	}

	.tint {
		position: absolute;
		inset: 0;
		background-color: var(--current);
		transition: background-color 300ms var(--ease);
	}

	.plate {
		position: relative;
		justify-self: start;
		display: grid;
		gap: var(--s1);
		margin: var(--s5) var(--gutter);
		padding: var(--s3) var(--s4);
		background: var(--solid);
		color: var(--on-solid);
	}

	.plate.opaque {
		padding-inline: 0;
		background: none;
	}

	.plate .legend {
		color: inherit;
	}

	.value {
		font-family: var(--font-mono);
		font-size: clamp(1.75rem, 6vw, 3.5rem);
		font-weight: 500;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		letter-spacing: -0.02em;
	}
</style>
