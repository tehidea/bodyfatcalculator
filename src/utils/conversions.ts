/**
 * Unified conversion layer for handling measurement system conversions.
 * All internal calculations use metric system, conversions happen at the edges of the system.
 */

export type MetricUnit = "kg" | "cm" | "mm";
export type ImperialUnit = "lb" | "in";
export type ConversionType = "weight" | "length" | "skinfold";

// Standard conversion factors
const STANDARD_CONVERSION_FACTORS = {
  POUNDS_PER_KG: 2.20462262185,
  INCHES_PER_CM: 1 / 2.54,
  INCHES_PER_MM: 1 / 25.4,
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

function createConverter(factor: number): ConversionUnit["toImperial" | "toMetric"] {
  return (value: number) => {
    validateInput(value);
    return value * factor;
  };
}

export const CONVERSIONS: Record<ConversionType, ConversionUnit> = {
  weight: {
    metric: "kg",
    imperial: "lb",
    toImperial: createConverter(STANDARD_CONVERSION_FACTORS.POUNDS_PER_KG),
    toMetric: createConverter(1 / STANDARD_CONVERSION_FACTORS.POUNDS_PER_KG),
  },
  length: {
    metric: "cm",
    imperial: "in",
    toImperial: createConverter(STANDARD_CONVERSION_FACTORS.INCHES_PER_CM),
    toMetric: createConverter(2.54), // cm per inch
  },
  skinfold: {
    metric: "mm",
    imperial: "in",
    toImperial: createConverter(STANDARD_CONVERSION_FACTORS.INCHES_PER_MM),
    toMetric: createConverter(25.4), // mm per inch
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
  validateInput(value);

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
  validateInput(value);
  const precision = value < 0.1 ? 3 : 1; // Use more precision for small values
  return `${value.toFixed(precision)} ${getUnit(type, system)}`;
}

/**
 * Validates if a measurement is within a reasonable range
 */
export function isReasonableMeasurement(
  value: number,
  type: ConversionType,
  system: "metric" | "imperial"
): boolean {
  try {
    validateInput(value);
  } catch {
    return false;
  }

  const ranges = {
    weight: { metric: { min: 20, max: 300 }, imperial: { min: 44, max: 660 } },
    length: { metric: { min: 1, max: 300 }, imperial: { min: 0.4, max: 118 } },
    skinfold: { metric: { min: 1, max: 100 }, imperial: { min: 0.04, max: 4 } },
  };

  const range = ranges[type][system];
  return value >= range.min && value <= range.max;
}
