import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import { Icon, Text } from '@rneui/themed'
import { useState } from 'react'
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PaywallModal } from '../components/calculator/PaywallModal'
import { COLORS } from '../constants/theme'
import { useCloudSync } from '../hooks/useCloudSync'
import type { MeasurementRecord } from '../store/historyStore'
import { useHistoryStore } from '../store/historyStore'
import { usePremiumStore } from '../store/premiumStore'
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
  const { isPremium } = usePremiumStore()
  const { getActiveMeasurements, deleteMeasurement } = useHistoryStore()
  const { status: syncStatus, isEnabled: syncEnabled, sync } = useCloudSync()
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const [showPaywall, setShowPaywall] = useState(false)

  const measurements = getActiveMeasurements()

  if (!isPremium) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
        </View>
        <View style={styles.emptyState}>
          <Icon name="lock" type="feather" color="#ccc" size={48} />
          <Text style={styles.emptyTitle}>Premium Feature</Text>
          <Text style={styles.emptySubtitle}>Track your measurements over time with Premium</Text>
          <TouchableOpacity style={styles.upgradeButton} onPress={() => setShowPaywall(true)}>
            <Text style={styles.upgradeButtonText}>Unlock Premium</Text>
          </TouchableOpacity>
        </View>
        <PaywallModal
          visible={showPaywall}
          variant="precision"
          onClose={() => setShowPaywall(false)}
        />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
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
      </View>

      {measurements.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="clock" type="feather" color="#ccc" size={48} />
          <Text style={styles.emptyTitle}>No Measurements Yet</Text>
          <Text style={styles.emptySubtitle}>Your saved measurements will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={measurements}
          keyExtractor={(item) => item.clientId}
          renderItem={({ item }) => <MeasurementCard record={item} onDelete={deleteMeasurement} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
      backgroundColor: '#f5f5f5',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: getResponsiveSpacing(20),
      paddingVertical: getResponsiveSpacing(16),
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(12),
    },
    title: {
      fontSize: getResponsiveTypography('2xl'),
      lineHeight: getLineHeight('2xl'),
      fontWeight: 'bold',
      color: COLORS.textDark,
    },
    count: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#999',
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
      color: COLORS.textDark,
      marginTop: getResponsiveSpacing(8),
    },
    emptySubtitle: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#999',
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
