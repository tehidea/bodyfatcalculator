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
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      console.log("Starting PRO purchase...");
      const success = await purchasePro();
      console.log("Purchase result:", success);

      if (success) {
        if (options.onSuccess) {
          options.onSuccess();
        }
        if (options.successMessage) {
          Alert.alert("Success!", options.successMessage, [{ text: "OK" }]);
        }
        return true;
      } else {
        Alert.alert(
          "Purchase Error",
          "Your purchase completed but PRO access wasn't activated. Please try restoring purchases or contact support.",
          [{ text: "OK" }]
        );
        if (options.onError) {
          options.onError();
        }
        return false;
      }
    } catch (error) {
      console.error("Purchase error:", error);
      // Handle user cancellation
      if (error instanceof Error && error.message === "Purchase was cancelled.") {
        if (options.onCancel) {
          options.onCancel();
        }
        return false;
      }
      // Handle other errors
      Alert.alert(
        "Purchase Error",
        "Something went wrong with your purchase. Please try again or contact support.",
        [{ text: "OK" }]
      );
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
