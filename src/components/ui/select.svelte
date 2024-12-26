<script lang="ts">
	import Popper from "$components/ui/popper.svelte";

  let {
    name = '',
    value = $bindable(),
    placeholder = '',
    style = '',
    align = 'center',
    options = [],
    fieldNames = {label: 'label', value: 'value'},
    onchange,
  }: ui.SelectProps = $props()

  let visible = $state(false)
  let current = $state<ui.SelectOption>({})

  const toggle = ()=> {
    visible = !visible
  }

  const onSelect = (option: ui.SelectOption)=> {
    visible = false
    current = option
    value = option[fieldNames.value]
    onchange && onchange(option[fieldNames.value], option)
  }

  $effect(()=> {
    if ('' !== value || typeof value !== 'undefined') {
      current = options.find(option=> option[fieldNames.value] === value) || {}
    }
  })
</script>

<div class="ui-select" {style}>
  <div class="trigger" class:expand={visible}>
    <input data-popper-trigger bind:value={current[fieldNames.label]} onclick={toggle} type="text" readonly {placeholder}/>
  </div>
  {#if name.length > 0}
  <input bind:value={value} type="hidden" {name}/>
  {/if}
  <Popper bind:visible={visible} full>
    <ul class="content">
      {#each options as option}
      <li>
        <button onclick={()=> onSelect(option)} type="button" class:active={value === option[fieldNames.value]} class={`align-${align}`}>{option[fieldNames.label]}</button>
      </li>
      {/each}
    </ul>
  </Popper>
</div>

<style lang="scss">
  .ui-select {
    width: 100%;
    height: 40px;
    position: relative;

    --ui-select-primary: #1083fe;
    --ui-select-secondary: #42576c;
    --ui-select-secondary-50: #f1f3f5;
    --ui-select-secondary-100: #d4dbe2;
    
    .trigger {
      width: 100%;
      position: relative;

      &::after {
        content: "";
        border: 5px solid transparent;
        border-top-color: var(--ui-select-secondary);
        position: absolute;
        right: 16px;
        top: 18px;
        transform: rotate(0deg);
        transition-duration: 200ms;
      }

      &.expand {
        &::after {
          top: 14px;
          transform: rotate(180deg);
          transition-duration: 200ms;
        }
      }

      input {
        width: 100%;
        padding: 0 16px;
        height: 40px;
        border-radius: 5px;
        box-sizing: border-box;
        outline: 0;
        border: 2px solid var(--ui-select-secondary-50);
        &:hover {
          border-color: var(--ui-select-secondary-100);
        }
        &:focus {
          border-color: var(--ui-select-primary);
        }
      }
    }

    .content {
      width: 100%;
      padding: 8px 5px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      li {
        button {
          width: 100%;
          height: 32px;
          font-size: 14px;
          color: var(--ui-select-secondary);
          border: 0;
          padding: 0 12px;
          border-radius: 3px;
          background-color: transparent;
          &.align-center {
            text-align: center;
          }
          &.align-left {
            text-align: left;
          }
          &.align-right {
            text-align: right;
          }
          &:hover {
            color: var(--hover-text-color, --ui-select-secondary);
            background-color: var(--hover-background-color, --ui-select-secondary-50);
          }
        }

        .active {
          color: #fff;
          background-color: var(--ui-select-primary);
        }
      }
    }
  }
</style>
