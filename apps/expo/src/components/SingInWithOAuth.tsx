import * as React from "react";
import { Pressable, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow: startGoogleAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const onPressGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleAuthFlow();

      if (createdSessionId && setActive) {
        void setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.error("OAuth error", err);
    }
  }, [startGoogleAuthFlow]);

  const { startOAuthFlow: startDiscordAuthFlow } = useOAuth({
    strategy: "oauth_discord",
  });

  const onPressDiscord = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startDiscordAuthFlow();

      if (createdSessionId && setActive) {
        void setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.error("OAuth error", err);
    }
  }, [startDiscordAuthFlow]);

  return (
    <View className="space-y-2">
      <Pressable
        className="rounded-md bg-blue-500 px-4 py-3"
        onPress={() => {
          void onPressGoogle();
        }}
      >
        <Text className="self-center">Sign in with Google</Text>
      </Pressable>
      <Pressable
        className="rounded-md bg-blue-500 px-4 py-3"
        onPress={() => {
          void onPressDiscord();
        }}
      >
        <Text className="self-center">Sign in with Discord</Text>
      </Pressable>
    </View>
  );
};
export default SignInWithOAuth;
