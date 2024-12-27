import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { CarDetailProp } from "../../types/cars.type";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes";
import { Feather } from "@expo/vector-icons";
import { BannerList } from "./components/BannerList";
import { BannerLoading } from "./components/Banner";
import { Label } from "./components/Label";
import { FontAwesome6 } from "@expo/vector-icons";
import * as Linking from "expo-linking";

type RouteDetailParams = {
  detail: {
    id: string;
  };
};

type DetailRouteProps = RouteProp<RouteDetailParams, "detail">;

export function CarDetails() {
  const route = useRoute<DetailRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [car, setCar] = useState<CarDetailProp>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCar() {
      if (!route.params.id) {
        return;
      }

      const docRef = doc(db, "cars", route.params.id);
      getDoc(docRef)
        .then((snapshot) => {
          if (!snapshot.data()) {
            navigation.goBack();
          }

          setCar({
            id: snapshot.id,
            name: snapshot.data()?.name,
            year: snapshot.data()?.year,
            city: snapshot.data()?.city,
            model: snapshot.data()?.model,
            uid: snapshot.data()?.uid,
            created: snapshot.data()?.created,
            description: snapshot.data()?.description,
            km: snapshot.data()?.km,
            owner: snapshot.data()?.owner,
            price: snapshot.data()?.price,
            whatsapp: snapshot.data()?.whatsapp,
            images: snapshot.data()?.images,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }

    loadCar();
  }, [route.params.id]);

  async function handleCallPhone() {
    const url = `send?phone=${car?.whatsapp}&text=Olá, gostaria de saber mais detalhes sobre esse anúncio do ${car?.name} no WebCarros`;

    await Linking.canOpenURL(`whatsapp://${url}`).then((supported) => {
      if (supported) {
        return Linking.openURL(`whatsapp://${url}`);
      } else {
        return Linking.openURL(`https://api.whatsapp.com/${url}`);
      }
    });
  }

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View style={styles.container}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={36} color="#000" />
          </Pressable>

          {loading && <BannerLoading />}

          {!loading && car?.images && (
            <BannerList
              images={car.images}
              handleOpenImage={(imageUrl) => {
                console.log(imageUrl);
              }}
            />
          )}

          <View style={styles.header}>
            <Pressable style={styles.saveContent}>
              <Feather size={22} color="#FFF" name="bookmark" />
            </Pressable>

            <Text style={styles.title}>{car?.name}</Text>
            <Text>{car?.model}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.price}>R$ {car?.price}</Text>

            <View style={styles.labels}>
              <Label label="Cidade" name={car?.city} />

              <Label label="Ano" name={car?.year} />
            </View>

            <View style={styles.labels}>
              <Label label="KM Rodados" name={car?.km} />

              <Label label="Telefone" name={car?.whatsapp} />
            </View>

            <Text style={styles.description}>Descrição Completa:</Text>

            <View style={styles.descriptionArea}>
              <Text>{car?.description}</Text>
            </View>

            <Pressable style={styles.callButton} onPress={handleCallPhone}>
              <Text style={styles.callText}>Conversar com vendedor</Text>
              <FontAwesome6 name="whatsapp" size={18} color="#FFF" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f5f8",
    alignItems: "center",
    paddingBottom: 16,
  },
  backButton: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 24,
    top: 44,
    zIndex: 99,
  },
  header: {
    backgroundColor: "#fff",
    position: "relative",
    width: "90%",
    borderRadius: 8,
    gap: 4,
    paddingVertical: 14,
    paddingHorizontal: 8,
    top: -34,
    zIndex: 999,
  },
  saveContent: {
    backgroundColor: "#ef4444",
    position: "absolute",
    zIndex: 99,
    padding: 12,
    borderRadius: 99,
    right: 8,
    top: -24,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  content: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    marginTop: -14,
    width: "100%",
  },
  price: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  labels: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 24,
    marginTop: 14,
  },
  description: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#000",
  },
  descriptionArea: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 4,
  },
  callButton: {
    width: "100%",
    padding: 8,
    backgroundColor: "#08c168",
    marginVertical: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  callText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
