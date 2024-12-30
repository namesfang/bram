<script lang="ts">
	import Button from "$components/ui/button.svelte";
	import Empty from "$components/ui/empty.svelte";
	import Icon from "$components/ui/icon.svelte";
	import Divider from "$components/ui/divider.svelte";

	import { getMessageContext } from "$components/ui/message";
	import { Fetch } from "$lib/fetch";
	import { onMount, setContext } from "svelte";
	import Overlay from "$components/ui/overlay.svelte";
	import { browser } from "$app/environment";
	import { sortable } from "$components/ui/actions/sortable.js";

  let { data, children } = $props()

  const message = getMessageContext()

  

  const remove = async (id: number)=> {
    const ok = await message.confirm('确定删除所选分组及分组下的所有分支？')
    
    if (ok) {
      const f = new Fetch()
      
      const { ok, message: msg } = await f.post('/branch/remove/group', { id })
      
      if (ok) {
        message.alert('删除成功', ()=> window.location.reload())
      } else {
        message.alert(msg)
      }
    }
  }

  let keyword = $state(data.keyword || '')
  let visible = $state(false)

  const toggle = ()=> {
    if ('' === data.keyword) {
      keyword = ''
    }
    visible = !visible
  }

  setContext('branch', {
    toggle,
  })

  let tilesElement = $state<HTMLUListElement>()

  onMount(()=> {})

</script>

<div class="flex-container">
  <div class="tiles-container" class:full={data.tiles.length === 0}>
    {#if data.tiles.length > 0}
      <div class="bar">
        <div class="wt">
          <Button href="/branch/create" size="small" color="primary" icon="add" shape="circle" block>新增分支</Button>
        </div>
        <div class="et">
          <Button onclick={toggle} size="small"  icon="search" shape="circle" block></Button>
        </div>
      </div>
    {/if}
    <div class="header">分组列表</div>
    <div class="list">
      {#if data.tiles.length > 0}
        <ul bind:this={tilesElement}>
          {#each data.tiles as item}
            <li
              use:sortable
              style:--background={item.color || '#2f54eb'}
              style:--border-color={item.color}
              class:active={data.pathname === `/branch/${item.id}`}>
              <a href={`/branch/${item.id}`}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </a>
              <div class="footer">
                <div class="wt">
                  <span>共{item._count.branchs}个分支</span>
                </div>
                <div class="et">
                  <Button href={`/branch/create?id=${item.id}`} size="tiny">添加</Button>
                  <Button href={`/branch/edit/group?id=${item.id}`} color="primary" size="tiny">编辑</Button>
                  <Button onclick={()=> remove(item.id)} color="danger" size="tiny">删除</Button>
                </div>
              </div>
            </li>
          {/each}
        </ul>
        {#if data.tiles.length > 6}
        <Divider>共{data.tiles.length}个分组</Divider>
        {/if}
      {:else}
        {#if data.keyword.length > 0 && data.pathname === '/branch'}
          <Empty description={`未找到相关“${data.keyword}”分组信息`}>
            <Button href={data.pathname} link size="small">清空搜索</Button>
            <Button onclick={()=> visible = true} link size="small" color="primary">重新搜索</Button>
          </Empty>
        {:else}
          <Empty description="您还没创建任何分组">
            <Button size="small" color="primary" href="/branch/create/group">创建分组</Button>
          </Empty>
        {/if}
      {/if}
    </div>
  </div>
  {#if data.tiles.length > 0}
    <div class="branch-container">
      {@render children?.()}
    </div>
  {/if}
</div>

<Overlay bind:visible={visible} maskClosable alignItems="flex-start">
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <form onsubmit={()=> (visible = false) } onclick={(e)=> e.stopPropagation()} class="finder">
    <Icon name="search" size="large"/>
    <input bind:value={keyword} name="keyword" autocomplete="off" placeholder="搜索分组名称/说明 | 分支名称/备注" />
    {#if keyword.length > 0}
      <Button onclick={()=> keyword= ''} link icon="close" size="small" shape="circle"></Button>
    {/if}
  </form>
</Overlay>

<style lang="scss">
  .finder {
    width: 480px;
    height: 52px;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    margin-top: 20%;
    position: relative;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05);

    input {
      flex: 1;
      background-color: transparent;
      border: none;
      padding: 0;
      outline: none;
    }

    :global(i) {
      width: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :global(button) {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }

  .flex-container {
    height: 100%;
    display: flex;
    background-image: linear-gradient(180deg,#eeedfd,#fff 25%,#fff 60%);
    .tiles-container {
      width: 300px;
      height: auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 12px 0 12px;
      background-color: #fff;
      border-right: 1px solid rgba(237,239,245,.45);

      .bar {
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;

        .wt {
          flex: 1;
          margin-right: 8px;
        }
        .et {
          width: 32px;
        }
      }

      .header {
        padding: 0 16px;
        margin-bottom: 12px;
        font: {
          size: 14px;
          weight: bold;
        }
        color: var(--text-color);
      }

      .list {
        flex: 1;
        flex-shrink: 0;
        overflow: hidden;
        overflow-y: scroll;
        padding: 0 16px;
        position: relative;

        &::-webkit-scrollbar {
          width: 4px;
          &::-webkit-scrollbar-thumb {
            background-color: transparent;
          }
        }

        &:hover {
          &::-webkit-scrollbar {
            &::-webkit-scrollbar-thumb {
              background-color: #c6c4ff;
            }
          }
        }
      }

      ul {
        height: auto;
        overflow: hidden;
        // 保持固定高度
        // grid-auto-rows: 120px;

        li {
          height: auto;
          position: relative;
          overflow: hidden;
          margin-bottom: 12px;
          border-radius: 8px;
          padding: 12px;
          background-color: #f3f2ff;
          border: 2px solid var(--border-color);

          &:hover {
            .footer {
              .et {
                display: inline-flex;
              }
            }
          }

          a {
            h2 {
              font-size: 14px;
              color: var(--text-color);
            }

            p {
              flex-shrink: 0;
              line-height: 20px;
              font-size: 12px;
              color: var(--text-2-color);
              margin-top: 4px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              line-clamp: 3;
              text-overflow: ellipsis;
              overflow: hidden;
              &:empty {
                display: none;
              }
            }
          }

          .footer {
            height: 26px;
            justify-content: space-between;
            justify-items: center;
            display: flex;
            margin-top: 12px;
            .wt {
              line-height: 26px;
              font-size: 12px;
              color: var(--text-2-color);
            }
            .et {
              display: none;
              justify-content: flex-end;
            }
          }

          &.active {
            border-top: 0;
            background-color: var(--background);
            a {
              h2 {
                color: #fff;
              }
              p {
                color: #f3f2ff;
              }
            }
            .footer {
              .wt {
                color: #f3f2ff;
              }
            }
          }
        }
      }
    }

    .full {
      width: 100%;
    }

    .branch-container {
      flex: 1;
      flex-shrink: 0;
      padding: 18px;
      overflow: hidden;
      overflow-y: auto;
    }
  }

</style>