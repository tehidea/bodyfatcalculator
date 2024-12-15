import { z } from "zod";
import { formulaSchemas } from "../schemas/calculator";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

type MYMCAInputs = z.infer<ReturnType<ReturnType<(typeof formulaSchemas)["mymca"]>>>;
type FormulaResult = { bodyFatPercentage: number; fatMass: number; leanMass: number };

/**
 * Modified YMCA formula implementation
 * This formula is a variation of the YMCA formula that includes additional measurements
 * for women to improve accuracy.
 */
export const mymcaFormula = {
  calculate: (inputs: MYMCAInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      weight = 0,
      waistCircumference = 0,
      wristCircumference = 0,
      forearmCircumference = 0,
      hipsCircumference = 0,
    } = inputs;

    // Get values in imperial units for the formula calculation
    const weightLbs =
      measurementSystem === "metric"
        ? convertMeasurement(weight, "weight", "metric", "imperial")
        : weight;
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference, "length", "metric", "imperial")
        : waistCircumference;
    const wristInches =
      measurementSystem === "metric"
        ? convertMeasurement(wristCircumference, "length", "metric", "imperial")
        : wristCircumference;
    const forearmInches =
      measurementSystem === "metric"
        ? convertMeasurement(forearmCircumference, "length", "metric", "imperial")
        : forearmCircumference;
    const hipsInches =
      measurementSystem === "metric"
        ? convertMeasurement(hipsCircumference, "length", "metric", "imperial")
        : hipsCircumference;

    // Calculate body fat percentage based on gender
    const bodyFatPercentage =
      gender === "male"
        ? ((4.15 * waistInches - 0.082 * weightLbs - 94.42) / weightLbs) * 100
        : ((0.268 * weightLbs -
            0.318 * wristInches +
            0.157 * waistInches +
            0.245 * hipsInches -
            0.434 * forearmInches -
            8.987) /
            weightLbs) *
          100;

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
