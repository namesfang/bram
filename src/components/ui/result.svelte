<script lang="ts">
	import Icon from '$components/ui/icon.svelte';
	import Countdown from '$components/ui/countdown.svelte';
  
	import { goto } from '$app/navigation';

	let {
    countdown = false,
		success = true,
		danger = false,
		warn = false,
		info = false,
    title = '操作提示',
		description = '',
    redirectURI = '/',
    children,
	}: ui.ResultProps = $props();

  let name = $state<ui.Icons>(danger || warn ? 'error-warning' : (info ? 'information' : 'checkbox-circle'))

  let label = $derived.by(()=> {
    if (title.length > 0) {
      return title
    }
    if (danger) {
      return '操作失败'
    }
    if (warn || info) {
      return '操作提示'
    }
    if (success) {
      return '操作成功'
    }
  })

  const done = async ()=> {
    await goto(redirectURI)
  }
</script>

<div class="ui-result" class:success class:danger class:warn class:info>
	<Icon {name} fill/>
	<h2>{label}</h2>
	<p>{description || '操作结束，系统正在跳转...'}</p>
  <footer>
    {#if countdown}
      <Countdown done={done}/>
    {/if}
    {#if children}
      {@render children?.()}
    {/if}
  </footer>
</div>

<style lang="scss">
  .ui-result {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    :global(i) {
      font-size: 84px;
    }
    h2 {
      font-size: 16px;
      line-height: 30px;
      margin-top: 28px;
    }
    p {
      font-size: 14px;
      line-height: 24px;
      color: var(--text-color);
      margin: 12px 0;
    }
    footer {
      :global(span) {
        padding: 3px 16px;
        border-radius: 12px;
        color: var(--text-2-color);
        background-color: var(--background-color);
      }
    }
  }

  .success {
    :global(i) {
      color: var(--success-color);
    }
  }
  .warn {
    :global(i) {
      color: var(--warning-color);
    }
  }
  .info {
    :global(i) {
      color: var(--info-color);
    }
  }
  .danger {
    :global(i) {
      color: var(--danger-color);
    }
  }
</style>
