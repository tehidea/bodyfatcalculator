import { Alert } from 'react-native'
import Purchases, { type PurchasesError } from 'react-native-purchases'
import { create } from 'zustand'
import {
  getOfferings,
  getUserEntitlements,
  purchasePackage,
  type UserEntitlements,
} from '../config/store'

interface PremiumStore {
  pro: boolean
  isLoading: boolean
  error: string | null
  checkEntitlements: () => Promise<void>
  setEntitlements: (entitlements: UserEntitlements) => void
  purchasePro: () => Promise<boolean>
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
  pro: false,
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
  purchasePro: async () => {
    console.log('purchasePro - Starting with current state:', { isLoading: false, error: null })

    // Prevent multiple simultaneous purchase attempts
    if (get().isLoading) {
      console.log('purchasePro - Purchase already in progress')
      return false
    }

    set({ isLoading: true, error: null })

    try {
      const offerings = await getOfferings()

      // Check if the store is still in loading state (hasn't been cancelled)
      if (!get().isLoading) {
        console.log('purchasePro - Operation cancelled')
        return false
      }

      console.log('purchasePro - Got offerings:', offerings)
      const proPackage = offerings[0]

      if (!proPackage) {
        console.log('purchasePro - No PRO package available')
        set({ isLoading: false, error: null, pro: false })
        Alert.alert(
          'Product Unavailable',
          'The PRO package is currently unavailable. Please try again later.',
          [{ text: 'OK' }],
        )
        return false
      }

      console.log('purchasePro - Attempting to purchase package')
      const entitlements = await purchasePackage(proPackage)

      // Check if the store is still in loading state
      if (!get().isLoading) {
        console.log('purchasePro - Operation cancelled')
        return false
      }

      console.log('purchasePro - Purchase successful, entitlements:', entitlements)

      // If purchase was successful but entitlements aren't reflected, try restoring
      if (!entitlements.pro) {
        console.log(
          'purchasePro - Purchase successful but entitlements not reflected, attempting restore',
        )
        await Purchases.syncPurchases()
        const restoredEntitlements = await getUserEntitlements()
        set({ ...restoredEntitlements, isLoading: false, error: null })
        return restoredEntitlements.pro
      }

      set({ ...entitlements, isLoading: false, error: null })
      return entitlements.pro
    } catch (error) {
      console.error('purchasePro - Error:', error)

      if (!get().isLoading) {
        return false
      }

      set({ isLoading: false, error: null, pro: false })

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
            console.log('purchasePro - User cancelled')
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
      // First check current entitlements
      const currentEntitlements = await getUserEntitlements()

      // Call restore and sync
      await Purchases.restorePurchases()
      await Purchases.syncPurchases()

      // Get updated entitlements
      const restoredEntitlements = await getUserEntitlements()
      console.log('restorePurchases - Retrieved entitlements:', restoredEntitlements)
      set({ ...restoredEntitlements, isLoading: false, error: null })

      // Only show success message if restoration actually changed something
      if (!currentEntitlements.pro && restoredEntitlements.pro) {
        Alert.alert('Purchases Restored', 'Your PRO access has been successfully restored.', [
          { text: 'OK' },
        ])
      } else if (!restoredEntitlements.pro) {
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
