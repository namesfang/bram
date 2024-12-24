<script lang="ts">
	import { fade } from "svelte/transition";
	import { clickoutside } from "$components/ui/actions/clickoutside";

  let {
    visible = $bindable(),
    triggerElement,
    arrow = true,
    placement = 'bottom-center',
    class: className,
    style,
    children
  }: ui.PopupProps = $props()

  const callback = (target: HTMLElement)=> {
    if(triggerElement !== target) {
      visible = false
    }
  }

  const halfCeil = (value: number)=> {
    return Math.ceil(Math.ceil(value) / 2)
  }

  let popupElement = $state<HTMLDivElement>()

  let top = $state(0)
  let left = $state(0)

  $effect(()=> {
    if(!popupElement || !triggerElement) {
      return
    }

    const popRect = popupElement.getBoundingClientRect()
    const triggerRect = triggerElement.getBoundingClientRect()

    // 底部居中
    if(placement.startsWith('bottom')) {
      top = triggerRect.bottom + 9;
    } else if(placement.startsWith('top')) {
      top = triggerRect.top - popRect.height - 9;
    }

    // 底部居中显示
    if(placement.endsWith('center')) {
      left = halfCeil(triggerRect.width) + triggerRect.left - halfCeil(popRect.width)
      // 当前不能完整显示时，强制居右
      if(left < popRect.width) {
        placement = placement.startsWith('bottom') ? 'bottom-left' : 'top-left'
      }
    }
    // 底部居左显示
    if(placement.endsWith('left')) {
      // -24 - 6 修正箭头位置 trigger: {left: 24px; border-width: 6px}
      left = triggerRect.left + Math.ceil(triggerRect.width / 2) - 24 - 6
    }
    // 底部居右显示
    if(placement.endsWith('right')) {
      left = -(popRect.width - triggerRect.left) + Math.ceil(triggerRect.width / 2) + 24 + 6
    }
  })
</script>

{#if visible}
  <div
    transition:fade
    bind:this={popupElement}
    use:clickoutside={{ callback }}
    class="ui-popup {className}"
    style:--left="{left}px"
    style:--top="{top}px"
    {style}
    class:fab-popup--topl={placement === 'top-left'}
    class:fab-popup--top={placement === 'top-center'}
    class:fab-popup--topr={placement === 'top-right'}
    class:fab-popup--bottoml={placement === 'bottom-left'}
    class:fab-popup--bottom={placement === 'bottom-center'}
    class:fab-popup--bottomr={placement === 'bottom-right'}>
      {#if arrow}
        <i class="arrow"></i>
      {/if}
      {@render children()}
  </div>
{/if}

<style lang="scss">
  .ui-popup {
    position: absolute;
    top: var(--top);
    left: var(--left);
    padding: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px #afafaf;
    border-radius: 4px;
    max-width: 320px;
    z-index: 9999;
    :global(.fab-button) {
      margin-top: 7px;
    }

    .arrow {
      content: "";
      border: 6px solid transparent;
      position: absolute;
    }
  }

  [class*="fab-popup--top"] {
    .arrow {
      border-bottom: 0;
      border-top-color: #fff;
    }
  }

  [class*="fab-popup--bottom"] {
    .arrow {
      border-top: 0;
      border-bottom-color: #fff;
    }
  }

  .fab-popup--topl {
    .arrow {
      bottom: -6px;
      left: 24px;
      margin-left: 0;
    }
  }
  .fab-popup--top {
    .arrow {
      bottom: -6px;
      left: 50%;
      margin-left: -6px;
    }
  }
  .fab-popup--topr {
    .arrow {
      bottom: -6px;
      right: 24px;
      margin-left: 0;
    }
  }

  // .fab-popup--bottom,
  // .fab-popup--bottoml,
  // .fab-popup--bottomr {
  //   .arrow {
  //     border-top: 0;
  //     border-bottom-width: 6px;
  //     border-bottom-color: var(--white);
  //   }
  // }

  .fab-popup--bottoml {
    .arrow {
      top: -6px;
      left: 24px;
      margin-left: 0;
    }
  }
  .fab-popup--bottom {
    .arrow {
      top: -6px;
      left: 50%;
      margin-left: -6px;
    }
  }
  .fab-popup--bottomr {
    .arrow {
      top: -6px;
      right: 24px;
      margin-left: 0;
    }
  }
</style>