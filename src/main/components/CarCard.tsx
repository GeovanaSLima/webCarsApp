import { DimensionValue, StyleSheet, Text, View, Image } from "react-native";
import { CarsProps } from "../types/cars.type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes";
import { Button } from "./Button";

interface CarItemProps {
  data: CarsProps;
  widthScreen: DimensionValue;
  enableRemove?: boolean;
  removeItem?: () => Promise<void>;
}

export function CarCard({
  data,
  widthScreen,
  enableRemove = false,
  removeItem,
}: CarItemProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  function handleNavigate() {
    navigation.navigate("carDetails", { id: data.id });
  }

  async function handleRemove() {
    if (!removeItem) return;

    await removeItem();
  }

  return (
    <Button
      buttonStyle={[styles.container, { width: widthScreen }]}
      onPress={handleNavigate}
      onLongPress={enableRemove ? handleRemove : () => {}}
    >
      <Image
        style={styles.cover}
        source={{ uri: data.images[0].url }}
        resizeMode="cover"
      />

      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.text}>
        {data.year} - {data.km} km
      </Text>
      <Text style={[styles.title, { marginTop: 14 }]}>R$ {data.price}</Text>

      <View style={styles.divisor}></View>

      <Text style={[styles.text, { marginTop: 4 }]}>{data.city}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    paddingBottom: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  cover: {
    width: "100%",
    height: 140,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 6,
    marginHorizontal: 8,
  },
  divisor: {
    width: "100%",
    height: 1,
    backgroundColor: "#d9d9d9",
  },
  text: {
    marginHorizontal: 10,
  },
});
