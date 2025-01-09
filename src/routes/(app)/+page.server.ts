import { Fetch } from "$lib/fetch"
import { prisma } from "$lib/server/db"
import { countBranchCreated, countBranchPublished } from '@prisma/client/sql'
import type { ChartData } from "chart.js"

import dayjs from "dayjs"

interface Cast {
  // 日期
  date: string
  // 星期几
  week: string
  // 白天天气现象
  dayweather: string
  // 晚上天气现象
  nightweather: string
  // 白天温度
  daytemp: string
  // 晚上温度
  nighttemp: string
  // 白天风向
  daywind: string
  // 晚上风向
  nightwind: string
  // 白天风力
  daypower: string
  // 晚上风力
  nightpower: string
}

interface Forecast {
  // 城市名称
  city: string
  // 城市名称
  adcode: string
  // 城市名称
  province: string
  // 预报发布时间
  reporttime: string
  // 预报数据
  casts: Cast[]
}

interface Result<T> {
  status: '0' | '1',
  count: '1',
  info: 'OK',
  infocode: '10000',
  forecasts: T[]
}

const startTime = dayjs().format('YYYY-MM-01 00:00:00').valueOf()
const endTime = dayjs().endOf('month').format('YYYY-MM-DD 23:59:59').valueOf()

const fetchWeather = async()=> {
  return []
  const f = new Fetch()
  const params = {
    key: '4d6eb9e7a5d3ac396f87915d7b9c53dd',
    city: '340102',
    extensions: 'all',
  }
 
  const data = await f.params(params).get<Forecast, Result<Forecast>>('https://restapi.amap.com/v3/weather/weatherInfo')

  const { forecasts } = data

  return forecasts[0].casts || []
}

const makeChartData = async (userId: number)=> {
  const createdMap = new Map<string, number>()
  const countCreated = await prisma.$queryRawTyped(
    countBranchCreated(userId, startTime, endTime)
  )
  const publishedMap = new Map<string, number>()
  const countPublished = await prisma.$queryRawTyped(
    countBranchPublished(userId, startTime, endTime)
  )

  countCreated.forEach(({ created, count })=> {
    if (created) {
      createdMap.set(created.split('-').pop() as string, Number(count))
    }
  })

  countPublished.forEach(({ published, count })=> {
    if (published) {
      publishedMap.set(published.split('-').pop() as string, Number(count))
    }
  })

  const end = dayjs().endOf('month').date()

  const labels: string[] = []
  const created: number[] = [0]
  const published: number[] = []
  for(let i=1; i<=end; i++) {
    const d = i.toString().padStart(2, '0')
    labels.push(d)
    created.push(createdMap.get(d) || 0)
    published.push(publishedMap.get(d) || 0)
  }

  return {
    labels,
    datasets: [
      {
        label: '新增',
        data: created,
      },
      {
        label: '发版',
        data: published,
      }
    ],
  } as ChartData<'line'>
}

export const load = async({ locals })=> {
  const { id } = locals.user
  
  const casts = await fetchWeather()
  
  const chart = await makeChartData(id)

  return {
    casts,
    chart,
  }
}