import { z } from "zod";
import { formulaSchemas } from "../schemas/calculator";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

type ParilloInputs = z.infer<ReturnType<ReturnType<(typeof formulaSchemas)["parrillo"]>>>;
type FormulaResult = { bodyFatPercentage: number; fatMass: number; leanMass: number };

/**
 * Parillo formula implementation
 * This formula uses nine skinfold measurements and body weight to estimate
 * body fat percentage. It's particularly popular in bodybuilding circles
 * and is known for its comprehensive approach to measuring subcutaneous fat.
 */
export const parilloFormula = {
  calculate: (inputs: ParilloInputs, measurementSystem: MeasurementSystem): FormulaResult => {
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

    // Get weight in imperial units for the formula calculation
    const weightLbs =
      measurementSystem === "metric"
        ? convertMeasurement(weight, "weight", "metric", "imperial")
        : weight;

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
    const bodyFatPercentage = (sumOfSkinfolds * 27) / weightLbs;

    // For mass calculations, ensure we're using metric weight
    const weightKg =
      measurementSystem === "metric"
        ? weight
        : convertMeasurement(weight, "weight", "imperial", "metric");

    // Calculate fat mass and lean mass using utility function
    const { fatMass, leanMass } = calculateMassMetrics(bodyFatPercentage, weightKg);

    return {
      bodyFatPercentage,
      fatMass,
      leanMass,
    };
  },
};
