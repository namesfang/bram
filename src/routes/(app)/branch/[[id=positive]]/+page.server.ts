import { prisma } from '$lib/server/db'
import type { Prisma } from '@prisma/client'
import { error } from '@sveltejs/kit'
import { isEmpty } from 'radash'

const fetchBranchs = async(userId: number, tileId: string, keyword: string)=> {

  if (isEmpty(tileId)) {
    return {
      tile: null,
      branchs: []
    }
  }

  const id = Number(tileId)

  

  const tile = await prisma.tile.findFirst({
    where: { id, deletedAt: null },
  })

  if (!tile) {
    return error(404)
  }

  const where: Prisma.BranchWhereInput = {
    userId,
    tileId: id,
    deletedAt: null
  }
  if (keyword.length > 0) {
    where.OR = [
      {
        name: { contains: keyword }
      },
      {
        remark: { contains: keyword }
      }
    ]
  }

  const branchs = await prisma.branch.findMany({
    where,
    orderBy: { id: 'desc' },
  })

  return {
    tile,
    branchs
  }
}

export const load = async ({ locals, params, url }) => {
  
  const userId = locals.user.id

  const { searchParams } = url

  const keyword = searchParams.get('keyword') || ''

  const { tile, branchs } = await fetchBranchs(userId, params.id || '', keyword)

  return {
    tile,
    branchs,
    branchStatus: locals.dict.branchStatus,
  }
}