export const convertMeasurement = (
  value: number,
  fromUnit: string,
  toUnit: string,
  measurementType: "circumference" | "skinfold" | "weight" | "height"
): number => {
  if (fromUnit === toUnit) return value;

  switch (measurementType) {
    case "circumference":
    case "height":
      return fromUnit === "cm" ? value * 0.393701 : value * 2.54;
    case "skinfold":
      return fromUnit === "mm" ? value * 0.0393701 : value * 25.4;
    case "weight":
      return fromUnit === "kg" ? value * 2.20462 : value * 0.453592;
    default:
      return value;
  }
};
