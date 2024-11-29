import Purchases, { PurchasesPackage } from "react-native-purchases";
import { Platform } from "react-native";
import Constants from "expo-constants";

const API_KEYS = {
  apple: Constants.expoConfig?.extra?.revenuecat?.ios || "default_ios_key",
  google: Constants.expoConfig?.extra?.revenuecat?.android || "default_android_key",
} as const;

// Log warning for missing API keys in development
if (__DEV__) {
  if (API_KEYS.apple === "default_ios_key" || API_KEYS.google === "default_android_key") {
    console.warn("RevenueCat API keys are not configured. Using default keys for development.");
  }
}

export const ENTITLEMENTS = {
  pro: "pro_features",
  premium: "premium_subscription",
} as const;

export type Entitlement = keyof typeof ENTITLEMENTS;

export const OFFERINGS = {
  pro: {
    lifetime: "pro_lifetime",
  },
  premium: {
    monthly: "premium_monthly",
    annual: "premium_annual",
  },
  bundles: {
    proWithPremium: "pro_premium_bundle",
  },
} as const;

export interface UserEntitlements {
  pro: boolean;
  premium: boolean;
}

export async function initializeStore() {
  Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG); // Remove this in production

  await Purchases.configure({
    apiKey: Platform.select({
      ios: API_KEYS.apple,
      android: API_KEYS.google,
    }) as string,
  });
}

export async function getUserEntitlements(): Promise<UserEntitlements> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return {
      pro: customerInfo.entitlements.active[ENTITLEMENTS.pro] !== undefined,
      premium: customerInfo.entitlements.active[ENTITLEMENTS.premium] !== undefined,
    };
  } catch (error) {
    console.error("Failed to get user entitlements:", error);
    return { pro: false, premium: false };
  }
}

export async function getOfferings() {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages ?? [];
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
      premium: customerInfo.entitlements.active[ENTITLEMENTS.premium] !== undefined,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "User cancelled") {
      return getUserEntitlements();
    }
    console.error("Failed to purchase package:", error);
    throw error;
  }
}
