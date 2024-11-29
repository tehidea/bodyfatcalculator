import { create } from "zustand";
import { getUserEntitlements, UserEntitlements } from "../config/store";

interface PremiumStore extends UserEntitlements {
  isLoading: boolean;
  error: string | null;
  checkEntitlements: () => Promise<void>;
  setEntitlements: (entitlements: UserEntitlements) => void;
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
  setEntitlements: (entitlements: UserEntitlements) => set(entitlements),
}));
