import { StyleSheet } from 'react-native'

export const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 32,
    },
    value: {
      fontSize: getResponsiveTypography('6xl'),
      lineHeight: getLineHeight('6xl'),
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    label: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255, 255, 255, 0.6)',
      fontFamily: 'Montserrat-Light',
      marginTop: 8,
    },
  })
