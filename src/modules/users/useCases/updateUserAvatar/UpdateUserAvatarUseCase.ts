import { AppError } from "../../../../infra/http/error/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";


interface IUpdateUserAvatar {
  userId: string
  filename: string
}

class UpdateUserAvatarUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly storageProvider :IStorageProvider
    ) {}
  async execute({userId,filename}: IUpdateUserAvatar) {



    const user = await this.usersRepository.findById(userId)

    if(!user){
      throw new AppError('Usuario nao encontrado',404)
    }
    if(user.avatar){
      await this.storageProvider.delete(user.avatar,"avatar")
    }
    await this.storageProvider.save(filename,"avatar")
    user.avatar = filename

    await this.usersRepository.save(user)
    return {
      id: user.id,
      avatar:user.avatar
    }


  }
}
export { UpdateUserAvatarUseCase }