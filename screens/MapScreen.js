import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { useFocusEffect, useRoute } from "@react-navigation/native";

export default function MapScreen() {
  const [points, setPoints] = useState([]);
  const mapRef = useRef(null);
  const route = useRoute();
  const location = route.params?.location;
  async function fetchPoints() {
    const response = await fetch(
      "https://raw.githubusercontent.com/VincentBenders/hotspots/refs/heads/main/coords/random_rotterdam_coords.json",
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setPoints(data.coordinates);
  }

  const askPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let location = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 3000,
        distanceInterval: 0,
      },
      makeMarker
    );
  };

  useEffect(() => {
    askPermission();
    fetchPoints();
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation={true} ref={mapRef}>
        {points.map((point) => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
          />
        ))}
      </MapView>
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
