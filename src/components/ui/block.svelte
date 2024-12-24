<script lang="ts">
  let {
    class: className = '',
    style = '',
    between = false,
    children
  }: ui.BlockProps = $props()
</script>

<div class={`ui-block ${className}`} class:between {style}>
  {@render children?.()}
</div>

<style lang="scss">
  .ui-block {
    margin-top: 18px;
  }

  .end, .between {
    display: flex;
    align-items: center;
  }
  .end {
    justify-content: flex-end;
  }
  .between {
    justify-content: space-between;
  }
</style>
