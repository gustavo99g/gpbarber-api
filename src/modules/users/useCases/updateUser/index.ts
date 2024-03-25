import { z } from "zod";
import { cryptoService } from "../../../../infra/crypto/bcrypt";
import { Validator } from "../../../../infra/validator/validator";
import { userRepository } from "../../repositories/prisma";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

const updateUserSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 letras' }).optional(),
  email: z.string().email('Formato de e-mail inválido').optional(),
  currentPassword: z.string().min(6, { message: 'A senha deve ter pelo menos 6 letras' }).optional(),
  newPassword: z.string().min(6, { message: 'A senha deve ter pelo menos 6 letras' }).optional(),
  confirmPassword: z.string().min(6, { message: 'A senha deve ter pelo menos 6 letras' }).optional(),

}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'As senhas precisam ser iguais',
  path: ['confirmPassword']
})

const updateUserUseCase = new UpdateUserUseCase(userRepository,cryptoService)
const validator = new Validator(updateUserSchema)

const updateUserController = new UpdateUserController(updateUserUseCase,validator)


export { updateUserController }