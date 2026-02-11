import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import type { Formula } from '@bodyfat/shared/types'
import { Text } from '@rneui/themed'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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

// --- UnifiedMetricPills: all metrics in one row ---

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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.pillRow}
    >
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
    </ScrollView>
  )
}

// --- ChartControls: time range (right-aligned) + conditional formula pills ---

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

  return (
    <View style={styles.controlsContainer}>
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

      {showFormulaFilter && availableFormulas.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillRow}
        >
          <TouchableOpacity
            style={[styles.pill, selectedFormula === 'all' && styles.formulaPillActive]}
            onPress={() => {
              hapticSelection()
              onSelectFormula('all')
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.pillText, selectedFormula === 'all' && styles.pillTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          {availableFormulas.map((f) => {
            const active = selectedFormula === f
            const def = FORMULA_DEFINITIONS[f]
            return (
              <TouchableOpacity
                key={f}
                style={[styles.pill, active && styles.formulaPillActive]}
                onPress={() => {
                  hapticSelection()
                  onSelectFormula(f)
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>
                  {def?.name || f}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
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
    pillRow: {
      flexDirection: 'row',
      gap: getResponsiveSpacing(6),
    },
    pill: {
      paddingVertical: getResponsiveSpacing(6),
      paddingHorizontal: getResponsiveSpacing(12),
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    formulaPillActive: {
      backgroundColor: 'rgba(255,255,255,0.2)',
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
      justifyContent: 'flex-end',
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
  })
