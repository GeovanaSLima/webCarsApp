import { Animated, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
import { MessagesProps } from "../contexts/ToastContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

interface ToastProps {
  messages: MessagesProps[];
  hideToast: () => void;
}

export function Toast({ messages, hideToast }: ToastProps) {
  const opacityAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (messages) {
      Animated.timing(opacityAnimated, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [messages]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnimated,
        },
      ]}
    >
      {messages &&
        messages.map((item, index) => (
          <Button
            key={index}
            buttonStyle={[
              styles.toast,
              item.type === "DEFAULT" ? styles.default : styles.success,
            ]}
            onPress={hideToast}
          >
            <Text style={styles.toastText}>{item.message}</Text>
            <FontAwesome6 name="xmark" size={14} color="#FFF" />
          </Button>
        ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    marginHorizontal: 14,
  },
  toast: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 22,
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toastText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  default: {
    backgroundColor: "rgba(0, 0, 0, 0.89)",
  },
  success: {
    backgroundColor: "rgba(0, 184, 95, 0.89)",
  },
});
