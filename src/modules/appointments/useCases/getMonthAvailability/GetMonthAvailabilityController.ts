import { Request, Response } from "express";
import { BaseController } from "../../../../infra/http/models/BaseController";
import { Validator } from "../../../../infra/validator/validator";
import { GetMonthAvailabilityUseCase } from "./GetMonthAvailabilityUseCase";

class GetMonthAvailabilityController extends BaseController{

  constructor(
    private readonly getMonthAvailability: GetMonthAvailabilityUseCase,
    private readonly validator:Validator
  ){
    super()
  }

  async execute(req:Request, res:Response){
    const {provider_id,month}=this.validator.handle(req.query)
    const availability = await this.getMonthAvailability.execute({
      month,
      provider_id,

    })
    return this.ok(res,availability)
  }
}


export { GetMonthAvailabilityController }