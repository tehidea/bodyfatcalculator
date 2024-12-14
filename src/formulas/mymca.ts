import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";

/**
 * Modified YMCA formula implementation
 * This formula is a variation of the YMCA formula that includes additional measurements
 * for women to improve accuracy.
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
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const {
      gender,
      weight = 0,
      waistCircumference = 0,
      wristCircumference = 0,
      forearmCircumference = 0,
      hipsCircumference = 0,
    } = inputs;

    // Convert to imperial for calculation (formula was designed for imperial units)
    const weightLbs = convertMeasurement(weight, "weight", "metric", "imperial");
    const waistInches = convertMeasurement(waistCircumference, "length", "metric", "imperial");
    const wristInches = convertMeasurement(wristCircumference, "length", "metric", "imperial");
    const forearmInches = convertMeasurement(forearmCircumference, "length", "metric", "imperial");
    const hipsInches = convertMeasurement(hipsCircumference, "length", "metric", "imperial");

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

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weight);

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
