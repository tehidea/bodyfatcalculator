import type { Formula } from '@bodyfat/shared/types'
import { Icon, Text } from '@rneui/themed'
import { useMemo, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { COLORS } from '../../constants/theme'
import {
  type ChartDataPoint,
  type ChartMetric,
  type ChartStats,
  type SecondaryMetric,
  type TimeRange,
  useChartData,
} from '../../hooks/useChartData'
import { useCalculatorStore } from '../../store/calculatorStore'
import type { MeasurementRecord } from '../../store/historyStore'
import { useResponsive } from '../../utils/responsiveContext'
import { ChartMetricPills, ChartTimeFilters } from './ChartFilters'

const METRIC_UNITS: Record<ChartMetric, { metric: string; imperial: string }> = {
  bodyFatPercentage: { metric: '%', imperial: '%' },
  fatMass: { metric: 'kg', imperial: 'lbs' },
  leanMass: { metric: 'kg', imperial: 'lbs' },
  weight: { metric: 'kg', imperial: 'lbs' },
  waistCircumference: { metric: 'cm', imperial: 'in' },
}

interface ProgressChartProps {
  measurements: MeasurementRecord[]
}

export function ProgressChart({ measurements }: ProgressChartProps) {
  const { measurementSystem } = useCalculatorStore()
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing, width } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)

  const [selectedSecondaryMetric, setSelectedSecondaryMetric] = useState<SecondaryMetric>('weight')
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('90d')
  const [selectedFormula, setSelectedFormula] = useState<Formula | 'all'>('all')

  const bfData = useChartData(
    measurements,
    'bodyFatPercentage',
    selectedTimeRange,
    selectedFormula,
    measurementSystem,
  )

  const secondaryData = useChartData(
    measurements,
    selectedSecondaryMetric,
    selectedTimeRange,
    selectedFormula,
    measurementSystem,
  )

  const availableSecondaryMetrics = useMemo(() => {
    const metrics = new Set<SecondaryMetric>()
    metrics.add('fatMass')
    metrics.add('leanMass')
    for (const m of measurements) {
      if (typeof m.inputs.weight === 'number') metrics.add('weight')
      if (typeof m.inputs.waistCircumference === 'number') metrics.add('waistCircumference')
    }
    return metrics
  }, [measurements])

  const chartHeight = Math.min(getResponsiveSpacing(160), 180)
  const chartWidth = width - getResponsiveSpacing(32) - 40

  const renderChart = (
    metric: ChartMetric,
    data: ChartDataPoint[],
    stats: ChartStats | null,
    color: string,
    unit: string,
    emptyMessage: string,
    emptySubtext?: string | undefined,
  ) => {
    if (data.length < 2) {
      return (
        <View style={styles.emptyChart}>
          <Icon name="bar-chart-2" type="feather" color="rgba(255,255,255,0.3)" size={32} />
          <Text style={styles.emptyText}>{emptyMessage}</Text>
          {emptySubtext && <Text style={styles.emptySubtext}>{emptySubtext}</Text>}
        </View>
      )
    }

    const labelInterval = data.length > 6 ? Math.ceil(data.length / 5) : 1
    const chartData = data.map((point, i) => ({
      value: point.value,
      label: i % labelInterval === 0 || i === data.length - 1 ? point.label : '',
    }))
    const spacing = data.length > 1 ? Math.max(chartWidth / (data.length - 1), 30) : 60
    const decimals = metric === 'bodyFatPercentage' ? 1 : 0

    return (
      <>
        <View style={styles.chartWrapper}>
          <LineChart
            data={chartData}
            curved
            color={color}
            thickness={2}
            dataPointsColor={color}
            dataPointsRadius={3}
            areaChart
            startFillColor={`${color}30`}
            endFillColor={`${color}05`}
            startOpacity={0.3}
            endOpacity={0.05}
            height={chartHeight}
            spacing={spacing}
            initialSpacing={10}
            endSpacing={30}
            noOfSections={4}
            yAxisColor="transparent"
            xAxisColor="rgba(255,255,255,0.1)"
            yAxisTextStyle={styles.axisText}
            xAxisLabelTextStyle={styles.axisText}
            rulesColor="rgba(255,255,255,0.06)"
            backgroundColor="transparent"
            hideRules={false}
            yAxisTextNumberOfLines={1}
            xAxisLabelsVerticalShift={2}
          />
        </View>
        {stats && (
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Latest</Text>
              <Text style={styles.statValue}>
                {stats.latest.toFixed(decimals)}
                {unit}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Change</Text>
              <Text
                style={[
                  styles.statValue,
                  stats.change < 0 && styles.statPositive,
                  stats.change > 0 && metric === 'bodyFatPercentage' && styles.statNegative,
                  stats.change < 0 &&
                    metric !== 'bodyFatPercentage' &&
                    metric !== 'waistCircumference' &&
                    styles.statNegative,
                ]}
              >
                {stats.change > 0 ? '+' : ''}
                {stats.change.toFixed(decimals)}
                {unit}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Min</Text>
              <Text style={styles.statValue}>
                {stats.min.toFixed(decimals)}
                {unit}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Max</Text>
              <Text style={styles.statValue}>
                {stats.max.toFixed(decimals)}
                {unit}
              </Text>
            </View>
          </View>
        )}
      </>
    )
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ChartTimeFilters
        selectedTimeRange={selectedTimeRange}
        onSelectTimeRange={setSelectedTimeRange}
        selectedFormula={selectedFormula}
        onSelectFormula={setSelectedFormula}
        availableFormulas={bfData.availableFormulas}
      />

      <Text style={styles.sectionLabel}>Body Fat %</Text>
      {renderChart(
        'bodyFatPercentage',
        bfData.data,
        bfData.stats,
        COLORS.primary,
        '%',
        'Not enough data',
        'Record at least 2 measurements to see your progress',
      )}

      <ChartMetricPills
        selectedMetric={selectedSecondaryMetric}
        onSelectMetric={setSelectedSecondaryMetric}
        availableMetrics={availableSecondaryMetrics}
      />
      {renderChart(
        selectedSecondaryMetric,
        secondaryData.data,
        secondaryData.stats,
        '#4A9EFF',
        METRIC_UNITS[selectedSecondaryMetric][measurementSystem],
        'No data for this metric',
      )}
    </ScrollView>
  )
}

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    container: {
      gap: getResponsiveSpacing(12),
      paddingTop: getResponsiveSpacing(8),
      paddingBottom: getResponsiveSpacing(16),
    },
    sectionLabel: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontWeight: '600',
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    chartWrapper: {
      marginHorizontal: -getResponsiveSpacing(8),
      overflow: 'hidden',
    },
    axisText: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: 10,
    },
    emptyChart: {
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      gap: getResponsiveSpacing(8),
    },
    emptyText: {
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      fontWeight: '600',
      color: 'rgba(255,255,255,0.6)',
    },
    emptySubtext: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.4)',
      textAlign: 'center',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: 12,
      paddingVertical: getResponsiveSpacing(12),
      paddingHorizontal: getResponsiveSpacing(8),
    },
    stat: {
      alignItems: 'center',
      gap: getResponsiveSpacing(2),
    },
    statLabel: {
      fontSize: getResponsiveTypography('xxs'),
      lineHeight: getLineHeight('xxs'),
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    statValue: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: '600',
      color: '#fff',
    },
    statPositive: {
      color: COLORS.success,
    },
    statNegative: {
      color: COLORS.error,
    },
  })
