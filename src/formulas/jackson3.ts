import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";

/**
 * Jackson-Pollock 3-site formula implementation
 * This formula uses three skinfold measurements to estimate body density,
 * which is then converted to body fat percentage using Siri's equation.
 * Different sites are used for men and women to optimize accuracy.
 */
export const jackson3Formula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      chestSkinfold = 0,
      abdomenSkinfold = 0,
      thighSkinfold = 0,
      tricepSkinfold = 0,
      suprailiacSkinfold = 0,
    } = inputs;

    // Calculate sum of skinfolds based on gender (different sites for men and women)
    const sumOfSkinfolds =
      gender === "male"
        ? chestSkinfold + abdomenSkinfold + thighSkinfold
        : tricepSkinfold + suprailiacSkinfold + thighSkinfold;

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

    // Calculate fat mass and lean mass
    const fatMass = (bodyFatPercentage / 100) * weight;
    const leanMass = weight - fatMass;

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  requiredFields: [
    "gender",
    "age",
    "weight",
    "chestSkinfold",
    "abdomenSkinfold",
    "thighSkinfold",
    "tricepSkinfold",
    "suprailiacSkinfold",
  ],

  applicableGenders: ["male", "female"],

  minimumAge: 18,
  maximumAge: 61,

  description:
    "The Jackson-Pollock 3-site formula is their most practical method, using three " +
    "strategically chosen skinfold sites that differ by gender. For men, measurements " +
    "are taken at the chest, abdomen, and thigh. For women, measurements are taken at " +
    "the tricep, suprailiac, and thigh. This approach balances practicality with accuracy " +
    "and is widely used in field testing.",

  references: [
    "Jackson, A. S., & Pollock, M. L. (1985). Practical assessment of body composition. The Physician and Sportsmedicine, 13(5), 76-90.",
    "Jackson, A. S., Pollock, M. L., & Ward, A. (1980). Generalized equations for predicting body density of women. Medicine and Science in Sports and Exercise, 12(3), 175-181.",
    "Siri, W. E. (1961). Body composition from fluid spaces and density: analysis of methods. Techniques for measuring body composition, 61, 223-244.",
  ],
};
