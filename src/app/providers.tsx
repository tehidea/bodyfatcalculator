'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'always',
    cross_subdomain_cookie: true,
    persistence: 'localStorage+cookie',
    session_recording: {
      maskAllInputs: true,
    },
    bootstrap: {
      distinctID: 'web_' + Math.random().toString(36).substring(2),
    },
    loaded: (posthog) => {
      // Set user properties for web users
      posthog.identify(undefined, {
        platform: 'web',
        user_type: 'web_visitor',
        source: 'website',
      });
    },
  })
}

interface CSPostHogProviderProps {
  children: React.ReactNode
}

export function CSPostHogProvider({ children }: CSPostHogProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
