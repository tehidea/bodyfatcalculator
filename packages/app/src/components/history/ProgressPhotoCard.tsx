import { Icon } from '@rneui/themed'
import { useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useProgressPhoto } from '../../hooks/useProgressPhoto'
import { useResponsive } from '../../utils/responsiveContext'

interface ProgressPhotoCardProps {
  clientId: string
}

export function ProgressPhotoCard({ clientId }: ProgressPhotoCardProps) {
  const { hasPhoto, isProcessing, promptAddPhoto } = useProgressPhoto(clientId)
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)

  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(
      1200,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }),
    )
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  // Don't show if photo already added
  if (hasPhoto) return null

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.card}
        onPress={promptAddPhoto}
        activeOpacity={0.7}
        disabled={isProcessing}
      >
        <Icon name="camera" type="feather" color="rgba(255,255,255,0.4)" size={16} />
        <Animated.Text style={styles.text}>
          {isProcessing ? 'Processing...' : 'Add Progress Photo'}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: getResponsiveSpacing(6),
      paddingVertical: getResponsiveSpacing(10),
      paddingHorizontal: getResponsiveSpacing(16),
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderRadius: 12,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(255,255,255,0.08)',
    },
    text: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.4)',
    },
  })
