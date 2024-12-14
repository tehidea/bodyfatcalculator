import { ymcaFormula } from "../ymca";
import { mymcaFormula } from "../mymca";
import { navyFormula } from "../navy";
import { covertFormula } from "../covert";
import { durninFormula } from "../durnin";
import { jackson7Formula } from "../jackson7";
import { jackson4Formula } from "../jackson4";
import { jackson3Formula } from "../jackson3";
import { parilloFormula } from "../parillo";
import { StandardizedInputs } from "../../types/formula";

describe("Body Fat Formula Implementations", () => {
  describe("YMCA Formula", () => {
    it("calculates male body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        weight: 80, // kg
        waist: 85, // cm
      };

      const result = ymcaFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });

    it("calculates female body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "female",
        weight: 60, // kg
        waist: 70, // cm
      };

      const result = ymcaFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });
  });

  describe("Modified YMCA Formula", () => {
    it("calculates male body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        weight: 80, // kg
        waist: 85, // cm
        wrist: 17, // cm
        forearm: 30, // cm
        hips: 95, // cm
      };

      const result = mymcaFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });

    it("calculates female body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "female",
        weight: 60, // kg
        waist: 70, // cm
        wrist: 15, // cm
        forearm: 25, // cm
        hips: 90, // cm
      };

      const result = mymcaFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });
  });

  describe("Navy Formula", () => {
    it("calculates male body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        weight: 80, // kg
        height: 180, // cm
        neck: 38, // cm
        waist: 85, // cm
        hips: 95, // cm
      };

      const result = navyFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });

    it("calculates female body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "female",
        weight: 60, // kg
        height: 165, // cm
        neck: 32, // cm
        waist: 70, // cm
        hips: 90, // cm
      };

      const result = navyFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });
  });

  describe("Covert Formula", () => {
    it("calculates male body fat percentage correctly for age <= 30", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        age: 25,
        weight: 80, // kg
        waist: 85, // cm
        hips: 95, // cm
        forearm: 30, // cm
        wrist: 17, // cm
        thigh: 55, // cm
        calf: 38, // cm
      };

      const result = covertFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });

    it("calculates male body fat percentage correctly for age > 30", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        age: 35,
        weight: 80, // kg
        waist: 85, // cm
        hips: 95, // cm
        forearm: 30, // cm
        wrist: 17, // cm
        thigh: 55, // cm
        calf: 38, // cm
      };

      const result = covertFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });

    it("calculates female body fat percentage correctly for age <= 30", () => {
      const inputs: StandardizedInputs = {
        gender: "female",
        age: 25,
        weight: 60, // kg
        waist: 70, // cm
        hips: 90, // cm
        forearm: 25, // cm
        wrist: 15, // cm
        thigh: 50, // cm
        calf: 35, // cm
      };

      const result = covertFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });

    it("calculates female body fat percentage correctly for age > 30", () => {
      const inputs: StandardizedInputs = {
        gender: "female",
        age: 35,
        weight: 60, // kg
        waist: 70, // cm
        hips: 90, // cm
        forearm: 25, // cm
        wrist: 15, // cm
        thigh: 50, // cm
        calf: 35, // cm
      };

      const result = covertFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });
  });

  describe("Durnin Formula", () => {
    it("calculates male body fat percentage correctly for different age groups", () => {
      const baseInputs: StandardizedInputs = {
        gender: "male",
        weight: 80, // kg
        bicepSkinfold: 10, // mm
        tricepSkinfold: 15, // mm
        subscapularSkinfold: 20, // mm
        suprailiacSkinfold: 25, // mm
      };

      // Test different age groups
      const ages = [16, 18, 25, 35, 45, 55];
      ages.forEach(age => {
        const inputs = { ...baseInputs, age };
        const result = durninFormula.calculate(inputs);
        expect(result.bodyFatPercentage).toBeGreaterThan(0);
        expect(result.bodyFatPercentage).toBeLessThan(100);
        expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
        expect(result.leanMass).toBe(inputs.weight - result.fatMass);
      });
    });

    it("calculates female body fat percentage correctly for different age groups", () => {
      const baseInputs: StandardizedInputs = {
        gender: "female",
        weight: 60, // kg
        bicepSkinfold: 15, // mm
        tricepSkinfold: 20, // mm
        subscapularSkinfold: 25, // mm
        suprailiacSkinfold: 30, // mm
      };

      // Test different age groups
      const ages = [16, 18, 25, 35, 45, 55];
      ages.forEach(age => {
        const inputs = { ...baseInputs, age };
        const result = durninFormula.calculate(inputs);
        expect(result.bodyFatPercentage).toBeGreaterThan(0);
        expect(result.bodyFatPercentage).toBeLessThan(100);
        expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
        expect(result.leanMass).toBe(inputs.weight - result.fatMass);
      });
    });
  });

  describe("Jackson-Pollock 7-Site Formula", () => {
    it("calculates male body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        age: 30,
        weight: 80, // kg
        chestSkinfold: 10, // mm
        abdomenSkinfold: 20, // mm
        thighSkinfold: 15, // mm
        tricepSkinfold: 10, // mm
        subscapularSkinfold: 15, // mm
        suprailiacSkinfold: 20, // mm
        midaxillarySkinfold: 12, // mm
      };

      const result = jackson7Formula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });

    it("calculates female body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "female",
        age: 30,
        weight: 60, // kg
        chestSkinfold: 15, // mm
        abdomenSkinfold: 25, // mm
        thighSkinfold: 30, // mm
        tricepSkinfold: 20, // mm
        subscapularSkinfold: 20, // mm
        suprailiacSkinfold: 25, // mm
        midaxillarySkinfold: 15, // mm
      };

      const result = jackson7Formula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });
  });

  describe("Jackson-Pollock 4-Site Formula", () => {
    it("calculates male body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        age: 30,
        weight: 80, // kg
        abdomenSkinfold: 20, // mm
        thighSkinfold: 15, // mm
        tricepSkinfold: 10, // mm
        suprailiacSkinfold: 20, // mm
      };

      const result = jackson4Formula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });

    it("calculates female body fat percentage correctly", () => {
      const inputs: StandardizedInputs = {
        gender: "female",
        age: 30,
        weight: 60, // kg
        abdomenSkinfold: 25, // mm
        thighSkinfold: 30, // mm
        tricepSkinfold: 20, // mm
        suprailiacSkinfold: 25, // mm
      };

      const result = jackson4Formula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });
  });

  describe("Jackson-Pollock 3-Site Formula", () => {
    it("calculates male body fat percentage correctly using male-specific sites", () => {
      const inputs: StandardizedInputs = {
        gender: "male",
        age: 30,
        weight: 80, // kg
        chestSkinfold: 10, // mm
        abdomenSkinfold: 20, // mm
        thighSkinfold: 15, // mm
        tricepSkinfold: 10, // mm
        suprailiacSkinfold: 20, // mm
      };

      const result = jackson3Formula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });

    it("calculates female body fat percentage correctly using female-specific sites", () => {
      const inputs: StandardizedInputs = {
        gender: "female",
        age: 30,
        weight: 60, // kg
        chestSkinfold: 15, // mm
        abdomenSkinfold: 25, // mm
        thighSkinfold: 30, // mm
        tricepSkinfold: 20, // mm
        suprailiacSkinfold: 25, // mm
      };

      const result = jackson3Formula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });
  });

  describe("Parillo Formula", () => {
    it("calculates body fat percentage correctly regardless of gender", () => {
      const inputs: StandardizedInputs = {
        weight: 80, // kg
        chestSkinfold: 10, // mm
        abdomenSkinfold: 20, // mm
        thighSkinfold: 15, // mm
        bicepSkinfold: 8, // mm
        tricepSkinfold: 10, // mm
        subscapularSkinfold: 15, // mm
        suprailiacSkinfold: 20, // mm
        lowerBackSkinfold: 18, // mm
        calfSkinfold: 12, // mm
      };

      const result = parilloFormula.calculate(inputs);
      expect(result.bodyFatPercentage).toBeGreaterThan(0);
      expect(result.bodyFatPercentage).toBeLessThan(100);
      expect(result.fatMass).toBe((result.bodyFatPercentage / 100) * inputs.weight);
      expect(result.leanMass).toBe(inputs.weight - result.fatMass);
    });
  });

  describe("Formula Registry", () => {
    it("provides correct required fields for each formula", () => {
      const formulas = [
        ymcaFormula,
        mymcaFormula,
        navyFormula,
        covertFormula,
        durninFormula,
        jackson7Formula,
        jackson4Formula,
        jackson3Formula,
        parilloFormula,
      ];

      formulas.forEach(formula => {
        expect(formula.requiredFields).toBeDefined();
        expect(formula.requiredFields.length).toBeGreaterThan(0);
      });
    });

    it("provides age restrictions where applicable", () => {
      const formulasWithAgeRestrictions = [
        covertFormula,
        durninFormula,
        jackson7Formula,
        jackson4Formula,
        jackson3Formula,
      ];

      formulasWithAgeRestrictions.forEach(formula => {
        expect(formula.minimumAge || formula.maximumAge).toBeDefined();
      });
    });

    it("provides scientific references for each formula", () => {
      const formulas = [
        ymcaFormula,
        mymcaFormula,
        navyFormula,
        covertFormula,
        durninFormula,
        jackson7Formula,
        jackson4Formula,
        jackson3Formula,
        parilloFormula,
      ];

      formulas.forEach(formula => {
        expect(formula.references).toBeDefined();
        expect(formula.references?.length).toBeGreaterThan(0);
      });
    });
  });
});
