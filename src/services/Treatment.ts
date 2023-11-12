enum TreatmentType {
  Cleanings = "Cleanings",
  Whitening = "Whitening",
  Filling = "Filling",
  NerveFilling = "Nerve Filling",
  RootCanalTherapy = "Root Canal Therapy",
}

export class Treatment {
  name: TreatmentType;
  cost: number;
  duration: number;

  constructor(name: TreatmentType, cost: number, duration: number) {
    this.name = name;
    this.cost = cost;
    this.duration = duration;
  }
}
