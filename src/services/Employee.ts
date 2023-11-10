import { Person } from "./Person";

export abstract class Employee extends Person {
  constructor(
    id: number,
    name: string,
    age: number,
    address: string,
    phone: number,
    NIC: string
  ) {
    super(id, name, age, address, phone, NIC);
  }
}
