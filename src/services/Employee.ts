import { Person } from "./Person";

export class Employee extends Person {
  employeeId: number;

  constructor(
    id: number,
    name: string,
    age: number,
    address: string,
    phone: number,
    NIC: string,
    employeeId: number
  ) {
    super(id, name, age, address, phone, NIC);
    this.employeeId = employeeId;
  }
}
