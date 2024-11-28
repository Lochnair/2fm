<script lang="ts">
	import type { PageData } from './$types';
	import { Table } from '@sveltestrap/sveltestrap';
	import File from './File.svelte';
	import Folder from './Folder.svelte';

	let { data }: { data: PageData } = $props();
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
		{#each data.commonPrefixes as prefix}
			<Folder prefix={prefix} />
		{/each}
		{#each data.contents as file}
			<File
				key={file.Key}
				name={file.Name}
				size={Number(file.Size)}
				timestamp={file.LastModified}
			/>
		{/each}
	</tbody>
</Table>
