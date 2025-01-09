<script>
	import { PUBLIC_BUILD_MODE } from "$env/static/public";
	import Provider from "$components/ui/provider.svelte";
  
  let { children } = $props()
</script>

<svelte:head>
	{#if PUBLIC_BUILD_MODE === 'demo'}
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

<Provider>
  {@render children()}
</Provider>

{#if PUBLIC_BUILD_MODE === 'demo'}
	<div class="demo-banner">DEMO</div>
{/if}

<style lang="scss">
  .demo-banner {
		width: 150px;
		height: 24px;
		text-align: center;
		line-height: 24px;
		font-size: 14px;
		color: var(--warning-color);
		position: fixed;
		top: 30px;
		right: -30px;
		background-color: var(--danger-color);
		transform: rotate(45deg);
		z-index: 9999;
	}
</style>