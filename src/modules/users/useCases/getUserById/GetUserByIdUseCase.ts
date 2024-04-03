import { storageUrl } from "../../../../config/storage";
import { AppError } from "../../../../infra/http/error/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class GetUserByIdUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(id:string) {

    const user = await this.usersRepository.findById(id)
    if(!user){
      throw new AppError('Usuario nao encontrado',404)
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar:storageUrl+ user.avatar,
      isProvider: user.isProvider
    }



  }
}

export { GetUserByIdUseCase }