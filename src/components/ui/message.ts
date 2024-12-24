import { getContext, setContext } from "svelte"

const symbol = Symbol('message')

interface MessageContext {
  alert: (message: string, onDone?: ()=> void)=> void
  confirm: (message: string, onConfirm?: ()=> void, onCancel?: ()=> void)=> Promise<boolean>|void
}

export const getMessageContext = ()=> {
  return getContext<MessageContext>(symbol)
}

export const setMessageBoxContext = (options: MessageContext)=> {
  setContext<MessageContext>(symbol, options)
}