<script lang="ts">
  import { page } from '$app/stores'
</script>

<div class="container">
  <div class="west">
    {#if $page.data.pageName === 'login'}
    <h2>登录</h2>
    <p>输入你的用户名和密码</p>
    {:else}
    <h2>注册</h2>
    <p>从此，江湖遍有你的踪迹</p>
    {/if}
  </div>
  <div class="east">
    <slot></slot>
  </div>
</div>

<style lang="scss">
.container {
  height: 100vh;
  display: flex;
  .west {
    width: 40%;
    box-sizing: border-box;
    padding-right: 28px;
    background-color: var(--background-color);
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      color: var(--primary-color);
      font-size: 54px;
    }
    p {
      margin-top: 10px;
      margin-bottom: 100px;
      font: {
        weight: bold;
        size: 17px;
      }
      color: var(--text-color);
    }
  }
  .east {
    flex: 1;
    padding-left: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>