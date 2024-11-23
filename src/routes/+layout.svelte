<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Navbar, NavbarBrand } from '@sveltestrap/sveltestrap';
	import { page } from '$app/stores';
	let { children }: { children: Snippet } = $props();
	let path_components = $derived($page.url.pathname.replace('/', '').split('/'));
</script>

<div class="container-fluid px-0">
	<div class="row">
		<div class="col">
			<header>
				<Navbar children={false} color="dark">
					<NavbarBrand children={false} style="color: white;" href="/"
						>Lochnair's downloads</NavbarBrand
					>
				</Navbar>
			</header>
		</div>
	</div>
</div>

<div class="container mt-3">
	<div class="row">
		<Breadcrumb children={false} divider="/">
			<BreadcrumbItem children={false}>
				<a href="/">Home</a>
			</BreadcrumbItem>
			{#each path_components as path, index}
				<BreadcrumbItem children={false}>
					<a href={'/' + path_components.slice(0, index + 1).join('/')}>{path}</a>
				</BreadcrumbItem>
			{/each}
		</Breadcrumb>
	</div>

	<main class="row">
		{@render children()}
	</main>

	<footer class="row sticky-bottom text-center">
		<span class="text-muted">Copyright © 2024 Lochnair</span>
	</footer>
</div>
