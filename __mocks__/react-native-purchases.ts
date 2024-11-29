const mockPurchases = {
  setDebugLogsEnabled: jest.fn(),
  configure: jest.fn(),
  getOfferings: jest.fn(),
  purchasePackage: jest.fn(),
  restorePurchases: jest.fn(),
  // Add any other methods you're using from the package
};

export default mockPurchases;
