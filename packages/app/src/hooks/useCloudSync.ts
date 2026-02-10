import { useCallback, useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'
import { isCloudAvailable, type SyncResult, type SyncStatus, syncAll } from '../services/cloudSync'
import { useHistoryStore } from '../store/historyStore'
import { usePremiumStore } from '../store/premiumStore'

export function useCloudSync() {
  const { isProPlus } = usePremiumStore()
  const { cloudSyncEnabled, lastSyncedAt } = useHistoryStore()
  const [status, setStatus] = useState<SyncStatus>('idle')
  const [cloudAvailable, setCloudAvailable] = useState<boolean | null>(null)
  const [lastResult, setLastResult] = useState<SyncResult | null>(null)
  const isSyncingRef = useRef(false)

  // Check cloud availability on mount
  useEffect(() => {
    isCloudAvailable().then(setCloudAvailable)
  }, [])

  const sync = useCallback(async (): Promise<SyncResult | null> => {
    if (!isProPlus || !cloudSyncEnabled || isSyncingRef.current) {
      return null
    }

    const available = await isCloudAvailable()
    setCloudAvailable(available)
    if (!available) {
      setStatus('error')
      return null
    }

    isSyncingRef.current = true
    setStatus('syncing')

    try {
      const result = await syncAll()
      setLastResult(result)
      setStatus(result.errors.length > 0 ? 'error' : 'synced')
      return result
    } catch (error) {
      console.error('useCloudSync - sync failed:', error)
      setStatus('error')
      return null
    } finally {
      isSyncingRef.current = false
    }
  }, [isProPlus, cloudSyncEnabled])

  // Auto-sync when app comes to foreground
  useEffect(() => {
    if (!isProPlus || !cloudSyncEnabled) return

    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        sync()
      }
    })

    // Initial sync
    sync()

    return () => subscription.remove()
  }, [isProPlus, cloudSyncEnabled, sync])

  return {
    status,
    cloudAvailable,
    lastSyncedAt,
    lastResult,
    sync,
    isEnabled: cloudSyncEnabled && isProPlus,
  }
}
