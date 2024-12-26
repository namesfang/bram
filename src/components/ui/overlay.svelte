<script lang="ts">
  import { fly } from 'svelte/transition'
	import { teleport } from "$components/ui/actions/telport";
	import { zIndex } from '$components/ui/overlay';
	import { onMount } from 'svelte';

  let {
    visible = $bindable(false),
    alignItems = 'center',
    maskClosable = false,
    children,
    onclose,
    ...rest
  }: ui.OverlayProps = $props()


  onMount(()=> {
    $zIndex += 1
  })

  const overlayClick = (e: MouseEvent)=> {
    if (maskClosable) {
      visible = false
      onclose?.(e)
    }
  }

</script>

{#if visible}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div onclick={overlayClick} {...rest} transition:fly use:teleport class="ui-overlay" style:align-items={alignItems} style:z-index={$zIndex}>
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
  background-color: rgba(187, 186, 212, 0.5);
  backdrop-filter: saturate(50%) blur(4px);
}
</style>