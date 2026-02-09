import Purchases from 'react-native-purchases'
import {
  ENTITLEMENTS,
  getOfferings,
  getUserEntitlements,
  initializeStore,
  PRODUCTS,
  purchasePackage,
} from '../config/store'

// Mock react-native-purchases
jest.mock('react-native-purchases', () => ({
  configure: jest.fn(),
  setLogLevel: jest.fn(),
  getCustomerInfo: jest.fn(),
  getOfferings: jest.fn(),
  purchasePackage: jest.fn(),
  syncPurchases: jest.fn(),
  LOG_LEVEL: {
    DEBUG: 'DEBUG',
  },
}))

// Mock Platform
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios),
  },
}))

describe('Store Module', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initializeStore', () => {
    it('should initialize purchases with correct API key', async () => {
      const mockCustomerInfo = {
        allPurchasedProductIdentifiers: [],
        entitlements: { active: {} },
      }
      ;(Purchases.getCustomerInfo as jest.Mock).mockResolvedValue(mockCustomerInfo)

      await initializeStore()

      expect(Purchases.configure).toHaveBeenCalledWith({
        apiKey: expect.any(String),
      })
    })

    it('should set debug log level in development', async () => {
      const originalDev = global.__DEV__
      global.__DEV__ = true

      const mockCustomerInfo = {
        allPurchasedProductIdentifiers: [],
        entitlements: { active: {} },
      }
      ;(Purchases.getCustomerInfo as jest.Mock).mockResolvedValue(mockCustomerInfo)

      await initializeStore()

      expect(Purchases.setLogLevel).toHaveBeenCalledWith(Purchases.LOG_LEVEL.DEBUG)

      global.__DEV__ = originalDev
    })
  })

  describe('getUserEntitlements', () => {
    it('should return isPremium: true when user has legacy pro product', async () => {
      const mockCustomerInfo = {
        allPurchasedProductIdentifiers: [PRODUCTS.pro.lifetime],
        entitlements: { active: {} },
      }
      ;(Purchases.getCustomerInfo as jest.Mock).mockResolvedValue(mockCustomerInfo)

      const result = await getUserEntitlements()

      expect(result).toEqual({ isPremium: true, isLegacyPro: true })
    })

    it('should return isPremium: true when user has legacy pro entitlement', async () => {
      const mockCustomerInfo = {
        allPurchasedProductIdentifiers: [],
        entitlements: { active: { [ENTITLEMENTS.pro]: {} } },
      }
      ;(Purchases.getCustomerInfo as jest.Mock).mockResolvedValue(mockCustomerInfo)

      const result = await getUserEntitlements()

      expect(result).toEqual({ isPremium: true, isLegacyPro: true })
    })

    it('should return isPremium: true when user has premium entitlement', async () => {
      const mockCustomerInfo = {
        allPurchasedProductIdentifiers: [],
        entitlements: { active: { [ENTITLEMENTS.premium]: {} } },
      }
      ;(Purchases.getCustomerInfo as jest.Mock).mockResolvedValue(mockCustomerInfo)

      const result = await getUserEntitlements()

      expect(result).toEqual({ isPremium: true, isLegacyPro: false })
    })

    it('should return isPremium: false when user has neither product nor entitlement', async () => {
      const mockCustomerInfo = {
        allPurchasedProductIdentifiers: [],
        entitlements: { active: {} },
      }
      ;(Purchases.getCustomerInfo as jest.Mock).mockResolvedValue(mockCustomerInfo)

      const result = await getUserEntitlements()

      expect(result).toEqual({ isPremium: false, isLegacyPro: false })
    })

    it('should handle errors and return defaults', async () => {
      ;(Purchases.getCustomerInfo as jest.Mock).mockRejectedValue(new Error('API Error'))

      const result = await getUserEntitlements()

      expect(result).toEqual({ isPremium: false, isLegacyPro: false })
    })
  })

  describe('getOfferings', () => {
    it('should return available packages from default offering', async () => {
      const mockPackage = { identifier: 'premium_monthly' }
      const mockOfferings = {
        all: {
          default: {
            availablePackages: [mockPackage, { identifier: 'other_package' }],
          },
        },
        current: {
          availablePackages: [mockPackage, { identifier: 'other_package' }],
        },
      }
      ;(Purchases.getOfferings as jest.Mock).mockResolvedValue(mockOfferings)

      const result = await getOfferings()

      expect(result).toEqual([mockPackage, { identifier: 'other_package' }])
    })

    it('should return grandfathered offering for legacy pro users', async () => {
      const mockLegacyPackage = { identifier: 'premium_monthly_legacy' }
      const mockOfferings = {
        all: {
          grandfathered_pro: {
            availablePackages: [mockLegacyPackage],
          },
        },
        current: null,
      }
      ;(Purchases.getOfferings as jest.Mock).mockResolvedValue(mockOfferings)

      const result = await getOfferings(true)

      expect(result).toEqual([mockLegacyPackage])
    })

    it('should return empty array when no offerings available', async () => {
      ;(Purchases.getOfferings as jest.Mock).mockResolvedValue({ all: {} })

      const result = await getOfferings()

      expect(result).toEqual([])
    })

    it('should handle errors and return empty array', async () => {
      ;(Purchases.getOfferings as jest.Mock).mockRejectedValue(new Error('API Error'))

      const result = await getOfferings()

      expect(result).toEqual([])
    })
  })

  describe('purchasePackage', () => {
    const mockPackage = { identifier: 'premium_monthly' } as any

    it('should handle successful purchase with immediate activation', async () => {
      const mockCustomerInfo = {
        allPurchasedProductIdentifiers: [],
        entitlements: { active: { [ENTITLEMENTS.premium]: {} } },
      }
      ;(Purchases.purchasePackage as jest.Mock).mockResolvedValue({
        customerInfo: mockCustomerInfo,
      })

      const result = await purchasePackage(mockPackage)

      expect(result).toEqual({ isPremium: true, isLegacyPro: false })
    })

    it('should handle successful purchase with delayed activation', async () => {
      const initialCustomerInfo = {
        allPurchasedProductIdentifiers: [],
        entitlements: { active: {} },
      }
      const updatedCustomerInfo = {
        allPurchasedProductIdentifiers: [],
        entitlements: { active: { [ENTITLEMENTS.premium]: {} } },
      }

      ;(Purchases.purchasePackage as jest.Mock).mockResolvedValue({
        customerInfo: initialCustomerInfo,
      })
      ;(Purchases.getCustomerInfo as jest.Mock)
        .mockResolvedValueOnce(initialCustomerInfo)
        .mockResolvedValueOnce(updatedCustomerInfo)

      const result = await purchasePackage(mockPackage)

      expect(result).toEqual({ isPremium: true, isLegacyPro: false })
      expect(Purchases.syncPurchases).toHaveBeenCalled()
    })

    it('should handle user cancellation', async () => {
      ;(Purchases.purchasePackage as jest.Mock).mockRejectedValue(new Error('User cancelled'))

      const result = await purchasePackage(mockPackage)

      expect(result).toEqual({ isPremium: false, isLegacyPro: false })
    })

    it('should throw on unexpected errors', async () => {
      const error = new Error('Unexpected error')
      ;(Purchases.purchasePackage as jest.Mock).mockRejectedValue(error)

      await expect(purchasePackage(mockPackage)).rejects.toThrow(error)
    })
  })
})
