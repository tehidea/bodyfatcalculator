import { useCallback, useState } from 'react'
import { usePremiumStore } from '../store/premiumStore'

interface RestoreResult {
  success: boolean
  wasUpgraded: boolean
}

export function usePurchaseRestore() {
  const [isRestoring, setIsRestoring] = useState(false)
  const restorePurchases = usePremiumStore((state) => state.restorePurchases)
  const pro = usePremiumStore((state) => state.pro)

  const handleRestore = useCallback(async (): Promise<RestoreResult> => {
    setIsRestoring(true)
    try {
      const currentPro = pro
      await restorePurchases()

      // Check if pro status changed after restore
      const newPro = usePremiumStore.getState().pro

      return {
        success: true,
        wasUpgraded: !currentPro && newPro,
      }
    } catch (_error) {
      return {
        success: false,
        wasUpgraded: false,
      }
    } finally {
      setIsRestoring(false)
    }
  }, [pro, restorePurchases])

  return {
    isRestoring,
    handleRestore,
  }
}
