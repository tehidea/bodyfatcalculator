import { act, renderHook } from "@testing-library/react-hooks";
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
    const { result } = renderHook(() => usePremiumStore());
    act(() => {
      result.current.setEntitlements({ pro: false, premium: false });
    });
  });

  it("should handle successful PRO purchase", async () => {
    const mockPackage = { identifier: "pro_lifetime" };
    (getOfferings as jest.Mock).mockResolvedValue([mockPackage]);
    (purchasePackage as jest.Mock).mockResolvedValue({
      customerInfo: {
        entitlements: {
          active: {
            pro_features: {},
          },
        },
      },
    });

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

  it("should handle purchase failure", async () => {
    const mockPackage = { identifier: "pro_lifetime" };
    (getOfferings as jest.Mock).mockResolvedValue([mockPackage]);
    (purchasePackage as jest.Mock).mockRejectedValue(new Error("Purchase failed"));

    const { result } = renderHook(() => usePremiumStore());

    await act(async () => {
      const success = await result.current.purchasePro();
      expect(success).toBe(false);
    });

    expect(result.current.pro).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Purchase failed");
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
