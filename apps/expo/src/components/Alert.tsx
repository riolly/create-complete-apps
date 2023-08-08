import { Alert } from "react-native";

interface Props {
  title: string;
  message: string;
  text?: string;
  onPress?: () => void;
}

export default function createAlert({ title, message, text, onPress }: Props) {
  return Alert.alert(title, message, [
    {
      text,
      onPress,
    },
  ]);
}
