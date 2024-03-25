import { z } from "zod";
import { userRepository } from "../../../users/repositories/prisma";
import { appointmentRepository } from "../../repositories/prisma";
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase";
import { CreateAppointmentController } from "./CreateAppointmentController";
import { Validator } from "../../../../infra/validator/validator";

const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository,userRepository)

const createAppointmentSchema = z.object({
  provider_id: z.string().uuid(),
  date: z.coerce.date().min(new Date(),{message:"Vocẽ nao pode agendar um horário no passado"}),
})

const validator = new Validator(createAppointmentSchema)

const createAppointmentController = new CreateAppointmentController(createAppointmentUseCase,validator)

export {createAppointmentController}