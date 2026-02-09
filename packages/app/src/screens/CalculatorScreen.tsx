import { calculateResults } from '@bodyfat/shared/formulas'
import type { CalculationResult } from '@bodyfat/shared/types'
import { Button, Text } from '@rneui/themed'
import Constants from 'expo-constants'
import { usePostHog } from 'posthog-react-native'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, Platform, type TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BrandHeader } from '../components/BrandHeader'
import { CalculationAnimation } from '../components/calculator/CalculationAnimation'
import { FormulaSelector } from '../components/calculator/FormulaSelector'
import { MeasurementInput } from '../components/calculator/MeasurementInput'
import { ResultsDisplay } from '../components/calculator/ResultsDisplay'
import {
  getFormulaMetadata,
  isValidFormula,
  validateFormula as validateInputs,
} from '../schemas/calculator'
import { useCalculatorStore } from '../store/calculatorStore'
import { usePremiumStore } from '../store/premiumStore'
import { useResponsive } from '../utils/responsiveContext'
import { createStyles } from './CalculatorScreen.styles'

// Add References Display component
const ReferencesDisplay = memo(() => {
  const { formula, gender, measurementSystem } = useCalculatorStore()
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight, deviceType } =
    useResponsive()
  const styles = createStyles(
    getResponsiveSpacing,
    getResponsiveTypography,
    getLineHeight,
    deviceType,
  )

  if (!isValidFormula(formula)) return null

  const metadata = getFormulaMetadata(formula, measurementSystem, gender)
  const { primary } = metadata.reference

  if (!primary) return null

  return (
    <View style={styles.referencesContainer}>
      <Text style={styles.referenceCitation}>{primary.citation}</Text>
      {/* {primary.doi && (
        <TouchableOpacity onPress={() => handleDoiPress(primary.doi!)}>
          <Text style={styles.referenceDoi}>DOI: {primary.doi}</Text>
        </TouchableOpacity>
      )} */}
    </View>
  )
})

// Add Version Display component
const VersionDisplay = memo(() => {
  const { isPremium } = usePremiumStore()
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight, deviceType } =
    useResponsive()
  const styles = createStyles(
    getResponsiveSpacing,
    getResponsiveTypography,
    getLineHeight,
    deviceType,
  )

  const version = Constants.expoConfig?.version || '?.?.?'
  const buildNumber =
    Platform.select({
      ios: Constants.expoConfig?.ios?.buildNumber,
      android: Constants.expoConfig?.android?.versionCode?.toString(),
    }) || null
  return (
    <Text style={styles.versionText}>
      v{version}
      {buildNumber ? ` (${buildNumber})` : ''} {isPremium ? 'PREMIUM' : ''}
    </Text>
  )
})

export const CalculatorScreen = () => {
  const posthog = usePostHog()
  const {
    formula,
    gender,
    inputs,
    error: globalError,
    isResultsStale,
    results,
    setResults,
    setError,
    reset,
    measurementSystem,
    fieldErrors,
  } = useCalculatorStore()

  const prevMeasurementSystemRef = useRef(measurementSystem)

  useEffect(() => {
    if (posthog && prevMeasurementSystemRef.current !== measurementSystem) {
      posthog.capture('unit_system_changed', {
        unit_system: measurementSystem,
      })
    }
    prevMeasurementSystemRef.current = measurementSystem
  }, [measurementSystem, posthog])

  // Get responsive values for styles
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight, deviceType } =
    useResponsive()
  const styles = createStyles(
    getResponsiveSpacing,
    getResponsiveTypography,
    getLineHeight,
    deviceType,
  )

  const scrollViewRef = useRef<any>(null)
  const [_isFocused, setIsFocused] = useState(false)
  const [_currentInputIndex, setCurrentInputIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [pendingResults, setPendingResults] = useState<CalculationResult | null>(null)
  const resultsYRef = useRef(0)
  const inputRefs = useRef<(TextInput | null)[]>([])

  const formulaFields = useMemo(() => {
    if (!isValidFormula(formula)) return []

    const metadata = getFormulaMetadata(formula, measurementSystem, gender)
    return metadata.fields.map((field) => ({
      key: field.key,
      label: field.label,
      unit: field.unit,
      required: field.required,
    }))
  }, [formula, gender, measurementSystem])

  const handleFocusChange = useCallback((focused: boolean, index: number) => {
    setIsFocused(focused)
    if (focused) {
      setCurrentInputIndex(index)
    }
  }, [])

  const getFieldError = (fieldKey: string): string | undefined => {
    return fieldErrors[fieldKey]
  }

  const handleCalculate = useCallback(async () => {
    Keyboard.dismiss()
    setError(null)

    try {
      const validation = validateInputs(formula, inputs, measurementSystem, gender)
      if (!validation.success) {
        setError('Please correct the input errors', validation.errors)
        return
      }

      if (posthog) {
        posthog.capture('calculator_form_submitted', {
          formula_selected: formula,
          gender_selected: gender,
          measurement_system: measurementSystem,
        })
      }

      const computed = await calculateResults(formula, gender, inputs, measurementSystem)
      setPendingResults(computed)
      setIsAnimating(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }, [formula, gender, inputs, measurementSystem, posthog, setError])

  const handleAnimationComplete = useCallback(() => {
    if (pendingResults) {
      setResults(pendingResults)
      setPendingResults(null)
    }
    setIsAnimating(false)

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: resultsYRef.current, animated: true })
    }, 100)
  }, [pendingResults, setResults])

  const handleReset = useCallback(() => {
    setError(null)
    reset()
    if (posthog) {
      posthog.capture('reset_form_tapped')
    }
  }, [reset, posthog, setError])

  const buttonTitle = useMemo(() => {
    if (isAnimating) return 'Calculating...'
    if (results && isResultsStale) return 'Recalculate'
    return 'Calculate'
  }, [isAnimating, results, isResultsStale])

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>
        <BrandHeader subtitle="Body Fat Calculator for skinfold calipers" />

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
            </View>
            {formulaFields.map((field, index) => (
              <MeasurementInput
                key={field.key}
                field={field.key}
                label={field.label}
                unit={field.unit || ''}
                error={getFieldError(field.key) ?? ''}
                ref={(ref) => {
                  inputRefs.current[index] = ref
                }}
                onFocusChange={(focused) => handleFocusChange(focused, index)}
                isLastInput={index === formulaFields.length - 1}
              />
            ))}
            <View style={styles.buttonContainer}>
              <Button
                title={buttonTitle}
                onPress={handleCalculate}
                disabled={isAnimating}
                buttonStyle={styles.primaryButton}
                disabledStyle={styles.primaryButton}
                containerStyle={styles.buttonWrapperFullWidth}
                titleStyle={styles.primaryButtonText}
                disabledTitleStyle={styles.primaryButtonText}
                testID="calculate-button"
              />
              <TouchableOpacity
                style={styles.resetLink}
                onPress={handleReset}
                disabled={isAnimating}
                testID="reset-button"
              >
                <Text style={styles.resetLinkText}>Reset</Text>
              </TouchableOpacity>
            </View>
            {pendingResults && (
              <CalculationAnimation
                targetValue={pendingResults.bodyFatPercentage}
                isAnimating={isAnimating}
                onAnimationComplete={handleAnimationComplete}
              />
            )}
            {globalError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{globalError}</Text>
              </View>
            )}
            <View
              onLayout={(e) => {
                resultsYRef.current = e.nativeEvent.layout.y
              }}
            >
              <ResultsDisplay />
            </View>
            <ReferencesDisplay />
            <VersionDisplay />
          </KeyboardAwareScrollView>
        </View>
      </View>
      <KeyboardToolbar />
    </SafeAreaView>
  )
}
