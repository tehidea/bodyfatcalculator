import { jackson7Formula } from "../../formulas/jackson7";
import { MeasurementSystem } from "../../schemas/calculator";
import { parse } from "../../schemas/calculator";

describe("Jackson-Pollock 7-Site Formula", () => {
  describe("male calculations", () => {
    const maleInputs = {
      gender: "male" as const,
      age: 25,
      weight: 80, // 80kg or 176.37lbs
      chestSkinfold: 10, // 10mm
      abdomenSkinfold: 20, // 20mm
      thighSkinfold: 15, // 15mm
      tricepSkinfold: 8, // 8mm
      subscapularSkinfold: 12, // 12mm
      suprailiacSkinfold: 18, // 18mm
      midaxillarySkinfold: 14, // 14mm
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = jackson7Formula.calculate(maleInputs, "metric");
      // Sum of skinfolds = 10 + 20 + 15 + 8 + 12 + 18 + 14 = 97
      // Body Density = 1.112 - 0.00043499 * 97 + 0.00000055 * 97^2 - 0.00028826 * 25
      // = 1.112 - 0.042194 + 0.005173 - 0.007207
      // = 1.067772
      // Body Fat % = 495 / 1.067772 - 450
      // = 13.56
      expect(result.bodyFatPercentage).toBeCloseTo(13.56, 1);
      expect(result.fatMass).toBeCloseTo(10.85, 1);
      expect(result.leanMass).toBeCloseTo(69.15, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...maleInputs,
        weight: 176.37,
        chestSkinfold: 10,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
        tricepSkinfold: 8,
        subscapularSkinfold: 12,
        suprailiacSkinfold: 18,
        midaxillarySkinfold: 14,
      };
      const result = jackson7Formula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(13.56, 1);
      expect(result.fatMass).toBeCloseTo(23.92, 1);
      expect(result.leanMass).toBeCloseTo(152.45, 1);
    });

    it("should calculate differently for different ages", () => {
      const olderInputs = {
        ...maleInputs,
        age: 45,
      };
      const result = jackson7Formula.calculate(olderInputs, "metric");
      // Sum of skinfolds = 10 + 20 + 15 + 8 + 12 + 18 + 14 = 97
      // Body Density = 1.112 - 0.00043499 * 97 + 0.00000055 * 97^2 - 0.00028826 * 45
      // = 1.112 - 0.042194 + 0.005173 - 0.012972
      // = 1.062007
      // Body Fat % = 495 / 1.062007 - 450
      // = 16.10
      expect(result.bodyFatPercentage).toBeCloseTo(16.1, 1);
      expect(result.fatMass).toBeCloseTo(12.88, 1);
      expect(result.leanMass).toBeCloseTo(67.12, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...maleInputs,
        weight: 80,
        chestSkinfold: 5,
        abdomenSkinfold: 5,
        thighSkinfold: 5,
        tricepSkinfold: 5,
        subscapularSkinfold: 5,
        suprailiacSkinfold: 5,
        midaxillarySkinfold: 5,
      };
      expect(() => parse("jack7", minimalInputs, "metric")).toThrow();
    });
  });

  describe("female calculations", () => {
    const femaleInputs = {
      gender: "female" as const,
      age: 25,
      weight: 60, // 60kg or 132.28lbs
      chestSkinfold: 12, // 12mm
      abdomenSkinfold: 18, // 18mm
      thighSkinfold: 22, // 22mm
      tricepSkinfold: 15, // 15mm
      subscapularSkinfold: 14, // 14mm
      suprailiacSkinfold: 20, // 20mm
      midaxillarySkinfold: 16, // 16mm
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = jackson7Formula.calculate(femaleInputs, "metric");
      // Sum of skinfolds = 12 + 18 + 22 + 15 + 14 + 20 + 16 = 117
      // Body Density = 1.097 - 0.00046971 * 117 + 0.00000056 * 117^2 - 0.00012828 * 25
      // = 1.097 - 0.054956 + 0.007665 - 0.003207
      // = 1.046502
      // Body Fat % = 495 / 1.046502 - 450
      // = 23.00
      expect(result.bodyFatPercentage).toBeCloseTo(23.0, 1);
      expect(result.fatMass).toBeCloseTo(13.8, 1);
      expect(result.leanMass).toBeCloseTo(46.2, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...femaleInputs,
        weight: 132.28,
        chestSkinfold: 12,
        abdomenSkinfold: 18,
        thighSkinfold: 22,
        tricepSkinfold: 15,
        subscapularSkinfold: 14,
        suprailiacSkinfold: 20,
        midaxillarySkinfold: 16,
      };
      const result = jackson7Formula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(23.0, 1);
      expect(result.fatMass).toBeCloseTo(30.42, 1);
      expect(result.leanMass).toBeCloseTo(101.86, 1);
    });

    it("should calculate differently for different ages", () => {
      const olderInputs = {
        ...femaleInputs,
        age: 45,
      };
      const result = jackson7Formula.calculate(olderInputs, "metric");
      // Sum of skinfolds = 12 + 18 + 22 + 15 + 14 + 20 + 16 = 117
      // Body Density = 1.097 - 0.00046971 * 117 + 0.00000056 * 117^2 - 0.00012828 * 45
      // = 1.097 - 0.054956 + 0.007665 - 0.005773
      // = 1.043936
      // Body Fat % = 495 / 1.043936 - 450
      // = 24.17
      expect(result.bodyFatPercentage).toBeCloseTo(24.17, 1);
      expect(result.fatMass).toBeCloseTo(14.5, 1);
      expect(result.leanMass).toBeCloseTo(45.5, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...femaleInputs,
        weight: 60,
        chestSkinfold: 5,
        abdomenSkinfold: 5,
        thighSkinfold: 5,
        tricepSkinfold: 5,
        subscapularSkinfold: 5,
        suprailiacSkinfold: 5,
        midaxillarySkinfold: 5,
      };
      expect(() => parse("jack7", minimalInputs, "metric")).toThrow();
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
        tricepSkinfold: 0,
        subscapularSkinfold: 0,
        suprailiacSkinfold: 0,
        midaxillarySkinfold: 0,
      };
      expect(() => parse("jack7", zeroInputs, "metric")).toThrow();
    });

    it("should throw error for extreme measurement combinations", () => {
      const extremeInputs = {
        gender: "male" as const,
        age: 150,
        weight: 150,
        chestSkinfold: 100,
        abdomenSkinfold: 100,
        thighSkinfold: 100,
        tricepSkinfold: 100,
        subscapularSkinfold: 100,
        suprailiacSkinfold: 100,
        midaxillarySkinfold: 100,
      };
      expect(() => parse("jack7", extremeInputs, "metric")).toThrow();
    });

    it("should throw error for floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        age: 25.123,
        weight: 1.23456789,
        chestSkinfold: 9.87654321,
        abdomenSkinfold: 8.7654321,
        thighSkinfold: 7.65432109,
        tricepSkinfold: 6.54321098,
        subscapularSkinfold: 5.43210987,
        suprailiacSkinfold: 4.32109876,
        midaxillarySkinfold: 3.21098765,
      };
      expect(() => parse("jack7", inputs, "metric")).toThrow();
    });
  });

  describe("measurement system conversion", () => {
    it("should produce same results for equivalent metric and imperial inputs (male)", () => {
      const metricInputs = {
        gender: "male" as const,
        age: 25,
        weight: 80,
        chestSkinfold: 10,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
        tricepSkinfold: 8,
        subscapularSkinfold: 12,
        suprailiacSkinfold: 18,
        midaxillarySkinfold: 14,
      };

      const imperialInputs = {
        gender: "male" as const,
        age: 25,
        weight: 176.37,
        chestSkinfold: 10,
        abdomenSkinfold: 20,
        thighSkinfold: 15,
        tricepSkinfold: 8,
        subscapularSkinfold: 12,
        suprailiacSkinfold: 18,
        midaxillarySkinfold: 14,
      };

      const metricResult = jackson7Formula.calculate(metricInputs, "metric");
      const imperialResult = jackson7Formula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass * 2.20462).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass * 2.20462).toBeCloseTo(imperialResult.leanMass, 1);
    });

    it("should produce same results for equivalent metric and imperial inputs (female)", () => {
      const metricInputs = {
        gender: "female" as const,
        age: 25,
        weight: 60,
        chestSkinfold: 12,
        abdomenSkinfold: 18,
        thighSkinfold: 22,
        tricepSkinfold: 15,
        subscapularSkinfold: 14,
        suprailiacSkinfold: 20,
        midaxillarySkinfold: 16,
      };

      const imperialInputs = {
        gender: "female" as const,
        age: 25,
        weight: 132.28,
        chestSkinfold: 12,
        abdomenSkinfold: 18,
        thighSkinfold: 22,
        tricepSkinfold: 15,
        subscapularSkinfold: 14,
        suprailiacSkinfold: 20,
        midaxillarySkinfold: 16,
      };

      const metricResult = jackson7Formula.calculate(metricInputs, "metric");
      const imperialResult = jackson7Formula.calculate(imperialInputs, "imperial");

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
        tricepSkinfold: 99.99,
        subscapularSkinfold: 99.99,
        suprailiacSkinfold: 99.99,
        midaxillarySkinfold: 99.99,
      };

      expect(() => parse("jack7", largeInputs, "metric")).toThrow();
    });

    it("should handle very small valid measurements without underflow", () => {
      const smallInputs = {
        gender: "male" as const,
        age: 1,
        weight: 20.01, // Just over min
        chestSkinfold: 1.01, // Just over min
        abdomenSkinfold: 1.01,
        thighSkinfold: 1.01,
        tricepSkinfold: 1.01,
        subscapularSkinfold: 1.01,
        suprailiacSkinfold: 1.01,
        midaxillarySkinfold: 1.01,
      };

      expect(() => parse("jack7", smallInputs, "metric")).toThrow();
    });

    it("should handle floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        age: 25.123,
        weight: 1.23456789,
        chestSkinfold: 9.87654321,
        abdomenSkinfold: 8.7654321,
        thighSkinfold: 7.65432109,
        tricepSkinfold: 6.54321098,
        subscapularSkinfold: 5.43210987,
        suprailiacSkinfold: 4.32109876,
        midaxillarySkinfold: 3.21098765,
      };

      expect(() => parse("jack7", inputs, "metric")).toThrow();
    });
  });
});
