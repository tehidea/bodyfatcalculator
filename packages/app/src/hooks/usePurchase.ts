import { useState } from 'react'
import { Alert } from 'react-native'
import type { PurchasesPackage } from 'react-native-purchases'
import { usePremiumStore } from '../store/premiumStore'

interface UsePurchaseOptions {
  onSuccess?: () => void
  successMessage?: string
  onCancel?: () => void
  onError?: () => void
}

export function usePurchase(options: UsePurchaseOptions = {}) {
  const { purchasePackage } = usePremiumStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePurchase = async (pkg: PurchasesPackage) => {
    if (isProcessing) return false

    try {
      setIsProcessing(true)
      console.log('Starting purchase for:', pkg.product.identifier)
      const success = await purchasePackage(pkg)

      if (success) {
        if (options.onSuccess) {
          options.onSuccess()
        }
        if (options.successMessage) {
          Alert.alert('Success!', options.successMessage, [{ text: 'OK' }])
        }
        return true
      }

      if (options.onCancel) {
        options.onCancel()
      }
      return false
    } catch (error) {
      console.error('Unexpected purchase error:', error)
      if (options.onError) {
        options.onError()
      }
      return false
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    handlePurchase,
    isProcessing,
  }
}
