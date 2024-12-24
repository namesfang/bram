<script lang="ts">
	import Input from "$components/ui/input.svelte";
  
  let { value = $bindable(), filled = true}: ui.CaptchaProps = $props()

  const refresh = ({ target }: MouseEvent)=> {
    const el = (target as HTMLImageElement)
    el.src = el.src.split('?').shift() + '?' + new Date().getTime()
  }
</script>

<div class="ui-captcha">
  <Input bind:value={value} name="captcha" maxlength={4} {filled} placeholder="验证码"/>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="captcha">
    <img onclick={refresh} src='/captcha' alt="验证码" title="点击换一个"/>
  </div>
</div>

<style lang="scss">
  .ui-captcha {
    display: flex;

    .captcha {
      width: 120px;
      height: 40px;
      margin-left: 16px;
      border-radius: 5px;
      img {
        display: inline;
        cursor: pointer;
      }
    }
  }
</style>