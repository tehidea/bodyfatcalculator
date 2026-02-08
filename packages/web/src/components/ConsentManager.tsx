'use client'

import { useEffect } from 'react'

interface ConsentManagerProps {
  /**
   * Set to true to force showing the consent modal
   * Useful when privacy policy has changed
   */
  forceShow?: boolean

  /**
   * Set to true to reset all consent settings
   * This will delete the consent cookie and show the modal again
   */
  resetConsent?: boolean

  /**
   * Version of your privacy policy
   * When this changes, the consent modal will be shown again
   */
  policyVersion?: string
}

/**
 * Component to manage consent settings
 *
 * Usage examples:
 *
 * 1. Show consent modal:
 * <ConsentManager forceShow />
 *
 * 2. Reset all consent:
 * <ConsentManager resetConsent />
 *
 * 3. Show consent modal when policy version changes:
 * <ConsentManager policyVersion="2.0" />
 */
export function ConsentManager({
  forceShow = false,
  resetConsent = false,
  policyVersion,
}: ConsentManagerProps) {
  useEffect(() => {
    // Handle policy version changes
    if (policyVersion) {
      const storedVersion = localStorage.getItem('policyVersion')

      if (storedVersion !== policyVersion) {
        // Policy version has changed, reset consent
        if (window.manageConsent) {
          window.manageConsent.resetConsent()
          localStorage.setItem('policyVersion', policyVersion)
        }
      }
    }

    // Handle force show
    if (forceShow && window.manageConsent) {
      window.manageConsent.showModal()
    }

    // Handle reset consent
    if (resetConsent && window.manageConsent) {
      window.manageConsent.resetConsent()
    }
  }, [forceShow, resetConsent, policyVersion])

  // This component doesn't render anything
  return null
}
