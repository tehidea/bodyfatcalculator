import { z } from "zod";
import { Gender, Formula, MeasurementSystem } from "../types/calculator";

// Unit-specific schema factories
function createWeightSchema(system: MeasurementSystem) {
  return z
    .number()
    .min(system === "metric" ? 20 : 44, `Weight must be at least ${system === "metric" ? "20 kg" : "44 lbs"}`)
    .max(system === "metric" ? 300 : 661, `Weight cannot exceed ${system === "metric" ? "300 kg" : "661 lbs"}`)
    .nullable();
}

function createHeightSchema(system: MeasurementSystem) {
  return z
    .number()
    .min(system === "metric" ? 100 : 39.4, `Height must be at least ${system === "metric" ? "100 cm" : "39.4 in"}`)
    .max(system === "metric" ? 250 : 98.4, `Height cannot exceed ${system === "metric" ? "250 cm" : "98.4 in"}`)
    .nullable();
}

function createCircumferenceSchema(system: MeasurementSystem) {
  return z
    .number()
    .min(system === "metric" ? 1 : 0.4, `Circumference must be at least ${system === "metric" ? "1 cm" : "0.4 in"}`)
    .max(system === "metric" ? 200 : 78.7, `Circumference cannot exceed ${system === "metric" ? "200 cm" : "78.7 in"}`)
    .nullable();
}

function createSkinfoldSchema(system: MeasurementSystem) {
  return z
    .number()
    .min(system === "metric" ? 1 : 0.04, `Skinfold must be at least ${system === "metric" ? "1 mm" : "0.04 in"}`)
    .max(system === "metric" ? 100 : 3.94, `Skinfold cannot exceed ${system === "metric" ? "100 mm" : "3.94 in"}`)
    .nullable();
}

function createWristSchema(system: MeasurementSystem) {
  return createCircumferenceSchema(system).refine(
    val => !val || (system === "metric" ? val <= 50 : val <= 19.7),
    `Wrist circumference cannot exceed ${system === "metric" ? "50 cm" : "19.7 in"}`
  );
}

// Main calculator input schema factory
function createCalculatorInputSchema(system: MeasurementSystem) {
  return z.object({
    // Basic measurements
    weight: createWeightSchema(system),
    height: createHeightSchema(system),
    age: z.number().min(0).max(120).nullable(),

    // Circumferences
    neckCircumference: createCircumferenceSchema(system),
    waistCircumference: createCircumferenceSchema(system),
    hipsCircumference: createCircumferenceSchema(system),
    chestCircumference: createCircumferenceSchema(system),
    abdomenCircumference: createCircumferenceSchema(system),
    thighCircumference: createCircumferenceSchema(system),
    calfCircumference: createCircumferenceSchema(system),
    bicepCircumference: createCircumferenceSchema(system),
    tricepCircumference: createCircumferenceSchema(system),
    forearmCircumference: createCircumferenceSchema(system),
    wristCircumference: createWristSchema(system),

    // Skinfolds
    chestSkinfold: createSkinfoldSchema(system),
    abdomenSkinfold: createSkinfoldSchema(system),
    thighSkinfold: createSkinfoldSchema(system),
    tricepSkinfold: createSkinfoldSchema(system),
    bicepSkinfold: createSkinfoldSchema(system),
    subscapularSkinfold: createSkinfoldSchema(system),
    suprailiacSkinfold: createSkinfoldSchema(system),
    midaxillarySkinfold: createSkinfoldSchema(system),
    lowerBackSkinfold: createSkinfoldSchema(system),
    calfSkinfold: createSkinfoldSchema(system),
  });
}

type SchemaDefinition = (system: MeasurementSystem) => z.ZodObject<any> | ((gender: Gender) => z.ZodObject<any>);

// Formula-specific validation schema factories
export const formulaSchemas: Record<Formula, SchemaDefinition> = {
  ymca: (system: MeasurementSystem) =>
    createCalculatorInputSchema(system)
      .pick({
        weight: true,
        waistCircumference: true,
      })
      .required(),

  mymca: (system: MeasurementSystem) => (gender: Gender) =>
    createCalculatorInputSchema(system)
      .pick({
        weight: true,
        waistCircumference: true,
        ...(gender === "female" && {
          wristCircumference: true,
          hipsCircumference: true,
          forearmCircumference: true,
        }),
      })
      .required(),

  covert: (system: MeasurementSystem) => (gender: Gender) =>
    createCalculatorInputSchema(system)
      .pick({
        age: true,
        hipsCircumference: true,
        wristCircumference: true,
        ...(gender === "male"
          ? {
              waistCircumference: true,
              forearmCircumference: true,
            }
          : {
              thighCircumference: true,
              calfCircumference: true,
            }),
      })
      .required(),
};

export type ValidationResult = {
  success: boolean;
  errors: Record<string, string>;
};
