import { FormulaImplementation, StandardizedInputs, FormulaResult } from "../types/formula";
import { calculateMassMetrics } from "./utils";

/**
 * Parillo formula implementation
 * This formula uses nine skinfold measurements and body weight to estimate
 * body fat percentage. It's particularly popular in bodybuilding circles
 * and is known for its comprehensive approach to measuring subcutaneous fat.
 */
export const parilloFormula: FormulaImplementation = {
  calculate: (inputs: StandardizedInputs): FormulaResult => {
    const {
      weight = 0,
      chestSkinfold = 0,
      abdomenSkinfold = 0,
      thighSkinfold = 0,
      bicepSkinfold = 0,
      tricepSkinfold = 0,
      subscapularSkinfold = 0,
      suprailiacSkinfold = 0,
      lowerBackSkinfold = 0,
      calfSkinfold = 0,
    } = inputs;

    // Sum all nine skinfold measurements (in mm)
    const sumOfSkinfolds =
      chestSkinfold +
      abdomenSkinfold +
      thighSkinfold +
      bicepSkinfold +
      tricepSkinfold +
      subscapularSkinfold +
      suprailiacSkinfold +
      lowerBackSkinfold +
      calfSkinfold;

    // Calculate body fat percentage using Parillo's formula
    // The formula multiplies the sum by 27 and divides by body weight in pounds
    const bodyFatPercentage = (sumOfSkinfolds * 27) / weight;

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weight);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },

  name: "Parillo",
  marginOfError: "3-4",

  requiredFields: [
    "weight",
    "chestSkinfold",
    "abdomenSkinfold",
    "thighSkinfold",
    "bicepSkinfold",
    "tricepSkinfold",
    "subscapularSkinfold",
    "suprailiacSkinfold",
    "lowerBackSkinfold",
    "calfSkinfold",
  ],

  description:
    "A bodybuilding-focused method using nine skinfold measurements, with a unique direct calculation approach instead of body density.",

  references: [
    "Parillo, J. (1993). High-Performance Body-Building. Perigee Books.",
    "Parillo, J., & Greenwood-Robinson, M. (1993). BodyBuilding Nutrition. Perigee Books.",
  ],
};
