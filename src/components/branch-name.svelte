<script lang="ts">
  import { onMount } from "svelte";
	import Input from "$components/ui/input.svelte";
	import Button from "$components/ui/button.svelte";
	import DatePicker from "./ui/date-picker.svelte";
	import Datetime from "$lib/locale/datetime";
	import { matchBranchName } from "$lib";

  let { value = $bindable() } = $props()

  let type = $state('')
  let date = $state('')
  let name = $state('')

  // 当前分支模式
  let standardSchema = $state(false)
  
  // 模式切换
  const toggle = ()=> {
    standardSchema = !standardSchema
  }

  $effect(()=> {
    if (type.length > 0 && date.length > 0 && name.length > 0) {
      value = `${type}/${date}-${name}`
    }
  })

  onMount(()=> {
    const matchs = matchBranchName(value)
    if(Array.isArray(matchs)) {
      type = matchs[1]
      date = matchs[2]
      name = matchs[3]
    } else {
      date = Datetime.format(new Date(), 'YYYYMMDD')
    }
  })

  
</script>

<div class="wrapper">
  <div class="inner">
    <div class="west">
      {#if standardSchema}
      <div class="standard">
        <Input bind:value={value} name="name" minlength={2} maxlength={60} placeholder="请输入分支名称 2~60个字"/>
        <input type="hidden" name="standard" value="1"/>
      </div>
      {:else}
      <div class="quirk">
        <div class="item feat">
          <Input bind:value={type} placeholder="<类型> 2~16小写字母"/>
        </div>
        <div class="item split1"></div>
        <div class="item free">
          <DatePicker bind:value={date} format="YYYYMMDD" placeholder="日期"/>
        </div>
        <div class="item split2"></div>
        <div class="item free">
          <Input bind:value={name} maxlength={40} placeholder="<描述> 1~40个字"/>
        </div>
      </div>
      <input bind:value={value} type="hidden" name="name"/>
      {/if}
    </div>
    <div class="east">
      <Button link onclick={toggle} class="toggle">切换{standardSchema ? '固定' : '标准'}模式</Button>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    position: relative;

    --split-color: #8099b1;

    .inner {
      display: flex;
      
      .west {
        flex: 1;
        margin-right: 18px;
        
        .quirk {
          display: flex;
          align-items: center;
          border-radius: 5px;
          
          .feat {
            width: 180px;
          }

          .free {
            flex: 1;
          }

          .split1 {
            &::after {
              content: "";
              width: 2px;
              height: 16px;
              position: absolute;
              top: -6px;
              left: 14px;
              transform-origin: center center;
              transform: rotate(24deg);
              background-color: var(--split-color);
            }
          }

          .split2 {
            &::after {
              content: "";
              width: 2px;
              height: 10px;
              position: absolute;
              top: -3px;
              left: 14px;
              transform-origin: center center;
              transform: rotate(90deg);
              background-color: var(--split-color);
            }
          }

          .split1,
          .split2 {
            width: 30px;
            text-align: center;
            position: relative;
          }
        }

        .standard {
          height: 40px;
        }
      }

      .east {
        width: 120px;
      }
    }
  }
</style>