import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getData from "../GetData";

const SettingsScreen = ({ darkmode, setDarkMode }) => {
  const toggleSwitch = () => {
    setDarkMode(!darkmode);
  };

  return (
    <View style={[styles.container, darkmode ? styles.dark : styles.light]}>
      <Text
        style={[styles.text, darkmode ? styles.darkText : styles.lightText]}
      >
        Dark Mode
      </Text>
      <Switch onValueChange={toggleSwitch} value={darkmode} />
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
