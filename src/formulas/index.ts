import { Formula } from "../types/calculator";
import { FormulaImplementation } from "../types/formula";
import { ymcaFormula } from "./ymca";

/**
 * Registry of all available formulas
 */
export const FORMULAS: Record<Formula, FormulaImplementation> = {
  ymca: ymcaFormula,
  // TODO: Implement other formulas
  mymca: ymcaFormula, // Temporary placeholder
  covert: ymcaFormula, // Temporary placeholder
  navy: ymcaFormula, // Temporary placeholder
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
