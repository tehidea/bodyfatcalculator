import {
  calculateResults,
  calculateBodyFat,
  getClassification,
  convertToImperial,
} from "../calculations";
import { Formula, Gender, CalculatorInputs, MeasurementSystem } from "../../types/calculator";

describe("Body Fat Calculations", () => {
  const defaultParams = {
    measurementSystem: "metric" as MeasurementSystem,
  };

  // YMCA Formula Tests
  describe("YMCA Formula", () => {
    const formula: Formula = "ymca";

    test("calculates male body fat correctly", () => {
      const inputs: CalculatorInputs = {
        weight: 80,
        waistCircumference: 85,
      };

      const result = calculateBodyFat(formula, "male", inputs, defaultParams.measurementSystem);
      expect(result).toBeCloseTo(14.74, 0.01);
    });

    test("calculates female body fat correctly", () => {
      const inputs: CalculatorInputs = {
        weight: 60,
        waistCircumference: 75,
      };

      const result = calculateBodyFat(formula, "female", inputs, defaultParams.measurementSystem);
      expect(result).toBeCloseTo(26.41, 0.01);
    });
  });

  // Modified YMCA Formula Tests
  describe("Modified YMCA Formula", () => {
    const formula: Formula = "mymca";

    test("calculates male body fat correctly with minimal inputs", () => {
      const inputs: CalculatorInputs = {
        weight: 80,
        waistCircumference: 85,
      };
      const result = calculateBodyFat("mymca", "male", inputs, "metric");
      expect(result).toBeCloseTo(17.01, 0.01);
    });

    test("requires all measurements for female calculations", () => {
      const inputs: CalculatorInputs = {
        weight: 60,
        waistCircumference: 75,
        wristCircumference: 15,
        forearmCircumference: 23,
        hipsCircumference: 90,
      };
      const result = calculateBodyFat("mymca", "female", inputs, "metric");
      expect(result).toBeCloseTo(25.68, 0.01);
    });
  });

  // Unit Conversion Tests
  describe("Unit Conversions", () => {
    test("converts measurements correctly", () => {
      expect(convertToImperial(1, "kg")).toBeCloseTo(2.20462, 5);
      expect(convertToImperial(1, "cm")).toBeCloseTo(0.393701, 5);
      expect(convertToImperial(1, "mm")).toBeCloseTo(0.0393701, 5);
      expect(convertToImperial(10, "mm")).toBeCloseTo(convertToImperial(1, "cm"), 5);
      expect(convertToImperial(10, "mm")).toBeCloseTo(0.393701, 5);
      expect(convertToImperial(100, "kg")).toBeCloseTo(220.462, 3);
    });
  });

  // Covert Bailey Formula Tests
  describe("Covert Bailey Formula", () => {
    const formula: Formula = "covert";

    test("calculates male body fat correctly for age ≤ 30", () => {
      const inputs: CalculatorInputs = {
        age: 25,
        hipsCircumference: 100,
        waistCircumference: 85,
        forearmCircumference: 30,
        wristCircumference: 17,
      };
      const result = calculateBodyFat(formula, "male", inputs, "metric");
      const expected = 85 * 0.393701 + 0.5 * 100 * 0.393701 - 3 * 30 * 0.393701 - 17 * 0.393701;
      expect(result).toBeCloseTo(expected, 1);
    });

    test("calculates male body fat correctly for age > 30", () => {
      const inputs: CalculatorInputs = {
        age: 35,
        hipsCircumference: 100,
        waistCircumference: 85,
        forearmCircumference: 30,
        wristCircumference: 17,
      };
      const result = calculateBodyFat(formula, "male", inputs, "metric");
      const expected = 85 * 0.393701 + 0.5 * 100 * 0.393701 - 2.7 * 30 * 0.393701 - 17 * 0.393701;
      expect(result).toBeCloseTo(expected, 1);
    });

    test("calculates female body fat correctly for age ≤ 30", () => {
      const inputs: CalculatorInputs = {
        age: 25,
        hipsCircumference: 100,
        thighCircumference: 60,
        calfCircumference: 38,
        wristCircumference: 15,
      };
      const result = calculateBodyFat(formula, "female", inputs, "metric");
      const expected = 100 * 0.393701 + 0.8 * 60 * 0.393701 - 2 * 38 * 0.393701 - 15 * 0.393701;
      expect(result).toBeCloseTo(expected, 1);
    });

    test("calculates female body fat correctly for age > 30", () => {
      const inputs: CalculatorInputs = {
        age: 35,
        hipsCircumference: 100,
        thighCircumference: 60,
        calfCircumference: 38,
        wristCircumference: 15,
      };
      const result = calculateBodyFat(formula, "female", inputs, "metric");
      const expected = 100 * 0.393701 + 60 * 0.393701 - 2 * 38 * 0.393701 - 15 * 0.393701;
      expect(result).toBeCloseTo(expected, 1);
    });
  });

  // Result Validation Tests
  describe("calculateResults validation", () => {
    const baseInputs: CalculatorInputs = {
      weight: 80,
      waistCircumference: 85,
    };

    test("throws error for infinite body fat result", async () => {
      const inputs = { ...baseInputs, weight: 0 };
      await expect(calculateResults("ymca", "male", inputs, "metric")).rejects.toThrow(
        "Please check your measurements. The calculation resulted in an invalid value."
      );
    });

    test("throws error for negative body fat result", async () => {
      const inputs = { ...baseInputs, weight: 200, waistCircumference: 50 };
      await expect(calculateResults("ymca", "male", inputs, "metric")).rejects.toThrow(
        "Please check your measurements. Body fat percentage cannot be negative."
      );
    });

    test("throws error for body fat > 100%", async () => {
      const inputs = { ...baseInputs, weight: 50, waistCircumference: 200 };
      await expect(calculateResults("ymca", "male", inputs, "metric")).rejects.toThrow(
        "Please check your measurements. Body fat percentage cannot exceed 100%."
      );
    });

    test("calculates valid results successfully", async () => {
      const inputs = { ...baseInputs };
      const result = await calculateResults("ymca", "male", inputs, "metric");

      expect(result).toHaveProperty("bodyFatPercentage");
      expect(result).toHaveProperty("fatMass");
      expect(result).toHaveProperty("leanMass");
      expect(result).toHaveProperty("classification");
      expect(isNaN(result.bodyFatPercentage)).toBe(false);
      expect(result.bodyFatPercentage).toBeGreaterThanOrEqual(0);
      expect(result.bodyFatPercentage).toBeLessThanOrEqual(100);
    });
  });

  // Classification Tests
  describe("Body Fat Classifications", () => {
    test("correctly classifies male body fat percentages", () => {
      expect(getClassification(4, "male")).toBe("Essential fat (2-5%)");
      expect(getClassification(10, "male")).toBe("Athletic (6-13%)");
      expect(getClassification(16, "male")).toBe("Fitness (14-17%)");
      expect(getClassification(22, "male")).toBe("Acceptable (18-25%)");
      expect(getClassification(30, "male")).toBe("Obese (> 25%)");
    });

    test("correctly classifies female body fat percentages", () => {
      expect(getClassification(12, "female")).toBe("Essential fat (10-13%)");
      expect(getClassification(18, "female")).toBe("Athletic (14-20%)");
      expect(getClassification(23, "female")).toBe("Fitness (21-24%)");
      expect(getClassification(28, "female")).toBe("Acceptable (25-31%)");
      expect(getClassification(35, "female")).toBe("Obese (> 31%)");
    });

    test("returns 'Unknown' for values below minimum essential fat", () => {
      expect(getClassification(1, "male")).toBe("Unknown");
      expect(getClassification(9, "female")).toBe("Unknown");
    });

    test("correctly classifies minimum essential fat values", () => {
      expect(getClassification(2, "male")).toBe("Essential fat (2-5%)");
      expect(getClassification(10, "female")).toBe("Essential fat (10-13%)");
    });
  });
});
