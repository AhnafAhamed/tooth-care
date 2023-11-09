import { Employee } from "./Employee";

export class Receptionist extends Employee {
  private receptionistId: number;
  private password: string;
  private isAuthenticated: boolean = false;
  constructor(
    id: number,
    name: string,
    age: number,
    address: string,
    phone: number,
    nic: string,
    employeeId: number,
    receptionistId: number
  ) {
    super(id, name, age, address, phone, nic, employeeId);
    this.receptionistId = receptionistId;
    this.password = "";
  }

  setReceptionistId(receptionistId: number): void {
    this.receptionistId = receptionistId;
  }

  getReceptionistId(): number {
    return this.receptionistId;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getPassword(): string {
    return this.password;
  }

  setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
