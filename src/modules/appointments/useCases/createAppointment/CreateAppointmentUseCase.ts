import { getHours, getMinutes } from "date-fns"
import { AppError } from "../../../../infra/http/error/AppError"
import { IUsersRepository } from "../../../users/repositories/IUsersRepository"
import { IAppointmentRepository } from "../../repositories/IAppointmentRepository"
export interface ICreateAppointment{
  provider_id: string
  client_id: string
  date: Date
}

class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly userRepository: IUsersRepository
    ) {}
  async execute({client_id,date,provider_id}:ICreateAppointment) {
30
    const appointmentHour = getHours(date)
    const appointmentMin = getMinutes(date)

    if(client_id === provider_id){
      throw new AppError("Nao pode agendar para si mesmo",403)
    }
    if(appointmentHour < 8 || appointmentHour > 17){
      throw new AppError("Horário não comercial",400)
    }

   if(appointmentMin !== 0){
      throw new AppError("Horário informado não respeita o intervalo",400)
    }

    const client = await this.userRepository.findById(client_id)
    if(!client){
      throw new AppError("Cliente não encontrado",404)
    }
    const provider = await this.userRepository.findById(provider_id)
    if(!provider){
      throw new AppError("Barbeiro não encontrado",404)
    }


    if(!provider.isProvider){
      throw new AppError("Voce só pode agendar com barbeiros",400)
    }

    const appointmentAlreadyExists = await this.appointmentRepository.findByDate(date,provider_id)
    console.log(appointmentAlreadyExists)
    if(appointmentAlreadyExists){
      throw new AppError("Horário ja agendado",400)
    }

    await this.appointmentRepository.create({
      date,
      provider_id,
      client_id
    })
  }
}


export { CreateAppointmentUseCase }