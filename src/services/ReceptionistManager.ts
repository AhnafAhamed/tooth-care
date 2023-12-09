import { Receptionist } from "./Receptionist";

export class ReceptionistManager {
  private registeredReceptionists: Receptionist[] = [];

  registerReceptionist(receptionist: Receptionist): void {
    this.registeredReceptionists.push(receptionist);
  }

  authenticateReceptionist(receptionistId: number, password: string): boolean {
    const receptionist = this.registeredReceptionists.find(
      (r) => r.id === receptionistId
    );

    if (receptionist && receptionist.authenticate(password)) {
      return true;
    }

    return false;
  }

  getAllReceptionists(): Receptionist[] {
    return this.registeredReceptionists;
  }

  getReceptionistById(receptionistId: number): Receptionist | undefined {
    return this.registeredReceptionists.find((r) => r.id === receptionistId);
  }

  generateReceptionistId(): number {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  // Other methods for managing receptionists
}
