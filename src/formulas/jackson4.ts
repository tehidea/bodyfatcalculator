import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { calculateMassMetrics } from "./utils";

/**
 * Jackson-Pollock 4-site formula implementation
 * This formula uses four skinfold measurements to estimate body density,
 * which is then converted to body fat percentage using Siri's equation.
 * It's a simplified version of the 7-site formula, maintaining good accuracy
 * while requiring fewer measurements.
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

    // Calculate body density using gender-specific formulas
    let bodyDensity: number;

    if (gender === "male") {
      bodyDensity =
        1.10938 -
        0.0008267 * sumOfSkinfolds +
        0.0000016 * Math.pow(sumOfSkinfolds, 2) -
        0.0002574 * age;
    } else {
      bodyDensity =
        1.0994921 -
        0.0009929 * sumOfSkinfolds +
        0.0000023 * Math.pow(sumOfSkinfolds, 2) -
        0.0001392 * age;
    }

    // Convert body density to body fat percentage using Siri's equation
    const bodyFatPercentage = 495 / bodyDensity - 450;

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weight);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  name: "Jackson-Pollock 4-Site Formula",
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
    "The Jackson-Pollock 4-site formula is a simplified version of their 7-site method, " +
    "using only four skinfold measurements: abdomen, thigh, tricep, and suprailiac. " +
    "This makes it more practical for field testing while maintaining good accuracy. " +
    "Like the 7-site formula, it accounts for age and gender differences in fat distribution.",

  references: [
    "Jackson, A. S., & Pollock, M. L. (1985). Practical assessment of body composition. The Physician and Sportsmedicine, 13(5), 76-90.",
    "Siri, W. E. (1961). Body composition from fluid spaces and density: analysis of methods. Techniques for measuring body composition, 61, 223-244.",
  ],
};
