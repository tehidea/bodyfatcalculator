import type { Formula } from '@bodyfat/shared/types'
import { Icon, Text } from '@rneui/themed'
import { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { COLORS } from '../../constants/theme'
import {
	type ChartDataPoint,
	type ChartMetric,
	type ChartStats,
	type TimeRange,
	useChartData,
} from '../../hooks/useChartData'
import { useCalculatorStore } from '../../store/calculatorStore'
import type { MeasurementRecord } from '../../store/historyStore'
import { useResponsive } from '../../utils/responsiveContext'
import { ChartControls, METRIC_COLORS, UnifiedMetricPills } from './ChartFilters'

const METRIC_UNITS: Record<ChartMetric, { metric: string; imperial: string }> = {
	bodyFatPercentage: { metric: '%', imperial: '%' },
	fatMass: { metric: 'kg', imperial: 'lbs' },
	leanMass: { metric: 'kg', imperial: 'lbs' },
	weight: { metric: 'kg', imperial: 'lbs' },
	waistCircumference: { metric: 'cm', imperial: 'in' },
}

interface ChartSectionProps {
	measurements: MeasurementRecord[]
}

export function ChartSection({ measurements }: ChartSectionProps) {
	const { measurementSystem } = useCalculatorStore()
	const { getResponsiveTypography, getLineHeight, getResponsiveSpacing, width } = useResponsive()
	const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)

	const [selectedMetric, setSelectedMetric] = useState<ChartMetric>('bodyFatPercentage')
	const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('90d')
	const [selectedFormula, setSelectedFormula] = useState<Formula | 'all'>('all')

	const effectiveFormula = selectedMetric === 'bodyFatPercentage' ? selectedFormula : 'all'

	const chartData = useChartData(
		measurements,
		selectedMetric,
		selectedTimeRange,
		effectiveFormula,
		measurementSystem,
	)

	const availableMetrics = useMemo(() => {
		const metrics = new Set<ChartMetric>()
		metrics.add('bodyFatPercentage')
		metrics.add('fatMass')
		metrics.add('leanMass')
		for (const m of measurements) {
			if (typeof m.inputs.weight === 'number') metrics.add('weight')
			if (typeof m.inputs.waistCircumference === 'number') metrics.add('waistCircumference')
		}
		return metrics
	}, [measurements])

	const chartColor = METRIC_COLORS[selectedMetric]
	const unit = METRIC_UNITS[selectedMetric][measurementSystem]
	const chartHeight = Math.min(getResponsiveSpacing(160), 180)
	const chartWidth = width - getResponsiveSpacing(64) - 40

	const showFormulaFilter =
		selectedMetric === 'bodyFatPercentage' && chartData.availableFormulas.length > 1

	const renderChart = (data: ChartDataPoint[], stats: ChartStats | null) => {
		if (data.length < 2) {
			return (
				<View style={styles.emptyChart}>
					<Icon
						name="bar-chart-2"
						type="feather"
						color="rgba(255,255,255,0.3)"
						size={32}
					/>
					<Text style={styles.emptyText}>Not enough data</Text>
					<Text style={styles.emptySubtext}>
						Record at least 2 measurements to see your progress
					</Text>
				</View>
			)
		}

		const labelInterval = data.length > 6 ? Math.ceil(data.length / 5) : 1
		const chartPoints = data.map((point, i) => ({
			value: point.value,
			label: i % labelInterval === 0 || i === data.length - 1 ? point.label : '',
		}))
		const spacing = data.length > 1 ? Math.max(chartWidth / (data.length - 1), 30) : 60
		const decimals = selectedMetric === 'bodyFatPercentage' ? 1 : 0

		return (
			<>
				<View style={styles.chartWrapper}>
					<LineChart
						data={chartPoints}
						curved
						color={chartColor}
						thickness={2}
						dataPointsColor={chartColor}
						dataPointsRadius={3}
						areaChart
						startFillColor={`${chartColor}30`}
						endFillColor={`${chartColor}05`}
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
									stats.change > 0 &&
										selectedMetric === 'bodyFatPercentage' &&
										styles.statNegative,
									stats.change < 0 &&
										selectedMetric !== 'bodyFatPercentage' &&
										selectedMetric !== 'waistCircumference' &&
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
		<View style={styles.sectionContainer}>
			<UnifiedMetricPills
				selectedMetric={selectedMetric}
				onSelectMetric={setSelectedMetric}
				availableMetrics={availableMetrics}
			/>

			<ChartControls
				selectedTimeRange={selectedTimeRange}
				onSelectTimeRange={setSelectedTimeRange}
				selectedFormula={selectedFormula}
				onSelectFormula={setSelectedFormula}
				availableFormulas={chartData.availableFormulas}
				showFormulaFilter={showFormulaFilter}
			/>

			{renderChart(chartData.data, chartData.stats)}
		</View>
	)
}

const createStyles = (
	getResponsiveTypography: (size: any) => number,
	getLineHeight: (size: any) => number,
	getResponsiveSpacing: (base: number) => number,
) =>
	StyleSheet.create({
		sectionContainer: {
			backgroundColor: 'rgba(255,255,255,0.04)',
			borderRadius: 16,
			padding: getResponsiveSpacing(16),
			gap: getResponsiveSpacing(12),
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
