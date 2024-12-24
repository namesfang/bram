<script lang="ts">
	import Button from "./button.svelte";

  let list: any[] = []

  let count = 10
  let keyword = ''
</script>

<div class="toolbar">
  <div class="buttons">
    <Button href="/user/users/create" color="primary" icon="add">新增</Button>
  </div>
  <form action="/user/users" class="finder">
    <input type="text" name="keyword" placeholder="账号" bind:value={keyword}/>
    <Button submit color="primary">搜索</Button>
  </form>
</div>

<table>
  <colgroup>
    <col width="50">
    <col width="auto">
    <col width="80">
    <col width="140">
    <col width="220">
  </colgroup>
  <thead>
    <tr>
      <th>#</th>
      <th align="left">账号</th>
      <th align="center">管理员</th>
      <th>注册时间</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    {#each list as t, index }
      <tr>
        <td align="right">{ index + 1 }</td>
        <td align="left">{ t.fullname }</td>
        <td align="center">{ t.adm ? '✅' : '' }</td>
        <td align="center">{ t.createdAt.toLocaleString() }</td>
        <td align="center" class="buttons">
          
        </td>
      </tr>
    {/each}
    {#if count === 0}
      <tr>
        <td align="center" colspan="4">暂无数据</td>
      </tr>
    {/if}
  </tbody>
</table>

<style lang="scss">
  .toolbar {
    height: 32px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    .buttons {
      display: flex;
      :global(a),
      :global(button) {
        margin-right: 10px;
      }
    }

    .finder {
      height: 32px;
      display: flex;

      input {
        width: 200px;
        height: 30px;
        padding: 0 20px;
        margin-right: 10px;
        border: 1px solid var(--gray-200);
        border-radius: 4px;
        &:focus {
          border-color: transparent;
          outline: 3px solid var(--primary-900);
        }
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-radius: 5px;
    box-shadow: 0 0 1px var(--gray-600);
    background-color: var(--white);
    thead {
      tr {
        margin: 0;
        padding: 0;
        th {
          line-height: 38px;
          font-size: 14px;
          border-radius: 5px 5px 0 0;
          padding: 0 8px;
          font-weight: bold;
          color: var(--gray-400);
          background-color: var(--gray-50);
        }
      }
    }
    tbody {
      tr {

        &:nth-child(even) {
          background-color: var(--gray-50);
        }

        &:hover {
          background-color: var(--gray-200);
        }

        td {
          height: 38px;
          font-size: 14px;
          padding: 0 8px;
          a {
            color: var(--gray-900);
          }
          &.buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            :global(a),
            :global(button) {
              margin-right: 10px;
              &:last-child {
                margin: 0;
              }
            }
          }

          :global(.trigger-typing-button) {
            width: 50px;
            height: 20px;
            font-size: 14px;
            border: 0;
            background-color: transparent;
            padding: 0;
            :global(input) {
              width: 50px;
              height: 20px;
              padding: 0;
              font-size: 14px;
              text-align: center;
              border: 1px solid var(--gray-400);
              border-radius: 4px;
              outline: none;
            }
          }
        }
      }
    }
  }
</style>