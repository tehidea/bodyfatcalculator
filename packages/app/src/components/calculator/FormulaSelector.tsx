import { Icon, Text } from '@rneui/themed'
import { usePostHog } from 'posthog-react-native'
import { useEffect, useMemo, useState } from 'react'
import { Alert, FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/theme'
import { type Formula, getAllFormulasMetadata, getFormulaMetadata } from '../../schemas/calculator'
import { useCalculatorStore } from '../../store/calculatorStore'
import { usePremiumStore } from '../../store/premiumStore'
import { useResponsive } from '../../utils/responsiveContext'
import { BodyWeightScalesIcon } from '../icons/BodyWeightScalesIcon'
import { CalendarIcon } from '../icons/CalendarIcon'
import { MeasurementVerticalIcon } from '../icons/MeasurementVerticalIcon'
import { MeasuringTapeIcon } from '../icons/MeasuringTapeIcon'
import { SkinfoldIcon } from '../icons/SkinfoldIcon'
import { PaywallModal } from './PaywallModal'

export const MeasurementIcon = ({
  type,
  size,
  color,
}: {
  type: string
  size: number
  color: string
}) => {
  switch (type) {
    case 'weight':
      return <BodyWeightScalesIcon size={size} color={color} />
    case 'circumference':
      return <MeasuringTapeIcon size={size} color={color} />
    case 'skinfold':
      return <SkinfoldIcon size={size} color={color} />
    case 'height':
      return <MeasurementVerticalIcon size={size} color={color} />
    case 'age':
      return <CalendarIcon size={size} color={color} />
    default:
      return null
  }
}

// Helper to get unique measurement types while preserving order
function getUniqueMeasurementTypes(fields: Array<{ type: string }>) {
  const seen = new Set<string>()
  return fields.filter((field) => {
    if (seen.has(field.type)) return false
    seen.add(field.type)
    return true
  })
}

export const FormulaSelector = () => {
  const { formula, setFormula, gender, measurementSystem } = useCalculatorStore()
  const { isPremium, isLoading, checkEntitlements } = usePremiumStore()
  const posthog = usePostHog()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isPaywallVisible, setIsPaywallVisible] = useState(false)
  const [pendingFormula, setPendingFormula] = useState<Formula | null>(null)
  const [checkError, setCheckError] = useState<string | null>(null)
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight, deviceType } =
    useResponsive()

  // Create styles with responsive values
  const styles = createStyles(
    getResponsiveSpacing,
    getResponsiveTypography,
    getLineHeight,
    deviceType,
  )

  // Get formulas with metadata from Zod
  const formulas = useMemo(
    () => getAllFormulasMetadata(measurementSystem, gender),
    [measurementSystem, gender],
  )

  const selectedFormula = useMemo(
    () => getFormulaMetadata(formula, measurementSystem, gender),
    [formula, measurementSystem, gender],
  )

  // Initial and periodic entitlement check
  useEffect(() => {
    let isMounted = true

    const checkWithErrorHandling = async () => {
      if (!isMounted) return

      try {
        setCheckError(null)
        await checkEntitlements()
      } catch (error) {
        if (!isMounted) return
        console.error('FormulaSelector - Entitlement check failed:', error)
        setCheckError('Failed to verify PRO status')
      }
    }

    console.log('FormulaSelector - Initial entitlements check')
    checkWithErrorHandling()

    const interval = setInterval(checkWithErrorHandling, 5 * 60 * 1000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [checkEntitlements])

  // Show error if entitlement check fails
  useEffect(() => {
    if (checkError) {
      Alert.alert(
        'Verification Error',
        'Unable to verify premium status. Some features may be unavailable.',
        [{ text: 'Retry', onPress: () => checkEntitlements() }],
      )
    }
  }, [checkError, checkEntitlements])

  // Safeguard for premium formula without premium status
  useEffect(() => {
    if (!isPremium && selectedFormula?.premium) {
      setFormula('ymca')
    }
  }, [isPremium, setFormula, selectedFormula])

  // Update accuracy color logic to use metadata
  const getAccuracyColor = (formula: Formula) => {
    const metadata = getFormulaMetadata(formula, measurementSystem, gender)
    const { min } = metadata.accuracy

    if (min >= 5) return COLORS.error // ±5-7%
    if (min >= 4) return COLORS.warning // ±4-5%
    return COLORS.success // ±3-4%
  }

  const renderAccuracyText = (formula: Formula) => {
    const metadata = getFormulaMetadata(formula, measurementSystem, gender)
    const { min, max } = metadata.accuracy
    return `±${min}-${max}%`
  }

  // Update accuracy info to use actual ranges
  const renderAccuracyInfo = () => (
    <View style={styles.accuracyInfoWrapper}>
      <View style={styles.accuracyInfo}>
        <Text style={styles.accuracyInfoTitle}>About Accuracy</Text>
        <View style={styles.accuracyLevels}>
          <View style={styles.accuracyLevel}>
            <View style={[styles.accuracyDot, { backgroundColor: COLORS.error }]} />
            <Text style={styles.accuracyText}>±5-7%</Text>
          </View>
          <Icon name="arrow-right" type="feather" color="#666" size={getResponsiveSpacing(16)} />
          <View style={styles.accuracyLevel}>
            <View style={[styles.accuracyDot, { backgroundColor: COLORS.warning }]} />
            <Text style={styles.accuracyText}>±4-5%</Text>
          </View>
          <Icon name="arrow-right" type="feather" color="#666" size={getResponsiveSpacing(16)} />
          <View style={styles.accuracyLevel}>
            <View style={[styles.accuracyDot, { backgroundColor: COLORS.success }]} />
            <Text style={styles.accuracyText}>±3-4%</Text>
          </View>
        </View>
        <Text style={styles.accuracyNote}>
          Lower % means more accurate results.{'\n'}PRO formulas typically offer better accuracy.
        </Text>
      </View>
    </View>
  )

  const handleFormulaSelect = (selectedKey: Formula, isPremiumFormula: boolean) => {
    if (isLoading) return

    console.log('handleFormulaSelect - Selected formula:', selectedKey)
    console.log('handleFormulaSelect - Is premium formula:', isPremiumFormula)
    console.log('handleFormulaSelect - Current premium status:', isPremium)

    if (!isPremiumFormula || isPremium) {
      setFormula(selectedKey)
      setIsModalVisible(false)
    } else {
      if (posthog) {
        posthog.capture('premium_formula_blocked', {
          formula_attempted: selectedKey,
          current_formula: formula,
        })
      }
      setIsModalVisible(false)
      setTimeout(() => {
        setPendingFormula(selectedKey)
        setIsPaywallVisible(true)
      }, 300)
    }
  }

  const handlePaywallClose = () => {
    setIsPaywallVisible(false)
    // If user purchased and there was a pending formula, apply it
    if (usePremiumStore.getState().isPremium && pendingFormula) {
      setFormula(pendingFormula)
    }
    setPendingFormula(null)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.labelRow}>
          <Text style={styles.selectorHint}>Select Formula</Text>
          <View style={styles.chevronContainer}>
            <Icon
              name="chevron-down"
              type="feather"
              color={COLORS.text}
              size={getResponsiveSpacing(20)}
            />
          </View>
        </View>
        <View style={styles.selectedFormula}>
          <Text style={styles.formulaName}>{selectedFormula.name}</Text>
          {selectedFormula.premium && !isPremium && (
            <View style={styles.premiumBadge}>
              <Icon name="lock" type="feather" color="#666" size={getResponsiveSpacing(14)} />
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
          )}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={6}>
            {selectedFormula.description}
          </Text>
        </View>
        <View style={styles.measurementIcons}>
          {getUniqueMeasurementTypes(selectedFormula.fields).map((field) => (
            <MeasurementIcon
              key={field.type}
              size={getResponsiveSpacing(12)}
              type={field.type}
              color="#fff"
            />
          ))}
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>SELECT FORMULA</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                <Icon
                  name="x"
                  type="feather"
                  color={COLORS.textDark}
                  size={getResponsiveSpacing(24)}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={[
                ...formulas,
                { key: 'accuracy_info', name: '', description: '', premium: false, fields: [] },
              ]}
              keyExtractor={(item) => item.key}
              style={styles.formulaList}
              renderItem={({ item }) => {
                if (item.key === 'accuracy_info') {
                  return renderAccuracyInfo()
                }

                return (
                  <TouchableOpacity
                    style={[
                      styles.formulaItem,
                      item.key === formula && styles.activeFormula,
                      item.premium && !isPremium && styles.premiumFormula,
                    ]}
                    onPress={() => handleFormulaSelect(item.key as Formula, item.premium)}
                  >
                    <View style={styles.formulaItemHeader}>
                      <View style={styles.formulaItemNameContainer}>
                        <Text
                          style={[
                            styles.formulaItemName,
                            item.key === formula && styles.activeFormulaText,
                            item.premium && !isPremium && styles.premiumFormulaText,
                          ]}
                        >
                          {item.name}
                        </Text>
                        <View style={styles.formulaMetadata}>
                          <View
                            style={[
                              styles.accuracyIndicator,
                              { backgroundColor: getAccuracyColor(item.key as Formula) },
                            ]}
                          />
                          <Text style={styles.accuracyText}>
                            {renderAccuracyText(item.key as Formula)}
                          </Text>
                        </View>
                      </View>
                      {item.premium && !isPremium && (
                        <View style={styles.premiumBadge}>
                          <Icon
                            name="lock"
                            type="feather"
                            color="#666"
                            size={getResponsiveSpacing(14)}
                          />
                          <Text style={styles.premiumBadgeText}>PRO</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text
                        style={[
                          styles.formulaItemDescription,
                          item.premium && !isPremium && styles.premiumFormulaText,
                        ]}
                        numberOfLines={6}
                      >
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.measurementIcons}>
                      {getUniqueMeasurementTypes(item.fields).map((field) => (
                        <MeasurementIcon
                          key={field.type}
                          size={getResponsiveSpacing(12)}
                          type={field.type}
                          color="#666"
                        />
                      ))}
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </View>
      </Modal>

      <PaywallModal visible={isPaywallVisible} variant="formula" onClose={handlePaywallClose} />
    </View>
  )
}

// Move styles inside component to use responsive hooks
const createStyles = (
  getResponsiveSpacing: (base: number) => number,
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  deviceType: string,
) =>
  StyleSheet.create({
    container: {
      marginBottom: getResponsiveSpacing(16),
    },
    selector: {
      backgroundColor: '#444',
      borderRadius: 12,
      padding: getResponsiveSpacing(12),
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    selectedFormula: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing(4),
    },
    formulaName: {
      color: COLORS.text,
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: 'bold',
      flex: 1,
    },
    descriptionContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    description: {
      color: COLORS.text,
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      opacity: 0.8,
      flex: 1,
      marginRight: getResponsiveSpacing(8),
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'transparent',
    },
    modalContent: {
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      height: deviceType === 'tablet' ? '75%' : '85%',
      maxWidth: deviceType === 'tablet' ? 800 : undefined,
      alignSelf: 'center',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -12 },
      shadowOpacity: 0.75,
      shadowRadius: 300,
      elevation: 50,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing(14),
      paddingHorizontal: getResponsiveSpacing(16),
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    closeButton: {
      padding: getResponsiveSpacing(8),
    },
    formulaItem: {
      paddingVertical: getResponsiveSpacing(14),
      paddingHorizontal: getResponsiveSpacing(16),
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    formulaItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    activeFormula: {
      backgroundColor: `${COLORS.primary}10`,
    },
    premiumFormula: {
      backgroundColor: '#f8f8f8',
    },
    formulaItemNameContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    activeFormulaText: {
      color: COLORS.primary,
      fontWeight: 'bold',
    },
    premiumFormulaText: {
      color: '#666',
    },
    formulaItemDescription: {
      flex: 1,
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
    },
    premiumBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      paddingHorizontal: getResponsiveSpacing(8),
      paddingVertical: getResponsiveSpacing(4),
      borderRadius: 12,
      marginLeft: getResponsiveSpacing(8),
    },
    premiumBadgeText: {
      fontSize: getResponsiveTypography('xxxs'),
      lineHeight: getLineHeight('xxxs'),
      fontWeight: 'bold',
      color: '#666',
      marginLeft: getResponsiveSpacing(4),
    },
    measurementIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(8),
      marginTop: getResponsiveSpacing(8),
      opacity: 0.6,
    },
    formulaItemName: {
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      color: COLORS.textDark,
      flex: 1,
    },
    accuracyInfoWrapper: {
      backgroundColor: COLORS.white,
      marginBottom: getResponsiveSpacing(16),
    },
    accuracyInfo: {
      padding: getResponsiveSpacing(16),
      paddingTop: getResponsiveSpacing(20),
      backgroundColor: COLORS.white,
    },
    accuracyInfoTitle: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: 'bold',
      color: COLORS.textDark,
      marginBottom: getResponsiveSpacing(12),
      textAlign: 'center',
    },
    accuracyLevels: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: getResponsiveSpacing(8),
      marginBottom: getResponsiveSpacing(12),
    },
    accuracyLevel: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(4),
    },
    accuracyDot: {
      width: getResponsiveSpacing(8),
      height: getResponsiveSpacing(8),
      borderRadius: getResponsiveSpacing(4),
    },
    accuracyText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
      marginLeft: getResponsiveSpacing(2),
    },
    accuracyNote: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
      textAlign: 'center',
      fontStyle: 'italic',
    },
    formulaMetadata: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    accuracyIndicator: {
      width: getResponsiveSpacing(8),
      height: getResponsiveSpacing(8),
      borderRadius: getResponsiveSpacing(4),
      marginRight: getResponsiveSpacing(4),
    },
    formulaList: {
      flex: 1,
    },
    selectorHint: {
      color: COLORS.text,
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      opacity: 0.6,
      textAlign: 'left',
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontWeight: 'bold',
    },
    chevronContainer: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: getResponsiveSpacing(8),
      paddingHorizontal: getResponsiveSpacing(4),
      paddingTop: getResponsiveSpacing(4),
      paddingBottom: getResponsiveSpacing(2),
    },
    labelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: COLORS.textDark,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  })
