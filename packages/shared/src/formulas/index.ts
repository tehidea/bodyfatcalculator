import type {
  Formula,
  FormulaResult,
  StandardizedInputs,
  Gender,
  MeasurementSystem,
  CalculationResult,
} from "../types/index.ts";
import { ymcaFormula } from "./ymca.ts";
import { mymcaFormula } from "./mymca.ts";
import { navyFormula } from "./navy.ts";
import { covertFormula } from "./covert.ts";
import { durninFormula } from "./durnin.ts";
import { jackson7Formula } from "./jackson7.ts";
import { jackson4Formula } from "./jackson4.ts";
import { jackson3Formula } from "./jackson3.ts";
import { parrilloFormula } from "./parrillo.ts";
import { validateBodyFat, getClassification } from "./utils.ts";

interface FormulaImpl {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem) => FormulaResult;
}

/**
 * Predefined order of formulas
 */
const FORMULA_ORDER: Formula[] = [
  "ymca",
  "mymca",
  "navy",
  "covert",
  "jack3",
  "durnin",
  "jack4",
  "jack7",
  "parrillo",
];

/**
 * Registry of all available formulas
 */
export const FORMULAS: Record<Formula, FormulaImpl> = {
  ymca: ymcaFormula,
  mymca: mymcaFormula,
  navy: navyFormula,
  covert: covertFormula,
  durnin: durninFormula,
  jack7: jackson7Formula,
  jack4: jackson4Formula,
  jack3: jackson3Formula,
  parrillo: parrilloFormula,
};

/**
 * Calculate body fat results using the specified formula
 */
export async function calculateResults(
  formula: Formula,
  gender: Gender,
  inputs: StandardizedInputs,
  measurementSystem: MeasurementSystem
): Promise<CalculationResult> {
  const formulaImpl = FORMULAS[formula];
  const standardizedInputs = {
    gender,
    ...inputs,
  };

  const results = formulaImpl.calculate(standardizedInputs, measurementSystem);
  const validation = validateBodyFat(results.bodyFatPercentage);

  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  return {
    ...results,
    classification: getClassification(results.bodyFatPercentage, gender),
  };
}

/**
 * Get a formula implementation by its key
 */
export function getFormula(formula: Formula): FormulaImpl {
  return FORMULAS[formula];
}

/**
 * Get all available formulas in predefined order
 */
export function getAvailableFormulas(): Formula[] {
  return FORMULA_ORDER;
}

/**
 * Check if a formula is available
 */
export function isFormulaAvailable(formula: Formula): boolean {
  return formula in FORMULAS;
}

export { validateBodyFat, getClassification, calculateBodyFat } from "./utils.ts";
