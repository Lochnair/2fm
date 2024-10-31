<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Navbar, NavbarBrand } from '@sveltestrap/sveltestrap';
	import { page } from '$app/stores';

	let path_components = $page.params.path.split('/');
</script>

<div class="container-fluid px-0">
	<div class="row">
		<div class="col">
			<header>
				<Navbar color="dark">
					<NavbarBrand style="color: white;" href="/">Lochnair's downloads</NavbarBrand>
				</Navbar>
			</header>
		</div>
	</div>
</div>

<div class="container mt-3">
	<div class="row">
		<Breadcrumb divider="/">
			<BreadcrumbItem>
				<a href="/">Home</a>
			</BreadcrumbItem>
			{#each path_components as path}
				<BreadcrumbItem>
					<a href="#home">{path}</a>
				</BreadcrumbItem>
			{/each}
		</Breadcrumb>
	</div>

	<main class="row">
		<slot />
	</main>

	<footer class="row sticky-bottom text-center">
		<span class="text-muted">Copyright © 2024 Lochnair</span>
	</footer>
</div>
