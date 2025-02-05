import Datetime from "$lib/locale/datetime.js"
import { prisma } from "$lib/server/db"
import { countBranchMonthly } from '@prisma/client/sql'

export const GET = async({ locals })=> {
  const { id } = locals.user
  
  const monthly = await prisma.$queryRawTyped(
    countBranchMonthly(id)
  )

  const data = monthly.map(({created, count})=> {
    return {
      label: `${created} (${Number(count)})`,
      value: created,
    }
  })

  const now = Datetime.format(new Date, 'YYYY-MM')

  if (data.length === 0 || data[0].value !== now) {
    data.unshift({
      label: `${now} (0)`,
      value: now
    })
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json'
    }
  })
}