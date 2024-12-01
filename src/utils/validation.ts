import { formulaSchemas, ValidationResult } from "../schemas/calculator";
import { Formula, CalculatorInputs, Gender, MeasurementSystem } from "../types/calculator";
import { z } from "zod";

export const validateInputs = (
  formula: Formula,
  inputs: CalculatorInputs,
  gender: Gender,
  measurementSystem: MeasurementSystem
): ValidationResult => {
  const schema = formulaSchemas[formula](measurementSystem)(gender);

  try {
    schema.parse(inputs);
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
