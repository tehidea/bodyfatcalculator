import { z } from "zod";

// Basic types
export type Gender = "male" | "female";
export type MeasurementSystem = "metric" | "imperial";
export type Formula = (typeof validFormulas)[number];

// Schema for calculation results
export const calculationResultSchema = z
  .object({
    bodyFatPercentage: z
      .number()
      .min(0, "Body fat percentage cannot be negative")
      .max(100, "Body fat percentage cannot exceed 100%"),
    fatMass: z.number().min(0, "Fat mass cannot be negative"),
    leanMass: z.number().min(0, "Lean mass cannot be negative"),
  })
  .strict();

export type CalculationResult = z.infer<typeof calculationResultSchema>;

// Add the formula implementation types here
export interface FormulaImplementation {
  (inputs: Record<string, number>): CalculationResult;
}

export type FormulaMap = Record<Formula, FormulaImplementation>;

// Add validation helper for calculation results
export function validateCalculationResult(result: unknown): ValidationResult {
  try {
    calculationResultSchema.parse(result);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return {
      success: false,
      errors: { _: error instanceof Error ? error.message : "Unknown validation error" },
    };
  }
}

export interface StandardizedInputs {
  weight?: number;
  height?: number;
  age?: number;
  [key: string]: number | undefined;
}

// First, extend Zod's functionality to support metadata
z.ZodType.prototype.meta = function meta(metadata: Record<string, unknown>) {
  (this as any)._def.metadata = metadata;
  return this;
};

// Define valid formulas in a single place
const validFormulas = [
  "ymca",
  "mymca",
  "navy",
  "covert",
  "jack3",
  "durnin",
  "jack4",
  "jack7",
  "parillo",
] as const;

// Export the isValidFormula function
export function isValidFormula(formula: unknown): formula is Formula {
  return typeof formula === "string" && validFormulas.includes(formula as Formula);
}

// Extend Zod to support metadata
declare module "zod" {
  interface ZodType {
    meta<T extends Record<string, unknown>>(metadata: T): this & { _def: { metadata: T } };
  }
  interface ZodTypeDef {
    metadata?: Record<string, unknown>;
  }
}

// Types for metadata
export interface FieldMetadata {
  label: string;
  unit?: string;
  type: "weight" | "height" | "skinfold" | "age" | "circumference";
  accessibilityHint?: string;
}

export interface FormulaMetadata {
  name: string;
  description: string;
  premium: boolean;
  accuracy: {
    min: number;
    max: number;
  };
  reference: {
    primary: {
      citation: string;
      doi?: string;
      isbn?: string;
      pages?: string;
      url?: string;
      notes?: string;
    };
    validations?: Array<{
      citation: string;
      doi?: string;
      isbn?: string;
      pages?: string;
      url?: string;
      notes?: string;
    }>;
  };
}

// Add a type helper for schema with metadata
type SchemaWithMetadata<T> = z.ZodObject<any, any, any> & {
  _def: {
    metadata?: T;
  };
};

// Type for schema definition
type SchemaDefinition = (
  system: MeasurementSystem
) => (gender: Gender) => z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;

// Unit-specific schema factories with metadata
function createWeightSchema(system: MeasurementSystem) {
  return z
    .number()
    .min(
      system === "metric" ? 20 : 44,
      `Weight must be at least ${system === "metric" ? "20 kg" : "44 lbs"}`
    )
    .max(
      system === "metric" ? 300 : 661,
      `Weight cannot exceed ${system === "metric" ? "300 kg" : "661 lbs"}`
    )
    .describe("Weight")
    .describe("Weight (required for mass calculations)")
    .meta({
      label: "Weight",
      unit: system === "metric" ? "kg" : "lb",
      type: "weight",
      accessibilityHint: "Enter your body weight for accurate body fat calculations",
    });
}

function createHeightSchema(system: MeasurementSystem) {
  return z
    .number()
    .min(
      system === "metric" ? 100 : 39.4,
      `Height must be at least ${system === "metric" ? "100 cm" : "39.4 in"}`
    )
    .max(
      system === "metric" ? 250 : 98.4,
      `Height cannot exceed ${system === "metric" ? "250 cm" : "98.4 in"}`
    )
    .describe("Height")
    .meta({
      label: "Height",
      unit: system === "metric" ? "cm" : "in",
      type: "height",
      accessibilityHint: "Enter your height for body composition calculations",
    });
}

// Helper function to get specific circumference hints
function getCircumferenceHint(label: string): string {
  const hints: Record<string, string> = {
    "Waist Circumference":
      "Measure around your waist at the navel level, keeping the tape parallel to the floor",
    "Neck Circumference":
      "Measure around your neck just below the Adam's apple, keeping the tape level",
    "Wrist Circumference":
      "Measure around the smallest part of your wrist, just below the wrist bone",
    "Forearm Circumference": "Measure around the widest part of your forearm with your arm relaxed",
    "Hips Circumference":
      "Measure around the widest part of your hips and buttocks, keeping the tape level",
    "Thigh Circumference":
      "Measure around the widest part of your thigh while standing with weight evenly distributed",
    "Calf Circumference":
      "Measure around the widest part of your calf muscle while standing relaxed",
  };

  return hints[label] || `Measure ${label.toLowerCase()} at the widest point for accurate results`;
}

// Helper function to get specific skinfold hints
function getSkinfoldHint(label: string): string {
  const hints: Record<string, string> = {
    "Chest Skinfold":
      "Pinch the skin diagonally halfway between the nipple and anterior axillary fold",
    "Abdomen Skinfold": "Pinch vertically 2cm to the right of the navel",
    "Thigh Skinfold": "Pinch vertically at the midpoint of the front of the thigh",
    "Tricep Skinfold": "Pinch vertically at the midpoint of the back of your upper arm",
    "Suprailiac Skinfold": "Pinch diagonally above the hip bone following the natural angle",
    "Subscapular Skinfold": "Pinch diagonally below the bottom tip of the shoulder blade",
    "Bicep Skinfold": "Pinch vertically at the midpoint of the front of your upper arm",
    "Midaxillary Skinfold": "Pinch vertically on the midaxillary line at nipple level",
    "Lower Back Skinfold": "Pinch vertically about 2cm from the spine at waist level",
    "Calf Skinfold": "Pinch vertically at the inside of the calf at maximum circumference",
  };

  return hints[label] || `Measure ${label.toLowerCase()} using calipers, pinching the skin gently`;
}

// Update the createCircumferenceSchema function
function createCircumferenceSchema(system: MeasurementSystem, label: string) {
  return z
    .number()
    .min(
      system === "metric" ? 1 : 0.4,
      `Circumference must be at least ${system === "metric" ? "1 cm" : "0.4 in"}`
    )
    .max(
      system === "metric" ? 200 : 78.7,
      `Circumference cannot exceed ${system === "metric" ? "200 cm" : "78.7 in"}`
    )
    .describe(label)
    .meta({
      label,
      unit: system === "metric" ? "cm" : "in",
      type: "circumference",
      accessibilityHint: getCircumferenceHint(label),
    });
}

// Update the createSkinfoldSchema function
function createSkinfoldSchema(system: MeasurementSystem, label: string) {
  return z
    .number()
    .min(1, "Skinfold must be at least 1 mm")
    .max(100, "Skinfold cannot exceed 100 mm")
    .describe(label)
    .meta({
      label,
      unit: "mm",
      type: "skinfold",
      accessibilityHint: getSkinfoldHint(label),
    });
}

function createAgeSchema() {
  return z
    .number()
    .int()
    .min(0)
    .max(120)
    .describe("Age")
    .meta({
      label: "Age",
      unit: "years",
      type: "age",
      accessibilityHint: "Enter your current age in years",
    } as const);
}

// Formula-specific schema factories with metadata
export const formulaSchemas: Record<Formula, SchemaDefinition> = {
  ymca: (system: MeasurementSystem) => (_gender: Gender) =>
    z
      .object({
        weight: createWeightSchema(system),
        waistCircumference: createCircumferenceSchema(system, "Waist Circumference"),
      })
      .required()
      .meta({
        name: "YMCA",
        description: "A simple method that uses weight and waist size to estimate body fat",
        premium: false,
        accuracy: {
          min: 5,
          max: 7,
        },
        reference: {
          primary: {
            citation:
              "Golding Lawrence A., Myers Clayton R., Sinning Wayne E. (1999). Y's Way to Physical Fitness: The Complete Guide to Fitness Testing and Instruction. Human Kinetics.",
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
      }),

  mymca: (system: MeasurementSystem) => (gender: Gender) =>
    z
      .object({
        weight: createWeightSchema(system),
        waistCircumference: createCircumferenceSchema(system, "Waist Circumference"),
        ...(gender === "female" && {
          wristCircumference: createCircumferenceSchema(system, "Wrist Circumference"),
          forearmCircumference: createCircumferenceSchema(system, "Forearm Circumference"),
          hipsCircumference: createCircumferenceSchema(system, "Hips Circumference"),
        }),
      })
      .required()
      .meta({
        name: "Modified YMCA",
        description:
          "An enhanced version of YMCA that adds wrist, hip, and forearm measurements for women",
        premium: false,
        accuracy: {
          min: 4,
          max: 6,
        },
        reference: {
          primary: {
            citation:
              "Golding Lawrence A., Myers Clayton R., Sinning Wayne E. (1999). Y's Way to Physical Fitness: The Complete Guide to Fitness Testing and Instruction. Human Kinetics.",
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
      }),

  navy: (system: MeasurementSystem) => (gender: Gender) => {
    const baseSchema = z
      .object({
        weight: createWeightSchema(system).optional(),
        height: createHeightSchema(system),
        neckCircumference: createCircumferenceSchema(system, "Neck Circumference"),
        waistCircumference: createCircumferenceSchema(system, "Waist Circumference"),
        ...(gender === "female" && {
          hipsCircumference: createCircumferenceSchema(system, "Hips Circumference"),
        }),
      })
      .required()
      .meta({
        name: "U.S. Navy",
        description: "The military's method using height and key body measurements",
        premium: false,
        accuracy: {
          min: 4,
          max: 6,
        },
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
      });

    return baseSchema.refine(
      (data: any) => {
        if (gender === "male") {
          return data.waistCircumference > data.neckCircumference;
        } else {
          return data.waistCircumference + (data.hipsCircumference ?? 0) > data.neckCircumference;
        }
      },
      {
        message:
          gender === "male"
            ? "Waist circumference must be greater than neck circumference"
            : "Sum of waist and hip circumferences must be greater than neck circumference",
      }
    );
  },

  covert: (system: MeasurementSystem) => (gender: Gender) =>
    z
      .object({
        weight: createWeightSchema(system).optional(),
        age: createAgeSchema(),
        wristCircumference: createCircumferenceSchema(system, "Wrist (smallest point)"),
        ...(gender === "male"
          ? {
              forearmCircumference: createCircumferenceSchema(system, "Forearm (widest point)"),
              waistCircumference: createCircumferenceSchema(system, "Waist (at navel)"),
              hipsCircumference: createCircumferenceSchema(system, "Hips (widest point)"),
            }
          : {
              waistCircumference: createCircumferenceSchema(system, "Waist (at navel)"),
              hipsCircumference: createCircumferenceSchema(system, "Hips (widest point)"),
              thighCircumference: createCircumferenceSchema(system, "Thigh (widest point)"),
              calfCircumference: createCircumferenceSchema(system, "Calf (widest point)"),
            }),
      })
      .required()
      .meta({
        name: "Covert Bailey",
        description: "A comprehensive method using age and several body measurements for accuracy",
        premium: true,
        accuracy: {
          min: 4,
          max: 5,
        },
        reference: {
          primary: {
            citation:
              "Bailey, C. (1999). The Ultimate Fit or Fat: Get in Shape and Stay in Shape with America's Best-Loved and Most Effective Fitness Teacher. Houghton Mifflin Harcourt.",
            isbn: "978-0395959411",
            url: "https://books.google.co.uk/books?id=X3qbN6DNb_oC",
            notes: "Updated edition of the 1991 original",
          },
        },
      }),

  jack3: (system: MeasurementSystem) => (gender: Gender) =>
    z
      .object({
        weight: createWeightSchema(system).optional(),
        age: createAgeSchema(),
        ...(gender === "male"
          ? {
              chestSkinfold: createSkinfoldSchema(system, "Chest Skinfold"),
              abdomenSkinfold: createSkinfoldSchema(system, "Abdomen Skinfold"),
              thighSkinfold: createSkinfoldSchema(system, "Thigh Skinfold"),
            }
          : {
              tricepSkinfold: createSkinfoldSchema(system, "Tricep Skinfold"),
              suprailiacSkinfold: createSkinfoldSchema(system, "Suprailiac Skinfold"),
              thighSkinfold: createSkinfoldSchema(system, "Thigh Skinfold"),
            }),
      })
      .required()
      .meta({
        name: "Jackson & Pollock 3-Site",
        description: "A quick but accurate method using age and three key skinfold measurements",
        premium: true,
        accuracy: {
          min: 4,
          max: 5,
        },
        reference: {
          primary: {
            citation:
              gender === "male"
                ? "Jackson, A.S., & Pollock, M.L. (1978). Generalized equations for predicting body density of men. British Journal of Nutrition, 40(3), 497-504."
                : "Jackson, A.S., Pollock, M.L., & Ward, A. (1980). Generalized equations for predicting body density of women. Medicine and Science in Sports and Exercise, 12(3), 175-181.",
            doi: gender === "male" ? "10.1079/BJN19780152" : "10.1249/00005768-198023000-00009",
            notes:
              gender === "male"
                ? "Original 1978 publication, digitized by Cambridge Core in 2007"
                : undefined,
          },
        },
      }),

  jack4: (system: MeasurementSystem) => (_gender: Gender) =>
    z
      .object({
        weight: createWeightSchema(system).optional(),
        age: createAgeSchema(),
        tricepSkinfold: createSkinfoldSchema(system, "Tricep Skinfold"),
        abdomenSkinfold: createSkinfoldSchema(system, "Abdomen Skinfold"),
        suprailiacSkinfold: createSkinfoldSchema(system, "Suprailiac Skinfold"),
        thighSkinfold: createSkinfoldSchema(system, "Thigh Skinfold"),
      })
      .required()
      .meta({
        name: "Jackson & Pollock 4-Site",
        description:
          "A balanced approach using age and skinfold measurements from four strategic sites",
        premium: true,
        accuracy: {
          min: 3.5,
          max: 4.5,
        },
        reference: {
          primary: {
            citation:
              "Jackson, A.S., & Pollock, M.L. (1985). Practical assessment of body composition. The Physician and Sportsmedicine, 13(5), 76-90.",
            doi: "10.1080/00913847.1985.11708790",
            notes: "Original 1985 publication, digitized by Taylor & Francis in 2016",
          },
        },
      }),

  jack7: (system: MeasurementSystem) => (_gender: Gender) =>
    z
      .object({
        weight: createWeightSchema(system).optional(),
        age: createAgeSchema(),
        subscapularSkinfold: createSkinfoldSchema(system, "Subscapular Skinfold"),
        tricepSkinfold: createSkinfoldSchema(system, "Tricep Skinfold"),
        chestSkinfold: createSkinfoldSchema(system, "Chest Skinfold"),
        midaxillarySkinfold: createSkinfoldSchema(system, "Midaxillary Skinfold"),
        suprailiacSkinfold: createSkinfoldSchema(system, "Suprailiac Skinfold"),
        abdomenSkinfold: createSkinfoldSchema(system, "Abdomen Skinfold"),
        thighSkinfold: createSkinfoldSchema(system, "Thigh Skinfold"),
      })
      .required()
      .meta({
        name: "Jackson & Pollock 7-Site",
        description: "The most thorough method using age and seven different skinfold sites",
        premium: true,
        accuracy: {
          min: 3,
          max: 4,
        },
        reference: {
          primary: {
            citation:
              "Jackson, A.S., & Pollock, M.L. (1985). Practical assessment of body composition. The Physician and Sportsmedicine, 13(5), 76-90.",
            doi: "10.1080/00913847.1985.11708790",
            notes: "Original 1985 publication, digitized by Taylor & Francis in 2016",
          },
        },
      }),

  durnin: (system: MeasurementSystem) => (_gender: Gender) =>
    z
      .object({
        weight: createWeightSchema(system).optional(),
        age: createAgeSchema(),
        subscapularSkinfold: createSkinfoldSchema(system, "Subscapular Skinfold"),
        tricepSkinfold: createSkinfoldSchema(system, "Tricep Skinfold"),
        bicepSkinfold: createSkinfoldSchema(system, "Bicep Skinfold"),
        suprailiacSkinfold: createSkinfoldSchema(system, "Suprailiac Skinfold"),
      })
      .required()
      .meta({
        name: "Durnin & Womersley",
        description: "A scientific method using age and skinfold measurements from four body sites",
        premium: true,
        accuracy: {
          min: 3.5,
          max: 5,
        },
        reference: {
          primary: {
            citation:
              "Durnin, J.V.G.A., & Womersley, J. (1974). Body fat assessed from total body density and its estimation from skinfold thickness: measurements on 481 men and women aged from 16 to 72 years. British Journal of Nutrition, 32(1), 77-97.",
            doi: "10.1079/BJN19740060",
            notes: "Original 1974 publication, digitized by Cambridge Core",
          },
        },
      }),

  parillo: (system: MeasurementSystem) => (_gender: Gender) =>
    z
      .object({
        weight: createWeightSchema(system),
        subscapularSkinfold: createSkinfoldSchema(system, "Subscapular Skinfold"),
        tricepSkinfold: createSkinfoldSchema(system, "Tricep Skinfold"),
        bicepSkinfold: createSkinfoldSchema(system, "Bicep Skinfold"),
        chestSkinfold: createSkinfoldSchema(system, "Chest Skinfold"),
        suprailiacSkinfold: createSkinfoldSchema(system, "Suprailiac Skinfold"),
        abdomenSkinfold: createSkinfoldSchema(system, "Abdomen Skinfold"),
        lowerBackSkinfold: createSkinfoldSchema(system, "Lower Back Skinfold"),
        thighSkinfold: createSkinfoldSchema(system, "Thigh Skinfold"),
        calfSkinfold: createSkinfoldSchema(system, "Calf Skinfold"),
      })
      .required()
      .meta({
        name: "Parillo",
        description:
          "A bodybuilding-focused method using weight and nine precise skinfold measurements",
        premium: true,
        accuracy: {
          min: 3,
          max: 4,
        },
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
      }),
};

export type ValidationResult = {
  success: boolean;
  errors: Record<string, string>;
};

export function validateFormula(
  formula: Formula,
  data: unknown,
  system: MeasurementSystem,
  gender: Gender
): ValidationResult {
  try {
    console.log("[Validation] Formula:", formula);
    console.log("[Validation] Available formulas:", Object.keys(formulaSchemas));
    console.log("[Validation] Schema exists:", !!formulaSchemas[formula]);
    console.log("[Validation] Is valid formula:", isValidFormula(formula));

    if (!isValidFormula(formula)) {
      return { success: false, errors: { _: `Invalid formula: ${formula}` } };
    }

    const schemaFn = formulaSchemas[formula];
    if (!schemaFn) {
      return { success: false, errors: { _: `Schema not found for formula: ${formula}` } };
    }

    const schema = schemaFn(system)(gender);
    schema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    console.error("[Validation] Error:", error);
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return {
      success: false,
      errors: { _: error instanceof Error ? error.message : "Unknown validation error" },
    };
  }
}

// Helper to extract UI metadata from schemas
export function getFormulaMetadata(formula: Formula, system: MeasurementSystem, gender: Gender) {
  if (!isValidFormula(formula)) {
    throw new Error(`Invalid formula: ${formula}`);
  }

  const schema = formulaSchemas[formula](system)(gender);
  const baseSchema = "effect" in schema._def ? schema._def.schema : schema;

  // Type assertion to ensure we're working with a ZodObject
  const zodObject = baseSchema as z.ZodObject<any, any, any>;
  const shape = zodObject.shape;

  // Add type safety for metadata
  const formulaMeta = zodObject._def.metadata as FormulaMetadata | undefined;
  if (!formulaMeta) {
    throw new Error(`Missing metadata for formula: ${formula}`);
  }

  const fields = Object.entries(shape).map(([key, field]) => {
    // Add type assertion for ZodType
    const zodField = field as z.ZodType<any> & {
      _def: { metadata?: FieldMetadata; optional?: boolean };
    };
    const meta = zodField._def.metadata;
    if (!meta) {
      throw new Error(`Missing field metadata for ${key} in formula ${formula}`);
    }

    return {
      key,
      ...meta,
      required: !zodField._def.optional,
    };
  });

  return {
    ...formulaMeta,
    fields,
  };
}

// Helper to get all available formulas with their metadata
export function getAllFormulasMetadata(system: MeasurementSystem, gender: Gender) {
  return validFormulas
    .filter(formula => isValidFormula(formula))
    .map(formula => ({
      key: formula,
      ...getFormulaMetadata(formula, system, gender),
    }));
}
