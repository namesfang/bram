<script lang="ts">
	import Popper from "$components/ui/popper.svelte";
  import { options } from "$components/ui/city-select";

  let {
    name = '',
    value = $bindable(),
    placeholder = '',
    style = '',
    onchange,
  } = $props()

  let visible = $state(false)
  let current = $state<[string, number]>(['', 0])

  const toggle = ()=> {
    visible = !visible
  }

  const onSelect = (option: [string, number])=> {
    visible = false
    current = option
    value = option[1]
    onchange && onchange(option[1], option)
  }

  $effect(()=> {
    if ('' !== value || typeof value !== 'undefined') {
      current = options.find((o)=> o[1] === value) || ['', 0]
    }
  })
</script>

<div class="ui-select" {style}>
  <div class="trigger">
    <input data-popper-trigger bind:value={current[0]} onclick={toggle} type="text" readonly {placeholder}/>
  </div>
  {#if name.length > 0}
  <input bind:value={value} type="hidden" {name}/>
  {/if}
  <Popper bind:visible={visible} full>
    <ul class="content">
      {#each options as o}
      <li>
        <button onclick={()=> onSelect(o)} type="button" class:active={value === o[1]}>{o[0]}</button>
      </li>
      {/each}
    </ul>
  </Popper>
</div>

<style lang="scss">
  .ui-select {
    width: 100%;
    height: 40px;

    --ui-select-primary: #1083fe;
    --ui-select-secondary: #42576c;
    --ui-select-secondary-50: #f1f3f5;
    --ui-select-secondary-100: #d4dbe2;
    
    .trigger {
      width: 100%;
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
          text-align: left;
          color: var(--ui-select-secondary);
          border: 0;
          padding: 0 12px;
          border-radius: 3px;
          background-color: transparent;
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
