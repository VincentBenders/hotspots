import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import Points from './coords/random_rotterdam_coords.json'

export default function App() {

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
  useEffect(() => { askPermission()
   
  })
  
  return (
    
    <View style={styles.container}>
      <MapView style={styles.map}
      showsUserLocation={true}>
        {Points.coordinates.map(point => (
          <Marker
            key={point.id}
            coordinate={{latitude: point.latitude, longitude: point.longitude}}
          />
        ))}
        <Marker
      key={1}
      coordinate={Points.coordinates[4]}
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
    height: '100%',
  },
});
