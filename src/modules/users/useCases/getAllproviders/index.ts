import { userRepository } from "../../repositories/prisma";
import { GetAllProvidersController } from "./GetAllProvidersController";
import { GetAllProvidersUseCase } from "./GetAllProvidersUseCase";

const getAllProvidersUseCase = new GetAllProvidersUseCase(userRepository)

const getAllProvidersController = new GetAllProvidersController(getAllProvidersUseCase)



export { getAllProvidersUseCase,getAllProvidersController }