import Constants from 'expo-constants'
import { useCallback, useMemo, useState } from 'react'
import { CHANGELOG } from '../data/changelog'
import { useWhatsNewStore } from '../store/whatsNewStore'

export function useWhatsNew() {
  const { lastSeenVersion, _hasHydrated, setLastSeenVersion } = useWhatsNewStore()
  const [dismissed, setDismissed] = useState(false)

  const currentVersion = Constants.expoConfig?.version ?? null
  const latestEntry = CHANGELOG[0] ?? null

  const showWhatsNew = useMemo(() => {
    if (!_hasHydrated || dismissed || !latestEntry || !currentVersion) return false
    // Only auto-show when the running version matches the latest changelog entry
    if (currentVersion !== latestEntry.version) return false
    // Show if user hasn't seen this version yet
    return lastSeenVersion !== currentVersion
  }, [_hasHydrated, dismissed, latestEntry, currentVersion, lastSeenVersion])

  const dismiss = useCallback(() => {
    setDismissed(true)
    if (currentVersion) {
      setLastSeenVersion(currentVersion)
    }
  }, [currentVersion, setLastSeenVersion])

  return { showWhatsNew, dismiss, latestEntry }
}
