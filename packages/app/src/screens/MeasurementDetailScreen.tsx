import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Icon, Text } from '@rneui/themed'
import { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PhotoViewer } from '../components/history/PhotoViewer'
import { COLORS } from '../constants/theme'
import { useProgressPhoto } from '../hooks/useProgressPhoto'
import type { HistoryStackParamList } from '../navigation/TabNavigator'
import { useHistoryStore } from '../store/historyStore'
import { getClassificationColor } from '../utils/classification'
import { useResponsive } from '../utils/responsiveContext'

type Props = NativeStackScreenProps<HistoryStackParamList, 'MeasurementDetail'>

const INPUT_LABELS: Record<string, string> = {
  weight: 'Weight',
  height: 'Height',
  age: 'Age',
  waistCircumference: 'Waist',
  hipCircumference: 'Hip',
  neckCircumference: 'Neck',
  forearmCircumference: 'Forearm',
  wristCircumference: 'Wrist',
  chestSkinfold: 'Chest Skinfold',
  abdominalSkinfold: 'Abdominal Skinfold',
  thighSkinfold: 'Thigh Skinfold',
  tricepsSkinfold: 'Triceps Skinfold',
  subscapularSkinfold: 'Subscapular Skinfold',
  suprailiacSkinfold: 'Suprailiac Skinfold',
  midaxillarySkinfold: 'Midaxillary Skinfold',
  lowerBackSkinfold: 'Lower Back Skinfold',
  calfSkinfold: 'Calf Skinfold',
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function MeasurementDetailScreen({ route, navigation }: Props) {
  const { clientId } = route.params
  const measurement = useHistoryStore((s) => s.measurements.find((m) => m.clientId === clientId))
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const { localPhotoPath, hasPhoto, isProcessing, promptAddPhoto, removePhoto } =
    useProgressPhoto(clientId)
  const [showPhotoViewer, setShowPhotoViewer] = useState(false)

  if (!measurement) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.innerContainer}>
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
              <Icon name="arrow-left" type="feather" color={COLORS.text} size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Measurement not found</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  const formulaDef = FORMULA_DEFINITIONS[measurement.formula]
  const color = getClassificationColor(measurement.bodyFatPercentage, measurement.gender)
  const marginOfError = formulaDef
    ? `±${formulaDef.accuracy.min}-${formulaDef.accuracy.max}%`
    : '±3-7%'
  const weightUnit = measurement.measurementSystem === 'imperial' ? 'lbs' : 'kg'
  const lengthUnit = measurement.measurementSystem === 'imperial' ? 'in' : 'cm'

  const inputEntries = Object.entries(measurement.inputs).filter(
    ([key, value]) => typeof value === 'number' && key !== 'gender' && INPUT_LABELS[key],
  )

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
            <Icon name="arrow-left" type="feather" color={COLORS.text} size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerDate}>{formatDate(measurement.measuredAt)}</Text>
            <Text style={styles.headerTime}>{formatTime(measurement.measuredAt)}</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Photo section */}
          <TouchableOpacity
            style={styles.photoSection}
            onPress={hasPhoto && localPhotoPath ? () => setShowPhotoViewer(true) : promptAddPhoto}
            activeOpacity={0.8}
            disabled={isProcessing}
          >
            {hasPhoto && localPhotoPath ? (
              <Image source={{ uri: localPhotoPath }} style={styles.photo} resizeMode="cover" />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Icon name="camera" type="feather" color="rgba(255,255,255,0.3)" size={32} />
                <Text style={styles.photoPlaceholderText}>
                  {isProcessing ? 'Processing...' : 'Add Progress Photo'}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Photo actions */}
          {hasPhoto && (
            <View style={styles.photoActions}>
              <TouchableOpacity style={styles.photoActionButton} onPress={promptAddPhoto}>
                <Icon name="refresh-cw" type="feather" color="rgba(255,255,255,0.6)" size={14} />
                <Text style={styles.photoActionText}>Replace</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoActionButton} onPress={removePhoto}>
                <Icon name="trash-2" type="feather" color="rgba(255,255,255,0.4)" size={14} />
                <Text style={[styles.photoActionText, { color: 'rgba(255,255,255,0.4)' }]}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Body fat result card */}
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={[styles.bodyFatValue, { color }]}>
                {measurement.bodyFatPercentage.toFixed(1)}%
              </Text>
              <View style={[styles.classificationBadge, { backgroundColor: `${color}20` }]}>
                <Text style={[styles.classificationText, { color }]}>
                  {measurement.classification}
                </Text>
              </View>
            </View>

            <View style={styles.formulaRow}>
              <Text style={styles.formulaName}>{formulaDef?.name || measurement.formula}</Text>
              <Text style={styles.marginOfError}>{marginOfError}</Text>
            </View>

            <View style={styles.divider} />

            {/* Mass breakdown */}
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownValue}>
                  {measurement.fatMass.toFixed(1)} {weightUnit}
                </Text>
                <Text style={styles.breakdownLabel}>Fat Mass</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownValue}>
                  {measurement.leanMass.toFixed(1)} {weightUnit}
                </Text>
                <Text style={styles.breakdownLabel}>Lean Mass</Text>
              </View>
            </View>
          </View>

          {/* Inputs card */}
          {inputEntries.length > 0 && (
            <View style={styles.inputsCard}>
              <Text style={styles.sectionTitle}>Measurements</Text>
              {inputEntries.map(([key, value]) => {
                const isSkinfold = key.endsWith('Skinfold')
                const unit =
                  key === 'age'
                    ? 'yrs'
                    : isSkinfold
                      ? 'mm'
                      : key === 'weight'
                        ? weightUnit
                        : lengthUnit
                return (
                  <View key={key} style={styles.inputRow}>
                    <Text style={styles.inputLabel}>{INPUT_LABELS[key]}</Text>
                    <Text style={styles.inputValue}>
                      {typeof value === 'number' ? value.toFixed(1) : value} {unit}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
        </ScrollView>

        {localPhotoPath && (
          <PhotoViewer
            visible={showPhotoViewer}
            uri={localPhotoPath}
            onClose={() => setShowPhotoViewer(false)}
          />
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
    headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getResponsiveSpacing(16),
      paddingVertical: getResponsiveSpacing(12),
    },
    headerTitleContainer: {
      alignItems: 'center',
    },
    headerDate: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: '600',
      color: COLORS.text,
    },
    headerTime: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: 'rgba(255,255,255,0.5)',
    },
    scrollContent: {
      padding: getResponsiveSpacing(16),
      gap: getResponsiveSpacing(12),
      paddingBottom: getResponsiveSpacing(32),
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      color: 'rgba(255,255,255,0.5)',
    },
    photoSection: {
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: 'rgba(255,255,255,0.04)',
    },
    photo: {
      width: '100%',
      aspectRatio: 3 / 4,
    },
    photoPlaceholder: {
      aspectRatio: 3 / 2,
      justifyContent: 'center',
      alignItems: 'center',
      gap: getResponsiveSpacing(8),
    },
    photoPlaceholderText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.3)',
    },
    photoActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: getResponsiveSpacing(16),
    },
    photoActionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(4),
      paddingVertical: getResponsiveSpacing(6),
      paddingHorizontal: getResponsiveSpacing(12),
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderRadius: 8,
    },
    photoActionText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: 'rgba(255,255,255,0.6)',
    },
    resultCard: {
      backgroundColor: 'rgba(255,255,255,0.04)',
      borderRadius: 16,
      padding: getResponsiveSpacing(16),
    },
    resultHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: getResponsiveSpacing(8),
    },
    bodyFatValue: {
      fontSize: getResponsiveTypography('3xl'),
      lineHeight: getLineHeight('3xl'),
      fontWeight: '600',
    },
    classificationBadge: {
      paddingHorizontal: getResponsiveSpacing(10),
      paddingVertical: getResponsiveSpacing(4),
      borderRadius: 8,
    },
    classificationText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: '600',
    },
    formulaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: getResponsiveSpacing(12),
    },
    formulaName: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.5)',
    },
    marginOfError: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: 'rgba(255,255,255,0.35)',
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'rgba(255,255,255,0.08)',
      marginBottom: getResponsiveSpacing(12),
    },
    breakdownRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    breakdownItem: {
      alignItems: 'center',
    },
    breakdownValue: {
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: '600',
      color: COLORS.text,
    },
    breakdownLabel: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: 'rgba(255,255,255,0.4)',
      marginTop: getResponsiveSpacing(2),
    },
    inputsCard: {
      backgroundColor: 'rgba(255,255,255,0.04)',
      borderRadius: 16,
      padding: getResponsiveSpacing(16),
    },
    sectionTitle: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontWeight: '600',
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: getResponsiveSpacing(12),
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing(6),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'rgba(255,255,255,0.06)',
    },
    inputLabel: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.5)',
    },
    inputValue: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: COLORS.text,
      fontWeight: '500',
    },
  })
