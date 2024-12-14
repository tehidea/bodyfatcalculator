import { Formula } from "../types/calculator";
import { FormulaImplementation } from "../types/formula";
import { ymcaFormula } from "./ymca";
import { mymcaFormula } from "./mymca";
import { navyFormula } from "./navy";
import { covertFormula } from "./covert";

/**
 * Registry of all available formulas
 */
export const FORMULAS: Record<Formula, FormulaImplementation> = {
  ymca: ymcaFormula,
  mymca: mymcaFormula,
  navy: navyFormula,
  covert: covertFormula,
  // TODO: Implement remaining formulas
  durnin: ymcaFormula, // Temporary placeholder
  jack7: ymcaFormula, // Temporary placeholder
  jack4: ymcaFormula, // Temporary placeholder
  jack3: ymcaFormula, // Temporary placeholder
  parrillo: ymcaFormula, // Temporary placeholder
};

/**
 * Get a formula implementation by its key
 */
export function getFormula(formula: Formula): FormulaImplementation {
  return FORMULAS[formula];
}

/**
 * Get all available formulas
 */
export function getAvailableFormulas(): Formula[] {
  return Object.keys(FORMULAS) as Formula[];
}

/**
 * Check if a formula is available
 */
export function isFormulaAvailable(formula: Formula): boolean {
  return formula in FORMULAS;
}

/**
 * Get formulas available for a specific gender
 */
export function getFormulasForGender(gender: "male" | "female"): Formula[] {
  return Object.entries(FORMULAS)
    .filter(([_, impl]) => impl.applicableGenders.includes(gender))
    .map(([key]) => key as Formula);
}

/**
 * Get required fields for a formula
 */
export function getRequiredFields(formula: Formula): Array<string> {
  return FORMULAS[formula].requiredFields;
}

/**
 * Get formula description
 */
export function getFormulaDescription(formula: Formula): string {
  return FORMULAS[formula].description;
}

/**
 * Check if a formula is suitable for a given age
 */
export function isFormulaSuitableForAge(formula: Formula, age: number): boolean {
  const impl = FORMULAS[formula];
  if (!impl.minimumAge && !impl.maximumAge) return true;

  const isAboveMin = !impl.minimumAge || age >= impl.minimumAge;
  const isBelowMax = !impl.maximumAge || age <= impl.maximumAge;

  return isAboveMin && isBelowMax;
}
