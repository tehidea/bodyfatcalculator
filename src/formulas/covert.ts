import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

/**
 * Covert Bailey formula implementation
 * This formula uses different measurements for men and women, taking into account age
 * and various circumference measurements.
 *
 * Measurement System Handling:
 * - The formula internally uses imperial units (inches)
 * - For metric inputs, we convert to imperial before calculation
 * - For imperial inputs, we use the values directly
 * - Results are consistent across measurement systems to 2 decimal places
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
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
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

    // Get values in imperial units for the formula calculation
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference, "length", "metric", "imperial")
        : waistCircumference;
    const hipsInches =
      measurementSystem === "metric"
        ? convertMeasurement(hipsCircumference, "length", "metric", "imperial")
        : hipsCircumference;
    const forearmInches =
      measurementSystem === "metric"
        ? convertMeasurement(forearmCircumference, "length", "metric", "imperial")
        : forearmCircumference;
    const wristInches =
      measurementSystem === "metric"
        ? convertMeasurement(wristCircumference, "length", "metric", "imperial")
        : wristCircumference;
    const thighInches =
      measurementSystem === "metric"
        ? convertMeasurement(thighCircumference, "length", "metric", "imperial")
        : thighCircumference;
    const calfInches =
      measurementSystem === "metric"
        ? convertMeasurement(calfCircumference, "length", "metric", "imperial")
        : calfCircumference;

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
