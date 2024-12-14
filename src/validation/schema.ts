import { z } from "zod";
import { Formula, Gender, MeasurementSystem } from "../types/calculator";
import { getFormula } from "../formulas";

/**
 * Base schema for all measurements
 */
const measurementSchema = z.number().positive("Must be a positive number");

/**
 * Base input schema that applies to all formulas
 */
export const baseInputSchema = z.object({
  gender: z.enum(["male", "female"] as const),
  measurementSystem: z.enum(["metric", "imperial"] as const),
  age: z.number().int().min(0).max(120).optional(),
});

/**
 * Schema for each measurement type
 */
const measurementSchemas = {
  // Basic measurements
  weight: measurementSchema.describe("Weight"),
  height: measurementSchema.describe("Height"),

  // Circumference measurements
  neck: measurementSchema.describe("Neck circumference"),
  waist: measurementSchema.describe("Waist circumference"),
  hips: measurementSchema.describe("Hip circumference"),
  chest: measurementSchema.describe("Chest circumference"),
  abdomen: measurementSchema.describe("Abdomen circumference"),
  thigh: measurementSchema.describe("Thigh circumference"),
  calf: measurementSchema.describe("Calf circumference"),
  bicep: measurementSchema.describe("Bicep circumference"),
  tricep: measurementSchema.describe("Tricep circumference"),
  forearm: measurementSchema.describe("Forearm circumference"),
  wrist: measurementSchema.describe("Wrist circumference"),

  // Skinfold measurements
  chestSkinfold: measurementSchema.describe("Chest skinfold"),
  abdomenSkinfold: measurementSchema.describe("Abdomen skinfold"),
  thighSkinfold: measurementSchema.describe("Thigh skinfold"),
  tricepSkinfold: measurementSchema.describe("Tricep skinfold"),
  bicepSkinfold: measurementSchema.describe("Bicep skinfold"),
  subscapularSkinfold: measurementSchema.describe("Subscapular skinfold"),
  suprailiacSkinfold: measurementSchema.describe("Suprailiac skinfold"),
  midaxillarySkinfold: measurementSchema.describe("Midaxillary skinfold"),
  lowerBackSkinfold: measurementSchema.describe("Lower back skinfold"),
  calfSkinfold: measurementSchema.describe("Calf skinfold"),
};

/**
 * Create a schema for a specific formula
 */
export function createFormulaSchema(formula: Formula) {
  const implementation = getFormula(formula);
  const schemaFields: Record<string, z.ZodTypeAny> = { ...baseInputSchema.shape };

  // Add required fields from the formula
  implementation.requiredFields.forEach(field => {
    if (field in measurementSchemas) {
      schemaFields[field] = measurementSchemas[field as keyof typeof measurementSchemas];
    }
  });

  return z
    .object(schemaFields)
    .refine(data => implementation.applicableGenders.includes(data.gender), {
      message: `This formula is only available for ${implementation.applicableGenders.join(" and ")}`,
    })
    .refine(
      data => {
        if (!data.age) return true;
        if (!implementation.minimumAge && !implementation.maximumAge) return true;

        const isAboveMin = !implementation.minimumAge || data.age >= implementation.minimumAge;
        const isBelowMax = !implementation.maximumAge || data.age <= implementation.maximumAge;

        return isAboveMin && isBelowMax;
      },
      {
        message:
          implementation.minimumAge && implementation.maximumAge
            ? `This formula is only valid for ages ${implementation.minimumAge}-${implementation.maximumAge}`
            : implementation.minimumAge
              ? `Must be at least ${implementation.minimumAge} years old`
              : implementation.maximumAge
                ? `Must be at most ${implementation.maximumAge} years old`
                : "Invalid age",
      }
    );
}

/**
 * Validate inputs for a specific formula
 */
export function validateFormulaInputs(formula: Formula, inputs: Record<string, any>) {
  const schema = createFormulaSchema(formula);
  const result = schema.safeParse(inputs);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.errors.forEach(error => {
      const path = error.path.join(".");
      errors[path] = error.message;
    });
    return { success: false as const, errors };
  }

  return { success: true as const, data: result.data };
}
