import { isNumber } from '$lib'
import { prisma } from '$lib/server/db'
import { serializeObject } from '$lib/server/form'
import { redirect } from '$lib/server/router'

export const load = async ({ url })=> {
  const { pathname } = url
  return {
    pathname,
  }
}

export const actions = {
  async default({ request, locals }) {
    const userId = locals.user.id

    const fd = await request.formData()
    const [data] = serializeObject(fd)

    const { name, color, description, orderNumber } = data

    if (name.length === 0) {
      return {
        data,
        error: '分组名称不能为空'
      }
    }

    if (name.length > 30) {
      return {
        data,
        error: '分组名称不能超过30个字符'
      }
    }

    if (isNumber(orderNumber)) {
      if (Number(orderNumber) < 1) {
        return {
          data,
          error: '序号不小于1'
        }
      }
      if (Number(orderNumber) > 200) {
        return {
          data,
          error: '序号不能超过200'
        }
      }
    }

    if (description.length > 240) {
      return {
        data,
        error: '分组描述不能超过240个字符'
      }
    }

    const tile = await prisma.tile.findFirst({
      where: {
        name,
        userId
      }
    })

    if (tile) {
      return {
        data,
        error: '分组名称已存在'
      }
    }

    await prisma.tile.create({
      data: {
        name,
        color,
        description,
        orderNumber: Number(orderNumber) || 99,
        userId
      }
    })

    let url = '/branch/success'

    if (typeof data.continue === 'undefined') {
      url += '?redirectURI=%2Fbranch'
    } else {
      url += '?redirectURI=%2Fbranch%2Fcreate%2Fgroup'
    }

    return redirect(url)
  }
}