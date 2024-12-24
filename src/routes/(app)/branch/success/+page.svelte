<script>
	import Result from "$components/ui/result.svelte";
	
	let { data } = $props()
</script>

<Result redirectURI={data.redirectURI} countdown description="操作成功，正在跳转..."></Result>