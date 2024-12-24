import { getContext, setContext } from "svelte"

const symbol = Symbol('popconfirm')

type Options = { toggle: (props: Omit<ui.PopconfirmProps, 'visible'>)=> void}

export const getPopconfirmContext = (): Options=> {
  return getContext(symbol)
}

export function setPopconfirmContext(options: Options) {
  setContext(symbol, options)
}