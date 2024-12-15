import { z } from "zod";
import { formulaSchemas } from "../schemas/calculator";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

type NavyInputs = z.infer<ReturnType<ReturnType<(typeof formulaSchemas)["navy"]>>>;
type FormulaResult = { bodyFatPercentage: number; fatMass: number; leanMass: number };

/**
 * U.S. Navy formula implementation
 * This formula uses circumference measurements and height to estimate body fat percentage.
 * It's widely used in the U.S. military for its simplicity and reasonable accuracy.
 */
export const navyFormula = {
  calculate: (inputs: NavyInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      weight = 0,
      height = 0,
      neckCircumference = 0,
      waistCircumference = 0,
      hipsCircumference = 0,
    } = inputs;

    // Get values in imperial units for the formula calculation
    const heightInches =
      measurementSystem === "metric"
        ? convertMeasurement(height, "length", "metric", "imperial")
        : height;
    const neckInches =
      measurementSystem === "metric"
        ? convertMeasurement(neckCircumference, "length", "metric", "imperial")
        : neckCircumference;
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference, "length", "metric", "imperial")
        : waistCircumference;
    const hipsInches =
      measurementSystem === "metric"
        ? convertMeasurement(hipsCircumference, "length", "metric", "imperial")
        : hipsCircumference;

    // Calculate body fat percentage using gender-specific formulas
    const bodyFatPercentage =
      gender === "male"
        ? 86.01 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76
        : 163.205 * Math.log10(waistInches + hipsInches - neckInches) -
          97.684 * Math.log10(heightInches) -
          78.387;

    // For mass calculations, ensure we're using metric weight
    const weightKg =
      measurementSystem === "metric"
        ? weight
        : convertMeasurement(weight, "weight", "imperial", "metric");

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weightKg);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },
};
