import { Request, Response } from "express";
import { BaseController } from "../../../../infra/http/models/BaseController";
import { Validator } from "../../../../infra/validator/validator";
import { UpdateUserUseCase } from "./UpdateUserUseCase";



class UpdateUserController extends BaseController {
  constructor (private readonly useCase: UpdateUserUseCase,private readonly validator: Validator) {
    super()
  }

  async execute (req: Request, res: Response): Promise<Response> {
    const id = req.userId
    const { name, email, currentPassword,newPassword } = this.validator.handle(req.body)


    await this.useCase.execute({ id, name, email, currentPassword,newPassword })

    return this.ok(res, 'Usuario atualizado com sucesso')
}

}

export { UpdateUserController }