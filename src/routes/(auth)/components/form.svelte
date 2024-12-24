<script>
	import Alert from "$components/ui/alert.svelte";
	import Captcha from "$components/ui/captcha.svelte";

  import { page } from '$app/stores'
	import Block from "$components/ui/block.svelte";
	import Input from "$components/ui/input.svelte";

  const { form } = $page

  let { children } = $props()

  let name = $state('')
  let password = $state('')
  let captcha = $state('')

  $effect(()=> {
    name = form?.data.name || ''
    password = form?.data.password || ''
    captcha = form?.data.captcha || ''
  })
</script>
<form method="post">
  <ul>
    <li data-label="用户名">
      <Input bind:value={name} filled name="name" placeholder="用户名"/>
    </li>
    <li data-label="密码">
      <Input bind:value={password} filled type="password" name="password" placeholder="密码"/>
    </li>
    <li data-label="验证码">
      <Captcha/>
    </li>
  </ul>
  <Alert content={form?.error}/>
  <Block between style="margin-top: 30px">
    {@render children?.()}
  </Block>
</form>

<style lang="scss">
  form {
    width: 320px;
    ul {
      li {
        margin-bottom: 18px;
        padding-top: 26px;
        position: relative;
        display: flex;
        &::before {
          content: attr(data-label);
          font: {
            weight: bold;
            size: 14px;
          }
          color: var(--text-color);
          position: absolute;
          top: 0;
        }
      }
    }
  }
</style>