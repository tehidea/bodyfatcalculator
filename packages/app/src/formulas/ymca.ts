import { z } from "zod";
import { formulaSchemas, MeasurementSystem } from "../schemas/calculator";
import { convertMeasurement } from "../utils/conversions";
import { calculateBodyFat } from "./utils";

type YMCAInputs = z.infer<ReturnType<ReturnType<(typeof formulaSchemas)["ymca"]>>>;
type FormulaResult = { bodyFatPercentage: number; fatMass: number; leanMass: number };

/**
 * YMCA Formula for body fat percentage calculation
 * This formula uses weight and waist circumference to estimate body fat percentage.
 */
export const ymcaFormula = {
  calculate: (inputs: YMCAInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const { gender, weight = 0, waistCircumference = 0 } = inputs;

    // Get values in imperial units for the formula calculation
    const weightLbs =
      measurementSystem === "metric"
        ? convertMeasurement(weight, "weight", "metric", "imperial")
        : weight;
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference, "length", "metric", "imperial")
        : waistCircumference;

    // Calculate body fat percentage using imperial units
    const bodyFatPercentage =
      gender === "male"
        ? (100 * (4.15 * waistInches - 0.082 * weightLbs - 98.42)) / weightLbs
        : (100 * (4.15 * waistInches - 0.082 * weightLbs - 76.76)) / weightLbs;

    // For mass calculations, ensure we're using metric weight
    const weightKg =
      measurementSystem === "metric"
        ? weight
        : convertMeasurement(weight, "weight", "imperial", "metric");

    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weightKg);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },
};
