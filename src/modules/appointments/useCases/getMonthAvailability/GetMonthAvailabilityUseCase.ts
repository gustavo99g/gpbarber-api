import { getDay, getDaysInMonth, getMonth, parseISO } from "date-fns"
import { AppError } from "../../../../infra/http/error/AppError"
import { IUsersRepository } from "../../../users/repositories/IUsersRepository"
import { IAppointmentRepository } from "../../repositories/IAppointmentRepository"




interface IGetMonthAvailability {
  month: Date
  provider_id:string
}


class GetMonthAvailabilityUseCase {
  constructor(
    private readonly appointmentRepository:IAppointmentRepository,
    private readonly userRepository: IUsersRepository
    ) {
  }

  async execute({month,provider_id}:IGetMonthAvailability) {

    const provider = await this.userRepository.findById(provider_id)
    if(!provider){
      throw new AppError("Barbeiro nao encontrado",404)
    }
    if(!provider.isProvider){
      throw new AppError("Id inválido",400)
    }

    const daysInMonth = Array.from(
      { length: getDaysInMonth(month) },
      (_, index) => index + 1
    )



    const appointments = await this.appointmentRepository.getMonthAppointments(month,provider_id)
    const monthAvailability = daysInMonth.map(day => {
      return {
        day: new Date(month.getFullYear(), month.getMonth(), day),
        available: appointments.filter(appointment => appointment.date.getUTCDate() === day).length >=10 ? false : true
      }
    })



    return monthAvailability
  }
}

export { GetMonthAvailabilityUseCase }