<script lang="ts">
	import type { PageData } from './$types';
	import { Table } from '@sveltestrap/sveltestrap';

	export let { data }: { data: PageData } = $props();

	function humanFileSize(size: number) {
		var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
		return +Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
	}
</script>

<Table hover>
	<thead>
		<tr>
			<th></th>
			<th>File Name</th>
			<th>File Size</th>
			<th>Date</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th class="bi bi-folder-fill" scope="row"></th>
			<td>Bufferbloat</td>
			<td>-</td>
			<td></td>
		</tr>
		<tr>
			<th class="bi bi-file-earmark-fill" scope="row"></th>
			<td>OCTEON-SDK.tar.xz</td>
			<td>1.5 GiB</td>
			<td>2024-03-10 11:53:20</td>
		</tr>
		<tr>
			<th class="bi bi-file-earmark-fill" scope="row"></th>
			<td>sch_cake.ko</td>
			<td>50 KiB</td>
			<td>2024-01-10 04:20:20</td>
		</tr>
	</tbody>
</Table>
