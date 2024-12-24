import { redirect as redirectFunc } from "@sveltejs/kit"

export const redirect = (route: string, url?: URL)=> {
  if (url) {
    const uri = url.searchParams.get('redirectURI')
    if (uri) {
      const redirectURI = `redirectURI=${encodeURIComponent(uri)}`
      return redirectFunc(302, `${route}?=${redirectURI}`)
    }
  }
  return redirectFunc(302, route)
}