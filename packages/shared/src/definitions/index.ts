import type { Formula, Gender } from "../types/index.ts";

export interface MeasurementField {
  key: string;
  label: string;
  unit: string;
  required: boolean;
  genderSpecific?: Gender;
}

export interface Reference {
  citation: string;
  doi?: string;
  isbn?: string;
  pages?: string;
  url?: string;
  notes?: string;
}

export interface FormulaDefinition {
  key: Formula;
  name: string;
  description: string;
  premium: boolean;
  accuracy: { min: number; max: number };
  fields: MeasurementField[];
  reference: {
    primary: Reference;
    validations?: Reference[];
  };
}

export const FORMULA_DEFINITIONS: Record<Formula, FormulaDefinition> = {
  ymca: {
    key: "ymca",
    name: "YMCA",
    description: "A simple method that uses weight and waist size to estimate body fat",
    premium: false,
    accuracy: { min: 5, max: 7 },
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: true },
      { key: "waistCircumference", label: "Waist Circumference", unit: "cm", required: true },
    ],
    reference: {
      primary: {
        citation:
          'Golding Lawrence A., Myers Clayton R., Sinning Wayne E. (1999). Y\'s Way to Physical Fitness: The Complete Guide to Fitness Testing and Instruction. Human Kinetics.',
        isbn: "0-87322-214-8",
        url: "https://archive.org/details/yswaytophysicalf00gold/",
      },
      validations: [
        {
          citation:
            "YMCA of the USA. (2000). YMCA Fitness Testing and Assessment Manual (4th ed.). YMCA of the USA.",
          isbn: "978-0736033169",
          url: "https://books.google.co.uk/books?id=rmNyQgAACAAJ",
        },
      ],
    },
  },
  mymca: {
    key: "mymca",
    name: "Modified YMCA",
    description:
      "An enhanced version of YMCA that adds wrist, hip, and forearm measurements for women",
    premium: false,
    accuracy: { min: 4, max: 6 },
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
    reference: {
      primary: {
        citation:
          'Golding Lawrence A., Myers Clayton R., Sinning Wayne E. (1999). Y\'s Way to Physical Fitness: The Complete Guide to Fitness Testing and Instruction. Human Kinetics.',
        isbn: "0-87322-214-8",
        url: "https://archive.org/details/yswaytophysicalf00gold/",
      },
      validations: [
        {
          citation:
            "YMCA of the USA. (2000). YMCA Fitness Testing and Assessment Manual (4th ed.). YMCA of the USA.",
          isbn: "978-0736033169",
          url: "https://books.google.co.uk/books?id=rmNyQgAACAAJ",
        },
      ],
    },
  },
  navy: {
    key: "navy",
    name: "U.S. Navy",
    description: "The military's method using height and key body measurements",
    premium: false,
    accuracy: { min: 4, max: 6 },
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: false },
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
    reference: {
      primary: {
        citation:
          "Hodgdon, J.A., & Beckett, M.B. (1984). Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center Report No. 84-29.",
        url: "https://archive.org/details/DTIC_ADA143890",
      },
      validations: [
        {
          citation:
            "Heyward, V.H., & Wagner, D.R. (2004). Applied Body Composition Assessment (2nd ed.). Human Kinetics.",
          isbn: "978-0736046305",
          pages: "87-98",
          url: "https://books.google.co.uk/books?id=rZQe0Yz_IyQC",
        },
      ],
    },
  },
  covert: {
    key: "covert",
    name: "Covert Bailey",
    description:
      "A comprehensive method using age and several body measurements for accuracy",
    premium: true,
    accuracy: { min: 4, max: 5 },
    fields: [
      { key: "weight", label: "Weight", unit: "kg", required: false },
      { key: "age", label: "Age", unit: "years", required: true },
      { key: "hipsCircumference", label: "Hips (widest point)", unit: "cm", required: true },
      { key: "wristCircumference", label: "Wrist (smallest point)", unit: "cm", required: true },
      { key: "waistCircumference", label: "Waist (at navel)", unit: "cm", required: true },
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
    reference: {
      primary: {
        citation:
          "Bailey, C. (1999). The Ultimate Fit or Fat: Get in Shape and Stay in Shape with America's Best-Loved and Most Effective Fitness Teacher. Houghton Mifflin Harcourt.",
        isbn: "978-0395959411",
        url: "https://books.google.co.uk/books?id=X3qbN6DNb_oC",
        notes: "Updated edition of the 1991 original",
      },
    },
  },
  jack3: {
    key: "jack3",
    name: "Jackson & Pollock 3-Site",
    description: "A quick but accurate method using age and three key skinfold measurements",
    premium: true,
    accuracy: { min: 4, max: 5 },
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
      {
        key: "abdomenSkinfold",
        label: "Abdomen Skinfold",
        unit: "mm",
        required: true,
        genderSpecific: "male",
      },
      { key: "thighSkinfold", label: "Thigh Skinfold", unit: "mm", required: true },
      {
        key: "suprailiacSkinfold",
        label: "Suprailiac Skinfold",
        unit: "mm",
        required: true,
        genderSpecific: "female",
      },
    ],
    reference: {
      primary: {
        citation:
          "Jackson, A.S., & Pollock, M.L. (1978). Generalized equations for predicting body density of men. British Journal of Nutrition, 40(3), 497-504.",
        doi: "10.1079/BJN19780152",
        notes: "Original 1978 publication, digitized by Cambridge Core in 2007",
      },
    },
  },
  durnin: {
    key: "durnin",
    name: "Durnin & Womersley",
    description:
      "A scientific method using age and skinfold measurements from four body sites",
    premium: true,
    accuracy: { min: 3.5, max: 5 },
    fields: [
      { key: "age", label: "Age", unit: "years", required: true },
      { key: "bicepSkinfold", label: "Bicep Skinfold", unit: "mm", required: true },
      { key: "tricepSkinfold", label: "Tricep Skinfold", unit: "mm", required: true },
      { key: "subscapularSkinfold", label: "Subscapular Skinfold", unit: "mm", required: true },
      { key: "suprailiacSkinfold", label: "Suprailiac Skinfold", unit: "mm", required: true },
    ],
    reference: {
      primary: {
        citation:
          "Durnin, J.V.G.A., & Womersley, J. (1974). Body fat assessed from total body density and its estimation from skinfold thickness: measurements on 481 men and women aged from 16 to 72 years. British Journal of Nutrition, 32(1), 77-97.",
        doi: "10.1079/BJN19740060",
        notes: "Original 1974 publication, digitized by Cambridge Core",
      },
    },
  },
  jack4: {
    key: "jack4",
    name: "Jackson & Pollock 4-Site",
    description:
      "A balanced approach using age and skinfold measurements from four strategic sites",
    premium: true,
    accuracy: { min: 3.5, max: 4.5 },
    fields: [
      { key: "age", label: "Age", unit: "years", required: true },
      { key: "abdomenSkinfold", label: "Abdomen Skinfold", unit: "mm", required: true },
      { key: "thighSkinfold", label: "Thigh Skinfold", unit: "mm", required: true },
      { key: "tricepSkinfold", label: "Tricep Skinfold", unit: "mm", required: true },
      { key: "suprailiacSkinfold", label: "Suprailiac Skinfold", unit: "mm", required: true },
    ],
    reference: {
      primary: {
        citation:
          "Jackson, A.S., & Pollock, M.L. (1985). Practical assessment of body composition. The Physician and Sportsmedicine, 13(5), 76-90.",
        doi: "10.1080/00913847.1985.11708790",
        notes: "Original 1985 publication, digitized by Taylor & Francis in 2016",
      },
    },
  },
  jack7: {
    key: "jack7",
    name: "Jackson & Pollock 7-Site",
    description: "The most thorough method using age and seven different skinfold sites",
    premium: true,
    accuracy: { min: 3, max: 4 },
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
    reference: {
      primary: {
        citation:
          "Jackson, A.S., & Pollock, M.L. (1985). Practical assessment of body composition. The Physician and Sportsmedicine, 13(5), 76-90.",
        doi: "10.1080/00913847.1985.11708790",
        notes: "Original 1985 publication, digitized by Taylor & Francis in 2016",
      },
    },
  },
  parrillo: {
    key: "parrillo",
    name: "Parrillo",
    description:
      "A bodybuilding-focused method using weight and nine precise skinfold measurements",
    premium: true,
    accuracy: { min: 3, max: 4 },
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
    reference: {
      primary: {
        citation:
          "Parillo, J., & Greenwood-Robinson, M. (1993). High-Performance Body-Building. Perigee Books.",
        isbn: "978-0399517716",
        pages: "185",
        url: "https://books.google.co.uk/books?id=7nETOQAACAAJ",
        notes: "Verification needed for exact location of body fat measurement method",
      },
    },
  },
};
