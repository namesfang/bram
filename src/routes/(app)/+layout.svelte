<script lang="ts">
	import Icon from "$components/ui/icon.svelte";

  let { data, children } = $props()
</script>

{#snippet link({ href, label, icon, active, target }: Nav)}
  <a {href} {target} class:active>
    <Icon name={icon as ui.Icons} fill={active}/>
    <em>{label}</em>
  </a>
{/snippet}

<div class="container">
  <aside>
    {#each data.multi as children}
      <nav>
        {#each children as nav}
          {@render link(nav)}
        {/each}
      </nav>
    {/each}
  </aside>
  <main>
    {@render children?.()}
  </main>
</div>

<style lang="scss">
  .container {
    height: 100vh;
    background: {
      image: url("/images/aside-background.jpg"), linear-gradient(105deg, rgb(97, 92, 237) 7%, rgb(213, 220, 255) 66%);
      repeat: no-repeat;
      size: cover;
      position: left center;
    }

    display: flex;

    aside {
      width: 48px;
      display: flex;
      margin: 24px 12px;
      flex-direction: column;
      justify-content: space-between;
      position: relative;

      a {
        width: 48px;
        height: 68px;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 28px;
        position: relative;
        transition-duration: 0.2s;

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          :global(i) {
            color: #fff;
          }
          em {
            color: #fff;
          }
        }

        em {
          font-size: 12px;
          font-style: normal;
          color: #c6c4ff;
          line-height: 18px;
          margin-top: 2px;
        }

        :global(i) {
          width: 48px;
          height: 48px;
          font-size: 26px;
          color: #c6c4ff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }

      .active {
        transform: translateY(2px);
        :global(i) {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
        }
        em {
          color: #fff;
        }
      }
    }

    main {
      flex: 1;
      overflow: hidden;
      overflow-y: auto;
      background-color: #fff;
      margin: 8px 8px 8px 0;
      border-radius: 12px;
    }
  }
</style>