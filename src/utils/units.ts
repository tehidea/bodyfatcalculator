import { MeasurementSystem } from "../types/calculator";

export function getDisplayUnit(unit: string, system: MeasurementSystem): string {
  if (system === "imperial") {
    switch (unit) {
      case "cm":
      case "mm":
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
  if (system === "metric") {
    switch (type) {
      case "weight":
        return "kg";
      case "skinfold":
        return "mm";
      default:
        return "cm";
    }
  }
  return type === "weight" ? "lb" : "in";
}
