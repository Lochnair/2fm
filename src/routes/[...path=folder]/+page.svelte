<!-- @migration-task Error while migrating Svelte code: Cannot use `export let` in runes mode — use `$props()` instead -->
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
		{#each data.objects.CommonPrefixes as prefix}
			<Folder prefix={prefix.Prefix} />
		{/each}
		{#each data.objects.Contents as file}
			<File
				key={file.Key}
				name={file.Name}
				size={Number(file.Size)}
				timestamp={file.LastModified}
				url={file.Url}
			/>
		{/each}
	</tbody>
</Table>
