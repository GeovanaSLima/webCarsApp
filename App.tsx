import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Routes } from "./src/main/routes";
import { ToastProvider } from "./src/main/contexts/ToastContext";

export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <Routes />
      </ToastProvider>
    </NavigationContainer>
  );
}
