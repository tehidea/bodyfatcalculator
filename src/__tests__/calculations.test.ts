import { calculateBodyFat, convertToImperial, getClassification } from "../utils/calculations";
import { Formula, Gender, CalculatorInputs, MeasurementSystem } from "../types/calculator";

describe("Body Fat Calculator Formulas", () => {
  const defaultParams = {
    measurementSystem: "metric" as MeasurementSystem,
  };

  // YMCA Formula Tests
  describe("YMCA Formula", () => {
    const formula: Formula = "ymca";

    test("calculates male body fat correctly", () => {
      const inputs: CalculatorInputs = {
        weight: 80, // kg
        waistCircumference: 85, // cm
      };

      const result = calculateBodyFat(formula, "male", inputs, defaultParams.measurementSystem);
      expect(result).toBeCloseTo(14.74, 0.01);
    });

    test("calculates female body fat correctly", () => {
      const inputs: CalculatorInputs = {
        weight: 60, // kg
        waistCircumference: 75, // cm
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
      // Test kg to lbs
      expect(convertToImperial(1, "kg")).toBeCloseTo(2.20462, 5);

      // Test cm to inches
      expect(convertToImperial(1, "cm")).toBeCloseTo(0.393701, 5);

      // Test mm to inches
      expect(convertToImperial(1, "mm")).toBeCloseTo(0.0393701, 5);

      // Ensure that the conversion from mm to inches is consistent with cm to inches
      expect(convertToImperial(10, "mm")).toBeCloseTo(convertToImperial(1, "cm"), 5);

      // Test multiple values
      expect(convertToImperial(10, "mm")).toBeCloseTo(0.393701, 5);
      expect(convertToImperial(100, "kg")).toBeCloseTo(220.462, 3);
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
  });

  // Edge Cases and Validation Tests
  describe("Edge Cases and Validation", () => {
    test("throws error for missing required inputs", () => {});
    test("validates input ranges", () => {});
  });

  // Covert Bailey Formula Tests
  describe("Covert Bailey Formula", () => {
    const formula: Formula = "covert";

    test("calculates male body fat correctly for age ≤ 30", () => {
      const inputs: CalculatorInputs = {
        age: 25,
        hipsCircumference: 100, // cm
        waistCircumference: 85, // cm
        forearmCircumference: 30, // cm
        wristCircumference: 17, // cm
      };
      const result = calculateBodyFat(formula, "male", inputs, "metric");
      // B + 0.5A – 3C – D
      const expected = 85 * 0.393701 + 0.5 * 100 * 0.393701 - 3 * 30 * 0.393701 - 17 * 0.393701;
      expect(result).toBeCloseTo(expected, 1);
    });

    test("calculates male body fat correctly for age > 30", () => {
      const inputs: CalculatorInputs = {
        age: 35,
        hipsCircumference: 100, // cm
        waistCircumference: 85, // cm
        forearmCircumference: 30, // cm
        wristCircumference: 17, // cm
      };
      const result = calculateBodyFat(formula, "male", inputs, "metric");
      // B + 0.5A – 2.7C – D
      const expected = 85 * 0.393701 + 0.5 * 100 * 0.393701 - 2.7 * 30 * 0.393701 - 17 * 0.393701;
      expect(result).toBeCloseTo(expected, 1);
    });

    test("calculates female body fat correctly for age ≤ 30", () => {
      const inputs: CalculatorInputs = {
        age: 25,
        hipsCircumference: 100, // cm
        thighCircumference: 60, // cm
        calfCircumference: 38, // cm
        wristCircumference: 15, // cm
      };
      const result = calculateBodyFat(formula, "female", inputs, "metric");
      // A + 0.8B – 2C – D
      const expected = 100 * 0.393701 + 0.8 * 60 * 0.393701 - 2 * 38 * 0.393701 - 15 * 0.393701;
      expect(result).toBeCloseTo(expected, 1);
    });

    test("calculates female body fat correctly for age > 30", () => {
      const inputs: CalculatorInputs = {
        age: 35,
        hipsCircumference: 100, // cm
        thighCircumference: 60, // cm
        calfCircumference: 38, // cm
        wristCircumference: 15, // cm
      };
      const result = calculateBodyFat(formula, "female", inputs, "metric");
      // A + B – 2C – D
      const expected = 100 * 0.393701 + 60 * 0.393701 - 2 * 38 * 0.393701 - 15 * 0.393701;
      expect(result).toBeCloseTo(expected, 1);
    });
  });
});
