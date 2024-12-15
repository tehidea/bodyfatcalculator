import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

/**
 * Parillo formula implementation
 * This formula uses nine skinfold measurements and body weight to estimate
 * body fat percentage. It's particularly popular in bodybuilding circles
 * and is known for its comprehensive approach to measuring subcutaneous fat.
 *
 * Measurement System Handling:
 * - The formula internally uses imperial units (lbs)
 * - For metric inputs, we convert to imperial before calculation
 * - For imperial inputs, we use the values directly
 * - Results are consistent across measurement systems to 2 decimal places
 */
export const parilloFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      weight = 0,
      chestSkinfold = 0,
      abdomenSkinfold = 0,
      thighSkinfold = 0,
      bicepSkinfold = 0,
      tricepSkinfold = 0,
      subscapularSkinfold = 0,
      suprailiacSkinfold = 0,
      lowerBackSkinfold = 0,
      calfSkinfold = 0,
    } = inputs;

    if (weight === 0) {
      throw new Error("Weight is required for Parillo formula");
    }

    // Get weight in imperial units for the formula calculation
    const weightLbs =
      measurementSystem === "metric"
        ? convertMeasurement(weight, "weight", "metric", "imperial")
        : weight;

    // Sum all nine skinfold measurements (in mm)
    const sumOfSkinfolds =
      chestSkinfold +
      abdomenSkinfold +
      thighSkinfold +
      bicepSkinfold +
      tricepSkinfold +
      subscapularSkinfold +
      suprailiacSkinfold +
      lowerBackSkinfold +
      calfSkinfold;

    // Calculate body fat percentage using Parillo's formula
    const bodyFatPercentage = (sumOfSkinfolds * 27) / weightLbs;

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

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weightKg);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  name: "Parillo",
  marginOfError: "3-4",

  requiredFields: [
    "weight",
    "chestSkinfold",
    "abdomenSkinfold",
    "thighSkinfold",
    "bicepSkinfold",
    "tricepSkinfold",
    "subscapularSkinfold",
    "suprailiacSkinfold",
    "lowerBackSkinfold",
    "calfSkinfold",
  ],

  description:
    "A bodybuilding-focused method using nine skinfold measurements, with a unique direct calculation approach instead of body density.",

  references: [
    "Parillo, J. (1993). High-Performance Body-Building. Perigee Books.",
    "Parillo, J., & Greenwood-Robinson, M. (1993). BodyBuilding Nutrition. Perigee Books.",
  ],
};
