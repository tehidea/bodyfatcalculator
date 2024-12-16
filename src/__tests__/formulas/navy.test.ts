import { navyFormula } from "../../formulas/navy";
import { MeasurementSystem } from "../../schemas/calculator";
import { parse } from "../../schemas/calculator";

describe("Navy Formula", () => {
  describe("male calculations", () => {
    const maleInputs = {
      gender: "male" as const,
      weight: 80, // 80kg or 176.37lbs
      height: 180, // 180cm or 70.87in
      neckCircumference: 38, // 38cm or 14.96in
      waistCircumference: 85, // 85cm or 33.46in
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = navyFormula.calculate(maleInputs, "metric");
      expect(result.bodyFatPercentage).toBeCloseTo(16.14, 1);
      expect(result.fatMass).toBeCloseTo(12.91, 1);
      expect(result.leanMass).toBeCloseTo(67.09, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...maleInputs,
        weight: 176.37,
        height: 70.87,
        neckCircumference: 14.96,
        waistCircumference: 33.46,
      };
      const result = navyFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(16.14, 1);
      expect(result.fatMass).toBeCloseTo(12.91, 1);
      expect(result.leanMass).toBeCloseTo(67.09, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...maleInputs,
        height: 180,
        neckCircumference: 30,
        waistCircumference: 60,
      };
      expect(() => parse("navy", minimalInputs, "metric")).toThrow();
    });
  });

  describe("female calculations", () => {
    const femaleInputs = {
      gender: "female" as const,
      weight: 60, // 60kg or 132.28lbs
      height: 165, // 165cm or 64.96in
      neckCircumference: 32, // 32cm or 12.60in
      waistCircumference: 70, // 70cm or 27.56in
      hipsCircumference: 90, // 90cm or 35.43in
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = navyFormula.calculate(femaleInputs, "metric");
      expect(result.bodyFatPercentage).toBeCloseTo(22.38, 1);
      expect(result.fatMass).toBeCloseTo(13.43, 1);
      expect(result.leanMass).toBeCloseTo(46.57, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...femaleInputs,
        weight: 132.28,
        height: 64.96,
        neckCircumference: 12.6,
        waistCircumference: 27.56,
        hipsCircumference: 35.43,
      };
      const result = navyFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(22.38, 1);
      expect(result.fatMass).toBeCloseTo(13.43, 1);
      expect(result.leanMass).toBeCloseTo(46.57, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...femaleInputs,
        height: 165,
        neckCircumference: 25,
        waistCircumference: 55,
        hipsCircumference: 75,
      };
      expect(() => parse("navy", minimalInputs, "metric")).toThrow();
    });
  });

  describe("measurement system conversion", () => {
    it("should produce same results for equivalent metric and imperial inputs (male)", () => {
      const metricInputs = {
        gender: "male" as const,
        weight: 80,
        height: 180,
        neckCircumference: 38,
        waistCircumference: 85,
      };

      const imperialInputs = {
        gender: "male" as const,
        weight: 176.37,
        height: 70.87,
        neckCircumference: 14.96,
        waistCircumference: 33.46,
      };

      const metricResult = navyFormula.calculate(metricInputs, "metric");
      const imperialResult = navyFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });

    it("should produce same results for equivalent metric and imperial inputs (female)", () => {
      const metricInputs = {
        gender: "female" as const,
        weight: 60,
        height: 165,
        neckCircumference: 32,
        waistCircumference: 70,
        hipsCircumference: 90,
      };

      const imperialInputs = {
        gender: "female" as const,
        weight: 132.28,
        height: 64.96,
        neckCircumference: 12.6,
        waistCircumference: 27.56,
        hipsCircumference: 35.43,
      };

      const metricResult = navyFormula.calculate(metricInputs, "metric");
      const imperialResult = navyFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });
  });

  describe("edge cases and error handling", () => {
    it("should throw error for zero measurements", () => {
      const zeroInputs = {
        gender: "male" as const,
        weight: 0,
        height: 180,
        neckCircumference: 0,
        waistCircumference: 0,
      };
      expect(() => parse("navy", zeroInputs, "metric")).toThrow();
    });

    it("should throw error for missing measurements", () => {
      const minimalInputs = {
        gender: "male" as const,
        height: 180,
        neckCircumference: 38,
        waistCircumference: 85,
      };
      expect(() => parse("navy", minimalInputs, "metric")).toThrow();
    });

    it("should throw error for extreme measurement combinations", () => {
      const extremeInputs = {
        gender: "male" as const,
        weight: 150,
        height: 180,
        neckCircumference: 50,
        waistCircumference: 60,
      };
      expect(() => parse("navy", extremeInputs, "metric")).toThrow();
    });
  });
});
