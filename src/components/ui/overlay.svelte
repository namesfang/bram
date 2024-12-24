<script lang="ts">
  import { fly } from 'svelte/transition'
	import { teleport } from "$components/ui/actions/telport";
	import { zIndex } from '$components/ui/overlay';
	import { onMount } from 'svelte';

  let {
    visible = $bindable(false),
    children,
    ...rest
  } = $props()


  onMount(()=> {
    $zIndex += 1
  })

</script>

{#if visible}
  <div {...rest} transition:fly use:teleport class="ui-overlay" style:z-index={$zIndex}>
    {@render children?.()}
  </div>
{/if}

<style lang="scss">
.ui-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.5);
}
</style>