export const load = async ({ locals })=> {
  const options = [
    {label: '个人资料', href: '/settings'},
    {label: '密码修改', href: '/settings/password'},
    
  ]
  if (locals.user?.isAdm) {
    options.push({label: '系统设置', href: '/settings/configuration/basic'})
    options.push({label: '安全设置', href: '/settings/configuration/security'})
  }
  return {
    options
  }
}