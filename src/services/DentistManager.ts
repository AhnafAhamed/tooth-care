import { Dentist } from "./Dentist";

export class DentistManager {
  private registeredDentists: Dentist[] = [];

  registerDentist(dentist: Dentist): void {
    this.registeredDentists.push(dentist);
  }

  getAllDentists(): Dentist[] {
    return this.registeredDentists;
  }

  getDentistById(dentistId: number): Dentist | undefined {
    return this.registeredDentists.find((r) => r.id === dentistId);
  }
}
