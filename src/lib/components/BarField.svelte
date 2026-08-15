<script lang="ts">
	import { textOn, type Step } from '$lib/color';

	type Props = {
		steps: Step[];
		css: string;
		onpick: (hex: string) => void;
	};

	let { steps, css, onpick }: Props = $props();

	const grounds = [
		{ id: 'black', label: 'on black', ground: '#050607' },
		{ id: 'grey', label: 'on grey', ground: '#7c8288' },
		{ id: 'white', label: 'on white', ground: '#e9ebec' }
	];
</script>

<div class="field">
	<div class="bars">
		{#each steps as step, index (index)}
			<button
				type="button"
				class="bar"
				class:source={step.source}
				style:--bar-bg={step.hex}
				style:--bar-text={textOn(step.hex)}
				style:--index={index}
				onclick={() => onpick(step.hex)}
			>
				<span class="tick" aria-hidden="true"></span>
				<span class="reading legend">
					{Math.round(step.lightness * 100)}<span class="unit">L</span>
				</span>
				<span class="visually-hidden">
					Use {step.hex}{step.source ? ', the colour you pasted' : ''}
				</span>
			</button>
		{/each}
	</div>

	<div class="grounds" style:--current={css}>
		{#each grounds as ground (ground.id)}
			<div class="ground" style:--ground={ground.ground}>
				<div class="wash"></div>
				<span class="legend ground-label">{ground.label}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.field {
		display: grid;
		grid-template-rows: 1fr auto;
		border-block-end: 1px solid var(--border);
	}

	.bars {
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		block-size: clamp(4rem, 11vh, 6rem);
	}

	.bar {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-block-end: var(--s3);
		background: var(--bar-bg);
		color: var(--bar-text);
		transition: background-color 420ms var(--ease);
		transition-delay: calc(var(--index) * 24ms);
	}

	.tick {
		position: absolute;
		inset-block-start: 0;
		inset-inline: 0;
		block-size: 2px;
		background: currentColor;
		opacity: 0;
		transition: opacity 160ms var(--ease);
	}

	.bar.source .tick {
		opacity: 1;
		block-size: 3px;
		box-shadow: 0 6px 0 var(--bar-text);
	}

	.reading {
		color: currentColor;
		opacity: 0;
		transform: translateY(0.25rem);
		transition:
			opacity 160ms var(--ease),
			transform 160ms var(--ease);
	}

	.unit {
		opacity: 0.6;
		margin-inline-start: 0.15em;
	}

	.bar.source .reading,
	.bar:hover .reading,
	.bar:focus-visible .reading {
		opacity: 1;
		transform: none;
	}

	.bar:focus-visible {
		outline-offset: -4px;
	}

	.grounds {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.ground {
		display: grid;
		border-inline-start: 1px solid var(--surface);
	}

	.ground:first-child {
		border-inline-start: 0;
	}

	.wash {
		block-size: 2.5rem;
		background:
			linear-gradient(var(--current), var(--current)) no-repeat 50% / 60% 100%,
			linear-gradient(var(--ground), var(--ground));
	}

	.ground-label {
		padding: var(--s2) var(--s3);
		color: var(--text-subtle);
	}

	@media (width < 40rem) {
		.bars {
			block-size: 4rem;
		}

		.reading {
			font-size: 0.5625rem;
		}
	}
</style>
