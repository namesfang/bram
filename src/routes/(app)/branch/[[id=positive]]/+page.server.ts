import { prisma } from '$lib/server/db'
import type { Branch, Prisma } from '@prisma/client'
import { error } from '@sveltejs/kit'
import { isEmpty } from 'radash'

const fetchBranchs = async(userId: number, tileId: string, keyword: string)=> {

  const id = Number(tileId)

  const tile = await prisma.tile.findFirst({
    where: { id, deletedAt: null },
  })

  if (!tile) {
    return {
      tile: null,
      branchs: []
    }
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
    orderBy: [
      {orderNumber: 'asc'},
      {id: 'desc'},
    ],
  })

  return {
    tile,
    branchs
  }
}

export const load = async ({ locals, params, url }) => {
  const { user, dict: { branchStatus } } = locals

  const { id: userId, configuration } = user

  const tileId = params.id 

  if (isEmpty(tileId)) {
    return {
      tile: null,
      branchs: [],
      published: [],
      branchStatus,
      createPosition: 0,
    }
  }

  const { searchParams } = url

  const keyword = searchParams.get('keyword') || ''

  const { tile, branchs } = await fetchBranchs(userId, params.id || '', keyword)

  if (null === tile) {
    error(404)
  }

  const published: Branch[] = []
  const temp: Branch[] = []
  const {collapsePublished, createPosition} = configuration.branch
  const hasExpand = searchParams.has('expand')
  
  if (collapsePublished && branchs.length > 7 && !hasExpand) {
    branchs.forEach((t)=> {
      if (t.status === 8) {
        published.push(t)
      } else {
        temp.push(t)
      }
    })
    branchs.splice(0)
    branchs.push(...temp)
  }

  // 如果分支中一个都没有则撤回分组
  if (branchs.length === 0) {
    branchs.push(...published)
    published.splice(0)
  }

  return {
    tile,
    branchs,
    published,
    createPosition,
    branchStatus,
  }
}