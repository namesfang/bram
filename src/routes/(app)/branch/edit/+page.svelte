<script lang="ts">
	import Alert from "$components/ui/alert.svelte";
	import Block from "$components/ui/block.svelte";
	import Button from "$components/ui/button.svelte";
	import DatePicker from "$components/ui/date-picker.svelte";
	import Input from "$components/ui/input.svelte";
	import Select from "$components/ui/select.svelte";
	import Textarea from "$components/ui/textarea.svelte";
	import BranchName from "$components/branch-name.svelte";
	import ColorSelect from "$components/ui/color-select.svelte";
	import Container from "$components/ui/container.svelte";
	import Datetime from "$lib/locale/datetime";
	import InputNumber from "$components/ui/input-number.svelte";

  let { form, data } = $props()

  let oNumber = Number(form?.data.orderNumber) || 0

  let tileId = $state(form?.data.tileId || data.branch.tileId || '')
  let name = $state(form?.data.name || data.branch.name || '')
  let orderNumber = $state(oNumber || data.branch.orderNumber || 99)
  let releaseAt = $state(form?.data.releaseAt || Datetime.formatdOrNil(data.branch.releaseAt))
  let status = $state(form?.data.status || `${data.branch.status}` || '')
  let color = $state(form?.data.color || data.branch.color || '')
  let vendorId = $state(form?.data.vendorId || data.branch.vendorId || '')
  let remark = $state(form?.data.remark || data.branch.remark || '')
</script>

<Container title="修改分支信息" padding>
  <form method="POST" class="form">
    <ul>
      <li data-label="所属分组">
        <Select bind:value={tileId} options={data.tiles} fieldNames={{label: 'name', value: 'id'}} name="tileId" align="left" placeholder="请选择"></Select>
      </li>
      <li data-label="分支名称">
        <BranchName bind:value={name}/>
      </li>
      <li data-label="预计上线日期">
        <DatePicker bind:value={releaseAt} name="releaseAt"/>
      </li>
      <li data-label="分支排序">
        <InputNumber bind:value={orderNumber} name="orderNumber" min={1} max={200} placeholder="序号越小越靠前"/>
      </li>
      <li data-label="分支颜色">
        <ColorSelect bind:value={color} name="color" placeholder="请选择"/>
      </li>
      <li data-label="分支状态">
        <Select bind:value={status} options={data.statusOptions} align="left" name="status" placeholder="请选择"></Select>
      </li>
      <li data-label="三方ID">
        <Input bind:value={vendorId} type="text" name="vendorId" placeholder="来自项目管理系统的三方ID"/>
      </li>
      <li data-label="分支说明">
        <Textarea bind:value={remark} name="remark" placeholder="说明 240个字以内"></Textarea>
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