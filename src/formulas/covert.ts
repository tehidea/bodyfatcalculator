import { z } from "zod";
import { formulaSchemas } from "../schemas/calculator";
import { convertMeasurement } from "../utils/conversions";
import { calculateMassMetrics } from "./utils";
import { MeasurementSystem } from "../types/calculator";

type CovertInputs = z.infer<ReturnType<ReturnType<(typeof formulaSchemas)["covert"]>>>;
type FormulaResult = { bodyFatPercentage: number; fatMass: number; leanMass: number };

/**
 * Covert Bailey formula implementation
 * This formula uses different measurements for men and women, taking into account age
 * and various circumference measurements.
 */
export const covertFormula = {
  calculate: (inputs: CovertInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      waistCircumference = 0,
      hipsCircumference = 0,
      forearmCircumference = 0,
      wristCircumference = 0,
      thighCircumference = 0,
      calfCircumference = 0,
    } = inputs;

    // Get values in imperial units for the formula calculation
    const waistInches =
      measurementSystem === "metric"
        ? convertMeasurement(waistCircumference, "length", "metric", "imperial")
        : waistCircumference;
    const hipsInches =
      measurementSystem === "metric"
        ? convertMeasurement(hipsCircumference, "length", "metric", "imperial")
        : hipsCircumference;
    const forearmInches =
      measurementSystem === "metric"
        ? convertMeasurement(forearmCircumference, "length", "metric", "imperial")
        : forearmCircumference;
    const wristInches =
      measurementSystem === "metric"
        ? convertMeasurement(wristCircumference, "length", "metric", "imperial")
        : wristCircumference;
    const thighInches =
      measurementSystem === "metric"
        ? convertMeasurement(thighCircumference, "length", "metric", "imperial")
        : thighCircumference;
    const calfInches =
      measurementSystem === "metric"
        ? convertMeasurement(calfCircumference, "length", "metric", "imperial")
        : calfCircumference;

    let bodyFatPercentage: number;

    if (gender === "male") {
      // Male formula varies by age
      const forearmMultiplier = age <= 30 ? 3 : 2.7;
      bodyFatPercentage =
        waistInches + 0.5 * hipsInches - forearmMultiplier * forearmInches - wristInches;
    } else {
      // Female formula varies by age
      const thighMultiplier = age <= 30 ? 0.8 : 1;
      bodyFatPercentage = hipsInches + thighMultiplier * thighInches - 2 * calfInches - wristInches;
    }

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
