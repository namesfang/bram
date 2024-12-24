<script>
	import Result from "$components/ui/result.svelte";
	
	let { data } = $props()
</script>

<Result redirectURI={data.redirectURI} countdown warn description="未找到分组，请创建分组后继续添加分支"></Result>