<script>
	import Tab from "$components/ui/tab.svelte";

  const options = [
    {label: '创建分支', href: '/branch/create'},
    {label: '创建分组', href: '/branch/create/group'},
  ]
</script>

<Tab {options}>
  <slot></slot>
</Tab>