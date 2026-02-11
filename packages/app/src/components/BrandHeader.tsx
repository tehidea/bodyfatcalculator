import { Text } from '@rneui/themed'
import { memo } from 'react'
import { View } from 'react-native'
import Logo from '../images/logo'
import { useResponsive } from '../utils/responsiveContext'
import { createBrandHeaderStyles } from './BrandHeader.styles'

interface BrandHeaderProps {
  subtitle: string
  variant?: 'full' | 'compact'
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export const BrandHeader = memo(
  ({ subtitle, variant = 'full', leftElement, rightElement }: BrandHeaderProps) => {
    const { getResponsiveSpacing, getResponsiveTypography, getLineHeight } = useResponsive()
    const styles = createBrandHeaderStyles(
      getResponsiveSpacing,
      getResponsiveTypography,
      getLineHeight,
      variant,
    )

    const logoWidth = variant === 'full' ? 62 : 40

    return (
      <View style={styles.header}>
        {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
        <Logo style={styles.logo} width={logoWidth} accessibilityLabel="Calculator logo" />
        <View style={styles.headerTextContainer}>
          <View style={styles.titleContainer}>
            <Text
              style={[styles.headerTitle, { fontFamily: 'Montserrat-ExtraLight', fontWeight: 200 }]}
            >
              Body
            </Text>
            <Text style={[styles.headerTitle, { fontFamily: 'Montserrat-Light', fontWeight: 300 }]}>
              Fat
            </Text>
          </View>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
      </View>
    )
  },
)
