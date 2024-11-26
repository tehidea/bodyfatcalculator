import { Formula, CalculatorInputs } from "../types/calculator";
import { FORMULA_REQUIREMENTS } from "../constants/formulas";

export interface ValidationError {
  field: keyof CalculatorInputs;
  message: string;
}

export const validateInputs = (formula: Formula, inputs: CalculatorInputs): ValidationError[] => {
  const errors: ValidationError[] = [];
  const requirements = FORMULA_REQUIREMENTS[formula];

  requirements.fields.forEach(field => {
    const value = inputs[field.key];

    // Required field validation
    if (field.required && (value === undefined || value === null || isNaN(value))) {
      errors.push({
        field: field.key,
        message: `${field.label} is required`,
      });
      return;
    }

    // Range validation for numeric values
    if (value !== undefined && value !== null) {
      switch (field.unit) {
        case "kg":
          if (value < 20 || value > 300) {
            errors.push({
              field: field.key,
              message: `${field.label} must be between 20 and 300 kg`,
            });
          }
          break;
        case "cm":
          if (field.key.includes("Circumference")) {
            const maxValue = field.key.includes("wrist") ? 50 : 200;
            if (value < 0 || value > maxValue) {
              errors.push({
                field: field.key,
                message: `${field.label} must be between 0 and ${maxValue} cm`,
              });
            }
          }
          break;
        case "mm":
          if (field.key.includes("Skinfold")) {
            if (value < 0 || value > 100) {
              errors.push({
                field: field.key,
                message: `${field.label} must be between 0 and 100 mm`,
              });
            }
          }
          break;
        case "years":
          if (value < 0 || value > 120) {
            errors.push({
              field: field.key,
              message: `${field.label} must be between 0 and 120 years`,
            });
          }
          break;
      }
    }
  });

  return errors;
};
