<script lang="ts">
	type Props = {
		value: string;
		hex: string;
		alpha: number;
		valid: boolean;
		oninput: (value: string) => void;
		onalpha: (alpha: number) => void;
		onroll: () => void;
	};

	let { value, hex, alpha, valid, oninput, onalpha, onroll }: Props = $props();
	let field = $state<HTMLInputElement | null>(null);

	export function focus() {
		field?.focus();
		field?.select();
	}
</script>

<div class="slate" class:dead={!valid}>
	<div class="entry">
		<label class="legend" for="source">Source</label>
		<input
			bind:this={field}
			id="source"
			class="code"
			type="text"
			spellcheck="false"
			autocomplete="off"
			autocapitalize="off"
			autocorrect="off"
			aria-invalid={!valid}
			aria-describedby="signal-status"
			placeholder="#3a7bd5"
			{value}
			oninput={(event) => oninput(event.currentTarget.value)}
		/>
		<p id="signal-status" class="status" role="status">
			{#if valid}
				Signal locked
			{:else}
				No signal - can't read that one. Try #3a7bd5, rgb(58 123 213) or oklch(58% .15 258)
			{/if}
		</p>
	</div>

	<div class="controls">
		<label class="control pick" style:--pick={hex}>
			<span class="legend">Pick</span>
			<input
				type="color"
				value={hex}
				aria-label="Pick a colour"
				oninput={(event) => oninput(event.currentTarget.value)}
			/>
		</label>

		<label class="control fader">
			<span class="legend">Alpha <span class="reading">{Math.round(alpha * 100)}%</span></span>
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={alpha}
				aria-label="Alpha"
				oninput={(event) => onalpha(Number(event.currentTarget.value))}
			/>
		</label>

		<button type="button" class="control roll" onclick={onroll}>
			<span class="legend">Roll</span>
			<span class="roll-face code">random</span>
		</button>
	</div>
</div>

<style>
	.slate {
		display: grid;
		gap: var(--s4) var(--s6);
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: end;
		padding: var(--s5) var(--gutter) var(--s4);
		background: var(--surface-raised);
		border-block-end: 1px solid var(--border);
	}

	.entry {
		display: grid;
		gap: var(--s2);
		min-inline-size: 0;
	}

	.code {
		font-family: var(--font-mono);
		font-size: clamp(1.125rem, 3vw, 1.75rem);
		font-weight: 500;
		letter-spacing: -0.02em;
		inline-size: 100%;
		padding: 0 0 var(--s2);
		background: none;
		border: 0;
		border-block-end: 2px solid var(--border-strong);
		transition: border-color 200ms var(--ease);
	}

	.code::placeholder {
		color: var(--text-subtle);
	}

	.code:focus {
		outline: none;
		border-block-end-color: var(--accent);
	}

	.slate.dead .code {
		border-block-end-color: var(--warning);
	}

	.controls {
		display: flex;
		align-items: end;
		gap: var(--s5);
	}

	.control {
		display: grid;
		gap: var(--s2);
		align-content: end;
	}

	.pick input {
		inline-size: 3rem;
		block-size: 2.25rem;
		padding: 0;
		background: var(--pick);
		border: 1px solid var(--border-strong);
		cursor: pointer;
		appearance: none;
	}

	.pick input::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	.pick input::-webkit-color-swatch,
	.pick input::-moz-color-swatch {
		border: 0;
	}

	.fader {
		inline-size: clamp(6rem, 14vw, 10rem);
	}

	.fader .reading {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		letter-spacing: 0;
		color: var(--text);
	}

	.fader input {
		inline-size: 100%;
		block-size: 2.25rem;
		margin: 0;
		background: none;
		appearance: none;
	}

	.fader input::-webkit-slider-runnable-track {
		block-size: 2px;
		background: var(--border-strong);
	}

	.fader input::-moz-range-track {
		block-size: 2px;
		background: var(--border-strong);
	}

	.fader input::-webkit-slider-thumb {
		inline-size: 0.625rem;
		block-size: 1.5rem;
		margin-block-start: -0.6875rem;
		background: var(--text);
		border: 0;
		appearance: none;
	}

	.fader input::-moz-range-thumb {
		inline-size: 0.625rem;
		block-size: 1.5rem;
		background: var(--text);
		border: 0;
		border-radius: 0;
	}

	.roll {
		text-align: start;
	}

	.roll-face {
		display: grid;
		place-items: center;
		block-size: 2.25rem;
		padding-inline: var(--s3);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		border: 1px solid var(--border-strong);
		transition:
			background-color 160ms var(--ease),
			color 160ms var(--ease);
	}

	.roll:hover .roll-face,
	.roll:focus-visible .roll-face {
		background: var(--text);
		color: var(--surface);
	}

	.status {
		font-size: 0.75rem;
		line-height: 1.4;
		color: var(--text-subtle);
	}

	.slate.dead .status {
		color: var(--warning);
	}

	@media (width < 48rem) {
		.slate {
			grid-template-columns: minmax(0, 1fr);
		}

		.controls {
			justify-content: space-between;
			gap: var(--s4);
		}

		.fader {
			flex: 1;
		}
	}
</style>
