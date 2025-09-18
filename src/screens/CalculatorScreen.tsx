import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { View, Platform, Keyboard, TextInput, TouchableOpacity, Linking } from "react-native";

import { useResponsive } from "../utils/responsiveContext";
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
} from "../schemas/calculator";
import Logo from "../images/logo";
import { memo } from "react";
import { calculateResults } from "../formulas";
import { createStyles } from "./CalculatorScreen.styles";
import { usePremiumStore } from "../store/premiumStore";
import { COLORS } from "../constants/theme";
import { usePostHog } from "posthog-react-native";

// Extract Header into a separate component
const Header = memo(() => {
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight, deviceType } =
    useResponsive();
  const styles = createStyles(
    getResponsiveSpacing,
    getResponsiveTypography,
    getLineHeight,
    deviceType
  );

  return (
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
  );
});

// Add References Display component
const ReferencesDisplay = memo(() => {
  const { formula, gender, measurementSystem } = useCalculatorStore();
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight, deviceType } =
    useResponsive();
  const styles = createStyles(
    getResponsiveSpacing,
    getResponsiveTypography,
    getLineHeight,
    deviceType
  );

  if (!isValidFormula(formula)) return null;

  const metadata = getFormulaMetadata(formula, measurementSystem, gender);
  const { primary, validations } = metadata.reference;

  if (!primary) return null;

  const handleDoiPress = (doi: string) => {
    Linking.openURL(`https://doi.org/${doi}`);
  };

  return (
    <View style={styles.referencesContainer}>
      <Text style={styles.referenceCitation}>{primary.citation}</Text>
      {/* {primary.doi && (
        <TouchableOpacity onPress={() => handleDoiPress(primary.doi!)}>
          <Text style={styles.referenceDoi}>DOI: {primary.doi}</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
});

// Add Version Display component
const VersionDisplay = memo(() => {
  const { pro } = usePremiumStore();
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight, deviceType } =
    useResponsive();
  const styles = createStyles(
    getResponsiveSpacing,
    getResponsiveTypography,
    getLineHeight,
    deviceType
  );

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
  const posthog = usePostHog();
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

  const prevMeasurementSystemRef = useRef(measurementSystem);

  useEffect(() => {
    if (posthog && prevMeasurementSystemRef.current !== measurementSystem) {
      posthog.capture("unit_system_changed", {
        unit_system: measurementSystem,
      });
    }
    prevMeasurementSystemRef.current = measurementSystem;
  }, [measurementSystem, posthog]);

  // Get responsive values for styles
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight, deviceType } =
    useResponsive();
  const styles = createStyles(
    getResponsiveSpacing,
    getResponsiveTypography,
    getLineHeight,
    deviceType
  );

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

      if (posthog) {
        posthog.capture("calculator_form_submitted", {
          formula_selected: formula,
          gender_selected: gender,
          measurement_system: measurementSystem,
        });
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
  }, [formula, gender, inputs, measurementSystem, posthog]);

  const handleReset = useCallback(() => {
    setError(null);
    reset();
    if (posthog) {
      posthog.capture("reset_form_tapped");
    }
  }, [reset, posthog]);

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
            <ReferencesDisplay />
            <VersionDisplay />
          </KeyboardAwareScrollView>
        </View>
      </View>
      <KeyboardToolbar />
    </SafeAreaView>
  );
};
