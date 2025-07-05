import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key) => {
  try {
    console.log("Reading key:", key);
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading value:", e);
    return null;
  }
};

export default getData;
