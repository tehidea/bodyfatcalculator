import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";

/**
 * Covert Bailey formula implementation
 * This formula uses different measurements for men and women, taking into account age
 * and various circumference measurements.
 *
 * Male formula uses:
 * - Weight
 * - Age
 * - Waist circumference
 * - Hips circumference
 * - Forearm circumference
 * - Wrist circumference
 *
 * Female formula uses:
 * - Weight
 * - Age
 * - Hips circumference
 * - Thigh circumference
 * - Calf circumference
 * - Wrist circumference
 */
export const covertFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      waistCircumference = 0,
      hipsCircumference = 0,
      forearmCircumference = 0,
      wristCircumference = 0,
      thighCircumference = 0,
      calfCircumference = 0,
    } = inputs;

    // Convert to imperial for calculation (formula was designed for imperial units)
    const waistInches = convertMeasurement(waistCircumference, "length", "metric", "imperial");
    const hipsInches = convertMeasurement(hipsCircumference, "length", "metric", "imperial");
    const forearmInches = convertMeasurement(forearmCircumference, "length", "metric", "imperial");
    const wristInches = convertMeasurement(wristCircumference, "length", "metric", "imperial");
    const thighInches = convertMeasurement(thighCircumference, "length", "metric", "imperial");
    const calfInches = convertMeasurement(calfCircumference, "length", "metric", "imperial");

    let bodyFatPercentage: number;

    if (gender === "male") {
      // Male formula varies by age
      const forearmMultiplier = age <= 30 ? 3 : 2.7;
      bodyFatPercentage =
        waistInches + 0.5 * hipsInches - forearmMultiplier * forearmInches - wristInches;
    } else {
      // Female formula varies by age
      const thighMultiplier = age <= 30 ? 0.8 : 1;
      bodyFatPercentage = hipsInches + thighMultiplier * thighInches - 2 * calfInches - wristInches;
    }

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weight);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  name: "Covert Bailey",
  marginOfError: "4-5",

  // Common required fields for both genders
  requiredFields: ["weight", "age", "wristCircumference", "hipsCircumference"],

  // Gender-specific required fields
  genderSpecificFields: {
    male: ["waistCircumference", "forearmCircumference"],
    female: ["thighCircumference", "calfCircumference"],
  },

  description:
    "An age-adjusted method using different circumference measurements for men and women, with specific calculations for those over and under 30.",

  references: [
    "Bailey, Covert. (1991). The Ultimate Fit or Fat: Get in Shape and Stay in Shape.",
    "Bailey, Covert. (1994). Smart Exercise: Burning Fat, Getting Fit.",
  ],
};
