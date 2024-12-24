<script lang="ts">
	import Button from "$components/ui/button.svelte";
	import Form from "../components/form.svelte";
	
	let { data } = $props()
</script>

<Form>
	{#if data.securitySignupEnabled}
	<a href='/signup'>注册</a>
	{/if}
	<Button submit color="primary">登录</Button>
</Form>