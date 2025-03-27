declare global {
  interface Window {
    umamiTrackingEnabled?: boolean
    umami?: {
      track: boolean
      event: (
        eventName: string,
        eventData?: Record<string, string | number>,
      ) => void
      pageView: (options?: { url?: string }) => void
    }
    klaro?: any
    klaroConfig?: any
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    adsbygoogle?: any[]
    posthog?: any
    manageConsent?: {
      showModal: () => void
      resetConsent: () => void
      hasConsent: (service: string) => boolean | null
    }
  }
}

// This export is necessary to make this a module
export {}
