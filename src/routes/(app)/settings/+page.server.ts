import { prisma } from '$lib/server/db'

export const load = async({ locals })=> {
  // 第几位注册用户
  const count = await prisma.user.count({
    where: {
      id: {
        lte: locals.user.id
      }
    }
  })
  return {
    user: locals.user,
    count,
  }
}