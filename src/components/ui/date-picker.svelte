<script lang="ts">
	import { takeAfterFill, takeBeforeFill, takeCurrentFill, todayAdd } from "$components/ui/date-picker";
	import Popper from "$components/ui/popper.svelte";
	import dayjs from "dayjs";
	import { onMount } from "svelte";

  const defaultFormat = 'YYYY-M-D'

  const today = dayjs().format(defaultFormat).toString()

  let {
    name = '',
    value = $bindable(),
    readonly = false,
    format = defaultFormat,
    onchange,
    placeholder = '请选择',
  }: ui.DatePickerProps = $props()

  let year = $state(0)
  let month = $state(0)
  let date = $state(0)
  let visible = $state(false)

  const prev = ()=> {
    if(month === 1) {
      year--
      month = 12
    } else {
      month--
    }
  }

  const next = ()=> {
    if(month === 12) {
      year++
      month = 1
    } else {
      month++
    }
  }

  onMount(()=> {
    const now = dayjs(value || undefined)
    year = now.get('year')
    month = now.get('month') + 1
    date = now.get('date')
  })

  let valued = $derived.by(()=> {
    if (value) {
      return dayjs(value).format(defaultFormat)
    }
    return ''
  })

  let cols = $derived.by(()=> {
    if (year === 0 && month === 0) {
      return []
    }

    const cells: [number, string][] = [
      ...takeBeforeFill(year, month),
      ...takeCurrentFill(year, month),
    ]

    cells.push(...takeAfterFill(year, month, 42-cells.length))
    
    return cells
  })

  const handle = (val: string | number)=> {
    visible = false
    
    if (typeof val === 'string') {
      value = dayjs(val).format(format).toString()
    } else {
      if (0 === val) {
        value = dayjs(today).format(format).toString()
      } else if (val === 1) {
        value = todayAdd(1, format)
      } else if (val === 4) {
        // 下周4
        const n = new Date()
        const day = n.getDay()

        let a = 0
        if (day === 0) {
          a = 4
        } else {
          a = 7 - day + 4
        }
        value = todayAdd(a, format)
      }
    }
    onchange && onchange(value || '')
  }

  const toggle = ()=> {
    visible = !visible
  }
</script>

<div class="ui-datepicker">
  <div class="trigger">
    <input onclick={toggle} data-popper-trigger autocomplete="off" type="text" bind:value={value} {name} {readonly} {placeholder}/>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
    </svg>
  </div>
  <Popper bind:visible={visible}>
    <div class="calendar">
      <div class="toolbar">
        <div class="wt">{year}年{month}月</div>
        <div class="et">
          <button onclick={prev} type="button" aria-label="up">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 8L18 14H6L12 8Z"></path>
            </svg>
          </button>
          <button onclick={next} type="button" aria-label="down">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 16L6 10H18L12 16Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="header">
        <span>日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
      </div>
      <div class="body" data-month={month}>
        {#each cols as cell}
        <button data-l={`${cell[1]} === ${valued}`} onclick={()=> handle(cell[1])} type="button" class:today={cell[1] === today} class:active={cell[1] === valued}>{cell[0]}</button>
        {/each}
      </div>
      <div class="footer">
        <button onclick={()=> handle(0)} type="button">今天</button>
        <button onclick={()=> handle(1)} type="button">明天</button>
        <button onclick={()=> handle(4)} type="button">下周四</button>
      </div>
    </div>
  </Popper>
</div>

<style lang="scss">
  .ui-datepicker {
    width: 100%;
    position: relative;

    .trigger {
      height: 40px;
      position: relative;
      input {
        width: 100%;
        border: 0;
        font-size: 14px;
        border-radius: 5px;
        border: 2px solid var(--background-color);
        padding: 8px 18px;
        box-sizing: border-box;
        height: 40px;
        background-color: #fff;
        outline: none;
        &:hover {
          border-color: var(--hover-background-color);
        }

        &:focus {
          border-color: var(--primary-color);
        }
      }

      svg {
        width: 20px;
        fill: #aeaeae;
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }

    .calendar {
      width: 242px;
      padding: 8px;
      border: 1px solid var(--background-color);
      z-index: 9999;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);

      .toolbar {
        height: 32px;
        display: flex;
        justify-content: space-between;

        .wt {
          height: 30px;
          display: flex;
          align-items: center;
        }

        .et {
          width: 46px;
          display: flex;
          align-items: center;
          button {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            padding: 0;
            background-color: transparent;
            background-color: #efefef;
            border-radius: 3px;
            &:last-child {
              margin-left: 6px;
            }
            &:hover {
              background-color: #dae2ff;
            }
            svg {
              width: 20px;
              height: 20px;
              fill: #8a8a8a;
            }
          }
        }
      }

      .header {
        height: 32px;
        line-height: 32px;
        display: flex;
        span {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: #a9a9a9;
        }
      }

      .body {
        width: 242px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 32px);
        grid-gap: 3px;
        position: relative;

        &::after {
          content: attr(data-month);
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          inset: 0;
          font-size: 200px;
          color: #efefef;
          z-index: -1;
        }

        button {
          font-size: 14px;
          color: var(--text-color);
          border: 0;
          padding: 0;
          background-color: transparent;
          border-radius: 16px;
          position: relative;
          z-index: 1;
          cursor: pointer;
          &:hover {
            background-color: var(--hover-background-color);
          }
        }
        .today {
          color: #1083fe;
          &::after {
            content: "";
            border-radius: 16px;
            position: absolute;
            inset: 0;
            border: 1px solid #1083fe;
          }
        }
        .active {
          color: #fff;
          background-color: #1083fe;
        }
      }

      .footer {
        padding: 6px 10px;
        button {
          color: #fff;
          font-size: 12px;
          padding: 3px 6px;
          border: 0;
          background-color: #39f;
          border-radius: 3px;
        }
      }
    }
    
  }
</style>