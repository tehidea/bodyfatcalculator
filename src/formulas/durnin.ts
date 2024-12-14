import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { convertMeasurement } from "../utils/conversions";

/**
 * Durnin & Womersley formula implementation
 * This formula uses four skinfold measurements to estimate body density,
 * which is then converted to body fat percentage using Siri's equation.
 * The formula coefficients vary by age and gender.
 */
export const durninFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      bicepSkinfold = 0,
      tricepSkinfold = 0,
      subscapularSkinfold = 0,
      suprailiacSkinfold = 0,
    } = inputs;

    // Calculate sum of skinfolds (in mm, no conversion needed as they're stored in mm)
    const sumOfSkinfolds = Math.log10(
      bicepSkinfold + tricepSkinfold + subscapularSkinfold + suprailiacSkinfold
    );

    // Select appropriate coefficients based on age and gender
    let bodyDensity: number;

    if (gender === "male") {
      if (age < 17) bodyDensity = 1.1533 - 0.0643 * sumOfSkinfolds;
      else if (age <= 19) bodyDensity = 1.162 - 0.063 * sumOfSkinfolds;
      else if (age <= 29) bodyDensity = 1.1631 - 0.0632 * sumOfSkinfolds;
      else if (age <= 39) bodyDensity = 1.1422 - 0.0544 * sumOfSkinfolds;
      else if (age <= 49) bodyDensity = 1.162 - 0.07 * sumOfSkinfolds;
      else bodyDensity = 1.1715 - 0.0779 * sumOfSkinfolds;
    } else {
      if (age < 17) bodyDensity = 1.1369 - 0.0598 * sumOfSkinfolds;
      else if (age <= 19) bodyDensity = 1.1549 - 0.0678 * sumOfSkinfolds;
      else if (age <= 29) bodyDensity = 1.1599 - 0.0717 * sumOfSkinfolds;
      else if (age <= 39) bodyDensity = 1.1423 - 0.0632 * sumOfSkinfolds;
      else if (age <= 49) bodyDensity = 1.1333 - 0.0612 * sumOfSkinfolds;
      else bodyDensity = 1.1339 - 0.0645 * sumOfSkinfolds;
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
    "bicepSkinfold",
    "tricepSkinfold",
    "subscapularSkinfold",
    "suprailiacSkinfold",
  ],

  applicableGenders: ["male", "female"],

  minimumAge: 16,
  maximumAge: 72,

  description:
    "The Durnin & Womersley formula uses four skinfold measurements (biceps, triceps, " +
    "subscapular, and suprailiac) to estimate body density, which is then converted to " +
    "body fat percentage using Siri's equation. The formula uses different coefficients " +
    "based on age and gender to account for variations in fat distribution patterns " +
    "across different demographic groups.",

  references: [
    "Durnin, J. V., & Womersley, J. (1974). Body fat assessed from total body density and its estimation from skinfold thickness: measurements on 481 men and women aged from 16 to 72 years. British Journal of Nutrition, 32(1), 77-97.",
    "Siri, W. E. (1961). Body composition from fluid spaces and density: analysis of methods. Techniques for measuring body composition, 61, 223-244.",
  ],
};
