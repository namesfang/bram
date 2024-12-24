<script lang="ts">
	import Button from "$components/ui/button.svelte";
	import Form from "../components/form.svelte";
	let { data } = $props()
</script>

<Form>
	{#if data.securityLoginEnabled}
		<a href='/login'>登录</a>
	{/if}
	<Button submit color="primary">注册</Button>
</Form>