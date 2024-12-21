import Purchases, { PurchasesPackage } from "react-native-purchases";
import { Platform } from "react-native";

// In development, use sandbox environment
const isDevelopment = __DEV__;

const API_KEY =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
    android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
  }) || "default_key";

if (isDevelopment) {
  console.log("🛠️ Running in development mode - using sandbox environment");
  console.log(`📱 Platform: ${Platform.OS}`);
  if (API_KEY === "default_key") {
    console.warn(`⚠️ RevenueCat API key for ${Platform.OS} is not configured in .env`);
  }
}

// Single source of truth for entitlement IDs
export const ENTITLEMENTS = {
  pro: "pro_features",
} as const;

export type Entitlement = keyof typeof ENTITLEMENTS;

// Product IDs
export const PRODUCTS = {
  pro: {
    lifetime: "pro_lifetime",
  },
} as const;

export interface UserEntitlements {
  pro: boolean;
}

export async function initializeStore() {
  console.log("initializeStore - Starting initialization");
  if (isDevelopment) {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
  }

  await Purchases.configure({
    apiKey: API_KEY,
  });

  const entitlements = await getUserEntitlements();
  console.log("initializeStore - Initial entitlements:", entitlements);
  return entitlements;
}

export async function getUserEntitlements(): Promise<UserEntitlements> {
  console.log("getUserEntitlements - Checking entitlements");
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    const hasProProduct = customerInfo.allPurchasedProductIdentifiers.includes(
      PRODUCTS.pro.lifetime
    );
    const hasProEntitlement = customerInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined;

    // Consider user as PRO if either the product is purchased or the entitlement is active
    const isPro = hasProProduct || hasProEntitlement;

    const entitlements = { pro: isPro };
    console.log("getUserEntitlements - Retrieved entitlements:", entitlements);
    console.log("getUserEntitlements - Details:", {
      hasProProduct,
      hasProEntitlement,
      allProducts: customerInfo.allPurchasedProductIdentifiers,
      activeEntitlements: customerInfo.entitlements.active,
      entitlementId: ENTITLEMENTS.pro, // Log the actual entitlement ID we're checking
    });
    return entitlements;
  } catch (error) {
    console.error("getUserEntitlements - Error:", error);
    return { pro: false };
  }
}

export async function getOfferings() {
  try {
    const offerings = await Purchases.getOfferings();
    return (
      offerings.current?.availablePackages.filter(
        pkg => pkg.identifier === PRODUCTS.pro.lifetime
      ) ?? []
    );
  } catch (error) {
    console.error("Failed to get offerings:", error);
    return [];
  }
}

export async function purchasePackage(package_: PurchasesPackage): Promise<UserEntitlements> {
  console.log("purchasePackage - Starting purchase");
  try {
    // Make the purchase
    const { customerInfo } = await Purchases.purchasePackage(package_);
    console.log("purchasePackage - Purchase transaction completed");
    console.log("purchasePackage - Customer info:", customerInfo);

    // Check both product and entitlement
    const hasProProduct = customerInfo.allPurchasedProductIdentifiers.includes(
      PRODUCTS.pro.lifetime
    );
    const hasProEntitlement = customerInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined;

    console.log("purchasePackage - Initial check:", {
      hasProProduct,
      hasProEntitlement,
      productId: PRODUCTS.pro.lifetime,
      entitlementId: ENTITLEMENTS.pro,
      allProducts: customerInfo.allPurchasedProductIdentifiers,
      activeEntitlements: customerInfo.entitlements.active,
    });

    if (hasProProduct || hasProEntitlement) {
      console.log("purchasePackage - Product/Entitlement activated immediately");
      return { pro: true };
    }

    // If not activated immediately, try verification with retries
    for (let i = 0; i < 3; i++) {
      console.log(`purchasePackage - Verification attempt ${i + 1}`);

      // Force refresh customer info
      await Purchases.syncPurchases();
      const refreshedInfo = await Purchases.getCustomerInfo();

      const hasProProduct = refreshedInfo.allPurchasedProductIdentifiers.includes(
        PRODUCTS.pro.lifetime
      );
      const hasProEntitlement = refreshedInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined;

      console.log(`purchasePackage - Verification attempt ${i + 1} details:`, {
        hasProProduct,
        hasProEntitlement,
        productId: PRODUCTS.pro.lifetime,
        entitlementId: ENTITLEMENTS.pro,
        allProducts: refreshedInfo.allPurchasedProductIdentifiers,
        activeEntitlements: refreshedInfo.entitlements.active,
      });

      if (hasProProduct || hasProEntitlement) {
        return { pro: true };
      }

      if (i < 2) {
        // Wait longer between retries
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.warn("purchasePackage - Purchase completed but activation not verified after retries");
    return { pro: false };
  } catch (error) {
    console.error("purchasePackage - Error:", error);
    if (
      error instanceof Error &&
      (error.message === "User cancelled" || error.message === "Purchase was cancelled")
    ) {
      console.log("purchasePackage - Purchase cancelled by user");
      return { pro: false };
    }
    throw error;
  }
}
