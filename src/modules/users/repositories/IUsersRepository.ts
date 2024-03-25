import { type ICreateUser } from '../useCases/createUser/CreateUserUseCase'

export interface User {
  id: string
  name: string
  email: string
  avatar:string | null
  password: string
  isProvider:boolean
  created_at: Date
  updated_at: Date
}

export interface IUsersRepository {
  create: (user: ICreateUser) => Promise<void>
  getAllProviders: () => Promise<User[]>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
  save: (user: User) => Promise<void>
}
