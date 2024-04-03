import { User } from "../../users/repositories/IUsersRepository"
import { ICreateAppointment } from "../useCases/createAppointment/CreateAppointmentUseCase"




interface Appointment{
  id: string
  provider_id: string
  client_id: string
  date: Date
  created_at: Date
  updated_at: Date
  client?:User
}

export interface IAppointmentRepository{
  create(data: ICreateAppointment): Promise<void>
  getMonthAppointments(endDate: Date,provider_id:string): Promise<Appointment[]>
  getDayAppointments(date: Date,provider_id:string): Promise<Appointment[]>
  findByDate(date: Date,provider_id:string): Promise<Appointment | null>
  getAllDayAppointments(date: Date,provider_id:string): Promise<Appointment[]>

}