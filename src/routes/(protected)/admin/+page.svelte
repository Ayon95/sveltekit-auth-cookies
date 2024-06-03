<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Admin</h1>

{#if $page.data.user}
	<p>Welcome {$page.data.user.name}!</p>
{/if}

{#if $page.data.user.role === 'ADMIN'}
	<p>You have admin privileges.</p>
{:else}
	<p>You do not have admin privileges.</p>
{/if}
