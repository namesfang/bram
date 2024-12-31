<script lang="ts">
  interface ArrowProps {
    size?: ui.Sizes
    fill?: boolean
    toward?: 'up' | 'down' | 'left' | 'right'
  }
  let {
    fill = true,
    size = 'medium',
    toward = 'down',
  }: ArrowProps = $props()
</script>

<svg class={`${toward} ${size}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  {#if fill}
    <path d="M12 16L6 10H18L12 16Z"></path>
  {:else}
    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
  {/if}
</svg>

<style lang="scss">
  svg {
    width: var(--width);
    font-style: normal;
    display: inline-flex;

    &::before {
      content: "";
      border: 5px solid transparent;
      position: absolute;
      left: 50%;
      margin-left: -25%;
      display: inline-block;
    }
    &.up {
      transform: rotate(-180deg);
    }
    &.down {
      
    }

    &.left {
      transform: rotate(90deg);
      
    }
    &.right {
      transform: rotate(-90deg);
    }

    &.large {
      width: 24px;
    }

    &.medium {
      width: 16px;
    }

    &.small {
      width: 12px;
    }
  }
</style>