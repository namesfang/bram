export const serializeObject = (form: FormData, fields: Record<string, string> = {}): [Record<string, string>, string[]]=> {
  const data: Record<string, string> = {}
  const keys: string[] = []
  form.keys().forEach(key=> {
    data[key] = form.get(key) as string
    if (fields[key]) {
      if ('' === data[key] || null === data[key]) {
        keys.push(fields[key])
      }
    }
  })
  return [data, keys]
}
