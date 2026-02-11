import { Text } from '@rneui/themed'
import { memo } from 'react'
import { View } from 'react-native'
import Logo from '../images/logo'
import { useResponsive } from '../utils/responsiveContext'
import { createBrandHeaderStyles, getLogoSize } from './BrandHeader.styles'

interface BrandHeaderProps {
  title?: string
  variant?: 'full' | 'compact'
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export const BrandHeader = memo(
  ({ title, variant = 'full', leftElement, rightElement }: BrandHeaderProps) => {
    const { getResponsiveSpacing, getResponsiveTypography, getLineHeight } = useResponsive()
    const styles = createBrandHeaderStyles(
      getResponsiveSpacing,
      getResponsiveTypography,
      getLineHeight,
      variant,
    )

    const logoSvgSize = getLogoSize(getResponsiveTypography, variant)

    return (
      <View>
        <View style={styles.header}>
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
          <View style={styles.titleStrip}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        ) : null}
      </View>
    )
  },
)
