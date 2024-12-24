<script lang="ts">
	import type { Snippet } from "svelte";

  interface DividerProps {
    label?: string;
    orientation?: 'left' | 'center' | 'right' | number
    children?: Snippet
  }

  let { label = '', orientation = 'center', children }: DividerProps = $props()
</script>
<div class={`ui-divider ${orientation}`}>
  <span>
    {#if children}
      {@render children()}
    {:else}
      {label}
    {/if}
  </span>
</div>

<style lang="scss">
.ui-divider {
  position: relative;
  margin: 10px 0;
  display: flex;
  justify-content: center;

  --ui-divider-text-color: #42576c;
  --ui-divider-background-color: #f8fbff;
  --ui-divider-color: #ededed;

  &::before {
    content: "";
    border-top-width: 1px;
    border-top-style: solid;
    border-top: 1px solid var(--ui-divider-color);
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
  }

  span {
    line-height: 1rem;
    font-size: 12px;
    color: var(--ui-divider-text-color);
    padding: 4px 8px;
    background-color: var(--ui-divider-background-color);
    border-radius: 3px;
    z-index: 1;
    &:empty {
      display: none;
    }
  }
}

.left {
  padding-left: 5%;
  justify-content: flex-start;
}

.right {
  padding-right: 5%;
  justify-content: flex-end;
}
</style>