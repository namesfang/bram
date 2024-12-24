import Password from '$lib/password.js'
import { prisma } from '$lib/server/db'
import { serializeObject } from '$lib/server/form'
import { redirect } from '$lib/server/router'


export const actions = {
  async default({ request, locals }) {

    const fd = await request.formData()
    const [data, empty] = serializeObject(fd, {
      oldPassword: '原密码',
      newPassword: '新密码',
      confirmPassword: '确认新密码',
    })

    if (empty.length > 0) {
      return {
        data,
        error: empty.join('、') + '不能为空'
      }
    }

    if (data.oldPassword.length > 60) {
      return {
        data,
        error: '原密码不能超过60位'
      }
    }
    if (data.newPassword.length > 60) {
      return {
        data,
        error: '新密码不能超过60位'
      }
    }

    if (data.newPassword !== data.confirmPassword) {
      return {
        data,
        error: '新密码与确认新密码不一致'
      }
    }

    const id = locals.user.id

    //
    const info = await prisma.user.findFirst({
      where: {
        id,
        enabled: true,
      },
    })

    if (null === info) {
      return {
        data,
        error: '用户不存在或已被禁用'
      }
    }

    if (!await Password.verify(data.oldPassword, info.password)) {
      return {
        data,
        error: '原密码错误'
      }
    }


    const password = await Password.hash(data.newPassword)
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      }
    })

    locals.session.remove('profile')

    return redirect('/login')
  }
}