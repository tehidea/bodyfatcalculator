import { jackson3Formula } from "../../formulas/jackson3";
import { MeasurementSystem } from "../../schemas/calculator";
import { parse } from "../../schemas/calculator";

describe("Jackson-Pollock 3-Site Formula", () => {
  describe("male calculations", () => {
    const maleInputs = {
      gender: "male" as const,
      age: 25,
      weight: 80, // 80kg or 176.37lbs
      chestSkinfold: 12, // 12mm
      abdomenSkinfold: 20, // 20mm
      thighSkinfold: 15, // 15mm
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = jackson3Formula.calculate(maleInputs, "metric");
      // Sum of skinfolds = 12 + 20 + 15 = 47
      // Body Density = 1.10938 - 0.0008267 * 47 + 0.0000016 * 47^2 - 0.0002574 * 25
      // = 1.10938 - 0.038855 + 0.003536 - 0.006435
      // = 1.067626
      // Body Fat % = 495 / 1.067626 - 450
      // = 13.65
      expect(result.bodyFatPercentage).toBeCloseTo(13.65, 1);
      expect(result.fatMass).toBeCloseTo(10.92, 1);
      expect(result.leanMass).toBeCloseTo(69.08, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...maleInputs,
        weight: 176.37,
        chestSkinfold: 12,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
      };
      const result = jackson3Formula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(13.65, 1);
      expect(result.fatMass).toBeCloseTo(24.07, 1);
      expect(result.leanMass).toBeCloseTo(152.3, 1);
    });

    it("should calculate differently for different ages", () => {
      const olderInputs = {
        ...maleInputs,
        age: 45,
      };
      const result = jackson3Formula.calculate(olderInputs, "metric");
      // Sum of skinfolds = 12 + 20 + 15 = 47
      // Body Density = 1.10938 - 0.0008267 * 47 + 0.0000016 * 47^2 - 0.0002574 * 45
      // = 1.10938 - 0.038855 + 0.003536 - 0.011583
      // = 1.062478
      // Body Fat % = 495 / 1.062478 - 450
      // = 15.89
      expect(result.bodyFatPercentage).toBeCloseTo(15.89, 1);
      expect(result.fatMass).toBeCloseTo(12.71, 1);
      expect(result.leanMass).toBeCloseTo(67.29, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...maleInputs,
        weight: 80,
        chestSkinfold: 5,
        abdomenSkinfold: 5,
        thighSkinfold: 5,
      };
      expect(() => parse("jack3", minimalInputs, "metric")).toThrow();
    });
  });

  describe("female calculations", () => {
    const femaleInputs = {
      gender: "female" as const,
      age: 25,
      weight: 60, // 60kg or 132.28lbs
      tricepSkinfold: 15, // 15mm
      suprailiacSkinfold: 18, // 18mm
      thighSkinfold: 22, // 22mm
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = jackson3Formula.calculate(femaleInputs, "metric");
      // Sum of skinfolds = 15 + 18 + 22 = 55
      // Body Density = 1.0994921 - 0.0009929 * 55 + 0.0000023 * 55^2 - 0.0001392 * 25
      // = 1.0994921 - 0.054610 + 0.006958 - 0.00348
      // = 1.048760
      // Body Fat % = 495 / 1.048760 - 450
      // = 22.16
      expect(result.bodyFatPercentage).toBeCloseTo(22.16, 1);
      expect(result.fatMass).toBeCloseTo(13.3, 1);
      expect(result.leanMass).toBeCloseTo(46.7, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...femaleInputs,
        weight: 132.28,
        tricepSkinfold: 15,
        suprailiacSkinfold: 18,
        thighSkinfold: 22,
      };
      const result = jackson3Formula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(22.16, 1);
      expect(result.fatMass).toBeCloseTo(29.32, 1);
      expect(result.leanMass).toBeCloseTo(102.96, 1);
    });

    it("should calculate differently for different ages", () => {
      const olderInputs = {
        ...femaleInputs,
        age: 45,
      };
      const result = jackson3Formula.calculate(olderInputs, "metric");
      // Sum of skinfolds = 15 + 18 + 22 = 55
      // Body Density = 1.0994921 - 0.0009929 * 55 + 0.0000023 * 55^2 - 0.0001392 * 45
      // = 1.0994921 - 0.054610 + 0.006958 - 0.006264
      // = 1.045576
      // Body Fat % = 495 / 1.045576 - 450
      // = 23.42
      expect(result.bodyFatPercentage).toBeCloseTo(23.42, 1);
      expect(result.fatMass).toBeCloseTo(14.05, 1);
      expect(result.leanMass).toBeCloseTo(45.95, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...femaleInputs,
        weight: 60,
        tricepSkinfold: 5,
        suprailiacSkinfold: 5,
        thighSkinfold: 5,
      };
      expect(() => parse("jack3", minimalInputs, "metric")).toThrow();
    });
  });

  describe("edge cases and error handling", () => {
    it("should throw error for zero measurements", () => {
      const zeroInputs = {
        gender: "male" as const,
        age: 0,
        weight: 0,
        chestSkinfold: 0,
        abdomenSkinfold: 0,
        thighSkinfold: 0,
      };
      expect(() => parse("jack3", zeroInputs, "metric")).toThrow();
    });

    it("should throw error for extreme measurement combinations", () => {
      const extremeInputs = {
        gender: "male" as const,
        age: 150,
        weight: 150,
        chestSkinfold: 100,
        abdomenSkinfold: 100,
        thighSkinfold: 100,
      };
      expect(() => parse("jack3", extremeInputs, "metric")).toThrow();
    });

    it("should throw error for floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        age: 25.123,
        weight: 1.23456789,
        chestSkinfold: 9.87654321,
        abdomenSkinfold: 8.7654321,
        thighSkinfold: 7.65432109,
      };
      expect(() => parse("jack3", inputs, "metric")).toThrow();
    });
  });

  describe("measurement system conversion", () => {
    it("should produce same results for equivalent metric and imperial inputs (male)", () => {
      const metricInputs = {
        gender: "male" as const,
        age: 25,
        weight: 80,
        chestSkinfold: 12,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
      };

      const imperialInputs = {
        gender: "male" as const,
        age: 25,
        weight: 176.37,
        chestSkinfold: 12,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
      };

      const metricResult = jackson3Formula.calculate(metricInputs, "metric");
      const imperialResult = jackson3Formula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass * 2.20462).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass * 2.20462).toBeCloseTo(imperialResult.leanMass, 1);
    });

    it("should produce same results for equivalent metric and imperial inputs (female)", () => {
      const metricInputs = {
        gender: "female" as const,
        age: 25,
        weight: 60,
        tricepSkinfold: 15,
        suprailiacSkinfold: 18,
        thighSkinfold: 22,
      };

      const imperialInputs = {
        gender: "female" as const,
        age: 25,
        weight: 132.28,
        tricepSkinfold: 15,
        suprailiacSkinfold: 18,
        thighSkinfold: 22,
      };

      const metricResult = jackson3Formula.calculate(metricInputs, "metric");
      const imperialResult = jackson3Formula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass * 2.20462).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass * 2.20462).toBeCloseTo(imperialResult.leanMass, 1);
    });
  });

  describe("additional error handling", () => {
    it("should handle very large valid measurements without overflow", () => {
      const largeInputs = {
        gender: "male" as const,
        age: 120,
        weight: 299.99, // Just under max
        chestSkinfold: 99.99, // Just under max
        abdomenSkinfold: 99.99,
        thighSkinfold: 99.99,
      };

      expect(() => parse("jack3", largeInputs, "metric")).toThrow();
    });

    it("should handle very small valid measurements without underflow", () => {
      const smallInputs = {
        gender: "male" as const,
        age: 1,
        weight: 20.01, // Just over min
        chestSkinfold: 1.01, // Just over min
        abdomenSkinfold: 1.01,
        thighSkinfold: 1.01,
      };

      expect(() => parse("jack3", smallInputs, "metric")).toThrow();
    });

    it("should handle floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        age: 25.123,
        weight: 1.23456789,
        chestSkinfold: 9.87654321,
        abdomenSkinfold: 8.7654321,
        thighSkinfold: 7.65432109,
      };

      expect(() => parse("jack3", inputs, "metric")).toThrow();
    });
  });
});
