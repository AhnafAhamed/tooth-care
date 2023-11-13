import { Appointment } from "./Appointment";

export class AppointmentManager {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public addAppointment(appointment: Appointment): void {
    this.appointments.push(appointment);
  }

  public getAllAppointments(): Appointment[] {
    return this.appointments;
  }

  public getAppointmentById(appointmentId: number): Appointment | undefined {
    return this.appointments.find(
      (appointment) => appointment.getId() === appointmentId
    );
  }

  public payAppointment(appointmentId: number): void {
    const appointment = this.appointments.find(
      (appointment) => appointment.getId() === appointmentId
    );
    if (!appointment) return;
    appointment.payTreatment();
  }

  public removeAppointment(appointment: Appointment): void {
    const index = this.appointments.indexOf(appointment);
    if (index !== -1) {
      this.appointments.splice(index, 1);
    }
  }
}
