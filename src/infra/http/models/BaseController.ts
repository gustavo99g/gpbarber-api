import { Request, Response } from "express";
import { AppError } from "../error/AppError";

abstract class BaseController {
  abstract execute (request: Request, response?: Response): Promise<any>


  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      return await this.execute(request, response)
    } catch (err :any) {

      if (err instanceof AppError) {
        return response.status(err.statusCode).json({ error: err.message })
      }
      

      return response.status(500).json({ error: 'Internal server error',message: err.message})
    }
  }

  public ok<T>(response: Response, data: T): Response {
    return response.status(200).json(data)
  }


  public created<T>(response: Response): Response {
    return response.status(201).send()
  }



}



export { BaseController }