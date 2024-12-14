/**
 * Unified conversion layer for handling measurement system conversions.
 * All internal calculations use metric system, conversions happen at the edges of the system.
 */

export type MetricUnit = "kg" | "cm" | "mm";
export type ImperialUnit = "lb" | "in";
export type ConversionType = "weight" | "length" | "skinfold";

export interface ConversionUnit {
  metric: MetricUnit;
  imperial: ImperialUnit;
  toImperial: (value: number) => number;
  toMetric: (value: number) => number;
}

export const CONVERSIONS: Record<ConversionType, ConversionUnit> = {
  weight: {
    metric: "kg",
    imperial: "lb",
    toImperial: kg => Number((kg * 2.20462).toFixed(2)),
    toMetric: lb => Number((lb / 2.20462).toFixed(2)),
  },
  length: {
    metric: "cm",
    imperial: "in",
    toImperial: cm => Number((cm * 0.393701).toFixed(2)),
    toMetric: inch => Number((inch / 0.393701).toFixed(2)),
  },
  skinfold: {
    metric: "mm",
    imperial: "in",
    toImperial: mm => Number((mm * 0.0393701).toFixed(2)),
    toMetric: inch => Number((inch / 0.0393701).toFixed(2)),
  },
};

/**
 * Converts a value between measurement systems
 */
export function convertMeasurement(
  value: number,
  type: ConversionType,
  fromSystem: "metric" | "imperial",
  toSystem: "metric" | "imperial"
): number {
  if (fromSystem === toSystem) return value;

  const converter = CONVERSIONS[type];
  return fromSystem === "metric" ? converter.toImperial(value) : converter.toMetric(value);
}

/**
 * Gets the appropriate unit for a measurement type based on the system
 */
export function getUnit(type: ConversionType, system: "metric" | "imperial"): string {
  return CONVERSIONS[type][system];
}

/**
 * Formats a measurement value with its unit
 */
export function formatMeasurement(
  value: number,
  type: ConversionType,
  system: "metric" | "imperial"
): string {
  return `${value.toFixed(1)} ${getUnit(type, system)}`;
}
