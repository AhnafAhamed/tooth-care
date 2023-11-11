import { Employee } from "./Employee";

export class Receptionist extends Employee {
  private _password: string;
  private _isAuthenticated: boolean = false;

  constructor(
    id: number,
    name: string,
    age: number,
    address: string,
    phone: number,
    nic: string
  ) {
    super(id, name, age, address, phone, nic);
    this._password = "";
  }

  setPassword(password: string): void {
    this._password = password;
  }

  getPassword(): string {
    return this._password;
  }

  setIsAuthenticated(isAuthenticated: boolean): void {
    this._isAuthenticated = isAuthenticated;
  }

  getIsAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  authenticate(password: string): boolean {
    if (this._password === password) {
      this._isAuthenticated = true;
      return true;
    }
    return false;
  }
}
