import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { calculateMassMetrics } from "./utils";

/**
 * Jackson-Pollock 4-site formula implementation
 * This formula uses four skinfold measurements to directly estimate body fat percentage.
 * The formula uses measurements from triceps, thigh, suprailiac, and abdomen sites.
 */
export const jackson4Formula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      abdomenSkinfold = 0,
      thighSkinfold = 0,
      tricepSkinfold = 0,
      suprailiacSkinfold = 0,
    } = inputs;

    // Calculate sum of skinfolds (in mm, no conversion needed)
    const sumOfSkinfolds = abdomenSkinfold + thighSkinfold + tricepSkinfold + suprailiacSkinfold;

    // Calculate body fat percentage using gender-specific formulas
    const bodyFatPercentage =
      gender === "male"
        ? 0.29288 * sumOfSkinfolds - 0.0005 * Math.pow(sumOfSkinfolds, 2) + 0.15845 * age - 5.76377
        : 0.29669 * sumOfSkinfolds - 0.00043 * Math.pow(sumOfSkinfolds, 2) + 0.02963 * age + 1.4072;

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weight);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  name: "Jackson-Pollock 4-Site",
  marginOfError: "3.5-4.5",

  requiredFields: [
    "gender",
    "age",
    "weight",
    "abdomenSkinfold",
    "thighSkinfold",
    "tricepSkinfold",
    "suprailiacSkinfold",
  ],

  description:
    "A refined skinfold method using four measurements (abdomen, thigh, tricep, suprailiac), offering good accuracy with moderate complexity.",

  references: [
    "Jackson, A. S., & Pollock, M. L. (1985). Practical assessment of body composition. The Physician and Sportsmedicine, 13(5), 76-90.",
    "Siri, W. E. (1961). Body composition from fluid spaces and density: analysis of methods. Techniques for measuring body composition, 61, 223-244.",
  ],
};
