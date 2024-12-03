import { useState } from "react";
import { Alert } from "react-native";
import { usePremiumStore } from "../store/premiumStore";

interface UsePurchaseOptions {
  onSuccess?: () => void;
  successMessage?: string;
  onCancel?: () => void;
  onError?: () => void;
}

export function usePurchase(options: UsePurchaseOptions = {}) {
  const { purchasePro } = usePremiumStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    if (isProcessing) return false;

    try {
      setIsProcessing(true);
      console.log("Starting PRO purchase...");
      const success = await purchasePro();

      // Handle success
      if (success) {
        if (options.onSuccess) {
          options.onSuccess();
        }
        if (options.successMessage) {
          Alert.alert("Success!", options.successMessage, [{ text: "OK" }]);
        }
        return true;
      }

      // purchasePro returns false for cancellation and other failures
      // We don't need to show any alerts as they're handled in the store
      if (options.onCancel) {
        options.onCancel();
      }
      return false;
    } catch (error) {
      // This should never happen as all errors are handled in the store
      console.error("Unexpected purchase error:", error);
      if (options.onError) {
        options.onError();
      }
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handlePurchase,
    isProcessing,
  };
}
