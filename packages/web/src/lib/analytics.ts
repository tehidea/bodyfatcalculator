import { useUmami } from 'next-umami'

/**
 * Custom hook that provides analytics tracking functions
 * using Umami analytics
 */
export function useAnalytics() {
  const umami = useUmami()

  /**
   * Track a custom event
   * @param eventName The name of the event
   * @param eventData Optional data to associate with the event
   */
  const trackEvent = (eventName: string, eventData?: Record<string, string | number>) => {
    if (umami) {
      umami.event(eventName, eventData)
    }
  }

  /**
   * Track a custom page view
   * @param url Optional custom URL to track
   */
  const trackPageView = (url?: string) => {
    if (umami) {
      umami.pageView({ url })
    }
  }

  return {
    trackEvent,
    trackPageView,
  }
}
