<script>
  import Tab from "$components/ui/tab.svelte";
  let { data, children } = $props()
</script>

<Tab options={data.options}>
  {@render children?.()}
</Tab>