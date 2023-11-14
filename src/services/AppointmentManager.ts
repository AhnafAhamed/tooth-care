import { Appointment } from "./Appointment";
import { DateValue } from "@mantine/dates";
export class AppointmentManager {
  private static instance: AppointmentManager;
  private appointments: Map<number, Appointment> = new Map();

  private constructor() {}

  public static getInstance(): AppointmentManager {
    if (!AppointmentManager.instance) {
      AppointmentManager.instance = new AppointmentManager();
    }
    return AppointmentManager.instance;
  }

  public addAppointment(appointment: Appointment): void {
    this.appointments.set(appointment.getId(), appointment);
  }

  public getAppointmentById(id: number): Appointment | undefined {
    return this.appointments.get(id);
  }

  public getAppointmentByDate(date: DateValue): Appointment[] | undefined {
    if (!date) return;
    return Array.from(this.appointments.values()).filter((appointment) => {
      const appointmentDate = new Date(appointment.time);
      return (
        appointmentDate.getFullYear() === date.getFullYear() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getDate() === date.getDate()
      );
    });
  }

  public removeAppointment(id: number): void {
    this.appointments.delete(id);
  }

  public getAllAppointments(): Appointment[] {
    return Array.from(this.appointments.values());
  }

  public payAppointment(id: number): void {
    const appointment = this.appointments.get(id);
    if (!appointment) return;
    appointment.payTreatment();
  }
}
