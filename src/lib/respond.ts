function makeBody(message: string, data: unknown = {}, status = 200, ok = true) {
  return new Response(
    JSON.stringify({
      ok,
      data,
      message,
    }),
    {
      status,
    }
  )
}

export default class Respond {
  static ok(message: string, data: unknown = {}) {
    return makeBody(message, data)
  }

  static notfound(message: string) {
    return makeBody(message, {}, 404, false)
  }

  static error(message: string, data: unknown = {}) {
    return makeBody(message, data, 400, false)
  }
}