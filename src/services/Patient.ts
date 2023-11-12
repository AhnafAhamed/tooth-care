import { Person } from "./Person";

export class Patient extends Person {
  static idCounter = 0;

  constructor(
    name: string,
    age: number,
    address: string,
    phone: number,
    NIC: string
  ) {
    super(Patient.idCounter++, name, age, address, phone, NIC);
  }
}
