import { type Request, type Response } from 'express'
import { type CreateUserUseCase } from './CreateUserUseCase'
import { BaseController } from '../../../../infra/http/models/BaseController'
import { Validator } from '../../../../infra/validator/validator'

class CreateUserController extends BaseController {
  constructor (private readonly useCase: CreateUserUseCase,
          private readonly validator: Validator
    ) {
      super()
  }


  async execute (req: Request, res: Response): Promise<Response> {
    const { email, name, password,isProvider } = this.validator.handle(req.body)

    await this.useCase.execute({ name, email, password,isProvider })

    return this.created(res)
  }
}

export { CreateUserController}
