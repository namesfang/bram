import { Fetch } from '$lib/fetch'

interface Live {
  // 省份名
  province: string
  // 城市名
  city: string
  // 区域编码
  adcode: string
  // 天气现象（汉字描述）
  weather: string
  // 实时气温，单位：摄氏度
  temperature: string
  // 风向描述
  winddirection: string
  // 风力级别，单位：级
  windpower: string
  // 空气湿度
  humidity: string
  // 数据发布的时间
  reporttime: string
}

interface Result<T> {
  status: '0' | '1',
  count: '1',
  info: 'OK',
  infocode: '10000',
  lives: T[]
}

const fetchLiveWeather = async ()=> {
const f = new Fetch()
  const params = {
    key: '4d6eb9e7a5d3ac396f87915d7b9c53dd',
    city: '340102',
    extensions: 'base',
  }
 
  const data = await f.params(params).get<Live, Result<Live>>('https://restapi.amap.com/v3/weather/weatherInfo')

  return data.lives
}

export const load = async ({ locals, url }) => {
  const { user } = locals
  const { pathname } = url

  const [weather] = await fetchLiveWeather()

  const apps: Nav[] = [
    {label: '首页', active: false, icon: 'send-plane', href: '/'},
    {label: '分支', active: false, icon: 'git-branch', href: '/branch'},
    // {label: '提醒', active: false, icon: 'notification', href: '/notification'},
    // {label: '笔记', active: false, icon: 'quill-pen', href: '/note'},
    // {label: weather.weather, active: false, icon: 'quill-pen', href: '/weather'},
  ]

  const permission: Nav[] = [
    {label: '设置', active: false, icon: 'settings-3', href: '/settings'},
    {label: '仓库', active: false, icon: 'github', href: 'https://github.com/namesfang/bram', target: '_blank'},
  ]

  if (user.isAdm) {
    permission.unshift({label: '字典', active: false, icon: 'book', href: '/dict'})
    permission.unshift({label: '用户', active: false, icon: 'user-3', href: '/user'})
  }
  
  const multi = [
    apps,
    permission,
  ]

  for(const children of multi) {
    for(const nav of children) {
      if (nav.href === '/') {
        nav.active = pathname === nav.href
      } else {
        nav.active = pathname.startsWith(nav.href)
      }
    }
  }

  return {
    user,
    multi,
    pathname,
    weather,
  }
}