import { getHours, isToday } from "date-fns"
import { storageUrl } from "../../../../config/storage"
import { AppError } from "../../../../infra/http/error/AppError"
import { IUsersRepository } from "../../../users/repositories/IUsersRepository"
import { IAppointmentRepository } from "../../repositories/IAppointmentRepository"



interface IGetDailyAppointments{
  date: Date
  provider_id:string
}


class GetDailyAppointmentsUseCase {
  constructor(
    private readonly appointmentRepository:IAppointmentRepository,
    private readonly userRepository: IUsersRepository
    
    ) {}


  async execute({date,provider_id}:IGetDailyAppointments) {


    const user = await this.userRepository.findById(provider_id)
    if(!user){
      throw new AppError('Usuario nao encontrado',404)
    }

    if(!user.isProvider){
      throw new AppError("Id inválido",400)
    }

    const appointments = await this.appointmentRepository.getAllDayAppointments(date,provider_id)

    const formattedAppointments = appointments.map(appointment => {
      return {
        id: appointment.id,
        date: appointment.date.toLocaleString(),
        client: {
          id:appointment.client?.id,
          name:appointment.client?.name,
          avatar:storageUrl+appointment.client?.avatar
        }
      }
    })

    if(isToday(date)){

      const nextAppointment = formattedAppointments[0]
      const resAppointments = formattedAppointments.slice(1)
      return {
        nextAppointment,
        morning: resAppointments.filter(appointment => getHours(appointment.date) < 12),
        afternoon: resAppointments.filter(appointment => getHours(appointment.date) >= 12)
      }
    }



    return {
      morning: formattedAppointments.filter(appointment => getHours(appointment.date) < 12),
        afternoon: formattedAppointments.filter(appointment => getHours(appointment.date) >= 12)
    }
  }


}

export { GetDailyAppointmentsUseCase }