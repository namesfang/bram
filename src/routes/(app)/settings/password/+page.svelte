<script lang="ts">
	import Alert from "$components/ui/alert.svelte";
	import Block from "$components/ui/block.svelte";
	import Button from "$components/ui/button.svelte";
	import Input from "$components/ui/input.svelte";

  let { form } = $props()

  let oldPassword = $state(form?.data.oldPassword || '')
  let newPassword = $state(form?.data.newPassword || '')
  let confirmPassword = $state(form?.data.confirmPassword || '')
</script>

<form method="POST" class="form">
  <ul>
    <li data-label="原密码">
      <Input bind:value={oldPassword} type="password" name="oldPassword" minlength={1} maxlength={60} placeholder="原密码"/>
    </li>
    <li data-label="新密码">
      <Input bind:value={newPassword} type="password" name="newPassword" minlength={1} maxlength={60} placeholder="新密码"/>
    </li>
    <li data-label="新密码确认">
      <Input bind:value={confirmPassword} type="password" name="confirmPassword" minlength={1} maxlength={60} placeholder="再次输入新密码"/>
    </li>
  </ul>
  <Alert content={form?.error}/>
  <Block>
    <Button color="primary" submit>确认修改</Button>
  </Block>
</form>

<style lang="scss">
  @use '$assets/scss/form.scss';
</style>