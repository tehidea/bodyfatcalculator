import { create } from "zustand";
import {
  getUserEntitlements,
  UserEntitlements,
  purchasePackage,
  getOfferings,
} from "../config/store";
import { Alert } from "react-native";

interface PremiumStore {
  pro: boolean;
  isLoading: boolean;
  error: string | null;
  checkEntitlements: () => Promise<void>;
  setEntitlements: (entitlements: UserEntitlements) => void;
  purchasePro: () => Promise<boolean>;
  restorePurchases: () => Promise<void>;
}

export const usePremiumStore = create<PremiumStore>(set => ({
  pro: false,
  isLoading: false,
  error: null,
  checkEntitlements: async () => {
    console.log("checkEntitlements - Starting check");
    set({ isLoading: true, error: null });
    try {
      const entitlements = await getUserEntitlements();
      console.log("checkEntitlements - Retrieved entitlements:", entitlements);
      set({ ...entitlements, isLoading: false });
    } catch (error) {
      console.error("checkEntitlements - Error:", error);
      set({ error: "Failed to check entitlements", isLoading: false });
    }
  },
  setEntitlements: (entitlements: UserEntitlements) => {
    console.log("setEntitlements - Setting new entitlements:", entitlements);
    set({ ...entitlements });
  },
  purchasePro: async () => {
    console.log("purchasePro - Starting with current state:", { isLoading: false, error: null });
    set({ isLoading: true, error: null });

    try {
      const offerings = await getOfferings();
      console.log("purchasePro - Got offerings:", offerings);
      const proPackage = offerings[0];

      if (!proPackage) {
        console.log("purchasePro - No PRO package available");
        set({ isLoading: false, error: null, pro: false });
        throw new Error("PRO package not available");
      }

      console.log("purchasePro - Attempting to purchase package");
      const entitlements = await purchasePackage(proPackage);
      console.log("purchasePro - Purchase successful, entitlements:", entitlements);

      set({ ...entitlements, isLoading: false, error: null });
      return entitlements.pro;
    } catch (error) {
      console.error("purchasePro - Error:", error);
      if (error instanceof Error) {
        if (error.message === "User cancelled") {
          console.log("purchasePro - User cancelled");
          set({ isLoading: false, error: null, pro: false });
          return false;
        }

        if (
          error.message.includes("Authentication Failed") ||
          error.message.includes("No active account")
        ) {
          console.log("purchasePro - Authentication failed");
          set({ isLoading: false, error: null, pro: false });
          Alert.alert(
            "Sign In Required",
            "Please sign in with your Sandbox Tester account in Settings > App Store.",
            [{ text: "OK" }]
          );
          return false;
        }
      }

      console.log("purchasePro - Other error occurred");
      set({ error: "Purchase failed", isLoading: false, pro: false });
      throw error;
    }
  },
  restorePurchases: async () => {
    set({ isLoading: true, error: null });
    try {
      const entitlements = await getUserEntitlements();
      set({ ...entitlements, isLoading: false });
      if (entitlements.pro) {
        Alert.alert("Success", "Your PRO access has been restored!", [{ text: "OK" }]);
      } else {
        Alert.alert("No Purchases Found", "No previous purchases were found to restore.", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      set({ error: "Failed to restore purchases", isLoading: false });
      Alert.alert("Error", "Failed to restore purchases. Please try again.", [{ text: "OK" }]);
    }
  },
}));
