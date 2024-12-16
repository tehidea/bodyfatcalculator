import { mymcaFormula } from "../../formulas/mymca";
import { MeasurementSystem } from "../../schemas/calculator";
import { parse } from "../../schemas/calculator";

describe("Modified YMCA Formula", () => {
  describe("male calculations", () => {
    const maleInputs = {
      gender: "male" as const,
      weight: 80, // 80kg or 176.37lbs
      waistCircumference: 85, // 85cm or 33.46in
      wristCircumference: 17, // 17cm or 6.69in
      forearmCircumference: 30, // 30cm or 11.81in
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = mymcaFormula.calculate(maleInputs, "metric");
      expect(result.bodyFatPercentage).toBeCloseTo(17.0, 1);
      expect(result.fatMass).toBeCloseTo(13.6, 1);
      expect(result.leanMass).toBeCloseTo(66.4, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...maleInputs,
        weight: 176.37,
        waistCircumference: 33.46,
        wristCircumference: 6.69,
        forearmCircumference: 11.81,
      };
      const result = mymcaFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(17.0, 1);
      expect(result.fatMass).toBeCloseTo(13.6, 1);
      expect(result.leanMass).toBeCloseTo(66.4, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...maleInputs,
        weight: 80,
        waistCircumference: 60,
        wristCircumference: 10,
        forearmCircumference: 20,
      };
      expect(() => parse("mymca", minimalInputs, "metric")).toThrow();
    });
  });

  describe("female calculations", () => {
    const femaleInputs = {
      gender: "female" as const,
      weight: 60, // 60kg or 132.28lbs
      waistCircumference: 70, // 70cm or 27.56in
      wristCircumference: 15, // 15cm or 5.91in
      forearmCircumference: 25, // 25cm or 9.84in
      hipsCircumference: 90, // 90cm or 35.43in
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = mymcaFormula.calculate(femaleInputs, "metric");
      expect(result.bodyFatPercentage).toBeCloseTo(25.2, 1);
      expect(result.fatMass).toBeCloseTo(15.1, 1);
      expect(result.leanMass).toBeCloseTo(44.9, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...femaleInputs,
        weight: 132.28,
        waistCircumference: 27.56,
        wristCircumference: 5.91,
        forearmCircumference: 9.84,
        hipsCircumference: 35.43,
      };
      const result = mymcaFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(25.2, 1);
      expect(result.fatMass).toBeCloseTo(15.1, 1);
      expect(result.leanMass).toBeCloseTo(44.9, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...femaleInputs,
        weight: 60,
        waistCircumference: 55,
        wristCircumference: 10,
        forearmCircumference: 20,
        hipsCircumference: 75,
      };
      expect(() => parse("mymca", minimalInputs, "metric")).toThrow();
    });
  });

  describe("edge cases and error handling", () => {
    it("should throw error for zero measurements", () => {
      const zeroInputs = {
        gender: "male" as const,
        weight: 0,
        waistCircumference: 0,
        wristCircumference: 0,
        forearmCircumference: 0,
      };
      expect(() => parse("mymca", zeroInputs, "metric")).toThrow();
    });

    it("should throw error for extreme measurement combinations", () => {
      const extremeInputs = {
        gender: "male" as const,
        weight: 150,
        waistCircumference: 60,
        wristCircumference: 25,
        forearmCircumference: 45,
      };
      expect(() => parse("mymca", extremeInputs, "metric")).toThrow();
    });

    it("should throw error for floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        weight: 1.23456789,
        waistCircumference: 9.87654321,
        wristCircumference: 2.34567891,
        forearmCircumference: 3.45678912,
      };
      expect(() => parse("mymca", inputs, "metric")).toThrow();
    });
  });

  describe("measurement system conversion", () => {
    it("should produce same results for equivalent metric and imperial inputs (male)", () => {
      const metricInputs = {
        gender: "male" as const,
        weight: 80,
        waistCircumference: 85,
        wristCircumference: 17,
        forearmCircumference: 30,
      };

      const imperialInputs = {
        gender: "male" as const,
        weight: 176.37,
        waistCircumference: 33.46,
        wristCircumference: 6.69,
        forearmCircumference: 11.81,
      };

      const metricResult = mymcaFormula.calculate(metricInputs, "metric");
      const imperialResult = mymcaFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });

    it("should produce same results for equivalent metric and imperial inputs (female)", () => {
      const metricInputs = {
        gender: "female" as const,
        weight: 60,
        waistCircumference: 70,
        wristCircumference: 15,
        forearmCircumference: 25,
        hipsCircumference: 90,
      };

      const imperialInputs = {
        gender: "female" as const,
        weight: 132.28,
        waistCircumference: 27.56,
        wristCircumference: 5.91,
        forearmCircumference: 9.84,
        hipsCircumference: 35.43,
      };

      const metricResult = mymcaFormula.calculate(metricInputs, "metric");
      const imperialResult = mymcaFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });
  });

  describe("additional error handling", () => {
    it("should handle very large valid measurements without overflow", () => {
      const largeInputs = {
        gender: "male" as const,
        weight: 299.99, // Just under max
        waistCircumference: 199.99, // Just under max
        wristCircumference: 30, // Large wrist
        forearmCircumference: 50, // Large forearm
      };

      expect(() => parse("mymca", largeInputs, "metric")).toThrow();
    });

    it("should handle very small valid measurements without underflow", () => {
      const smallInputs = {
        gender: "male" as const,
        weight: 20.01, // Just over min
        waistCircumference: 1.01, // Just over min
        wristCircumference: 1.01, // Just over min
        forearmCircumference: 1.01, // Just over min
      };

      expect(() => parse("mymca", smallInputs, "metric")).toThrow();
    });

    it("should handle floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        weight: 1.23456789,
        waistCircumference: 9.87654321,
        wristCircumference: 2.34567891,
        forearmCircumference: 3.45678912,
      };

      expect(() => parse("mymca", inputs, "metric")).toThrow();
    });
  });
});
