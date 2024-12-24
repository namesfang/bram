<script lang="ts">
	import { fade } from "svelte/transition";

  let {
    visible = $bindable(),
    full = false,
    class: className = '',
    style = '',
    children
  }: ui.PopperProps = $props()

  let popper: HTMLElement | null = $state(null)
  let overPopper = $state(false)

  const bodyClick = ({ target }: MouseEvent)=> {
    const el = target as HTMLInputElement
    const hasTrigger = el?.hasAttribute('data-popper-trigger')

    // 点击触发器元素
    if (el.nodeName !== 'INPUT' || !hasTrigger) {
      if (!overPopper && visible) {
        visible = false
        return
      }
    }

    // 是否当前组件触发
    const parentElement = el?.parentElement?.parentElement
    if (parentElement !== popper?.parentElement) {
      if (!overPopper && visible) {
        visible = false
      }
    }
  }

  const mouseOut = ()=> {
    overPopper = false
  }

  const mouseOver = ()=> {
    overPopper = true
  }
</script>

{#if visible}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div bind:this={popper} transition:fade onmouseout={mouseOut} onmouseover={mouseOver} class={`ui-popper ${className}`} class:full {style}>
  {@render children?.()}
</div>
{/if}

<svelte:body onclick={bodyClick}></svelte:body>

<style lang="scss">
  .ui-popper {
    max-height: 330px;
    overflow: hidden;
    overflow-y: auto;
    position: absolute;
    z-index: 1000;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  .full {
    width: 100%;
  }
</style>
