import { MeasurementSystem } from "../types/calculator";
import { ConversionType } from "./conversions";

export function getDisplayUnit(
  unit: string,
  system: MeasurementSystem,
  type?: ConversionType
): string {
  if (type === "skinfold") return "mm";

  if (system === "imperial") {
    switch (unit) {
      case "cm":
        return "in";
      case "kg":
        return "lbs";
      default:
        return unit;
    }
  }
  return unit;
}

export function getStandardUnit(type: string, system: MeasurementSystem): string {
  if (type === "none") return "years";
  if (type === "skinfold") return "mm";

  if (system === "metric") {
    switch (type) {
      case "weight":
        return "kg";
      default:
        return "cm";
    }
  }
  return type === "weight" ? "lb" : "in";
}
