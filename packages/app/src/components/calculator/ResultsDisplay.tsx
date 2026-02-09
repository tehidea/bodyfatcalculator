import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import { Card, Icon, LinearProgress, Text } from '@rneui/themed'
import { usePostHog } from 'posthog-react-native'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { COLORS } from '../../constants/theme'
import { useHealthIntegration } from '../../hooks/useHealthIntegration'
import { useCalculatorStore } from '../../store/calculatorStore'
import { useHistoryStore } from '../../store/historyStore'
import { usePremiumStore } from '../../store/premiumStore'
import { useResponsive } from '../../utils/responsiveContext'
import { PaywallModal } from './PaywallModal'

function getClassificationForGender(bodyFatPercentage: number, gender: string): string {
  if (gender === 'male') {
    if (bodyFatPercentage < 6) return 'Essential Fat'
    if (bodyFatPercentage < 14) return 'Athletic'
    if (bodyFatPercentage < 18) return 'Fitness'
    if (bodyFatPercentage < 25) return 'Acceptable'
    return 'Obese'
  }
  if (bodyFatPercentage < 14) return 'Essential Fat'
  if (bodyFatPercentage < 21) return 'Athletic'
  if (bodyFatPercentage < 25) return 'Fitness'
  if (bodyFatPercentage < 32) return 'Acceptable'
  return 'Obese'
}

export const ResultsDisplay = () => {
  const { results, measurementSystem, isResultsStale, gender, formula, inputs } =
    useCalculatorStore()
  const { isPremium } = usePremiumStore()
  const addMeasurement = useHistoryStore((s) => s.addMeasurement)
  const { writeBodyFat } = useHealthIntegration()
  const [showPaywall, setShowPaywall] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)
  const lastResultRef = useRef(results)
  const { getResponsiveTypography, getLineHeight, width } = useResponsive()
  const posthog = usePostHog()

  // Create styles with responsive values
  const styles = createStyles(getResponsiveTypography, getLineHeight, width)

  // Reset savedId when results change (new calculation)
  useEffect(() => {
    if (results !== lastResultRef.current) {
      setSavedId(null)
      lastResultRef.current = results
    }
  }, [results])

  // Auto-save for premium users when results arrive
  useEffect(() => {
    if (results && !isResultsStale && isPremium && !savedId) {
      const record = addMeasurement({
        formula,
        gender,
        measurementSystem,
        inputs,
        bodyFatPercentage: results.bodyFatPercentage,
        fatMass: results.fatMass,
        leanMass: results.leanMass,
        classification: getClassificationForGender(results.bodyFatPercentage, gender),
      })
      setSavedId(record.clientId)
      // Also write to Health (Apple Health / Health Connect) if enabled
      writeBodyFat(results.bodyFatPercentage)
    }
  }, [
    results,
    isResultsStale,
    isPremium,
    savedId,
    formula,
    gender,
    measurementSystem,
    inputs,
    addMeasurement,
    writeBodyFat,
  ])

  if (!results || isResultsStale) return null

  const weightUnit = measurementSystem === 'imperial' ? 'lbs' : 'kg'

  // Calculate progress values
  const maxBodyFat = gender === 'male' ? 35 : 45
  const calculateProgress = (value: number, max: number) => {
    // Convert to integer math (multiply by 1000 for 3 decimal precision equivalent)
    const progress = Math.floor((value * 1000) / (max * 1000))
    return Math.min(progress, 1)
  }
  const bodyFatProgress = calculateProgress(results.bodyFatPercentage, maxBodyFat)
  const leanMassPercentage = 100 - results.bodyFatPercentage

  // Get color based on body fat percentage
  const getClassificationColor = (bodyFatPercentage: number) => {
    if (gender === 'male') {
      if (bodyFatPercentage < 6) return '#2196F3' // Essential fat
      if (bodyFatPercentage < 14) return '#4CAF50' // Athletic
      if (bodyFatPercentage < 18) return '#8BC34A' // Fitness
      if (bodyFatPercentage < 25) return '#FFC107' // Acceptable
      return '#FF5722' // Obese
    } else {
      if (bodyFatPercentage < 14) return '#2196F3' // Essential fat
      if (bodyFatPercentage < 21) return '#4CAF50' // Athletic
      if (bodyFatPercentage < 25) return '#8BC34A' // Fitness
      if (bodyFatPercentage < 32) return '#FFC107' // Acceptable
      return '#FF5722' // Obese
    }
  }

  const classificationColor = getClassificationColor(results.bodyFatPercentage)
  const classification = getClassificationForGender(results.bodyFatPercentage, gender)

  // Split body fat into whole and decimal parts
  const wholeNumber = Math.floor(results.bodyFatPercentage)
  const decimal = (results.bodyFatPercentage % 1).toFixed(2).substring(1)

  const handlePaywallClose = () => {
    setShowPaywall(false)
  }

  const formulaDef = FORMULA_DEFINITIONS[formula]
  const marginOfError = formulaDef ? `${formulaDef.accuracy.min}-${formulaDef.accuracy.max}` : '3-7'

  return (
    <>
      <Animated.View entering={FadeIn.duration(400)}>
        <Card containerStyle={styles.container}>
          <Card.Title style={styles.title}>Your Body Composition</Card.Title>

          {/* Body Fat Percentage with Progress Bar */}
          <View style={styles.mainResult}>
            <View style={styles.mainValueContainer}>
              <Text style={styles.mainValue}>
                {isPremium ? `${wholeNumber}` : `~${wholeNumber}%`}
              </Text>
              {isPremium && <Text style={styles.mainValue}>{decimal}%</Text>}
            </View>
            {!isPremium && (
              <TouchableOpacity
                style={styles.premiumBadge}
                onPress={() => {
                  if (posthog) {
                    posthog.capture('results_precision_tapped', {
                      current_formula: formula,
                      body_fat_percentage: results?.bodyFatPercentage,
                      measurement_system: measurementSystem,
                    })
                  }
                  setShowPaywall(true)
                }}
              >
                <Icon name="lock" type="feather" color="#666" size={14} />
                <Text style={styles.premiumBadgeText}>Get more accurate results with Premium</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.mainLabel}>
              Body Fat {isPremium ? `(±${marginOfError}%)` : '(estimated)'}
            </Text>
            <LinearProgress
              style={styles.progressBar}
              value={bodyFatProgress}
              color={classificationColor}
              variant="determinate"
            />
          </View>

          {/* Classification */}
          <View
            style={[
              styles.classificationContainer,
              { backgroundColor: `${classificationColor}15` },
            ]}
          >
            <Text style={[styles.classification, { color: classificationColor }]}>
              {classification}
            </Text>
          </View>

          {/* Detailed Breakdown */}
          <View style={styles.breakdownContainer}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownValue}>
                {isPremium ? results.fatMass.toFixed(2) : Math.round(results.fatMass)} {weightUnit}
              </Text>
              <Text style={styles.breakdownLabel}>Fat Mass</Text>
              <Text style={styles.breakdownPercentage}>
                {isPremium
                  ? results.bodyFatPercentage.toFixed(2)
                  : Math.round(results.bodyFatPercentage)}
                %
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownValue}>
                {isPremium ? results.leanMass.toFixed(2) : Math.round(results.leanMass)}{' '}
                {weightUnit}
              </Text>
              <Text style={styles.breakdownLabel}>Lean Mass</Text>
              <Text style={styles.breakdownPercentage}>
                {isPremium ? leanMassPercentage.toFixed(2) : Math.round(leanMassPercentage)}%
              </Text>
            </View>
          </View>

          {/* Formula Name */}
          <Text style={styles.formulaName}>{formulaDef?.name || formula.toUpperCase()}</Text>

          {/* Save / Saved indicator */}
          {isPremium && savedId && (
            <View style={styles.savedIndicator}>
              <Icon name="check" type="feather" color={COLORS.success} size={14} />
              <Text style={styles.savedText}>Saved to history</Text>
            </View>
          )}
          {!isPremium && (
            <TouchableOpacity style={styles.saveButton} onPress={() => setShowPaywall(true)}>
              <Icon name="clock" type="feather" color="#666" size={14} />
              <Text style={styles.saveButtonText}>Save to History</Text>
              <Icon name="lock" type="feather" color="#999" size={12} />
            </TouchableOpacity>
          )}
        </Card>
      </Animated.View>

      <PaywallModal visible={showPaywall} variant="precision" onClose={handlePaywallClose} />
    </>
  )
}

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  width: number,
) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      backgroundColor: COLORS.white,
      borderRadius: 16,
      padding: 20,
      width: width - 32,
      alignSelf: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    title: {
      color: COLORS.textDark,
      fontSize: getResponsiveTypography('xl'),
      marginBottom: 16,
      lineHeight: getLineHeight('xl'),
    },
    mainResult: {
      alignItems: 'center',
      marginBottom: 20,
    },
    mainValueContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    mainValue: {
      fontSize: getResponsiveTypography('6xl'),
      fontWeight: 'bold',
      color: COLORS.textDark,
      lineHeight: getLineHeight('6xl'),
    },
    premiumBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginTop: 8,
      marginBottom: 12,
    },
    premiumBadgeText: {
      fontSize: getResponsiveTypography('xxxs'),
      fontWeight: 'bold',
      color: '#666',
      marginLeft: 4,
      lineHeight: getLineHeight('xxxs'),
    },
    mainLabel: {
      fontSize: getResponsiveTypography('md'),
      color: COLORS.textLight,
      marginBottom: 8,
      lineHeight: getLineHeight('md'),
    },
    progressBar: {
      width: '100%',
      height: 8,
      borderRadius: 4,
      marginTop: 8,
    },
    classificationContainer: {
      padding: 12,
      borderRadius: 8,
      marginBottom: 20,
      alignItems: 'center',
    },
    classification: {
      fontSize: getResponsiveTypography('md'),
      fontWeight: '600',
      lineHeight: getLineHeight('md'),
    },
    breakdownContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      marginBottom: 16,
    },
    breakdownItem: {
      flex: 1,
      alignItems: 'center',
    },
    breakdownValue: {
      fontSize: getResponsiveTypography('xl'),
      fontWeight: '600',
      color: COLORS.textDark,
      marginBottom: 4,
      lineHeight: getLineHeight('xl'),
    },
    breakdownLabel: {
      fontSize: getResponsiveTypography('sm'),
      color: COLORS.textLight,
      marginBottom: 4,
      lineHeight: getLineHeight('sm'),
    },
    breakdownPercentage: {
      fontSize: getResponsiveTypography('md'),
      color: COLORS.textDark,
      lineHeight: getLineHeight('md'),
    },
    divider: {
      width: 1,
      backgroundColor: '#eee',
      marginHorizontal: 16,
    },
    formulaName: {
      fontSize: getResponsiveTypography('xs'),
      color: COLORS.textLight,
      textAlign: 'center',
      marginTop: 8,
      lineHeight: getLineHeight('xs'),
    },
    savedIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
      gap: 6,
    },
    savedText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: COLORS.success,
      fontWeight: '500',
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      gap: 6,
      alignSelf: 'center',
    },
    saveButtonText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
      fontWeight: '500',
    },
  })
