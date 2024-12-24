import { isPositive } from '$lib'
import { prisma } from '$lib/server/db'
import { serializeObject } from '$lib/server/form'
import { redirect } from '$lib/server/router'
import { error } from '@sveltejs/kit'

export const load = async ({ url, locals })=> {
  const { searchParams } = url
  
  const userId = locals.user.id
  const id = searchParams.get('id')

  if (!isPositive(id)) {
    return error(404)
  }

  const tile = await prisma.tile.findFirst({
    where: {
      id: Number(id),
      userId,
      deletedAt: null
    }
  })

  if (null === tile) {
    return error(404)
  }

  return {
    tile,
  }
}

export const actions = {
  async default({ url, request, locals }) {
    const { searchParams } = url
    
    const userId = locals.user.id

    const fd = await request.formData()
    const [data] = serializeObject(fd)

    if (!isPositive(searchParams.get('id'))) {
      return {
        data,
        error: '分组ID不能为空'
      }
    }

    const id = Number(searchParams.get('id'))

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

    if (tile && tile.id !== id) {
      return {
        data,
        error: '分组名称已存在'
      }
    }

    const count = await prisma.tile.count({
      where: {
        id,
        userId,
        deletedAt: null
      }
    })

    if (count === 0) {
      return {
        data,
        error: '分组未找到或已删除'
      }
    }

    await prisma.tile.update({
      where: {
        id,
      },
      data: {
        name,
        color,
        description,
      }
    })

    return redirect(`/branch/success?redirectURI=%2Fbranch%2F${id}`)
  }
}