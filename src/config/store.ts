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

// Product IDs - we use RevenueCat's recommended "current" offering
// This automatically handles test vs production products
export const PRODUCTS = {
  pro: {
    // Package identifier in the "current" offering
    lifetime: isDevelopment ? "pro_lifetime_test" : "pro_lifetime",
  },
} as const;

export interface UserEntitlements {
  pro: boolean;
  premium: boolean;
}

export async function initializeStore() {
  if (isDevelopment) {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
  }

  await Purchases.configure({
    apiKey: API_KEY,
  });
}

export async function getUserEntitlements(): Promise<UserEntitlements> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return {
      pro: customerInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined,
      premium: false,
    };
  } catch (error) {
    console.error("Failed to get user entitlements:", error);
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
    if (error instanceof Error && error.message === "User cancelled") {
      return getUserEntitlements();
    }
    console.error("Failed to purchase package:", error);
    throw error;
  }
}
