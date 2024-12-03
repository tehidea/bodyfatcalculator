import React, { useState, useMemo, useCallback, useRef } from "react";
import { View, Platform, Keyboard, TextInput, ScrollView } from "react-native";
import { Text, Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
  KeyboardToolbar,
  useKeyboardController,
} from "react-native-keyboard-controller";
import Constants from "expo-constants";
import { COLORS } from "../constants/theme";
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
import { getUnitLabel } from "../constants/formulas";
import { usePremiumStore } from "../store/premiumStore";

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
  onFocusChange: (focused: boolean) => void;
}

// Extract form section into a separate component
const CalculatorForm = ({
  formulaFields,
  getFieldError,
  handleCalculate,
  handleReset,
  buttonTitle,
  isCalculating,
  globalError,
  scrollViewRef,
  onFocusChange,
}: CalculatorFormProps) => {
  const gender = useCalculatorStore(state => state.gender);
  const measurementSystem = useCalculatorStore(state => state.measurementSystem);
  const inputRefs = useRef<(TextInput | null)[]>([]);

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

  return (
    <View style={styles.content}>
      {fieldsWithConvertedUnits.map((field, index) => (
        <MeasurementInput
          key={field.key}
          field={field}
          error={getFieldError(field.key) ?? ""}
          ref={ref => {
            inputRefs.current[index] = ref;
          }}
          isLastInput={index === fieldsWithConvertedUnits.length - 1}
          onFocusChange={onFocusChange}
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
          titleStyle={{ fontWeight: "bold" }}
        />
        <Button
          title="Reset"
          type="outline"
          onPress={handleReset}
          disabled={isCalculating}
          titleStyle={styles.resetButtonText}
          containerStyle={styles.buttonWrapperFlex}
          buttonStyle={styles.resetButton}
        />
      </View>
      {globalError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{globalError}</Text>
        </View>
      )}
    </View>
  );
};

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
  const [isFocused, setIsFocused] = useState(false);
  const [currentInputIndex, setCurrentInputIndex] = useState<number | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const formulaFields = FORMULA_REQUIREMENTS[formula].fields;

  const handleFocusChange = useCallback((focused: boolean, index: number) => {
    setIsFocused(focused);
    if (focused) {
      setCurrentInputIndex(index);
    }
  }, []);

  const keyboard = useKeyboardController();

  const handlePrevious = useCallback(() => {
    if (currentInputIndex !== null && currentInputIndex > 0) {
      const prevRef = inputRefs.current[currentInputIndex - 1];
      prevRef?.focus();
    }
  }, [currentInputIndex]);

  const handleNext = useCallback(() => {
    if (currentInputIndex !== null && currentInputIndex < inputRefs.current.length - 1) {
      const nextRef = inputRefs.current[currentInputIndex + 1];
      nextRef?.focus();
    }
  }, [currentInputIndex]);

  const getFieldError = (fieldKey: string): string | undefined => {
    return fieldErrors[fieldKey];
  };

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
    <KeyboardProvider statusBarTranslucent>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaTop} edges={["top"]}>
          <Header />
        </SafeAreaView>
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
          <KeyboardAwareScrollView
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
                field={field}
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
                titleStyle={{ fontWeight: "bold" }}
              />
              <Button
                title="Reset"
                type="outline"
                onPress={handleReset}
                disabled={isCalculating}
                titleStyle={styles.resetButtonText}
                containerStyle={styles.buttonWrapperFlex}
                buttonStyle={styles.resetButton}
              />
            </View>
            <ResultsDisplay scrollViewRef={scrollViewRef} />
            <VersionDisplay />
          </KeyboardAwareScrollView>
        </View>
      </View>
      <KeyboardToolbar />
    </KeyboardProvider>
  );
};
