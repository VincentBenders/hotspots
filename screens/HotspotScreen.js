import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HotspotScreen({ navigation }) {
  const [points, setPoints] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [darkmode, setDarkmode] = useState(false);
  const fetchPoints = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/VincentBenders/hotspots/refs/heads/main/coords/random_rotterdam_coords.json",
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log(data.coordinates);
    setPoints(data.coordinates);
  };

  const focusOnPoint = () => {
    navigation.navigate("Home", {
      focusPoint: point,
    });
  };

  const getFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem("favorites");
      if (value !== null) {
        const parsed = JSON.parse(value);
        setFavorites(parsed);
      }
    } catch (e) {
      console.error("Error loading favorites from AsyncStorage:", e);
    }
  };

  const storeFavorites = async (value) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  const favoriteSpot = (id) => {
    let updatedFavorites;

    if (!favorites.includes(id)) {
      updatedFavorites = [...favorites, id];
    } else {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    }

    setFavorites(updatedFavorites);
    storeFavorites(updatedFavorites);
  };

  useEffect(() => {
    fetchPoints();
    getFavorites();
    const fetchTheme = async () => {
      const savedTheme = await getData("darkMode");
      console.log("Saved theme:", savedTheme);
      if (savedTheme !== null) {
        setDarkMode(savedTheme);
      }
    };

    fetchTheme();
  }, []);

  const styles = darkmode ? stylesDark : stylesLight;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Select a hotspot to focus on or favorite it:
      </Text>
      {points.map((point) => (
        <View key={point.id} style={styles.pointRow}>
          <Pressable
            style={styles.press}
            onPress={() => navigation.navigate("Home", { focusPoint: point })}
          >
            <Text style={styles.presstext}>
              lat: {point.latitude} lon: {point.longitude}
            </Text>
          </Pressable>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => favoriteSpot(point.id)}
          >
            <Text style={styles.presstext}>
              {favorites.includes(point.id) ? "★" : "☆"}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const baseStyles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  press: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  presstext: {
    fontSize: 16,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 5,
  },
};

const stylesLight = StyleSheet.create({
  ...baseStyles,
  container: {
    ...baseStyles.container,
    backgroundColor: "#fff",
  },
  text: {
    ...baseStyles.text,
    color: "#000",
  },
  press: {
    ...baseStyles.press,
    backgroundColor: "#eee",
  },
  presstext: {
    ...baseStyles.presstext,
    color: "#000",
  },
  favoriteButton: {
    ...baseStyles.favoriteButton,
    backgroundColor: "#ddd",
  },
});

const stylesDark = StyleSheet.create({
  ...baseStyles,
  container: {
    ...baseStyles.container,
    backgroundColor: "#121212",
  },
  text: {
    ...baseStyles.text,
    color: "#fff",
  },
  press: {
    ...baseStyles.press,
    backgroundColor: "#333",
  },
  presstext: {
    ...baseStyles.presstext,
    color: "#fff",
  },
  favoriteButton: {
    ...baseStyles.favoriteButton,
    backgroundColor: "#444",
  },
});
