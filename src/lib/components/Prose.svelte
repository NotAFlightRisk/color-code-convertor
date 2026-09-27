<script lang="ts">
	let { text }: { text: string } = $props();
</script>

{#each text.split('`') as piece, index (index)}{#if index % 2}<code>{piece}</code
		>{:else}{piece}{/if}{/each}

<style>
	code {
		font-family: var(--font-mono);
		font-size: 0.875em;
		color: var(--text);
		overflow-wrap: anywhere;
	}
</style>
