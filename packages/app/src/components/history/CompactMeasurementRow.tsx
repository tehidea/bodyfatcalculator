import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import { Icon, Text } from '@rneui/themed'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import type { MeasurementRecord } from '../../store/historyStore'
import { getClassificationColor } from '../../utils/classification'
import { useResponsive } from '../../utils/responsiveContext'

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

interface CompactMeasurementRowProps {
  record: MeasurementRecord
  onDelete: (clientId: string) => void
  onPress: (clientId: string) => void
  isLast: boolean
}

export function CompactMeasurementRow({
  record,
  onDelete,
  onPress,
  isLast,
}: CompactMeasurementRowProps) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
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
    <TouchableOpacity
      style={[styles.row, !isLast && styles.rowBorder]}
      onPress={() => onPress(record.clientId)}
      activeOpacity={0.7}
    >
      <View style={styles.dateSection}>
        <Text style={styles.date}>{formatDate(record.measuredAt)}</Text>
        {record.hasPhoto && (
          <Icon name="camera" type="feather" color="rgba(255,255,255,0.3)" size={12} />
        )}
      </View>
      <View style={styles.rightSection}>
        <Text style={[styles.bodyFat, { color }]}>{record.bodyFatPercentage.toFixed(1)}%</Text>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.formula} numberOfLines={1}>
          {formulaDef?.name || record.formula}
        </Text>
        <TouchableOpacity onPress={handleDelete} hitSlop={8}>
          <Icon name="trash-2" type="feather" color="rgba(255,255,255,0.3)" size={15} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: getResponsiveSpacing(10),
      paddingHorizontal: getResponsiveSpacing(12),
      minHeight: 44,
    },
    rowBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'rgba(255,255,255,0.08)',
    },
    dateSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(4),
    },
    date: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.7)',
      fontWeight: '500',
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(8),
    },
    bodyFat: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: '600',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    formula: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: 'rgba(255,255,255,0.4)',
      maxWidth: 100,
    },
  })
