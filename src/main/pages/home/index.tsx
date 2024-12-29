import React, { useCallback, useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from "react-native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { CarsProps } from "../../types/cars.type";
import { CarCard } from "../../components/CarCard";

export function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      await loadCars();
    }

    fetchCars();
  }, []);

  async function loadCars() {
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));

    getDocs(queryRef).then((snapshot) => {
      let listCars = [] as CarsProps[];

      snapshot.forEach((doc) => {
        listCars.push({
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          km: doc.data().km,
          city: doc.data().city,
          price: doc.data().price,
          uid: doc.data().uid,
          images: doc.data().images,
        });
      });

      setCars(listCars);
      setLoading(false);
    });
  }

  const debounce = (func: (...args: string[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: string[]) => {
      if (timeout) {
        clearInterval(timeout);
      }

      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  function handleInputChange(text: string) {
    setSearchInput(text);
    delayedApiCall(text);
  }

  const delayedApiCall = useCallback(
    debounce(async (newText: string) => await fetchSearchCar(newText), 1000),
    []
  );

  async function fetchSearchCar(newText: string) {
    if (newText === "") {
      await loadCars();
      setSearchInput("");
      return;
    }

    setCars([]);
    const q = query(
      collection(db, "cars"),
      where("name", ">=", newText.toUpperCase()),
      where("name", "<=", newText.toUpperCase() + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    let listCars = [] as CarsProps[];

    querySnapshot.forEach((doc) => {
      listCars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        uid: doc.data().uid,
        images: doc.data().images,
      });
    });

    setCars(listCars);
    Keyboard.dismiss();
  }

  return (
    <>
      <Header />

      <View style={styles.container}>
        <View style={styles.inputArea}>
          <Input
            placeholder="Digite o nome do carro..."
            value={searchInput}
            onChangeText={(text) => handleInputChange(text)}
          />
        </View>

        {loading && (
          <ActivityIndicator
            style={{ marginTop: 14 }}
            size="large"
            color="#000"
          />
        )}

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CarCard
              data={item}
              widthScreen={cars.length <= 1 ? "100%" : "49%"}
            />
          )}
          style={styles.list}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 14 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f5f8",
    flex: 1,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  inputArea: {
    width: "100%",
    marginTop: 14,
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
  },
  list: {
    flex: 1,
    marginTop: 4,
    paddingTop: 14,
  },
});
