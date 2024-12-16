import { durninFormula } from "../../formulas/durnin";
import { MeasurementSystem } from "../../schemas/calculator";
import { parse } from "../../schemas/calculator";

describe("Durnin & Womersley Formula", () => {
  describe("male calculations", () => {
    const maleInputs = {
      gender: "male" as const,
      age: 25,
      weight: 80, // 80kg
      bicepSkinfold: 8,
      tricepSkinfold: 10,
      subscapularSkinfold: 14,
      suprailiacSkinfold: 16,
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = durninFormula.calculate(maleInputs, "metric");
      expect(result.bodyFatPercentage).toBeCloseTo(18.37, 1);
      expect(result.fatMass).toBeCloseTo(14.7, 1);
      expect(result.leanMass).toBeCloseTo(65.3, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        gender: "male" as const,
        age: 25,
        weight: 176.37,
        bicepSkinfold: 8,
        tricepSkinfold: 10,
        subscapularSkinfold: 14,
        suprailiacSkinfold: 16,
      };
      const result = durninFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(18.37, 1);
      expect(result.fatMass).toBeCloseTo(32.4, 1);
      expect(result.leanMass).toBeCloseTo(143.97, 1);
    });

    it("should calculate differently for different age groups", () => {
      const ageGroups = [
        { age: 16, expectedBf: 23.6 }, // < 17
        { age: 18, expectedBf: 18.71 }, // 17-19
        { age: 25, expectedBf: 18.37 }, // 20-29
        { age: 35, expectedBf: 21.1 }, // 30-39
        { age: 45, expectedBf: 24.0 }, // 40-49
        { age: 55, expectedBf: 25.72 }, // 50+
      ];

      ageGroups.forEach(({ age, expectedBf }) => {
        const result = durninFormula.calculate({ ...maleInputs, age }, "metric");
        expect(result.bodyFatPercentage).toBeCloseTo(expectedBf, 1);
      });
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...maleInputs,
        bicepSkinfold: 5,
        tricepSkinfold: 5,
        subscapularSkinfold: 5,
        suprailiacSkinfold: 5,
      };
      expect(() => parse("durnin", minimalInputs, "metric")).toThrow();
    });
  });

  describe("female calculations", () => {
    const femaleInputs = {
      gender: "female" as const,
      age: 25,
      weight: 60, // 60kg
      bicepSkinfold: 12,
      tricepSkinfold: 15,
      subscapularSkinfold: 18,
      suprailiacSkinfold: 20,
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = durninFormula.calculate(femaleInputs, "metric");
      expect(result.bodyFatPercentage).toBeCloseTo(30.58, 1);
      expect(result.fatMass).toBeCloseTo(18.35, 1);
      expect(result.leanMass).toBeCloseTo(41.65, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        gender: "female" as const,
        age: 25,
        weight: 132.28,
        bicepSkinfold: 12,
        tricepSkinfold: 15,
        subscapularSkinfold: 18,
        suprailiacSkinfold: 20,
      };
      const result = durninFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(30.58, 1);
      expect(result.fatMass).toBeCloseTo(40.51, 1);
      expect(result.leanMass).toBeCloseTo(91.77, 1);
    });

    it("should calculate differently for different age groups", () => {
      const ageGroups = [
        { age: 16, expectedBf: 31.29 }, // < 17
        { age: 18, expectedBf: 29.66 }, // 17-19
        { age: 25, expectedBf: 30.62 }, // 20-29
        { age: 35, expectedBf: 31.65 }, // 30-39
        { age: 45, expectedBf: 34.18 }, // 40-49
        { age: 55, expectedBf: 36.74 }, // 50+
      ];

      ageGroups.forEach(({ age, expectedBf }) => {
        const result = durninFormula.calculate({ ...femaleInputs, age }, "metric");
        expect(result.bodyFatPercentage).toBeCloseTo(expectedBf, 1);
      });
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...femaleInputs,
        bicepSkinfold: 5,
        tricepSkinfold: 5,
        subscapularSkinfold: 5,
        suprailiacSkinfold: 5,
      };
      expect(() => parse("durnin", minimalInputs, "metric")).toThrow();
    });
  });

  describe("edge cases and error handling", () => {
    it("should throw error for zero measurements", () => {
      const zeroInputs = {
        gender: "male" as const,
        age: 0,
        weight: 0,
        bicepSkinfold: 0,
        tricepSkinfold: 0,
        subscapularSkinfold: 0,
        suprailiacSkinfold: 0,
      };
      expect(() => parse("durnin", zeroInputs, "metric")).toThrow();
    });

    it("should throw error for extreme measurement combinations", () => {
      const extremeInputs = {
        gender: "male" as const,
        age: 150,
        weight: 150,
        bicepSkinfold: 100,
        tricepSkinfold: 100,
        subscapularSkinfold: 100,
        suprailiacSkinfold: 100,
      };
      expect(() => parse("durnin", extremeInputs, "metric")).toThrow();
    });

    it("should throw error for floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        age: 25.123,
        weight: 1.23456789,
        bicepSkinfold: 9.87654321,
        tricepSkinfold: 8.7654321,
        subscapularSkinfold: 7.65432109,
        suprailiacSkinfold: 6.54321098,
      };
      expect(() => parse("durnin", inputs, "metric")).toThrow();
    });
  });

  describe("additional error handling", () => {
    it("should handle very large valid measurements without overflow", () => {
      const largeInputs = {
        gender: "male" as const,
        age: 120,
        weight: 299.99,
        bicepSkinfold: 99.99,
        tricepSkinfold: 99.99,
        subscapularSkinfold: 99.99,
        suprailiacSkinfold: 99.99,
      };
      expect(() => parse("durnin", largeInputs, "metric")).toThrow();
    });

    it("should handle very small valid measurements without underflow", () => {
      const smallInputs = {
        gender: "male" as const,
        age: 1,
        weight: 20.01,
        bicepSkinfold: 1.01,
        tricepSkinfold: 1.01,
        subscapularSkinfold: 1.01,
        suprailiacSkinfold: 1.01,
      };
      expect(() => parse("durnin", smallInputs, "metric")).toThrow();
    });
  });
});
