import { prisma } from "$lib/server/db"
import { countBranchCreated, countBranchPublished } from '@prisma/client/sql'
import type { ChartData } from "chart.js"

import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

const makeChartData = async (userId: number, startTime: string, endTime: string)=> {

  const createdMap = new Map<string, number>()
  const countCreated = await prisma.$queryRawTyped(
    countBranchCreated(userId, startTime, endTime)
  )
  const publishedMap = new Map<string, number>()
  const countPublished = await prisma.$queryRawTyped(
    countBranchPublished(userId, startTime, endTime)
  )

  countCreated.forEach(({ created, count })=> {
    if (created) {
      createdMap.set(created.split('-').pop() as string, Number(count))
    }
  })

  countPublished.forEach(({ published, count })=> {
    if (published) {
      publishedMap.set(published.split('-').pop() as string, Number(count))
    }
  })

  const end = dayjs(endTime).date()

  const labels: string[] = []
  const created: number[] = [0]
  const published: number[] = []
  for(let i=1; i<=end; i++) {
    const d = i.toString().padStart(2, '0')
    labels.push(d)
    created.push(createdMap.get(d) || 0)
    published.push(publishedMap.get(d) || 0)
  }

  return {
    labels,
    datasets: [
      {
        label: '新增',
        data: created,
      },
      {
        label: '发版',
        data: published,
      }
    ],
  } as ChartData<'line'>
}

export const GET = async({ params, locals })=> {
  const { id } = locals.user

  const value = params.value || new Date()

  const startTime = dayjs(value).startOf('month').format('YYYY-MM-DD HH:mm:ss')
  const endTime = dayjs(value).endOf('month').format('YYYY-MM-DD HH:mm:ss')

  const chart = await makeChartData(id, startTime, endTime)

  return new Response(JSON.stringify(chart), {
    headers: {
      'content-type': 'application/json'
    }
  })
}