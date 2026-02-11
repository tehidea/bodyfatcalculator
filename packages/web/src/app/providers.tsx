'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'always',
    cross_subdomain_cookie: true,
    persistence: 'localStorage+cookie',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: true,
    },
  })

  // Super properties — attached to every event automatically
  posthog.register({
    platform: 'web',
    user_type: 'web_visitor',
    source: 'website',
  })
}

interface CSPostHogProviderProps {
  children: React.ReactNode
}

export function CSPostHogProvider({ children }: CSPostHogProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
