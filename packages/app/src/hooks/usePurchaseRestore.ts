import { useCallback, useState } from 'react'
import { usePremiumStore } from '../store/premiumStore'

interface RestoreResult {
  success: boolean
  wasUpgraded: boolean
}

export function usePurchaseRestore() {
  const [isRestoring, setIsRestoring] = useState(false)
  const restorePurchases = usePremiumStore((state) => state.restorePurchases)
  const isProPlus = usePremiumStore((state) => state.isProPlus)
  const isLegacyPro = usePremiumStore((state) => state.isLegacyPro)

  const handleRestore = useCallback(async (): Promise<RestoreResult> => {
    setIsRestoring(true)
    try {
      const wasProPlus = isProPlus
      const wasLegacyPro = isLegacyPro
      await restorePurchases()

      const state = usePremiumStore.getState()

      return {
        success: true,
        wasUpgraded: (!wasProPlus && state.isProPlus) || (!wasLegacyPro && state.isLegacyPro),
      }
    } catch (_error) {
      return {
        success: false,
        wasUpgraded: false,
      }
    } finally {
      setIsRestoring(false)
    }
  }, [isProPlus, isLegacyPro, restorePurchases])

  return {
    isRestoring,
    handleRestore,
  }
}
