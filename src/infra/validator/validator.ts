import {  ZodSchema } from "zod";
import { AppError } from "../http/error/AppError";

class Validator {
  constructor(private schema:ZodSchema) {}

  handle(data: unknown) {
    try {

      return this.schema.parse(data)
      
    } catch (error:any) {
      
        throw new AppError(error.formErrors,400)
      
    }
  }

}

export {Validator}