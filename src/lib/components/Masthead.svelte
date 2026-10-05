<script lang="ts">
	import { NAME } from '#lib/meta.js';

	type Props = {
		crumb?: string;
		link?: string;
	};

	let { crumb, link = '' }: Props = $props();
</script>

<header>
	{#if crumb}
		<nav aria-label="Breadcrumb">
			<ol class="legend">
				<li><a href="/{link}">{NAME}</a></li>
				<li aria-current="page">{crumb}</li>
			</ol>
		</nav>
	{:else}
		<h1 class="legend">{NAME}</h1>
	{/if}
	<p class="legend strap">Paste one format, take any of the other seventeen</p>
</header>

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

	h1,
	ol {
		font-size: 0.75rem;
		color: var(--text);
	}

	ol {
		display: flex;
		gap: var(--s2);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li + li::before {
		content: '/';
		margin-inline-end: var(--s2);
		color: var(--text-subtle);
	}

	a {
		color: inherit;
		text-decoration-color: var(--border-strong);
		text-underline-offset: 0.3em;

		&:hover {
			text-decoration-color: var(--accent);
		}
	}

	.strap {
		color: var(--text-subtle);
	}
</style>
