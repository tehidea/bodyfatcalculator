import { Text } from '@rneui/themed'
import { usePostHog } from 'posthog-react-native'
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, TextInput, View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { COLORS } from '../../constants/theme'
import { getFormulaMetadata } from '../../schemas/calculator'
import { useCalculatorStore } from '../../store/calculatorStore'
import { useHasProFeatures } from '../../store/premiumStore'
import { useResponsive } from '../../utils/responsiveContext'
import { MeasurementIcon } from './FormulaSelector'
import { MeasurementHint } from './MeasurementHint'
import { createStyles } from './MeasurementInput.styles'
import { PaywallModal } from './PaywallModal'

interface MeasurementInputProps {
  field: string
  label: string
  unit: string
  error: string
  onSubmitEditing?: () => void
  isLastInput?: boolean
  onFocusChange?: (focused: boolean) => void
}

export const MeasurementInput = forwardRef<TextInput, MeasurementInputProps>(
  (
    { field, label: _label, unit: _unit, error, onSubmitEditing, isLastInput, onFocusChange },
    ref,
  ) => {
    const { inputs, setInput, measurementSystem, formula, gender } = useCalculatorStore()
    const hasProFeatures = useHasProFeatures()
    const { getResponsiveSpacing, getResponsiveTypography, getLineHeight } = useResponsive()
    const posthog = usePostHog()

    // Create styles with responsive values
    const styles = createStyles(getResponsiveSpacing, getResponsiveTypography, getLineHeight)

    const [rawValue, setRawValue] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [isPaywallVisible, setIsPaywallVisible] = useState(false)
    const inputRef = useRef<TextInput>(null)
    const errorAnimation = useSharedValue(0)
    const shakeAnimation = useSharedValue(0)
    const previousError = useRef<string | null>(null)

    // Get field metadata from Zod schema
    const fieldMetadata = useMemo(() => {
      if (!formula || !gender) return null
      try {
        const metadata = getFormulaMetadata(formula, measurementSystem, gender)
        return metadata.fields.find((f) => f.key === field)
      } catch (error) {
        console.error('[MeasurementInput] Error getting field metadata:', error)
        return null
      }
    }, [formula, gender, measurementSystem, field])

    // Forward the ref
    useEffect(() => {
      if (typeof ref === 'function') ref(inputRef.current)
      else if (ref) ref.current = inputRef.current
    }, [ref])

    const handleSubmitEditing = useCallback(() => {
      if (isLastInput) {
        setTimeout(() => Keyboard.dismiss(), 100)
      }
      onSubmitEditing?.()
    }, [isLastInput, onSubmitEditing])

    // Sync with store and handle display conversion
    useEffect(() => {
      const storeValue = inputs[field]
      console.log(`[MeasurementInput] ${field} - Store value:`, storeValue)

      if (storeValue === null || storeValue === undefined) {
        setRawValue('')
        setIsEditing(false)
        return
      }

      if (!isEditing) {
        setRawValue(
          typeof storeValue === 'number'
            ? hasProFeatures
              ? storeValue.toString()
              : Math.round(storeValue).toString()
            : storeValue?.toString() || '',
        )
      }
    }, [inputs[field], isEditing, hasProFeatures, field])

    const handleChangeText = useCallback(
      (value: string) => {
        setIsEditing(true)
        console.log(`[MeasurementInput] ${field} - User input:`, value)

        if (value === '') {
          setRawValue('')
          setInput(field, null)
          return
        }

        if (value.includes('.') && !hasProFeatures) {
          posthog.capture('decimal_input_blocked', {
            field_name: field,
            attempted_value: value,
            measurement_system: measurementSystem,
          })
          setIsPaywallVisible(true)
          return
        }

        if (!value.match(/^\d*\.?\d*$/)) return

        setRawValue(value)

        if (value === '.') {
          setInput(field, 0)
          return
        }

        const numValue = parseFloat(value)
        if (!Number.isNaN(numValue)) {
          console.log(`[MeasurementInput] ${field} - Sending to store:`, numValue)
          setInput(field, hasProFeatures ? numValue : Math.round(numValue))
        }
      },
      [hasProFeatures, field, setInput, measurementSystem, posthog],
    )

    // Calculate the error container height dynamically
    const errorContainerHeight = getResponsiveSpacing(20)

    useEffect(() => {
      if (error && !previousError.current) {
        // New error appeared
        errorAnimation.value = withTiming(1, {
          duration: 150,
        })

        shakeAnimation.value = withSequence(
          withTiming(-3, { duration: 50 }),
          withTiming(3, { duration: 50 }),
          withTiming(0, { duration: 50 }),
        )
      } else if (!error && previousError.current) {
        // Error cleared
        errorAnimation.value = withTiming(0, {
          duration: 100,
        })
      }
      previousError.current = error || null
    }, [
      error, // Error cleared
      errorAnimation,
      shakeAnimation,
    ])

    const errorContainerStyle = useAnimatedStyle(() => {
      const interpolatedHeight = interpolate(
        errorAnimation.value,
        [0, 1],
        [0, errorContainerHeight],
        Extrapolation.CLAMP,
      )

      return {
        opacity: errorAnimation.value,
        height: interpolatedHeight,
        transform: [{ translateX: shakeAnimation.value }],
      }
    })

    const inputContainerStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: shakeAnimation.value }],
    }))

    // If we don't have field metadata, don't render anything
    if (!fieldMetadata) return null

    return (
      <>
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{fieldMetadata.label}</Text>
            {fieldMetadata.accessibilityHint && (
              <MeasurementHint
                hint={fieldMetadata.accessibilityHint}
                type={fieldMetadata.type}
                fieldKey={field}
                gender={gender}
              />
            )}
          </View>
          <Animated.View
            style={[styles.inputContainer, error && styles.inputError, inputContainerStyle]}
          >
            <View style={styles.iconContainer}>
              <MeasurementIcon
                type={fieldMetadata.type}
                size={getResponsiveSpacing(18)}
                color={COLORS.textDark}
              />
            </View>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={rawValue}
              onChangeText={handleChangeText}
              onFocus={() => {
                setIsEditing(true)
                onFocusChange?.(true)
              }}
              onBlur={() => {
                setIsEditing(false)
                onFocusChange?.(false)
              }}
              keyboardType="decimal-pad"
              enablesReturnKeyAutomatically={false}
              placeholderTextColor="#999"
              accessibilityLabel={fieldMetadata.label}
              accessibilityHint={
                fieldMetadata.accessibilityHint || `Enter ${fieldMetadata.label.toLowerCase()}`
              }
              accessibilityRole="spinbutton"
              onSubmitEditing={handleSubmitEditing}
            />
            <Text style={styles.unit}>{fieldMetadata.unit}</Text>
          </Animated.View>
          <Animated.View style={[styles.errorContainer, errorContainerStyle]}>
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </Animated.View>
        </View>

        <PaywallModal
          visible={isPaywallVisible}
          variant="precision"
          onClose={() => setIsPaywallVisible(false)}
        />
      </>
    )
  },
)
