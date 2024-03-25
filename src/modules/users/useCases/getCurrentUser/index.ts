import { getUserByIdUseCase, getUserByIdController } from "../getUserById";
import { GetCurrentUserController } from "./getCurrentUserController";

const getCurrentUserController = new GetCurrentUserController(getUserByIdUseCase)

export { getCurrentUserController }