import { calculateResults } from "../../formulas";
import { getClassification } from "../../formulas/utils";
import { Formula, CalculatorInputs, MeasurementSystem } from "../../schemas/calculator";
import { convertMeasurement } from "../conversions";

describe("Body Fat Calculations", () => {
  // Common test data
  const defaultParams = {
    measurementSystem: "metric" as MeasurementSystem,
  };

  const maleBaseInputs: CalculatorInputs = {
    weight: 80,
    waistCircumference: 85,
  };

  const femaleBaseInputs: CalculatorInputs = {
    weight: 60,
    waistCircumference: 75,
  };

  // Helper function to reduce duplication
  async function expectCalculationError(
    formula: Formula,
    gender: "male" | "female",
    inputs: CalculatorInputs,
    expectedError: string
  ) {
    await expect(
      calculateResults(formula, gender, inputs, defaultParams.measurementSystem)
    ).rejects.toThrow(expectedError);
  }

  describe("YMCA Formula", () => {
    const formula: Formula = "ymca";

    it("calculates male body fat correctly", async () => {
      const result = await calculateResults(
        formula,
        "male",
        maleBaseInputs,
        defaultParams.measurementSystem
      );
      expect(result.bodyFatPercentage).toBeCloseTo(14.73, 1);
    });

    it("calculates female body fat correctly", async () => {
      const result = await calculateResults(
        formula,
        "female",
        femaleBaseInputs,
        defaultParams.measurementSystem
      );
      expect(result.bodyFatPercentage).toBeCloseTo(26.42, 1);
    });

    it("calculates correctly with imperial inputs", async () => {
      const imperialInputs: CalculatorInputs = {
        weight: 176.37, // 80kg in lbs
        waistCircumference: 33.46, // 85cm in inches
      };

      const result = await calculateResults(formula, "male", imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(14.73, 1);
    });

    it("handles edge case measurements", async () => {
      // Test with minimum acceptable values
      const minInputs: CalculatorInputs = {
        weight: 60, // Minimum reasonable weight
        waistCircumference: 70, // Minimum reasonable waist
      };

      const minResult = await calculateResults(formula, "male", minInputs, "metric");
      expect(minResult.bodyFatPercentage).toBeGreaterThan(2);
      expect(minResult.bodyFatPercentage).toBeLessThan(50);

      // Test with maximum acceptable values
      const maxInputs: CalculatorInputs = {
        weight: 120, // Maximum reasonable weight
        waistCircumference: 110, // Maximum reasonable waist
      };

      const maxResult = await calculateResults(formula, "male", maxInputs, "metric");
      expect(maxResult.bodyFatPercentage).toBeGreaterThan(2);
      expect(maxResult.bodyFatPercentage).toBeLessThan(50);
    });

    it("validates mass calculations", async () => {
      const result = await calculateResults(
        formula,
        "male",
        maleBaseInputs,
        defaultParams.measurementSystem
      );

      // Verify mass calculations
      expect(result.fatMass).toBeCloseTo(
        (result.bodyFatPercentage / 100) * maleBaseInputs.weight,
        2
      );
      expect(result.leanMass).toBeCloseTo(
        maleBaseInputs.weight - (result.bodyFatPercentage / 100) * maleBaseInputs.weight,
        2
      );

      // Verify total mass equals input weight
      expect(result.fatMass + result.leanMass).toBeCloseTo(maleBaseInputs.weight, 2);
    });
  });

  describe("Input Validation", () => {
    it("rejects invalid measurements", async () => {
      // Test invalid value
      await expectCalculationError(
        "ymca",
        "male",
        { ...maleBaseInputs, weight: 0 },
        "Please check your measurements. The calculation resulted in an invalid value."
      );

      // Test negative body fat
      await expectCalculationError(
        "ymca",
        "male",
        { ...maleBaseInputs, weight: 200, waistCircumference: 50 },
        "Please check your measurements. Body fat percentage cannot be negative."
      );

      // Test body fat > 100%
      await expectCalculationError(
        "ymca",
        "male",
        { ...maleBaseInputs, weight: 50, waistCircumference: 200 },
        "Please check your measurements. Body fat percentage cannot exceed 100%."
      );
    });

    it("validates result structure and ranges", async () => {
      const result = await calculateResults(
        "ymca",
        "male",
        maleBaseInputs,
        defaultParams.measurementSystem
      );

      expect(result).toMatchObject({
        bodyFatPercentage: expect.any(Number),
        fatMass: expect.any(Number),
        leanMass: expect.any(Number),
        classification: expect.any(String),
      });

      expect(result.bodyFatPercentage).toBeGreaterThanOrEqual(0);
      expect(result.bodyFatPercentage).toBeLessThanOrEqual(100);
    });

    it("rejects missing required fields", async () => {
      await expectCalculationError(
        "ymca",
        "male",
        { weight: maleBaseInputs.weight },
        "Please check your measurements"
      );

      await expectCalculationError(
        "ymca",
        "male",
        { waistCircumference: maleBaseInputs.waistCircumference },
        "Please check your measurements"
      );
    });
  });

  describe("Classifications", () => {
    it.each([
      [4, "male", "Essential fat (2-5%)"],
      [10, "male", "Athletic (6-13%)"],
      [16, "male", "Fitness (14-17%)"],
      [22, "male", "Acceptable (18-25%)"],
      [30, "male", "Obese (> 25%)"],
      [12, "female", "Essential fat (10-13%)"],
      [18, "female", "Athletic (14-20%)"],
      [23, "female", "Fitness (21-24%)"],
      [28, "female", "Acceptable (25-31%)"],
      [35, "female", "Obese (> 31%)"],
    ])("classifies %i% body fat for %s as %s", (percentage, gender, expected) => {
      expect(getClassification(percentage, gender as "male" | "female")).toBe(expected);
    });

    it("handles edge cases", () => {
      expect(getClassification(1, "male")).toBe("Unknown");
      expect(getClassification(9, "female")).toBe("Unknown");
      expect(getClassification(2, "male")).toBe("Essential fat (2-5%)");
      expect(getClassification(10, "female")).toBe("Essential fat (10-13%)");
    });

    it("handles boundary values", () => {
      // Male boundaries
      expect(getClassification(5, "male")).toBe("Essential fat (2-5%)");
      expect(getClassification(6, "male")).toBe("Athletic (6-13%)");
      expect(getClassification(13, "male")).toBe("Athletic (6-13%)");
      expect(getClassification(14, "male")).toBe("Fitness (14-17%)");
      expect(getClassification(17, "male")).toBe("Fitness (14-17%)");
      expect(getClassification(18, "male")).toBe("Acceptable (18-25%)");
      expect(getClassification(25, "male")).toBe("Acceptable (18-25%)");
      expect(getClassification(26, "male")).toBe("Obese (> 25%)");

      // Female boundaries
      expect(getClassification(13, "female")).toBe("Essential fat (10-13%)");
      expect(getClassification(14, "female")).toBe("Athletic (14-20%)");
      expect(getClassification(20, "female")).toBe("Athletic (14-20%)");
      expect(getClassification(21, "female")).toBe("Fitness (21-24%)");
      expect(getClassification(24, "female")).toBe("Fitness (21-24%)");
      expect(getClassification(25, "female")).toBe("Acceptable (25-31%)");
      expect(getClassification(31, "female")).toBe("Acceptable (25-31%)");
      expect(getClassification(32, "female")).toBe("Obese (> 31%)");
    });
  });
});
