import { calculateBodyFat, getClassification, validateBodyFat } from "../../formulas/utils";

describe("calculateBodyFat", () => {
  it("should correctly calculate fat mass and lean mass", () => {
    const result = calculateBodyFat(20, 80); // 20% body fat, 80kg weight
    expect(result.fatMass).toBeCloseTo(16); // 20% of 80kg
    expect(result.leanMass).toBeCloseTo(64); // 80kg - 16kg
  });

  it("should handle zero weight", () => {
    const result = calculateBodyFat(20, 0);
    expect(result.fatMass).toBe(0);
    expect(result.leanMass).toBe(0);
  });

  it("should handle zero body fat percentage", () => {
    const result = calculateBodyFat(0, 80);
    expect(result.fatMass).toBe(0);
    expect(result.leanMass).toBe(80);
  });
});

describe("getClassification", () => {
  describe("male classifications", () => {
    it("should classify essential fat correctly", () => {
      expect(getClassification(2, "male")).toBe("Essential fat (2-5%)");
      expect(getClassification(5, "male")).toBe("Essential fat (2-5%)");
    });

    it("should classify athletic correctly", () => {
      expect(getClassification(6, "male")).toBe("Athletic (6-13%)");
      expect(getClassification(13, "male")).toBe("Athletic (6-13%)");
    });

    it("should classify fitness correctly", () => {
      expect(getClassification(14, "male")).toBe("Fitness (14-17%)");
      expect(getClassification(17, "male")).toBe("Fitness (14-17%)");
    });

    it("should classify acceptable correctly", () => {
      expect(getClassification(18, "male")).toBe("Acceptable (18-25%)");
      expect(getClassification(25, "male")).toBe("Acceptable (18-25%)");
    });

    it("should classify obese correctly", () => {
      expect(getClassification(26, "male")).toBe("Obese (> 25%)");
    });
  });

  describe("female classifications", () => {
    it("should classify essential fat correctly", () => {
      expect(getClassification(10, "female")).toBe("Essential fat (10-13%)");
      expect(getClassification(13, "female")).toBe("Essential fat (10-13%)");
    });

    it("should classify athletic correctly", () => {
      expect(getClassification(14, "female")).toBe("Athletic (14-20%)");
      expect(getClassification(20, "female")).toBe("Athletic (14-20%)");
    });

    it("should classify fitness correctly", () => {
      expect(getClassification(21, "female")).toBe("Fitness (21-24%)");
      expect(getClassification(24, "female")).toBe("Fitness (21-24%)");
    });

    it("should classify acceptable correctly", () => {
      expect(getClassification(25, "female")).toBe("Acceptable (25-31%)");
      expect(getClassification(31, "female")).toBe("Acceptable (25-31%)");
    });

    it("should classify obese correctly", () => {
      expect(getClassification(32, "female")).toBe("Obese (> 31%)");
    });
  });

  it("should return unknown for values below range", () => {
    expect(getClassification(1, "male")).toBe("Unknown");
    expect(getClassification(9, "female")).toBe("Unknown");
  });
});

describe("validateBodyFat", () => {
  it("should validate correct body fat percentages", () => {
    expect(validateBodyFat(15)).toEqual({ isValid: true });
    expect(validateBodyFat(30)).toEqual({ isValid: true });
  });

  it("should reject negative values", () => {
    expect(validateBodyFat(-1)).toEqual({
      isValid: false,
      message: "Please check your measurements. Body fat percentage cannot be negative.",
    });
  });

  it("should reject values over 100", () => {
    expect(validateBodyFat(101)).toEqual({
      isValid: false,
      message: "Please check your measurements. Body fat percentage cannot exceed 100%.",
    });
  });

  it("should reject Infinity", () => {
    expect(validateBodyFat(Infinity)).toEqual({
      isValid: false,
      message: "Please check your measurements. The calculation resulted in an invalid value.",
    });
  });

  it("should reject NaN", () => {
    expect(validateBodyFat(NaN)).toEqual({
      isValid: false,
      message: "Please check your measurements. The calculation resulted in an invalid value.",
    });
  });
});
