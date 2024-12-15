import { z } from "zod";
import { formulaSchemas } from "../schemas/calculator";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

type Jackson4Inputs = z.infer<ReturnType<ReturnType<(typeof formulaSchemas)["jack4"]>>>;
type FormulaResult = { bodyFatPercentage: number; fatMass: number; leanMass: number };

/**
 * Jackson-Pollock 4-site formula implementation
 * This formula uses four skinfold measurements to directly estimate body fat percentage.
 * The formula uses measurements from triceps, thigh, suprailiac, and abdomen sites.
 */
export const jackson4Formula = {
  calculate: (inputs: Jackson4Inputs, measurementSystem: MeasurementSystem): FormulaResult => {
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
};
