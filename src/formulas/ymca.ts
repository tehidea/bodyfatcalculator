import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

/**
 * YMCA formula implementation
 * This formula uses waist circumference and weight to estimate body fat percentage.
 * The formula calculates in imperial units (lbs and inches) internally.
 */
export const ymcaFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const { gender, weight = 0, waistCircumference = 0 } = inputs;

    // Get values in imperial units for the formula calculation
    const weightLbs =
      measurementSystem === "metric"
        ? convertMeasurement(weight, "weight", "metric", "imperial")
        : weight;
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference, "length", "metric", "imperial")
        : waistCircumference;

    console.log("[YMCA Formula] Input measurement system:", measurementSystem);
    console.log(
      "[YMCA Formula] Input weight:",
      weight,
      measurementSystem === "metric" ? "kg" : "lbs"
    );
    console.log(
      "[YMCA Formula] Input waist:",
      waistCircumference,
      measurementSystem === "metric" ? "cm" : "in"
    );
    console.log("[YMCA Formula] Used weight (lbs):", weightLbs);
    console.log("[YMCA Formula] Used waist (inches):", waistInches);

    // Calculate body fat percentage using imperial units
    const bodyFatPercentage =
      gender === "male"
        ? (100 * (4.15 * waistInches - 0.082 * weightLbs - 98.42)) / weightLbs
        : (100 * (4.15 * waistInches - 0.082 * weightLbs - 76.76)) / weightLbs;

    console.log("[YMCA Formula] Calculated body fat %:", bodyFatPercentage);

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
