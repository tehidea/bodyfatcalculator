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

  const results = formulaImpl.calculate(standardizedInputs);
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
 * Get formulas suitable for a specific age range
 */
export function getFormulasForAgeRange(minAge: number, maxAge: number): Formula[] {
  return Object.entries(FORMULAS)
    .filter(([_, impl]) => {
      const isAboveMinRequired = !impl.minimumAge || minAge >= impl.minimumAge;
      const isBelowMaxAllowed = !impl.maximumAge || maxAge <= impl.maximumAge;
      return isAboveMinRequired && isBelowMaxAllowed;
    })
    .map(([key]) => key as Formula);
}

/**
 * Get references for a formula
 */
export function getFormulaReferences(formula: Formula): string[] {
  return FORMULAS[formula].references || [];
}
