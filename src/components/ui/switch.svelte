<script lang="ts">
	import { fade } from "svelte/transition";

  let {
    name = '',
    value = $bindable(),
    customValues = ['on', 'off'],
    customLabels = ['是', '否'],
    size = 'medium',
    color = 'primary',
    round = false,
    disabled = false,
    style = '',
    class: customClass = '',
    onchange,
  }: ui.SwitchProps = $props()

  let checked = $state(false)

  const toggle = ()=> {
    checked = !checked
    value = customValues[checked ? 0 : 1]
    onchange?.(value, checked)
  }
</script>

<button
  onclick={ toggle }
  {disabled}
  {style}
  style:--background-color={`var(--${color}-color)`}
  class:round={round}
  class:active={value === customValues[0]}
  class:tiny={size === 'tiny'}
  class:small={size === 'small'}
  class:medium={size === 'medium'}
  class:large={size === 'large'}
  class="ui-switch {customClass}">
  <span class="slide">
    <input type="checkbox" bind:checked={checked} {value} {name}/>
    {#if checked}
      <em in:fade class="label-checked">{customLabels[0]}</em>
    {/if}
    <i></i>
    {#if !checked}
      <em in:fade class="label">{customLabels[1]}</em>
    {/if}
  </span>
</button>

<style lang="scss">
  .ui-switch {
    --child-height: calc(var(--height) / 2);
    --child-padding: calc(var(--child-height) / 3);
    --child-margin: calc(var(--child-height) / 2);
    --child-width: calc(var(--height) + var(--child-padding));

    --disabled-color: #f1f3f5;
    --default-color: #d4dbe2;
    --active-color: #1083fe;

    display: inline-flex;
    align-items: center;
    padding: 0;
    border: 0;
    height: var(--height);
    background-color: transparent;

    &:active:not(:disabled) {
      .slide {
        i {
          width: calc(var(--child-height) + var(--child-padding));
        }
      }
    }

    .slide {
      min-width: var(--child-width);
      max-width: 200px;
      height: var(--child-height);
      padding: var(--child-padding);
      background-color: var(--default-color);
      border-radius: var(--child-height);
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;

      input[type="checkbox"] {
        position: absolute;
        inset: 0;
        margin: 0;
        border: 0;
        visibility: hidden;
      }

      i {
        width: var(--child-height);
        height: var(--child-height);
        border-radius: var(--child-height);
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 3px #eaeaea;
      }

      em {
        flex: 1;
        height: var(--child-height);
        line-height: var(--child-height);
        color: var(--text-color);
        font-size: var(--font-size);
        font-style: normal;
      }
      
      .label {
        margin-left: var(--child-padding);
      }

      .label-checked {
        margin-right: var(--child-padding);
      }
    }

    &.switch {
      margin-right: var(--child-height);
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .round {
    .slide {
      border-radius: var(--child-padding);
      i {
        border-radius: var(--child-padding);
      }
    }
  }

  .active {
    .slide {
      justify-content: flex-end;
      background-color: var(--active-color);
      em {
        color: #fff;
      }
    }
  }
  
  .tiny {
    --height: 20px;
    --font-size: 10px;
  }

  .small {
    --height: 26px;
    --font-size: 12px;
  }

  .medium {
    --height: 32px;
    --font-size: 14px;
  }

  .large {
    --height: 38px;
    --font-size: 14px;
  }
</style>