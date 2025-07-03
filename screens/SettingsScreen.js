import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const [darkmode, setDarkmode] = useState(false);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("darkmode", JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  const onPressFunction = () => {
    const newValue = !darkmode; // Flip the value
    setDarkmode(newValue); // Update state
    storeData(newValue); // Save the correct new value
    alert(`darkmode is now: ${newValue}`);
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("darkmode");
      if (value !== null) {
        const parsed = JSON.parse(value);
        setDarkmode(parsed);
        console.log("darkmode loaded from storage:", parsed); // ✅ log the parsed value
      }
    } catch (e) {
      console.error("Error loading darkmode from AsyncStorage:", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const styles = darkmode ? stylesdark : styleslight;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>darkmode: {darkmode ? "on" : "off"}</Text>
      <Pressable style={styles.press} onPress={onPressFunction}>
        <Text style={styles.presstext}>Toggle Dark Mode</Text>
      </Pressable>
    </View>
  );
}

const styleslight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 18,
    marginBottom: 20,
  },
  press: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  presstext: {
    color: "#000",
  },
});

const stylesdark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  press: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  presstext: {
    color: "#fff",
  },
});
