import { z } from "zod";
import { Validator } from "../../../../infra/validator/validator";
import { userRepository } from "../../../users/repositories/prisma";
import { appointmentRepository } from "../../repositories/prisma";
import { GetDailyAppointmentsUseCase } from "./GetDailyAppointmentUseCase";
import { GetDailyAppointmentsController } from "./GetDailyAppointmentController";

const getDailyAppointmentsSchema = z.object({
  date: z.coerce.date(),
  provider_id: z.string().uuid(),
})

const getDailyAppointmentsUseCase = new GetDailyAppointmentsUseCase(appointmentRepository,userRepository)
const validator = new Validator(getDailyAppointmentsSchema)

const getDailyAppointmentsController = new GetDailyAppointmentsController(getDailyAppointmentsUseCase,validator)


export {getDailyAppointmentsController}