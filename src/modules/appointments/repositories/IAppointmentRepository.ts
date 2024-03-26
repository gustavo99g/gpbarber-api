import { ICreateAppointment } from "../useCases/createAppointment/CreateAppointmentUseCase"




interface Appointment{
  id: string
  provider_id: string
  client_id: string
  date: Date
  created_at: Date
  updated_at: Date
}

export interface IAppointmentRepository{
  create(data: ICreateAppointment): Promise<void>
  getMonthAppointments(endDate: Date): Promise<Appointment[]>
  getDayAppointments(date: Date,provider_id:string): Promise<Appointment[]>
  findByDate(date: Date,provider_id:string): Promise<Appointment | null>
}