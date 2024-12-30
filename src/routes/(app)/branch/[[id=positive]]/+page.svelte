<script lang="ts">
	import { browser } from "$app/environment";
	import Button from "$components/ui/button.svelte";
	import Container from "$components/ui/container.svelte";
	import Empty from "$components/ui/empty.svelte";
	import Icon from "$components/ui/icon.svelte";
  import { getMessageContext } from "$components/ui/message";
	import Modal from "$components/ui/modal.svelte";
	import { Fetch } from "$lib/fetch";
	import Datetime from "$lib/locale/datetime.js";
	import type { Branch } from "@prisma/client";
	import dayjs from "dayjs";
	import { getContext } from "svelte";

  let { data } = $props()

  const message = getMessageContext()

  const branchContext = getContext<{toggle: ()=> void}>('branch')

  const remove = async (id: number)=> {
    const ok = await message.confirm('删除所选分支，删除后无法恢复？')
    
    if (ok) {
      const f = new Fetch()
      
      const { ok, message: msg } = await f.post('/branch/remove', { id })
      
      if (ok) {
        message.alert('删除成功', ()=> window.location.reload())
      } else {
        message.alert(msg)
      }
    }
  }

  let visible = $state(false)
  let currentStatus = $state('')
  let current = $state<Branch>()

  const openModal = (item: Branch) => {
    visible = true
    current = item
    currentStatus = String(item.status)
  }
  const onChangeStatus = async (detail: ui.ModalButtonDetail)=> {
    if('confirm' === detail.props.key && current) {

      if (currentStatus === String(current.status)) {
        message.alert('状态未变更')
        return
      }

      const f = new Fetch()
      const { ok, message: msg } = await f.post('/branch/change/status', {
        id: current.id,
        status: currentStatus
      })
      if (ok) {
        message.alert('状态变更成功', ()=> window.location.reload())
      } else {
        message.alert(msg)
      }
    }
  }

  const today = dayjs(dayjs().format('YYYY-MM-DD'))

  const diff = (compare: Date | null, status: number): [string, string]=> {
    if (!compare) {
      return ['', '']
    }

    const compareDate = dayjs(compare).format('YYYY-MM-DD')
    // 未发版状态提示到期时间
    if (status > 4) {
      return ['var(--primary-color)', compareDate]
    }

    const value = today.diff(dayjs(compare).format('YYYY-MM-DD'), 'day')
    if (value > 0) {
      return ['var(--danger-color)', `已过期${value}天(${compareDate})`]
    }

    const color = 'var(--primary-color)'
    if (value === 0) {
      return [color, `今天到期(${compareDate})`]
    }

    if (value === -1) {
      return [color, `明天到期(${compareDate})`]
    } else if (value === -2) {
      return [color, `后天到期(${compareDate})`]
    }
    return [color, `${Math.abs(value)}天后到期(${compareDate})`]
  }

  let copied = $state(false)
  const copy = async (item: Branch)=> {
    try {
      current = item
      copied = true
      await navigator.clipboard.writeText(item.name)
      setTimeout(() => {
        current = undefined
        copied = false
      }, 2000);
    } catch (error) {
      
    }
  }
</script>

{#snippet tag([className, textContent]: [string, string])}
  <span style:--color={className}>{textContent}</span>
{/snippet}

<Container title={data.tile?.name || ''} description={data.tile?.description}>
  {#if data.branchs.length > 0}  
    <ul class="branchs">
      {#if (0 === data.createPosition || (2 === data.createPosition && data.branchs.length > 8))}
        <li>
          <a href={`/branch/create?id=${data.tile?.id}`} class="button">
            <Icon name="add"/>
            <span>新增分支</span>
          </a>
        </li>
      {/if}
      {#each data.branchs as item}
        <li style:--color={item.color || '#e8e4ff'}>
          <div class="header">
            <div class="name">
              <span>{item.name}</span>
              <Button onclick={()=> copy(item)} icon={copied && current?.name === item.name ? 'check' : 'file-copy'} color={copied && current?.name === item.name ? 'success' : 'default'} size="tiny" shape="circle"></Button>
            </div>
            {#if item.publishedAt}
              <div class="published">{Datetime.formatOrNil(item.publishedAt)}</div>
            {/if}
          </div>
          <p>{item.remark}</p>
          <div class="footer">
            <div class="wt">
              {@render tag(diff(item.releaseAt, item.status))}
            </div>
            <div class="et">
              <Button onclick={()=> openModal(item)} size="small">{data.branchStatus[item.status]}</Button>
              <Button link href={`/branch/edit?id=${item.id}`} color="primary" size="small">编辑</Button>
              <Button onclick={()=> remove(item.id)} link color="danger" size="small">删除</Button>
            </div>
          </div>
          <span class={`tag tag-${item.status}`}>{data.branchStatus[item.status]}</span>
        </li>
      {/each}
      {#if data.published.length > 0}
      <li>
        <a href="?expand=1" class="button expand">
          <Icon name="more"/>
          <span>展开所有已发版分支</span>
        </a>
      </li>
      {/if}
      {#if [1,2].includes(data.createPosition)}
        <li>
          <a href={`/branch/create?id=${data.tile?.id}`} class="button">
            <Icon name="add"/>
            <span>新增分支</span>
          </a>
        </li>
      {/if}
    </ul>
  {:else}
    {#if data.tile}
      {#if data.keyword.length > 0}
        <Empty description={`未找到相关“${data.keyword}”分支信息`}>
          <Button href={data.pathname} link size="small">清空搜索</Button>
          <Button onclick={branchContext.toggle} link size="small" color="primary">重新搜索</Button>
        </Empty>
      {:else}
        <Empty description={`当前分组“${data.tile?.name}”暂未创建分支`}>
          <Button href={`/branch/create/?id=${data.tile?.id}`} size="small" color="primary">立即添加分支</Button>
        </Empty>
      {/if}
    {:else}
      <Empty description="请点击分组查看分支信息"></Empty>
    {/if}
  {/if}
</Container>

<Modal oncommand={onChangeStatus} bind:visible={visible} maskClosable title="变更状态">
  <ul class="status">
    {#each data.branchStatus.children as item}
      <li>
        <Button onclick={()=> currentStatus = item.value} block size="small" color={item.value === currentStatus ? 'primary' : 'default'}>{item.label}</Button>
      </li>
    {/each}
    </ul>
</Modal>

<style lang="scss">
  ul.branchs {
    min-height: 100px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-auto-rows: 168px;
    gap: 12px;
    padding-bottom: 12px;

    li {
      padding: 12px;
      border-radius: 5px;
      background-image: linear-gradient(-145deg, var(--color) -150%, #fff 50%);
      border: 1px solid #e8eaf2;
      position: relative;

      &:hover {
        .footer {
          .et {
            display: inline-flex;
          }
        }
      }

      .header {
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          height: 24px;
          display: flex;
          align-items: center;

          span {
            font: {
              size: 16px;
              weight: bold;
            };
            color: var(--text-color);
            display: flex;
            align-items: center;
            margin-right: 7px;
          }
        }

        .published {
          font-size: 12px;
          color: var(--text-2-color);
        }
      }

      p {
        height: 54px;
        line-height: 18px;
        font-size: 14px;
        color: var(--text-2-color);
        margin: 8px 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .footer {
        height: 32px;
        justify-content: space-between;
        justify-items: center;
        display: flex;
        .wt {
          line-height: 32px;
          font-size: 12px;
          span {
            color: var(--color);
          }
        }
        .et {
          display: none;
          justify-content: flex-end;
        }
      }

      .tag {
        height: 24px;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
        position: absolute;
        top: 3px;
        right: 3px;
        padding: 0 12px;
        background-color: rgba(0,0,0,.05);
        border-radius: 12px 24px 12px 24px;
        &.tag-2 {
          color: #fff;
          background-color: #007bff;
        }
        &.tag-5 {
          color: #fff;
          background-color: #f6da3c;
        }
        &.tag-8 {
          color: #fff;
          background-color: #27c76f;
        }
        &.tag-9 {
          color: #fff;
          background-color: #f63c67;
        }
      }

      .button {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          font-size: 14px;
        }
        :global(i) {
          font-size: 36px;
          color: var(--text-2-color);
        }
      }

      .expand {
        // 渐变淡蓝色
        background-image: radial-gradient(ellipse at center, #dbecff 0%, rgba(255,255,255, .05) 50%)
      }
    }
  }

  .status {
    width: 320px;
    display: flex;
    flex-direction: column;
    li {
      margin-bottom: 6px;
    }
  }
</style>