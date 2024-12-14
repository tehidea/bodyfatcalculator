import { Gender } from "../types/calculator";

/**
 * Calculates body density using the Jackson-Pollock formula
 */
export function calculateBodyDensity(sumOfSkinfolds: number, age: number, gender: Gender): number {
  if (gender === "male") {
    return (
      1.10938 -
      0.0008267 * sumOfSkinfolds +
      0.0000016 * Math.pow(sumOfSkinfolds, 2) -
      0.0002574 * age
    );
  }
  return (
    1.0994921 -
    0.0009929 * sumOfSkinfolds +
    0.0000023 * Math.pow(sumOfSkinfolds, 2) -
    0.0001392 * age
  );
}

/**
 * Gets the classification based on body fat percentage and gender
 */
export function getClassification(bodyFat: number, gender: Gender): string {
  if (gender === "male") {
    if (bodyFat >= 2 && bodyFat < 6) return "Essential fat (2-5%)";
    if (bodyFat >= 6 && bodyFat < 14) return "Athletic (6-13%)";
    if (bodyFat >= 14 && bodyFat < 18) return "Fitness (14-17%)";
    if (bodyFat >= 18 && bodyFat < 25) return "Acceptable (18-25%)";
    if (bodyFat >= 25) return "Obese (> 25%)";
  } else {
    if (bodyFat >= 10 && bodyFat < 14) return "Essential fat (10-13%)";
    if (bodyFat >= 14 && bodyFat < 21) return "Athletic (14-20%)";
    if (bodyFat >= 21 && bodyFat < 25) return "Fitness (21-24%)";
    if (bodyFat >= 25 && bodyFat < 31) return "Acceptable (25-31%)";
    if (bodyFat > 31) return "Obese (> 31%)";
  }
  return "Unknown";
}

/**
 * Validates a body fat percentage value
 */
export function validateBodyFat(bodyFat: number): { isValid: boolean; message?: string } {
  // Check for Infinity first (division by zero)
  if (!Number.isFinite(bodyFat)) {
    return {
      isValid: false,
      message: "Please check your measurements. The calculation resulted in an invalid value.",
    };
  }
  // Then check for NaN
  if (isNaN(bodyFat)) {
    return {
      isValid: false,
      message: "Please check your measurements. The calculation resulted in an invalid value.",
    };
  }
  // Then check range
  if (bodyFat < 0) {
    return {
      isValid: false,
      message: "Please check your measurements. Body fat percentage cannot be negative.",
    };
  }
  if (bodyFat > 100) {
    return {
      isValid: false,
      message: "Please check your measurements. Body fat percentage cannot exceed 100%.",
    };
  }
  return { isValid: true };
}
