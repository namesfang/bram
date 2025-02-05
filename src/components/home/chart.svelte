<script lang="ts">
	import Select from "$components/ui/select.svelte";
	import { Fetch } from "$lib/fetch";

	import { Chart, type ChartData } from "chart.js/auto";

	import { onMount } from "svelte";

	let canvasEl = $state<HTMLCanvasElement>()

	let value = $state()

	let monthly = $state<ui.SelectOption[]>([])

	let chart: Chart | undefined

	const f = new Fetch()

	const fetchStat = async(value: string)=> {
		return await f.get(`/stat/${value}`) as ChartData<'line'>
	}

	const change = async (value: unknown, options: ui.SelectOption)=> {
		chart!.data = await fetchStat(value as string)
		chart?.update()
	}

	onMount(async ()=> {

		monthly = await f.get('/stat/monthly')

		value = monthly[0].value || ''

		const dd =  await fetchStat('')

		chart = new Chart(canvasEl!, {
			type: 'line',
			data: dd ,
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
						text: '发版情况概览',
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
	<div class="chart-monthly">
		<Select align="left" onchange={change} value={value} options={monthly}/>
	</div>
</div>

<style lang="scss">
	.chart-container {
		width: 960px;
		margin: 0 auto;
		position: relative;

		.chart-monthly {
			width: 150px;
			position: absolute;
			top: 10px;
			right: 10px;
		}
	}
</style>