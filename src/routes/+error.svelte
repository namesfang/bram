<script>
	import { page } from "$app/stores";

	import Result from "$components/ui/result.svelte";
	import Button from "$components/ui/button.svelte";

	let messages = $derived.by(()=> {
		if($page.status === 404) {
			return {
				title: "NotFound",
				description: "页面未找到或已删除"
			}
		} else if($page.status === 500) {
			return {
				title: 'Server Error',
				description: "服务器错误"
			}
		}
		return {
			title: 'Unknown Error',
			description: "系统未知错误"
		}
	})
</script>

<Result danger {...messages}>
	<Button link href="/" color="primary" size="small">返回首页</Button>
</Result>