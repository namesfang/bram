<script lang="ts">
  let { title, content, color ='danger', children }: ui.AlertProps = $props()
</script>

<div class={`ui-alert ${color}`}>
  {#if title}
    <h2>{title}</h2>
  {/if}
  {#if children}
    <p>{@render children()}</p>
  {:else}
    <p>{content}</p>
  {/if}
</div>

<style lang="scss">
.ui-alert {
  color: #fff;
  line-height: 40px;
  font-size: 14px;
  border-radius: 5px;
  padding: 0 18px;
}

.danger {
  background-color: var(--danger-color);
}

.primary {
  background-color: var(--primary-color);
}
</style>