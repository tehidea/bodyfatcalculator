import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { calculateMassMetrics } from "./utils";

/**
 * Jackson-Pollock 7-site formula implementation
 * This formula uses seven skinfold measurements to estimate body density,
 * which is then converted to body fat percentage using Siri's equation.
 * The formula accounts for age and gender differences in fat distribution.
 */
export const jackson7Formula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      chestSkinfold = 0,
      abdomenSkinfold = 0,
      thighSkinfold = 0,
      tricepSkinfold = 0,
      subscapularSkinfold = 0,
      suprailiacSkinfold = 0,
      midaxillarySkinfold = 0,
    } = inputs;

    // Calculate sum of skinfolds (in mm, no conversion needed)
    const sumOfSkinfolds =
      chestSkinfold +
      abdomenSkinfold +
      thighSkinfold +
      tricepSkinfold +
      subscapularSkinfold +
      suprailiacSkinfold +
      midaxillarySkinfold;

    // Calculate body density using gender-specific formulas
    let bodyDensity: number;

    if (gender === "male") {
      bodyDensity =
        1.112 -
        0.00043499 * sumOfSkinfolds +
        0.00000055 * Math.pow(sumOfSkinfolds, 2) -
        0.00028826 * age;
    } else {
      bodyDensity =
        1.097 -
        0.00046971 * sumOfSkinfolds +
        0.00000056 * Math.pow(sumOfSkinfolds, 2) -
        0.00012828 * age;
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

  name: "Jackson-Pollock 7-Site",
  marginOfError: "3-4",

  requiredFields: [
    "gender",
    "age",
    "weight",
    "chestSkinfold",
    "abdomenSkinfold",
    "thighSkinfold",
    "tricepSkinfold",
    "subscapularSkinfold",
    "suprailiacSkinfold",
    "midaxillarySkinfold",
  ],

  description:
    "The most comprehensive Jackson-Pollock method using seven skinfold sites, providing high accuracy across different body types.",

  references: [
    "Jackson, A. S., & Pollock, M. L. (1978). Generalized equations for predicting body density of men. British Journal of Nutrition, 40(3), 497-504.",
    "Jackson, A. S., Pollock, M. L., & Ward, A. (1980). Generalized equations for predicting body density of women. Medicine and Science in Sports and Exercise, 12(3), 175-181.",
    "Siri, W. E. (1961). Body composition from fluid spaces and density: analysis of methods. Techniques for measuring body composition, 61, 223-244.",
  ],
};
