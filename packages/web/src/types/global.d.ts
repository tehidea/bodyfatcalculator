declare global {
  interface Window {
    klaro?: {
      getManager?: () => {
        getConsent: (service: string) => boolean
      }
      show: (config: any) => void
    }
    klaroConfig?: any
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    adsbygoogle?: any[]
    manageConsent?: {
      showModal: () => void
      resetConsent: () => void
      hasConsent: (service: string) => boolean | null
    }
  }
}

// This export is necessary to make this a module
export {}
