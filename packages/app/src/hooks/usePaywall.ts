import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import type { PurchasesPackage } from 'react-native-purchases'
import { getOfferings } from '../config/store'
import { usePremiumStore } from '../store/premiumStore'

export type PlanType = 'monthly' | 'yearly' | 'lifetime'

interface UsePaywallOptions {
  onSuccess?: () => void
  onCancel?: () => void
  onError?: () => void
}

export function usePaywall(options: UsePaywallOptions = {}) {
  const { isProPlus, isLegacyPro, isLoading, purchasePackage } = usePremiumStore()
  const [packages, setPackages] = useState<PurchasesPackage[]>([])
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly')
  const [isFetchingOfferings, setIsFetchingOfferings] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Fetch offerings when paywall opens
  const fetchOfferings = useCallback(async () => {
    setIsFetchingOfferings(true)
    try {
      const availablePackages = await getOfferings(isLegacyPro)
      setPackages(availablePackages)
    } catch (error) {
      console.error('usePaywall - Failed to fetch offerings:', error)
    } finally {
      setIsFetchingOfferings(false)
    }
  }, [isLegacyPro])

  // Find the package for a given plan type
  const getPackageForPlan = useCallback(
    (plan: PlanType): PurchasesPackage | undefined => {
      // RevenueCat package identifiers use $rc_ prefixed types
      const identifierMap: Record<PlanType, string> = {
        monthly: '$rc_monthly',
        yearly: '$rc_annual',
        lifetime: '$rc_lifetime',
      }
      return (
        packages.find((pkg) => pkg.packageType === identifierMap[plan]) ??
        packages.find((pkg) => pkg.identifier.toLowerCase().includes(plan))
      )
    },
    [packages],
  )

  const handlePurchase = useCallback(
    async (plan?: PlanType) => {
      const targetPlan = plan ?? selectedPlan
      const pkg = getPackageForPlan(targetPlan)

      if (!pkg) {
        Alert.alert(
          'Product Unavailable',
          'This plan is currently unavailable. Please try again later.',
          [{ text: 'OK' }],
        )
        return false
      }

      if (isProcessing) return false

      try {
        setIsProcessing(true)
        console.log('usePaywall - Purchasing plan:', targetPlan, pkg.product.identifier)
        const success = await purchasePackage(pkg)

        if (success) {
          options.onSuccess?.()
          return true
        }

        options.onCancel?.()
        return false
      } catch (error) {
        console.error('usePaywall - Unexpected purchase error:', error)
        options.onError?.()
        return false
      } finally {
        setIsProcessing(false)
      }
    },
    [selectedPlan, getPackageForPlan, isProcessing, purchasePackage, options],
  )

  return {
    isProPlus,
    isLegacyPro,
    isLoading: isLoading || isFetchingOfferings,
    isProcessing,
    packages,
    selectedPlan,
    setSelectedPlan,
    fetchOfferings,
    handlePurchase,
    getPackageForPlan,
  }
}
