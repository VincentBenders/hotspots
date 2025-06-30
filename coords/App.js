import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [points, setPoints] = useState([])
  async function fetchPoints(){
    const response = await fetch('https://raw.githubusercontent.com/VincentBenders/hotspots/refs/heads/main/coords/random_rotterdam_coords.json', {
        method:'GET',
        
    });

    const data = await response.json();
    console.log(data.coordinates);
    setPoints(data.coordinates)
}


  const askPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    let location = await Location.watchPositionAsync({accuracy: Location.Accuracy.High, timeInterval: 3000, distanceInterval: 0}, makeMarker);
    
  }

  const makeMarker = (currentLocation) => {
    // console.log("test:", Points);
    
  }
  useEffect(() => {
    askPermission()
    fetchPoints();
  }, []);
  console.log(points)
  
  return (
    
    <View style={styles.container}>
      <MapView style={styles.map}
      showsUserLocation={true}>
        {points.map(point => (
          <Marker
            key={point}
            // @ts-ignore
            coordinate={{latitude: point.latitude, longitude: point.longitude}}
          />
        ))}
        <Marker
      key={1}
      coordinate={points[4]}
      title={''}
      description={''}
    />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
});
