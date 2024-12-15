import { Formula } from "../types/calculator";
import { FormulaImplementation } from "../types/formula";
import { ymcaFormula } from "./ymca";
import { mymcaFormula } from "./mymca";
import { navyFormula } from "./navy";
import { covertFormula } from "./covert";
import { durninFormula } from "./durnin";
import { jackson7Formula } from "./jackson7";
import { jackson4Formula } from "./jackson4";
import { jackson3Formula } from "./jackson3";
import { parilloFormula } from "./parillo";
import { validateBodyFat, getClassification } from "./utils";
import {
  CalculatorInputs,
  Gender,
  MeasurementSystem,
  CalculatorResults,
} from "../types/calculator";

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
export const FORMULAS: Record<Formula, FormulaImplementation> = {
  ymca: ymcaFormula,
  mymca: mymcaFormula,
  navy: navyFormula,
  covert: covertFormula,
  durnin: durninFormula,
  jack7: jackson7Formula,
  jack4: jackson4Formula,
  jack3: jackson3Formula,
  parrillo: parilloFormula,
};

/**
 * Calculate body fat results using the specified formula
 */
export async function calculateResults(
  formula: Formula,
  gender: Gender,
  inputs: CalculatorInputs,
  measurementSystem: MeasurementSystem
): Promise<CalculatorResults> {
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
export function getFormula(formula: Formula): FormulaImplementation {
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
 * Get formula short description (first sentence only)
 */
export function getFormulaShortDescription(formula: Formula): string {
  const description = FORMULAS[formula].description;
  const firstSentence = description.split(". ")[0];
  return firstSentence + ".";
}

/**
 * Get formulas that require skinfold measurements
 */
export function getSkinfoldFormulas(): Formula[] {
  return Object.entries(FORMULAS)
    .filter(([_, impl]) =>
      impl.requiredFields.some(field => field.toLowerCase().includes("skinfold"))
    )
    .map(([key]) => key as Formula);
}

/**
 * Get formulas that use circumference measurements
 */
export function getCircumferenceFormulas(): Formula[] {
  return Object.entries(FORMULAS)
    .filter(([_, impl]) =>
      impl.requiredFields.some(
        field =>
          field.toLowerCase().includes("circumference") ||
          ["neck", "waist", "hips", "chest", "thigh", "calf", "forearm", "wrist"].includes(field)
      )
    )
    .map(([key]) => key as Formula);
}

/**
 * Get references for a formula
 */
export function getFormulaReferences(formula: Formula): string[] {
  return FORMULAS[formula].references || [];
}
