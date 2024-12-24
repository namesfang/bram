import { prisma } from '$lib/server/db'
import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'
import { isPositive } from '$lib'
import Respond from '$lib/respond'

export const POST: RequestHandler = async ({ request, locals })=> {
  const fd = await request.json()

  if (!isPositive(fd.id)) {
    error(404)
  }

  const userId = locals.user.id

  const id = Number(fd.id)

  try {
    const count = await prisma.branch.count({
      where: { id, userId, deletedAt: null },
    })

    if (count === 0) {
      return Respond.notfound('分支未找到或已删除')
    }

    await prisma.branch.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      }
    })
    return Respond.ok('删除成功')
  } catch (error: unknown) {
    console.log(error)
    return Respond.notfound('分支删除失败')
  }
}
