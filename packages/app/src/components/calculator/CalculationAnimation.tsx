import { Text } from '@rneui/themed'
import { useCallback, useEffect, useState } from 'react'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useResponsive } from '../../utils/responsiveContext'
import { createStyles } from './CalculationAnimation.styles'

interface CalculationAnimationProps {
  targetValue: number
  isAnimating: boolean
  onAnimationComplete: () => void
}

export const CalculationAnimation = ({
  targetValue,
  isAnimating,
  onAnimationComplete,
}: CalculationAnimationProps) => {
  const { getResponsiveTypography, getLineHeight } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight)

  const countValue = useSharedValue(0)
  const opacity = useSharedValue(0)
  const [displayText, setDisplayText] = useState('0.0')

  const updateDisplayText = (value: number) => {
    setDisplayText(value.toFixed(1))
  }

  const fireComplete = useCallback(() => {
    onAnimationComplete()
  }, [onAnimationComplete])

  useAnimatedReaction(
    () => countValue.value,
    (current) => {
      runOnJS(updateDisplayText)(current)
    },
  )

  useEffect(() => {
    if (isAnimating) {
      // Reset
      countValue.value = 0
      opacity.value = 0

      // Fade in
      opacity.value = withTiming(1, { duration: 150 })

      // Count up with deceleration
      countValue.value = withTiming(targetValue, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      })

      // After count settles, fade out and notify completion
      opacity.value = withDelay(
        900,
        withTiming(0, { duration: 300 }, (finished) => {
          if (finished) {
            runOnJS(fireComplete)()
          }
        }),
      )
    }
  }, [isAnimating, targetValue, countValue, opacity, fireComplete])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  if (!isAnimating) return null

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.value}>{displayText}%</Text>
      <Text style={styles.label}>Analyzing measurements...</Text>
    </Animated.View>
  )
}
