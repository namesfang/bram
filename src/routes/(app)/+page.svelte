<script>
	import { dev } from "$app/environment";
	import Container from "$components/ui/container.svelte";
	import { Chart } from "chart.js/auto";
	import { onMount } from "svelte";

	let { data } = $props()

	let canvasEl = $state()

	onMount(()=> {
		new Chart(canvasEl, {
			type: 'line',
			data: data.chart,
			options: {
				responsive: true,
				scales: {
					x: {
						offset: true,
						ticks: {
							padding: 10,
						},
						grid: {
							drawTicks: false,
							color: '#fafaf1'
						}
					},
					y: {
						beginAtZero: true,
						offset: true,
						ticks: {
							padding: 10,
						},
						grid: {
							drawTicks: false,
							color: '#fafaf1'
						}
					}
				},
				plugins: {
					legend: {
						position: 'top',
						labels: {
							boxWidth: 20,
							boxHeight: 16,
							borderRadius: 6,
							useBorderRadius: true,
						}
					},
					title: {
						display: true,
						text: '本月发版情况概览',
						font: {
							size: 26
						}
					}
				}
			},
		})
	})
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
	<div class="chart-container">
		<canvas width="960px" height="380px" bind:this={canvasEl}></canvas>
	</div>
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
	.chart-container {
		width: 960px;
		margin: 0 auto;
	}
</style>