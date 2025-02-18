// Import necessary functions from @react-native/metro-config and react-native-reanimated
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Your existing Metro configuration
const config = {
  // Your custom Metro configuration options (if any)
};

// Wrap the default Metro config with Reanimated's wrapper
const reanimatedConfig = wrapWithReanimatedMetroConfig(config);

// Merge the default Metro config with your custom config and the Reanimated config
module.exports = mergeConfig(getDefaultConfig(__dirname), reanimatedConfig);