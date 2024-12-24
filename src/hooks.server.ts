import path from "node:path";
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/db";
import Session from "$lib/server/session";
import { isAuthRequired, isPublicRequired } from "$lib/server/guard";

const ufirst = (name: string)=> {
  return name[0].toUpperCase() + name.slice(1)
}

const getConfiguration = async()=> {
  const data = await prisma.configuration.findMany({
    where: { enabled: true },
    orderBy: [
      { id: 'asc', },
      { orderNumber: 'asc' }
    ],
  })

  const value = {} as Configuration

  type Keys = keyof Configuration
  type GroupName = 'site' | 'security'

  const parentMap: {[key: number]: GroupName} = {}

  data.forEach((t)=> {
    if (t.parentId === null) {
      parentMap[t.id] = t.name as GroupName
    }
  })

  data.forEach((t)=> {
    if (t.parentId !== null) {
      const parentName = parentMap[t.parentId]
      const combineName = `${parentName}${ufirst(t.name)}` as Keys
      value[combineName] = t.value
    }
  })
  return value
}

const getDict = async()=> {
  const data = await prisma.dict.findMany({
    where: { enabled: true },
    orderBy: [
      { id: 'asc', },
      { orderNumber: 'asc' }
    ]
  })

  const dictMap: DictMap = {}

  const mul: {[key: number]: string} = {}
  data.forEach(({id, name, parentId}, index)=> {
    if(null === parentId) {
      mul[id] = name
      delete data[index]
    }
  })

  data.forEach(({value, label, parentId})=> {
    const name = mul[parentId as number]
    if(name) {
      if (dictMap[name]) {
        dictMap[name][value] = label
        dictMap[name].children.push({value, label})
      } else {
        dictMap[name] = {
          [value]: label,
          children: [
            {value, label}
          ]
        }
      }
    }
  })
  return dictMap
}

export async function handle ({ event, resolve }) {
  const { cookies, url: { pathname } } = event

  const savePath = path.resolve('./session')

  const dict = await getDict()

  const session = new Session(cookies, { savePath })

  const configuration = await getConfiguration()
  
  const user = session.get('profile') as User

  event.locals = {
    user,
    dict,
    session,
    configuration,
  }

  // "/[fallback]" 是sveltekit内部build时需要
  // console.log('event.url.pathname', event.url.pathname)
  // if(event.url.pathname.includes('/[fallback]')) {
  //   return resolve(event)
  // }

  // 鉴权
  if(user) {
    // 登录后不允许再访问登录和注册页面相关页面
    if(isAuthRequired(pathname)) {
      throw redirect(302, '/');
    }
  } else {
    // 排除公共页面
    if(!isPublicRequired(pathname)) {
      throw redirect(302, configuration.securityLoginEnabled === '1' ? '/login' : '/login/reject')
    }
  }

  return resolve(event)
}