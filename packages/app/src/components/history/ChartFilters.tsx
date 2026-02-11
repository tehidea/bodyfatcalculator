import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import type { Formula } from '@bodyfat/shared/types'
import { Text } from '@rneui/themed'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/theme'
import type { SecondaryMetric, TimeRange } from '../../hooks/useChartData'
import { hapticSelection } from '../../utils/haptics'
import { useResponsive } from '../../utils/responsiveContext'

const TIME_RANGES: { key: TimeRange; label: string }[] = [
  { key: '30d', label: '30d' },
  { key: '90d', label: '90d' },
  { key: '1y', label: '1y' },
  { key: 'all', label: 'All' },
]

const SECONDARY_METRICS: { key: SecondaryMetric; label: string }[] = [
  { key: 'weight', label: 'Weight' },
  { key: 'fatMass', label: 'Fat Mass' },
  { key: 'leanMass', label: 'Lean Mass' },
  { key: 'waistCircumference', label: 'Waist' },
]

// --- ChartTimeFilters: time range pills + formula filter pills ---

interface ChartTimeFiltersProps {
  selectedTimeRange: TimeRange
  onSelectTimeRange: (range: TimeRange) => void
  selectedFormula: Formula | 'all'
  onSelectFormula: (formula: Formula | 'all') => void
  availableFormulas: Formula[]
}

export function ChartTimeFilters({
  selectedTimeRange,
  onSelectTimeRange,
  selectedFormula,
  onSelectFormula,
  availableFormulas,
}: ChartTimeFiltersProps) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)

  return (
    <View style={styles.container}>
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

      {availableFormulas.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillRow}
        >
          <TouchableOpacity
            style={[styles.pill, selectedFormula === 'all' && styles.pillActive]}
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
                style={[styles.pill, active && styles.pillActive]}
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

// --- ChartMetricPills: secondary metric pills ---

interface ChartMetricPillsProps {
  selectedMetric: SecondaryMetric
  onSelectMetric: (metric: SecondaryMetric) => void
  availableMetrics: Set<SecondaryMetric>
}

export function ChartMetricPills({
  selectedMetric,
  onSelectMetric,
  availableMetrics,
}: ChartMetricPillsProps) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)

  const visibleMetrics = SECONDARY_METRICS.filter((m) => availableMetrics.has(m.key))

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
            style={[styles.pill, active && styles.pillActive]}
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

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    container: {
      gap: getResponsiveSpacing(8),
    },
    pillRow: {
      flexDirection: 'row',
      gap: getResponsiveSpacing(6),
      paddingHorizontal: getResponsiveSpacing(4),
    },
    pill: {
      paddingVertical: getResponsiveSpacing(6),
      paddingHorizontal: getResponsiveSpacing(12),
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    pillActive: {
      backgroundColor: COLORS.primary,
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
      gap: getResponsiveSpacing(4),
      paddingHorizontal: getResponsiveSpacing(4),
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
