import { formulaSchemas, ValidationResult } from "../schemas/calculator";
import { Formula, CalculatorInputs, Gender, MeasurementSystem } from "../types/calculator";
import { z } from "zod";

export const validateInputs = (
  formula: Formula,
  inputs: CalculatorInputs,
  gender: Gender,
  measurementSystem: MeasurementSystem
): ValidationResult => {
  const schemaDefinition = formulaSchemas[formula](measurementSystem);
  const activeSchema =
    typeof schemaDefinition === "function" ? schemaDefinition(gender) : schemaDefinition;

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
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Invalid input" } };
  }
};
