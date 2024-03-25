import { z } from "zod";
import { localStorageProvider } from "../../../../infra/storage/localStorage";
import { userRepository } from "../../repositories/prisma";
import { UpdateUserAvatarController } from "./UpdateUserAvatarController";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { Validator } from "../../../../infra/validator/validator";

const updateAvatarUseCase = new UpdateUserAvatarUseCase(userRepository,localStorageProvider)

const updateAvatarSchema = z.object({
  filename: z.string()
})
const validator = new Validator(updateAvatarSchema)
const updateAvatarController = new UpdateUserAvatarController(updateAvatarUseCase,validator)


export { updateAvatarController }