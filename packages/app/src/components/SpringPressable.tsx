import type { ReactNode } from 'react'
import { Pressable, type StyleProp, type ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { hapticImpact, hapticSelection } from '../utils/haptics'

const SPRING_CONFIG = { damping: 15, stiffness: 400, mass: 0.8 }

type SpringPressableProps = {
  onPress: () => void
  haptic?: 'impact' | 'selection' | 'none' | undefined
  disabled?: boolean | undefined
  style?: StyleProp<ViewStyle> | undefined
  testID?: string | undefined
  children: ReactNode
}

export function SpringPressable({
  onPress,
  haptic = 'none',
  disabled,
  style,
  testID,
  children,
}: SpringPressableProps) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.97, SPRING_CONFIG)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, SPRING_CONFIG)
  }

  const handlePress = () => {
    if (haptic === 'impact') hapticImpact()
    else if (haptic === 'selection') hapticSelection()
    onPress()
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      testID={testID}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  )
}
