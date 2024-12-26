import { prisma } from '$lib/server/db'
import type { RequestHandler } from './$types'
import Respond from '$lib/respond'
import { isNumber } from '$lib'

export const POST: RequestHandler = async ({ request, locals })=> {
  const { name, value }: {name: keyof User['configuration']['branch'], value: 0 | 1} = await request.json()

  if (!name || !isNumber(value)) {
    return Respond.error('参数提交不正确')
  }

  if (name === 'collapsePublished') {
    if (![1, 0].includes(value)) {
      return Respond.error('提交数据不正确')
    }
  }
  if (name === 'createPosition') {
    if (![0, 1, 2].includes(value)) {
      return Respond.error('提交数据不正确')
    }
  }

  const { id, configuration } = locals.user

  try {
    configuration.branch[name] = value

    await prisma.user.update({
      where: { id },
      data: {
        configuration: JSON.stringify(configuration)
      }
    })

    locals.session.set('profile', {
      ...locals.session.get<User>('profile'),
      configuration: configuration
    })

    return Respond.ok('修改成功')
  } catch (error: unknown) {
    console.log(error)
    return Respond.notfound('修改失败')
  }
}
