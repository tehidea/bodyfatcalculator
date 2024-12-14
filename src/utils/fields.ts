import { FormulaImplementation } from "../types/formula";
import { Gender } from "../types/calculator";

export function getFieldType(field: string): string {
  const fieldLower = field.toLowerCase();
  if (fieldLower.includes("skinfold")) return "skinfold";
  if (fieldLower.includes("circumference")) return "circumference";
  if (fieldLower === "weight") return "weight";
  if (fieldLower === "height") return "height";
  if (fieldLower === "age") return "age";
  return "circumference";
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
