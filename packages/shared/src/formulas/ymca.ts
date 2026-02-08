import type { MeasurementSystem, FormulaResult, StandardizedInputs } from "../types/index.ts";
import { convertMeasurement } from "../conversions/index.ts";
import { calculateBodyFat } from "./utils.ts";

export const ymcaFormula = {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const { gender, weight = 0, waistCircumference = 0 } = inputs;

    const weightLbs =
      measurementSystem === "metric"
        ? convertMeasurement(weight, "weight", "metric", "imperial")
        : weight;
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference as number, "length", "metric", "imperial")
        : (waistCircumference as number);

    const bodyFatPercentage =
      gender === "male"
        ? (100 * (4.15 * waistInches - 0.082 * weightLbs - 98.42)) / weightLbs
        : (100 * (4.15 * waistInches - 0.082 * weightLbs - 76.76)) / weightLbs;

    const weightKg =
      measurementSystem === "metric"
        ? weight
        : convertMeasurement(weight, "weight", "imperial", "metric");

    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weightKg);

    return { bodyFatPercentage, fatMass, leanMass };
  },
};
