import { validateInputs } from "../validation";
import { Formula, Gender, MeasurementSystem } from "../../types/calculator";

describe("validateInputs", () => {
  const testCases: Array<{
    name: string;
    formula: Formula;
    gender: Gender;
    system: MeasurementSystem;
    inputs: Record<string, number | undefined>;
    shouldPass: boolean;
    expectedErrors?: string[];
  }> = [
    // YMCA Formula Tests - Metric
    {
      name: "YMCA valid metric inputs",
      formula: "ymca",
      gender: "male",
      system: "metric",
      inputs: {
        weight: 80,
        waistCircumference: 85,
      },
      shouldPass: true,
    },
    {
      name: "YMCA invalid metric weight",
      formula: "ymca",
      gender: "male",
      system: "metric",
      inputs: {
        weight: 15, // Below 20kg minimum
        waistCircumference: 85,
      },
      shouldPass: false,
      expectedErrors: ["Weight must be at least 20 kg"],
    },
    {
      name: "YMCA invalid metric waist",
      formula: "ymca",
      gender: "male",
      system: "metric",
      inputs: {
        weight: 80,
        waistCircumference: 250, // Above 200cm maximum
      },
      shouldPass: false,
      expectedErrors: ["Circumference cannot exceed 200 cm"],
    },

    // YMCA Formula Tests - Imperial
    {
      name: "YMCA valid imperial inputs",
      formula: "ymca",
      gender: "male",
      system: "imperial",
      inputs: {
        weight: 176, // 80kg in lbs
        waistCircumference: 33.5, // 85cm in inches
      },
      shouldPass: true,
    },
    {
      name: "YMCA invalid imperial weight",
      formula: "ymca",
      gender: "male",
      system: "imperial",
      inputs: {
        weight: 30, // Below 44lbs minimum
        waistCircumference: 33.5,
      },
      shouldPass: false,
      expectedErrors: ["Weight must be at least 44 lbs"],
    },
    {
      name: "YMCA invalid imperial waist",
      formula: "ymca",
      gender: "male",
      system: "imperial",
      inputs: {
        weight: 176,
        waistCircumference: 90, // Above 78.7in maximum
      },
      shouldPass: false,
      expectedErrors: ["Circumference cannot exceed 78.7 in"],
    },

    // Modified YMCA Tests - Metric
    {
      name: "Modified YMCA valid metric inputs - male",
      formula: "mymca",
      gender: "male",
      system: "metric",
      inputs: {
        weight: 80,
        waistCircumference: 85,
      },
      shouldPass: true,
    },
    {
      name: "Modified YMCA valid metric inputs - female",
      formula: "mymca",
      gender: "female",
      system: "metric",
      inputs: {
        weight: 60,
        waistCircumference: 70,
        wristCircumference: 15,
        hipsCircumference: 90,
        forearmCircumference: 25,
      },
      shouldPass: true,
    },

    // Modified YMCA Tests - Imperial
    {
      name: "Modified YMCA valid imperial inputs - female",
      formula: "mymca",
      gender: "female",
      system: "imperial",
      inputs: {
        weight: 132, // 60kg in lbs
        waistCircumference: 27.6, // 70cm in inches
        wristCircumference: 5.9, // 15cm in inches
        hipsCircumference: 35.4, // 90cm in inches
        forearmCircumference: 9.8, // 25cm in inches
      },
      shouldPass: true,
    },

    // Covert Tests - Metric
    {
      name: "Covert valid metric inputs - male",
      formula: "covert",
      gender: "male",
      system: "metric",
      inputs: {
        age: 30,
        hipsCircumference: 95,
        wristCircumference: 17,
        waistCircumference: 85,
        forearmCircumference: 30,
      },
      shouldPass: true,
    },
    {
      name: "Covert valid metric inputs - female",
      formula: "covert",
      gender: "female",
      system: "metric",
      inputs: {
        age: 25,
        hipsCircumference: 90,
        wristCircumference: 15,
        thighCircumference: 55,
        calfCircumference: 35,
      },
      shouldPass: true,
    },
  ];

  test.each(testCases)(
    "$name",
    ({ formula, gender, system, inputs, shouldPass, expectedErrors }) => {
      const result = validateInputs(formula, inputs, gender, system);

      if (shouldPass) {
        expect(result.success).toBe(true);
        expect(result.errors).toEqual({});
      } else {
        expect(result.success).toBe(false);
        expectedErrors?.forEach(expectedError => {
          expect(Object.values(result.errors)).toContain(expectedError);
        });
      }
    }
  );

  // Edge cases
  test("handles undefined inputs correctly", () => {
    const result = validateInputs("ymca", { weight: undefined, waistCircumference: undefined }, "male", "metric");
    expect(result.success).toBe(false);
    expect(Object.keys(result.errors)).toContain("weight");
    expect(Object.keys(result.errors)).toContain("waistCircumference");
  });

  test("handles missing required inputs", () => {
    const result = validateInputs("ymca", {}, "male", "metric");
    expect(result.success).toBe(false);
    expect(Object.keys(result.errors)).toContain("weight");
    expect(Object.keys(result.errors)).toContain("waistCircumference");
  });

  test("handles invalid input types", () => {
    const result = validateInputs(
      "ymca",
      { weight: "not a number" as any, waistCircumference: 85 },
      "male",
      "metric"
    );
    expect(result.success).toBe(false);
    expect(Object.values(result.errors)).toContain("Expected number, received string");
  });
}); 