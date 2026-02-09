import { StyleSheet } from 'react-native'

export const createStyles = (
  getResponsiveSpacing: (base: number) => number,
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  width: number,
) =>
  StyleSheet.create({
    // Outer wrapper: holds shadow + animation (excluded from capture)
    cardShadow: {
      marginTop: getResponsiveSpacing(20),
      width: width - 32,
      alignSelf: 'center' as const,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
    },
    // Inner card: capture target
    card: {
      backgroundColor: '#2A2A2A',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.06)',
      padding: getResponsiveSpacing(24),
      overflow: 'hidden' as const,
    },

    // Card title
    cardTitle: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.5)',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 2.5,
      marginBottom: getResponsiveSpacing(8),
    },

    // Arc gauge section
    gaugeContainer: {
      alignItems: 'center',
      marginBottom: getResponsiveSpacing(8),
    },
    gaugeOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Body fat percentage (inside gauge)
    mainValueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
    },
    mainValueWhole: {
      fontSize: getResponsiveTypography('5xl'),
      lineHeight: getLineHeight('5xl'),
      fontFamily: 'Montserrat-ExtraLight',
      color: '#FFFFFF',
    },
    mainValueDecimal: {
      fontSize: getResponsiveTypography('3xl'),
      lineHeight: getLineHeight('3xl'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.6)',
    },
    mainValuePercent: {
      fontSize: getResponsiveTypography('3xl'),
      lineHeight: getLineHeight('3xl'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.6)',
    },

    // Classification label (inside gauge, below number)
    classification: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontFamily: 'Montserrat-Light',
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginTop: getResponsiveSpacing(4),
    },

    // Margin of error / premium badge (below gauge)
    marginOfError: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.4)',
      textAlign: 'center',
      marginBottom: getResponsiveSpacing(16),
    },
    premiumBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.08)',
      paddingHorizontal: getResponsiveSpacing(10),
      paddingVertical: getResponsiveSpacing(5),
      borderRadius: 12,
      alignSelf: 'center',
      marginBottom: getResponsiveSpacing(16),
      gap: getResponsiveSpacing(4),
    },
    premiumBadgeText: {
      fontSize: getResponsiveTypography('xxxs'),
      lineHeight: getLineHeight('xxxs'),
      fontFamily: 'Montserrat-Regular',
      color: 'rgba(255,255,255,0.5)',
    },

    // Breakdown section
    breakdownContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      marginBottom: getResponsiveSpacing(16),
    },
    breakdownColumn: {
      flex: 1,
    },
    breakdownBar: {
      height: 4,
      borderRadius: 2,
      marginBottom: getResponsiveSpacing(10),
      overflow: 'hidden',
    },
    breakdownBarFill: {
      height: '100%',
      borderRadius: 2,
    },
    breakdownValue: {
      fontSize: getResponsiveTypography('xl'),
      lineHeight: getLineHeight('xl'),
      fontFamily: 'Montserrat-Regular',
      color: '#FFFFFF',
      marginBottom: getResponsiveSpacing(2),
    },
    breakdownLabel: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: getResponsiveSpacing(2),
    },
    breakdownPercentage: {
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      fontFamily: 'Montserrat-ExtraLight',
      color: 'rgba(255,255,255,0.4)',
    },
    divider: {
      width: 1,
      backgroundColor: 'rgba(255,255,255,0.08)',
      marginHorizontal: getResponsiveSpacing(16),
    },

    // Footer
    footerContainer: {
      alignItems: 'center',
      gap: getResponsiveSpacing(8),
    },
    formulaName: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.4)',
      textAlign: 'center',
    },
    savedIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: getResponsiveSpacing(6),
    },
    savedText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontFamily: 'Montserrat-Light',
      color: '#4CAF50',
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: getResponsiveSpacing(6),
      paddingHorizontal: getResponsiveSpacing(12),
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius: 12,
      gap: getResponsiveSpacing(4),
    },
    saveButtonText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.5)',
    },
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: getResponsiveSpacing(10),
    },
    shareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: getResponsiveSpacing(6),
      paddingHorizontal: getResponsiveSpacing(12),
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius: 12,
      gap: getResponsiveSpacing(4),
    },
    shareButtonText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.5)',
    },

    // Branding strip (visible in share snapshots)
    brandingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: getResponsiveSpacing(12),
      paddingTop: getResponsiveSpacing(12),
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.06)',
      gap: getResponsiveSpacing(6),
    },
    brandingUrl: {
      fontSize: getResponsiveTypography('xxs'),
      lineHeight: getLineHeight('xxs'),
      fontFamily: 'Montserrat-Light',
      color: 'rgba(255,255,255,0.35)',
    },
  })
