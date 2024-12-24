
import type { Action } from "svelte/action";

export const teleport: Action<HTMLElement, HTMLElement|string|undefined> = (node, container)=> {
  if(typeof container === 'undefined') {
    document.body.appendChild(node)
  } else if(typeof container === 'string') {
    document.querySelector(container)?.appendChild(node)
  } else {
    document.body.appendChild(node)
  }
  return {
    destroy() {
      node.remove()
    }
  }
}