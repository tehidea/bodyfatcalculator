import { StyleSheet } from 'react-native'
import { COLORS } from '../constants/theme'

export const createBrandHeaderStyles = (
  getResponsiveSpacing: (base: number) => number,
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  variant: 'full' | 'compact',
) => {
  // Derive all logo proportions from the font size so they scale uniformly
  // across phone and iPad (both use getResponsiveTypography's single scale factor)
  const fontSize = getResponsiveTypography(variant === 'full' ? '5xl' : '3xl')
  const logoSize = Math.round(fontSize * 1.25)
  const titleHeight = Math.round(fontSize * 1.1)
  const logoGap = Math.round(fontSize * 0.3)

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.white,
      padding: getResponsiveSpacing(variant === 'full' ? 16 : 12),
      borderBottomWidth: 2,
      borderBottomColor: COLORS.primary,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      height: logoSize,
      width: logoSize,
      marginRight: logoGap,
    },
    titleContainer: {
      flexDirection: 'row',
      height: titleHeight,
      alignItems: 'center',
      overflow: 'hidden',
    },
    headerTitle: {
      fontSize,
      lineHeight: getLineHeight(variant === 'full' ? '5xl' : '3xl'),
      color: COLORS.black,
      textTransform: 'uppercase',
      letterSpacing: variant === 'full' ? -2 : -1.5,
      paddingRight: 2,
    },
    titleStrip: {
      backgroundColor: COLORS.white,
      paddingVertical: getResponsiveSpacing(6),
      paddingHorizontal: getResponsiveSpacing(16),
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    titleText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: COLORS.black,
      fontFamily: 'Montserrat-Regular',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    leftElement: {
      position: 'absolute' as const,
      left: getResponsiveSpacing(variant === 'full' ? 16 : 12),
      zIndex: 1,
    },
    rightElement: {
      position: 'absolute' as const,
      right: getResponsiveSpacing(variant === 'full' ? 16 : 12),
      zIndex: 1,
    },
  })
}

/** Returns the logo SVG size for the given variant (matches styles.logo dimensions) */
export const getLogoSize = (
  getResponsiveTypography: (size: any) => number,
  variant: 'full' | 'compact',
) => Math.round(getResponsiveTypography(variant === 'full' ? '5xl' : '3xl') * 1.25)
