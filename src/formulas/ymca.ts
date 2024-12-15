import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

/**
 * YMCA Formula for body fat percentage calculation
 *
 * Measurement System Handling:
 * - The formula internally uses imperial units (lbs and inches)
 * - For metric inputs, we convert to imperial before calculation
 * - For imperial inputs, we use the values directly
 * - Results are consistent across measurement systems to 2 decimal places
 *
 * Gender-Specific Formulas:
 * - Male: (100 * (4.15 * waistInches - 0.082 * weightLbs - 98.42)) / weightLbs
 * - Female: (100 * (4.15 * waistInches - 0.082 * weightLbs - 76.76)) / weightLbs
 */
export const ymcaFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const { gender, weight = 0, waistCircumference = 0 } = inputs;

    if (!gender) {
      throw new Error("Gender is required for YMCA formula");
    }

    if (weight === 0 || waistCircumference === 0) {
      throw new Error(
        "Please check your measurements. The calculation resulted in an invalid value."
      );
    }

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

    // Validate results
    if (isNaN(bodyFatPercentage)) {
      throw new Error(
        "Please check your measurements. The calculation resulted in an invalid value."
      );
    }

    if (bodyFatPercentage < 0) {
      throw new Error("Please check your measurements. Body fat percentage cannot be negative.");
    }

    if (bodyFatPercentage > 100) {
      throw new Error("Please check your measurements. Body fat percentage cannot exceed 100%.");
    }

    // For mass calculations, ensure we're using metric weight
    const weightKg =
      measurementSystem === "metric"
        ? weight
        : convertMeasurement(weight, "weight", "imperial", "metric");

    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weightKg);

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
