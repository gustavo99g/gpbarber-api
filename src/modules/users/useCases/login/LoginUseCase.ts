import { ICryptoService } from "../../../../infra/crypto/ICryptoService";
import { AppError } from "../../../../infra/http/error/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";


interface ILogin {
  email: string
  password: string
}

class LoginUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository, 
    private readonly cryptoService: ICryptoService,
    private readonly jwtService: IJWTService
    ) {}



  async execute({ email, password }: ILogin): Promise<string> {
    const user = await this.usersRepository.findByEmail(email)


    if(!user) {
      throw new AppError('Email ou senha invalidos',401)
    }

    const match = await this.cryptoService.compare(password, user.password)
    console.log(match)

    if(!await this.cryptoService.compare(password, user.password)) {
      throw new AppError('Email ou senha invalidos',401)
    }

    const token = this.jwtService.sign(user.id)

    return token
  }

}

export { LoginUseCase }