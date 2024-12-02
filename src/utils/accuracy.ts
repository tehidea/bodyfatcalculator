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
