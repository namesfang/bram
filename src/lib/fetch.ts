import { merge, recursive } from "merge"
import { parse, stringify } from 'qs'


interface Result<T> {
  ok: boolean
  message: string
  data: T
}

export class Fetch {

  private _params: Record<string, string | number> = {}

  constructor(protected fetch: (input: string | URL | globalThis.Request, init?: RequestInit )=> Promise<Response>) {}

  params(value: Record<string, string | number> = {}, replace = false) {
    this._params = replace ? recursive(this._params, value) : merge(this._params, value)
    return this
  }

  /**
   * 合并请求参数到地址
   * @param url 请求地址
   * @returns 
   */
  protected mergeQueryParams(url: string) {
    if(url.indexOf('?') === -1 && Object.keys(this._params).length === 0) {
      return url
    }
    const [pathname, queryString] = url.split('?', 2)
    const pieces = [
      pathname,
      stringify(merge(true, this._params, parse(queryString)))
    ];
    return pieces.join('?')
  }

  /**
   * 发起get请求
   * @param url 请求地址
   * @returns 
   */
  async get<T, R = Result<T>>(url: string) {
    url = this.mergeQueryParams(url)
    const res = await this.fetch(url, { method: 'GET' })
    return await res.json() as R
  }

  async post<T>(url: string, data: Record<string, string | number> = {}) {
    url = this.mergeQueryParams(url)
    const res = await this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    return await res.json() as Result<T>
  }
}