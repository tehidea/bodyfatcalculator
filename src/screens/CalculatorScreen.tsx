import React, { useState, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormulaSelector } from "../components/Calculator/FormulaSelector";
import { GenderSelector } from "../components/Calculator/GenderSelector";
import { MeasurementSelector } from "../components/Calculator/MeasurementSelector";
import { MeasurementInput } from "../components/Calculator/MeasurementInput";
import { ResultsDisplay } from "../components/Calculator/ResultsDisplay";
import { useCalculatorStore } from "../store/calculatorStore";
import { calculateBodyFat, getClassification } from "../utils/calculations";
import { validateInputs, ValidationError } from "../utils/validation";
import { FORMULA_REQUIREMENTS } from "../constants/formulas";
import { COLORS } from "../constants/theme";
import Logo from "../images/logo";

export const CalculatorScreen = () => {
  const {
    formula,
    gender,
    inputs,
    error: globalError,
    isCalculating,
    isResultsStale,
    results,
    setResults,
    setError,
    reset,
    measurementSystem,
  } = useCalculatorStore();

  // Local state for field-specific errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formulaFields = FORMULA_REQUIREMENTS[formula].fields;

  // Helper function to get field-specific error
  const getFieldError = (fieldKey: string): string | undefined => {
    return fieldErrors[fieldKey];
  };

  // Validate fields before calculation
  const handleCalculate = async () => {
    // Clear previous errors
    setFieldErrors({});
    setError(null);

    try {
      // Validate inputs
      const validationErrors = validateInputs(formula, inputs);

      if (validationErrors.length > 0) {
        // Convert validation errors to field errors
        const newErrors: Record<string, string> = {};
        validationErrors.forEach((error: ValidationError) => {
          newErrors[error.field] = error.message;
        });
        setFieldErrors(newErrors);
        return;
      }

      // Calculate results
      const bodyFat = calculateBodyFat(formula, gender, inputs, measurementSystem);
      const classification = getClassification(bodyFat, gender);
      const fatMass = (inputs.weight || 0) * (bodyFat / 100);
      const leanMass = (inputs.weight || 0) - fatMass;

      setResults({
        bodyFatPercentage: bodyFat,
        fatMass,
        leanMass,
        classification,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  const handleReset = () => {
    setFieldErrors({});
    setError(null);
    reset();
  };

  const buttonTitle = useMemo(() => {
    if (isCalculating) return "Calculating...";
    if (results && isResultsStale) return "Recalculate";
    return "Calculate";
  }, [isCalculating, results, isResultsStale]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Logo style={styles.logo} />
        <View style={styles.headerTextContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.headerTitle, { fontFamily: "Montserrat-ExtraLight" }]}>Body</Text>
            <Text style={[styles.headerTitle, { fontFamily: "Montserrat-Light" }]}>Fat</Text>
          </View>
          <Text style={styles.strapline}>Body fat Calculator for skinfold calipers</Text>
        </View>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.selectors}>
            <FormulaSelector />
            <View style={styles.selectorRow}>
              <GenderSelector />
              <MeasurementSelector />
            </View>
          </View>

          {formulaFields.map(field => (
            <MeasurementInput
              key={field.key}
              field={field}
              error={getFieldError(field.key) ?? ""}
            />
          ))}

          <View style={styles.buttonRow}>
            <Button
              title={buttonTitle}
              onPress={handleCalculate}
              disabled={isCalculating}
              loading={isCalculating}
              buttonStyle={styles.primaryButton}
              disabledStyle={styles.disabledButton}
              containerStyle={styles.buttonWrapperFlex}
              titleStyle={styles.buttonTitle}
            />
            <Button
              title="Reset"
              onPress={handleReset}
              disabled={isCalculating}
              type="outline"
              buttonStyle={styles.button}
              titleStyle={styles.outlineButtonTitle}
              containerStyle={styles.buttonWrapperFlex}
            />
          </View>

          {globalError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{globalError}</Text>
            </View>
          )}

          <ResultsDisplay />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  headerTextContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 42,
    color: COLORS.black,
    textTransform: "uppercase",
    marginTop: -6,
  },
  strapline: {
    fontSize: 10,
    color: COLORS.black,
    marginTop: -6,
    marginLeft: 4,
    fontFamily: "Montserrat-Light",
    textTransform: "uppercase",
  },
  logo: {
    width: 60,
    aspectRatio: 1,
    marginRight: 8,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
  },
  selectors: {
    marginBottom: 24,
  },
  description: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  resetButton: {
    marginTop: 12,
  },
  content: {
    flex: 1,
  },
  selectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  halfWidth: {
    flex: 1,
  },
  buttonWrapper: {
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonWrapperFlex: {
    borderRadius: 10,
    overflow: "hidden",
    flex: 1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  disabledButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: COLORS.primary + "80",
  },
  buttonTitle: {
    fontWeight: "bold",
  },
  outlineButtonTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#c62828",
    fontSize: 14,
  },
});
