import { Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes";

export function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  function handleNavigateFavorite() {
    navigation.navigate("favorites");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../../assets/logo.png")} />

      <Pressable style={styles.button} onPress={handleNavigateFavorite}>
        <Feather name="bookmark" size={22} color="#FFF" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.3,
    borderBlockColor: "#a8a8a8",
  },
  button: {
    backgroundColor: "#1f1f1f",
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
