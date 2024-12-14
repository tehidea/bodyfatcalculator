import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";

/**
 * Modified YMCA formula implementation
 * This formula is a variation of the YMCA formula that includes additional measurements
 * for women to improve accuracy.
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

    // Calculate fat mass and lean mass in kg
    const fatMass = (bodyFatPercentage / 100) * weight;
    const leanMass = weight - fatMass;

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  name: "Modified YMCA Formula",
  marginOfError: "4-6",

  requiredFields: [
    "gender",
    "weight",
    "waistCircumference",
    "wristCircumference",
    "forearmCircumference",
    "hipsCircumference",
  ],

  applicableGenders: ["male", "female"],

  description:
    "The Modified YMCA formula is an enhanced version of the original YMCA formula. " +
    "For men, it uses a simplified calculation based on waist and weight. " +
    "For women, it incorporates additional measurements (wrist, forearm, and hips) " +
    "to provide more accurate results across different body types.",

  references: [
    "Modified from YMCA of the USA. (2000). YMCA Fitness Testing and Assessment Manual. 4th ed.",
  ],
};
