import { FormulaImplementation } from "../types/formula";
import { Gender } from "../types/calculator";
import { ConversionType } from "./conversions";

export type IconType = "weight" | "height" | "circumference" | "skinfold" | "age";

export function getFieldType(field: string): ConversionType {
  const fieldLower = field.toLowerCase();
  if (fieldLower.includes("skinfold")) return "skinfold";
  if (fieldLower.includes("circumference")) return "length";
  if (fieldLower === "weight") return "weight";
  if (fieldLower === "height") return "length";
  return "length"; // Default to length for any other measurements
}

export function getIconType(field: string): IconType {
  const fieldLower = field.toLowerCase();
  if (fieldLower.includes("skinfold")) return "skinfold";
  if (fieldLower.includes("circumference")) return "circumference";
  if (fieldLower === "weight") return "weight";
  if (fieldLower === "height") return "height";
  if (fieldLower === "age") return "age";
  return "circumference"; // Default to circumference for visual representation
}

export function getRequiredFieldsForGender(
  implementation: FormulaImplementation,
  gender: Gender
): string[] {
  return [
    ...implementation.requiredFields,
    ...(implementation.genderSpecificFields?.[gender] || []),
  ].filter(field => field !== "gender");
}

export function getMeasurementTypes(fields: string[]): Set<string> {
  const types = new Set<string>();

  if (!Array.isArray(fields)) return types;

  fields.forEach(field => {
    if (!field) return;
    types.add(getFieldType(field));
  });

  return types;
}
