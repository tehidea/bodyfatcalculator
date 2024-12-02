import { renderHook, act } from "@testing-library/react-native";
import { usePremiumStore } from "../store/premiumStore";
import { getOfferings, purchasePackage, getUserEntitlements } from "../config/store";

// Mock RevenueCat functions
jest.mock("../config/store", () => ({
  getOfferings: jest.fn(),
  purchasePackage: jest.fn(),
  getUserEntitlements: jest.fn(),
}));

describe("Premium Store", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle successful PRO purchase", async () => {
    const mockPackage = { identifier: "pro_lifetime" };
    (getOfferings as jest.Mock).mockResolvedValue([mockPackage]);
    (purchasePackage as jest.Mock).mockResolvedValue({ pro: true, premium: false });

    const { result } = renderHook(() => usePremiumStore());

    await act(async () => {
      const success = await result.current.purchasePro();
      expect(success).toBe(true);
    });

    expect(result.current.pro).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle purchase cancellation", async () => {
    const mockPackage = { identifier: "pro_lifetime" };
    (getOfferings as jest.Mock).mockResolvedValue([mockPackage]);
    (purchasePackage as jest.Mock).mockRejectedValue(new Error("User cancelled"));

    const { result } = renderHook(() => usePremiumStore());

    await act(async () => {
      const success = await result.current.purchasePro();
      expect(success).toBe(false);
    });

    expect(result.current.pro).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle authentication failure", async () => {
    const mockPackage = { identifier: "pro_lifetime" };
    (getOfferings as jest.Mock).mockResolvedValue([mockPackage]);
    (purchasePackage as jest.Mock).mockRejectedValue(
      new Error("Authentication Failed The authentication failed.")
    );

    const { result } = renderHook(() => usePremiumStore());

    await act(async () => {
      const success = await result.current.purchasePro();
      expect(success).toBe(false);
    });

    expect(result.current.pro).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle no active account error", async () => {
    const mockPackage = { identifier: "pro_lifetime" };
    (getOfferings as jest.Mock).mockResolvedValue([mockPackage]);
    (purchasePackage as jest.Mock).mockRejectedValue(new Error("No active account"));

    const { result } = renderHook(() => usePremiumStore());

    await act(async () => {
      const success = await result.current.purchasePro();
      expect(success).toBe(false);
    });

    expect(result.current.pro).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle restore purchases", async () => {
    (getUserEntitlements as jest.Mock).mockResolvedValue({
      pro: true,
      premium: false,
    });

    const { result } = renderHook(() => usePremiumStore());

    await act(async () => {
      await result.current.restorePurchases();
    });

    expect(result.current.pro).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
