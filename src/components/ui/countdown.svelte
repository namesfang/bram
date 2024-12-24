<script lang="ts">
  let { delay = 3, done }: ui.CountdownProps = $props();

  let secounds = $state(delay);

  $effect(() => {
    const timer = setInterval(() => {
      secounds--;
      if (secounds < 1) {
        clearInterval(timer);
        done()
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<span onclick={done} class="ui-countdown">{secounds}s</span>

<style>
  .ui-countdown {
    cursor: pointer;
  }
</style>