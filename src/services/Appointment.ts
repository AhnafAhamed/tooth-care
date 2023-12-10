import { Dentist } from "./Dentist";
import { Patient } from "./Patient";
import { Treatment } from "./Treatment";

export class Appointment {
  private static lastId = 0;
  private id: number;
  private treatments: Treatment[] | null = null;
  private isRegistrationPaid: boolean = false;
  private isTreatmentPaid: boolean = false;
  time: string;
  patient: Patient;
  dentist: Dentist;

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

  public setTreatment(treatments: Treatment[]): void {
    this.treatments = treatments;
  }

  public getTreatments(): Treatment[] | null {
    return this.treatments;
  }

  public getAppointmentFee(): number {
    if (!this.treatments) return 0;
    return this.treatments.reduce((acc, treatment) => {
      return acc + treatment.cost;
    }, 0);
  }
}
