import { covertFormula } from "../../formulas/covert";
import { MeasurementSystem } from "../../schemas/calculator";
import { parse } from "../../schemas/calculator";

describe("Covert Formula", () => {
  describe("male calculations", () => {
    const maleInputs = {
      gender: "male" as const,
      age: 25,
      weight: 80, // 80kg or 176.37lbs
      waistCircumference: 85, // 85cm or 33.46in
      hipsCircumference: 95, // 95cm or 37.40in
      forearmCircumference: 30, // 30cm or 11.81in
      wristCircumference: 17, // 17cm or 6.69in
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = covertFormula.calculate(maleInputs, "metric");
      // BF% = waistInches + 0.5 * hipsInches - 3 * forearmInches - wristInches
      // = 33.46 + 0.5 * 37.40 - 3 * 11.81 - 6.69
      // = 33.46 + 18.70 - 35.43 - 6.69
      // = 10.04
      expect(result.bodyFatPercentage).toBeCloseTo(10.0, 1);
      expect(result.fatMass).toBeCloseTo(8.0, 1);
      expect(result.leanMass).toBeCloseTo(72.0, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...maleInputs,
        weight: 176.37,
        waistCircumference: 33.46,
        hipsCircumference: 37.4,
        forearmCircumference: 11.81,
        wristCircumference: 6.69,
      };
      const result = covertFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(10.0, 1);
      expect(result.fatMass).toBeCloseTo(8.0, 1);
      expect(result.leanMass).toBeCloseTo(72.0, 1);
    });

    it("should calculate differently for age over 30", () => {
      const olderInputs = {
        ...maleInputs,
        age: 35,
      };
      const result = covertFormula.calculate(olderInputs, "metric");
      // BF% = waistInches + 0.5 * hipsInches - 2.7 * forearmInches - wristInches
      // = 33.46 + 0.5 * 37.40 - 2.7 * 11.81 - 6.69
      // = 33.46 + 18.70 - 31.89 - 6.69
      // = 13.58
      expect(result.bodyFatPercentage).toBeCloseTo(13.6, 1);
      expect(result.fatMass).toBeCloseTo(10.9, 1);
      expect(result.leanMass).toBeCloseTo(69.1, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...maleInputs,
        weight: 80,
        waistCircumference: 60,
        hipsCircumference: 70,
        forearmCircumference: 20,
        wristCircumference: 10,
      };
      expect(() => parse("covert", minimalInputs, "metric")).toThrow();
    });
  });

  describe("female calculations", () => {
    const femaleInputs = {
      gender: "female" as const,
      age: 25,
      weight: 60, // 60kg or 132.28lbs
      waistCircumference: 70, // 70cm or 27.56in
      hipsCircumference: 90, // 90cm or 35.43in
      wristCircumference: 15, // 15cm or 5.91in
      thighCircumference: 55, // 55cm or 21.65in
      calfCircumference: 35, // 35cm or 13.78in
    };

    it("should calculate body fat percentage correctly for metric inputs", () => {
      const result = covertFormula.calculate(femaleInputs, "metric");
      // BF% = hipsInches + 0.8 * thighInches - 2 * calfInches - wristInches
      // = 35.43 + 0.8 * 21.65 - 2 * 13.78 - 5.91
      // = 35.43 + 17.32 - 27.56 - 5.91
      // = 19.28
      expect(result.bodyFatPercentage).toBeCloseTo(19.3, 1);
      expect(result.fatMass).toBeCloseTo(11.6, 1);
      expect(result.leanMass).toBeCloseTo(48.4, 1);
    });

    it("should calculate body fat percentage correctly for imperial inputs", () => {
      const imperialInputs = {
        ...femaleInputs,
        weight: 132.28,
        waistCircumference: 27.56,
        hipsCircumference: 35.43,
        wristCircumference: 5.91,
        thighCircumference: 21.65,
        calfCircumference: 13.78,
      };
      const result = covertFormula.calculate(imperialInputs, "imperial");
      expect(result.bodyFatPercentage).toBeCloseTo(19.3, 1);
      expect(result.fatMass).toBeCloseTo(11.6, 1);
      expect(result.leanMass).toBeCloseTo(48.4, 1);
    });

    it("should calculate differently for age over 30", () => {
      const olderInputs = {
        ...femaleInputs,
        age: 35,
      };
      const result = covertFormula.calculate(olderInputs, "metric");
      // BF% = hipsInches + 1 * thighInches - 2 * calfInches - wristInches
      // = 35.43 + 21.65 - 2 * 13.78 - 5.91
      // = 35.43 + 21.65 - 27.56 - 5.91
      // = 23.61
      expect(result.bodyFatPercentage).toBeCloseTo(23.6, 1);
      expect(result.fatMass).toBeCloseTo(14.2, 1);
      expect(result.leanMass).toBeCloseTo(45.8, 1);
    });

    it("should throw error for invalid results with minimal measurements", () => {
      const minimalInputs = {
        ...femaleInputs,
        weight: 60,
        waistCircumference: 55,
        hipsCircumference: 75,
        wristCircumference: 10,
        thighCircumference: 40,
        calfCircumference: 25,
      };
      expect(() => parse("covert", minimalInputs, "metric")).toThrow();
    });
  });

  describe("edge cases and error handling", () => {
    it("should throw error for zero measurements", () => {
      const zeroInputs = {
        gender: "male" as const,
        age: 0,
        weight: 0,
        waistCircumference: 0,
        hipsCircumference: 0,
        forearmCircumference: 0,
        wristCircumference: 0,
      };
      expect(() => parse("covert", zeroInputs, "metric")).toThrow();
    });

    it("should throw error for extreme measurement combinations", () => {
      const extremeInputs = {
        gender: "male" as const,
        age: 150,
        weight: 150,
        waistCircumference: 60,
        hipsCircumference: 70,
        forearmCircumference: 45,
        wristCircumference: 25,
      };
      expect(() => parse("covert", extremeInputs, "metric")).toThrow();
    });

    it("should throw error for floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        age: 25.123,
        weight: 1.23456789,
        waistCircumference: 9.87654321,
        hipsCircumference: 8.7654321,
        forearmCircumference: 3.45678912,
        wristCircumference: 2.34567891,
      };
      expect(() => parse("covert", inputs, "metric")).toThrow();
    });
  });

  describe("measurement system conversion", () => {
    it("should produce same results for equivalent metric and imperial inputs (male)", () => {
      const metricInputs = {
        gender: "male" as const,
        age: 25,
        weight: 80,
        waistCircumference: 85,
        hipsCircumference: 95,
        forearmCircumference: 30,
        wristCircumference: 17,
      };

      const imperialInputs = {
        gender: "male" as const,
        age: 25,
        weight: 176.37,
        waistCircumference: 33.46,
        hipsCircumference: 37.4,
        forearmCircumference: 11.81,
        wristCircumference: 6.69,
      };

      const metricResult = covertFormula.calculate(metricInputs, "metric");
      const imperialResult = covertFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });

    it("should produce same results for equivalent metric and imperial inputs (female)", () => {
      const metricInputs = {
        gender: "female" as const,
        age: 25,
        weight: 60,
        waistCircumference: 70,
        hipsCircumference: 90,
        wristCircumference: 15,
        thighCircumference: 55,
        calfCircumference: 35,
      };

      const imperialInputs = {
        gender: "female" as const,
        age: 25,
        weight: 132.28,
        waistCircumference: 27.56,
        hipsCircumference: 35.43,
        wristCircumference: 5.91,
        thighCircumference: 21.65,
        calfCircumference: 13.78,
      };

      const metricResult = covertFormula.calculate(metricInputs, "metric");
      const imperialResult = covertFormula.calculate(imperialInputs, "imperial");

      expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 1);
      expect(metricResult.fatMass).toBeCloseTo(imperialResult.fatMass, 1);
      expect(metricResult.leanMass).toBeCloseTo(imperialResult.leanMass, 1);
    });
  });

  describe("additional error handling", () => {
    it("should handle very large valid measurements without overflow", () => {
      const largeInputs = {
        gender: "male" as const,
        age: 120,
        weight: 299.99, // Just under max
        waistCircumference: 199.99, // Just under max
        hipsCircumference: 199.99,
        forearmCircumference: 50,
        wristCircumference: 30,
      };

      expect(() => parse("covert", largeInputs, "metric")).toThrow();
    });

    it("should handle very small valid measurements without underflow", () => {
      const smallInputs = {
        gender: "male" as const,
        age: 1,
        weight: 20.01, // Just over min
        waistCircumference: 1.01, // Just over min
        hipsCircumference: 1.01,
        forearmCircumference: 1.01,
        wristCircumference: 1.01,
      };

      expect(() => parse("covert", smallInputs, "metric")).toThrow();
    });

    it("should handle floating point precision edge cases", () => {
      const inputs = {
        gender: "male" as const,
        age: 25.123,
        weight: 1.23456789,
        waistCircumference: 9.87654321,
        hipsCircumference: 8.7654321,
        forearmCircumference: 3.45678912,
        wristCircumference: 2.34567891,
      };

      expect(() => parse("covert", inputs, "metric")).toThrow();
    });
  });
});
