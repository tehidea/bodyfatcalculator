import { ymcaFormula } from "../ymca";
import { mymcaFormula } from "../mymca";
import { navyFormula } from "../navy";
import { covertFormula } from "../covert";
import { durninFormula } from "../durnin";
import { StandardizedInputs } from "../../types/formula";
import { convertMeasurement } from "../../utils/conversions";
import { MeasurementSystem } from "../../types/calculator";

// Add type assertion to ensure weight is defined
function assertWeight(weight: number | undefined): asserts weight is number {
  if (weight === undefined) throw new Error("Weight is required for body fat calculations");
}

describe("Body Fat Formula Implementations", () => {
  // Helper function to validate intermediate results
  function validateIntermediateResults(
    result: any,
    inputs: StandardizedInputs,
    measurementSystem: MeasurementSystem = "metric"
  ) {
    // Ensure required fields are present before calculations
    if (!inputs.weight) throw new Error("Weight is required");
    const weight = inputs.weight;

    // Basic validation
    expect(result.bodyFatPercentage).toBeGreaterThan(0);
    expect(result.bodyFatPercentage).toBeLessThan(100);

    // Convert weight to metric for mass calculations if needed
    const weightKg =
      measurementSystem === "metric"
        ? weight
        : convertMeasurement(weight, "weight", "imperial", "metric");

    // Mass calculations validation
    expect(result.fatMass).toBeCloseTo((result.bodyFatPercentage / 100) * weightKg, 2);
    expect(result.leanMass).toBeCloseTo(weightKg - result.fatMass, 2);

    // Sum validation
    expect(result.fatMass + result.leanMass).toBeCloseTo(weightKg, 2);

    // Reasonable ranges
    expect(result.bodyFatPercentage).toBeGreaterThanOrEqual(2); // Essential fat minimum
    expect(result.bodyFatPercentage).toBeLessThanOrEqual(50); // Reasonable maximum
  }

  describe("YMCA Formula", () => {
    it("calculates male body fat percentage correctly with metric inputs", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        weight: 80, // kg
        waistCircumference: 85, // cm
      };

      const result = ymcaFormula.calculate(inputs, "metric");
      validateIntermediateResults(result, inputs, "metric");

      // Verify intermediate conversion steps
      const weightLbs = convertMeasurement(80, "weight", "metric", "imperial");
      const waistInches = convertMeasurement(85, "length", "metric", "imperial");

      // Manual calculation to verify formula
      const expectedBf = (100 * (4.15 * waistInches - 0.082 * weightLbs - 98.42)) / weightLbs;
      expect(result.bodyFatPercentage).toBeCloseTo(expectedBf, 2);
    });

    it("calculates female body fat percentage correctly with metric inputs", () => {
      const inputs: StandardizedInputs = {
        gender: "female",
        weight: 60, // kg
        waistCircumference: 70, // cm
      };

      const result = ymcaFormula.calculate(inputs, "metric");
      validateIntermediateResults(result, inputs, "metric");

      // Verify intermediate conversion steps
      const weightLbs = convertMeasurement(60, "weight", "metric", "imperial");
      const waistInches = convertMeasurement(70, "length", "metric", "imperial");

      // Manual calculation to verify female formula
      const expectedBf = (100 * (4.15 * waistInches - 0.082 * weightLbs - 76.76)) / weightLbs;
      expect(result.bodyFatPercentage).toBeCloseTo(expectedBf, 2);
    });

    it("maintains consistent results across measurement systems for females", () => {
      const metricInputs: StandardizedInputs = {
        gender: "female",
        weight: 60, // kg
        waistCircumference: 70, // cm
      };

      const imperialInputs: StandardizedInputs = {
        gender: "female",
        weight: convertMeasurement(60, "weight", "metric", "imperial"), // lbs
        waistCircumference: convertMeasurement(70, "length", "metric", "imperial"), // inches
      };

      const metricResult = ymcaFormula.calculate(metricInputs, "metric");
      const imperialResult = ymcaFormula.calculate(imperialInputs, "imperial");

      // Results should be identical regardless of input system
      expect(imperialResult.bodyFatPercentage).toBeCloseTo(metricResult.bodyFatPercentage, 2);
    });

    it("throws error when gender is missing", () => {
      const inputs: StandardizedInputs = {
        weight: 80,
        waistCircumference: 85,
      } as StandardizedInputs;

      expect(() => ymcaFormula.calculate(inputs, "metric")).toThrow("Gender is required");
    });

    it("calculates male body fat percentage correctly with imperial inputs", () => {
      const imperialInputs: StandardizedInputs = {
        gender: "male",
        weight: 176.37, // lbs (80 kg converted)
        waistCircumference: 33.46, // inches (85 cm converted)
      };

      const metricInputs: StandardizedInputs = {
        gender: "male",
        weight: 80, // kg
        waistCircumference: 85, // cm
      };

      const imperialResult = ymcaFormula.calculate(imperialInputs, "imperial");
      const metricResult = ymcaFormula.calculate(metricInputs, "metric");

      // Results should be the same regardless of input unit system
      expect(imperialResult.bodyFatPercentage).toBeCloseTo(metricResult.bodyFatPercentage, 2);
      validateIntermediateResults(imperialResult, imperialInputs, "imperial");
      validateIntermediateResults(metricResult, metricInputs, "metric");
    });

    it("throws error for invalid measurements", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        weight: 0,
        waistCircumference: 85,
      };

      expect(() => ymcaFormula.calculate(inputs, "metric")).toThrow(
        "Please check your measurements"
      );
    });

    it("throws error for extreme measurements leading to invalid results", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        weight: 50,
        waistCircumference: 200,
      };

      expect(() => ymcaFormula.calculate(inputs, "metric")).toThrow(
        "Body fat percentage cannot exceed 100%"
      );
    });
  });
});
