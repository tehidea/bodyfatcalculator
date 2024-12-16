import { parilloFormula } from "../../formulas/parillo";
import { MeasurementSystem } from "../../schemas/calculator";
import { parse } from "../../schemas/calculator";

describe("Parillo Formula", () => {
  describe("basic calculations", () => {
    const basicInputs = {
      weight: 80, // 80kg or 176.37lbs
      chestSkinfold: 12,
      abdomenSkinfold: 20,
      thighSkinfold: 15,
      bicepSkinfold: 8,
      tricepSkinfold: 10,
      subscapularSkinfold: 14,
      suprailiacSkinfold: 16,
      lowerBackSkinfold: 18,
      calfSkinfold: 12,
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = parilloFormula.calculate(basicInputs, "metric");
      // Sum of skinfolds = 12 + 20 + 15 + 8 + 10 + 14 + 16 + 18 + 12 = 125
      // Body Fat % = (125 * 27) / 176.37
      // = 19.12
      expect(result.bodyFatPercentage).toBeCloseTo(19.12, 1);
      expect(result.fatMass).toBeCloseTo(15.31, 1);
      expect(result.leanMass).toBeCloseTo(64.69, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        weight: 176.37,
        chestSkinfold: 12,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
        bicepSkinfold: 8,
        tricepSkinfold: 10,
        subscapularSkinfold: 14,
        suprailiacSkinfold: 16,
        lowerBackSkinfold: 18,
        calfSkinfold: 12,
      };
      const result = parilloFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(19.12, 1);
      expect(result.fatMass).toBeCloseTo(15.31, 1);
      expect(result.leanMass).toBeCloseTo(64.69, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...basicInputs,
        weight: 80,
        chestSkinfold: 5,
        abdomenSkinfold: 5,
        thighSkinfold: 5,
        bicepSkinfold: 5,
        tricepSkinfold: 5,
        subscapularSkinfold: 5,
        suprailiacSkinfold: 5,
        lowerBackSkinfold: 5,
        calfSkinfold: 5,
      };
      expect(() => parse("parillo", minimalInputs, "metric")).toThrow();
    });
  });

  describe("edge cases and error handling", () => {
    it("should throw error for zero measurements", () => {
      const zeroInputs = {
        weight: 0,
        chestSkinfold: 0,
        abdomenSkinfold: 0,
        thighSkinfold: 0,
        bicepSkinfold: 0,
        tricepSkinfold: 0,
        subscapularSkinfold: 0,
        suprailiacSkinfold: 0,
        lowerBackSkinfold: 0,
        calfSkinfold: 0,
      };
      expect(() => parse("parillo", zeroInputs, "metric")).toThrow();
    });

    it("should throw error for extreme measurement combinations", () => {
      const extremeInputs = {
        weight: 150,
        chestSkinfold: 100,
        abdomenSkinfold: 100,
        thighSkinfold: 100,
        bicepSkinfold: 100,
        tricepSkinfold: 100,
        subscapularSkinfold: 100,
        suprailiacSkinfold: 100,
        lowerBackSkinfold: 100,
        calfSkinfold: 100,
      };
      expect(() => parse("parillo", extremeInputs, "metric")).toThrow();
    });

    it("should throw error for floating point precision edge cases", () => {
      const inputs = {
        weight: 1.23456789,
        chestSkinfold: 9.87654321,
        abdomenSkinfold: 8.7654321,
        thighSkinfold: 7.65432109,
        bicepSkinfold: 6.54321098,
        tricepSkinfold: 5.43210987,
        subscapularSkinfold: 4.32109876,
        suprailiacSkinfold: 3.21098765,
        lowerBackSkinfold: 2.10987654,
        calfSkinfold: 1.09876543,
      };
      expect(() => parse("parillo", inputs, "metric")).toThrow();
    });
  });

  describe("measurement system conversion", () => {
    it("should produce same results for equivalent metric and imperial inputs", () => {
      const metricInputs = {
        weight: 80,
        chestSkinfold: 12,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
        bicepSkinfold: 8,
        tricepSkinfold: 10,
        subscapularSkinfold: 14,
        suprailiacSkinfold: 16,
        lowerBackSkinfold: 18,
        calfSkinfold: 12,
      };

      const imperialInputs = {
        weight: 176.37,
        chestSkinfold: 12,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
        bicepSkinfold: 8,
        tricepSkinfold: 10,
        subscapularSkinfold: 14,
        suprailiacSkinfold: 16,
        lowerBackSkinfold: 18,
        calfSkinfold: 12,
      };

      const metricResult = parilloFormula.calculate(metricInputs, "metric");
      const imperialResult = parilloFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });
  });

  describe("additional error handling", () => {
    it("should handle very large valid measurements without overflow", () => {
      const largeInputs = {
        weight: 299.99,
        chestSkinfold: 99.99,
        abdomenSkinfold: 99.99,
        thighSkinfold: 99.99,
        bicepSkinfold: 99.99,
        tricepSkinfold: 99.99,
        subscapularSkinfold: 99.99,
        suprailiacSkinfold: 99.99,
        lowerBackSkinfold: 99.99,
        calfSkinfold: 99.99,
      };
      expect(() => parse("parillo", largeInputs, "metric")).toThrow();
    });

    it("should handle very small valid measurements without underflow", () => {
      const smallInputs = {
        weight: 20.01,
        chestSkinfold: 1.01,
        abdomenSkinfold: 1.01,
        thighSkinfold: 1.01,
        bicepSkinfold: 1.01,
        tricepSkinfold: 1.01,
        subscapularSkinfold: 1.01,
        suprailiacSkinfold: 1.01,
        lowerBackSkinfold: 1.01,
        calfSkinfold: 1.01,
      };
      expect(() => parse("parillo", smallInputs, "metric")).toThrow();
    });
  });
});
