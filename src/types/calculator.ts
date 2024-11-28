export type MeasurementSystem = "metric" | "imperial";
export type Gender = "male" | "female";

export type Formula =
  | "ymca"
  | "mymca"
  | "covert"
  | "jack7"
  | "jack4"
  | "jack3"
  | "parrillo"
  | "durnin"
  | "navy";

export interface CalculatorInputs {
  gender?: Gender;
  measurementSystem?: MeasurementSystem;
  age?: number;
  weight?: number;
  height?: number;
  neckCircumference?: number;
  waistCircumference?: number;
  hipsCircumference?: number;
  chestCircumference?: number;
  abdomenCircumference?: number;
  thighCircumference?: number;
  calfCircumference?: number;
  bicepCircumference?: number;
  tricepCircumference?: number;
  forearmCircumference?: number;
  wristCircumference?: number;
  chestSkinfold?: number;
  abdomenSkinfold?: number;
  thighSkinfold?: number;
  tricepSkinfold?: number;
  bicepSkinfold?: number;
  subscapularSkinfold?: number;
  suprailiacSkinfold?: number;
  midaxillarySkinfold?: number;
  lowerBackSkinfold?: number;
  calfSkinfold?: number;
  originalWeight?: number;
  originalAbdomenCircumference?: number;
  originalNeckCircumference?: number;
}

export interface CalculatorResults {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  classification: string;
}
