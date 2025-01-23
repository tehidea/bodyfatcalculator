'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

declare global {
  interface Window {
    klaro?: {
      getManager?: () => {
        getConsent: (service: string) => boolean
      }
    }
  }
}

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'always',
    loaded: (posthog) => {
      // Check if Klaro consent is already set
      if (window.klaro?.getManager?.()?.getConsent('posthog') === false) {
        posthog.opt_out_capturing()
      }
    },
  })
}

interface CSPostHogProviderProps {
  children: React.ReactNode
}

export function CSPostHogProvider({ children }: CSPostHogProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
