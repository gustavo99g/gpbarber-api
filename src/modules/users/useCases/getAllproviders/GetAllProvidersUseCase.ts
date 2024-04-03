import { avatarFolder, storageUrl } from "../../../../config/storage";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class GetAllProvidersUseCase {
  constructor (private readonly usersRepository: IUsersRepository) {
    
  }

  async execute() {

    const users = await this.usersRepository.getAllProviders()
    const usersWithoutPassword = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        avatar: storageUrl + user.avatar,

      }
    })
    return usersWithoutPassword
  }

}

export { GetAllProvidersUseCase }