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

    // Update PostHog user properties
    if (posthogInstance && installId) {
      posthogInstance.setPersonProperties({
        ...properties,
        platform: Platform.OS,
        app_version: Constants.expoConfig?.version,
        last_updated: new Date().toISOString(),
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

const API_KEY =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
    android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
  }) || 'default_key'

if (isDevelopment) {
  console.log('🛠️ Running in development mode - using sandbox environment')
  console.log(`📱 Platform: ${Platform.OS}`)
  if (API_KEY === 'default_key') {
    console.warn(`⚠️ RevenueCat API key for ${Platform.OS} is not configured in .env`)
  }
}

// Single source of truth for entitlement IDs
export const ENTITLEMENTS = {
  pro: 'pro_features',
} as const

export type Entitlement = keyof typeof ENTITLEMENTS

// Product IDs
export const PRODUCTS = {
  pro: {
    lifetime: 'pro_lifetime',
  },
} as const

export interface UserEntitlements {
  pro: boolean
}

let isRevenueCatConfigured = false

export async function initializeStore() {
  console.log('initializeStore - Starting initialization')

  // Set up cross-platform user identification
  const installId = await AsyncStorage.getItem('installId')

  // Only configure RevenueCat once
  if (!isRevenueCatConfigured) {
    try {
      if (isDevelopment) {
        Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)
      }

      if (installId) {
        console.log('initializeStore - Setting RevenueCat app user ID:', installId)
      }

      await Purchases.configure({
        apiKey: API_KEY,
        appUserID: installId || undefined, // Use install ID as RevenueCat user ID
      })

      isRevenueCatConfigured = true
      console.log('initializeStore - RevenueCat configured successfully')
    } catch (error) {
      // If already configured, just log and continue
      if (error instanceof Error && error.message.includes('already set')) {
        console.log('initializeStore - RevenueCat already configured, continuing...')
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
  console.log('initializeStore - Initial entitlements:', entitlements)
  return entitlements
}

export async function getUserEntitlements(): Promise<UserEntitlements> {
  console.log('getUserEntitlements - Checking entitlements')
  try {
    const customerInfo = await Purchases.getCustomerInfo()
    const hasProProduct = customerInfo.allPurchasedProductIdentifiers.includes(
      PRODUCTS.pro.lifetime,
    )
    const hasProEntitlement = customerInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined

    // Consider user as PRO if either the product is purchased or the entitlement is active
    const isPro = hasProProduct || hasProEntitlement

    const entitlements = { pro: isPro }
    console.log('getUserEntitlements - Retrieved entitlements:', entitlements)
    console.log('getUserEntitlements - Details:', {
      hasProProduct,
      hasProEntitlement,
      allProducts: customerInfo.allPurchasedProductIdentifiers,
      activeEntitlements: customerInfo.entitlements.active,
      entitlementId: ENTITLEMENTS.pro, // Log the actual entitlement ID we're checking
    })

    // Track premium status check
    trackPurchaseEvent('premium_status_checked', {
      has_premium: isPro,
      revenue_cat_user_id: customerInfo.originalAppUserId,
    })

    // Sync premium status to user properties
    await syncUserProperties({
      has_premium: isPro,
      premium_status: isPro ? 'active' : 'free',
      revenue_cat_user_id: customerInfo.originalAppUserId,
    })

    return entitlements
  } catch (error) {
    console.error('getUserEntitlements - Error:', error)
    trackPurchaseEvent('premium_status_check_failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return { pro: false }
  }
}

export async function getOfferings() {
  try {
    const offerings = await Purchases.getOfferings()
    return (
      offerings.current?.availablePackages.filter(
        (pkg) => pkg.identifier === PRODUCTS.pro.lifetime,
      ) ?? []
    )
  } catch (error) {
    console.error('Failed to get offerings:', error)
    return []
  }
}

export async function purchasePackage(package_: PurchasesPackage): Promise<UserEntitlements> {
  console.log('purchasePackage - Starting purchase')

  // Track purchase attempt (RevenueCat integration will handle success/completion events)
  trackPurchaseEvent('purchase_attempt', {
    product_id: package_.product.identifier,
    product_price: package_.product.price,
    product_currency: package_.product.currencyCode,
  })

  try {
    // Make the purchase
    const { customerInfo } = await Purchases.purchasePackage(package_)
    console.log('purchasePackage - Purchase transaction completed')
    console.log('purchasePackage - Customer info:', customerInfo)

    // Check both product and entitlement
    const hasProProduct = customerInfo.allPurchasedProductIdentifiers.includes(
      PRODUCTS.pro.lifetime,
    )
    const hasProEntitlement = customerInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined

    console.log('purchasePackage - Initial check:', {
      hasProProduct,
      hasProEntitlement,
      productId: PRODUCTS.pro.lifetime,
      entitlementId: ENTITLEMENTS.pro,
      allProducts: customerInfo.allPurchasedProductIdentifiers,
      activeEntitlements: customerInfo.entitlements.active,
    })

    if (hasProProduct || hasProEntitlement) {
      console.log('purchasePackage - Product/Entitlement activated immediately')

      // RevenueCat's PostHog integration will automatically send purchase events
      // We only track activation success for internal debugging
      trackPurchaseEvent('entitlement_activated', {
        revenue_cat_user_id: customerInfo.originalAppUserId,
        activated_immediately: true,
      })

      return { pro: true }
    }

    // If not activated immediately, try verification with retries
    for (let i = 0; i < 3; i++) {
      console.log(`purchasePackage - Verification attempt ${i + 1}`)

      // Force refresh customer info
      await Purchases.syncPurchases()
      const refreshedInfo = await Purchases.getCustomerInfo()

      const hasProProduct = refreshedInfo.allPurchasedProductIdentifiers.includes(
        PRODUCTS.pro.lifetime,
      )
      const hasProEntitlement = refreshedInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined

      console.log(`purchasePackage - Verification attempt ${i + 1} details:`, {
        hasProProduct,
        hasProEntitlement,
        productId: PRODUCTS.pro.lifetime,
        entitlementId: ENTITLEMENTS.pro,
        allProducts: refreshedInfo.allPurchasedProductIdentifiers,
        activeEntitlements: refreshedInfo.entitlements.active,
      })

      if (hasProProduct || hasProEntitlement) {
        return { pro: true }
      }

      if (i < 2) {
        // Wait longer between retries
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }

    console.warn('purchasePackage - Purchase completed but activation not verified after retries')
    return { pro: false }
  } catch (error) {
    console.error('purchasePackage - Error:', error)
    if (
      error instanceof Error &&
      (error.message === 'User cancelled' || error.message === 'Purchase was cancelled')
    ) {
      console.log('purchasePackage - Purchase cancelled by user')
      return { pro: false }
    }
    throw error
  }
}
