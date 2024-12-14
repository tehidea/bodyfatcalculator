import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";

/**
 * YMCA formula implementation
 * This formula uses waist circumference and weight to estimate body fat percentage.
 */
export const ymcaFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const { gender, weight = 0, waist = 0 } = inputs;

    // Convert to imperial for calculation (formula was designed for imperial units)
    const weightLbs = convertMeasurement(weight, "weight", "metric", "imperial");
    const waistInches = convertMeasurement(waist, "length", "metric", "imperial");

    // Calculate body fat percentage
    const bodyFatPercentage =
      gender === "male"
        ? (100 * (4.15 * waistInches - 0.082 * weightLbs - 98.42)) / weightLbs
        : (100 * (4.15 * waistInches - 0.082 * weightLbs - 76.76)) / weightLbs;

    // Calculate fat mass and lean mass
    const fatMass = (bodyFatPercentage / 100) * weight;
    const leanMass = weight - fatMass;

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  requiredFields: ["gender", "weight", "waist"],

  applicableGenders: ["male", "female"],

  description:
    "The YMCA formula is a simple method that uses waist circumference and body weight " +
    "to estimate body fat percentage. While not as accurate as more comprehensive methods, " +
    "it provides a quick assessment without requiring specialized equipment.",

  references: ["YMCA of the USA. (2000). YMCA Fitness Testing and Assessment Manual. 4th ed."],
};
