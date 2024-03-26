import { z } from "zod";
import { Validator } from "../../../../infra/validator/validator";
import { appointmentRepository } from "../../repositories/prisma";
import { GetDayAvailabilityUseCase } from "./getDayAvailabilityUseCase";
import { GetDayAvailabilityController } from "./getDayAvailabilityController";
import { userRepository } from "../../../users/repositories/prisma";


const getDayAvailabilityUseCase = new GetDayAvailabilityUseCase(appointmentRepository,userRepository)

const getDayAvailabilitySchema = z.object({
  day: z.coerce.date(),
  provider_id: z.string().uuid(),
})

const validator = new Validator(getDayAvailabilitySchema)

const getDayAvailabilityController = new GetDayAvailabilityController(getDayAvailabilityUseCase,validator)


export {getDayAvailabilityController}