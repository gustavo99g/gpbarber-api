import { ICryptoService } from "../../../../infra/crypto/ICryptoService";
import { AppError } from "../../../../infra/http/error/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";




export interface IUpdateUser {
  id: string
  name?: string
  email?: string
  newPassword?: string
  currentPassword: string
}


class UpdateUserUseCase {

  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly cryptoService: ICryptoService
    
    ) {}
  async execute({currentPassword,newPassword,email,name,id}: IUpdateUser) {

    const user = await this.usersRepository.findById(id)
    if(!user){
      throw new AppError('Usuario nao encontrado',404)
    }

    if(email){
      user.email = email
    }
    if(name){
      user.name = name
    }

    if(newPassword && currentPassword){
      const matchPassword = await this.cryptoService.compare(currentPassword, user.password)
      if(!matchPassword){
        throw new AppError('Senha atual invalida',401)
      }
      user.password = await this.cryptoService.hash(newPassword)
    }

   
  
    await this.usersRepository.save(user)



    return {
      id: user.id,
      name: user.name,
      email: user.email
    }


  }
}

export { UpdateUserUseCase }