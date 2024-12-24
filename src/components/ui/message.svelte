<script lang="ts">
	import Modal from "$components/ui/modal.svelte";
	import Icon from "$components/ui/icon.svelte";

  let {
    title,
    content,
    icon = 'error-warning',
    confirm = true,
    visible = $bindable(false),
    onCancel,
    onConfirm,
  }: ui.MessageProps = $props()
</script>

<Modal
  {title}
  bind:visible={visible}
  oncommand={({props})=> {
    if (props.key === 'confirm') {
      onConfirm?.()
    } else {
      onCancel?.()
    }
  }}
  cancelButtonProps={{key: 'cancel', enabled: confirm}}
  confirmButtonProps={{key: 'confirm', textContent: confirm ? '确定': '知道了'}}>
  <p class="ui-message">{content}</p>
</Modal>

<style lang="scss">
  .ui-message {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
  }
</style>