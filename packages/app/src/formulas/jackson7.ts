import { z } from "zod";
import { formulaSchemas, MeasurementSystem } from "../schemas/calculator";
import { calculateBodyFat } from "./utils";

type Jackson7Inputs = z.infer<ReturnType<ReturnType<(typeof formulaSchemas)["jack7"]>>>;
type FormulaResult = { bodyFatPercentage: number; fatMass: number; leanMass: number };

/**
 * Jackson-Pollock 7-site formula implementation
 * This formula uses seven skinfold measurements to estimate body density,
 * which is then converted to body fat percentage using Siri's equation.
 * The formula accounts for age and gender differences in fat distribution.
 */
export const jackson7Formula = {
  calculate: (inputs: Jackson7Inputs, measurementSystem: MeasurementSystem): FormulaResult => {
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
    const bodyDensity =
      gender === "male"
        ? 1.112 -
          0.00043499 * sumOfSkinfolds +
          0.00000055 * Math.pow(sumOfSkinfolds, 2) -
          0.00028826 * age
        : 1.097 -
          0.00046971 * sumOfSkinfolds +
          0.00000056 * Math.pow(sumOfSkinfolds, 2) -
          0.00012828 * age;

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
