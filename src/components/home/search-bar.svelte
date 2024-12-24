<script lang="ts">

	import Icon from "$components/ui/icon.svelte";
	import Input from "$components/ui/input.svelte";

  let { attach = true } = $props()

</script>


<div class="search-bar">
  <form>
    <Input type="text" name="keywork" placeholder="搜索分支名称/说明"/>
    <Icon name='search'/>
  </form>
  {#if attach}
  <nav>
    <a href="/branch/create">
      <Icon name='add'/>
    </a>
    <a href="/export">
      <Icon name='download' size={20}/>
    </a>
  </nav>
  {/if}
</div>


<style lang="scss">
  .search-bar {
    display: flex;

    padding: 12px 0;
    border-radius: 40px;

    form {
      width: 280px;
      position: relative;
      
      :global(i) {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        color: var(--text-color);
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
      }
    }
    nav {
      width: 100px;
      margin-left: 18px;
      a {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        &:active {
          background-color: var(--hover-background-color);
        }
        :global(i) {
          font-size: 24px;
        }
      }
    }
  }
</style>