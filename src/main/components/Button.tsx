import { Pressable, ViewStyle } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  key?: number;
  onPress?: () => void;
  buttonStyle?: ViewStyle | ViewStyle[];
  onLongPress?: () => void;
}

export function Button({
  children,
  key,
  onPress,
  onLongPress,
  buttonStyle,
}: ButtonProps) {
  return (
    <Pressable
      key={key}
      style={({ pressed }) => [buttonStyle, pressed && { opacity: 0.9 }]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {children}
    </Pressable>
  );
}
