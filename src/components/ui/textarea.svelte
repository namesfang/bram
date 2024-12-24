<script lang="ts">
  let {
    value = $bindable(),
    filled = false,
    resize = 'none',
    rows = 3,
    autocomplete = false,
    class: className = '',
    ...rest
  }: ui.TextareaProps = $props()
</script>

<textarea bind:value={value} class={`ui-textarea resize-${resize} ${className}`} {rows} class:filled autocomplete={autocomplete ? 'on' : 'off'} {...rest}></textarea>

<style lang="scss">
  .ui-textarea {

    --ui-textarea-primary: #1083fe;
    --ui-textarea-secondary: #42576c;
    --ui-textarea-secondary-50: #f1f3f5;
    --ui-textarea-secondary-100: #d4dbe2;

    width: 100%;
    font-size: 14px;
    color: var(--ui-textarea-secondary);
    border-radius: 5px;
    border: 2px solid var(--ui-textarea-secondary-50);
    padding: 8px 18px;
    box-sizing: border-box;
    background-color: #fff;
    outline: none;
    &:hover {
      border-color: var(--ui-textarea-secondary-100);
    }
    &:focus {
      border-color: var(--ui-textarea-primary);
    }
  }

  .filled {
    border: 0;
    background-color: var(--ui-textarea-secondary-50);
    &:hover {
      outline: 2px solid var(--ui-textarea-secondary-100);
    }
    &:focus {
      outline: 2px solid var(--ui-textarea-primary);
    }
  }

  .resize-none {
    resize: none;
  }
  .resize-both {
    resize: both;
  }
  .resize-vertical {
    resize: vertical;
  }
  .resize-horizontal {
    resize: horizontal;
  }
</style>