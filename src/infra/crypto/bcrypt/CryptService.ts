import { ICryptoService } from "../ICryptoService"
import { compare, hash } from 'bcryptjs'

class CryptoService implements ICryptoService {
  constructor() {}

  async hash(value: string): Promise<string> {
    const hashedPassword = await hash(value, 10)
    return hashedPassword
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await compare(value, hash)
    return isValid
  }
}


export { CryptoService }