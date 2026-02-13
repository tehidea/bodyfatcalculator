import type { Gender } from '@bodyfat/shared/types'
import { Icon, Text } from '@rneui/themed'
import { useState } from 'react'
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BrandHeader } from '../components/BrandHeader'
import FemaleIcon from '../components/icons/FemaleIcon'
import MaleIcon from '../components/icons/MaleIcon'
import { measurementIllustrationMap } from '../components/illustrations/measurements/fieldMap'
import { COLORS } from '../constants/theme'
import { useResponsive } from '../utils/responsiveContext'

const ILLUSTRATION_LABELS: Record<string, string> = {
  waistCircumference: 'Waist',
  neckCircumference: 'Neck',
  hipsCircumference: 'Hips',
  wristCircumference: 'Wrist',
  forearmCircumference: 'Forearm',
  thighCircumference: 'Thigh (circ)',
  calfCircumference: 'Calf (circ)',
  height: 'Height',
  chestSkinfold: 'Chest SF',
  abdomenSkinfold: 'Abdomen SF',
  tricepSkinfold: 'Tricep SF',
  thighSkinfold: 'Thigh SF',
  bicepSkinfold: 'Bicep SF',
  suprailiacSkinfold: 'Suprailiac SF',
  subscapularSkinfold: 'Subscapular SF',
  midaxillarySkinfold: 'Midaxillary SF',
  lowerBackSkinfold: 'Lower Back SF',
  calfSkinfold: 'Calf SF',
}

export function IllustrationGalleryScreen({ navigation }: { navigation: any }) {
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight } = useResponsive()
  const styles = createStyles(getResponsiveSpacing, getResponsiveTypography, getLineHeight)
  const [gender, setGender] = useState<Gender>('male')

  const entries = Object.entries(measurementIllustrationMap)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>
        <BrandHeader
          title="Illustration Gallery"
          variant="compact"
          leftElement={
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" type="feather" color={COLORS.textDark} size={20} />
              <Text style={styles.backText}>Settings</Text>
            </TouchableOpacity>
          }
        />

        <View style={styles.toolbarRow}>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[styles.segment, gender === 'male' && styles.segmentActive]}
              onPress={() => setGender('male')}
              activeOpacity={0.7}
            >
              <MaleIcon size={12} color={gender === 'male' ? '#fff' : '#666'} />
              <Text style={[styles.segmentText, gender === 'male' && styles.segmentTextActive]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segment, gender === 'female' && styles.segmentActive]}
              onPress={() => setGender('female')}
              activeOpacity={0.7}
            >
              <FemaleIcon size={12} color={gender === 'female' ? '#fff' : '#666'} />
              <Text style={[styles.segmentText, gender === 'female' && styles.segmentTextActive]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {entries.map(([fieldKey, Illustration]) => (
            <View key={fieldKey} style={styles.card}>
              <View style={styles.illustrationWrapper}>
                <Illustration
                  size={getResponsiveSpacing(140)}
                  color={COLORS.textDark}
                  highlightColor={COLORS.primary}
                  gender={gender}
                />
              </View>
              <Text style={styles.cardLabel} numberOfLines={1}>
                {ILLUSTRATION_LABELS[fieldKey] ?? fieldKey}
              </Text>
              <Text style={styles.cardKey} numberOfLines={1}>
                {fieldKey}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const createStyles = (
  getResponsiveSpacing: (base: number) => number,
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
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
    toolbarRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: getResponsiveSpacing(16),
      paddingVertical: getResponsiveSpacing(8),
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(6),
    },
    backText: {
      color: COLORS.textDark,
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
    },
    segmentedControl: {
      flexDirection: 'row',
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      padding: 2,
    },
    segment: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 6,
    },
    segmentActive: {
      backgroundColor: COLORS.primary,
    },
    segmentText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
    },
    segmentTextActive: {
      color: '#fff',
      fontWeight: '600',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: getResponsiveSpacing(8),
      gap: getResponsiveSpacing(8),
    },
    card: {
      width: '48%',
      backgroundColor: COLORS.white,
      borderRadius: 12,
      padding: getResponsiveSpacing(12),
      alignItems: 'center',
    },
    illustrationWrapper: {
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
      padding: getResponsiveSpacing(8),
      marginBottom: getResponsiveSpacing(8),
    },
    cardLabel: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: '600',
      color: COLORS.textDark,
      textAlign: 'center',
    },
    cardKey: {
      fontSize: getResponsiveTypography('xxs'),
      lineHeight: getLineHeight('xxs'),
      color: '#999',
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      textAlign: 'center',
      marginTop: getResponsiveSpacing(2),
    },
  })
