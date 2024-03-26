import { Request, Response } from "express"
import { BaseController } from "../../../../infra/http/models/BaseController"
import { Validator } from "../../../../infra/validator/validator"
import { GetDayAvailabilityUseCase } from "./getDayAvailabilityUseCase"

class GetDayAvailabilityController extends BaseController{
  constructor(
    private readonly getDayAvailability: GetDayAvailabilityUseCase,
    private readonly validator:Validator
  ){
    super()
  }
  async execute(req:Request, res:Response){

    const {day,provider_id}=this.validator.handle(req.query)

    const availability = await this.getDayAvailability.execute({
      day,
      provider_id
    })
    return this.ok(res,availability)
  }
}


export{GetDayAvailabilityController}