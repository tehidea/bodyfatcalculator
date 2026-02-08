/**
 * Unified conversion layer for handling measurement system conversions.
 * All internal calculations use metric system, conversions happen at the edges of the system.
 */

import type { MeasurementSystem } from "../types/index.ts";

export type MetricUnit = "kg" | "cm" | "mm" | "years";
export type ImperialUnit = "lb" | "in" | "years";
export type ConversionType = "weight" | "length" | "skinfold" | "none";

// Standard conversion factors
const STANDARD_CONVERSION_FACTORS = {
  POUNDS_PER_KG: 2.20462,
  INCHES_PER_CM: 0.393701,
} as const;

// Precision settings for different measurement types
const PRECISION_SETTINGS = {
  weight: 2, // 2 decimal places for weight
  length: 2, // 2 decimal places for length
  skinfold: 0, // no decimal places for skinfold (always in mm)
  none: 0, // no decimal places for things like age
} as const;

export interface ConversionUnit {
  metric: MetricUnit;
  imperial: ImperialUnit;
  toImperial: (value: number) => number;
  toMetric: (value: number) => number;
}

function validateInput(value: number): void {
  if (typeof value !== "number") {
    throw new Error("Input must be a number");
  }
  if (!Number.isFinite(value)) {
    throw new Error("Input must be a finite number");
  }
  if (value < 0) {
    throw new Error("Input must be non-negative");
  }
}

function roundToPrecision(value: number, type: ConversionType): number {
  const precision = PRECISION_SETTINGS[type];
  return Number(value.toFixed(precision));
}

function createConverter(
  factor: number,
  type: ConversionType
): ConversionUnit["toImperial" | "toMetric"] {
  return (value: number) => {
    validateInput(value);
    return roundToPrecision(value * factor, type);
  };
}

export const CONVERSIONS: Record<ConversionType, ConversionUnit> = {
  weight: {
    metric: "kg",
    imperial: "lb",
    toImperial: createConverter(STANDARD_CONVERSION_FACTORS.POUNDS_PER_KG, "weight"),
    toMetric: createConverter(1 / STANDARD_CONVERSION_FACTORS.POUNDS_PER_KG, "weight"),
  },
  length: {
    metric: "cm",
    imperial: "in",
    toImperial: createConverter(STANDARD_CONVERSION_FACTORS.INCHES_PER_CM, "length"),
    toMetric: createConverter(2.54, "length"), // cm per inch
  },
  skinfold: {
    metric: "mm",
    imperial: "mm" as ImperialUnit, // Always use mm regardless of system
    toImperial: (value: number) => roundToPrecision(value, "skinfold"), // No conversion needed
    toMetric: (value: number) => roundToPrecision(value, "skinfold"), // No conversion needed
  },
  none: {
    metric: "years",
    imperial: "years",
    toImperial: (value: number) => roundToPrecision(value, "none"),
    toMetric: (value: number) => roundToPrecision(value, "none"),
  },
};

/**
 * Converts a value between measurement systems
 */
export function convertMeasurement(
  value: number,
  type: ConversionType,
  fromSystem: MeasurementSystem,
  toSystem: MeasurementSystem
): number {
  validateInput(value);

  if (fromSystem === toSystem) return roundToPrecision(value, type);

  const converter = CONVERSIONS[type];
  return fromSystem === "metric" ? converter.toImperial(value) : converter.toMetric(value);
}

/**
 * Gets the appropriate unit for a measurement type based on the system
 */
export function getUnit(type: ConversionType, system: MeasurementSystem): string {
  return CONVERSIONS[type][system];
}

/**
 * Formats a measurement value with its unit
 */
export function formatMeasurement(
  value: number,
  type: ConversionType,
  system: MeasurementSystem
): string {
  validateInput(value);
  return `${roundToPrecision(value, type)} ${getUnit(type, system)}`;
}

/**
 * Validates if a measurement is within a reasonable range
 */
export function isReasonableMeasurement(
  value: number,
  type: ConversionType,
  system: MeasurementSystem
): boolean {
  try {
    validateInput(value);
  } catch {
    return false;
  }

  if (type === "none") {
    // Handle age validation
    return value >= 0 && value <= 120;
  }

  const ranges = {
    weight: { metric: { min: 20, max: 300 }, imperial: { min: 44, max: 660 } },
    length: { metric: { min: 1, max: 300 }, imperial: { min: 0.4, max: 118 } },
    skinfold: { metric: { min: 1, max: 100 }, imperial: { min: 1, max: 100 } },
  };

  const range = ranges[type]?.[system];
  if (!range) return true;

  return value >= range.min && value <= range.max;
}

/**
 * Determines if a value needs conversion based on the measurement type
 */
export function needsConversion(type: ConversionType): boolean {
  return type !== "none" && type !== "skinfold";
}
