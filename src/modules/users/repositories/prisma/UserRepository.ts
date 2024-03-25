import { prisma } from '../../../../infra/prisma/client'
import { ICreateUser } from '../../useCases/createUser/CreateUserUseCase'
import { type User, type IUsersRepository } from '../IUsersRepository'

class UserRepository implements IUsersRepository {
  async create ({ name, email, password,isProvider }: ICreateUser): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
        isProvider:isProvider as boolean
      } 
    })
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  }

  async findById (id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user
  }

  async save (user: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: user
    })
  }
  async getAllProviders (): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        isProvider: true
      }
    })
    return users
  }
}

export { UserRepository }
