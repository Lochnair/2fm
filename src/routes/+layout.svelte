<script lang="ts">
	import { onMount } from 'svelte';
	import '../styles/global.scss';
	import '@fontsource/varela';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Nav,
		Navbar,
		NavbarBrand
	} from '@sveltestrap/sveltestrap';
	import { page } from '$app/stores';
	let { children }: { children: Snippet } = $props();
	let path_components = $derived($page.url.pathname.replace('/', '').split('/'));
	let path_components_len = $derived(path_components.length);

	let theme = $state('light');

	// Load the saved theme from localStorage on mount
	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'light';
		theme = savedTheme;
		document.documentElement.setAttribute('data-bs-theme', theme);
	});

	// Toggle theme and save to localStorage
	const toggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-bs-theme', theme);
		localStorage.setItem('theme', theme);
	};
</script>

<header>
	<Navbar children={false} color="dark">
		<NavbarBrand children={false} style="color: white;" href="/">Lochnair's downloads</NavbarBrand>
		<Nav class="ms-auto" navbar>
			<Button class="ms-auto" on:click={toggleTheme} outline={theme === 'dark'} color="secondary"
				>{theme === 'light' ? '🌙' : '☀️'}</Button
			>
		</Nav>
	</Navbar>
</header>

<div class="container mt-3">
	<div class="row">
		<Breadcrumb children={false} divider="/">
			<BreadcrumbItem children={false}>
				<a class="text-success" href="/">Home</a>
			</BreadcrumbItem>
			{#each path_components as path, index}
				<BreadcrumbItem data-index={index} data-path={path} children={false}>
					{#if path_components_len - 1 == index}
						<a class="text-muted" href={'/' + path_components.slice(0, index + 1).join('/')}
							>{path}</a
						>
					{:else}
						<a class="text-success" href={'/' + path_components.slice(0, index + 1).join('/')}
							>{path}</a
						>
					{/if}
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

<style>
	:global(body) {
		font-family: 'Varela' !important;
	}
</style>
