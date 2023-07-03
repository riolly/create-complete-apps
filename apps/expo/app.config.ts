import type { ExpoConfig } from "@expo/config";

type variants = "development" | "preview" | "production";

const projectId = "a59ace31-dfa6-469f-a58b-450caf00cc95";
const vars = {
  name: {
    development: "CFM (Dev)",
    preview: "CFM (Prev)",
    production: "CFM",
  },
  identifier: {
    development: "com.riolly.cfm.dev",
    preview: "com.riolly.cfm.prev",
    production: "com.riolly.cfm",
  },
  apiUrl: {
    development: "http://localhost:3000",
    preview: "https://preview-cfm.riolly.dev",
    production: "https://cfm.riolly.dev",
  },
  clerkPublishableKey: {
    development: "pk_test_ZXZvbHZlZC1yZWRmaXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ",
    preview: "pk_test_ZXZvbHZlZC1yZWRmaXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ",
    production: "pk_live_Y2xlcmsucmlvbGx5LmRldiQ",
  },
};

function env(variable: keyof typeof vars) {
  let variant: variants;
  if (!process.env.APP_VARIANT) {
    variant = "development";
  } else if (process.env.APP_VARIANT === "preview") {
    variant = "preview";
  } else {
    variant = "production";
  }

  return vars[variable][variant];
}

const defineConfig = (): ExpoConfig => ({
  name: env("name"),
  slug: "create-fullstack-mobile",
  owner: "riolly",
  scheme: "expo",
  version: "1.0.0",
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
