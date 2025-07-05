import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HotspotScreen from "./screens/HotspotScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import getData from "./GetData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [darkmode, setDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await getData("darkmode");
      if (savedTheme !== null) {
        setDarkMode(savedTheme);
      }
      setIsReady(true);
    };
    loadTheme();
  }, []);

  const handleSetDarkMode = async (value) => {
    setDarkMode(value);
    await AsyncStorage.setItem("darkmode", JSON.stringify(value));
  };

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Hotspots") {
              iconName = focused ? "flame" : "flame-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: darkmode ? "#fff" : "tomato",
          tabBarInactiveTintColor: darkmode ? "#aaa" : "gray",
          tabBarStyle: { backgroundColor: darkmode ? "#000" : "#fff" },
        })}
      >
        <Tab.Screen name="Home">
          {() => <MapScreen darkmode={darkmode} />}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {() => (
            <SettingsScreen
              darkmode={darkmode}
              setDarkMode={handleSetDarkMode}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Hotspots">
          {() => <HotspotScreen darkmode={darkmode} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
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
