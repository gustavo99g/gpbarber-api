import { Request, Response } from "express"
import { BaseController } from "../../../../infra/http/models/BaseController"
import { LoginUseCase } from "./LoginUseCase"
import { Validator } from "../../../../infra/validator/validator"

class LoginController extends BaseController {
  constructor (
    private readonly loginUseCase: LoginUseCase,
    private readonly validator: Validator
  ) {
    super()
  }

  async execute(req: Request, res: Response): Promise<Response> {
    const { email, password } = this.validator.handle(req.body)
    const token = await this.loginUseCase.execute({ email, password })
    return this.ok(res,{ token })
  }
}


  export { LoginController }