import { Dentist } from "./Dentist";
import { Patient } from "./Patient";

export class Appointment {
  private static lastId = 0;
  private id: number;
  time: string;
  patient: Patient;
  dentist: Dentist;
  private isRegistrationPaid: boolean = false;
  private isTreatmentPaid: boolean = false;

  constructor(time: string, patient: Patient, dentist: Dentist) {
    this.id = Appointment.lastId++;
    this.time = time;
    this.patient = patient;
    this.dentist = dentist;
  }

  public getId(): number {
    return this.id;
  }

  public getIsRegistrationPaid(): boolean {
    return this.isRegistrationPaid;
  }

  public payRegistration(): void {
    this.isRegistrationPaid = true;
  }

  public getIsTreatmentPaid(): boolean {
    return this.isTreatmentPaid;
  }

  public payTreatment(): void {
    this.isTreatmentPaid = true;
  }

  public getPatientName(): string {
    return this.patient.name;
  }

  public getDentistName(): string {
    return this.dentist.name;
  }

  public getPatientPhone(): number {
    return this.patient.phone;
  }
}
