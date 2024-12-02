import { Formula } from "../types/calculator";

/**
 * Returns the margin of error range for a given formula.
 * Values are based on research studies cited in the README.
 */
export function getMarginOfError(formula: Formula): string {
  switch (formula) {
    case "ymca":
      return "4-6%";
    case "mymca":
      return "3.5-5.5%";
    case "navy":
      return "3-4%";
    case "covert":
      return "3.5-4.5%";
    case "durnin":
      return "3-4%";
    case "jack3":
      return "3.5-4%";
    case "jack4":
      return "3-3.5%";
    case "jack7":
      return "2.5-3%";
    case "parrillo":
      return "2.5-3%";
    default:
      return "3-5%";
  }
}

/**
 * Returns whether a formula is considered high accuracy (margin of error ≤ 3.5%)
 */
export function isHighAccuracyFormula(formula: Formula): boolean {
  switch (formula) {
    case "jack4":
    case "jack7":
    case "parrillo":
      return true;
    default:
      return false;
  }
}

/**
 * Returns whether a formula requires special equipment or training
 */
export function requiresSpecialEquipment(formula: Formula): boolean {
  switch (formula) {
    case "durnin":
    case "jack3":
    case "jack4":
    case "jack7":
    case "parrillo":
      return true; // Requires skinfold calipers
    default:
      return false;
  }
}
