export const isCircumferenceMeasurement = (key: keyof CalculatorInputs): boolean => {
  return key.toLowerCase().includes("circumference");
};

export const isSkinfoldMeasurement = (key: keyof CalculatorInputs): boolean => {
  return key.toLowerCase().includes("skinfold");
};

export const getDefaultUnit = (key: keyof CalculatorInputs): string => {
  if (isCircumferenceMeasurement(key)) return "cm";
  if (isSkinfoldMeasurement(key)) return "mm";
  if (key === "weight") return "kg";
  if (key === "age") return "years";
  return "";
};
