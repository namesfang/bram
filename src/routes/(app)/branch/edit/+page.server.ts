import { isNumber, isPositive } from '$lib'
import { prisma } from '$lib/server/db'
import { serializeObject } from '$lib/server/form'
import { redirect } from '$lib/server/router'
import { error } from '@sveltejs/kit'

export const load = async ({ url, locals })=> {
  const { pathname, searchParams } = url

  const userId = locals.user.id
  const id = searchParams.get('id')

  const branch = await prisma.branch.findFirst({
    where: {
      id: Number(id),
      userId,
      deletedAt: null
    }
  })

  if (null === branch) {
    return error(404)
  }

  const tiles = await prisma.tile.findMany({
    where: { userId, deletedAt: null },
    orderBy: { id: 'desc' },
    select: {
      id: true,
      name: true
    }
  })

  if (0 === tiles.length) {
    return redirect('/branch/create/group/empty?redirectURI=%2Fbranch%2Fcreate/group')
  }

  return {
    pathname,
    tiles,
    branch,
    statusOptions: locals.dict.branchStatus.children,
  }
}

export const actions = {
  async default({ request, locals, url }) {
    const { searchParams } = url
    const userId = locals.user.id
  
    const fd = await request.formData()

    const [data, empty] = serializeObject(fd, {
      tileId: '所属分组',
      name: '分支名称',
      // releaseAt: '预计上线时间',
      status: '分支状态',
    })

    if (empty.length > 0) {
      return {
        data,
        error: empty.join('、') + '不能为空'
      }
    }

    if (!isPositive(searchParams.get('id'))) {
      return {
        data,
        error: '分组ID不能为空'
      }
    }

    const id = Number(searchParams.get('id'))

    const { name, color, remark, status, tileId, releaseAt, vendorId, standard } = data

    if (!isNumber(tileId)) {
      return {
        data,
        error: '分组ID不能为空'
      }
    }

    if (name.length < 2 || name.length > 40) {
      return {
        data,
        error: '分支名称长度为2-40个字符'
      }
    }

    // 校验日期格式
    if (data.releaseAt) {
      if (!/^(\d{4})-(\d{1,2})-(\d{1,2})$/.test(data.releaseAt)) {
        return {
          data,
          error: '预计发版日期格式错误'
        }
      }
    }

    // 校验16进制颜色格式
    if (color.length === 6) {
      if (/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(color)) {
        return {
          data,
          error: '颜色格式不正确'
        }
      }
    }

    if (Number(status) < -1 || Number(status) > 10) {
      return {
        data,
        error: '分支状态不能为空'
      }
    }

    if (remark.length > 60) {
      return {
        data,
        error: '备注内容不超过60个字符'
      }
    }

    if (!standard) {
      if (!/^([a-z]{2,20})\/(\d{8})-(.{1,})$/.test(data.name)) {
        return {
          data,
          error: '分支名称输入不正确'
        }
      }
    }

    const branch = await prisma.branch.findFirst({
      where: { name, userId, tileId: Number(tileId), }
    })

    if (branch && branch.id !== id) {
      return {
        data,
        error: '分支名称已存在'
      }
    }

    await prisma.branch.update({
      where: {
        id,
      },
      data: {
        name,
        color,
        remark,
        status: Number(status),
        tileId: Number(tileId),
        releaseAt: releaseAt ? new Date(releaseAt) : null,
        vendorId: vendorId || '',
        userId
      }
    })

    let uri = '/branch/success'

    if (typeof data.continue === 'undefined') {
      uri += `?redirectURI=%2Fbranch%2F${tileId}`
    } else {
      uri += '?redirectURI=%2Fbranch%2Fcreate%2Fgroup'
    }

    return redirect(uri)
  }
}
