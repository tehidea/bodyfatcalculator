import {
  Gender,
  CalculatorInputs,
  Formula,
  MeasurementSystem,
  CalculatorResults,
} from "../types/calculator";
import { useMemo } from "react";

export const convertToImperial = (value: number, unit: "kg" | "cm" | "mm"): number => {
  if (value === 0) return 0;

  switch (unit) {
    case "kg":
      return value * 2.20462; // to pounds
    case "cm":
      return value * 0.393701; // to inches
    case "mm":
      return value * 0.0393701; // to inches (mm to inches)
    default:
      return value;
  }
};

function calculateBodyDensity(sumOfSkinfolds: number, age: number, gender: Gender): number {
  // Skinfolds are already in mm, no conversion needed
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

export const calculateBodyFat = (
  formula: Formula,
  gender: Gender,
  inputs: CalculatorInputs,
  measurementSystem: MeasurementSystem
): number => {
  const {
    age = 0,
    weight = 0,
    height = 0,
    waistCircumference = 0,
    hipsCircumference = 0,
    wristCircumference = 0,
    forearmCircumference = 0,
    thighCircumference = 0,
    calfCircumference = 0,
    chestSkinfold = 0,
    abdomenSkinfold = 0,
    tricepSkinfold = 0,
    bicepSkinfold = 0,
    subscapularSkinfold = 0,
    suprailiacSkinfold = 0,
    midaxillarySkinfold = 0,
    neckCircumference = 0,
    lowerBackSkinfold = 0,
  } = inputs;

  // Only convert if we're in metric system
  const weightLbs = measurementSystem === "metric" ? convertToImperial(weight, "kg") : weight;
  const waistInch =
    measurementSystem === "metric"
      ? convertToImperial(waistCircumference, "cm")
      : waistCircumference;
  const hipsInch =
    measurementSystem === "metric" ? convertToImperial(hipsCircumference, "cm") : hipsCircumference;
  const heightInch = measurementSystem === "metric" ? convertToImperial(height, "cm") : height;
  const neckInch =
    measurementSystem === "metric" ? convertToImperial(neckCircumference, "cm") : neckCircumference;
  const wristInch =
    measurementSystem === "metric"
      ? convertToImperial(wristCircumference, "cm")
      : wristCircumference;
  const forearmInch =
    measurementSystem === "metric"
      ? convertToImperial(forearmCircumference, "cm")
      : forearmCircumference;
  const thighInch =
    measurementSystem === "metric"
      ? convertToImperial(thighCircumference, "cm")
      : thighCircumference;
  const calfInch =
    measurementSystem === "metric" ? convertToImperial(calfCircumference, "cm") : calfCircumference;

  switch (formula) {
    case "ymca": {
      if (gender === "male") {
        return (100 * (4.15 * waistInch - 0.082 * weightLbs - 98.42)) / weightLbs;
      }
      return (100 * (4.15 * waistInch - 0.082 * weightLbs - 76.76)) / weightLbs;
    }

    case "mymca": {
      if (gender === "male") {
        return ((4.15 * waistInch - 0.082 * weightLbs - 94.42) / weightLbs) * 100;
      }
      return (
        ((0.268 * weightLbs -
          0.318 * wristInch +
          0.157 * waistInch +
          0.245 * hipsInch -
          0.434 * forearmInch -
          8.987) /
          weightLbs) *
        100
      );
    }

    case "covert": {
      if (gender === "male") {
        // B + 0.5A – 3C – D (age ≤ 30)
        // B + 0.5A – 2.7C – D (age > 30)
        const forearmMultiplier = age <= 30 ? 3 : 2.7;
        return waistInch + 0.5 * hipsInch - forearmMultiplier * forearmInch - wristInch;
      } else {
        // A + 0.8B – 2C – D (age ≤ 30)
        // A + B – 2C – D (age > 30)
        const thighMultiplier = age <= 30 ? 0.8 : 1;
        return hipsInch + thighMultiplier * thighInch - 2 * calfInch - wristInch;
      }
    }

    case "navy": {
      if (gender === "male") {
        return 86.01 * Math.log10(waistInch - neckInch) - 70.041 * Math.log10(heightInch) + 36.76;
      }
      return (
        163.205 * Math.log10(waistInch + hipsInch - neckInch) -
        97.684 * Math.log10(heightInch) -
        78.387
      );
    }

    // case "jack3": {
    //   const sumOfSkinfolds = chestSkinfold + abdomenSkinfold + thighSkinfold;
    //   const bodyDensity = calculateBodyDensity(sumOfSkinfolds, age, gender);
    //   return 495 / bodyDensity - 450;
    // }

    // case "durnin": {
    //   const sumOfSkinfolds = Math.log10(
    //     bicepSkinfold + tricepSkinfold + subscapularSkinfold + suprailiacSkinfold
    //   );
    //   let bodyDensity: number;

    //   if (gender === "male") {
    //     if (age < 17) bodyDensity = 1.1533 - 0.0643 * sumOfSkinfolds;
    //     else if (age <= 19) bodyDensity = 1.162 - 0.063 * sumOfSkinfolds;
    //     else if (age <= 29) bodyDensity = 1.1631 - 0.0632 * sumOfSkinfolds;
    //     else if (age <= 39) bodyDensity = 1.1422 - 0.0544 * sumOfSkinfolds;
    //     else if (age <= 49) bodyDensity = 1.162 - 0.07 * sumOfSkinfolds;
    //     else bodyDensity = 1.1715 - 0.0779 * sumOfSkinfolds;
    //   } else {
    //     if (age < 17) bodyDensity = 1.1369 - 0.0598 * sumOfSkinfolds;
    //     else if (age <= 19) bodyDensity = 1.1549 - 0.0678 * sumOfSkinfolds;
    //     else if (age <= 29) bodyDensity = 1.1599 - 0.0717 * sumOfSkinfolds;
    //     else if (age <= 39) bodyDensity = 1.1423 - 0.0632 * sumOfSkinfolds;
    //     else if (age <= 49) bodyDensity = 1.1333 - 0.0612 * sumOfSkinfolds;
    //     else bodyDensity = 1.1339 - 0.0645 * sumOfSkinfolds;
    //   }
    //   return 495 / bodyDensity - 450;
    // }

    // case "jack4": {
    //   const sumOfSkinfolds = abdomenSkinfold + thighSkinfold + tricepSkinfold + suprailiacSkinfold;
    //   const bodyDensity = calculateBodyDensity(sumOfSkinfolds, age, gender);
    //   return 495 / bodyDensity - 450;
    // }

    // case "jack7": {
    //   const sumOfSkinfolds =
    //     chestSkinfold +
    //     abdomenSkinfold +
    //     thighSkinfold +
    //     tricepSkinfold +
    //     subscapularSkinfold +
    //     suprailiacSkinfold +
    //     midaxillarySkinfold;
    //   const bodyDensity = calculateBodyDensity(sumOfSkinfolds, age, gender);
    //   return 495 / bodyDensity - 450;
    // }

    // case "parrillo": {
    //   const weightVal = convertToImperial(weight, "kg");
    //   return (
    //     ((chestSkinfold +
    //       abdomenSkinfold +
    //       thighSkinfold +
    //       bicepSkinfold +
    //       tricepSkinfold +
    //       subscapularSkinfold +
    //       suprailiacSkinfold +
    //       lowerBackSkinfold +
    //       calfSkinfold) *
    //       27) /
    //     weightVal
    //   );
    // }

    // Coming Soon formulas
    case "jack3":
    case "durnin":
    case "jack4":
    case "jack7":
    case "parrillo":
      return 0;

    default:
      return 0;
  }
};

export const getClassification = (bodyFat: number, gender: Gender): string => {
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
};

function isValidBodyFat(bodyFat: number): { isValid: boolean; message?: string } {
  if (isNaN(bodyFat)) {
    return {
      isValid: false,
      message: "Please check your measurements. The calculation resulted in an invalid value.",
    };
  }
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

export async function calculateResults(
  formula: Formula,
  gender: Gender,
  inputs: CalculatorInputs,
  measurementSystem: MeasurementSystem
): Promise<CalculatorResults> {
  const bodyFat = calculateBodyFat(formula as Formula, gender, inputs, measurementSystem);

  const validation = isValidBodyFat(bodyFat);
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const classification = getClassification(bodyFat, gender);
  const weight = inputs.weight || 0;
  const fatMass = weight * (bodyFat / 100);
  const leanMass = weight - fatMass;

  return {
    bodyFatPercentage: bodyFat,
    fatMass,
    leanMass,
    classification,
  };
}
