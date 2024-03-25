import { ICryptoService } from '../../../../infra/crypto/ICryptoService'
import { AppError } from '../../../../infra/http/error/AppError'
import { type IUsersRepository } from '../../repositories/IUsersRepository'

export interface ICreateUser {
  name: string
  email: string
  password: string
  isProvider?: boolean
}

class CreateUserUseCase {
  constructor (private readonly usersRepository: IUsersRepository,private readonly cryptoService: ICryptoService) {

  }

  async execute ({ name, email, password,isProvider=false }: ICreateUser): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('E-mail ja cadastrado',409)
    }

    const user = {
      name,
      email,
      isProvider,
      password: await this.cryptoService.hash(password)
    }

    await this.usersRepository.create(user)
  }
}

export { CreateUserUseCase }
