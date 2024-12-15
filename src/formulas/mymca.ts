import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

/**
 * Modified YMCA formula implementation
 * This formula is a variation of the YMCA formula that includes additional measurements
 * for women to improve accuracy.
 *
 * Measurement System Handling:
 * - The formula internally uses imperial units (lbs and inches)
 * - For metric inputs, we convert to imperial before calculation
 * - For imperial inputs, we use the values directly
 * - Results are consistent across measurement systems to 2 decimal places
 *
 * Male formula uses:
 * - Weight
 * - Waist circumference
 *
 * Female formula uses:
 * - Weight
 * - Waist circumference
 * - Wrist circumference
 * - Forearm circumference
 * - Hips circumference
 */
export const mymcaFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      weight = 0,
      waistCircumference = 0,
      wristCircumference = 0,
      forearmCircumference = 0,
      hipsCircumference = 0,
    } = inputs;

    // Get values in imperial units for the formula calculation
    const weightLbs =
      measurementSystem === "metric"
        ? convertMeasurement(weight, "weight", "metric", "imperial")
        : weight;
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference, "length", "metric", "imperial")
        : waistCircumference;
    const wristInches =
      measurementSystem === "metric"
        ? convertMeasurement(wristCircumference, "length", "metric", "imperial")
        : wristCircumference;
    const forearmInches =
      measurementSystem === "metric"
        ? convertMeasurement(forearmCircumference, "length", "metric", "imperial")
        : forearmCircumference;
    const hipsInches =
      measurementSystem === "metric"
        ? convertMeasurement(hipsCircumference, "length", "metric", "imperial")
        : hipsCircumference;

    // Calculate body fat percentage based on gender
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

  name: "Modified YMCA",
  marginOfError: "4-6",

  // Common required fields for both genders
  requiredFields: ["weight", "waistCircumference"],

  // Gender-specific required fields
  genderSpecificFields: {
    male: [], // No additional fields for males
    female: ["wristCircumference", "forearmCircumference", "hipsCircumference"],
  },

  description:
    "An enhanced YMCA formula that adds wrist, forearm, and hip measurements for women to improve accuracy.",

  references: [
    "Modified from YMCA of the USA. (2000). YMCA Fitness Testing and Assessment Manual. 4th ed.",
  ],
};
