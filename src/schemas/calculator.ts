import { z } from "zod";

// Unit-specific schemas
const weightSchema = z
  .number()
  .min(20, "Weight must be at least 20 kg")
  .max(300, "Weight cannot exceed 300 kg")
  .nullable();

const circumferenceSchema = z
  .number()
  .min(1, "Circumference must be at least 1 cm") // Adjusted to ensure a minimum of 1 cm for circumference measurements
  .max(200, "Circumference cannot exceed 200 cm")
  .nullable();

const skinfoldSchema = z
  .number()
  .min(1, "Skinfold must be at least 1 mm") // Adjusted to ensure a minimum of 1 mm for skinfold measurements
  .max(100, "Skinfold cannot exceed 100 mm")
  .nullable();

const wristSchema = circumferenceSchema.refine(
  val => !val || val <= 50,
  "Wrist circumference cannot exceed 50 cm"
);

// Main calculator input schema
export const calculatorInputSchema = z.object({
  weight: weightSchema,
  height: z.number().min(100).max(250).nullable(),
  age: z.number().min(0).max(120).nullable(),

  // Circumferences
  waistCircumference: circumferenceSchema,
  hipsCircumference: circumferenceSchema,
  neckCircumference: circumferenceSchema,
  wristCircumference: wristSchema,
  forearmCircumference: circumferenceSchema,

  // Skinfolds
  chestSkinfold: skinfoldSchema,
  abdomenSkinfold: skinfoldSchema,
  thighSkinfold: skinfoldSchema,
  tricepSkinfold: skinfoldSchema,
  bicepSkinfold: skinfoldSchema,
  subscapularSkinfold: skinfoldSchema,
  suprailiacSkinfold: skinfoldSchema,
  midaxillarySkinfold: skinfoldSchema,
  lowerBackSkinfold: skinfoldSchema,
  calfSkinfold: skinfoldSchema,
});

// Formula-specific validation schemas
export const formulaSchemas = {
  ymca: calculatorInputSchema
    .pick({
      weight: true,
      waistCircumference: true,
    })
    .required(),

  mymca: calculatorInputSchema
    .pick({
      weight: true,
      waistCircumference: true,
      wristCircumference: true,
      hipsCircumference: true,
      forearmCircumference: true,
    })
    .required(),

  // TODO: Add other formula schemas...
} as const;

// Type for validation results
export type ValidationResult = {
  success: boolean;
  errors: Record<string, string>;
};
