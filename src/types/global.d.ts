declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    adsbygoogle: Array<{
      requestNonPersonalizedAds: number
      pauseAdRequests: number
      push: (...args: any[]) => void
    }>
  }
}

// This export is necessary to make this a module
export {}
