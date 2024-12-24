<script>
	import Container from "$components/ui/container.svelte";
	import Pagination from "$components/ui/pagination.svelte";

</script>

<Container title="用户管理" padding>
  <table>
    <thead>
      <tr>
        <td>#</td>
        <td>账号</td>
        <td>昵称</td>
        <td>注册时间</td>
        <td>操作</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <Pagination count={100} />
</Container>