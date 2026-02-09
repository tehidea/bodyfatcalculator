import { StyleSheet } from 'react-native'
import { COLORS } from '../constants/theme'

export const createStyles = (
  getResponsiveSpacing: (base: number) => number,
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  deviceType: string,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    innerContainer: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    content: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    scrollContent: {
      flexGrow: 1,
      padding: getResponsiveSpacing(16),
      maxWidth: deviceType === 'tablet' || deviceType === 'desktop' ? 800 : undefined,
      alignSelf: 'center',
      width: '100%',
    },
    selectors: {
      marginBottom: getResponsiveSpacing(24),
    },
    description: {
      marginBottom: getResponsiveSpacing(16),
      padding: getResponsiveSpacing(12),
      backgroundColor: '#f5f5f5',
      borderRadius: 12,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: getResponsiveSpacing(24),
      marginBottom: getResponsiveSpacing(16),
    },
    buttonWrapperFullWidth: {
      width: '100%',
      borderRadius: 12,
      overflow: 'hidden',
    },
    resetLink: {
      paddingVertical: getResponsiveSpacing(12),
    },
    resetLinkText: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontFamily: 'Montserrat-Light',
    },
    primaryButton: {
      paddingVertical: getResponsiveSpacing(12),
      paddingHorizontal: getResponsiveSpacing(24),
      borderRadius: 10,
      backgroundColor: COLORS.primary,
    },
    primaryButtonText: {
      color: COLORS.white,
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: 'bold',
    },
    disabledButton: {
      paddingVertical: getResponsiveSpacing(12),
      paddingHorizontal: getResponsiveSpacing(24),
      borderRadius: 10,
      backgroundColor: `${COLORS.primary}80`,
    },
    buttonTitle: {
      fontWeight: 'bold',
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
    },
    outlineButtonTitle: {
      color: COLORS.primary,
      fontWeight: 'bold',
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
    },
    errorContainer: {
      borderWidth: 2,
      borderColor: '#c62828',
      padding: getResponsiveSpacing(12),
      borderRadius: 12,
      marginBottom: getResponsiveSpacing(16),
    },
    errorText: {
      color: '#c62828',
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: 'bold',
    },
    versionText: {
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      marginTop: getResponsiveSpacing(32),
      marginBottom: getResponsiveSpacing(8),
      fontFamily: 'Montserrat-Light',
    },
    toolbarContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f8f8f8',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#d8d8d8',
    },
    referencesContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 12,
      padding: getResponsiveSpacing(12),
      marginTop: getResponsiveSpacing(24),
    },
    referenceTitle: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '600',
      marginBottom: getResponsiveSpacing(4),
    },
    referenceCitation: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: 'rgba(255, 255, 255, 0.3)',
      marginBottom: getResponsiveSpacing(4),
      textAlign: 'center',
    },
    referenceDoi: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: COLORS.textLight,
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
  })

// Legacy export for backward compatibility
export const styles = createStyles(
  () => 16,
  () => 16,
  () => 20,
  'phone',
)
