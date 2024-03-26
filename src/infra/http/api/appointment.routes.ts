import { Router } from "express"
import { middleware } from "../middleware"
import { createAppointmentController } from "../../../modules/appointments/useCases/createAppointment"
import { getDayAvailabilityController } from "../../../modules/appointments/useCases/getDayAvailability"


const appointmentRouter = Router()

appointmentRouter.use(middleware.checkAuth())


appointmentRouter.post('/', (req,res)=> createAppointmentController.handle(req,res))
appointmentRouter.get('/day-availability', (req,res)=> getDayAvailabilityController.handle(req,res))


export{ appointmentRouter } 
