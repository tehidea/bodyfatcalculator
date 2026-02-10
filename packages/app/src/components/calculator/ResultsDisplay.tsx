import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import { Icon } from '@rneui/themed'
import { shareAsync } from 'expo-sharing'
import { usePostHog } from 'posthog-react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { captureRef } from 'react-native-view-shot'
import { useHealthIntegration } from '../../hooks/useHealthIntegration'
import Logo from '../../images/logo'
import { useCalculatorStore } from '../../store/calculatorStore'
import { useHistoryStore } from '../../store/historyStore'
import { useHasProFeatures, usePremiumStore } from '../../store/premiumStore'
import { hapticSuccess } from '../../utils/haptics'
import { useResponsive } from '../../utils/responsiveContext'
import { ArcGauge } from './ArcGauge'
import { PaywallModal } from './PaywallModal'
import { createStyles } from './ResultsDisplay.styles'

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

function getClassificationColor(bodyFatPercentage: number, gender: string): string {
  if (gender === 'male') {
    if (bodyFatPercentage < 6) return '#2196F3'
    if (bodyFatPercentage < 14) return '#4CAF50'
    if (bodyFatPercentage < 18) return '#8BC34A'
    if (bodyFatPercentage < 25) return '#FFC107'
    return '#FF5722'
  }
  if (bodyFatPercentage < 14) return '#2196F3'
  if (bodyFatPercentage < 21) return '#4CAF50'
  if (bodyFatPercentage < 25) return '#8BC34A'
  if (bodyFatPercentage < 32) return '#FFC107'
  return '#FF5722'
}

const EASING = Easing.out(Easing.cubic)

// Gauge size relative to card width
const GAUGE_SIZE_RATIO = 0.6

export const ResultsDisplay = () => {
  const { results, measurementSystem, isResultsStale, gender, formula, inputs } =
    useCalculatorStore()
  const { isProPlus } = usePremiumStore()
  const hasProFeatures = useHasProFeatures()
  const addMeasurement = useHistoryStore((s) => s.addMeasurement)
  const { writeBodyFat } = useHealthIntegration()
  const [showPaywall, setShowPaywall] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const lastResultRef = useRef(results)
  const cardCaptureRef = useRef<View>(null)
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight, width } = useResponsive()
  const posthog = usePostHog()

  const styles = createStyles(getResponsiveSpacing, getResponsiveTypography, getLineHeight, width)

  // Animated count-up display text
  const [displayValue, setDisplayValue] = useState('0')
  const [displayDecimal, setDisplayDecimal] = useState('.00')

  // ── Shared values for staggered animation ──
  // Phase 1: Card
  const cardOpacity = useSharedValue(0)
  const cardTranslateY = useSharedValue(30)
  // Phase 2: Arc gauge
  const gaugeOpacity = useSharedValue(0)
  const gaugeProgress = useSharedValue(0)
  // Phase 3: Body fat count-up (driven by gaugeProgress via reaction)
  // Phase 4: Classification
  const classificationOpacity = useSharedValue(0)
  const classificationScale = useSharedValue(0.8)
  // Phase 5: Breakdown
  const fatColumnOpacity = useSharedValue(0)
  const fatColumnTranslateX = useSharedValue(-30)
  const leanColumnOpacity = useSharedValue(0)
  const leanColumnTranslateX = useSharedValue(30)
  // Phase 6: Footer
  const footerOpacity = useSharedValue(0)

  const updateDisplayValue = useCallback((value: number) => {
    setDisplayValue(Math.floor(value).toString())
    setDisplayDecimal((value % 1).toFixed(2).substring(1))
  }, [])

  const handleShare = useCallback(async () => {
    if (isSharing || !cardCaptureRef.current || !results) return

    try {
      // Hide interactive elements, wait a frame for React to re-render, then capture
      setIsCapturing(true)
      await new Promise((resolve) => requestAnimationFrame(resolve))
      const uri = await captureRef(cardCaptureRef, { format: 'png', result: 'tmpfile' })
      setIsCapturing(false)
      setIsSharing(true)

      if (posthog) {
        posthog.capture('results_shared', {
          formula,
          body_fat_percentage: results.bodyFatPercentage,
          classification: getClassificationForGender(results.bodyFatPercentage, gender),
          measurement_system: measurementSystem,
        })
      }

      await shareAsync(uri, { mimeType: 'image/png' })
    } catch (error: unknown) {
      // Don't alert on share-sheet dismissal
      const message = error instanceof Error ? error.message : ''
      if (!message.includes('cancel') && !message.includes('dismiss')) {
        Alert.alert('Share failed', 'Unable to share the image. Please try again.')
      }
    } finally {
      setIsCapturing(false)
      setIsSharing(false)
    }
  }, [isSharing, results, posthog, formula, gender, measurementSystem])

  // Reset savedId when results change
  useEffect(() => {
    if (results !== lastResultRef.current) {
      setSavedId(null)
      lastResultRef.current = results
    }
  }, [results])

  // Auto-save for PRO+ users
  useEffect(() => {
    if (results && !isResultsStale && isProPlus && !savedId) {
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
      writeBodyFat(results.bodyFatPercentage)
    }
  }, [
    results,
    isResultsStale,
    isProPlus,
    savedId,
    formula,
    gender,
    measurementSystem,
    inputs,
    addMeasurement,
    writeBodyFat,
  ])

  // ── Run staggered animation sequence when results arrive ──
  useEffect(() => {
    if (!results || isResultsStale) return
    hapticSuccess()

    const targetBf = results.bodyFatPercentage
    const maxBf = gender === 'male' ? 35 : 45
    const normalizedProgress = Math.min(targetBf / maxBf, 1)

    // Reset all values
    cardOpacity.value = 0
    cardTranslateY.value = 30
    gaugeOpacity.value = 0
    gaugeProgress.value = 0
    classificationOpacity.value = 0
    classificationScale.value = 0.8
    fatColumnOpacity.value = 0
    fatColumnTranslateX.value = -30
    leanColumnOpacity.value = 0
    leanColumnTranslateX.value = 30
    footerOpacity.value = 0
    setDisplayValue('0')
    setDisplayDecimal('.00')

    // Phase 1: Card fade in + slide up (0ms)
    cardOpacity.value = withTiming(1, { duration: 400, easing: EASING })
    cardTranslateY.value = withTiming(0, { duration: 400, easing: EASING })

    // Phase 2: Arc gauge (200ms delay)
    gaugeOpacity.value = withDelay(200, withTiming(1, { duration: 400, easing: EASING }))
    gaugeProgress.value = withDelay(
      300,
      withTiming(normalizedProgress, { duration: 800, easing: EASING }),
    )

    // Phase 3: Count-up is driven by countValue (separate useEffect below)

    // Phase 4: Classification (600ms delay)
    classificationOpacity.value = withDelay(600, withTiming(1, { duration: 300, easing: EASING }))
    classificationScale.value = withDelay(600, withSpring(1, { damping: 15, stiffness: 150 }))

    // Phase 5: Breakdown columns (800ms delay, 50ms stagger)
    fatColumnOpacity.value = withDelay(800, withTiming(1, { duration: 300, easing: EASING }))
    fatColumnTranslateX.value = withDelay(800, withTiming(0, { duration: 300, easing: EASING }))
    leanColumnOpacity.value = withDelay(850, withTiming(1, { duration: 300, easing: EASING }))
    leanColumnTranslateX.value = withDelay(850, withTiming(0, { duration: 300, easing: EASING }))

    // Phase 6: Footer (1000ms delay)
    footerOpacity.value = withDelay(1000, withTiming(1, { duration: 200, easing: EASING }))
  }, [
    results,
    isResultsStale,
    gender,
    cardOpacity,
    cardTranslateY,
    gaugeOpacity,
    gaugeProgress,
    classificationOpacity,
    classificationScale,
    fatColumnOpacity,
    fatColumnTranslateX,
    leanColumnOpacity,
    leanColumnTranslateX,
    footerOpacity,
  ])

  // We need a separate animation for the count-up display that maps to actual BF%
  const countValue = useSharedValue(0)

  useEffect(() => {
    if (!results || isResultsStale) return
    countValue.value = 0
    countValue.value = withDelay(
      300,
      withTiming(results.bodyFatPercentage, { duration: 800, easing: EASING }),
    )
  }, [results, isResultsStale, countValue])

  useAnimatedReaction(
    () => countValue.value,
    (current) => {
      if (current > 0) {
        runOnJS(updateDisplayValue)(current)
      }
    },
  )

  // ── Animated styles ──
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }))

  const gaugeStyle = useAnimatedStyle(() => ({
    opacity: gaugeOpacity.value,
  }))

  const classificationStyle = useAnimatedStyle(() => ({
    opacity: classificationOpacity.value,
    transform: [{ scale: classificationScale.value }],
  }))

  const fatColumnStyle = useAnimatedStyle(() => ({
    opacity: fatColumnOpacity.value,
    transform: [{ translateX: fatColumnTranslateX.value }],
  }))

  const leanColumnStyle = useAnimatedStyle(() => ({
    opacity: leanColumnOpacity.value,
    transform: [{ translateX: leanColumnTranslateX.value }],
  }))

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }))

  if (!results || isResultsStale) return null

  const weightUnit = measurementSystem === 'imperial' ? 'lbs' : 'kg'
  const classificationColor = getClassificationColor(results.bodyFatPercentage, gender)
  const classification = getClassificationForGender(results.bodyFatPercentage, gender)
  const leanMassPercentage = 100 - results.bodyFatPercentage
  const formulaDef = FORMULA_DEFINITIONS[formula]
  const marginOfError = formulaDef ? `${formulaDef.accuracy.min}-${formulaDef.accuracy.max}` : '3-7'

  // Gauge sizing
  const gaugeSize = Math.min((width - 32) * GAUGE_SIZE_RATIO, 200)

  // Breakdown bar proportions
  const fatBarWidth = Math.min(results.bodyFatPercentage / 50, 1) // Scale to 50% max
  const leanBarWidth = Math.min(leanMassPercentage / 100, 1)

  return (
    <>
      <Animated.View style={[styles.cardShadow, cardStyle]}>
        <View ref={cardCaptureRef} style={styles.card} collapsable={false}>
          <Animated.Text style={styles.cardTitle}>Body Composition</Animated.Text>

          {/* Arc Gauge with overlaid percentage */}
          <Animated.View style={[styles.gaugeContainer, gaugeStyle]}>
            <ArcGauge size={gaugeSize} progress={gaugeProgress} color={classificationColor} />
            <View style={[styles.gaugeOverlay, { height: gaugeSize }]}>
              <View style={styles.mainValueContainer}>
                {!hasProFeatures && (
                  <Animated.Text style={styles.mainValueDecimal}>~</Animated.Text>
                )}
                <Animated.Text style={styles.mainValueWhole}>{displayValue}</Animated.Text>
                {hasProFeatures ? (
                  <Animated.Text style={styles.mainValueDecimal}>{displayDecimal}%</Animated.Text>
                ) : (
                  <Animated.Text style={styles.mainValuePercent}>%</Animated.Text>
                )}
              </View>
              <Animated.Text
                style={[styles.classification, classificationStyle, { color: classificationColor }]}
              >
                {classification}
              </Animated.Text>
            </View>
          </Animated.View>

          {/* Precision badge or margin of error (invisible during capture for non-pro) */}
          {hasProFeatures ? (
            <Animated.Text style={styles.marginOfError}>
              Margin of error ±{marginOfError}%
            </Animated.Text>
          ) : (
            <TouchableOpacity
              style={[styles.premiumBadge, isCapturing && { opacity: 0 }]}
              onPress={() => {
                if (posthog) {
                  posthog.capture('results_precision_tapped', {
                    current_formula: formula,
                    body_fat_percentage: results.bodyFatPercentage,
                    measurement_system: measurementSystem,
                  })
                }
                setShowPaywall(true)
              }}
            >
              <Icon name="lock" type="feather" color="rgba(255,255,255,0.5)" size={11} />
              <Animated.Text style={styles.premiumBadgeText}>
                Precise results with PRO+
              </Animated.Text>
            </TouchableOpacity>
          )}

          {/* Breakdown: Fat Mass / Lean Mass */}
          <View style={styles.breakdownContainer}>
            <Animated.View style={[styles.breakdownColumn, fatColumnStyle]}>
              <View style={[styles.breakdownBar, { backgroundColor: 'rgba(255,255,255,0.06)' }]}>
                <View
                  style={[
                    styles.breakdownBarFill,
                    { width: `${fatBarWidth * 100}%`, backgroundColor: classificationColor },
                  ]}
                />
              </View>
              <Animated.Text style={styles.breakdownValue}>
                {hasProFeatures ? results.fatMass.toFixed(2) : Math.round(results.fatMass)}{' '}
                {weightUnit}
              </Animated.Text>
              <Animated.Text style={styles.breakdownLabel}>Fat Mass</Animated.Text>
              <Animated.Text style={styles.breakdownPercentage}>
                {hasProFeatures
                  ? results.bodyFatPercentage.toFixed(2)
                  : Math.round(results.bodyFatPercentage)}
                %
              </Animated.Text>
            </Animated.View>

            <View style={styles.divider} />

            <Animated.View style={[styles.breakdownColumn, leanColumnStyle]}>
              <View style={[styles.breakdownBar, { backgroundColor: 'rgba(255,255,255,0.06)' }]}>
                <View
                  style={[
                    styles.breakdownBarFill,
                    { width: `${leanBarWidth * 100}%`, backgroundColor: 'rgba(255,255,255,0.25)' },
                  ]}
                />
              </View>
              <Animated.Text style={styles.breakdownValue}>
                {hasProFeatures ? results.leanMass.toFixed(2) : Math.round(results.leanMass)}{' '}
                {weightUnit}
              </Animated.Text>
              <Animated.Text style={styles.breakdownLabel}>Lean Mass</Animated.Text>
              <Animated.Text style={styles.breakdownPercentage}>
                {hasProFeatures ? leanMassPercentage.toFixed(2) : Math.round(leanMassPercentage)}%
              </Animated.Text>
            </Animated.View>
          </View>

          {/* Footer: formula + save status + share */}
          <Animated.View style={[styles.footerContainer, footerStyle]}>
            <Animated.Text style={styles.formulaName}>
              {formulaDef?.name || formula.toUpperCase()}
            </Animated.Text>

            {/* Action buttons (invisible during capture) */}
            <View style={[styles.footerRow, isCapturing && { opacity: 0 }]}>
              {isProPlus && savedId ? (
                <View style={styles.savedIndicator}>
                  <Icon name="check" type="feather" color="#4CAF50" size={14} />
                  <Animated.Text style={styles.savedText}>Saved to history</Animated.Text>
                </View>
              ) : !isProPlus ? (
                <TouchableOpacity style={styles.saveButton} onPress={() => setShowPaywall(true)}>
                  <Icon name="lock" type="feather" color="rgba(255,255,255,0.5)" size={14} />
                  <Animated.Text style={styles.saveButtonText}>Save to History</Animated.Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}
              <TouchableOpacity
                style={styles.shareButton}
                onPress={handleShare}
                disabled={isSharing}
              >
                {isSharing ? (
                  <ActivityIndicator size={14} color="rgba(255,255,255,0.5)" />
                ) : (
                  <Icon name="share" type="feather" color="rgba(255,255,255,0.5)" size={14} />
                )}
                <Animated.Text style={styles.shareButtonText}>Share</Animated.Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Branding strip for share snapshots */}
          <Animated.View style={[styles.brandingRow, footerStyle]}>
            <Logo width={16} height={16} />
            <Animated.Text style={styles.brandingUrl}>www.bodyfatcalculator.pro</Animated.Text>
          </Animated.View>
        </View>
      </Animated.View>

      <PaywallModal
        visible={showPaywall}
        variant="precision"
        onClose={() => setShowPaywall(false)}
      />
    </>
  )
}
