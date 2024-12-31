<script lang="ts">
	import { isNumber } from "radash";
	import Arrow from "./arrow.svelte";
	import { onMount } from "svelte";

  let {
    value = $bindable(),
    size = 'medium',
    filled = false,
    step = 1,
    hideButtons = false,
    class: className = '',
    ...rest
  }: ui.InputNumberProps = $props()

  const control = (amount: number) => {
    const tmp = value || 0
    if (amount < 0) {
      if (isNumber(rest.min)) {
        if (tmp <= rest.min) {
          return
        }
      }
    }
    if (amount > 0) {
      if (isNumber(rest.max)) {
        if (tmp >= rest.max) {
          return
        }
      }
    }
    value = tmp + amount
  }

  const valueChange = ()=> {
    if (isNumber(value)) {
      let val = value
      if (rest.max) {
        if (value > rest.max) {
          val = rest.max
        }
      }
      if (rest.min) {
        if (Number(value) < rest.min) {
          val = rest.min
        }
      }
      if (value !== val) {
        value = val
      }
    }
  }

  onMount(valueChange)
</script>

<div class={`ui-input--wrapper ${size} ${className}`}>
  <input onblur={valueChange} bind:value={value} class:filled type="number" {...rest}/>
  {#if false === hideButtons}
    <div class="spin">
      <button onclick={()=> control(1)} type="button" class="up" aria-label="up">
        <Arrow size={`${size === 'large' ? 'medium' : 'small'}`} toward="up"/>
      </button>
      <button onclick={()=> control(-1)} type="button" class="down" aria-label="down">
        <Arrow size={`${size === 'large' ? 'medium' : 'small'}`} toward="down"/>
      </button>
    </div>
  {/if}
</div>

<style lang="scss">

  :global(input[type="number"]) {
    appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
  }

  .ui-input--wrapper {
    
    --ui-input-primary: #1083fe;
    --ui-input-secondary: #42576c;
    --ui-input-secondary-50: #f1f3f5;
    --ui-input-secondary-100: #d4dbe2;
    
    width: 100%;
    position: relative;
    display: flex;
  }

  input {
    flex: 1;
    font-size: 14px;
    color: var(--ui-input-secondary);
    border-radius: var(--border-radius);
    border: 2px solid var(--ui-input-secondary-50);
    box-sizing: border-box;
    background-color: #fff;
    outline: none;
    &:hover {
      border-color: var(--ui-input-secondary-100);
    }
    &:focus {
      border-color: var(--ui-input-primary);
    }
  }

  .spin {
    width: var(--width);
    position: absolute;
    inset: 2px 2px 2px auto;
    display: flex;
    flex-direction: column;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    overflow: hidden;
    // background-color: aqua;

    button {
      flex: 1;
      border: 0;
      padding: 0;
      position: relative;
      background-color: transparent;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: "";
        border-left: 2px solid var(--ui-input-secondary-50);
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
      }

      &:first-child {
        &::after {
          content: "";
          border-top: 2px solid var(--ui-input-secondary-50);
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
        }
      }


      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .large {
    --border-radius: 8px;
    input {
      height: 46px;
      padding: 6px 16px;
    }

    .spin {
      --width: 32px;
    }
  }

  .medium {
    --border-radius: 5px;
    input {
      height: 40px;
      padding: 8px 12px;
    }

    .spin {
      --width: 28px;
    }
  }

  .small {
    --border-radius: 5px;
    input {
      height: 32px;
      padding: 6px 8px;
    }

    .spin {
      --width: 24px;
    }
  }

  .filled {
    border: 0;
    background-color: var(--ui-input-secondary-50);
    &:hover {
      outline: 2px solid var(--ui-input-secondary-100);
    }
    &:focus {
      outline: 2px solid var(--ui-input-primary);
    }
  }
</style>