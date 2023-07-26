const path = require("path");
const loadConfig = require("tailwindcss/loadConfig");

/**
 * @type {null}
 */
let _tailwindConfig = null;
/**
 * Transpile tailwind.config.ts for babel
 * Fix until nativewind babel plugin supports tailwind.config.ts files
 */
function lazyLoadConfig() {
  return (
    _tailwindConfig ?? loadConfig(path.join(__dirname, "tailwind.config.ts"))
  );
}

/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache.forever();

  return {
    plugins: [
      [
        "nativewind/babel",
        {
          tailwindConfig: lazyLoadConfig(),
        },
      ],
      require.resolve("expo-router/babel"),
    ],
    presets: ["babel-preset-expo"],
  };
};
