import { jackson4Formula } from "../../formulas/jackson4";
import { MeasurementSystem } from "../../schemas/calculator";
import { parse } from "../../schemas/calculator";

describe("Jackson-Pollock 4-Site Formula", () => {
  describe("male calculations", () => {
    const maleInputs = {
      gender: "male" as const,
      age: 25,
      weight: 80, // 80kg or 176.37lbs
      tricepSkinfold: 10, // 10mm
      abdomenSkinfold: 20, // 20mm
      thighSkinfold: 15, // 15mm
      suprailiacSkinfold: 18, // 18mm
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = jackson4Formula.calculate(maleInputs, "metric");
      // Sum of skinfolds = 10 + 20 + 15 + 18 = 63
      // Body Fat % = 0.29288 * 63 - 0.0005 * 63^2 + 0.15845 * 25 - 5.76377
      // = 18.45144 - 1.98450 + 3.96125 - 5.76377
      // = 14.66442
      expect(result.bodyFatPercentage).toBeCloseTo(14.66, 1);
      expect(result.fatMass).toBeCloseTo(11.73, 1);
      expect(result.leanMass).toBeCloseTo(68.27, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...maleInputs,
        weight: 176.37,
        tricepSkinfold: 10,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
        suprailiacSkinfold: 18,
      };
      const result = jackson4Formula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(14.66, 1);
      expect(result.fatMass).toBeCloseTo(25.86, 1);
      expect(result.leanMass).toBeCloseTo(150.51, 1);
    });

    it("should calculate differently for different ages", () => {
      const olderInputs = {
        ...maleInputs,
        age: 45,
      };
      const result = jackson4Formula.calculate(olderInputs, "metric");
      // Sum of skinfolds = 10 + 20 + 15 + 18 = 63
      // Body Fat % = 0.29288 * 63 - 0.0005 * 63^2 + 0.15845 * 45 - 5.76377
      // = 18.45144 - 1.98450 + 7.13025 - 5.76377
      // = 17.83342
      expect(result.bodyFatPercentage).toBeCloseTo(17.83, 1);
      expect(result.fatMass).toBeCloseTo(14.26, 1);
      expect(result.leanMass).toBeCloseTo(65.74, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...maleInputs,
        weight: 80,
        tricepSkinfold: 5,
        abdomenSkinfold: 5,
        thighSkinfold: 5,
        suprailiacSkinfold: 5,
      };
      expect(() => parse("jack4", minimalInputs, "metric")).toThrow();
    });
  });

  describe("female calculations", () => {
    const femaleInputs = {
      gender: "female" as const,
      age: 25,
      weight: 60, // 60kg or 132.28lbs
      tricepSkinfold: 15, // 15mm
      abdomenSkinfold: 18, // 18mm
      thighSkinfold: 22, // 22mm
      suprailiacSkinfold: 20, // 20mm
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = jackson4Formula.calculate(femaleInputs, "metric");
      // Sum of skinfolds = 15 + 18 + 22 + 20 = 75
      // Body Fat % = 0.29669 * 75 - 0.00043 * 75^2 + 0.02963 * 25 + 1.4072
      // = 22.25175 - 2.41875 + 0.74075 + 1.4072
      // = 21.98095
      expect(result.bodyFatPercentage).toBeCloseTo(21.98, 1);
      expect(result.fatMass).toBeCloseTo(13.19, 1);
      expect(result.leanMass).toBeCloseTo(46.81, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...femaleInputs,
        weight: 132.28,
        tricepSkinfold: 15,
        abdomenSkinfold: 18,
        thighSkinfold: 22,
        suprailiacSkinfold: 20,
      };
      const result = jackson4Formula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(21.98, 1);
      expect(result.fatMass).toBeCloseTo(29.07, 1);
      expect(result.leanMass).toBeCloseTo(103.21, 1);
    });

    it("should calculate differently for different ages", () => {
      const olderInputs = {
        ...femaleInputs,
        age: 45,
      };
      const result = jackson4Formula.calculate(olderInputs, "metric");
      // Sum of skinfolds = 15 + 18 + 22 + 20 = 75
      // Body Fat % = 0.29669 * 75 - 0.00043 * 75^2 + 0.02963 * 45 + 1.4072
      // = 22.25175 - 2.41875 + 1.33335 + 1.4072
      // = 22.57355
      expect(result.bodyFatPercentage).toBeCloseTo(22.57, 1);
      expect(result.fatMass).toBeCloseTo(13.54, 1);
      expect(result.leanMass).toBeCloseTo(46.46, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...femaleInputs,
        weight: 60,
        tricepSkinfold: 5,
        abdomenSkinfold: 5,
        thighSkinfold: 5,
        suprailiacSkinfold: 5,
      };
      expect(() => parse("jack4", minimalInputs, "metric")).toThrow();
    });
  });

  describe("edge cases and error handling", () => {
    it("should throw error for zero measurements", () => {
      const zeroInputs = {
        gender: "male" as const,
        age: 0,
        weight: 0,
        tricepSkinfold: 0,
        abdomenSkinfold: 0,
        thighSkinfold: 0,
        suprailiacSkinfold: 0,
      };
      expect(() => parse("jack4", zeroInputs, "metric")).toThrow();
    });

    it("should throw error for extreme measurement combinations", () => {
      const extremeInputs = {
        gender: "male" as const,
        age: 150,
        weight: 150,
        tricepSkinfold: 100,
        abdomenSkinfold: 100,
        thighSkinfold: 100,
        suprailiacSkinfold: 100,
      };
      expect(() => parse("jack4", extremeInputs, "metric")).toThrow();
    });

    it("should throw error for floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        age: 25.123,
        weight: 1.23456789,
        tricepSkinfold: 9.87654321,
        abdomenSkinfold: 8.7654321,
        thighSkinfold: 7.65432109,
        suprailiacSkinfold: 6.54321098,
      };
      expect(() => parse("jack4", inputs, "metric")).toThrow();
    });
  });

  describe("measurement system conversion", () => {
    it("should produce same results for equivalent metric and imperial inputs (male)", () => {
      const metricInputs = {
        gender: "male" as const,
        age: 25,
        weight: 80,
        tricepSkinfold: 10,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
        suprailiacSkinfold: 18,
      };

      const imperialInputs = {
        gender: "male" as const,
        age: 25,
        weight: 176.37,
        tricepSkinfold: 10,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
        suprailiacSkinfold: 18,
      };

      const metricResult = jackson4Formula.calculate(metricInputs, "metric");
      const imperialResult = jackson4Formula.calculate(imperialInputs, "imperial");

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
        abdomenSkinfold: 18,
        thighSkinfold: 22,
        suprailiacSkinfold: 20,
      };

      const imperialInputs = {
        gender: "female" as const,
        age: 25,
        weight: 132.28,
        tricepSkinfold: 15,
        abdomenSkinfold: 18,
        thighSkinfold: 22,
        suprailiacSkinfold: 20,
      };

      const metricResult = jackson4Formula.calculate(metricInputs, "metric");
      const imperialResult = jackson4Formula.calculate(imperialInputs, "imperial");

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
        tricepSkinfold: 99.99, // Just under max
        abdomenSkinfold: 99.99,
        thighSkinfold: 99.99,
        suprailiacSkinfold: 99.99,
      };

      expect(() => parse("jack4", largeInputs, "metric")).toThrow();
    });

    it("should handle very small valid measurements without underflow", () => {
      const smallInputs = {
        gender: "male" as const,
        age: 1,
        weight: 20.01, // Just over min
        tricepSkinfold: 1.01, // Just over min
        abdomenSkinfold: 1.01,
        thighSkinfold: 1.01,
        suprailiacSkinfold: 1.01,
      };

      expect(() => parse("jack4", smallInputs, "metric")).toThrow();
    });

    it("should handle floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        age: 25.123,
        weight: 1.23456789,
        tricepSkinfold: 9.87654321,
        abdomenSkinfold: 8.7654321,
        thighSkinfold: 7.65432109,
        suprailiacSkinfold: 6.54321098,
      };

      expect(() => parse("jack4", inputs, "metric")).toThrow();
    });
  });
});
