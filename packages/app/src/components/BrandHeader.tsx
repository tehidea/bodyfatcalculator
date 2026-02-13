import { Text } from '@rneui/themed'
import { memo } from 'react'
import { View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import Logo from '../images/logo'
import { useResponsive } from '../utils/responsiveContext'
import { createBrandHeaderStyles, getLogoSize } from './BrandHeader.styles'

interface BrandHeaderProps {
  title?: string
  variant?: 'full' | 'compact'
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
  scrollY?: SharedValue<number> | undefined
}

export const BrandHeader = memo(
  ({ title, variant = 'full', leftElement, rightElement, scrollY }: BrandHeaderProps) => {
    const { getResponsiveSpacing, getResponsiveTypography, getLineHeight } = useResponsive()
    const styles = createBrandHeaderStyles(
      getResponsiveSpacing,
      getResponsiveTypography,
      getLineHeight,
      variant,
    )

    const logoSvgSize = getLogoSize(getResponsiveTypography, variant)

    const titleStripHeight = useSharedValue(0)

    const animatedTitleStyle = useAnimatedStyle(() => {
      if (!scrollY) return {}
      const h = titleStripHeight.value
      if (h === 0) return {}
      return {
        // Slide up behind the logo bar — completes in 20px of scroll
        marginTop: interpolate(scrollY.value, [0, 20], [0, -h], Extrapolation.CLAMP),
        // Fade out slightly ahead so strip is invisible before layout finishes collapsing
        opacity: interpolate(scrollY.value, [0, 14], [1, 0], Extrapolation.CLAMP),
      }
    })

    return (
      <View>
        <View style={[styles.header, scrollY != null && { zIndex: 1 }]}>
          {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
          <View style={styles.topRow}>
            <Logo
              style={styles.logo}
              width={logoSvgSize}
              height={logoSvgSize}
              accessibilityLabel="Calculator logo"
            />
            <View style={styles.titleContainer}>
              <Text
                style={[styles.headerTitle, { fontFamily: 'Montserrat-Light', fontWeight: 300 }]}
              >
                Body
              </Text>
              <Text
                style={[styles.headerTitle, { fontFamily: 'Montserrat-Regular', fontWeight: 400 }]}
              >
                Fat
              </Text>
            </View>
          </View>
          {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
        </View>
        {title ? (
          scrollY ? (
            <Animated.View
              style={[styles.titleStrip, animatedTitleStyle]}
              onLayout={(e) => {
                titleStripHeight.value = e.nativeEvent.layout.height
              }}
            >
              <Text style={styles.titleText}>{title}</Text>
            </Animated.View>
          ) : (
            <View style={styles.titleStrip}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
          )
        ) : null}
      </View>
    )
  },
)
