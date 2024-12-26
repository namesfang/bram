import { Fetch } from "$lib/fetch"

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

export const load = async()=> {
  
  const casts = await fetchWeather()

  return {
    casts,
  }
}