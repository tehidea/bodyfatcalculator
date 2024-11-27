import { formulaSchemas, ValidationResult } from "../schemas/calculator";
import { Formula, CalculatorInputs } from "../types/calculator";
import { z } from "zod";

export function validateInputs(formula: Formula, inputs: CalculatorInputs): ValidationResult {
  const formulaSchema = formulaSchemas[formula as keyof typeof formulaSchemas];

  try {
    formulaSchema.parse(inputs);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce<Record<string, string>>(
        (acc, err) => ({
          ...acc,
          [err.path[0] as string]: err.message,
        }),
        {}
      );
      return { success: false, errors };
    }
    return {
      success: false,
      errors: { general: "Invalid input data" },
    };
  }
}
