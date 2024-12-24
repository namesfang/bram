<script lang="ts">
	import Button from "$components/ui/button.svelte";
	import Popup from "$components/ui/popup.svelte";
	import Icon from "./icon.svelte";

  let {
    visible = $bindable(),
    triggerElement,
    content,
    onConfirm,
    onCancel
  }: ui.PopconfirmProps = $props()

  const cancelControl = ()=> {
    visible = false;
    onCancel && onCancel()
  }
  const confirmControl = ()=> {
    visible = false;
    onConfirm && onConfirm()
  }
</script>

<Popup arrow bind:visible triggerElement={triggerElement}>
  <div class="ui-popconfirm">
    <div class="body">
      <Icon name="error-warning" color="danger" size={20}/>
      <span>{content}</span>
    </div>
    <div class="footer">
      <Button onclick={ cancelControl } size="small">取消</Button>
      <Button onclick={ confirmControl } size="small" color="primary">确定</Button>
    </div>
  </div>
</Popup>

<style lang="scss">
  .ui-popconfirm {
    min-width: 200px;
    padding: 8px;
    .body {
      line-height: 20px;
      font-size: 14px;
      padding: 8px;
      display: flex;
      align-items: center;

      :global(i) {
        margin-right: 5px;
      }
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      :global(.fab-button) {
        margin-left: 8px;
      }
    }
  }
</style>