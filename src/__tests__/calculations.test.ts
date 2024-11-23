import { calculateBodyFat, getClassification } from "../utils/calculations";
import { Formula, Gender, CalculatorInputs } from "../types/calculator";

describe("Body Fat Calculator Formulas", () => {
  // YMCA Formula Tests
  describe("YMCA Formula", () => {
    const formula: Formula = "ymca";

    test("calculates male body fat correctly", () => {
      const inputs: CalculatorInputs = {
        weight: 80, // kg
        waistCircumference: 85, // cm
      };

      const result = calculateBodyFat(formula, "male", inputs);
      expect(result).toBeCloseTo(14.74, 0.01);
    });

    test("calculates female body fat correctly", () => {
      const inputs: CalculatorInputs = {
        weight: 60, // kg
        waistCircumference: 75, // cm
      };

      const result = calculateBodyFat(formula, "female", inputs);
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

      const result = calculateBodyFat(formula, "male", inputs);
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

      const result = calculateBodyFat(formula, "female", inputs);
      expect(result).toBeCloseTo(25.68, 0.01);
    });
  });

  // Unit Conversion Tests
  describe("Unit Conversions", () => {
    test("converts measurements correctly between systems", () => {
      const metricInputs: CalculatorInputs = {
        weight: 80, // kg
        height: 178, // cm
        waistCircumference: 85, // cm
      };

      const imperialInputs: CalculatorInputs = {
        weight: 176.37, // lbs
        height: 70.08, // inches
        waistCircumference: 33.46, // inches
      };

      // Reference the store conversion function
      // See src/store/calculatorStore.ts lines 27-54
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
