import { StyleSheet } from 'react-native'
import { COLORS } from '../constants/theme'

export const createBrandHeaderStyles = (
  getResponsiveSpacing: (base: number) => number,
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  variant: 'full' | 'compact',
) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      padding: getResponsiveSpacing(variant === 'full' ? 16 : 12),
      borderBottomWidth: 2,
      borderBottomColor: COLORS.primary,
    },
    logo: {
      width: getResponsiveSpacing(variant === 'full' ? 60 : 38),
      aspectRatio: 1,
      marginRight: getResponsiveSpacing(8),
    },
    headerTextContainer: {
      flex: 1,
    },
    titleContainer: {
      flexDirection: 'row',
    },
    headerTitle: {
      fontSize: getResponsiveTypography(variant === 'full' ? '5xl' : '3xl'),
      lineHeight: getLineHeight(variant === 'full' ? '5xl' : '3xl'),
      color: COLORS.black,
      textTransform: 'uppercase',
      letterSpacing: variant === 'full' ? -2 : -1.5,
      paddingRight: 2,
      marginTop: variant === 'full' ? -6 : -4,
    },
    subtitle: {
      fontSize: getResponsiveTypography('xxxs'),
      lineHeight: getLineHeight('xxxs'),
      color: COLORS.black,
      marginTop: variant === 'full' ? -6 : -4,
      marginLeft: getResponsiveSpacing(4),
      fontFamily: 'Montserrat-Light',
      textTransform: 'uppercase',
    },
    rightElement: {
      marginLeft: 'auto',
    },
  })
