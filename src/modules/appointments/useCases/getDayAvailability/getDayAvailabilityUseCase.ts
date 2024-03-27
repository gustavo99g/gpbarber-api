import { getDaysInMonth, getHours, startOfDay } from "date-fns";
import { IAppointmentRepository } from "../../repositories/IAppointmentRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { AppError } from "../../../../infra/http/error/AppError";




interface IGetDayAvailability {
  day: Date
  provider_id:string
}

const commercialHours =[8,9,10,11,12,13,14,15,16,17]

class GetDayAvailabilityUseCase {


  constructor(
    private readonly appointmentRepository:IAppointmentRepository,
    private readonly userRepository: IUsersRepository
    ){ 

  }



  async execute({day,provider_id}:IGetDayAvailability){

    const provider = await this.userRepository.findById(provider_id)
    if(!provider){
      throw new AppError("Barbeiro nao encontrado",404)
    }
    if(!provider.isProvider){
      throw new AppError("Id inválido",400)
    }


    const appointments = await this.appointmentRepository.getDayAppointments(day,provider_id)


    const availableAppointments = commercialHours.map(hour => {
      return {
        hour,
        available: !appointments.find(appointment => getHours(appointment.date) === hour)
      }
    })

    return availableAppointments

  }

}

export {GetDayAvailabilityUseCase}