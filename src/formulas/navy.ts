import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

/**
 * U.S. Navy formula implementation
 * This formula uses circumference measurements and height to estimate body fat percentage.
 * It's widely used in the U.S. military for its simplicity and reasonable accuracy.
 *
 * Measurement System Handling:
 * - The formula internally uses imperial units (inches)
 * - For metric inputs, we convert to imperial before calculation
 * - For imperial inputs, we use the values directly
 * - Results are consistent across measurement systems to 2 decimal places
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
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      weight = 0,
      height = 0,
      neckCircumference = 0,
      waistCircumference = 0,
      hipsCircumference = 0,
    } = inputs;

    // Get values in imperial units for the formula calculation
    const heightInches =
      measurementSystem === "metric"
        ? convertMeasurement(height, "length", "metric", "imperial")
        : height;
    const neckInches =
      measurementSystem === "metric"
        ? convertMeasurement(neckCircumference, "length", "metric", "imperial")
        : neckCircumference;
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference, "length", "metric", "imperial")
        : waistCircumference;
    const hipsInches =
      measurementSystem === "metric"
        ? convertMeasurement(hipsCircumference, "length", "metric", "imperial")
        : hipsCircumference;

    // Calculate body fat percentage using gender-specific formulas
    const bodyFatPercentage =
      gender === "male"
        ? 86.01 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76
        : 163.205 * Math.log10(waistInches + hipsInches - neckInches) -
          97.684 * Math.log10(heightInches) -
          78.387;

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

  name: "U.S. Navy",
  marginOfError: "4-6",

  // Common required fields for both genders
  requiredFields: ["weight", "height", "neckCircumference", "waistCircumference"],

  // Gender-specific required fields
  genderSpecificFields: {
    male: [], // No additional fields for males
    female: ["hipsCircumference"], // Females additionally need hip circumference
  },

  description:
    "A military-developed method using height and circumference measurements, with additional hip measurements for women.",

  references: [
    "Hodgdon, J. A., & Beckett, M. B. (1984). Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center Report, No. 84-29.",
    "Hodgdon, J. A., & Beckett, M. B. (1984). Prediction of percent body fat for U.S. Navy women from body circumferences and height. Naval Health Research Center Report, No. 84-29.",
  ],
};
