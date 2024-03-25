import { Request, Response } from "express";
import { BaseController } from "../../../../infra/http/models/BaseController";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { Validator } from "../../../../infra/validator/validator";

class UpdateUserAvatarController extends BaseController {
  constructor (private readonly useCase: UpdateUserAvatarUseCase,private readonly validator: Validator) {
    super()
  }

  async execute(req: Request,res:Response): Promise<any> {
    const { userId } = req
    const {filename} = this.validator.handle(req.file)
    const user = await this.useCase.execute({userId,filename})
    return this.ok(res,user)
  }

}

export{UpdateUserAvatarController}