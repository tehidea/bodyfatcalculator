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

export const usePremiumStore = create<PremiumStore>((set, get) => ({
  pro: false,
  isLoading: false,
  error: null,
  checkEntitlements: async () => {
    console.log("checkEntitlements - Starting check");
    set({ isLoading: true, error: null });
    try {
      const entitlements = await getUserEntitlements();
      console.log("checkEntitlements - Retrieved entitlements:", entitlements);
      set({ ...entitlements, isLoading: false, error: null });
    } catch (error) {
      console.error("checkEntitlements - Error:", error);
      set({ isLoading: false, error: null });
    }
  },
  setEntitlements: (entitlements: UserEntitlements) => {
    console.log("setEntitlements - Setting new entitlements:", entitlements);
    set({ ...entitlements });
  },
  purchasePro: async () => {
    console.log("purchasePro - Starting with current state:", { isLoading: false, error: null });

    // Prevent multiple simultaneous purchase attempts
    if (get().isLoading) {
      console.log("purchasePro - Purchase already in progress");
      return false;
    }

    set({ isLoading: true, error: null });

    try {
      const offerings = await getOfferings();

      // Check if the store is still in loading state (hasn't been cancelled)
      if (!get().isLoading) {
        console.log("purchasePro - Operation cancelled");
        return false;
      }

      console.log("purchasePro - Got offerings:", offerings);
      const proPackage = offerings[0];

      if (!proPackage) {
        console.log("purchasePro - No PRO package available");
        set({ isLoading: false, error: null, pro: false });
        return false;
      }

      console.log("purchasePro - Attempting to purchase package");
      const entitlements = await purchasePackage(proPackage);

      // Check if the store is still in loading state
      if (!get().isLoading) {
        console.log("purchasePro - Operation cancelled");
        return false;
      }

      console.log("purchasePro - Purchase successful, entitlements:", entitlements);
      set({ ...entitlements, isLoading: false, error: null });
      return entitlements.pro;
    } catch (error) {
      console.error("purchasePro - Error:", error);

      if (!get().isLoading) {
        return false;
      }

      set({ isLoading: false, error: null, pro: false });

      if (error instanceof Error) {
        // Handle user cancellation
        if (error.message === "User cancelled" || error.message === "Purchase was cancelled.") {
          console.log("purchasePro - User cancelled");
          return false;
        }

        // Handle authentication errors
        if (
          error.message.includes("Authentication Failed") ||
          error.message.includes("No active account")
        ) {
          console.log("purchasePro - Authentication failed");
          Alert.alert(
            "Sign In Required",
            "Please sign in with your Sandbox Tester account in Settings > App Store.",
            [{ text: "OK" }]
          );
          return false;
        }
      }

      return false;
    }
  },
  restorePurchases: async () => {
    set({ isLoading: true, error: null });
    try {
      const entitlements = await getUserEntitlements();
      set({ ...entitlements, isLoading: false, error: null });
      if (entitlements.pro) {
        Alert.alert("Success", "Your PRO access has been restored!", [{ text: "OK" }]);
      } else {
        Alert.alert("No Purchases Found", "No previous purchases were found to restore.", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      set({ isLoading: false, error: null });
      Alert.alert("Error", "Failed to restore purchases. Please try again.", [{ text: "OK" }]);
    }
  },
}));
