import { Router } from "express"
import { middleware } from "../middleware"
import { createAppointmentController } from "../../../modules/appointments/useCases/createAppointment"


const appointmentRouter = Router()


appointmentRouter.post('/',middleware.checkAuth(), (req,res)=> createAppointmentController.handle(req,res))


export{ appointmentRouter } 
