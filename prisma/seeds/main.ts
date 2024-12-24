import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  // 初始化字典
  const dict = await prisma.dict.createMany({
    data: [
      { name: "branchStatus", value: "", label: "分支状态", description: ""},
      { parentId: 1, name: "", value: "0", label: "新增", description: ""},
      { parentId: 1, name: "", value: "1", label: "开发中", description: ""},
      { parentId: 1, name: "", value: "2", label: "待发版", description: ""},
      { parentId: 1, name: "", value: "5", label: "已暂停", description: "因需求变动，开发暂停"},
      { parentId: 1, name: "", value: "8", label: "已发版", description: ""},
      { parentId: 1, name: "", value: "9", label: "已丢弃", description: ""},
    ]
  })

  // 初始化配置
  // valueType: 'boolean' | 'number' | 'string'
  // elementType: 'input' | 'select' | 'radio'
  // elementOption: {label: string, value: string}[]
  const configuration = await prisma.configuration.createMany({
    data: [
      {id: 1, name: 'site', value: '', label: '网站配置', description: '网站基本配置'},
      {parentId: 1, id: 2, name: 'name', value: '1', label: '网站名称', description: ''},
      {parentId: 1, id: 3, name: 'ICPString', value: '1', label: 'ICP备案', description: ''},
      {parentId: 1, id: 4, name: 'weatherKey', value: '4d6eb9e7a5d3ac396f87915d7b9c53dd', label: '天气接口KEY', description: ''},
      {id: 5, name: 'security', value: '1', label: '', description: '网站安全相关配置'},
      {parentId: 5, id: 6, name: 'loginEnabled', value: '1', valueType: 'boolean', label: '登录开关', description: '关闭后前端账号无法登录'},
      {parentId: 5, id: 7, name: 'signupEnabled', value: '1', valueType: 'boolean', label: '注册开关', description: '关闭后前端账号无法注册'},
    ]
  })

  console.warn(`导入字典${dict.count}条`)
  console.warn(`导入配置${configuration.count}条`)
}

main()
  .then(()=> {
    console.log('初始化数据结束')
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async ()=> {
    await prisma.$disconnect()
  })

// export {}