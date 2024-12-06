import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../pages/home";
import { CarDetails } from "../pages/carDetails";
import { Favorites } from "../pages/favorites";

export type StackParamList = {
  home: undefined;
  carDetails: undefined;
  favorites: undefined;
}

const Stack = createNativeStackNavigator<StackParamList>();

export function Routes() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="home"       component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="carDetails" component={CarDetails} options={{ headerShown: false }} />
      <Stack.Screen name="favorites"  component={Favorites} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}