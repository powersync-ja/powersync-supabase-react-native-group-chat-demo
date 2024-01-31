const { withTamagui } = require("@tamagui/metro-plugin");
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;

const extraNodeModules = {
  common: path.resolve(projectRoot + "/../tinybase"),
};

const watchFolders = [path.resolve(__dirname + "/../tinybase")];

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable package exports
// config.resolver.unstable_enablePackageExports = true;

config.resolver.extraNodeModules = extraNodeModules;
config.watchFolders = watchFolders;

// Enable Tamagui
module.exports = withTamagui(config, {
  components: ["tamagui"],
  config: "./src/tamagui.config.ts",
});
