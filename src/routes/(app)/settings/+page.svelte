<script lang="ts">
	import Button from '$components/ui/button.svelte';

  let { data } = $props()
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
  <Button href="/logout" color="danger" block>退出</Button>
</div>

<style lang="scss">
  .wrapper {
    width: 360px;
    margin: 0 auto;
    ul {
      margin-bottom: 30px;
      li {
        height: 36px;
        margin-bottom: 8px;
        border-bottom: 1px solid var(--hover-background-color);
        display: flex;
        justify-content: space-between;
        &:last-child {
          border-bottom: 0;
        }
        span {
          font-size: 14px;
          &:first-child {
            color: var(--text-2-color);
          }
          &:last-child {
            color: var(--text-color);
          }
        }
      }
    }
  }
</style>
