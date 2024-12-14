import { calculateResults } from "../../formulas";
import { getClassification } from "../../formulas/utils";
import { Formula, CalculatorInputs, MeasurementSystem } from "../../types/calculator";

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
  });

  describe("Modified YMCA Formula", () => {
    const formula: Formula = "mymca";

    it("calculates male body fat with minimal inputs", async () => {
      const result = await calculateResults(
        formula,
        "male",
        maleBaseInputs,
        defaultParams.measurementSystem
      );
      expect(result.bodyFatPercentage).toBeCloseTo(17.0, 1);
    });

    it("calculates female body fat with complete inputs", async () => {
      const inputs: CalculatorInputs = {
        ...femaleBaseInputs,
        wristCircumference: 15,
        forearmCircumference: 23,
        hipsCircumference: 90,
      };
      const result = await calculateResults(
        formula,
        "female",
        inputs,
        defaultParams.measurementSystem
      );
      expect(result.bodyFatPercentage).toBeCloseTo(25.68, 2);
    });
  });

  describe("Covert Bailey Formula", () => {
    const formula: Formula = "covert";

    describe("Male calculations", () => {
      const maleInputs: CalculatorInputs = {
        hipsCircumference: 100,
        waistCircumference: 85,
        forearmCircumference: 30,
        wristCircumference: 17,
      };

      it("calculates correctly for age ≤ 30", async () => {
        const result = await calculateResults(
          formula,
          "male",
          { ...maleInputs, age: 25 },
          defaultParams.measurementSystem
        );
        const expected = calculateExpectedCovertBaileyMale(maleInputs, false);
        expect(result.bodyFatPercentage).toBeCloseTo(expected, 1);
      });

      it("calculates correctly for age > 30", async () => {
        const result = await calculateResults(
          formula,
          "male",
          { ...maleInputs, age: 35 },
          defaultParams.measurementSystem
        );
        const expected = calculateExpectedCovertBaileyMale(maleInputs, true);
        expect(result.bodyFatPercentage).toBeCloseTo(expected, 1);
      });
    });

    // Similar structure for female calculations...
  });

  describe("Input Validation", () => {
    it("rejects invalid measurements", async () => {
      await expectCalculationError(
        "ymca",
        "male",
        { ...maleBaseInputs, weight: 0 },
        "Please check your measurements. The calculation resulted in an invalid value."
      );

      await expectCalculationError(
        "ymca",
        "male",
        { ...maleBaseInputs, weight: 200, waistCircumference: 50 },
        "Please check your measurements. Body fat percentage cannot be negative."
      );

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
  });
});

// Helper functions
function calculateExpectedCovertBaileyMale(inputs: CalculatorInputs, isOver30: boolean): number {
  const { waistCircumference, hipsCircumference, forearmCircumference, wristCircumference } =
    inputs;
  const forearmMultiplier = isOver30 ? 2.7 : 3;
  return (
    waistCircumference * 0.393701 +
    0.5 * hipsCircumference * 0.393701 -
    forearmMultiplier * forearmCircumference * 0.393701 -
    wristCircumference * 0.393701
  );
}
