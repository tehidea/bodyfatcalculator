import { useCallback, useState } from 'react'
import { usePremiumStore } from '../store/premiumStore'

interface RestoreResult {
  success: boolean
  wasUpgraded: boolean
}

export function usePurchaseRestore() {
  const [isRestoring, setIsRestoring] = useState(false)
  const restorePurchases = usePremiumStore((state) => state.restorePurchases)
  const isPremium = usePremiumStore((state) => state.isPremium)

  const handleRestore = useCallback(async (): Promise<RestoreResult> => {
    setIsRestoring(true)
    try {
      const wasPremium = isPremium
      await restorePurchases()

      const nowPremium = usePremiumStore.getState().isPremium

      return {
        success: true,
        wasUpgraded: !wasPremium && nowPremium,
      }
    } catch (_error) {
      return {
        success: false,
        wasUpgraded: false,
      }
    } finally {
      setIsRestoring(false)
    }
  }, [isPremium, restorePurchases])

  return {
    isRestoring,
    handleRestore,
  }
}
