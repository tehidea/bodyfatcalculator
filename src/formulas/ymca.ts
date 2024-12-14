import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";

/**
 * YMCA formula implementation
 * This formula uses waist circumference and weight to estimate body fat percentage.
 */
export const ymcaFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const { gender, weight = 0, waistCircumference = 0 } = inputs;

    // Convert to imperial for calculation (formula was designed for imperial units)
    const weightLbs = convertMeasurement(weight, "weight", "metric", "imperial");
    const waistInches = convertMeasurement(waistCircumference, "length", "metric", "imperial");

    // Calculate body fat percentage
    const bodyFatPercentage =
      gender === "male"
        ? (100 * (4.15 * waistInches - 0.082 * weightLbs - 98.42)) / weightLbs
        : (100 * (4.15 * waistInches - 0.082 * weightLbs - 76.76)) / weightLbs;

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weight);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  name: "YMCA",
  marginOfError: "5-7",

  requiredFields: ["gender", "weight", "waistCircumference"],

  description:
    "A simple method using waist circumference and body weight, providing quick results without specialized equipment.",

  references: ["YMCA of the USA. (2000). YMCA Fitness Testing and Assessment Manual. 4th ed."],
};
