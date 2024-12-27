import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

interface ModalBannerProps {
  imageUrl: string;
  closeModal: () => void;
}

export function ModalBanner({ imageUrl, closeModal }: ModalBannerProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton}>
        <FontAwesome6
          name="xmark"
          size={16}
          color="#000"
          onPress={closeModal}
          style={styles.closeButtonIcon}
        />
      </Pressable>
      <TouchableWithoutFeedback>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.92)",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    backgroundColor: "#ccc",
    position: "absolute",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    zIndex: 99,
    top: 18,
    right: 14,
  },
});
