import { z } from "zod";
import { Formula, Gender, MeasurementSystem } from "../types/calculator";
import { getFormula } from "../formulas";
import { ConversionType } from "../utils/conversions";
import { FORMULA_REQUIREMENTS, FormulaField } from "../constants/formulas";
import { getFieldType } from "../utils/fields";
import { getStandardUnit } from "../utils/units";

/**
 * Base schema for all measurements
 */
const measurementSchema = z.number().positive("Must be a positive number");

/**
 * Schema for each measurement type
 */
const measurementSchemas = {
  // Basic measurements
  weight: measurementSchema.describe("Weight"),
  height: measurementSchema.describe("Height"),
  age: z.number().int().min(0).max(120).optional(),

  // Circumference measurements
  neckCircumference: measurementSchema.describe("Neck circumference"),
  waistCircumference: measurementSchema.describe("Waist circumference"),
  hipsCircumference: measurementSchema.describe("Hip circumference"),
  chestCircumference: measurementSchema.describe("Chest circumference"),
  abdomenCircumference: measurementSchema.describe("Abdomen circumference"),
  thighCircumference: measurementSchema.describe("Thigh circumference"),
  calfCircumference: measurementSchema.describe("Calf circumference"),
  bicepCircumference: measurementSchema.describe("Bicep circumference"),
  tricepCircumference: measurementSchema.describe("Tricep circumference"),
  forearmCircumference: measurementSchema.describe("Forearm circumference"),
  wristCircumference: measurementSchema.describe("Wrist circumference"),

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
} as const;

/**
 * Create a schema for a specific formula and gender
 */
export function createFormulaSchema(formula: Formula, gender: Gender) {
  const implementation = getFormula(formula);
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  // Get all required fields for this gender
  const allRequiredFields = [
    ...implementation.requiredFields,
    ...(implementation.genderSpecificFields?.[gender] || []),
  ];

  // Add required fields to schema
  allRequiredFields.forEach(field => {
    if (field === "gender") return; // Skip gender as it's handled separately
    if (field in measurementSchemas) {
      schemaFields[field] = measurementSchemas[field as keyof typeof measurementSchemas];
    }
  });

  return z.object(schemaFields);
}

/**
 * Gets metadata for a specific field from the formula configuration
 */
export function getFieldMetadata(
  field: string,
  measurementSystem: MeasurementSystem,
  formula: Formula
): FormulaField | null {
  try {
    const type = getFieldType(field);
    const unit = getStandardUnit(type, measurementSystem);
    const formulaConfig = FORMULA_REQUIREMENTS[formula];
    if (!formulaConfig?.fields) return null;
    return (
      {
        ...formulaConfig.fields.find((f: FormulaField) => f.key === field),
        unit,
      } || null
    );
  } catch {
    return null;
  }
}

/**
 * Validate inputs for a specific formula
 */
export function validateFormulaInputs(
  formula: Formula,
  inputs: Record<string, any>,
  gender: Gender,
  measurementSystem: MeasurementSystem
) {
  const implementation = getFormula(formula);

  // Validate measurements using gender-specific schema
  const schema = createFormulaSchema(formula, gender);
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

// Export an alias for backward compatibility
export const validateInputs = validateFormulaInputs;
