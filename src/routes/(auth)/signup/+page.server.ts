import { prisma } from "$lib/server/db"
import Password from "$lib/password"
import { serializeObject } from "$lib/server/form"
import { redirect } from "$lib/server/router"

export const load = ({ locals})=> {
  if (locals.configuration.securitySignupEnabled === '0') {
    return redirect('/signup/reject')
  }
  return {
    pageName: 'signup',
    securityLoginEnabled: locals.configuration.securityLoginEnabled === '1'
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
    
    const sessionCaptcha = locals.session.get<string>('captcha')
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

    // 用户名是否存在
    const exists = await prisma.user.count({
      where: { name }
    })

    if (exists) {
      return {
        data,
        error: '用户名已存在'
      }
    }

    // 系统有多少个账号
    const count = await prisma.user.count()

    const configuration = JSON.stringify({
      // 天气
			weather: {
				cityCode: '瑶海区',
				cityName: '340102'
			},
      branch: {
        // 新增分支按钮在列表中的位置
        createPosition: 1,
        // 是否折叠已发布状态
        collapsePublished: 1,
      }
    })

    await prisma.user.create({
      data: {
        name,
        password: await Password.hash(password),
        isAdm: count === 0,
        configuration,
      }
    });

    return redirect('/signup/success', url)
  }
}