import { Request, Response } from "express";
import { BaseController } from "../../../../infra/http/models/BaseController";
import { GetAllProvidersUseCase } from "./GetAllProvidersUseCase";

class GetAllProvidersController extends BaseController{

  constructor(private readonly useCase: GetAllProvidersUseCase) {
    super();
  }

  async execute(req:Request, res: Response): Promise<Response> {
    const users = await this.useCase.execute()
    return this.ok(res, users)
  }
}


export { GetAllProvidersController }