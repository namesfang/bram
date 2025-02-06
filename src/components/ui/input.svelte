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

<div class={`ui-input--wrapper ${size} ${className}`}>
  <input bind:value={value} class:filled {type} autocomplete={autocomplete ? 'on' : 'off'} {...rest}/>
</div>

<style lang="scss">
  .ui-input--wrapper {
    
    --ui-input-primary: #1083fe;
    --ui-input-secondary: #42576c;
    --ui-input-secondary-50: #f1f3f5;
    --ui-input-secondary-100: #d4dbe2;
    
    width: 100%;
    position: relative;
    display: flex;
  }

  input {
    flex: 1;
    width: 100%;
    font-size: 14px;
    color: var(--ui-input-secondary);
    border-radius: var(--border-radius);
    border: 2px solid var(--ui-input-secondary-50);
    box-sizing: border-box;
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
    --border-radius: 8px;
    input {
      height: 46px;
      padding: 6px 16px;
    }
  }

  .medium {
    --border-radius: 5px;
    input {
      height: 40px;
      padding: 8px 12px;
    }
  }

  .small {
    --border-radius: 5px;
    input {
      height: 32px;
      padding: 6px 8px;
    }
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