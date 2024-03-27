import { z } from "zod"
import { Validator } from "../../../../infra/validator/validator"
import { userRepository } from "../../../users/repositories/prisma"
import { appointmentRepository } from "../../repositories/prisma"
import { GetMonthAvailabilityUseCase } from "./GetMonthAvailabilityUseCase"
import { GetMonthAvailabilityController } from "./GetMonthAvailabilityController"

const getMonthAvailabilityUseCase = new GetMonthAvailabilityUseCase(appointmentRepository,userRepository)

const getMonthAvailabilitySchema = z.object({
  month: z.coerce.date(),
  provider_id: z.string().uuid(),
})

const validator = new Validator(getMonthAvailabilitySchema)
const getMonthAvailabilityController = new GetMonthAvailabilityController(getMonthAvailabilityUseCase,validator)




export { getMonthAvailabilityUseCase,getMonthAvailabilityController }