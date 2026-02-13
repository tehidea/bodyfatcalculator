import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import Purchases, { type PurchasesPackage } from 'react-native-purchases'

// PostHog instance for tracking (will be set by App component)
let posthogInstance: any = null

export function setPostHogInstance(instance: any) {
  posthogInstance = instance
}

// Utility to track purchase events
function trackPurchaseEvent(eventName: string, properties: any = {}) {
  if (posthogInstance) {
    posthogInstance.capture(eventName, {
      ...properties,
      platform: Platform.OS,
      timestamp: new Date().toISOString(),
    })
  }
}

// Update user properties in both PostHog and RevenueCat
async function syncUserProperties(properties: any = {}) {
  try {
    const installId = await AsyncStorage.getItem('installId')

    // Update PostHog user properties via $set (RN SDK has no setPersonProperties method)
    if (posthogInstance && installId) {
      posthogInstance.capture('user_properties_updated', {
        $set: {
          ...properties,
          platform: Platform.OS,
          app_version: Constants.expoConfig?.version,
          last_updated: new Date().toISOString(),
        },
      })
    }

    // Update RevenueCat subscriber attributes
    const revenueCatAttributes: { [key: string]: string } = {}
    Object.keys(properties).forEach((key) => {
      revenueCatAttributes[`$${key}`] = String(properties[key])
    })

    if (Object.keys(revenueCatAttributes).length > 0) {
      await Purchases.setAttributes(revenueCatAttributes)
    }
  } catch (error) {
    console.warn('Error syncing user properties:', error)
  }
}

// In development, use sandbox environment
const isDevelopment = __DEV__

const API_KEY = Platform.select({
  ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
  android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
})

if (!API_KEY) {
  console.error(
    `❌ RevenueCat API key for ${Platform.OS} is missing. ` +
      `Add EXPO_PUBLIC_REVENUECAT_${Platform.OS === 'ios' ? 'IOS' : 'ANDROID'}_KEY to your .env file. ` +
      'Premium features will be disabled.',
  )
}

if (isDevelopment) {
  console.log('🛠️ Running in development mode - using sandbox environment')
  console.log(`📱 Platform: ${Platform.OS}`)
}

// Single source of truth for entitlement IDs
export const ENTITLEMENTS = {
  pro: 'pro_features',
  premium: 'pro_plus_features',
} as const

export type Entitlement = keyof typeof ENTITLEMENTS

// Product IDs
export const PRODUCTS = {
  pro: {
    lifetime: 'pro_lifetime',
  },
  proPlus: {
    monthly: 'pro_plus_monthly',
    annual: 'pro_plus_annual',
    lifetime: 'pro_plus_lifetime',
  },
  proPlusLegacy: {
    monthly: 'pro_plus_monthly_legacy',
    annual: 'pro_plus_annual_legacy',
    lifetime: 'pro_plus_lifetime_legacy',
  },
} as const

// Offering identifiers
export const OFFERINGS = {
  default: 'pro_plus',
  legacyUpgrade: 'pro_plus_legacy',
} as const

export interface UserEntitlements {
  isProPlus: boolean
  isLegacyPro: boolean
}

let isRevenueCatConfigured = false

export async function initializeStore() {
  if (__DEV__) console.log('initializeStore - Starting initialization')

  if (!API_KEY) {
    console.warn('initializeStore - Skipping RevenueCat (no API key). Running in free mode.')
    return { isProPlus: false, isLegacyPro: false }
  }

  // Set up cross-platform user identification
  const installId = await AsyncStorage.getItem('installId')

  // Only configure RevenueCat once
  if (!isRevenueCatConfigured) {
    try {
      if (isDevelopment) {
        Purchases.setLogHandler((_logLevel, message) => {
          console.log(`[RevenueCat] ${message}`)
        })
      }

      if (__DEV__ && installId) {
        console.log('initializeStore - Setting RevenueCat app user ID:', installId)
      }

      await Purchases.configure({
        apiKey: API_KEY,
        appUserID: installId || null, // Use install ID as RevenueCat user ID
      })

      isRevenueCatConfigured = true
      if (__DEV__) console.log('initializeStore - RevenueCat configured successfully')
    } catch (error) {
      // If already configured, just log and continue
      if (error instanceof Error && error.message.includes('already set')) {
        if (__DEV__) console.log('initializeStore - RevenueCat already configured, continuing...')
        isRevenueCatConfigured = true
      } else {
        console.error('initializeStore - Error configuring RevenueCat:', error)
        throw error
      }
    }
  }

  // Set PostHog user ID as RevenueCat subscriber attribute for integration
  if (installId) {
    await Purchases.setAttributes({
      $posthogUserId: installId,
      $posthogDistinctId: installId,
      $platform: Platform.OS,
      $appVersion: Constants.expoConfig?.version || 'unknown',
    })
  }

  const entitlements = await getUserEntitlements()
  if (__DEV__) console.log('initializeStore - Initial entitlements:', entitlements)
  return entitlements
}

export async function getUserEntitlements(): Promise<UserEntitlements> {
  if (!isRevenueCatConfigured) {
    return { isProPlus: false, isLegacyPro: false }
  }
  if (__DEV__) console.log('getUserEntitlements - Checking entitlements')
  try {
    const customerInfo = await Purchases.getCustomerInfo()

    // Legacy PRO detection: only trust the actual product purchase history,
    // not entitlements (which can be granted manually or via sandbox contamination)
    const isLegacyPro = customerInfo.allPurchasedProductIdentifiers.includes(PRODUCTS.pro.lifetime)

    // Premium detection: user has the new premium entitlement
    const hasPremiumEntitlement =
      customerInfo.entitlements.active[ENTITLEMENTS.premium] !== undefined

    // isProPlus is strictly the new subscription entitlement
    const isProPlus = hasPremiumEntitlement

    const entitlements = { isProPlus, isLegacyPro }
    if (__DEV__) {
      console.log('getUserEntitlements - Retrieved entitlements:', entitlements)
      console.log('getUserEntitlements - Details:', {
        isLegacyPro,
        hasPremiumEntitlement,
        allProducts: customerInfo.allPurchasedProductIdentifiers,
        activeEntitlements: customerInfo.entitlements.active,
      })
    }

    // Track premium status check
    trackPurchaseEvent('premium_status_checked', {
      is_pro_plus: isProPlus,
      is_legacy_pro: isLegacyPro,
      revenue_cat_user_id: customerInfo.originalAppUserId,
    })

    // Sync premium status to user properties
    await syncUserProperties({
      is_pro_plus: isProPlus,
      is_legacy_pro: isLegacyPro,
      premium_status: isProPlus ? 'pro_plus' : isLegacyPro ? 'legacy_pro' : 'free',
      revenue_cat_user_id: customerInfo.originalAppUserId,
    })

    return entitlements
  } catch (error) {
    console.error('getUserEntitlements - Error:', error)
    trackPurchaseEvent('premium_status_check_failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return { isProPlus: false, isLegacyPro: false }
  }
}

export async function getOfferings(isLegacyPro = false) {
  if (!isRevenueCatConfigured) {
    return []
  }
  try {
    const offerings = await Purchases.getOfferings()
    const offeringId = isLegacyPro ? OFFERINGS.legacyUpgrade : OFFERINGS.default
    const offering = offerings.all[offeringId] ?? offerings.current

    if (__DEV__)
      console.log('getOfferings - Using offering:', offeringId, offering?.availablePackages.length)

    return offering?.availablePackages ?? []
  } catch (error) {
    console.error('Failed to get offerings:', error)
    return []
  }
}

export async function purchasePackage(package_: PurchasesPackage): Promise<UserEntitlements> {
  if (!isRevenueCatConfigured) {
    throw new Error('RevenueCat is not configured. Check your API key in .env.')
  }
  if (__DEV__) console.log('purchasePackage - Starting purchase')

  // Track purchase attempt (RevenueCat integration will handle success/completion events)
  trackPurchaseEvent('purchase_attempt', {
    product_id: package_.product.identifier,
    product_price: package_.product.price,
    product_currency: package_.product.currencyCode,
  })

  try {
    // Make the purchase
    const { customerInfo } = await Purchases.purchasePackage(package_)
    const entitlements = extractEntitlements(customerInfo)

    if (__DEV__) {
      console.log('purchasePackage - Purchase transaction completed')
      console.log('purchasePackage - Initial check:', {
        ...entitlements,
        allProducts: customerInfo.allPurchasedProductIdentifiers,
        activeEntitlements: customerInfo.entitlements.active,
      })
    }

    if (entitlements.isProPlus) {
      if (__DEV__) console.log('purchasePackage - Entitlement activated immediately')

      trackPurchaseEvent('entitlement_activated', {
        revenue_cat_user_id: customerInfo.originalAppUserId,
        activated_immediately: true,
      })

      return entitlements
    }

    // If not activated immediately, try verification with retries
    for (let i = 0; i < 3; i++) {
      if (__DEV__) console.log(`purchasePackage - Verification attempt ${i + 1}`)

      await Purchases.syncPurchases()
      const refreshedInfo = await Purchases.getCustomerInfo()
      const refreshedEntitlements = extractEntitlements(refreshedInfo)

      if (__DEV__) {
        console.log(`purchasePackage - Verification attempt ${i + 1} details:`, {
          ...refreshedEntitlements,
          allProducts: refreshedInfo.allPurchasedProductIdentifiers,
          activeEntitlements: refreshedInfo.entitlements.active,
        })
      }

      if (refreshedEntitlements.isProPlus) {
        return refreshedEntitlements
      }

      if (i < 2) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }

    console.warn('purchasePackage - Purchase completed but activation not verified after retries')
    return { isProPlus: false, isLegacyPro: entitlements.isLegacyPro }
  } catch (error) {
    console.error('purchasePackage - Error:', error)
    if (
      error instanceof Error &&
      (error.message === 'User cancelled' || error.message === 'Purchase was cancelled')
    ) {
      if (__DEV__) console.log('purchasePackage - Purchase cancelled by user')
      return { isProPlus: false, isLegacyPro: false }
    }
    throw error
  }
}

/** Extract entitlements from RevenueCat customer info */
function extractEntitlements(customerInfo: {
  allPurchasedProductIdentifiers: string[]
  entitlements: { active: Record<string, unknown> }
}): UserEntitlements {
  const isLegacyPro = customerInfo.allPurchasedProductIdentifiers.includes(PRODUCTS.pro.lifetime)

  const hasPremiumEntitlement = customerInfo.entitlements.active[ENTITLEMENTS.premium] !== undefined

  return {
    isProPlus: hasPremiumEntitlement,
    isLegacyPro,
  }
}
