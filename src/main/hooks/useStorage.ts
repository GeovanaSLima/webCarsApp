import AsyncStorage from "@react-native-async-storage/async-storage";
import { CarsProps } from "../types/cars.type";

const key = "@webcars";

const useStorage = () => {
  const getItem = async (): Promise<CarsProps[]> => {
    try {
      const cars = await AsyncStorage.getItem(key);
      return cars ? JSON.parse(cars) : [];
    } catch {
      return [];
    }
  };

  const saveItem = async (newCar: CarsProps) => {
    try {
      let cars = await getItem();

      let findCar = cars.find((car) => car.id === newCar.id);

      if (findCar) {
        return;
      }

      cars.push(newCar);

      await AsyncStorage.setItem(key, JSON.stringify(cars));
      console.log("carro favoritado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id: string): Promise<CarProps[]> | [] => {
    try {
      let cars = await getItem();

      let updatedCarList = cars.filter((car) => {
        return car.id !== id;
      });

      await AsyncStorage.setItem(key, JSON.stringify(updatedCarList));

      return updatedCarList;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
