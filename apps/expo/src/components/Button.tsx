import { Text, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
}

export default function ButtonUI({ onPress, text }: Props) {
  return (
    <TouchableOpacity className="rounded bg-pink-400 p-2" onPress={onPress}>
      <Text className="text-center font-semibold text-white">{text}</Text>
    </TouchableOpacity>
  );
}
