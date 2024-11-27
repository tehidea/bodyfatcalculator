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

    test("calculates male body fat correctly", () => {
      const inputs: CalculatorInputs = {
        weight: 80, // kg
        waistCircumference: 85, // cm
      };

      const result = calculateBodyFat(formula, "male", inputs, defaultParams.measurementSystem);
      expect(result).toBeCloseTo(17.01, 0.01);
    });

    test("calculates female body fat correctly", () => {
      const inputs: CalculatorInputs = {
        weight: 60, // kg
        waistCircumference: 75, // cm
        wristCircumference: 15, // cm
        forearmCircumference: 23, // cm
        hipsCircumference: 90, // cm
      };

      const result = calculateBodyFat(formula, "female", inputs, defaultParams.measurementSystem);
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
      expect(getClassification(10, "male")).toBe("Athletes (6-13%)");
      expect(getClassification(16, "male")).toBe("Fitness (14-17%)");
      expect(getClassification(22, "male")).toBe("Acceptable (18-25%)");
      expect(getClassification(30, "male")).toBe("Obese (> 25%)");
    });

    test("correctly classifies female body fat percentages", () => {
      expect(getClassification(12, "female")).toBe("Essential fat (10-13%)");
      expect(getClassification(18, "female")).toBe("Athletes (14-20%)");
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
});
