'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'always',
    loaded: (posthog) => {
      // Check if Klaro consent is already set
      if (window.klaro?.getManager?.()) {
        const hasConsent = window.klaro.getManager().getConsent('posthog')
        if (hasConsent === false) {
          posthog.opt_out_capturing()
        } else if (hasConsent === true) {
          posthog.opt_in_capturing()
        }
      } else {
        // If Klaro isn't loaded yet or consent isn't set, check for cookie directly
        const consentCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('klaro='))
        if (consentCookie) {
          try {
            const consentData = JSON.parse(
              decodeURIComponent(consentCookie.split('=')[1]),
            )
            if (
              consentData.services &&
              consentData.services.posthog === false
            ) {
              posthog.opt_out_capturing()
            }
          } catch (e) {
            console.error('Error parsing Klaro consent cookie:', e)
          }
        }
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
