<script lang="ts">
  let {
    value = $bindable(),
    type = 'text',
    size = 'medium',
    filled = false,
    autocomplete = false,
    class: className = '',
    ...rest
  }: ui.InputProps = $props()
</script>

<input bind:value={value} class={`ui-input ${size} ${className}`} class:filled {type} autocomplete={autocomplete ? 'on' : 'off'} {...rest}/>

<style lang="scss">
  .ui-input {

    --ui-input-primary: #1083fe;
    --ui-input-secondary: #42576c;
    --ui-input-secondary-50: #f1f3f5;
    --ui-input-secondary-100: #d4dbe2;

    width: 100%;
    font-size: 14px;
    color: var(--ui-input-secondary);
    border-radius: 5px;
    border: 2px solid var(--ui-input-secondary-50);
    padding: 8px 18px;
    box-sizing: border-box;
    height: 40px;
    background-color: #fff;
    outline: none;
    &:hover {
      border-color: var(--ui-input-secondary-100);
    }
    &:focus {
      border-color: var(--ui-input-primary);
    }
  }

  .large {
    height: 46px;
    padding: 6px 12px;
  }

  .small {
    height: 32px;
    padding: 6px 12px;
  }

  .filled {
    border: 0;
    background-color: var(--ui-input-secondary-50);
    &:hover {
      outline: 2px solid var(--ui-input-secondary-100);
    }
    &:focus {
      outline: 2px solid var(--ui-input-primary);
    }
  }
</style>