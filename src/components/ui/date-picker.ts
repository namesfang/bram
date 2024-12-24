import dayjs from "dayjs"

 // 判断闰年平年
export const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

// 根据年月获取当月天数
export const takeDays = (year: number, month: number)=> {
  if([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    return 31
  }
  if([4, 6, 9, 11].includes(month)) {
    return 30
  }
  return isLeapYear(year) ? 29 : 28
}

// 前补
export const takeBeforeFill = (year: number, month: number)=> {
  const first = new Date(`${year}-${month}-01`)
  const day = first.getDay()

  // 获取上月天数
  let y = year
  let m = month
  if (m - 1 === 0) {
    m = 12
    y -= 1
  } else {
    m -= 1
  }
  const count = takeDays(y, m)
  const cells: [number, string][] = []
  const week = day === 0 ? 7 : day
  const start = count - (week - 1) 
  for(let i = start; i <= count; i++) {
    cells.push([i, `${y}-${m}-${i}`])
  }
  return cells
}

export const takeCurrentFill = (year: number, month: number)=> {
  const cells: [number, string][] = []

  const count = takeDays(year, month)
  
  for(let i = 1; i <= count; i++) {
    cells.push([i, `${year}-${month}-${i}`])
  }

  return cells
}

export const takeAfterFill = (year: number, month: number, count: number)=> {
  let y = year
  let m = month

  if (m + 1 > 12) {
    m = 1
    y += 1
  } else {
    m += 1
  }

  const cells: [number, string][] = []

  for(let i=1; i<=count; i++) {
    cells.push([i, `${y}-${m}-${i}`])
  }

  return cells
}

/**
 * 对今天日期进行加法运算
 * 目前只支持加法且只支持加几天
 * @param val 
 * @returns 
 */
export const todayAdd = (val: number, format: string)=> {
  const today = new Date()
  
  let y = today.getFullYear()
  let m = today.getMonth() + 1
  let d = today.getDate()

  const c = takeDays(y, m)
  // 加 ?天
  if (d + val > c) {
    d = val - (c - d)
    m += 1
    
    if (m > 12) {
      m = 1
      y += 1
    }
  } else {
    d += val
  }
  return dayjs(`${y}-${m}-${d}`).format(format).toString()
}