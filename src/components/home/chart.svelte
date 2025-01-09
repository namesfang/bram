<script>
	import { Chart } from "chart.js/auto";
	import { onMount } from "svelte";

	let { data } = $props()

	let canvasEl = $state()

	onMount(()=> {
		new Chart(canvasEl, {
			type: 'line',
			data,
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
							stepSize: 1,
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

<div class="chart-container">
  <canvas width="960px" height="380px" bind:this={canvasEl}></canvas>
</div>

<style lang="scss">
	.chart-container {
		width: 960px;
		margin: 0 auto;
	}
</style>