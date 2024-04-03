import { Request, Response } from "express";
import { BaseController } from "../../../../infra/http/models/BaseController";
import { GetDailyAppointmentsUseCase } from "./GetDailyAppointmentUseCase";
import { Validator } from "../../../../infra/validator/validator";

class GetDailyAppointmentsController extends BaseController {
  constructor(
    private readonly getDailyAppointments: GetDailyAppointmentsUseCase,
    private readonly validator: Validator
  ) {
    super();
  }
  async execute(req: Request, res: Response) {
    const { date,provider_id } = this.validator.handle(req.query);
    
    const appointments = await this.getDailyAppointments.execute({
      date,
      provider_id,
    });
    return this.ok(res, appointments);
  }
}



export{GetDailyAppointmentsController}