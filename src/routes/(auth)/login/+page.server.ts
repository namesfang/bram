import { prisma } from "$lib/server/db"
import { serializeObject } from "$lib/server/form"
import { redirect } from "$lib/server/router"
import Password from "$lib/password"
import Datetime from "$lib/locale/datetime"

export const load = ({ locals})=> {
  if (locals.configuration.securityLoginEnabled === '0') {
    return redirect('/login/reject')
  }
  return {
    pageName: 'login',
    securitySignupEnabled: locals.configuration.securitySignupEnabled === '1'
  }
}

export const actions = {
  async default({ url, request, locals }) {
    const [data, empty] = serializeObject(await request.formData(), {
      name: '用户名',
      password: '密码',
      captcha: '验证码'
    })

    if (empty.length > 0) {
      return {
        data,
        error: empty.join('、') + '不能为空'
      }
    }

    const { name, password, captcha } = data

    if (name.length > 20) {
      return {
        data,
        error: '用户名不能超过20位'
      }
    }
    if (password.length > 60) {
      return {
        data,
        error: '密码不能超过60位'
      }
    }

    const sessionCaptcha = locals.session.get('captcha')
    if (null === sessionCaptcha) {
      return {
        data,
        error: '验证码已过期'
      }
    }
    if (captcha.toLowerCase() !== sessionCaptcha) {
      return {
        data,
        error: '验证码错误'
      }
    }

    // 系统有多少个账号
    const user = await prisma.user.findFirst({
      where: { name, enabled: true }
    })

    if (null === user) {
      return {
        data,
        error: '用户名或密码错误'
      }
    }

    if (!await Password.verify(password, user.password)) {
      return {
        data,
        error: '用户名或密码错误'
      }
    }

    const { id, isAdm, createdAt } = user

    locals.session.set('profile', {
      id,
      name,
      isAdm,
      createAt: Datetime.format(createdAt),
    })

    return redirect('/login/success', url)
  }
}