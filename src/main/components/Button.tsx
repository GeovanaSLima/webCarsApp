import { Pressable, ViewStyle } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  buttonStyle?: ViewStyle | ViewStyle[];
  onLongPress?: () => void;
}

export function Button({
  children,
  onPress,
  onLongPress,
  buttonStyle,
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [buttonStyle, pressed && { opacity: 0.9 }]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {children}
    </Pressable>
  );
}
