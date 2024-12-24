import { bcrypt, bcryptVerify } from "hash-wasm";
import { SESSION_SECRET } from '$env/static/private'

export default class Password {
  // 密码加密
  static async hash(password: string): Promise<string> {
    return await bcrypt({
      password,
      salt: SESSION_SECRET,
      costFactor: 11,
      outputType: "encoded",
    })
  }

  // 密码验证
  static async verify(password: string, hash: string): Promise<boolean> {
    return await bcryptVerify({
      password,
      hash
    });
  }
}
