<script lang="ts">
	import { isNumber, isString } from "radash";


  let {
    name,
    size,
    color = 'default',
    fill = false,
    pure = false,
    class: _className = '',
    onclick
  }: ui.IconProps = $props();

  let className = $derived.by(()=> {
    const pieces: string[] = [color]

    if (isString(size)) {
      if (['tiny', 'small', 'medium', 'large'].includes(size)) {
        pieces.push(size)
      }
    }
    
    pieces.push(_className)

    pieces.push(false === pure ? `ri-${name}-${fill ? 'fill' : 'line'}` : `ri-${name}`)

    return pieces.join(' ')
  })

  let style = $derived.by(()=> {
    if (isNumber(size)) {
      return `font-size: ${size}px`
    }
    return ''
  })
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<i {onclick} class={className} {style}></i>

<style lang="scss">
  
  @font-face {
    font-family: "remixicon";
    src: url('data:font/truetype;charset=utf-8;base64,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AGUAbQBpAHgAaQBjAG8AbgBSAGUAbQBpAHgAIABJAGMAbwBuACAAaQBzACAAYQAgAHMAZQB0ACAAbwBmACAAbwBwAGUAbgAtAHMAbwB1AHIAYwBlACAAbgBlAHUAdAByAGEAbAAtAHMAdAB5AGwAZQAgAHMAeQBzAHQAZQBtACAAcwB5AG0AYgBvAGwAcwAgAGUAbABhAGIAbwByAGEAdABlAGwAeQAgAGMAcgBhAGYAdABlAGQAIABmAG8AcgAgAGQAZQBzAGkAZwBuAGUAcgBzACAAYQBuAGQAIABkAGUAdgBlAGwAbwBwAGUAcgBzAC4AIABoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2AQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3AAt1c2VyLTMtbGluZQt1c2VyLTMtZmlsbAhhZGQtbGluZQ9naXQtYnJhbmNoLWxpbmUPZ2l0LWJyYW5jaC1maWxsEGluZm9ybWF0aW9uLWxpbmUQaW5mb3JtYXRpb24tZmlsbBJlcnJvci13YXJuaW5nLWZpbGwSZXJyb3Itd2FybmluZy1saW5lFGNoZWNrYm94LWNpcmNsZS1saW5lFGNoZWNrYm94LWNpcmNsZS1maWxsC3NlYXJjaC1saW5lC3NlYXJjaC1maWxsC2ZvbGRlci1saW5lC2ZvbGRlci1maWxsCWxvY2stbGluZQlsb2NrLWZpbGwPc2V0dGluZ3MtMy1saW5lD3NldHRpbmdzLTMtZmlsbA1lZGl0LWJveC1saW5lDWVkaXQtYm94LWZpbGwLZ2l0aHViLWxpbmULZ2l0aHViLWZpbGwJYm9vay1saW5lCWJvb2stZmlsbA1kb3dubG9hZC1saW5lDWRvd25sb2FkLWZpbGwNbWFya2Rvd24tbGluZQ1tYXJrZG93bi1maWxsEWZpbGUtZXhjZWwtMi1saW5lEWZpbGUtZXhjZWwtMi1maWxsDWZpbGUtcGRmLWxpbmUNZmlsZS1wZGYtZmlsbA5xdWlsbC1wZW4tbGluZQ5xdWlsbC1wZW4tZmlsbBFub3RpZmljYXRpb24tbGluZRFub3RpZmljYXRpb24tZmlsbBdhcnJvdy1yaWdodC11cC1ib3gtbGluZRdhcnJvdy1yaWdodC11cC1ib3gtZmlsbAlmaWxlLWxpbmUJZmlsZS1maWxsCmNsb3NlLWxpbmUPc2VuZC1wbGFuZS1saW5lD3NlbmQtcGxhbmUtZmlsbBFjbG9zZS1jaXJjbGUtbGluZRFjbG9zZS1jaXJjbGUtZmlsbAtzdmVsdGUtbGluZQtzdmVsdGUtZmlsbA5maWxlLWNvcHktbGluZQ5maWxlLWNvcHktZmlsbApjaGVjay1saW5lCW1vcmUtbGluZQltb3JlLWZpbGwAAAAA') format('truetype');
    font-display: swap;
  }

  [class^="ri-"], [class*="ri-"] {
    font-family: 'remixicon' !important;
    font-style: normal;
    font-size: 1em;
    color: var(--color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  $colors: (
    'primary': #1083fe,
    'success': #27c76f,
    'danger': #f63c67,
    'warning': #f6da3c,
    'default': #42576c,
  );

  @each $name, $color in $colors {
    .#{$name} {
      color: $color;
    }
  }

  $sizes: (
    tiny: 12px,
    small: 14px,
    medium: 20px,
    large: 28px,
  );

  @each $name, $size in $sizes {
    .#{$name} {
      font-size: $size;
    }
  }

  .ri-user-3-line:before { content: "\f256"; }
  .ri-user-3-fill:before { content: "\f255"; }
  .ri-add-line:before { content: "\ea13"; }
  .ri-add-fill:before { content: "\ea12"; }
  .ri-git-branch-line:before { content: "\edbd"; }
  .ri-git-branch-fill:before { content: "\edbc"; }
  .ri-information-line:before { content: "\ee59"; }
  .ri-information-fill:before { content: "\ee58"; }
  .ri-error-warning-fill:before { content: "\eca0"; }
  .ri-error-warning-line:before { content: "\eca1"; }
  .ri-checkbox-circle-line:before { content: "\eb81"; }
  .ri-checkbox-circle-fill:before { content: "\eb80"; }
  .ri-search-line:before { content: "\f0d1"; }
  .ri-search-fill:before { content: "\f0d0"; }
  .ri-folder-line:before { content: "\ed6a"; }
  .ri-folder-fill:before { content: "\ed61"; }
  .ri-lock-line:before { content: "\eece"; }
  .ri-lock-fill:before { content: "\eecd"; }
  .ri-settings-3-line:before { content: "\f0e6"; }
  .ri-settings-3-fill:before { content: "\f0e5"; }
  .ri-edit-box-line:before { content: "\ec82"; }
  .ri-edit-box-fill:before { content: "\ec81"; }
  .ri-github-line:before { content: "\edcb"; }
  .ri-github-fill:before { content: "\edca"; }
  .ri-book-line:before { content: "\ead7"; }
  .ri-book-fill:before { content: "\ead6"; }
  .ri-download-line:before { content: "\ec5a"; }
  .ri-download-fill:before { content: "\ec59"; }
  .ri-markdown-line:before { content: "\ef1e"; }
  .ri-markdown-fill:before { content: "\ef1d"; }
  .ri-file-excel-2-line:before { content: "\ecdd"; }
  .ri-file-excel-2-fill:before { content: "\ecdc"; }
  .ri-file-pdf-line:before { content: "\ecfd"; }
  .ri-file-pdf-fill:before { content: "\ecfc"; }
  .ri-quill-pen-line:before { content: "\f04a"; }
  .ri-quill-pen-fill:before { content: "\f049"; }
  .ri-notification-line:before { content: "\ef9a"; }
  .ri-notification-fill:before { content: "\ef99"; }
  .ri-arrow-right-up-box-line:before { content: "\f560"; }
  .ri-arrow-right-up-box-fill:before { content: "\f55f"; }
  .ri-file-line:before { content: "\eceb"; }
  .ri-file-fill:before { content: "\ece0"; }
  .ri-close-line:before { content: "\eb99"; }
  .ri-close-fill:before { content: "\eb98"; }
  .ri-send-plane-line:before { content: "\f0da"; }
  .ri-send-plane-fill:before { content: "\f0d9"; }
  .ri-close-circle-line:before { content: "\eb97"; }
  .ri-close-circle-fill:before { content: "\eb96"; }
  .ri-svelte-line:before { content: "\f420"; }
  .ri-svelte-fill:before { content: "\f41f"; }
  .ri-file-copy-line:before { content: "\ecd5"; }
  .ri-file-copy-fill:before { content: "\ecd4"; }
  .ri-check-line:before { content: "\eb7b"; }
  .ri-check-fill:before { content: "\eb7a"; }
  .ri-more-line:before { content: "\ef79"; }
  .ri-more-fill:before { content: "\ef78"; }
</style>