const createIconSet = () => {
  const Icon = () => null;
  Icon.getFontFamily = () => 'mock-font';
  Icon.getRawGlyphMap = () => ({});
  Icon.loadFont = () => Promise.resolve();
  return Icon;
};

const createIconSetFromFontello = createIconSet;
const createMultiStyleIconSet = createIconSet;

const Font = {
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn().mockResolvedValue()
};

module.exports = {
  createIconSet,
  createIconSetFromFontello,
  createMultiStyleIconSet,
  Font,
  MaterialIcons: createIconSet(),
  MaterialCommunityIcons: createIconSet(),
  Ionicons: createIconSet(),
  FontAwesome: createIconSet(),
  FontAwesome5: createIconSet(),
  Feather: createIconSet()
};