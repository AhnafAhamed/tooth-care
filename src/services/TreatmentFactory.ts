import { Treatment, TreatmentType } from "./Treatment";

abstract class TreatmentFactory {
  abstract createTreatment(cost: number, duration: number): Treatment;
}

class CleaningsFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.Cleanings, cost, duration);
  }
}

class WhiteningFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.Whitening, cost, duration);
  }
}

class FillingFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.Filling, cost, duration);
  }
}

class NerveFillingFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.NerveFilling, cost, duration);
  }
}

class RootCanalTherapyFactory extends TreatmentFactory {
  createTreatment(cost: number, duration: number): Treatment {
    return new Treatment(TreatmentType.RootCanalTherapy, cost, duration);
  }
}

const treatmentDetails = [
  { type: new CleaningsFactory(), cost: 1000, duration: 30 },
  { type: new WhiteningFactory(), cost: 2000, duration: 60 },
  { type: new FillingFactory(), cost: 1500, duration: 45 },
  { type: new NerveFillingFactory(), cost: 2500, duration: 60 },
  { type: new RootCanalTherapyFactory(), cost: 3500, duration: 90 },
];

export const treatments = treatmentDetails.map((treatmentDetail) =>
  treatmentDetail.type.createTreatment(
    treatmentDetail.cost,
    treatmentDetail.duration
  )
);
