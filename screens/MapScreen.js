import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";

export default function MapScreen({ route }) {
  const [points, setPoints] = useState([]);
  const mapRef = useRef(null);
  const focusPoint = route?.params?.focusPoint;
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
    if (focusPoint && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: focusPoint.latitude,
          longitude: focusPoint.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      ); // duration in ms
    }
  }, [focusPoint]);

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
        {/* <Marker
      key={1}
      coordinate={points[4]}
      title={''}
      description={''}
    /> */}
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
