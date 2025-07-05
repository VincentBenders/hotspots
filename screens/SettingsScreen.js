// SettingsScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getData from "../GetData"; // Adjust path if needed

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await getData("darkMode");
      console.log("Saved theme:", savedTheme);
      if (savedTheme !== null) {
        setDarkMode(savedTheme);
      }
    };

    fetchTheme();
  }, []);

  const toggleSwitch = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newValue));
  };

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text
        style={[styles.text, darkMode ? styles.darkText : styles.lightText]}
      >
        Dark Mode
      </Text>
      <Switch onValueChange={toggleSwitch} value={darkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dark: {
    backgroundColor: "#000",
  },
  light: {
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
});

export default SettingsScreen;
