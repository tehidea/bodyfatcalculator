import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface WhatsNewStore {
  lastSeenVersion: string | null
  _hasHydrated: boolean

  setLastSeenVersion: (version: string | null) => void
  setHasHydrated: (state: boolean) => void
}

export const useWhatsNewStore = create<WhatsNewStore>()(
  persist(
    (set) => ({
      lastSeenVersion: null,
      _hasHydrated: false,

      setLastSeenVersion: (version) => set({ lastSeenVersion: version }),
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: 'whats-new-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('WhatsNew hydration failed:', error)
        }
        state?.setHasHydrated(true)
      },
    },
  ),
)
