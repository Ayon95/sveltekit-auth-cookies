<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>Sign up</h1>

<form action="?/register" method="post" use:enhance>
	<div>
		<label for="username">Username</label>
		<input type="text" name="username" id="username" required />
	</div>
	<div>
		<label for="password">Password</label>
		<input type="password" name="password" id="password" required />
	</div>

	{#if form?.invalid}
		<p class="error">{form?.message}</p>
	{/if}

	{#if form?.user}
		<p class="error">{form?.message}</p>
	{/if}

	<button type="submit">Create account</button>
</form>
