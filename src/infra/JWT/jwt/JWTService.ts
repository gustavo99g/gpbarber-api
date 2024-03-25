import { authConfig } from "../../../config/auth"
import jwt from 'jsonwebtoken'

class JWTService implements IJWTService{

  private secret: string
  private expireTime: number

  constructor() {
    this.secret = authConfig.secret
    this.expireTime = authConfig.expireTime
  }

   sign(id: string): string {
    const token = jwt.sign(id, this.secret)
    return token
  }

  verify(token: string): string | null {
    try {
      const id = jwt.verify(token, this.secret)
      return id as string
    } catch (error) {
      return null
    }
  }
}


export { JWTService }