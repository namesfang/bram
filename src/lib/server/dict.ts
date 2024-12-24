import { prisma } from "$lib/server/db"

type Children = {value: string, label: string}[]

type DataType = {
  [key: string]: {
    children: Children
    [key: string]: string | Children
  }
}

export default class Dict {

  private data: DataType = {
    status: {
      0: '禁用',
      1: '启用',
      children: [
        {label: '', value: ''}
      ]
    }
  }

  constructor() {
    this.loadDict()
  }

  get(name: string, value: string) {
    if(!this.data[name]) {
      return null
    }
    return this.data[name][value] || null
  }

  children(name: string) {
    if (!this.data[name]) {
      return []
    }
    return this.data[name]['children'] || []
  }

  // // 获取字典
  async loadDict() {
    const data = await prisma.dict.findMany({
      where: { enabled: true },
      orderBy: [
        { id: 'asc', },
        { orderNumber: 'asc' }
      ]
    })

    const indexed: {[key: number]: string} = {}

    data.forEach(({id, name, parentId}, index)=> {
      if(null === parentId) {
        indexed[id] = name
        this.data[name] = {
          children: []
        }
        delete data[index]
      }
    })

    data.forEach(({value, label, parentId})=> {
      const name = indexed[parentId as number]
      if(name) {
        this.data[name][value] = label
        this.data[name]['children'].push({ value, label })
      }
    })
  }

}