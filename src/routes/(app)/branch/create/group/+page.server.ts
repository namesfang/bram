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

    const { name, color, description } = data

    if (name.length === 0) {
      return {
        data,
        error: '分组名称不能为空'
      }
    }

    if (name.length > 20) {
      return {
        data,
        error: '分组名称不能超过20个字符'
      }
    }

    if (description.length > 200) {
      return {
        data,
        error: '分组描述不能超过200个字符'
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