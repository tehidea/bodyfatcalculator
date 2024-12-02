import { create } from "zustand";
import {
  getUserEntitlements,
  UserEntitlements,
  purchasePackage,
  getOfferings,
} from "../config/store";
import { Alert } from "react-native";

interface PurchaseState {
  isLoading: boolean;
  error: string | null;
}

interface PremiumStore extends UserEntitlements {
  isLoading: boolean;
  error: string | null;
  checkEntitlements: () => Promise<void>;
  setEntitlements: (entitlements: UserEntitlements) => void;
  purchasePro: () => Promise<boolean>;
  restorePurchases: () => Promise<void>;
}

export const usePremiumStore = create<PremiumStore>(set => ({
  pro: false,
  premium: false,
  isLoading: false,
  error: null,
  checkEntitlements: async () => {
    set({ isLoading: true, error: null });
    try {
      const entitlements = await getUserEntitlements();
      set({ ...entitlements, isLoading: false });
    } catch (error) {
      set({ error: "Failed to check entitlements", isLoading: false });
    }
  },
  setEntitlements: (entitlements: UserEntitlements) => {
    set({ ...entitlements, premium: false });
  },
  purchasePro: async () => {
    set({ isLoading: true, error: null });
    try {
      const offerings = await getOfferings();
      const proPackage = offerings[0]; // We only have one package now

      if (!proPackage) {
        throw new Error("PRO package not available");
      }

      const entitlements = await purchasePackage(proPackage);
      set({ ...entitlements, isLoading: false });
      return true;
    } catch (error) {
      if (error instanceof Error && error.message === "User cancelled") {
        set({ isLoading: false });
        return false;
      }
      set({ error: "Purchase failed", isLoading: false });
      Alert.alert(
        "Purchase Failed",
        "There was an error processing your purchase. Please try again.",
        [{ text: "OK" }]
      );
      return false;
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
