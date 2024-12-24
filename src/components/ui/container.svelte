<script lang="ts">
	import { isString } from "radash";

  let {
    title,
    description,
    width = '100%',
    padding = false,
    children,
  }: ui.ContainerProps = $props()

  let style = $derived.by(()=> {
    if (isString(width)) {
      return `width: ${width};`
    }
    return `width: ${width}px;`
  })
</script>

<div class="ui-container" class:padding {style}>
  <div class="head">
    <h2>{title}</h2>
    {#if description}
    <p>{description}</p>
    {/if}
  </div>
  <div class="body">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .ui-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .head {
      margin-bottom: 28px;
      h2 {
        height: 36px;
        line-height: 36px;
        font-size: 28px;
        font-weight: normal;
        color: var(--text-color);
      }
      p {
        line-height: 24px;
        font-size: 14px;
        font-weight: normal;
        color: var(--text-2-color);
        margin-top: 8px;
      }
    }

    .body {
      flex: 1;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
    }
  }
  .padding {
    padding: 18px;
    box-sizing: border-box;
  }
</style>