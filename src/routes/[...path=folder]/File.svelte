<script lang="ts">
	let {
		key,
		name,
		size,
		timestamp,
		url
	}: { key: string; name: string; size: number; timestamp: Date; url: string } = $props();

	function humanFileSize(size: number) {
		var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
		return +Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
	}

	let link;

	function handleRowClick(event) {
		// Only trigger the link click if the click was NOT on the <a>
		if (event.target.tagName !== 'A') {
			link.click();
		}
	}

	function navigate() {
		if (link) {
			link.click();
		}
	}
</script>

<tr data-uri={url} onclick={handleRowClick}>
	<th class="bi bi-file-earmark-fill" scope="row"></th>
	<td
		><a bind:this={link} download={name} target="_blank" rel="noopener" href="/{key}">{name}</a></td
	>
	<td>{humanFileSize(size)}</td>
	<td>{timestamp.toLocaleString()}</td>
</tr>

<style>
	tr:hover {
		cursor: pointer;
	}
</style>
