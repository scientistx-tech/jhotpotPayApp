import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToStorage = async (key: string, value: any): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = async <T>(key: string): Promise<T | null> => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeFromStorage = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};
