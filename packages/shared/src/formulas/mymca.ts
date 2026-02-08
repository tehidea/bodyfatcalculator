import type { MeasurementSystem, FormulaResult, StandardizedInputs } from "../types/index.ts";
import { convertMeasurement } from "../conversions/index.ts";
import { calculateBodyFat } from "./utils.ts";

export const mymcaFormula = {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      weight = 0,
      waistCircumference = 0,
      wristCircumference = 0,
      forearmCircumference = 0,
      hipsCircumference = 0,
    } = inputs;

    const weightLbs =
      measurementSystem === "metric"
        ? convertMeasurement(weight, "weight", "metric", "imperial")
        : weight;
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference as number, "length", "metric", "imperial")
        : (waistCircumference as number);
    const wristInches =
      measurementSystem === "metric"
        ? convertMeasurement(wristCircumference as number, "length", "metric", "imperial")
        : (wristCircumference as number);
    const forearmInches =
      measurementSystem === "metric"
        ? convertMeasurement(forearmCircumference as number, "length", "metric", "imperial")
        : (forearmCircumference as number);
    const hipsInches =
      measurementSystem === "metric"
        ? convertMeasurement(hipsCircumference as number, "length", "metric", "imperial")
        : (hipsCircumference as number);

    const bodyFatPercentage =
      gender === "male"
        ? ((4.15 * waistInches - 0.082 * weightLbs - 94.42) / weightLbs) * 100
        : ((0.268 * weightLbs -
            0.318 * wristInches +
            0.157 * waistInches +
            0.245 * hipsInches -
            0.434 * forearmInches -
            8.987) /
            weightLbs) *
          100;

    const weightKg =
      measurementSystem === "metric"
        ? weight
        : convertMeasurement(weight, "weight", "imperial", "metric");

    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weightKg);

    return { bodyFatPercentage, fatMass, leanMass };
  },
};
