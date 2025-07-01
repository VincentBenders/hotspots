import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HotspotScreen() {
  const [points, setPoints] = useState([]);
  async function fetchPoints() {
    const response = await fetch(
      "https://raw.githubusercontent.com/VincentBenders/hotspots/refs/heads/main/coords/random_rotterdam_coords.json",
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log(data.coordinates);
    setPoints(data.coordinates);
  }
  useEffect(() => {
    fetchPoints();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {/* make row of spot */}
      {points.map((point) => (
        <Marker
          key={point.id}
          coordinate={{
            latitude: point.latitude,
            longitude: point.longitude,
          }}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
