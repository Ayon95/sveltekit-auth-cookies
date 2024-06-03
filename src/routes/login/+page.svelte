<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>Log in</h1>

<form action="?/login" method="post">
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

	{#if form?.credentials}
		<p class="error">{form?.message}</p>
	{/if}

	{#if form?.user}
		<p class="error">{form?.message}</p>
	{/if}

	<button type="submit">Log in</button>
</form>
