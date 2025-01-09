<script>
	import Chart from "$components/home/chart.svelte";
	import Container from "$components/ui/container.svelte";

	let { data } = $props()
</script>

<Container title="欢迎页" padding>
	<Chart data={data.chart}/>
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

<style lang="scss">
</style>