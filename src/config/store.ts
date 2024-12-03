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
  premium: boolean;
}

export async function initializeStore() {
  console.log("initializeStore - Starting initialization");
  if (isDevelopment) {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
  }

  await Purchases.configure({
    apiKey: API_KEY,
  });

  // Check entitlements immediately after initialization
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
      premium: false,
    };
    console.log("getUserEntitlements - Retrieved entitlements:", entitlements);
    return entitlements;
  } catch (error) {
    console.error("getUserEntitlements - Error:", error);
    return { pro: false, premium: false };
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
  try {
    const { customerInfo } = await Purchases.purchasePackage(package_);
    return {
      pro: customerInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined,
      premium: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User cancelled") {
        const currentEntitlements = await getUserEntitlements();
        return currentEntitlements;
      }
      console.error("Failed to purchase package:", error);
      throw error;
    }
    throw error;
  }
}
