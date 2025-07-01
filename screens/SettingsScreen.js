import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("darkmode", JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };
  const [darkmode, setDarkmode] = useState(false);
  const onPressFunction = () => {
    alert(`darkmode on, darkmode: ${darkmode}`);
    if (darkmode == false) {
      setDarkmode(true);
    }
    if (darkmode == true) {
      setDarkmode(false);
    }

    storeData(darkmode);
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("darkmode");
      if (value !== null) {
        // value previously stored
        if (value == "true") setDarkmode(true);
        if (value == "false") setDarkmode(false);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>darkmode: </Text>
      <Pressable onPress={onPressFunction}>
        <Text>darkmode</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
