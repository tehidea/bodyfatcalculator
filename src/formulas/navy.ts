import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";

/**
 * U.S. Navy formula implementation
 * This formula uses circumference measurements and height to estimate body fat percentage.
 * It's widely used in the U.S. military for its simplicity and reasonable accuracy.
 *
 * Male formula uses:
 * - Height
 * - Neck circumference
 * - Waist circumference
 *
 * Female formula additionally uses:
 * - Hip circumference
 */
export const navyFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const {
      gender,
      weight = 0,
      height = 0,
      neckCircumference = 0,
      waistCircumference = 0,
      hipsCircumference = 0,
    } = inputs;

    // Convert to imperial for calculation (formula was designed for imperial units)
    const heightInches = convertMeasurement(height, "length", "metric", "imperial");
    const neckInches = convertMeasurement(neckCircumference, "length", "metric", "imperial");
    const waistInches = convertMeasurement(waistCircumference, "length", "metric", "imperial");
    const hipsInches = convertMeasurement(hipsCircumference, "length", "metric", "imperial");

    // Calculate body fat percentage using gender-specific formulas
    const bodyFatPercentage =
      gender === "male"
        ? 86.01 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76
        : 163.205 * Math.log10(waistInches + hipsInches - neckInches) -
          97.684 * Math.log10(heightInches) -
          78.387;

    // Calculate fat mass and lean mass in kg
    const fatMass = (bodyFatPercentage / 100) * weight;
    const leanMass = weight - fatMass;

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  name: "U.S. Navy Formula",
  marginOfError: "3-4",

  // Common required fields for both genders
  requiredFields: ["weight", "height", "neckCircumference", "waistCircumference"],

  // Gender-specific required fields
  genderSpecificFields: {
    male: [], // No additional fields for males
    female: ["hipsCircumference"], // Females additionally need hip circumference
  },

  applicableGenders: ["male", "female"],

  description:
    "The U.S. Navy formula is a circumference-based method developed for military personnel. " +
    "It uses height and various body circumference measurements to estimate body fat percentage. " +
    "For men, it uses neck and waist measurements, while women's calculations include hip measurements " +
    "for better accuracy across different body types.",

  references: [
    "Hodgdon, J. A., & Beckett, M. B. (1984). Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center Report, No. 84-29.",
    "Hodgdon, J. A., & Beckett, M. B. (1984). Prediction of percent body fat for U.S. Navy women from body circumferences and height. Naval Health Research Center Report, No. 84-29.",
  ],
};
