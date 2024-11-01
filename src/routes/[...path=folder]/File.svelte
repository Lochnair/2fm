<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	let { name, size, timestamp }: { name: string; size: number; timestamp: Date } = $props();

	function humanFileSize(size: number) {
		var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
		return +Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
	}

	function navigate() {
		const url = $page.url.href.replace(/\/?$/, '/') + name;
		console.log(url);
		goto(url);
	}
</script>

<tr onclick={navigate}>
	<th class="bi bi-file-earmark-fill" scope="row"></th>
	<td>{name}</td>
	<td>{humanFileSize(size)}</td>
	<td>{timestamp.toLocaleString()}</td>
</tr>

<style>
	tr:hover {
		cursor: pointer;
	}
</style>
