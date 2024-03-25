import { userRepository } from "../../repositories/prisma";
import { GetUserByIdController } from "./GetUserByIdController";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";


const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)

const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)


export { getUserByIdUseCase,getUserByIdController }