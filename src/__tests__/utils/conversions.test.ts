import {
  convertMeasurement,
  getUnit,
  formatMeasurement,
  isReasonableMeasurement,
  needsConversion,
  ConversionType,
  MeasurementSystem,
} from "../../utils/conversions";

describe("Conversion Utilities", () => {
  describe("convertMeasurement", () => {
    it("should convert weight from metric to imperial", () => {
      expect(convertMeasurement(1, "weight", "metric", "imperial")).toBeCloseTo(2.2, 2);
      expect(convertMeasurement(10, "weight", "metric", "imperial")).toBeCloseTo(22.05, 2);
    });

    it("should convert weight from imperial to metric", () => {
      expect(convertMeasurement(2.20462, "weight", "imperial", "metric")).toBeCloseTo(1.0, 2);
      expect(convertMeasurement(22.0462, "weight", "imperial", "metric")).toBeCloseTo(10.0, 2);
    });

    it("should convert length from metric to imperial", () => {
      expect(convertMeasurement(2.54, "length", "metric", "imperial")).toBeCloseTo(1.0, 2);
      expect(convertMeasurement(25.4, "length", "metric", "imperial")).toBeCloseTo(10.0, 2);
    });

    it("should convert length from imperial to metric", () => {
      expect(convertMeasurement(1, "length", "imperial", "metric")).toBeCloseTo(2.54, 2);
      expect(convertMeasurement(10, "length", "imperial", "metric")).toBeCloseTo(25.4, 2);
    });

    it("should not convert skinfold measurements", () => {
      expect(convertMeasurement(10, "skinfold", "metric", "imperial")).toBe(10);
      expect(convertMeasurement(10, "skinfold", "imperial", "metric")).toBe(10);
    });

    it("should not convert values when systems are the same", () => {
      expect(convertMeasurement(10, "weight", "metric", "metric")).toBe(10);
      expect(convertMeasurement(10, "length", "imperial", "imperial")).toBe(10);
    });

    it("should throw error for invalid inputs", () => {
      expect(() => convertMeasurement(-1, "weight", "metric", "imperial")).toThrow();
      expect(() => convertMeasurement(NaN, "weight", "metric", "imperial")).toThrow();
      expect(() => convertMeasurement(Infinity, "weight", "metric", "imperial")).toThrow();
    });
  });

  describe("getUnit", () => {
    const testCases: Array<[ConversionType, MeasurementSystem, string]> = [
      ["weight", "metric", "kg"],
      ["weight", "imperial", "lb"],
      ["length", "metric", "cm"],
      ["length", "imperial", "in"],
      ["skinfold", "metric", "mm"],
      ["skinfold", "imperial", "mm"],
      ["none", "metric", "years"],
      ["none", "imperial", "years"],
    ];

    test.each(testCases)(
      "should return correct unit for %s in %s system: %s",
      (type, system, expected) => {
        expect(getUnit(type, system)).toBe(expected);
      }
    );
  });

  describe("formatMeasurement", () => {
    it("should format metric measurements correctly", () => {
      expect(formatMeasurement(10, "weight", "metric")).toBe("10 kg");
      expect(formatMeasurement(10, "length", "metric")).toBe("10 cm");
      expect(formatMeasurement(10, "skinfold", "metric")).toBe("10 mm");
    });

    it("should format imperial measurements correctly", () => {
      expect(formatMeasurement(10, "weight", "imperial")).toBe("10 lb");
      expect(formatMeasurement(10, "length", "imperial")).toBe("10 in");
      expect(formatMeasurement(10, "skinfold", "imperial")).toBe("10 mm");
    });

    it("should round values according to precision settings", () => {
      expect(formatMeasurement(10.123, "weight", "metric")).toBe("10.12 kg");
      expect(formatMeasurement(10.123, "length", "metric")).toBe("10.12 cm");
      expect(formatMeasurement(10.123, "skinfold", "metric")).toBe("10 mm");
    });

    it("should throw error for invalid inputs", () => {
      expect(() => formatMeasurement(-1, "weight", "metric")).toThrow();
      expect(() => formatMeasurement(NaN, "weight", "metric")).toThrow();
      expect(() => formatMeasurement(Infinity, "weight", "metric")).toThrow();
    });
  });

  describe("isReasonableMeasurement", () => {
    describe("weight validation", () => {
      it("should validate metric weights", () => {
        expect(isReasonableMeasurement(50, "weight", "metric")).toBe(true);
        expect(isReasonableMeasurement(19, "weight", "metric")).toBe(false);
        expect(isReasonableMeasurement(301, "weight", "metric")).toBe(false);
      });

      it("should validate imperial weights", () => {
        expect(isReasonableMeasurement(150, "weight", "imperial")).toBe(true);
        expect(isReasonableMeasurement(43, "weight", "imperial")).toBe(false);
        expect(isReasonableMeasurement(661, "weight", "imperial")).toBe(false);
      });
    });

    describe("length validation", () => {
      it("should validate metric lengths", () => {
        expect(isReasonableMeasurement(170, "length", "metric")).toBe(true);
        expect(isReasonableMeasurement(0.5, "length", "metric")).toBe(false);
        expect(isReasonableMeasurement(301, "length", "metric")).toBe(false);
      });

      it("should validate imperial lengths", () => {
        expect(isReasonableMeasurement(70, "length", "imperial")).toBe(true);
        expect(isReasonableMeasurement(0.3, "length", "imperial")).toBe(false);
        expect(isReasonableMeasurement(119, "length", "imperial")).toBe(false);
      });
    });

    describe("skinfold validation", () => {
      it("should validate skinfold measurements", () => {
        expect(isReasonableMeasurement(20, "skinfold", "metric")).toBe(true);
        expect(isReasonableMeasurement(0, "skinfold", "metric")).toBe(false);
        expect(isReasonableMeasurement(101, "skinfold", "metric")).toBe(false);
      });
    });

    describe("age validation", () => {
      it("should validate age measurements", () => {
        expect(isReasonableMeasurement(25, "none", "metric")).toBe(true);
        expect(isReasonableMeasurement(-1, "none", "metric")).toBe(false);
        expect(isReasonableMeasurement(121, "none", "metric")).toBe(false);
      });
    });

    it("should handle invalid inputs", () => {
      expect(isReasonableMeasurement(-1, "weight", "metric")).toBe(false);
      expect(isReasonableMeasurement(NaN, "weight", "metric")).toBe(false);
      expect(isReasonableMeasurement(Infinity, "weight", "metric")).toBe(false);
    });
  });

  describe("needsConversion", () => {
    it("should identify measurements that need conversion", () => {
      expect(needsConversion("weight")).toBe(true);
      expect(needsConversion("length")).toBe(true);
    });

    it("should identify measurements that do not need conversion", () => {
      expect(needsConversion("skinfold")).toBe(false);
      expect(needsConversion("none")).toBe(false);
    });
  });
});
