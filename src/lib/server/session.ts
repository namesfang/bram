import type { Cookies } from "@sveltejs/kit"
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto"
import { accessSync, constants, existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs"
import { v4 as uuidv4 } from "uuid"

export type CookieOptions = {
  /**
   * domain is set, and most clients will consider the cookie to apply to only
   * the current domain.
   */
  domain?: string
  /**
   * When truthy, the `HttpOnly` attribute is set, otherwise it is not. By
   * default, the `HttpOnly` attribute is not set.
   * 
   * *Note* be careful when setting this to true, as compliant clients will
   * not allow client-side JavaScript to see the cookie in `document.cookie`.
   */
  httpOnly?: boolean

  /**
   * By default, the path is considered the "default path".
   */
  path?: string
  
  /**
   * if both `expires` and `maxAge` are set, then `maxAge` takes precedence, but it is
   * possible not all clients by obey this, so if both are set, they should
   * point to the same date and time.
   */
  expires?: Date
  maxAge?: number
  
  /**
   * - `true` will set the `SameSite` attribute to `Strict` for strict same
   * site enforcement.
   * - `false` will not set the `SameSite` attribute.
   * - `'lax'` will set the `SameSite` attribute to Lax for lax same site
   * enforcement.
   * - `'strict'` will set the `SameSite` attribute to Strict for strict same
   * site enforcement.
   * - `'none'` will set the SameSite attribute to None for an explicit
   * cross-site cookie.
   * 
   * *note* This is an attribute that has not yet been fully standardized, and
   * may change in the future. This also means many clients may ignore this attribute
   * until they understand it.
   */
  sameSite?: true | false | "lax" | "strict" | "none"

  /**
   * `Secure` attribute is set, otherwise it is not. By default, the `Secure`
   * attribute is not set.
   * 
   * *Note* be careful when setting this to `true`, as compliant clients will
   * not send the cookie back to the server in the future if the browser does
   * not have an HTTPS connection.
   */
  secure?: boolean
}

export type Options = {
  savePath: string
  sessionName?: string
  cookieOptions?: CookieOptions
}

export default class Session {

  private sessionName = 'sessionid'
  private sessionValue = ''
  private sessionPath = ''

  private cookieOptions: CookieOptions = {}

  private cookie: Cookies

  constructor(cookies: Cookies, options: Options) {
    this.cookie = cookies
    // 
    const { savePath, sessionName = 'sessionid', cookieOptions = { path: '/' } } = options
    
    // 保存路径是否存在
    try {
      accessSync(savePath, constants.W_OK)
    } catch (error: unknown) {
      throw new Error('savePath not exists', error as Error)
    }

    // 合并cookies参数
    this.cookieOptions = Object.assign({}, this.cookieOptions, cookieOptions)
    // 获取会话名称
    this.sessionValue = cookies.get(sessionName as string) || ''

    // 初始化session
    if(!this.sessionValue) {
      this.sessionValue = uuidv4()
      cookies.set(this.sessionName, this.sessionValue, {
        ...cookieOptions,
        path: cookieOptions.path || '/',
      })
    }

    this.sessionPath = `${savePath}/${this.sessionValue}`

    // 创建会话数据存放目录
    mkdirSync(this.sessionPath, { recursive: true, mode: 0o755 })
  }

  remove(name: string): void
  remove(name: string[]): void
  remove(name: string | string[]): void {
    if(Array.isArray(name)) {
      for(const filename of name) {
        this.remove(filename)
      }
      return
    }

    const filename = `${this.sessionPath}/${name}.json`
    // 删除文件
    if (existsSync(filename)) {
      unlinkSync(filename)
    }
  }

  destroy() {
    const files = readdirSync(this.sessionPath)

    for (const filename of files) {
      unlinkSync(`${this.sessionPath}/${filename}`)
    }
  
    rmdirSync(this.sessionPath)
    this.cookie.delete(this.sessionName, {
      ...this.cookieOptions,
      path: this.cookieOptions.path || '/',
    })
  }

  get(name: string): unknown | null {
    try {
      const filename = `${this.sessionPath}/${name}.json`
      if (!existsSync(filename)) {
        return null
      }

      const data = readFileSync(filename, 'utf-8')

      const { value, expire } = JSON.parse(data)

      // 会话数据已过期
      if (expire > 0) {
        if (expire < Math.floor(Date.now() / 1000)) {
          return null
        }
      }

      return value
    } catch (error) {
      throw new Error('not found', error as Error)
    }
  }

  set(name: string, value: unknown, ttl: number = 0) {
    try {
      if (typeof value === 'undefined') {
        return
      }

      const filename = `${this.sessionPath}/${name}.json`

      const expire = ttl === 0 ? 0 : Math.floor(Date.now() / 1000) + ttl

      const data = JSON.stringify({ value, expire })

      writeFileSync(filename, data, {
        encoding: 'utf-8',
        mode: 0o755,
      })
    } catch (error) {
      console.log('set error', error as Error)
    }
  }

  private encrypt(text: string) {
    const iv = randomBytes(16)
    const key = randomBytes(32)
    const cipher = createCipheriv('aes-256-gcm', key, iv)
    
    const data = cipher.update(text)

    return Buffer.concat([iv, key, data]).toString('base64')
  }

  private decrypt(data: string) {
    const buf = Buffer.from(data, 'base64')

    const iv = buf.subarray(0, 16)
    const key = buf.subarray(16, 48)
    const encrypted = buf.subarray(48)
    
    const decipher = createDecipheriv('aes-256-gcm', key, iv)

    return decipher.update(encrypted).toString()
  }
}