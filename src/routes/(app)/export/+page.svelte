<script>
	import Container from "$components/ui/container.svelte";
  import Icon from "$components/ui/icon.svelte";
</script>

<Container title="数据导出">
  <div class="wrapper">
    <nav>
      <a href="/export/excel" target="_blank">
        <Icon name="file-excel-2"/>
        <em>导出Excel</em>
      </a>
      <a href="/export/pdf" target="_blank">
        <Icon name="file-pdf"/>
        <em>导出PDF</em>
      </a>
      <a href="/export/md" target="_blank">
        <Icon name="markdown"/>
        <em>导出Markdown</em>
      </a>
    </nav>
  </div>
</Container>

<style lang="scss">
  .wrapper {
    nav {
      width: 460px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
      height: 120px;
      a {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        background-color: #fff;
        :global(i) {
          font-size: 46px;
          color: #bed1e3;
        }
        em {
          height: 30px;
          line-height: 30px;
          font: {
            style: normal;
            size: 14px;
          }
        }
        &:hover {
          :global(i) {
            color: var(--primary-color);
          }
          color: var(--primary-color);
          background-color: var(--hover-background-color);
        }
      }
    }
  }
 
</style>