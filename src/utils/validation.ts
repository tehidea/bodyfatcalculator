import { formulaSchemas, ValidationResult } from "../schemas/calculator";
import { Formula, CalculatorInputs, Gender } from "../types/calculator";
import { z } from "zod";

export const validateInputs = (
  formula: Formula,
  inputs: CalculatorInputs,
  gender: Gender
): ValidationResult => {
  const schemaDefinition = formulaSchemas[formula];
  const activeSchema =
    typeof schemaDefinition === "function" ? schemaDefinition(gender) : schemaDefinition;

  try {
    activeSchema.parse(inputs);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.reduce(
          (acc, err) => ({
            ...acc,
            [err.path[0]]: err.message,
          }),
          {}
        ),
      };
    }
    return { success: false, errors: { general: "Invalid input" } };
  }
};
