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

	let link: HTMLAnchorElement;

	function handleRowClick(event: svelte.JSX.MouseEventHandler) {
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
	/* Default link styling for white backgrounds */
	td > a {
		color: #007bff; /* Bright blue for visibility */
		text-decoration: none; /* Cleaner look */
		transition: color 0.2s ease-in-out; /* Smooth hover effect */
	}

	/* Hover state for links */
	td > a:hover {
		color: #0056b3; /* Darker blue */
		text-decoration: underline; /* Add underline for emphasis */
	}

	tr:hover {
		cursor: pointer;
	}
</style>
