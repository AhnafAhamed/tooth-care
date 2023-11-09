export abstract class Person {
  id: number;
  name: string;
  age: number;
  address: string;
  phone: number;
  NIC: string;

  constructor(
    id: number,
    name: string,
    age: number,
    address: string,
    phone: number,
    NIC: string
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.address = address;
    this.phone = phone;
    this.NIC = NIC;
  }
}
