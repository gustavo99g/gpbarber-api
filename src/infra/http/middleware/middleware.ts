import { NextFunction, request, Request,response,Response } from "express";

class Middleware  {
  constructor(private jwtService:IJWTService) {}

  public checkAuth() {

    return async (request: Request, response: Response, next: NextFunction) => {
      const {authorization} = request.headers


    if(!authorization){
      return response.status(401).json({message: 'Não autorizado'})
    
    }

    const [, token] = authorization.split(' ')

    if(!token){
      return response.status(401).json({message: 'Não autorizado'})
    }
    try {
      const id = this.jwtService.verify(token)
      if(!id){
        return response.status(401).json({message: 'Não autorizado'})
      }
      request.userId = id
      next()
    } catch (err) {
      return response.status(401).json({message: 'Falha na assinatura do token'})
    }
  }
    }

    

}


export { Middleware }