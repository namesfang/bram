import { redirect } from '$lib/server/router'

export const load = async({ locals }) => {
  if (!locals.user?.isAdm) {
    return redirect('/forbidden')
  }
}