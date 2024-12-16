import { ymcaFormula } from "../../formulas/ymca";
import { MeasurementSystem } from "../../schemas/calculator";
import { parse } from "../../schemas/calculator";

describe("YMCA Formula", () => {
  describe("male calculations", () => {
    const maleInputs = {
      gender: "male" as const,
      weight: 80, // 80kg or 176.37lbs
      waistCircumference: 85, // 85cm or 33.46in
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = ymcaFormula.calculate(maleInputs, "metric");
      // Expected values based on the formula:
      // BF% = (100 * (4.15 * 33.46 - 0.082 * 176.37 - 98.42)) / 176.37
      expect(result.bodyFatPercentage).toBeCloseTo(14.73, 1);
      expect(result.fatMass).toBeCloseTo(11.78, 1);
      expect(result.leanMass).toBeCloseTo(68.22, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...maleInputs,
        weight: 176.37,
        waistCircumference: 33.46,
      };
      const result = ymcaFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(14.73, 1);
      expect(result.fatMass).toBeCloseTo(11.78, 1);
      expect(result.leanMass).toBeCloseTo(68.22, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...maleInputs,
        weight: 80,
        waistCircumference: 60,
      };
      expect(() => parse("ymca", minimalInputs, "metric")).toThrow();
    });
  });

  describe("female calculations", () => {
    const femaleInputs = {
      gender: "female" as const,
      weight: 60, // 60kg or 132.28lbs
      waistCircumference: 70, // 70cm or 27.56in
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = ymcaFormula.calculate(femaleInputs, "metric");
      // Expected values based on the formula:
      // BF% = (100 * (4.15 * 27.56 - 0.082 * 132.28 - 76.76)) / 132.28
      expect(result.bodyFatPercentage).toBeCloseTo(20.24, 1);
      expect(result.fatMass).toBeCloseTo(12.14, 1);
      expect(result.leanMass).toBeCloseTo(47.86, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...femaleInputs,
        weight: 132.28,
        waistCircumference: 27.56,
      };
      const result = ymcaFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(20.24, 1);
      expect(result.fatMass).toBeCloseTo(12.14, 1);
      expect(result.leanMass).toBeCloseTo(47.86, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...femaleInputs,
        weight: 60,
        waistCircumference: 55,
      };
      expect(() => parse("ymca", minimalInputs, "metric")).toThrow();
    });
  });

  describe("edge cases and error handling", () => {
    it("should throw error for zero measurements", () => {
      const zeroInputs = {
        gender: "male" as const,
        weight: 0,
        waistCircumference: 0,
      };
      expect(() => parse("ymca", zeroInputs, "metric")).toThrow();
    });

    it("should throw error for extreme measurement combinations", () => {
      const extremeInputs = {
        gender: "male" as const,
        weight: 150,
        waistCircumference: 60,
      };
      expect(() => parse("ymca", extremeInputs, "metric")).toThrow();
    });

    it("should throw error for floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        weight: 1.23456789,
        waistCircumference: 9.87654321,
      };
      expect(() => parse("ymca", inputs, "metric")).toThrow();
    });
  });

  describe("measurement system conversion", () => {
    it("should produce same results for equivalent metric and imperial inputs (male)", () => {
      const metricInputs = {
        gender: "male" as const,
        weight: 80,
        waistCircumference: 85,
      };

      const imperialInputs = {
        gender: "male" as const,
        weight: 176.37,
        waistCircumference: 33.46,
      };

      const metricResult = ymcaFormula.calculate(metricInputs, "metric");
      const imperialResult = ymcaFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });

    it("should produce same results for equivalent metric and imperial inputs (female)", () => {
      const metricInputs = {
        gender: "female" as const,
        weight: 60,
        waistCircumference: 70,
      };

      const imperialInputs = {
        gender: "female" as const,
        weight: 132.28,
        waistCircumference: 27.56,
      };

      const metricResult = ymcaFormula.calculate(metricInputs, "metric");
      const imperialResult = ymcaFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });
  });

  describe("measurement system conversion edge cases", () => {
    it("should handle fractional measurements in both systems", () => {
      const metricInputs = {
        gender: "male" as const,
        weight: 80.5,
        waistCircumference: 85.7,
      };

      const imperialInputs = {
        gender: "male" as const,
        weight: 177.47, // 80.5kg
        waistCircumference: 33.74, // 85.7cm
      };

      const metricResult = ymcaFormula.calculate(metricInputs, "metric");
      const imperialResult = ymcaFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });

    it("should handle very small measurement differences", () => {
      const baseInputs = {
        gender: "male" as const,
        weight: 80,
      };

      // Test with very close waist measurements
      const result1 = ymcaFormula.calculate({ ...baseInputs, waistCircumference: 85 }, "metric");
      const result2 = ymcaFormula.calculate(
        { ...baseInputs, waistCircumference: 85.001 },
        "metric"
      );

      expect(result1.bodyFatPercentage).toBeCloseTo(result2.bodyFatPercentage, 3);
    });
  });

  describe("additional error handling", () => {
    it("should handle very large valid measurements without overflow", () => {
      const largeInputs = {
        gender: "male" as const,
        weight: 299.99, // Just under max
        waistCircumference: 199.99, // Just under max
      };

      expect(() => parse("ymca", largeInputs, "metric")).toThrow();
    });

    it("should handle very small valid measurements without underflow", () => {
      const smallInputs = {
        gender: "male" as const,
        weight: 20.01, // Just over min
        waistCircumference: 1.01, // Just over min
      };

      expect(() => parse("ymca", smallInputs, "metric")).toThrow();
    });

    it("should handle floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        weight: 1.23456789,
        waistCircumference: 9.87654321,
      };

      expect(() => parse("ymca", inputs, "metric")).toThrow();
    });
  });
});
