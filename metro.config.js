const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable Fast Refresh
config.transformer.minifierConfig.compress.drop_console = false;
config.transformer.minifierConfig.compress.drop_debugger = false;

// Enable source maps
config.transformer.sourceMaps = true;

// Enable inline requires
config.transformer.inlineRequires = true;

// Enable watch mode
config.watchFolders = [__dirname];

module.exports = config; 