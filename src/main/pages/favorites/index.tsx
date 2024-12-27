import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes";
import { useEffect, useState } from "react";
import { CarsProps } from "../../types/cars.type";
import { CarCard } from "../../components/CarCard";
import useStorage from "../../hooks/useStorage";

export function Favorites() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [cars, setCars] = useState<CarsProps[]>([]);
  const { getItem, removeItem } = useStorage();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadFavoriteCars() {
      const favoriteCars = await getItem();
      setCars(favoriteCars);
    }

    loadFavoriteCars();
  }, [isFocused]);

  async function handleRemoveCar(id: string) {
    const listCars = await removeItem(id);
    setCars(listCars);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* TODO: search how to add opacity when clicking the pressable */}
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.title}>Meus Favoritos</Text>
      </View>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarCard
            data={item}
            widthScreen={"100%"}
            enableRemove={true}
            removeItem={() => handleRemoveCar(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 14 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 24,
    paddingVertical: 14,
  },
  title: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    marginTop: 4,
    paddingTop: 14,
  },
});
