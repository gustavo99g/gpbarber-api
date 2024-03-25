import { z } from "zod";
import { cryptoService } from "../../../../infra/crypto/bcrypt";
import { jwtService } from "../../../../infra/JWT/jwt";
import { Validator } from "../../../../infra/validator/validator";
import { userRepository } from "../../repositories/prisma";
import { LoginUseCase } from "./LoginUseCase";
import { LoginController } from "./LoginController";

const loginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 letras' })
})

const loginUseCase = new LoginUseCase(userRepository,cryptoService,jwtService)
const validator = new Validator(loginSchema)
const loginController = new LoginController(loginUseCase,validator)


export { loginController }