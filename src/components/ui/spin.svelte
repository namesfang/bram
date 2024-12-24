<script lang="ts">
	import { onMount } from "svelte";

  let {
    spinning = $bindable(),
    message = '',
    size = 'medium',
    color = 'default',
    delay = 0,
		class: className,
		style,
    children,
  }: ui.SpinProps = $props()

	onMount(()=> {
    if(delay > 0) {
      setTimeout(()=> delay = 0, delay)
    }
  })

	const colorsMap = new Map<ui.Colors, string>([
		['default', '#42576c'],
		['primary', '#1083fe'],
		['danger', '#f63c67'],
		['success', '#27c76f'],
		['warning', '#f6da3c'],
	])
</script>

{#if spinning && delay === 0}
<div class={`ui-spin ${size} ${className}`} style:--color={colorsMap.get(color) ?? colorsMap.get('primary')} {style}>
	<div class="spinning-holder">
		<span class="spinning">
			{#if children}
				{@render children()}
			{:else}
				<svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="var(--color)" aria-hidden="true">
					<path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
				</svg>
			{/if}
		</span>
	</div>
	{#if message.length > 0}
		<div class="message">{message}</div>
	{/if}
</div>
{/if}
<style lang="scss">
	.ui-spin {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		@keyframes move {
			100% {
				opacity: 1;
			}
		}
		@keyframes rotate {
			100% {
				transform: rotate(405deg);
			}
		}

		&.tiny {
			--width: 16px;
			.spinning-holder {
				font-size: 12px;
			}
		}
		&.small {
			--width: 26px;
			.spinning-holder {
				font-size: 14px;
			}
		}
		&.medium {
			--width: 40px;
			.spinning-holder {
				font-size: 32px;
			}
		}
		&.large {
			--width: 46px;
			.spinning-holder {
				font-size: 40px;
			}
		}

		.spinning-holder {
			width: 1em;
			height: 1em;
			display: inline-block;
			transition: transform 0.3s ease, opacity 0.3s ease;
			transform-origin: 50% 50%;
			position: relative;
		}

		.spinning {
			width: 1em;
			height: 1em;
			text-align: center;
			line-height: 1rem;
			transform: rotate(45deg);
			font-size: var(--width);
			display: inline-block;
			position: absolute;
			top: 50%;
			left: 50%;
			margin: -.5em 0 0 -.5em;

			animation-name: rotate;
			animation-duration: 1.2s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}

		.message {
			font-size: 14px;
			text-align: center;
			color: var(--color);
			margin-top: calc(var(--width) / 2);
			opacity: 0.3;
			animation-name: move;
			animation-duration: 1s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
			animation-direction: alternate;
		}
	}
</style>
