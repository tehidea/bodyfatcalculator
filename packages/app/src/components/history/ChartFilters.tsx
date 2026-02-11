import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import type { Formula } from '@bodyfat/shared/types'
import { Icon, Text } from '@rneui/themed'
import { useState } from 'react'
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/theme'
import type { ChartMetric, TimeRange } from '../../hooks/useChartData'
import { hapticSelection } from '../../utils/haptics'
import { useResponsive } from '../../utils/responsiveContext'

export const METRIC_COLORS: Record<ChartMetric, string> = {
  bodyFatPercentage: COLORS.primary,
  weight: '#4A9EFF',
  fatMass: '#FF9800',
  leanMass: '#4CAF50',
  waistCircumference: '#9C27B0',
}

const METRIC_OPTIONS: { key: ChartMetric; label: string }[] = [
  { key: 'bodyFatPercentage', label: 'Body Fat %' },
  { key: 'weight', label: 'Weight' },
  { key: 'fatMass', label: 'Fat Mass' },
  { key: 'leanMass', label: 'Lean Mass' },
  { key: 'waistCircumference', label: 'Waist' },
]

const TIME_RANGES: { key: TimeRange; label: string }[] = [
  { key: '30d', label: '30d' },
  { key: '90d', label: '90d' },
  { key: '1y', label: '1y' },
  { key: 'all', label: 'All' },
]

// --- UnifiedMetricPills: all metrics in a wrapping row ---

interface UnifiedMetricPillsProps {
  selectedMetric: ChartMetric
  onSelectMetric: (metric: ChartMetric) => void
  availableMetrics: Set<ChartMetric>
}

export function UnifiedMetricPills({
  selectedMetric,
  onSelectMetric,
  availableMetrics,
}: UnifiedMetricPillsProps) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const activeColor = METRIC_COLORS[selectedMetric]

  const visibleMetrics = METRIC_OPTIONS.filter((m) => availableMetrics.has(m.key))

  return (
    <View style={styles.pillRow}>
      {visibleMetrics.map((metric) => {
        const active = selectedMetric === metric.key
        return (
          <TouchableOpacity
            key={metric.key}
            style={[styles.pill, active && { backgroundColor: activeColor }]}
            onPress={() => {
              hapticSelection()
              onSelectMetric(metric.key)
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.pillText, active && styles.pillTextActive]}>{metric.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

// --- ChartControls: time range + conditional formula dropdown ---

interface ChartControlsProps {
  selectedTimeRange: TimeRange
  onSelectTimeRange: (range: TimeRange) => void
  selectedFormula: Formula | 'all'
  onSelectFormula: (formula: Formula | 'all') => void
  availableFormulas: Formula[]
  showFormulaFilter: boolean
}

export function ChartControls({
  selectedTimeRange,
  onSelectTimeRange,
  selectedFormula,
  onSelectFormula,
  availableFormulas,
  showFormulaFilter,
}: ChartControlsProps) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const [formulaModalVisible, setFormulaModalVisible] = useState(false)

  const formulaLabel =
    selectedFormula === 'all'
      ? 'All formulas'
      : (FORMULA_DEFINITIONS[selectedFormula]?.name ?? selectedFormula)

  const handleFormulaSelect = (formula: Formula | 'all') => {
    hapticSelection()
    onSelectFormula(formula)
    setFormulaModalVisible(false)
  }

  return (
    <View style={styles.controlsContainer}>
      <View style={styles.controlsRow}>
        {showFormulaFilter && availableFormulas.length > 1 && (
          <TouchableOpacity
            style={styles.formulaTrigger}
            onPress={() => {
              hapticSelection()
              setFormulaModalVisible(true)
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.formulaTriggerText} numberOfLines={1}>
              {formulaLabel}
            </Text>
            <Icon name="chevron-down" type="feather" color="rgba(255,255,255,0.5)" size={14} />
          </TouchableOpacity>
        )}

        <View style={styles.timeRangeRow}>
          {TIME_RANGES.map((range) => {
            const active = selectedTimeRange === range.key
            return (
              <TouchableOpacity
                key={range.key}
                style={[styles.timePill, active && styles.timePillActive]}
                onPress={() => {
                  hapticSelection()
                  onSelectTimeRange(range.key)
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.timePillText, active && styles.timePillTextActive]}>
                  {range.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      {showFormulaFilter && availableFormulas.length > 1 && (
        <Modal
          visible={formulaModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setFormulaModalVisible(false)}
        >
          <Pressable
            style={styles.formulaModalOverlay}
            onPress={() => setFormulaModalVisible(false)}
          >
            <View style={styles.formulaModalContent} onStartShouldSetResponder={() => true}>
              <TouchableOpacity
                style={[
                  styles.formulaOption,
                  selectedFormula === 'all' && styles.formulaOptionActive,
                ]}
                onPress={() => handleFormulaSelect('all')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.formulaOptionText,
                    selectedFormula === 'all' && styles.formulaOptionTextActive,
                  ]}
                >
                  All formulas
                </Text>
                {selectedFormula === 'all' && (
                  <Icon name="check" type="feather" color={COLORS.primary} size={16} />
                )}
              </TouchableOpacity>
              {availableFormulas.map((f) => {
                const active = selectedFormula === f
                const def = FORMULA_DEFINITIONS[f]
                return (
                  <TouchableOpacity
                    key={f}
                    style={[styles.formulaOption, active && styles.formulaOptionActive]}
                    onPress={() => handleFormulaSelect(f)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[styles.formulaOptionText, active && styles.formulaOptionTextActive]}
                    >
                      {def?.name ?? f}
                    </Text>
                    {active && (
                      <Icon name="check" type="feather" color={COLORS.primary} size={16} />
                    )}
                  </TouchableOpacity>
                )
              })}
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  )
}

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    controlsContainer: {
      gap: getResponsiveSpacing(8),
    },
    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pillRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: getResponsiveSpacing(6),
    },
    pill: {
      paddingVertical: getResponsiveSpacing(6),
      paddingHorizontal: getResponsiveSpacing(12),
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    pillText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: 'rgba(255,255,255,0.6)',
      fontWeight: '500',
    },
    pillTextActive: {
      color: '#fff',
      fontWeight: '600',
    },
    timeRangeRow: {
      flexDirection: 'row',
      marginLeft: 'auto',
      gap: getResponsiveSpacing(4),
    },
    timePill: {
      paddingVertical: getResponsiveSpacing(4),
      paddingHorizontal: getResponsiveSpacing(10),
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    timePillActive: {
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
    timePillText: {
      fontSize: getResponsiveTypography('xxs'),
      lineHeight: getLineHeight('xxs'),
      color: 'rgba(255,255,255,0.5)',
      fontWeight: '500',
    },
    timePillTextActive: {
      color: '#fff',
      fontWeight: '600',
    },
    formulaTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(4),
      paddingVertical: getResponsiveSpacing(4),
      paddingHorizontal: getResponsiveSpacing(10),
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    formulaTriggerText: {
      fontSize: getResponsiveTypography('xxs'),
      lineHeight: getLineHeight('xxs'),
      color: 'rgba(255,255,255,0.7)',
      fontWeight: '500',
    },
    formulaModalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    formulaModalContent: {
      backgroundColor: '#2a2a2a',
      borderRadius: 16,
      paddingVertical: getResponsiveSpacing(8),
      minWidth: 220,
      maxWidth: 300,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 24,
      elevation: 20,
    },
    formulaOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing(12),
      paddingHorizontal: getResponsiveSpacing(16),
    },
    formulaOptionActive: {
      backgroundColor: 'rgba(255,255,255,0.06)',
    },
    formulaOptionText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.7)',
      fontWeight: '500',
    },
    formulaOptionTextActive: {
      color: '#fff',
      fontWeight: '600',
    },
  })
