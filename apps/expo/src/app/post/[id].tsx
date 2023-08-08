import { SafeAreaView, Text, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { api } from "~/utils/api";
import createAlert from "~/components/Alert";
import ButtonUI from "~/components/Button";

const Post: React.FC = () => {
  const { id } = useLocalSearchParams();
  const { push, replace } = useRouter();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data, isInitialLoading } = api.post.byId.useQuery({ id });

  if (!data && !isInitialLoading) {
    createAlert({
      title: "Error",
      message: "Post not found.",
      text: "Back to home",
      onPress: () => replace("/"),
    });
  }

  return (
    <SafeAreaView className="bg-[#1F104A]">
      {data && (
        <>
          <Stack.Screen options={{ title: data.title }} />
          <View className="h-full w-full p-4">
            <Text className="py-2 text-3xl font-bold text-white">
              {data.title}
            </Text>
            <Text className="py-4 text-white">{data.content}</Text>
            <ButtonUI onPress={() => push("/")} text="Back" />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Post;
