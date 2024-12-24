<script lang="ts">
	import { type Snippet } from "svelte";
	import Message from "$components/ui/message.svelte";
	import { setMessageBoxContext } from "$components/ui/message";

  let { children }: {children: Snippet} = $props()

  let visible = $state(false)

  let options = $state<Omit<ui.MessageProps, 'visible'>>({
    confirm: true,
    title: '提示',
    content: '',
  })

  setMessageBoxContext({
    alert(message: string, onDone?: ()=> void) {
      visible = !visible
      options.confirm = false
      options.content = message
      options.onConfirm = onDone
    },
    confirm: (message: string, onConfirm?: ()=> void, onCancel?: ()=> void)=> {
      visible = !visible
      options.confirm = true
      options.content = message

      if (onConfirm || onCancel) {
        options.onConfirm = onConfirm
        options.onCancel = onCancel
      } else {
        return new Promise((resolve)=> {
          options.onConfirm = ()=> resolve(true)
          options.onCancel = ()=> resolve(false)
        })
      }
    }
  })
</script>

<svelte:head>
  <title>分支管理小能手</title>
</svelte:head>

{@render children()}

<Message {...options} bind:visible={visible}/>