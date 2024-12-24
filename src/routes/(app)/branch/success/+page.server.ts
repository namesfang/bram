export const load = async({ url })=> {
  return {
    redirectURI: url.searchParams.get('redirectURI') || '/'
  }
}