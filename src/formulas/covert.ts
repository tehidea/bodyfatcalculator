import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";

/**
 * Covert Bailey formula implementation
 * This formula uses different measurements for men and women, taking into account age
 * and various circumference measurements.
 */
export const covertFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      waist = 0,
      hips = 0,
      forearm = 0,
      wrist = 0,
      thigh = 0,
      calf = 0,
    } = inputs;

    // Convert to imperial for calculation (formula was designed for imperial units)
    const waistInches = convertMeasurement(waist, "length", "metric", "imperial");
    const hipsInches = convertMeasurement(hips, "length", "metric", "imperial");
    const forearmInches = convertMeasurement(forearm, "length", "metric", "imperial");
    const wristInches = convertMeasurement(wrist, "length", "metric", "imperial");
    const thighInches = convertMeasurement(thigh, "length", "metric", "imperial");
    const calfInches = convertMeasurement(calf, "length", "metric", "imperial");

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

    // Calculate fat mass and lean mass in kg
    const fatMass = (bodyFatPercentage / 100) * weight;
    const leanMass = weight - fatMass;

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  name: "Covert Bailey Formula",
  marginOfError: "4-5",

  requiredFields: ["gender", "age", "weight", "waist", "hips", "forearm", "wrist", "thigh", "calf"],

  applicableGenders: ["male", "female"],

  minimumAge: 18,
  maximumAge: 60,

  description:
    "The Covert Bailey formula uses different measurements for men and women, " +
    "taking into account age-related changes in body composition. For men, it focuses " +
    "on waist, hips, forearm, and wrist measurements, while women's calculations use " +
    "hips, thigh, calf, and wrist measurements. The formula adjusts its calculations " +
    "based on whether the person is over or under 30 years old.",

  references: [
    "Bailey, Covert. (1991). The Ultimate Fit or Fat: Get in Shape and Stay in Shape.",
    "Bailey, Covert. (1994). Smart Exercise: Burning Fat, Getting Fit.",
  ],
};
