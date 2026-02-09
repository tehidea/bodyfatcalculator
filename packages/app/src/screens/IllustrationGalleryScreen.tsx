import type { Gender } from '@bodyfat/shared/types'
import { Icon, Text } from '@rneui/themed'
import { useState } from 'react'
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BrandHeader } from '../components/BrandHeader'
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
        <BrandHeader subtitle="Illustration Gallery" variant="compact" />

        <View style={styles.backRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" type="feather" color={COLORS.text} size={20} />
            <Text style={styles.backText}>Settings</Text>
          </TouchableOpacity>
          <View style={styles.genderToggleRow}>
            <TouchableOpacity
              onPress={() => setGender('male')}
              style={[styles.genderButton, gender === 'male' && styles.genderButtonActive]}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  gender === 'male' && styles.genderButtonTextActive,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('female')}
              style={[styles.genderButton, gender === 'female' && styles.genderButtonActive]}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  gender === 'female' && styles.genderButtonTextActive,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>DEV ONLY</Text>
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
    backRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getResponsiveSpacing(16),
      paddingVertical: getResponsiveSpacing(8),
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(6),
    },
    backText: {
      color: COLORS.text,
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
    },
    genderToggleRow: {
      flexDirection: 'row',
      gap: getResponsiveSpacing(4),
    },
    genderButton: {
      paddingHorizontal: getResponsiveSpacing(12),
      paddingVertical: getResponsiveSpacing(4),
      borderRadius: 8,
      backgroundColor: '#f0f0f0',
    },
    genderButtonActive: {
      backgroundColor: COLORS.primary,
    },
    genderButtonText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: COLORS.text,
      fontWeight: '500',
    },
    genderButtonTextActive: {
      color: 'white',
    },
    badge: {
      backgroundColor: '#FF572220',
      paddingHorizontal: getResponsiveSpacing(8),
      paddingVertical: getResponsiveSpacing(3),
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#FF572260',
    },
    badgeText: {
      color: '#FF5722',
      fontSize: getResponsiveTypography('xxs'),
      lineHeight: getLineHeight('xxs'),
      fontWeight: '700',
      letterSpacing: 1,
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
