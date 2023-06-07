/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: [
    // relative path to monorepo root
    '../../node_modules',
    '../../shared/hooks',
    '../../shared/components',
    '../../shared/apis',
    '../../shared/state',
  ],
};
