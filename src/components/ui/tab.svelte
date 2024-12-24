<script lang="ts">
  import { page } from '$app/stores'

  let { options, children, padding = true }: ui.TabProps = $props()
</script>

<div class="ui-tab">
  <div class="header">
    <nav>
      {#each options as tab}
        <a href={tab.href} class:active={$page.data.pathname === tab.href}>{ tab.label }</a>
      {/each}
    </nav>
  </div>
  <div class="content" class:padding>
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .ui-tab {
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      height: 46px;
      display: flex;
      justify-content: flex-start;
      padding-top: 18px;
      background-color: var(--background-color);
      
      nav {
        margin-left: 18px;
        a {
          height: 46px;
          line-height: 46px;
          font-size: 14px;
          padding: 0 18px;
          display: inline-block;
        }

        .active {
          color: var(--primary-color);
          font-weight: bold;
          background-color: #fff;
          border-radius: 5px 5px 0 0;
        }
      }
    }

    .content {
      flex: 1;
      flex-shrink: 0;
      overflow: hidden;
      overflow-y: auto;
      background-color: #fff;
      border-radius: 0 0 5px 5px;
    }

    .padding {
      padding: 18px;
    }
  }

</style>