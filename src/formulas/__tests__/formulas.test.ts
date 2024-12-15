import { ymcaFormula } from "../ymca";
import { mymcaFormula } from "../mymca";
import { navyFormula } from "../navy";
import { covertFormula } from "../covert";
import { durninFormula } from "../durnin";
import { jackson7Formula } from "../jackson7";
import { jackson4Formula } from "../jackson4";
import { jackson3Formula } from "../jack3";
import { parilloFormula } from "../parillo";
import { StandardizedInputs } from "../../types/formula";
import { convertMeasurement } from "../../utils/conversions";

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
    assertWeight(inputs.weight);

    // Basic validation
    expect(result.bodyFatPercentage).toBeGreaterThan(0);
    expect(result.bodyFatPercentage).toBeLessThan(100);

    // Convert weight to metric for mass calculations if needed
    const weightKg =
      measurementSystem === "metric"
        ? inputs.weight
        : convertMeasurement(inputs.weight, "weight", "imperial", "metric");

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
      const weightLbs = convertMeasurement(inputs.weight, "weight", "metric", "imperial");
      const waistInches = convertMeasurement(
        inputs.waistCircumference,
        "length",
        "metric",
        "imperial"
      );

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
      const weightLbs = convertMeasurement(inputs.weight, "weight", "metric", "imperial");
      const waistInches = convertMeasurement(
        inputs.waistCircumference,
        "length",
        "metric",
        "imperial"
      );

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

    // Similar tests for female calculations...
  });

  describe("Modified YMCA Formula", () => {
    it("validates intermediate calculations for males", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        weight: 80,
        waistCircumference: 85,
        wristCircumference: 17,
        forearmCircumference: 30,
        hipsCircumference: 95,
      };

      const result = mymcaFormula.calculate(inputs, "metric");
      validateIntermediateResults(result, inputs);

      // Verify wrist-to-waist ratio is reasonable
      const wristToWaist = inputs.wristCircumference / inputs.waistCircumference;
      expect(wristToWaist).toBeGreaterThan(0.15); // Minimum reasonable ratio
      expect(wristToWaist).toBeLessThan(0.3); // Maximum reasonable ratio
    });

    // Similar tests for female calculations...
  });

  describe("Navy Formula", () => {
    it("validates circumference ratios", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        weight: 80,
        height: 180,
        neckCircumference: 38,
        waistCircumference: 85,
        hipsCircumference: 95,
      };

      const result = navyFormula.calculate(inputs, "metric");
      validateIntermediateResults(result, inputs);

      // Verify circumference ratios are reasonable
      const waistToHeight = inputs.waistCircumference / inputs.height;
      const neckToWaist = inputs.neckCircumference / inputs.waistCircumference;

      expect(waistToHeight).toBeGreaterThan(0.3); // Minimum reasonable ratio
      expect(waistToHeight).toBeLessThan(0.7); // Maximum reasonable ratio
      expect(neckToWaist).toBeGreaterThan(0.3); // Minimum reasonable ratio
      expect(neckToWaist).toBeLessThan(0.7); // Maximum reasonable ratio
    });

    // Similar tests for female calculations...
  });

  // Add similar validation tests for other formulas...
});
