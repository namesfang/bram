<script lang="ts">
	import { isObject, isString } from "radash";

	import Icon from "$components/ui/icon.svelte";
	import Spin from "./spin.svelte";

  let {
    children,
    name = '',
    icon,
    submit = false,
    reset = false,
    link = false,
    block = false,
    shape = 'round',
    loading = $bindable(),
    size = 'medium',
    color = 'default',
    class: _className = '',
    style = '',
    href,
    popconfirm,
    buttonRef = $bindable(),
    onclick,
  }: ui.ButtonProps = $props()

  let visible = $state(false)

  const className = $derived.by(()=> {
    const pieces: string[] = ['ui-button', color, size]

    if (shape) {
      pieces.push(shape)
    }
    if (block) {
      pieces.push('block')
    }
    if(link) {
      pieces.push('link')
    }
    pieces.push(_className)

    if (!children && icon) {
      pieces.push('icon-only')
    }

    return pieces.join(' ')
  })

  const iconProps = $derived.by<ui.IconProps | null>(()=> {
    if (!icon) {
      return null
    }
    if (typeof icon === 'object') {
      return {size, ...icon}
    }
    return {size, name: icon as ui.Icons }
  })

  let tagName = $state(isString(href) ? 'a' : 'button')

  let restProps = $derived.by(()=> {
    // 链接专有属性
    if (isString(href)) {
      return {
        href,
        style
      }
    }
    if (isObject(popconfirm)) {
      return {
        type: 'button',
        style,
        onclick: ()=> {
          visible = !visible
        }
      }
    }
    // 按钮专有属性
    const type = submit ? 'submit' : (reset ? 'reset' : 'button')
    return {
      name,
      type,
      onclick,
      style,
    }
  })
</script>

<svelte:element
  bind:this={buttonRef}
  data-popper-trigger
  this={tagName}
  class={className}
  {...restProps}>
  <Spin spinning={loading} {color} size='tiny' style="margin-right: 4px"/>
  {#if iconProps}
    <Icon {...iconProps}/>
  {/if}
  {@render children?.()}
</svelte:element>

<style lang="scss">
  .ui-button {
    --ui-button-danger: #dc3545;
    --ui-button-primary: #007bff;
    --ui-button-warning: #ffc107;
    --ui-button-success: #28a745;
    --ui-button-secondary: #42576c;
    --ui-button-secondary-50: #f1f3f5;
    --ui-button-secondary-100: #d4dbe2;

    --height-half: calc(var(--height) / 2);
    --height-quarter: calc(var(--height) / 5);

    color: var(--ui-button-secondary);
    height: var(--height);
    border: 0;
    outline: none;
    position: relative;
    background-color: var(--ui-button-secondary-50);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover::after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.08);
    }

    &:active::after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }

    &.block {
      width: 100%;
      display: flex;
      box-sizing: border-box;
    }

    &.link {
      color: var(--ui-button-secondary);
      background-color: transparent;
    }

    &.round {
      border-radius: var(--height-quarter);
      &::after {
        border-radius: var(--height-quarter);
      }
    }

    &.circle {
      border-radius: var(--height-half);
      &::after {
        border-radius: var(--height-half);
      }
    }

    &.icon-only {
      width: var(--height);
      padding: 0;
    }
    
    :global(+ .ui-button) {
      margin-left: var(--height-half);
    }
  }

  .success {
    color: #fff;
    background-color: var(--ui-button-success);
    :global(i) {
      color: #fff;
    }
    &.link {
      color: var(--ui-button-success);
      background-color: transparent;
    }
  }

  .warning {
    color: #fff;
    background-color: var(--ui-button-warning);
    :global(i) {
      color: #fff;
    }
    &.link {
      color: var(--ui-button-warning);
      background-color: transparent;
    }
  }

  .primary {
    color: #fff;
    background-color: var(--ui-button-primary);
    :global(i) {
      color: #fff;
    }
    &.link {
      color: var(--ui-button-primary);
      background-color: transparent;
    }
  }

  .danger {
    color: #fff;
    background-color: var(--ui-button-danger);
    :global(i) {
      color: #fff;
    }

    &.link {
      color: var(--ui-button-danger);
      background-color: transparent;
    }
  }

  .large {
    --height: 46px;
    font-size: 16px;
    padding: 0 24px;
  }

  .medium {
    --height: 40px;
    font-size: 14px;
    padding: 0 18px;
  }

  .small {
    --height: 32px;
    font-size: 12px;
    padding: 0 12px;
  }

  .tiny {
    --height: 24px;
    font-size: 10px;
    padding: 0 8px;
  }

</style>