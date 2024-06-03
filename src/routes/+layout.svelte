<script>
	import '../styles/app.css';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>SvelteKit Auth with Cookies</title>
</svelte:head>

<nav>
	{#if !$page.data.user}
		<a href="/login">Login</a>
		<a href="/register">Sign up</a>
	{:else}
		<a href="/admin">Admin</a>

		<form class="logout" action="/logout" method="post">
			<button type="submit">Log out</button>
		</form>
	{/if}
</nav>

<main>
	<slot />
</main>
