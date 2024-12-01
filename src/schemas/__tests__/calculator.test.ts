import { z } from "zod";
import { formulaSchemas } from "../calculator";
import { MeasurementSystem } from "../../types/calculator";

describe("Calculator Schemas", () => {
  describe("Weight Schema", () => {
    test("validates metric weight correctly", () => {
      const schema = formulaSchemas.ymca("metric")("male");

      // Valid weights
      expect(() => schema.parse({ weight: 20, waistCircumference: 85 })).not.toThrow();
      expect(() => schema.parse({ weight: 150, waistCircumference: 85 })).not.toThrow();
      expect(() => schema.parse({ weight: 300, waistCircumference: 85 })).not.toThrow();

      // Invalid weights
      expect(() => schema.parse({ weight: 19, waistCircumference: 85 })).toThrow(
        "Weight must be at least 20 kg"
      );
      expect(() => schema.parse({ weight: 301, waistCircumference: 85 })).toThrow(
        "Weight cannot exceed 300 kg"
      );
    });

    test("validates imperial weight correctly", () => {
      const schema = formulaSchemas.ymca("imperial")("male");

      // Valid weights
      expect(() => schema.parse({ weight: 44, waistCircumference: 33.5 })).not.toThrow();
      expect(() => schema.parse({ weight: 330, waistCircumference: 33.5 })).not.toThrow();
      expect(() => schema.parse({ weight: 661, waistCircumference: 33.5 })).not.toThrow();

      // Invalid weights
      expect(() => schema.parse({ weight: 43, waistCircumference: 33.5 })).toThrow(
        "Weight must be at least 44 lbs"
      );
      expect(() => schema.parse({ weight: 662, waistCircumference: 33.5 })).toThrow(
        "Weight cannot exceed 661 lbs"
      );
    });
  });

  describe("Circumference Schema", () => {
    test("validates metric circumference correctly", () => {
      const schema = formulaSchemas.ymca("metric")("male");

      // Valid circumferences
      expect(() => schema.parse({ weight: 80, waistCircumference: 1 })).not.toThrow();
      expect(() => schema.parse({ weight: 80, waistCircumference: 100 })).not.toThrow();
      expect(() => schema.parse({ weight: 80, waistCircumference: 200 })).not.toThrow();

      // Invalid circumferences
      expect(() => schema.parse({ weight: 80, waistCircumference: 0.9 })).toThrow(
        "Circumference must be at least 1 cm"
      );
      expect(() => schema.parse({ weight: 80, waistCircumference: 201 })).toThrow(
        "Circumference cannot exceed 200 cm"
      );
    });

    test("validates imperial circumference correctly", () => {
      const schema = formulaSchemas.ymca("imperial")("male");

      // Valid circumferences
      expect(() => schema.parse({ weight: 176, waistCircumference: 0.4 })).not.toThrow();
      expect(() => schema.parse({ weight: 176, waistCircumference: 39.4 })).not.toThrow();
      expect(() => schema.parse({ weight: 176, waistCircumference: 78.7 })).not.toThrow();

      // Invalid circumferences
      expect(() => schema.parse({ weight: 176, waistCircumference: 0.3 })).toThrow(
        "Circumference must be at least 0.4 in"
      );
      expect(() => schema.parse({ weight: 176, waistCircumference: 78.8 })).toThrow(
        "Circumference cannot exceed 78.7 in"
      );
    });
  });

  describe("Gender-specific schemas", () => {
    test("validates female-specific fields in metric", () => {
      const schema = formulaSchemas.mymca("metric")("female");

      // Valid female measurements
      expect(() =>
        schema.parse({
          weight: 60,
          waistCircumference: 70,
          wristCircumference: 15,
          hipsCircumference: 90,
          forearmCircumference: 25,
        })
      ).not.toThrow();
    });

    test("validates female-specific fields in imperial", () => {
      const schema = formulaSchemas.mymca("imperial")("female");

      // Valid female measurements
      expect(() =>
        schema.parse({
          weight: 132,
          waistCircumference: 27.6,
          wristCircumference: 5.9,
          hipsCircumference: 35.4,
          forearmCircumference: 9.8,
        })
      ).not.toThrow();
    });

    test("male schema doesn't require female-specific fields", () => {
      const schema = formulaSchemas.mymca("metric")("male");

      // Valid male measurements (without female-specific fields)
      expect(() =>
        schema.parse({
          weight: 80,
          waistCircumference: 85,
        })
      ).not.toThrow();
    });
  });

  describe("Covert formula", () => {
    test("validates male-specific fields in metric", () => {
      const schema = formulaSchemas.covert("metric")("male");

      // Valid male measurements
      expect(() =>
        schema.parse({
          age: 30,
          hipsCircumference: 95,
          wristCircumference: 17,
          waistCircumference: 85,
          forearmCircumference: 30,
        })
      ).not.toThrow();
    });

    test("validates female-specific fields in metric", () => {
      const schema = formulaSchemas.covert("metric")("female");

      // Valid female measurements
      expect(() =>
        schema.parse({
          age: 25,
          hipsCircumference: 90,
          wristCircumference: 15,
          thighCircumference: 55,
          calfCircumference: 35,
        })
      ).not.toThrow();
    });
  });
});
