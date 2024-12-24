<script lang="ts">
	import Popper from "$components/ui/popper.svelte";

  let {
    name = '',
    value = $bindable(),
    placeholder = '',
    style = '',
    onchange,
  }: Omit<ui.SelectProps, 'options'> = $props()

  let visible = $state(false)
  let current = $state<ui.SelectOption>({})
  
  const options = [
    {value: '', label: '无色 / None'},
    {value: '#f5222d', label: '薄暮 / Dust Red'},
    {value: '#fa541c', label: '火山 / Volcano'},
    {value: '#fa8c16', label: '日暮 / Sunset Orange'},
    {value: '#faad14', label: '金盏花 / Calendula Gold'},
    {value: '#fadb14', label: '日出 / Sunrise Yellow'},
    {value: '#a0d911', label: '青柠 / Lime'},
    {value: '#52c41a', label: '极光绿 / Polar Green'},
    {value: '#13c2c2', label: '明青 / Cyan'},
    {value: '#1677ff', label: '拂晓蓝 / Daybreak Blue'},
    {value: '#2f54eb', label: '极客蓝 / Geek Blue'},
    {value: '#722ed1', label: '酱紫 / Golden Purple'},
    {value: '#eb2f96', label: '法式洋红 / Magenta'},
  ]

  const toggle = ()=> {
    visible = !visible
  }

  const onSelect = (option: ui.SelectOption)=> {
    visible = false
    current = option
    value = option.value
    onchange && onchange(option.value, option)
  }

  $effect(()=> {
    if ('' !== value || typeof value !== 'undefined') {
      current = options.find(option=> option.value === value) || {}
    }
  })
</script>

<div class="ui-select" {style}>
  <div class="trigger">
    <input data-popper-trigger bind:value={current.label} onclick={toggle} type="text" readonly {placeholder}/>
    <span class:none={current.value === ''} style:--color={current.value as string}></span>
  </div>
  {#if name.length > 0}
  <input bind:value={value} type="hidden" {name}/>
  {/if}
  <Popper bind:visible={visible} full>
    <ul class="content">
      {#each options as o}
      <li>
        <button onclick={()=> onSelect(o)} type="button" style:--color={o.value} class:none={o.value === ''} class:active={value === o.value}>{o.label}</button>
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
      position: relative;

      input {
        width: 100%;
        padding: 0 16px 0 36px;
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

      span {
        content: "";
        width: 18px;
        height: 18px;
        background-color: var(--color);
        position: absolute;
        left: 11px;
        top: 11px;

        &.none {
          &::before {
            content: "";
            width: 18px;
            height: 18px;
          }
          &::after {
            top: 1px;
            left: 1px;
          }
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
          padding: 0 12px 0 30px;
          border-radius: 3px;
          background-color: transparent;
          position: relative;

          &::before {
            content: "";
            width: 18px;
            height: 18px;
            background-color: var(--color);
            position: absolute;
            left: 7px;
            top: 7px;
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

    .none {
      &::before {
        border: 1px solid #42576c;
        box-sizing: border-box;
        display: inline-block;
      }
      &::after {
        content: "";
        width: 22px;
        height: 0;
        border-top: 1px solid #42576c;
        transform: rotate(45deg);
        transform-origin: 0;
        position: absolute;
        top: 8px;
        left: 8px;
      }
    }
  }
</style>
