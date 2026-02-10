import { Alert } from 'react-native'
import Purchases, { type PurchasesError, type PurchasesPackage } from 'react-native-purchases'
import { create } from 'zustand'
import { getUserEntitlements, purchasePackage, type UserEntitlements } from '../config/store'

interface PremiumStore {
  isProPlus: boolean
  isLegacyPro: boolean
  isLoading: boolean
  error: string | null
  checkEntitlements: () => Promise<void>
  setEntitlements: (entitlements: UserEntitlements) => void
  purchasePackage: (pkg: PurchasesPackage) => Promise<boolean>
  restorePurchases: () => Promise<void>
}

function handleRestoreError(error: unknown) {
  if (error instanceof Error) {
    const message = error.message || 'Failed to restore purchases'
    Alert.alert('Restore Failed', message, [{ text: 'OK' }])
  } else {
    Alert.alert('Restore Failed', 'An unexpected error occurred while restoring purchases', [
      { text: 'OK' },
    ])
  }
}

export const usePremiumStore = create<PremiumStore>((set, get) => ({
  isProPlus: false,
  isLegacyPro: false,
  isLoading: false,
  error: null,
  checkEntitlements: async () => {
    console.log('checkEntitlements - Starting check')
    set({ isLoading: true, error: null })
    try {
      const entitlements = await getUserEntitlements()
      console.log('checkEntitlements - Retrieved entitlements:', entitlements)
      set({ ...entitlements, isLoading: false, error: null })
    } catch (error) {
      console.error('checkEntitlements - Error:', error)
      if (error instanceof Error && 'code' in error) {
        const purchaseError = error as PurchasesError
        switch (purchaseError.code) {
          case 'NetworkError':
            set({ isLoading: false, error: 'Network connection error. Please try again.' })
            break
          case 'PurchaseNotAllowedError':
            set({ isLoading: false, error: 'Purchases are not allowed on this device.' })
            break
          default:
            set({ isLoading: false, error: null })
        }
      } else {
        set({ isLoading: false, error: null })
      }
    }
  },
  setEntitlements: (entitlements: UserEntitlements) => {
    console.log('setEntitlements - Setting new entitlements:', entitlements)
    set({ ...entitlements })
  },
  purchasePackage: async (pkg: PurchasesPackage) => {
    console.log('purchasePackage - Starting purchase for:', pkg.product.identifier)

    if (get().isLoading) {
      console.log('purchasePackage - Purchase already in progress')
      return false
    }

    set({ isLoading: true, error: null })

    try {
      if (!get().isLoading) {
        console.log('purchasePackage - Operation cancelled')
        return false
      }

      console.log('purchasePackage - Attempting to purchase package')
      const entitlements = await purchasePackage(pkg)

      if (!get().isLoading) {
        console.log('purchasePackage - Operation cancelled')
        return false
      }

      console.log('purchasePackage - Purchase result, entitlements:', entitlements)

      if (!entitlements.isProPlus) {
        console.log(
          'purchasePackage - Purchase successful but entitlements not reflected, attempting restore',
        )
        await Purchases.syncPurchases()
        const restoredEntitlements = await getUserEntitlements()
        set({ ...restoredEntitlements, isLoading: false, error: null })
        return restoredEntitlements.isProPlus
      }

      set({ ...entitlements, isLoading: false, error: null })
      return entitlements.isProPlus
    } catch (error) {
      console.error('purchasePackage - Error:', error)

      if (!get().isLoading) {
        return false
      }

      set({ isLoading: false, error: null, isProPlus: false })

      if (error instanceof Error && 'code' in error) {
        const purchaseError = error as PurchasesError
        switch (purchaseError.code) {
          case 'NetworkError':
            Alert.alert('Network Error', 'Please check your internet connection and try again.', [
              { text: 'OK' },
            ])
            return false
          case 'StoreProblemError':
            Alert.alert(
              'Store Error',
              'There was a problem with the App Store. Please try again later.',
              [{ text: 'OK' }],
            )
            return false
          case 'PurchaseCancelledError':
            console.log('purchasePackage - User cancelled')
            return false
          case 'CustomerInfoError':
            Alert.alert(
              'Sign In Required',
              'Please sign in with your App Store account to make purchases.',
              [{ text: 'OK' }],
            )
            return false
          case 'InvalidReceiptError':
            Alert.alert(
              'Purchase Error',
              'There was a problem validating your purchase. Please try again.',
              [{ text: 'OK' }],
            )
            return false
          default:
            Alert.alert('Purchase Error', 'An unexpected error occurred. Please try again later.', [
              { text: 'OK' },
            ])
            return false
        }
      }

      return false
    }
  },
  restorePurchases: async () => {
    console.log('restorePurchases - Starting restore')
    set({ isLoading: true, error: null })
    try {
      const currentEntitlements = await getUserEntitlements()

      await Purchases.restorePurchases()
      await Purchases.syncPurchases()

      const restoredEntitlements = await getUserEntitlements()
      console.log('restorePurchases - Retrieved entitlements:', restoredEntitlements)
      set({ ...restoredEntitlements, isLoading: false, error: null })

      const wasUpgraded = !currentEntitlements.isProPlus && restoredEntitlements.isProPlus
      const wasLegacyRestored = !currentEntitlements.isLegacyPro && restoredEntitlements.isLegacyPro

      if (wasUpgraded) {
        Alert.alert('Purchases Restored', 'Your PRO+ access has been successfully restored.', [
          { text: 'OK' },
        ])
      } else if (wasLegacyRestored) {
        Alert.alert(
          'Purchases Restored',
          'Your PRO purchase has been restored. You have access to advanced formulas and decimal precision.',
          [{ text: 'OK' }],
        )
      } else if (!restoredEntitlements.isProPlus && !restoredEntitlements.isLegacyPro) {
        Alert.alert('No Purchases Found', 'No previous purchases were found to restore.', [
          { text: 'OK' },
        ])
      }
    } catch (error) {
      console.error('restorePurchases - Error:', error)
      handleRestoreError(error)
      set({ isLoading: false, error: 'Failed to restore purchases' })
    }
  },
}))

export const useHasProFeatures = () => usePremiumStore((s) => s.isProPlus || s.isLegacyPro)
