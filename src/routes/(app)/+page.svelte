<script>
	import { dev } from "$app/environment";
import Container from "$components/ui/container.svelte";
	let { data } = $props()
</script>

<svelte:head>
	{#if dev === false}
	<script>
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?f5c4333a8d378a5fdd4e8f44da4e770c";
		var s = document.getElementsByTagName("script")[0]; 
		s.parentNode.insertBefore(hm, s);
	})();
	</script>
	{/if}
</svelte:head>

<Container title="欢迎页" padding>
	<ul>
		{#each data.casts as cast}
			<li>
				<dl>
					<dd>{cast.date}</dd>
					<dd>{cast.week}</dd>
					<dd>气象：{cast.dayweather}：{cast.nightweather}</dd>
					<dd>温度：{cast.daytemp}~{cast.nighttemp}</dd>
					<dd>风向：{cast.daywind}~{cast.nightwind}</dd>
					<dd>风力：{cast.daypower}~{cast.nightpower}</dd>
				</dl>
			</li>
		{/each}
	</ul>
</Container>