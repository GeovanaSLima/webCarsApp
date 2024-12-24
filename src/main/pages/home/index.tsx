import React, { useState } from 'react';

import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export function Home() {
const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <Header />

      <View style={styles.container}>
        <View style={styles.inputArea}>
          <Input 
            placeholder="Digite o nome do carro..."
            value={searchInput}
            onChangeText={ (text) => setSearchInput(text) }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  inputArea: {
    width: "100%",
    marginTop: 14,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  }
})