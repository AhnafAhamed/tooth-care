import { Person } from "./Person";

export interface ISchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export class Dentist extends Person {
  private _schedules: ISchedule[] = [];
  private _slmcId: string = "";
  constructor(
    id: number,
    name: string,
    age: number,
    address: string,
    phone: number,
    nic: string
  ) {
    super(id, name, age, address, phone, nic);
  }

  setSchedules(schedules: ISchedule[]): void {
    this._schedules = schedules;
  }

  getSchedules(): ISchedule[] {
    return this._schedules;
  }

  setSlmcId(slmcId: string): void {
    this._slmcId = slmcId;
  }

  getSlmcId(): string {
    return this._slmcId;
  }
}
