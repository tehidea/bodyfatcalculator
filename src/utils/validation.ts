import { formulaSchemas, ValidationResult } from "../schemas/calculator";
import { Formula, CalculatorInputs, Gender } from "../types/calculator";
import { z } from "zod";

export const validateInputs = (
  formula: Formula,
  inputs: CalculatorInputs,
  gender: Gender
): ValidationResult => {
  console.log("Starting validation:", { formula, gender, inputs });

  const schemaDefinition = formulaSchemas[formula];
  const activeSchema =
    typeof schemaDefinition === "function" ? schemaDefinition(gender) : schemaDefinition;

  console.log("Schema shape:", activeSchema._def.shape());

  try {
    activeSchema.parse(inputs);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce(
        (acc, err) => ({
          ...acc,
          [err.path[0]]: err.message,
        }),
        {}
      );
      console.log("Validation errors:", errors);
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Invalid input" } };
  }
};
