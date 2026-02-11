import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import { Icon, Text } from '@rneui/themed'
import { useState } from 'react'
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BrandHeader } from '../components/BrandHeader'
import { PaywallModal } from '../components/calculator/PaywallModal'
import { ProgressChart } from '../components/history/ProgressChart'
import { COLORS } from '../constants/theme'
import { useCloudSync } from '../hooks/useCloudSync'
import type { MeasurementRecord } from '../store/historyStore'
import { useHistoryStore } from '../store/historyStore'
import { usePremiumStore } from '../store/premiumStore'
import { hapticSelection } from '../utils/haptics'
import { useResponsive } from '../utils/responsiveContext'

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getClassificationColor(bodyFat: number, gender: string): string {
  if (gender === 'male') {
    if (bodyFat < 6) return '#2196F3'
    if (bodyFat < 14) return '#4CAF50'
    if (bodyFat < 18) return '#8BC34A'
    if (bodyFat < 25) return '#FFC107'
    return '#FF5722'
  }
  if (bodyFat < 14) return '#2196F3'
  if (bodyFat < 21) return '#4CAF50'
  if (bodyFat < 25) return '#8BC34A'
  if (bodyFat < 32) return '#FFC107'
  return '#FF5722'
}

function MeasurementCard({
  record,
  onDelete,
}: {
  record: MeasurementRecord
  onDelete: (clientId: string) => void
}) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createCardStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const formulaDef = FORMULA_DEFINITIONS[record.formula]
  const color = getClassificationColor(record.bodyFatPercentage, record.gender)

  const handleDelete = () => {
    Alert.alert('Delete Measurement', 'Are you sure you want to delete this measurement?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete(record.clientId),
      },
    ])
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.date}>{formatDate(record.measuredAt)}</Text>
          <Text style={styles.time}>{formatTime(record.measuredAt)}</Text>
        </View>
        <TouchableOpacity onPress={handleDelete} hitSlop={8}>
          <Icon name="trash-2" type="feather" color="#ccc" size={18} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.mainStat}>
          <Text style={[styles.bodyFat, { color }]}>{record.bodyFatPercentage.toFixed(1)}%</Text>
          <View style={[styles.classificationBadge, { backgroundColor: `${color}15` }]}>
            <Text style={[styles.classificationText, { color }]}>{record.classification}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fat Mass</Text>
            <Text style={styles.detailValue}>
              {record.fatMass.toFixed(1)} {record.measurementSystem === 'metric' ? 'kg' : 'lbs'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Lean Mass</Text>
            <Text style={styles.detailValue}>
              {record.leanMass.toFixed(1)} {record.measurementSystem === 'metric' ? 'kg' : 'lbs'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Formula</Text>
            <Text style={styles.detailValue}>{formulaDef?.name || record.formula}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export function HistoryScreen() {
  const { isProPlus } = usePremiumStore()
  const { getActiveMeasurements, deleteMeasurement } = useHistoryStore()
  const { status: syncStatus, isEnabled: syncEnabled, sync } = useCloudSync()
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const [showPaywall, setShowPaywall] = useState(false)

  const measurements = getActiveMeasurements()
  const [viewMode, setViewMode] = useState<'chart' | 'list'>(
    measurements.length >= 2 ? 'chart' : 'list',
  )

  const headerRightElement = isProPlus ? (
    <View style={styles.headerRight}>
      {measurements.length > 0 && (
        <Text style={styles.count}>{measurements.length} measurements</Text>
      )}
      {syncEnabled && (
        <TouchableOpacity onPress={sync} disabled={syncStatus === 'syncing'} hitSlop={8}>
          <Icon
            name={syncStatus === 'error' ? 'alert-circle' : 'cloud'}
            type="feather"
            color={
              syncStatus === 'syncing'
                ? '#ccc'
                : syncStatus === 'error'
                  ? '#FF5722'
                  : COLORS.success
            }
            size={18}
          />
        </TouchableOpacity>
      )}
    </View>
  ) : undefined

  if (!isProPlus) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.innerContainer}>
          <BrandHeader subtitle="History" variant="compact" />
          <View style={styles.emptyState}>
            <Icon name="lock" type="feather" color="rgba(255,255,255,0.4)" size={48} />
            <Text style={styles.emptyTitle}>PRO+ Feature</Text>
            <Text style={styles.emptySubtitle}>Upgrade to PRO+ to track your measurements</Text>
            <TouchableOpacity style={styles.upgradeButton} onPress={() => setShowPaywall(true)}>
              <Text style={styles.upgradeButtonText}>Unlock PRO+</Text>
            </TouchableOpacity>
          </View>
          <PaywallModal
            visible={showPaywall}
            variant="precision"
            onClose={() => setShowPaywall(false)}
          />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>
        <BrandHeader subtitle="History" variant="compact" rightElement={headerRightElement} />

        {measurements.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="clock" type="feather" color="rgba(255,255,255,0.4)" size={48} />
            <Text style={styles.emptyTitle}>No Measurements Yet</Text>
            <Text style={styles.emptySubtitle}>Your saved measurements will appear here</Text>
          </View>
        ) : (
          <>
            {/* View mode toggle */}
            <View style={styles.segmentedControlWrapper}>
              <View style={styles.segmentedControl}>
                <TouchableOpacity
                  style={[styles.segment, viewMode === 'chart' && styles.segmentActive]}
                  onPress={() => {
                    hapticSelection()
                    setViewMode('chart')
                  }}
                  activeOpacity={0.7}
                >
                  <Icon
                    name="trending-up"
                    type="feather"
                    size={14}
                    color={viewMode === 'chart' ? '#fff' : 'rgba(255,255,255,0.5)'}
                  />
                  <Text
                    style={[styles.segmentText, viewMode === 'chart' && styles.segmentTextActive]}
                  >
                    Chart
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.segment, viewMode === 'list' && styles.segmentActive]}
                  onPress={() => {
                    hapticSelection()
                    setViewMode('list')
                  }}
                  activeOpacity={0.7}
                >
                  <Icon
                    name="list"
                    type="feather"
                    size={14}
                    color={viewMode === 'list' ? '#fff' : 'rgba(255,255,255,0.5)'}
                  />
                  <Text
                    style={[styles.segmentText, viewMode === 'list' && styles.segmentTextActive]}
                  >
                    List
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {viewMode === 'chart' ? (
              <View style={styles.chartContainer}>
                <ProgressChart measurements={measurements} />
              </View>
            ) : (
              <FlatList
                data={measurements}
                keyExtractor={(item) => item.clientId}
                renderItem={({ item }) => (
                  <MeasurementCard record={item} onDelete={deleteMeasurement} />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
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
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(12),
    },
    count: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#999',
    },
    segmentedControlWrapper: {
      paddingHorizontal: getResponsiveSpacing(16),
      paddingTop: getResponsiveSpacing(8),
      paddingBottom: getResponsiveSpacing(4),
    },
    segmentedControl: {
      flexDirection: 'row',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: 10,
      padding: 3,
    },
    segment: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: getResponsiveSpacing(8),
      borderRadius: 8,
    },
    segmentActive: {
      backgroundColor: COLORS.primary,
    },
    segmentText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.5)',
      fontWeight: '500',
    },
    segmentTextActive: {
      color: '#fff',
      fontWeight: '600',
    },
    chartContainer: {
      flex: 1,
      paddingHorizontal: getResponsiveSpacing(16),
    },
    list: {
      padding: getResponsiveSpacing(16),
      gap: getResponsiveSpacing(12),
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: getResponsiveSpacing(40),
      gap: getResponsiveSpacing(12),
    },
    emptyTitle: {
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: '600',
      color: COLORS.text,
      marginTop: getResponsiveSpacing(8),
    },
    emptySubtitle: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.6)',
      textAlign: 'center',
    },
    upgradeButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: getResponsiveSpacing(24),
      paddingVertical: getResponsiveSpacing(12),
      borderRadius: 12,
      marginTop: getResponsiveSpacing(8),
    },
    upgradeButtonText: {
      color: COLORS.white,
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      fontWeight: '600',
    },
  })

const createCardStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    card: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      padding: getResponsiveSpacing(16),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: getResponsiveSpacing(12),
    },
    date: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: '600',
      color: COLORS.textDark,
    },
    time: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#999',
    },
    cardBody: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    mainStat: {
      alignItems: 'center',
      marginRight: getResponsiveSpacing(20),
    },
    bodyFat: {
      fontSize: getResponsiveTypography('3xl'),
      lineHeight: getLineHeight('3xl'),
      fontWeight: 'bold',
    },
    classificationBadge: {
      paddingHorizontal: getResponsiveSpacing(8),
      paddingVertical: getResponsiveSpacing(2),
      borderRadius: 6,
      marginTop: getResponsiveSpacing(4),
    },
    classificationText: {
      fontSize: getResponsiveTypography('xxxs'),
      lineHeight: getLineHeight('xxxs'),
      fontWeight: '600',
    },
    details: {
      flex: 1,
      gap: getResponsiveSpacing(4),
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    detailLabel: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#999',
    },
    detailValue: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: '500',
      color: COLORS.textDark,
    },
  })
