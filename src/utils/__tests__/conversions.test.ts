import { convertMeasurement, CONVERSIONS, ConversionType } from "../conversions";

describe("Unit Conversions", () => {
  // Test exact conversion factors
  describe("conversion factors", () => {
    it("uses correct conversion factors for weight", () => {
      const kg = 80;
      const lb = kg * 2.20462262185; // Standard conversion factor

      expect(CONVERSIONS.weight.toImperial(kg)).toBeCloseTo(lb, 2);
      expect(CONVERSIONS.weight.toMetric(lb)).toBeCloseTo(kg, 2);
    });

    it("uses correct conversion factors for length", () => {
      const cm = 100;
      const inches = cm / 2.54; // Standard conversion factor

      expect(CONVERSIONS.length.toImperial(cm)).toBeCloseTo(inches, 2);
      expect(CONVERSIONS.length.toMetric(inches)).toBeCloseTo(cm, 2);
    });

    it("keeps skinfold measurements in millimeters as whole numbers", () => {
      const mm = 10;
      // Skinfold measurements should always be in millimeters
      expect(CONVERSIONS.skinfold.toImperial(mm)).toBe(10);
      expect(CONVERSIONS.skinfold.toMetric(mm)).toBe(10);

      // Decimal values should be rounded to whole numbers
      expect(CONVERSIONS.skinfold.toImperial(10.4)).toBe(10);
      expect(CONVERSIONS.skinfold.toImperial(10.6)).toBe(11);
      expect(CONVERSIONS.skinfold.toMetric(10.4)).toBe(10);
      expect(CONVERSIONS.skinfold.toMetric(10.6)).toBe(11);
    });
  });

  // Test bidirectional conversion consistency
  describe("bidirectional conversions", () => {
    const testCases: Array<[ConversionType, number]> = [
      ["weight", 80],
      ["length", 100],
      ["skinfold", 10],
    ];

    test.each(testCases)("%s conversion should be reversible", (type, metricValue) => {
      const imperial = convertMeasurement(metricValue, type, "metric", "imperial");
      const backToMetric = convertMeasurement(imperial, type, "imperial", "metric");

      expect(backToMetric).toBeCloseTo(metricValue, 2);
    });
  });

  // Test edge cases
  describe("edge cases", () => {
    it("handles zero values correctly", () => {
      expect(convertMeasurement(0, "weight", "metric", "imperial")).toBe(0);
      expect(convertMeasurement(0, "length", "metric", "imperial")).toBe(0);
      expect(convertMeasurement(0, "skinfold", "metric", "imperial")).toBe(0);
    });

    it("handles small values correctly", () => {
      expect(convertMeasurement(0.1, "weight", "metric", "imperial")).toBeGreaterThan(0);
      expect(convertMeasurement(0.1, "length", "metric", "imperial")).toBeGreaterThan(0);
      // Skinfold measurements should be rounded to whole numbers
      expect(convertMeasurement(0.1, "skinfold", "metric", "imperial")).toBe(0);
      expect(convertMeasurement(0.6, "skinfold", "metric", "imperial")).toBe(1);
    });

    it("handles large values correctly", () => {
      const largeWeight = 200; // kg
      const largeMeasurement = 300; // cm/mm

      expect(convertMeasurement(largeWeight, "weight", "metric", "imperial")).toBeGreaterThan(
        largeWeight
      );
      expect(convertMeasurement(largeMeasurement, "length", "metric", "imperial")).toBeLessThan(
        largeMeasurement
      );
      // Skinfold measurements should stay the same as whole numbers
      expect(convertMeasurement(largeMeasurement, "skinfold", "metric", "imperial")).toBe(300);
    });
  });

  // Test precision
  describe("precision handling", () => {
    it("maintains precision for typical measurements", () => {
      const weight = 75.5; // kg
      const length = 182.5; // cm
      const skinfold = 13; // mm (whole number)

      expect(
        convertMeasurement(
          convertMeasurement(weight, "weight", "metric", "imperial"),
          "weight",
          "imperial",
          "metric"
        )
      ).toBeCloseTo(weight, 2);

      expect(
        convertMeasurement(
          convertMeasurement(length, "length", "metric", "imperial"),
          "length",
          "imperial",
          "metric"
        )
      ).toBeCloseTo(length, 2);

      // Skinfold measurements should stay as whole numbers
      expect(
        convertMeasurement(
          convertMeasurement(skinfold, "skinfold", "metric", "imperial"),
          "skinfold",
          "imperial",
          "metric"
        )
      ).toBe(13);
    });
  });

  // Test same system conversions
  describe("same system conversions", () => {
    it("returns exact same value when converting within same system", () => {
      const value = 100;
      expect(convertMeasurement(value, "weight", "metric", "metric")).toBe(value);
      expect(convertMeasurement(value, "weight", "imperial", "imperial")).toBe(value);
    });
  });
});
