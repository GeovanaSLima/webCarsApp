import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/main/routes";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F3F5F8" style="dark" />
      <Routes />
    </NavigationContainer>
  );
}
