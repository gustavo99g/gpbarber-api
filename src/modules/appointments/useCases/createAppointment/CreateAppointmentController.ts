import { Request, Response } from "express";
import { BaseController } from "../../../../infra/http/models/BaseController";
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase";
import { Validator } from "../../../../infra/validator/validator";

class CreateAppointmentController extends BaseController{

  constructor(
    private readonly createAppointment: CreateAppointmentUseCase,
    private readonly validator:Validator
  ){
    super()
  }
  async execute(req:Request, res:Response) {

    const userId = req.userId

    const {date,provider_id} = this.validator.handle(req.body)


    await this.createAppointment.execute({client_id:userId,date,provider_id})
    return this.created(res)
  }
}

export { CreateAppointmentController }