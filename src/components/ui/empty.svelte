<script lang="ts">
	import Icon from '$components/ui/icon.svelte';

	let {children, description}:ui.EmptyProps = $props();
</script>

<div class="ui-empty">
	<div class="image">
    <Icon name='svelte'/>
  </div>
	<p class="description">{description || '暂无数据'}</p>
  {#if children}
    <footer>
      {@render children?.()}
    </footer>
  {/if}
</div>

<style lang="scss">
  .ui-empty {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .image {
      :global(i) {
        font-size: 86px;
        color: #e9f0f8;
      }
    }
   
    .description {
      font-size: 14px;
      line-height: 24px;
      color: #a2b0be;
      margin: 12px 0;
    }
  }
</style>
