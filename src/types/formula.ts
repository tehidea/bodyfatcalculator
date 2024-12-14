import { Gender } from "./calculator";

/**
 * Standardized inputs used internally by all formulas.
 * All measurements are stored in metric units.
 */
export interface StandardizedInputs {
  // Basic measurements
  gender: Gender;
  age?: number;
  weight?: number; // kg
  height?: number; // cm

  // Circumference measurements (all in cm)
  neckCircumference?: number;
  waistCircumference?: number;
  hipsCircumference?: number;
  chestCircumference?: number;
  abdomenCircumference?: number;
  thighCircumference?: number;
  calfCircumference?: number;
  bicepCircumference?: number;
  tricepCircumference?: number;
  forearmCircumference?: number;
  wristCircumference?: number;

  // Skinfold measurements (all in mm)
  chestSkinfold?: number;
  abdomenSkinfold?: number;
  thighSkinfold?: number;
  tricepSkinfold?: number;
  bicepSkinfold?: number;
  subscapularSkinfold?: number;
  suprailiacSkinfold?: number;
  midaxillarySkinfold?: number;
  lowerBackSkinfold?: number;
  calfSkinfold?: number;
}

export interface FormulaResult {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
}

export interface FormulaImplementation {
  /** Calculates body fat using standardized metric inputs */
  calculate: (inputs: StandardizedInputs) => FormulaResult;
  /** Required fields for this formula */
  requiredFields: Array<keyof StandardizedInputs>;
  /** Which genders this formula supports */
  applicableGenders: Gender[];
  /** Minimum required age (if applicable) */
  minimumAge?: number;
  /** Maximum supported age (if applicable) */
  maximumAge?: number;
  /** Description of the formula and its limitations */
  description: string;
  /** Scientific references or sources */
  references?: string[];
  /** Display name of the formula */
  name: string;
  /** Margin of error range (e.g., "3-4" for ±3-4%) */
  marginOfError: string;
}
