import type { Action } from "svelte/action"

type Props = {
  callback: (target: HTMLElement, options: { pageX: number, pageY: number })=> void
}

export const clickoutside: Action<HTMLElement, Props> = (node, props)=> {

  let targetElement: HTMLElement | null = null;

  const bodyClickListener = function({ target, pageX, pageY }: MouseEvent) {
    if(!targetElement) {
      props.callback(target as HTMLElement, { pageX, pageY })
    }
  }

  const nodeMouseOverListener = function({ target }: MouseEvent) {
    targetElement = target as HTMLElement
  }

  const nodeMouseOutListener = function() {
    targetElement = null;
  }

  document.body.addEventListener('click', bodyClickListener)

  node.addEventListener('mouseover', nodeMouseOverListener)
  node.addEventListener('mouseout', nodeMouseOutListener)

  return {
    destroy() {
      document.body.removeEventListener('click', bodyClickListener)
      node.removeEventListener('mouseout', nodeMouseOutListener)
      node.removeEventListener('mouseover', nodeMouseOverListener)
    }
  }
}