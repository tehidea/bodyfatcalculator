import React, { useState, useMemo, useCallback, useRef } from "react";
import { View, Platform, Keyboard, TextInput } from "react-native";
import { Text, Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView, KeyboardToolbar } from "react-native-keyboard-controller";
import Constants from "expo-constants";
import { FormulaSelector } from "../components/calculator/FormulaSelector";
import { GenderSelector } from "../components/calculator/GenderSelector";
import { MeasurementSelector } from "../components/calculator/MeasurementSelector";
import { MeasurementInput } from "../components/calculator/MeasurementInput";
import { ResultsDisplay } from "../components/calculator/ResultsDisplay";
import { useCalculatorStore } from "../store/calculatorStore";
import {
  validateFormula as validateInputs,
  getFormulaMetadata,
  isValidFormula,
  formulaSchemas,
} from "../schemas/calculator";
import Logo from "../images/logo";
import { memo } from "react";
import { calculateResults, getFormula } from "../formulas";
import { styles } from "./CalculatorScreen.styles";
import { usePremiumStore } from "../store/premiumStore";
import { z } from "zod";
import { Gender } from "../types/calculator";

// Extract Header into a separate component
const Header = memo(() => (
  <View style={styles.header}>
    <Logo style={styles.logo} width={62} accessibilityLabel="Calculator logo" />
    <View style={styles.headerTextContainer}>
      <View style={styles.titleContainer}>
        <Text
          style={[styles.headerTitle, { fontFamily: "Montserrat-ExtraLight", fontWeight: 200 }]}
        >
          Body
        </Text>
        <Text style={[styles.headerTitle, { fontFamily: "Montserrat-Light", fontWeight: 300 }]}>
          Fat
        </Text>
      </View>
      <Text style={styles.strapline}>Body Fat Calculator for skinfold calipers</Text>
    </View>
  </View>
));

// Add Version Display component
const VersionDisplay = memo(() => {
  const { pro } = usePremiumStore();
  const version = Constants.expoConfig?.version || "?.?.?";
  const buildNumber =
    Platform.select({
      ios: Constants.expoConfig?.ios?.buildNumber,
      android: Constants.expoConfig?.android?.versionCode?.toString(),
    }) || null;
  return (
    <Text style={styles.versionText}>
      v{version}
      {buildNumber ? ` (${buildNumber})` : ""} {pro ? "PRO" : ""}
    </Text>
  );
});

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

  const scrollViewRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [currentInputIndex, setCurrentInputIndex] = useState<number | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const formulaFields = useMemo(() => {
    if (!isValidFormula(formula)) return [];

    const metadata = getFormulaMetadata(formula, measurementSystem, gender);
    return metadata.fields.map(field => ({
      key: field.key,
      label: field.label,
      unit: field.unit,
      required: field.required,
    }));
  }, [formula, gender, measurementSystem]);

  const handleFocusChange = useCallback((focused: boolean, index: number) => {
    setIsFocused(focused);
    if (focused) {
      setCurrentInputIndex(index);
    }
  }, []);

  const getFieldError = (fieldKey: string): string | undefined => {
    return fieldErrors[fieldKey];
  };

  const handleCalculate = useCallback(async () => {
    Keyboard.dismiss();
    setError(null);

    try {
      const validation = validateInputs(formula, inputs, measurementSystem, gender);
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
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.innerContainer}>
        <Header />
        <View style={styles.content}>
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            bottomOffset={60}
          >
            <View style={styles.selectors}>
              <FormulaSelector />
              <View style={styles.selectorRow}>
                <GenderSelector />
                <MeasurementSelector />
              </View>
            </View>
            {formulaFields.map((field, index) => (
              <MeasurementInput
                key={field.key}
                field={field.key}
                label={field.label}
                unit={field.unit || ""}
                error={getFieldError(field.key) ?? ""}
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                onFocusChange={focused => handleFocusChange(focused, index)}
                isLastInput={index === formulaFields.length - 1}
              />
            ))}
            <View style={styles.buttonRow}>
              <Button
                title={buttonTitle}
                onPress={handleCalculate}
                loading={isCalculating}
                disabled={isCalculating}
                buttonStyle={styles.primaryButton}
                containerStyle={styles.buttonWrapperFlex}
                titleStyle={styles.primaryButtonText}
                testID="calculate-button"
              />
              <Button
                title="Reset"
                type="outline"
                onPress={handleReset}
                disabled={isCalculating}
                titleStyle={styles.resetButtonText}
                containerStyle={styles.buttonWrapperFlex}
                buttonStyle={styles.resetButton}
                testID="reset-button"
              />
            </View>
            {globalError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{globalError}</Text>
              </View>
            )}
            <ResultsDisplay scrollViewRef={scrollViewRef} />
            <VersionDisplay />
          </KeyboardAwareScrollView>
        </View>
      </View>
      <KeyboardToolbar />
    </SafeAreaView>
  );
};
