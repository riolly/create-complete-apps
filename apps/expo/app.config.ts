import type { ExpoConfig } from "@expo/config";

type variants = "development" | "preview" | "production";

const projectId = "a59ace31-dfa6-469f-a58b-450caf00cc95";
const slug = "create-fullstack-mobile-app";
const vars = {
  name: {
    development: "CFMA (Dev)",
    preview: "CFMA (Prev)",
    production: "CFMA",
  },
  identifier: {
    development: "cfma.riolly.dev",
    preview: "cfma.riolly.prev",
    production: "cfma.riolly",
  },
  apiUrl: {
    development: "http://localhost:3000",
    preview: "https://preview-cfma.riolly.dev",
    production: "https://cfma.riolly.dev",
  },
  clerkPublishableKey: {
    development: "pk_test_ZXZvbHZlZC1yZWRmaXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ",
    preview: "pk_test_ZXZvbHZlZC1yZWRmaXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ",
    production: "pk_live_Y2xlcmsucmlvbGx5LmRldiQ",
  },
};

function env(variable: keyof typeof vars) {
  const variant = process.env.APP_VARIANT as variants;
  return vars[variable][variant];
}

const defineConfig = (): ExpoConfig => ({
  name: env("name"),
  slug: slug,
  scheme: "cfma",
  owner: "riolly",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: env("identifier"),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
    package: env("identifier"),
  },
  extra: {
    eas: { projectId },
    apiUrl: env("apiUrl"),
    clerkPublishableKey: env("clerkPublishableKey"),
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
