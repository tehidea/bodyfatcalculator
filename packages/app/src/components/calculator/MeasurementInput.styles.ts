import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants/theme'

export const createStyles = (
  getResponsiveSpacing: (base: number) => number,
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
) =>
  StyleSheet.create({
    container: {
      marginBottom: getResponsiveSpacing(16),
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: getResponsiveSpacing(8),
    },
    label: {
      color: COLORS.text,
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 12,
      paddingHorizontal: getResponsiveSpacing(12),
      gap: getResponsiveSpacing(8),
      height: getResponsiveSpacing(40),
    },
    iconContainer: {
      width: getResponsiveSpacing(18),
      height: getResponsiveSpacing(18),
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    input: {
      flex: 1,
      height: getResponsiveSpacing(40),
      color: COLORS.textDark,
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
    },
    inputError: {
      borderColor: COLORS.error,
      borderWidth: 1,
    },
    unit: {
      color: COLORS.textDark,
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
    },
    errorContainer: {
      overflow: 'hidden',
    },
    error: {
      color: COLORS.error,
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      marginTop: getResponsiveSpacing(4),
    },
  })

// Legacy export for backward compatibility
export const styles = createStyles(
  () => 16,
  () => 16,
  () => 20,
)
