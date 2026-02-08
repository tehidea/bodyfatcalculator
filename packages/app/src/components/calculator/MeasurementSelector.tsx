import { Text } from '@rneui/themed'
import type React from 'react'
import { Keyboard, StyleSheet, TouchableOpacity, View, type ViewStyle } from 'react-native'
import { COLORS } from '../../constants/theme'
import type { MeasurementSystem } from '../../schemas/calculator'
import { useCalculatorStore } from '../../store/calculatorStore'
import { useResponsive } from '../../utils/responsiveContext'

interface MeasurementSelectorProps {
  style?: ViewStyle
}

export const MeasurementSelector: React.FC<MeasurementSelectorProps> = ({ style, ...props }) => {
  const { measurementSystem, setMeasurementSystem, setResults } = useCalculatorStore()
  const { getResponsiveTypography, getLineHeight } = useResponsive()

  // Create styles with responsive values
  const styles = createStyles(getResponsiveTypography, getLineHeight)

  const handleSystemChange = (newSystem: MeasurementSystem) => {
    // Dismiss keyboard and blur any focused inputs
    Keyboard.dismiss()

    // Give time for the blur to complete
    setTimeout(() => {
      setMeasurementSystem(newSystem)
      setResults(null)
    }, 50)
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.toggle, measurementSystem === 'metric' && styles.activeToggle]}
        onPress={() => handleSystemChange('metric')}
      >
        <Text style={[styles.text, measurementSystem === 'metric' && styles.activeText]}>
          kg/cm
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggle, measurementSystem === 'imperial' && styles.activeToggle]}
        onPress={() => handleSystemChange('imperial')}
      >
        <Text style={[styles.text, measurementSystem === 'imperial' && styles.activeText]}>
          lb/in
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#444',
      borderRadius: 12,
      padding: 2,
      alignSelf: 'center',
      marginBottom: 16,
    },
    toggle: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    activeToggle: {
      backgroundColor: COLORS.primary,
    },
    text: {
      color: '#fff',
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
    },
    activeText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  })
