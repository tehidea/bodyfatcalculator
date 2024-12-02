import { Formula } from "../types/calculator";

/**
 * Returns the margin of error range for a given formula.
 * Values are based on research studies cited in the README.
 */
export function getMarginOfError(formula: Formula): string {
  switch (formula) {
    case "ymca":
      return "5-7%";
    case "mymca":
      return "4-6%";
    case "navy":
      return "4-6%";
    case "covert":
      return "4-5%";
    case "durnin":
      return "3.5-5%";
    case "jack3":
      return "4-5%";
    case "jack4":
      return "3.5-4.5%";
    case "jack7":
      return "3-4%";
    case "parrillo":
      return "3-4%";
    default:
      return "4-6%";
  }
}
