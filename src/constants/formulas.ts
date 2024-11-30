import { Formula, CalculatorInputs, MeasurementSystem, Gender } from "../types/calculator";

interface FormulaField {
  key: keyof CalculatorInputs;
  label: string;
  unit: string;
  required: boolean;
  imperialUnit?: string;
  genderSpecific?: Gender;
}

export const getUnitLabel = (unit: string, system: MeasurementSystem): string => {
  if (system === "imperial") {
    switch (unit) {
      case "kg":
        return "lbs";
      case "cm":
        return "in";
      default:
        return unit;
    }
  }
  return unit;
};

export const FORMULA_REQUIREMENTS: Record<
  Formula,
  {
    name: string;
    description: string;
    fields: FormulaField[];
    premium?: boolean;
  }
> = {
  ymca: {
    name: "YMCA",
    description: "Simple method using waist circumference and weight",
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: true },
      { key: "waistCircumference", label: "Waist Circumference", unit: "cm", required: true },
    ],
  },
  mymca: {
    name: "Modified YMCA",
    description: "Enhanced YMCA method with gender-specific measurements",
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: true },
      { key: "waistCircumference", label: "Waist Circumference", unit: "cm", required: true },
      {
        key: "wristCircumference",
        label: "Wrist Circumference",
        unit: "cm",
        required: true,
        genderSpecific: "female",
      },
      {
        key: "hipsCircumference",
        label: "Hips Circumference",
        unit: "cm",
        required: true,
        genderSpecific: "female",
      },
      {
        key: "forearmCircumference",
        label: "Forearm Circumference",
        unit: "cm",
        required: true,
        genderSpecific: "female",
      },
    ],
  },
  covert: {
    name: "Covert Bailey",
    description: "Simple method using basic body measurements and gender-specific calculations",
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: true },
      { key: "wristCircumference", label: "Wrist Circumference", unit: "cm", required: true },
      {
        key: "hipsCircumference",
        label: "Hips Circumference",
        unit: "cm",
        required: true,
        genderSpecific: "female",
      },
    ],
    premium: true,
  },
  navy: {
    name: "U.S. Navy",
    description: "Military circumference method with gender-specific calculations",
    fields: [
      { key: "height", label: "Height", unit: "cm", required: true },
      { key: "neckCircumference", label: "Neck Circumference", unit: "cm", required: true },
      { key: "waistCircumference", label: "Waist Circumference", unit: "cm", required: true },
      {
        key: "hipsCircumference",
        label: "Hips Circumference",
        unit: "cm",
        required: true,
        genderSpecific: "female",
      },
    ],
  },
  durnin: {
    name: "Durnin & Womersley",
    description: "Four-site skinfold method with age and gender-specific equations",
    fields: [
      { key: "age", label: "Age", unit: "years", required: true },
      { key: "bicepSkinfold", label: "Bicep Skinfold", unit: "mm", required: true },
      { key: "tricepSkinfold", label: "Tricep Skinfold", unit: "mm", required: true },
      { key: "subscapularSkinfold", label: "Subscapular Skinfold", unit: "mm", required: true },
      { key: "suprailiacSkinfold", label: "Suprailiac Skinfold", unit: "mm", required: true },
    ],
    premium: true,
  },
  jack3: {
    name: "Jackson & Pollock 3-Site",
    description: "Three-site skinfold method optimized for each gender",
    fields: [
      { key: "age", label: "Age", unit: "years", required: true },
      {
        key: "chestSkinfold",
        label: "Chest Skinfold",
        unit: "mm",
        required: true,
        genderSpecific: "male",
      },
      {
        key: "tricepSkinfold",
        label: "Tricep Skinfold",
        unit: "mm",
        required: true,
        genderSpecific: "female",
      },
      { key: "abdomenSkinfold", label: "Abdomen Skinfold", unit: "mm", required: true },
      { key: "thighSkinfold", label: "Thigh Skinfold", unit: "mm", required: true },
      {
        key: "suprailiacSkinfold",
        label: "Suprailiac Skinfold",
        unit: "mm",
        required: true,
        genderSpecific: "female",
      },
    ],
    premium: true,
  },
  jack4: {
    name: "Jackson & Pollock 4-Site",
    description: "Four-site skinfold method, good balance of accuracy and practicality",
    fields: [
      { key: "age", label: "Age", unit: "years", required: true },
      { key: "abdomenSkinfold", label: "Abdomen Skinfold", unit: "mm", required: true },
      { key: "thighSkinfold", label: "Thigh Skinfold", unit: "mm", required: true },
      { key: "tricepSkinfold", label: "Tricep Skinfold", unit: "mm", required: true },
      { key: "suprailiacSkinfold", label: "Suprailiac Skinfold", unit: "mm", required: true },
    ],
    premium: true,
  },
  jack7: {
    name: "Jackson & Pollock 7-Site",
    description: "Seven-site skinfold method, highly accurate for both genders",
    fields: [
      { key: "age", label: "Age", unit: "years", required: true },
      { key: "chestSkinfold", label: "Chest Skinfold", unit: "mm", required: true },
      { key: "abdomenSkinfold", label: "Abdomen Skinfold", unit: "mm", required: true },
      { key: "thighSkinfold", label: "Thigh Skinfold", unit: "mm", required: true },
      { key: "tricepSkinfold", label: "Tricep Skinfold", unit: "mm", required: true },
      { key: "subscapularSkinfold", label: "Subscapular Skinfold", unit: "mm", required: true },
      { key: "suprailiacSkinfold", label: "Suprailiac Skinfold", unit: "mm", required: true },
      { key: "midaxillarySkinfold", label: "Midaxillary Skinfold", unit: "mm", required: true },
    ],
    premium: true,
  },
  parrillo: {
    name: "Parrillo",
    description: "Nine-site skinfold method, popular in bodybuilding",
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: true },
      { key: "chestSkinfold", label: "Chest Skinfold", unit: "mm", required: true },
      { key: "abdomenSkinfold", label: "Abdomen Skinfold", unit: "mm", required: true },
      { key: "thighSkinfold", label: "Thigh Skinfold", unit: "mm", required: true },
      { key: "bicepSkinfold", label: "Bicep Skinfold", unit: "mm", required: true },
      { key: "tricepSkinfold", label: "Tricep Skinfold", unit: "mm", required: true },
      { key: "subscapularSkinfold", label: "Subscapular Skinfold", unit: "mm", required: true },
      { key: "suprailiacSkinfold", label: "Suprailiac Skinfold", unit: "mm", required: true },
      { key: "lowerBackSkinfold", label: "Lower Back Skinfold", unit: "mm", required: true },
      { key: "calfSkinfold", label: "Calf Skinfold", unit: "mm", required: true },
    ],
    premium: true,
  },
} as const;
