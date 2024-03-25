import { Request, Response } from "express";
import { BaseController } from "../../../../infra/http/models/BaseController";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

class GetUserByIdController extends BaseController {
  constructor (private readonly useCase: GetUserByIdUseCase) {
    super()
  }

  async execute(req: Request, res: Response): Promise<Response> {
    const { userId } = req
    const user = await this.useCase.execute(userId)
    return this.ok(res, user)
  }


}

export {GetUserByIdController}