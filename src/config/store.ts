import Purchases, { PurchasesPackage } from "react-native-purchases";

// In development, use sandbox environment
const isDevelopment = __DEV__;

const API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY || "default_ios_key";

if (isDevelopment) {
  console.log("🛠️ Running in development mode - using sandbox environment");
  if (API_KEY === "default_ios_key") {
    console.warn("⚠️ RevenueCat API key is not configured in .env");
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
    // Same ID for both development and production
    // RevenueCat automatically handles sandbox vs production environment
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
    const entitlements = {
      pro: customerInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined,
    };
    console.log("getUserEntitlements - Retrieved entitlements:", entitlements);
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
    await Purchases.purchasePackage(package_);
    console.log("purchasePackage - Purchase transaction completed");

    // Give RevenueCat a moment to process
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify purchase with retries
    for (let i = 0; i < 3; i++) {
      console.log(`purchasePackage - Verification attempt ${i + 1}`);

      // Force refresh customer info
      await Purchases.syncPurchases();
      const customerInfo = await Purchases.getCustomerInfo();

      const hasProEntitlement = customerInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined;
      console.log(`purchasePackage - Verification attempt ${i + 1} result:`, {
        pro: hasProEntitlement,
      });

      if (hasProEntitlement) {
        return { pro: true };
      }

      if (i < 2) {
        // Don't wait on last attempt
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.warn(
      "purchasePackage - Purchase completed but entitlement not activated after retries"
    );
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
