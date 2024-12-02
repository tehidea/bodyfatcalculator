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
    description: "A simple method that uses your weight and waist size to estimate body fat",
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: true },
      { key: "waistCircumference", label: "Waist Circumference", unit: "cm", required: true },
    ],
  },
  mymca: {
    name: "Modified YMCA",
    description:
      "An enhanced version of YMCA that adds wrist, hip, and forearm measurements for women",
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
  navy: {
    name: "U.S. Navy",
    description: "The military's method using your weight, height, and key body measurements",
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: true },
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
  covert: {
    name: "Covert Bailey",
    description:
      "A comprehensive method using your weight, age, and several body measurements for accuracy",
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: true },
      { key: "age", label: "Age", unit: "years", required: true },
      { key: "hipsCircumference", label: "Hips (widest point)", unit: "cm", required: true },
      { key: "wristCircumference", label: "Wrist (smallest point)", unit: "cm", required: true },
      {
        key: "waistCircumference",
        label: "Waist (at navel)",
        unit: "cm",
        required: true,
        genderSpecific: "male",
      },
      {
        key: "forearmCircumference",
        label: "Forearm (widest point)",
        unit: "cm",
        required: true,
        genderSpecific: "male",
      },
      {
        key: "thighCircumference",
        label: "Thigh (widest point)",
        unit: "cm",
        required: true,
        genderSpecific: "female",
      },
      {
        key: "calfCircumference",
        label: "Calf (widest point)",
        unit: "cm",
        required: true,
        genderSpecific: "female",
      },
    ],
    premium: true,
  },
  jack3: {
    name: "Jackson & Pollock 3-Site",
    description: "A quick but accurate method using your age and three key skinfold measurements",
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
  durnin: {
    name: "Durnin & Womersley",
    description:
      "A scientific method using your age and skinfold measurements from four body sites",
    fields: [
      { key: "age", label: "Age", unit: "years", required: true },
      { key: "bicepSkinfold", label: "Bicep Skinfold", unit: "mm", required: true },
      { key: "tricepSkinfold", label: "Tricep Skinfold", unit: "mm", required: true },
      { key: "subscapularSkinfold", label: "Subscapular Skinfold", unit: "mm", required: true },
      { key: "suprailiacSkinfold", label: "Suprailiac Skinfold", unit: "mm", required: true },
    ],
    premium: true,
  },
  jack4: {
    name: "Jackson & Pollock 4-Site",
    description:
      "A balanced approach using your age and skinfold measurements from four strategic sites",
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
    description: "The most thorough method using your age and seven different skinfold sites",
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
    description:
      "A bodybuilding-focused method using your weight and nine precise skinfold measurements",
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
