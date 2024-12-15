import { z } from "zod";
import { formulaSchemas, MeasurementSystem } from "../schemas/calculator";
import { calculateBodyFat } from "./utils";

type Jackson3Inputs = z.infer<ReturnType<ReturnType<(typeof formulaSchemas)["jack3"]>>>;
type FormulaResult = { bodyFatPercentage: number; fatMass: number; leanMass: number };

/**
 * Jackson-Pollock 3-site formula implementation
 * This formula uses three skinfold measurements to estimate body density,
 * which is then converted to body fat percentage using Siri's equation.
 * Different sites are used for men and women to optimize accuracy.
 */
export const jackson3Formula = {
  calculate: (inputs: Jackson3Inputs, measurementSystem: MeasurementSystem): FormulaResult => {
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
    const bodyDensity =
      gender === "male"
        ? 1.10938 -
          0.0008267 * sumOfSkinfolds +
          0.0000016 * Math.pow(sumOfSkinfolds, 2) -
          0.0002574 * age
        : 1.0994921 -
          0.0009929 * sumOfSkinfolds +
          0.0000023 * Math.pow(sumOfSkinfolds, 2) -
          0.0001392 * age;

    // Convert body density to body fat percentage using Siri's equation
    const bodyFatPercentage = 495 / bodyDensity - 450;

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weight);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },
};
