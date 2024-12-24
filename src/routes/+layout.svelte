<script>
	import Provider from "$components/ui/provider.svelte";

  let { children } = $props()
</script>

<Provider>
  {@render children()}
</Provider>
