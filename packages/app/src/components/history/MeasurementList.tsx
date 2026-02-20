import { Text } from '@rneui/themed'
import { useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import type { MeasurementRecord } from '../../store/historyStore'
import { useResponsive } from '../../utils/responsiveContext'
import { CompactMeasurementRow } from './CompactMeasurementRow'

const INITIAL_COUNT = 20

interface MeasurementListProps {
  measurements: MeasurementRecord[]
  onDelete: (clientId: string) => void
  onPress: (clientId: string) => void
}

export function MeasurementList({ measurements, onDelete, onPress }: MeasurementListProps) {
  const [showAll, setShowAll] = useState(false)
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)

  const sorted = useMemo(
    () =>
      [...measurements].sort(
        (a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime(),
      ),
    [measurements],
  )

  const displayed = showAll ? sorted : sorted.slice(0, INITIAL_COUNT)
  const hasMore = measurements.length > INITIAL_COUNT

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Measurements</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{measurements.length}</Text>
        </View>
      </View>

      {displayed.map((record, index) => (
        <CompactMeasurementRow
          key={record.clientId}
          record={record}
          onDelete={onDelete}
          onPress={onPress}
          isLast={index === displayed.length - 1}
        />
      ))}

      {hasMore && !showAll && (
        <TouchableOpacity
          style={styles.showAllButton}
          onPress={() => setShowAll(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.showAllText}>Show all {measurements.length} measurements</Text>
        </TouchableOpacity>
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
    container: {
      backgroundColor: 'rgba(255,255,255,0.04)',
      borderRadius: 16,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getResponsiveSpacing(12),
      paddingVertical: getResponsiveSpacing(12),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'rgba(255,255,255,0.08)',
    },
    title: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontWeight: '600',
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    badge: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: 10,
      paddingHorizontal: getResponsiveSpacing(8),
      paddingVertical: getResponsiveSpacing(2),
    },
    badgeText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontWeight: '600',
      color: 'rgba(255,255,255,0.6)',
    },
    showAllButton: {
      paddingVertical: getResponsiveSpacing(14),
      alignItems: 'center',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: 'rgba(255,255,255,0.08)',
    },
    showAllText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.5)',
      fontWeight: '500',
    },
  })
