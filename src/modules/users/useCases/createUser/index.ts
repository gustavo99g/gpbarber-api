import { z } from 'zod'
import { cryptoService } from '../../../../infra/crypto/bcrypt'
import { userRepository } from '../../repositories/prisma'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'
import { Validator } from '../../../../infra/validator/validator'


const createUserSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 letras' }),
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 letras' }),
  isProvider: z.boolean().optional()
})

const createUserUseCase = new CreateUserUseCase(userRepository,cryptoService)
const validator = new Validator(createUserSchema)
const createUserController = new CreateUserController(createUserUseCase,validator)


export { createUserController }
