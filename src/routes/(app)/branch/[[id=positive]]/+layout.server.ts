import { prisma } from '$lib/server/db'
import type { Prisma } from '@prisma/client'

const fetchTiles = async(userId: number, keyword: string)=> {
  const where: Prisma.TileWhereInput = {
    userId,
    deletedAt: null
  }
  if (keyword.length > 0) {
    where.OR = [
      {
        name: { contains: keyword }
      },
      {
        description: { contains: keyword }
      }
    ]
  }
  return await prisma.tile.findMany({
    where,
    orderBy: { id: 'desc' },
    select: {
      id: true,
      name: true,
      color: true,
      description: true,
      _count: {
        select: { 
          branchs: {
            where: { userId }
          }
        }
      }
    }
  })
}

export const load = async ({ locals, url }) => {
  const userId = locals.user.id

  const { pathname, searchParams } = url

  const keyword = searchParams.get('keyword') || ''

  const tiles = await fetchTiles(userId, pathname === '/branch' ? keyword : '')

  return {
    tiles,
    pathname,
    keyword,
  }
}