import { prisma } from "../../../../infra/prisma/client";
import {addDays,endOfDay,endOfMonth,startOfDay,startOfMonth,subDays} from 'date-fns'
import { ICreateAppointment } from "../../useCases/createAppointment/CreateAppointmentUseCase";
import { IAppointmentRepository } from "../IAppointmentRepository";



class AppointmentRepository implements IAppointmentRepository {
  async create({ date, provider_id, client_id }: ICreateAppointment) {
    await prisma.appointment.create({
      data: {
        date,
        provider_id,
        client_id,
      },
    });
  }

  async getDayAppointments(date: Date,provider_id:string) {
    const appointments = await prisma.appointment.findMany({
      where: {
        provider_id,
        date:{
          gt: startOfDay(date),
          lt: endOfDay(date),
        },
      },
    });
    return appointments;
  }

  async getMonthAppointments(date: Date) {
    const appointments = await prisma.appointment.findMany({
      where: {
        date:{
          gt: startOfMonth(date),
          lt: endOfMonth(date),
        },
      },
    });
    return appointments;
  }

  async findByDate(date: Date,provider_id:string) {
    const appointment = await prisma.appointment.findFirst({
      where: {
        date,
        provider_id
      },
    });
    return appointment;
  }

}

export { AppointmentRepository }