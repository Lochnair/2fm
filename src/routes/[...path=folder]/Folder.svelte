<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let { prefix }: { prefix: string } = $props();

	function navigate() {
		const url = $page.url.href.replace(/\/?$/, '/') + prefix.replace(/\\/, '');
		console.log(url);
		goto(url);
	}
</script>

<tr onclick={navigate}>
	<th class="bi bi-folder-fill" scope="row"></th>
	<td>{prefix.replace(/\\/, '')}</td>
	<td>-</td>
	<td>-</td>
</tr>

<style>
	tr:hover {
		cursor: pointer;
	}
</style>
