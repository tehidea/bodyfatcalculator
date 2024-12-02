import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { ScrollView, View, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Text, Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { FormulaSelector } from "../components/calculator/FormulaSelector";
import { GenderSelector } from "../components/calculator/GenderSelector";
import { MeasurementSelector } from "../components/calculator/MeasurementSelector";
import { MeasurementInput } from "../components/calculator/MeasurementInput";
import { ResultsDisplay } from "../components/calculator/ResultsDisplay";
import { useCalculatorStore } from "../store/calculatorStore";
import { validateInputs } from "../utils/validation";
import { FORMULA_REQUIREMENTS } from "../constants/formulas";
import Logo from "../images/logo";
import { memo } from "react";
import { calculateResults } from "../utils/calculations";
import { styles } from "./CalculatorScreen.styles";
import { CalculatorInputs } from "../types/calculator";
import { InputRef } from "../components/common/Input";
import { getUnitLabel } from "../constants/formulas";

// Extract Header into a separate component
const Header = memo(() => (
  <View style={styles.header}>
    <Logo style={styles.logo} width={80} accessibilityLabel="Calculator logo" />
    <View style={styles.headerTextContainer}>
      <View style={styles.titleContainer}>
        <Text style={[styles.headerTitle, { fontFamily: "Montserrat-ExtraLight" }]}>Body</Text>
        <Text style={[styles.headerTitle, { fontFamily: "Montserrat-Light" }]}>Fat</Text>
      </View>
      <Text style={styles.strapline}>Body Fat Calculator for skinfold calipers</Text>
    </View>
  </View>
));

// Add Version Display component
const VersionDisplay = memo(() => {
  const version = Constants.expoConfig?.version || "?.?.?";
  const buildNumber =
    Platform.select({
      ios: Constants.expoConfig?.ios?.buildNumber,
      android: Constants.expoConfig?.android?.versionCode?.toString(),
    }) || null;
  return (
    <Text style={styles.versionText}>
      v{version}
      {buildNumber ? ` (${buildNumber})` : ""}
    </Text>
  );
});

// Add proper types for the CalculatorForm props
interface CalculatorFormProps {
  formulaFields: Array<{
    key: keyof CalculatorInputs;
    label: string;
    unit: string;
    genderSpecific?: string;
  }>;
  getFieldError: (fieldKey: string) => string | undefined;
  handleCalculate: () => Promise<void>;
  handleReset: () => void;
  buttonTitle: string;
  isCalculating: boolean;
  globalError?: string | null;
  scrollViewRef: React.RefObject<ScrollView>;
}

// Extract form section into a separate component
const CalculatorForm = memo(
  ({
    formulaFields,
    getFieldError,
    handleCalculate,
    handleReset,
    buttonTitle,
    isCalculating,
    globalError,
    scrollViewRef,
  }: CalculatorFormProps) => {
    const gender = useCalculatorStore(state => state.gender);
    const measurementSystem = useCalculatorStore(state => state.measurementSystem);
    const inputRefs = useRef<(InputRef | null)[]>([]);

    // Clear input refs when formula changes
    useEffect(() => {
      inputRefs.current = [];
    }, [formulaFields]);

    const visibleFields = useMemo(
      () => formulaFields.filter(field => !field.genderSpecific || field.genderSpecific === gender),
      [formulaFields, gender]
    );

    const fieldsWithConvertedUnits = useMemo(
      () =>
        visibleFields.map(field => ({
          ...field,
          unit: getUnitLabel(field.unit, measurementSystem),
        })),
      [visibleFields, measurementSystem]
    );

    const handleInputSubmit = useCallback(
      (currentIndex: number) => {
        if (currentIndex < fieldsWithConvertedUnits.length - 1) {
          const nextRef = inputRefs.current[currentIndex + 1];
          if (nextRef) {
            nextRef.focus();
          }
        } else {
          Keyboard.dismiss();
        }
      },
      [fieldsWithConvertedUnits.length]
    );

    return (
      <View style={styles.content}>
        <View style={styles.selectors}>
          <FormulaSelector />
          <View style={styles.selectorRow}>
            <GenderSelector />
            <MeasurementSelector />
          </View>
        </View>

        {fieldsWithConvertedUnits.map((field, index) => (
          <MeasurementInput
            key={field.key}
            field={field}
            error={getFieldError(field.key) ?? ""}
            ref={ref => {
              inputRefs.current[index] = ref;
            }}
            returnKeyType={index === fieldsWithConvertedUnits.length - 1 ? "done" : "next"}
            onSubmitEditing={() => handleInputSubmit(index)}
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
            testID="calculate-button"
          />
          <Button
            title="Reset"
            onPress={handleReset}
            disabled={isCalculating}
            buttonStyle={styles.resetButton}
            titleStyle={styles.resetButtonText}
            containerStyle={styles.buttonWrapperFlex}
            testID="reset-button"
          />
        </View>

        {globalError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{globalError}</Text>
          </View>
        )}

        <ResultsDisplay scrollViewRef={scrollViewRef} />
      </View>
    );
  }
);

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
    fieldErrors,
  } = useCalculatorStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const formulaFields = FORMULA_REQUIREMENTS[formula].fields;

  // Helper function to get field-specific error
  const getFieldError = (fieldKey: string): string | undefined => {
    return fieldErrors[fieldKey];
  };

  // Memoize callbacks
  const handleCalculate = useCallback(async () => {
    Keyboard.dismiss();
    setError(null);

    try {
      const validation = validateInputs(formula, inputs, gender, measurementSystem);
      if (!validation.success) {
        setError("Please correct the input errors", validation.errors);
        return;
      }

      const results = await calculateResults(formula, gender, inputs, measurementSystem);
      setResults(results);

      // Scroll to show results if needed
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  }, [formula, gender, inputs, measurementSystem]);

  const handleReset = useCallback(() => {
    setError(null);
    reset();
  }, [reset]);

  const buttonTitle = useMemo(() => {
    if (isCalculating) return "Calculating...";
    if (results && isResultsStale) return "Recalculate";
    return "Calculate";
  }, [isCalculating, results, isResultsStale]);

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} edges={["top"]}>
        <Header />
      </SafeAreaView>
      <SafeAreaView style={styles.safeAreaBottom} edges={["bottom"]}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
          enabled={Platform.OS === "ios"}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
            accessibilityLabel="Calculator form"
            showsVerticalScrollIndicator={false}
          >
            <CalculatorForm
              formulaFields={formulaFields}
              getFieldError={getFieldError}
              handleCalculate={handleCalculate}
              handleReset={handleReset}
              buttonTitle={buttonTitle}
              isCalculating={isCalculating}
              globalError={globalError}
              scrollViewRef={scrollViewRef}
            />
            <VersionDisplay />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
