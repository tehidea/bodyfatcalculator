import { ymcaFormula } from "../ymca";
import { mymcaFormula } from "../mymca";
import { navyFormula } from "../navy";
import { covertFormula } from "../covert";
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
});
