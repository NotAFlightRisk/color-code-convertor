<script lang="ts">
	import type { Color } from 'culori/fn';
	import { toCss } from '#lib/color/index.js';
	import type { Channel } from '#lib/guides/index.js';

	type Props = {
		channels: Channel[];
		color: Color;
		ontune: (color: Color) => void;
	};

	let { channels, color, ontune }: Props = $props();

	const STOPS = 13;

	/** What the colour would look like at every point along one channel, the rest held still. */
	const track = (channel: Channel) => {
		const stops = Array.from({ length: STOPS }, (_, index) => {
			const value = channel.min + ((channel.max - channel.min) * index) / (STOPS - 1);
			return toCss({ ...channel.write(color, value), alpha: 1 });
		});
		return `linear-gradient(to right, ${stops.join(', ')})`;
	};

	const position = (channel: Channel, value: number) =>
		Math.min(1, Math.max(0, (value - channel.min) / (channel.max - channel.min)));
</script>

<ul class="channels">
	{#each channels as channel (channel.label)}
		{@const value = channel.read(color)}
		<li class="channel">
			<label>
				<span class="legend">{channel.label}</span>
				{#if channel.locked}
					<span class="track" style:--track={track(channel)} style:--at={position(channel, value)}
					></span>
				{:else}
					<input
						type="range"
						min={channel.min}
						max={channel.max}
						step={channel.step}
						{value}
						aria-valuetext={channel.say(value)}
						style:--track={track(channel)}
						oninput={(event) => ontune(channel.write(color, Number(event.currentTarget.value)))}
					/>
				{/if}
			</label>
			<span class="reading" aria-hidden={channel.locked ? undefined : 'true'}>
				{channel.say(value)}
			</span>
		</li>
	{/each}
</ul>

<style>
	.channels {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: var(--s4) var(--s6);
		margin: 0;
		padding: var(--s5) var(--gutter);
		list-style: none;
		border-block-end: 1px solid var(--border);
	}

	.channel {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: end;
		gap: var(--s3);
	}

	label {
		display: grid;
		gap: var(--s2);
	}

	.reading {
		min-inline-size: 4ch;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-variant-numeric: tabular-nums;
		text-align: end;
	}

	input,
	.track {
		inline-size: 100%;
		block-size: 1.75rem;
		margin: 0;
		background: var(--track);
		border: 1px solid var(--border);
	}

	.track {
		position: relative;

		&::after {
			content: '';
			position: absolute;
			inset-block: -0.3125rem;
			inset-inline-start: calc(var(--at) * 100%);
			inline-size: 0.5rem;
			translate: -50%;
			background: var(--text-muted);
			border: 2px solid var(--surface);
		}
	}

	input {
		cursor: pointer;
		appearance: none;

		&::-webkit-slider-thumb {
			inline-size: 0.5rem;
			block-size: 2.25rem;
			background: var(--text);
			border: 2px solid var(--surface);
			appearance: none;
		}

		&::-moz-range-thumb {
			inline-size: 0.5rem;
			block-size: 2.25rem;
			background: var(--text);
			border: 2px solid var(--surface);
			border-radius: 0;
		}

		&:focus-visible {
			outline-offset: 3px;
		}
	}
</style>
