import { z } from "zod";

export const calculatorInputSchema = z.object({
  weight: z.number().min(20).max(300).optional(),

  // Circumference measurements (cm)
  waistCircumference: z.number().min(0).max(200).optional(),
  hipsCircumference: z.number().min(0).max(200).optional(),
  neckCircumference: z.number().min(0).max(100).optional(),
  chestCircumference: z.number().min(0).max(200).optional(),
  abdomenCircumference: z.number().min(0).max(200).optional(),
  thighCircumference: z.number().min(0).max(100).optional(),
  calfCircumference: z.number().min(0).max(100).optional(),
  bicepCircumference: z.number().min(0).max(100).optional(),
  tricepCircumference: z.number().min(0).max(100).optional(),
  forearmCircumference: z.number().min(0).max(100).optional(),
  wristCircumference: z.number().min(0).max(50).optional(),

  // Skinfold measurements (mm)
  chestSkinfold: z.number().min(0).max(100).optional(),
  abdomenSkinfold: z.number().min(0).max(100).optional(),
  thighSkinfold: z.number().min(0).max(100).optional(),
  tricepSkinfold: z.number().min(0).max(100).optional(),
  bicepSkinfold: z.number().min(0).max(100).optional(),
  subscapularSkinfold: z.number().min(0).max(100).optional(),
  suprailiacSkinfold: z.number().min(0).max(100).optional(),
  midaxillarySkinfold: z.number().min(0).max(100).optional(),
  lowerBackSkinfold: z.number().min(0).max(100).optional(),
  calfSkinfold: z.number().min(0).max(100).optional(),
});
