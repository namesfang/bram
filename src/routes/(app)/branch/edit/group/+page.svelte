<script lang="ts">
	import Alert from "$components/ui/alert.svelte";
	import Block from "$components/ui/block.svelte";
	import Button from "$components/ui/button.svelte";
	import ColorSelect from "$components/ui/color-select.svelte";
	import Container from "$components/ui/container.svelte";
	import InputNumber from "$components/ui/input-number.svelte";
	import Input from "$components/ui/input.svelte";
	import Textarea from "$components/ui/textarea.svelte";

  let { form, data } = $props()

  let oNumber = Number(form?.data.orderNumber) || 0

  let name = $state(form?.data.name || data?.tile.name || '')
  let color = $state(form?.data.color || data.tile.color || '')
  let orderNumber = $state(oNumber || data.tile.orderNumber || 99)
  let description = $state(form?.data.description || data.tile.description || '')
</script>

<Container title="修改分组信息" padding>
  <form method="POST" class="form">
    <ul>
      <li data-label="分组名称">
        <Input bind:value={name} type="text" name="name" maxlength={30} placeholder="分组名称 30个字以内"/>
      </li>
      <li data-label="分组排序">
        <InputNumber bind:value={orderNumber} name="orderNumber" min={1} max={200} placeholder="序号越小越靠前"/>
      </li>
      <li data-label="分组颜色">
        <ColorSelect bind:value={color} name="color" placeholder="请选择"/>
      </li>
      <li data-label="分组描述">
        <Textarea bind:value={description} name="description" maxlength={240} placeholder="分组描述 240个字以内"></Textarea>
      </li>
    </ul>
    <Alert content={form?.error}/>
    <Block>
      <Button color="primary" submit>保存</Button>
    </Block>
  </form>
</Container>

<style lang="scss">
  @use '$assets/scss/form.scss';
</style>