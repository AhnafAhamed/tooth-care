import { Employee } from "./Employee";

export class Receptionist extends Employee {
  private password: string;
  private isAuthenticated: boolean = false;

  constructor(
    id: number,
    name: string,
    age: number,
    address: string,
    phone: number,
    nic: string
  ) {
    super(id, name, age, address, phone, nic);
    this.password = "";
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

  authenticate(password: string): boolean {
    if (this.password === password) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }
}
