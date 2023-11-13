import { Treatment, TreatmentType } from "./Treatment";

abstract class TreatmentFactory {
  abstract createTreatment(cost: number, duration: number): Treatment;
}

export class CleaningsFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.Cleanings, cost, duration);
  }
}

export class WhiteningFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.Whitening, cost, duration);
  }
}

export class FillingFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.Filling, cost, duration);
  }
}

export class NerveFillingFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.NerveFilling, cost, duration);
  }
}

export class RootCanalTherapyFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.RootCanalTherapy, cost, duration);
  }
}

// Repeat for other TreatmentTypes...

// Usage:
//   const factory = new CleaningsFactory();
//   const treatment = factory.createTreatment(100, 30);
