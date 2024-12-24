  
  const authRoutes = ['/login', '/signup', '/forgot-password']
  const publicRoutes = [...authRoutes, '/captcha']

  const startsWith = (pathname: string, routes: string[])=> {
    for(const route of routes) {
      if(pathname.startsWith(route)) {
        return true
      }
    }
    return false
  }

  /**
   * 是否是登录、注册相关页面
   * @param pathname 
   * @returns 
   */
  export const isAuthRequired = (pathname: string)=> {
    if (authRoutes.includes(pathname)) {
      return true
    }
    // if (startsWith(pathname, authRoutes)) {
    //   return true
    // }
    return false
  }

  /**
   * 是否是公开页面
   */
  export const isPublicRequired = (pathname: string)=> {
    if (publicRoutes.includes(pathname)) {
      return true
    }
    if (startsWith(pathname, publicRoutes)) {
      return true
    }
    return false
  }