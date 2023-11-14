import { Appointment } from "./Appointment";
export class AppointmentManager {
  private appointments: Map<number, Appointment> = new Map();

  public addAppointment(appointment: Appointment): void {
    this.appointments.set(appointment.getId(), appointment);
  }

  public getAppointmentById(id: number): Appointment | undefined {
    return this.appointments.get(id);
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
