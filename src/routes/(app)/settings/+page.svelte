<script lang="ts">
	import Switch from '$components/ui/switch.svelte';
	import Select from '$components/ui/select.svelte';
	import Button from '$components/ui/button.svelte';
	import { getMessageContext } from '$components/ui/message';
	import { Fetch } from '$lib/fetch';

  const messager = getMessageContext()

  let options = [
    {label: '列表之前', value: 0},
    {label: '列表之后', value: 1},
    {label: '前后都有', value: 2},
  ]

  let { data } = $props()

  let collapsePublished = $state<0 | 1>(data.user.configuration.branch.collapsePublished)
  let createPosition = $state(data.user.configuration.branch.createPosition)

  const modify = async (name: string, value: number)=> {
    const f = new Fetch()
    const { ok, message } = await f.post('settings/modify', { name, value })
    if (!ok) {
      messager.alert(message)
    }
  }
</script>

<div class="wrapper">
  <ul>
    <li>
      <span>账号</span>
      <span>{data.user?.name}(第{data.count}位注册用户)</span>
    </li>
    <!-- <li>
      <span>昵称</span>
      <span>{data.user?.nick}</span>
    </li> -->
    <li>
      <span>管理员</span>
      <span>{data.user?.isAdm?'是':'否'}</span>
    </li>
  </ul>
  <ul>
    <li>
      <span>已发版分支自动折叠</span>
      <Switch bind:value={collapsePublished} customValues={[1, 0]} onchange={(value)=> modify('collapsePublished', value as number)} size="large"/>
    </li>
    <li>
      <span>新增分支按钮显示位置</span>
      <div class="select">
        <Select bind:value={createPosition} {options} onchange={(value)=> modify('createPosition', value as number)} />
      </div>
    </li>
  </ul>
  <Button href="/logout" color="danger" block>退出</Button>
</div>

<style lang="scss">
  .wrapper {
    width: 480px;
    margin: 0 auto;
    ul {
      margin-bottom: 50px;
      background-color: var(--background-color);
      border-radius: 4px;
      padding: 12px;

      li {
        padding: 8px 0;
        margin-bottom: 8px;
        border-bottom: 1px solid var(--hover-background-color);
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:last-child {
          border-bottom: 0;
          margin-bottom: 0;
        }

        span {
          font-size: 14px;
          &:first-child {
            color: var(--text-color);
          }
          &:last-child {
            color: var(--text-color);
          }
        }
        .select {
          width: 120px;
        }
      }
    }
  }
</style>
