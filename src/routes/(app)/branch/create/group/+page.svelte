<script lang="ts">
	import Alert from "$components/ui/alert.svelte";
	import Block from "$components/ui/block.svelte";
	import Button from "$components/ui/button.svelte";
	import ColorSelect from "$components/ui/color-select.svelte";
	import InputNumber from "$components/ui/input-number.svelte";
	import Input from "$components/ui/input.svelte";
	import Textarea from "$components/ui/textarea.svelte";

  let { form } = $props()

  let name = $state(form?.data.name || '')
  let orderNumber = $state(99)
  let color = $state(form?.data.color || '')
  let description = $state(form?.data.description || '')
</script>

<div class="form">
  <form method="POST">
    <ul>
      <li data-label="分组名称">
        <Input bind:value={name} name="name" maxlength={30} placeholder="分组名称 30个字以内"/>
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
      <Button color="primary" submit>创建</Button>
      <Button submit name="continue">创建并继续</Button>
    </Block>
  </form>
</div>

<style lang="scss">
  @use '$assets/scss/form.scss';
</style>