<script lang="ts">
	import type { Format } from '$lib/guides';

	type Props = {
		heading: string;
		formats: Format[];
		current?: string;
		link?: string;
	};

	let { heading, formats, current, link = '' }: Props = $props();
	const id = $props.id();
</script>

<nav aria-labelledby={id}>
	<h2 {id} class="legend">{heading}</h2>
	<ul>
		{#each formats as format (format.slug)}
			<li>
				<a href="/{format.slug}/{link}" aria-current={format.slug === current ? 'page' : undefined}>
					{format.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		display: grid;
		gap: var(--s3);
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
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

	a {
		padding: var(--s3) var(--s4);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text);
		text-decoration: none;
		transition: background-color 140ms var(--ease);

		&:hover,
		&:focus-visible {
			background: var(--surface-hover);
		}

		&:focus-visible {
			outline-offset: -2px;
		}

		&[aria-current='page'] {
			color: var(--accent-contrast);
			background: var(--accent);
		}
	}
</style>
